import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Dictionaries } from "@/lib/i18n/dictionaries";

export default function CallToAction({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionaries["common"];
}) {
  return (
    <section className="container cta-section">
      <div className="cta-card" data-reveal>
        <div>
          <div className="eyebrow">{t.ctaEyebrow}</div>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
        </div>
        <Link
          className="button primary"
          href={localizedPath(locale, "contact")}
        >
          {t.contactAction}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
