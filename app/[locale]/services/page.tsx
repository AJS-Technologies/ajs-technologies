import {
  getDictionary,
  pageLocale,
  type PageProps,
} from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/app/components/ui/PageHero";
import ServiceGrid from "@/app/components/services/ServiceGrid";
import CallToAction from "@/app/components/ui/CallToAction";
import Faq from "@/app/components/ui/Faq";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  return pageMetadata(
    locale,
    "services",
    (await getDictionary(locale, "services")).meta,
  );
}
export default async function ServicesPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const [t, common] = await Promise.all([
    getDictionary(locale, "services"),
    getDictionary(locale, "common"),
  ]);
  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={common.nav.home}
        {...t}
        number="01"
      />
      <section className="section container">
        <ServiceGrid locale={locale} t={t} />
        <div className="section-top interior-heading" data-reveal>
          <h2>{t.engagementTitle}</h2>
          <p>{t.engagementText}</p>
        </div>
        <div className="value-grid three-col">
          {t.engagements.map((item, index) => (
            <article className="value-card" key={item.title} data-reveal>
              <span className="value-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Faq title={t.faqTitle} items={t.faqs} />
      </section>
      <CallToAction locale={locale} t={common} />
    </>
  );
}
