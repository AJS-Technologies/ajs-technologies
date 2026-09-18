import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/config";

export default function PageHero({
  locale,
  homeLabel,
  eyebrow,
  title,
  accent,
  intro,
  number,
}: {
  locale: Locale;
  homeLabel: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  number: string;
}) {
  return (
    <section className="page-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-aura" aria-hidden="true" />
      <div className="container">
        <nav className="breadcrumbs" aria-label={homeLabel}>
          <Link href={localizedPath(locale)}>{homeLabel}</Link>
          <span aria-hidden="true">/</span>
          <span>{eyebrow}</span>
        </nav>
        <div className="page-hero-layout">
          <div>
            <div className="eyebrow">
              <span>{number}</span>
              {eyebrow}
            </div>
            <h1>
              {title}
              <br />
              <span className="gradient-text">{accent}</span>
            </h1>
            <p>{intro}</p>
          </div>
          <div className="page-emblem" aria-hidden="true">
            <span>✳</span>
            <i />
            <b>{number} / AJS</b>
          </div>
        </div>
      </div>
    </section>
  );
}
