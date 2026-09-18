"use client";
import { useParams } from "next/navigation";
import { isLocale, localizedPath } from "@/lib/i18n/config";
import en from "@/locales/en/common.json";
import fa from "@/locales/fa/common.json";
import ps from "@/locales/ps/common.json";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const { locale: value } = useParams<{ locale: string }>();
  const locale = isLocale(value) ? value : "en";
  const t = { en, fa, ps }[locale];
  return (
    <section className="container not-found">
      <h1>{t.errorTitle}</h1>
      <p>{t.errorText}</p>
      <button className="button primary" onClick={reset}>
        {t.retry}
      </button>
      <a className="text-link" href={localizedPath(locale)}>
        {t.backHome}
      </a>
    </section>
  );
}
