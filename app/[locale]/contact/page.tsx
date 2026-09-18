import {
  getDictionary,
  pageLocale,
  type PageProps,
} from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/app/components/ui/PageHero";
import ContactForm from "@/app/components/contact/ContactForm";
import Faq from "@/app/components/ui/Faq";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  return pageMetadata(
    locale,
    "contact",
    (await getDictionary(locale, "contact")).meta,
  );
}
export default async function ContactPage({
  params,
  searchParams,
}: PageProps & { searchParams: Promise<{ service?: string }> }) {
  const locale = await pageLocale(params);
  const [t, common, query] = await Promise.all([
    getDictionary(locale, "contact"),
    getDictionary(locale, "common"),
    searchParams,
  ]);
  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={common.nav.home}
        {...t}
        number="05"
      />
      <section className="section container contact-page-grid">
        <div className="contact-page-copy" data-reveal>
          <div className="eyebrow">{t.emailLabel}</div>
          <a
            className="contact-email"
            dir="ltr"
            href="mailto:info@ajstechnologies.com"
          >
            info@ajstechnologies.com <span aria-hidden="true">↗</span>
          </a>
          <div className="contact-caption">
            <i className="online-dot" />
            {t.caption}
          </div>
          <h2>{t.nextTitle}</h2>
          <ol className="contact-next">
            {t.nextSteps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <ContactForm t={t} selectedService={query.service} />
      </section>
      <section className="container contact-faq">
        <Faq title={t.faqTitle} items={t.faqs} />
      </section>
    </>
  );
}
