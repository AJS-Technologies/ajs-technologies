import Image from "next/image";
import Link from "next/link";
import {
  getDictionary,
  pageLocale,
  type PageProps,
} from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/app/components/ui/PageHero";
import CallToAction from "@/app/components/ui/CallToAction";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  return pageMetadata(
    locale,
    "about",
    (await getDictionary(locale, "about")).meta,
  );
}
export default async function AboutPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const [t, common] = await Promise.all([
    getDictionary(locale, "about"),
    getDictionary(locale, "common"),
  ]);
  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={common.nav.home}
        {...t}
        number="04"
      />
      <section className="section container">
        <div className="story-layout">
          <div className="story-visual" aria-hidden="true">
            <div className="about-visual">
              <div className="about-ring" />
              <div className="about-ring ring-two" />
              <Image
                src="/ASJ%20Logo/ASJ_POR_BLUE_LogoWithoutText.svg"
                alt=""
                width={190}
                height={190}
              />
            </div>
            <span>{common.tagline}</span>
          </div>
          <div className="story-copy" data-reveal>
            <div className="eyebrow">{t.storyEyebrow}</div>
            <h2>{t.storyTitle}</h2>
            {t.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <h2 className="interior-heading">{t.valuesTitle}</h2>
        <div className="value-grid">
          {t.values.map((item, index) => (
            <article className="value-card" key={item.title} data-reveal>
              <span className="value-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="editorial-panel" data-reveal>
          <span className="editorial-mark" aria-hidden="true">
            ✳
          </span>
          <div>
            <h2>{t.partnerTitle}</h2>
            <p>{t.partnerText}</p>
            <Link className="text-link" href={localizedPath(locale, "process")}>
              {t.partnerAction}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <CallToAction locale={locale} t={common} />
    </>
  );
}
