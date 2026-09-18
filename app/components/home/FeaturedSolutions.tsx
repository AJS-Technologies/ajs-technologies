import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Dictionaries } from "@/lib/i18n/dictionaries";

export default function FeaturedSolutions({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionaries["solutions"];
}) {
  return (
    <section className="featured-solutions container section">
      <div className="section-top" data-reveal>
        <div>
          <div className="eyebrow">
            <span>02</span>
            {t.eyebrow}
          </div>
          <h2>
            {t.title}
            <br />
            <span className="gradient-text">{t.accent}</span>
          </h2>
        </div>
        <Link className="text-link" href={localizedPath(locale, "solutions")}>
          {t.tabsLabel}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="feature-stage" data-reveal="scale">
        <div className="feature-copy">
          <span className="eyebrow">{t.items[0].badge}</span>
          <h3>{t.items[0].heading}</h3>
          <p>{t.items[0].text}</p>
          <ul>
            {t.items[0].features.map((feature) => (
              <li key={feature}>
                <i aria-hidden="true">✓</i>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            className="button primary"
            href={localizedPath(locale, "solutions")}
          >
            {t.tabsLabel}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="workspace-scene">
          <div className="workspace-window">
            <div className="workspace-top">
              <Image
                src="/ASJ%20Logo/ASJ_POR_BLUE_LogoWithoutText.svg"
                width={27}
                height={27}
                alt=""
              />
              <strong>{t.workspace}</strong>
              <span>{t.concept}</span>
            </div>
            <div className="workspace-main">
              <div className="workspace-content">
                <small>{t.glance}</small>
                <h4>{t.items[0].label}</h4>
                <div className="workspace-summary">
                  <span>{t.onePlace}</span>
                  <i aria-hidden="true">↗</i>
                </div>
                <div className="workspace-graph" aria-hidden="true">
                  {[32, 58, 41, 74, 60, 88, 71, 96, 83, 115].map(
                    (height, index) => (
                      <i
                        key={index}
                        style={{
                          height: `${height}px`,
                          animationDelay: `${index * -0.3}s`,
                        }}
                      />
                    ),
                  )}
                </div>
                <div className="workspace-status">
                  <span className="online-dot" />
                  {t.connected}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="concept-note">{t.sampleNote}</p>
    </section>
  );
}
