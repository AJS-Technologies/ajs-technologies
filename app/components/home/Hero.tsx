"use client";
import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Dictionaries } from "@/lib/i18n/dictionaries";
import ParticleGlobe from "../ParticleGlobe";
import { useMotion } from "../site/MotionProvider";

export default function Hero({
  locale,
  t,
  common,
}: {
  locale: Locale;
  t: Dictionaries["home"];
  common: Dictionaries["common"];
}) {
  const { paused, toggle } = useMotion();
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-aura" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="hero-badge">
            <i />
            {t.badge}
          </div>
          <h1>
            {t.title}
            <br />
            <span className="gradient-text">{t.titleAccent}</span>
            <span className="headline-star" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p>{t.intro}</p>
          <div className="hero-actions">
            <Link
              className="button primary"
              href={localizedPath(locale, "contact")}
            >
              {t.primary}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              className="button secondary"
              href={localizedPath(locale, "services")}
            >
              {t.secondary}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-footnote">
            <div className="mini-logo">
              <Image
                src="/ASJ%20Logo/ASJ_POR_BLUE_LogoWithoutText.svg"
                alt=""
                width={24}
                height={24}
              />
            </div>
            <span>
              {t.note}
              <br />
              <strong>{t.noteStrong}</strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <span className="visual-coordinate">{t.visualLabel}</span>
          <div className="globe-stage">
            <ParticleGlobe paused={paused} />
            <div className="globe-orbit orbit-a" />
            <div className="globe-orbit orbit-b" />
            <div className="core-logo">
              <Image
                src="/ASJ%20Logo/ASJ_POR_WHITE_LogoWithoutText.svg"
                alt=""
                width={90}
                height={90}
                priority
              />
            </div>
          </div>
          <div className="floating-card float-code">
            <div className="float-icon" aria-hidden="true">
              &lt;/&gt;
            </div>
            <div>
              <small>{t.cardLabel}</small>
              <strong>{t.cardTitle}</strong>
            </div>
            <i className="online-dot" />
          </div>
          <div className="floating-card float-ai">
            <span className="ai-spark" aria-hidden="true">
              ✳
            </span>
            <div>
              <strong>{t.aiTitle}</strong>
              <small>{t.aiLabel}</small>
            </div>
            <div className="signal-bars" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="visual-bottom">
            <span>
              <i className="online-dot" />
              {t.visualFooter}
            </span>
            <button
              className="motion-toggle"
              onClick={toggle}
              aria-pressed={paused}
            >
              {paused ? common.play : common.pause}
            </button>
          </div>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>{t.bottom}</span>
        <a href="#capabilities">
          {t.scroll}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
