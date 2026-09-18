import {
  getDictionary,
  pageLocale,
  type PageProps,
} from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/app/components/ui/PageHero";
import CallToAction from "@/app/components/ui/CallToAction";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  return pageMetadata(
    locale,
    "process",
    (await getDictionary(locale, "process")).meta,
  );
}
export default async function ProcessPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const [t, common] = await Promise.all([
    getDictionary(locale, "process"),
    getDictionary(locale, "common"),
  ]);
  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={common.nav.home}
        {...t}
        number="03"
      />
      <section className="section container">
        <div className="process-timeline">
          {t.steps.map((step, index) => (
            <article className="timeline-step" key={step.title} data-reveal>
              <div className="timeline-number">0{index + 1}</div>
              <div className="timeline-copy">
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </div>
              <div className="timeline-outputs">
                <div className="eyebrow">{t.outputLabel}</div>
                <ul>
                  {step.outputs.map((output) => (
                    <li key={output}>
                      <span aria-hidden="true">✓</span>
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <h2 className="interior-heading">{t.principlesTitle}</h2>
        <div className="value-grid three-col">
          {t.principles.map((item, index) => (
            <article className="value-card" key={item.title} data-reveal>
              <span className="value-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CallToAction locale={locale} t={common} />
    </>
  );
}
