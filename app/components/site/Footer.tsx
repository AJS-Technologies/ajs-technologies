"use client";
import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Dictionaries } from "@/lib/i18n/dictionaries";
import { useMotion } from "./MotionProvider";

export default function Footer({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionaries["common"];
}) {
  const { paused, toggle } = useMotion();
  return (
    <footer className="footer">
      <div className="container footer-top">
        <Link className="brand" href={localizedPath(locale)}>
          <Image
            src="/ASJ%20Logo/ASJ_LAN_WHITE_LogoWithText.svg"
            alt={t.brand}
            width={245}
            height={39}
          />
        </Link>
        <span>
          {t.footerLine}
          <br />
          <strong>{t.footerStrong}</strong>
        </span>
        <a className="back-top" href="#top" aria-label={t.backTop}>
          ↑
        </a>
      </div>
      <div className="container footer-navigation">
        {(
          [
            "home",
            "services",
            "solutions",
            "process",
            "about",
            "contact",
          ] as const
        ).map((path) => (
          <Link
            key={path}
            href={localizedPath(locale, path === "home" ? "" : path)}
          >
            {t.nav[path]}
          </Link>
        ))}
        <button
          className="motion-toggle"
          onClick={toggle}
          aria-pressed={paused}
        >
          {paused ? t.play : t.pause}
        </button>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {t.brand}. {t.copyright}
        </span>
        <span className="draft-badge">{t.draft}</span>
      </div>
    </footer>
  );
}
