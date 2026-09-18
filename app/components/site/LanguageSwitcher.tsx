"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import {
  direction,
  languageNames,
  languageTags,
  locales,
  type Locale,
} from "@/lib/i18n/config";

const shortNames = { en: "EN", fa: "دری", ps: "پښتو" };

export default function LanguageSwitcher({
  locale,
  label,
  onOpen,
}: {
  locale: Locale;
  label: string;
  onOpen: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const initialFocus = useRef(locales.indexOf(locale));

  useEffect(() => {
    if (!open) return;
    options.current[initialFocus.current]?.focus();
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  function show(index = locales.indexOf(locale)) {
    initialFocus.current = index;
    onOpen();
    setOpen(true);
  }
  function choose(next: Locale) {
    setOpen(false);
    if (next === locale) {
      trigger.current?.focus();
      return;
    }
    const segments = pathname.split("/");
    segments[1] = next;
    // A new document updates HTML language, direction, and font shaping together.
    window.location.assign(
      segments.join("/") + window.location.search + window.location.hash,
    );
  }
  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
      return;
    }
    const current = options.current.findIndex(
      (option) => option === document.activeElement,
    );
    const next =
      event.key === "ArrowDown"
        ? (current + 1) % locales.length
        : event.key === "ArrowUp"
          ? (current + locales.length - 1) % locales.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? locales.length - 1
              : null;
    if (next !== null) {
      event.preventDefault();
      options.current[next]?.focus();
    }
  }
  return (
    <div
      className="language-switch"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        className="language-trigger"
        aria-label={`${label}: ${languageNames[locale]}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="language-menu"
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            show(event.key === "ArrowDown" ? 0 : locales.length - 1);
          }
        }}
      >
        <svg
          className="language-globe"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </svg>
        <span lang={languageTags[locale]}>{shortNames[locale]}</span>
        <svg
          className="language-chevron"
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="language-popover" data-reveal="scale">
          <div className="language-caption">{label}</div>
          <div
            id="language-menu"
            role="menu"
            aria-label={label}
            onKeyDown={navigate}
          >
            {locales.map((lang, index) => (
              <button
                key={lang}
                ref={(node) => {
                  options.current[index] = node;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={locale === lang}
                tabIndex={-1}
                className="language-option"
                data-reveal="scale"
                onClick={() => choose(lang)}
              >
                <span className="language-code" aria-hidden="true">
                  {lang.toUpperCase()}
                </span>
                <span
                  className="language-name"
                  lang={languageTags[lang]}
                  dir={direction(lang)}
                >
                  {languageNames[lang]}
                </span>
                <span className="language-check" aria-hidden="true">
                  {locale === lang ? "✓" : ""}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
