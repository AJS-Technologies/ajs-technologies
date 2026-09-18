import Link from "next/link";
import { headers } from "next/headers";
import { isLocale, localizedPath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NotFound() {
  const value = (await headers()).get("x-site-locale") || "en";
  const locale = isLocale(value) ? value : "en";
  const t = await getDictionary(locale, "common");
  return (
    <div className="container not-found">
      <div className="eyebrow">404 / AJS TECHNOLOGIES</div>
      <h1>{t.notFoundTitle}</h1>
      <p>{t.notFoundText}</p>
      <Link className="button primary" href={localizedPath(locale)}>
        {t.backHome}
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
