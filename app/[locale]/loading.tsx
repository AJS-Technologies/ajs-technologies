import { headers } from "next/headers";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function Loading() {
  const value = (await headers()).get("x-site-locale") || "en";
  const locale = isLocale(value) ? value : "en";
  const t = await getDictionary(locale, "common");
  return (
    <div className="container page-loading" role="status">
      <span className="sr-only">{t.loading}</span>
      <div className="loading-line short" />
      <div className="loading-line title" />
      <div className="loading-line title second" />
      <div className="loading-line copy" />
      <div className="loading-card-grid">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
