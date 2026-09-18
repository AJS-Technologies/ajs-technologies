import Image from "next/image";
import Link from "next/link";
import {
  getDictionary,
  pageLocale,
  type PageProps,
} from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import Hero from "@/app/components/home/Hero";
import ServiceGrid from "@/app/components/services/ServiceGrid";
import CallToAction from "@/app/components/ui/CallToAction";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  return pageMetadata(locale, "", (await getDictionary(locale, "home")).meta);
}
export default async function HomePage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const [t, common, services, process] = await Promise.all([
    getDictionary(locale, "home"),
    getDictionary(locale, "common"),
    getDictionary(locale, "services"),
    getDictionary(locale, "process"),
  ]);
  return (
    <>
      <Hero locale={locale} t={t} common={common} />
      <section className="tech-strip">
        <div className="container tech-strip-inner">
          <span className="strip-caption">{t.stack}</span>
          <div className="tech-track" dir="ltr">
            {["React", "Next.js", "Laravel", "Flutter", "Python", "Cloud"].map(
              (name) => (
                <span key={name}>
                  {name}
                  <span className="tech-dot" aria-hidden="true">
                    ✳
                  </span>
                </span>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="section container" id="capabilities">
        <div className="section-top" data-reveal>
          <div>
            <div className="eyebrow">
              <span>01</span>
              {t.servicesEyebrow}
            </div>
            <h2>
              {t.servicesTitle}
              <br />
              <span className="muted">{t.servicesAccent}</span>
            </h2>
          </div>
          <p>{t.servicesIntro}</p>
        </div>
        <ServiceGrid locale={locale} t={services} />
      </section>
      <section className="solutions-section">
        <div className="container section">
          <div className="section-top" data-reveal>
            <div>
              <div className="eyebrow">
                <span>02</span>
                {t.processEyebrow}
              </div>
              <h2>{t.processTitle}</h2>
            </div>
            <p>{t.processText}</p>
          </div>
          <div className="process-grid">
            {process.steps.map((step, index) => (
              <article className="process-step" key={index} data-reveal>
                <div className="process-marker">
                  <span>0{index + 1}</span>
                  <i />
                </div>
                <h3>{step.title}</h3>
                <p>{step.outputs[0]}</p>
              </article>
            ))}
          </div>
          <Link
            className="text-link section-link"
            href={localizedPath(locale, "process")}
          >
            {t.processAction}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="section container about-section">
        <div className="about-card" data-reveal>
          <div className="about-visual" aria-hidden="true">
            <div className="about-ring" />
            <div className="about-ring ring-two" />
            <Image
              src="/ASJ%20Logo/ASJ_POR_BLUE_LogoWithoutText.svg"
              alt=""
              width={190}
              height={190}
            />
          </div>
          <div className="about-copy">
            <div className="eyebrow">{t.aboutEyebrow}</div>
            <h2>
              {t.aboutTitle}
              <br />
              <span className="gradient-text">{t.aboutAccent}</span>
            </h2>
            <p>{t.aboutText}</p>
            <Link
              className="text-link section-link"
              href={localizedPath(locale, "about")}
            >
              {t.aboutAction}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <CallToAction locale={locale} t={common} />
    </>
  );
}
