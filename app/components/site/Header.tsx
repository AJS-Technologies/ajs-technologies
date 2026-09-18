"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  languageNames,
  locales,
  localizedPath,
  type Locale,
} from "@/lib/i18n/config";
import type { Dictionaries } from "@/lib/i18n/dictionaries";

export default function Header({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionaries["common"];
}) {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    if (menu) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  function changeLanguage(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    const target =
      segments.join("/") + window.location.search + window.location.hash;
    setMenu(false);
    // A document navigation also updates the root HTML language and direction.
    window.location.assign(target);
  }
  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          className="brand"
          href={localizedPath(locale)}
          aria-label={t.brand}
        >
          <Image
            src="/ASJ%20Logo/ASJ_LAN_WHITE_LogoWithText.svg"
            alt={t.brand}
            width={248}
            height={39}
            priority
          />
        </Link>
        <nav
          id="main-nav"
          className={menu ? "nav open" : "nav"}
          aria-label={t.menu}
        >
          {(["services", "solutions", "process", "about"] as const).map(
            (path) => (
              <Link
                key={path}
                href={localizedPath(locale, path)}
                aria-current={
                  pathname.startsWith(localizedPath(locale, path))
                    ? "page"
                    : undefined
                }
                onClick={() => setMenu(false)}
              >
                {t.nav[path]}
              </Link>
            ),
          )}
          <Link
            className="button nav-cta"
            href={localizedPath(locale, "contact")}
            aria-current={
              pathname === localizedPath(locale, "contact") ? "page" : undefined
            }
            onClick={() => setMenu(false)}
          >
            {t.nav.contact}
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <div className="header-tools">
          <label className="language-switch">
            <span className="sr-only">{t.language}</span>
            <span aria-hidden="true">◎</span>
            <select
              aria-label={t.language}
              value={locale}
              onChange={(event) => changeLanguage(event.target.value)}
            >
              {locales.map((lang) => (
                <option key={lang} value={lang} lang={lang}>
                  {languageNames[lang]}
                </option>
              ))}
            </select>
          </label>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-controls="main-nav"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? t.close : t.menu}{" "}
            <span aria-hidden="true">{menu ? "−" : "+"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
