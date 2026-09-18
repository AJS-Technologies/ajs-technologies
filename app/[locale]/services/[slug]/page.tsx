import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, pageLocale } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/config";
import { isServiceSlug, serviceSlugs, serviceVisuals } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/app/components/ui/PageHero";
import CallToAction from "@/app/components/ui/CallToAction";
import ServiceArt from "@/app/components/services/ServiceArt";

type Props = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = await pageLocale(params);
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return pageMetadata(
    locale,
    `services/${slug}`,
    (await getDictionary(locale, slug)).meta,
  );
}
export default async function ServiceDetailPage({ params }: Props) {
  const locale = await pageLocale(params);
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const [t, labels, common, services] = await Promise.all([
    getDictionary(locale, slug),
    getDictionary(locale, "service-detail"),
    getDictionary(locale, "common"),
    getDictionary(locale, "services"),
  ]);
  const index = serviceSlugs.indexOf(slug);
  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={common.nav.home}
        eyebrow={t.meta.title}
        title={t.title}
        accent={t.accent}
        intro={t.intro}
        number={`0${index + 1}`}
      />
      <section className="section container service-detail-layout">
        <aside className="service-sidebar">
          <Link href={localizedPath(locale, "services")} className="text-link">
            ← {labels.back}
          </Link>
          <ServiceArt kind={serviceVisuals[index]} />
          <nav aria-label={common.allServices}>
            {serviceSlugs.map((service, i) => (
              <Link
                key={service}
                href={localizedPath(locale, `services/${service}`)}
                aria-current={slug === service ? "page" : undefined}
              >
                {services.items[i].title}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <p>{labels.scopeNote}</p>
          <Link
            className="button primary"
            href={localizedPath(locale, `contact?service=${slug}`)}
          >
            {labels.discuss}
            <span aria-hidden="true">↗</span>
          </Link>
        </aside>
        <div className="service-detail-content">
          <div className="eyebrow">{labels.overview}</div>
          <h2>{t.overviewTitle}</h2>
          <p className="large-copy">{t.overviewText}</p>
          <h2 className="subsection-title">{labels.deliverables}</h2>
          <div className="value-grid">
            {t.deliverables.map((item, i) => (
              <article className="value-card" key={item.title} data-reveal>
                <span className="value-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="outcome-panel" data-reveal>
            <h2>{labels.outcomes}</h2>
            <ul>
              {t.outcomes.map((outcome) => (
                <li key={outcome}>
                  <span aria-hidden="true">✓</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="subsection-title">{labels.approach}</h2>
          <ol className="delivery-list">
            {labels.steps.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <h2 className="subsection-title">{labels.related}</h2>
          <div className="related-links">
            {[1, 2].map((offset) => {
              const related = (index + offset) % serviceSlugs.length;
              return (
                <Link
                  key={related}
                  href={localizedPath(
                    locale,
                    `services/${serviceSlugs[related]}`,
                  )}
                >
                  {services.items[related].title}
                  <span aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <CallToAction locale={locale} t={common} />
    </>
  );
}
