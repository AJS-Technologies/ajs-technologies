import type { Metadata } from "next";
import {
  languageTags,
  locales,
  localizedPath,
  type Locale,
} from "./i18n/config";

export function pageMetadata(
  locale: Locale,
  path: string,
  meta: { title: string; description: string },
): Metadata {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const alternates = configured
    ? {
        canonical: new URL(localizedPath(locale, path), configured).href,
        languages: Object.fromEntries([
          ...locales.map((lang) => [
            languageTags[lang],
            new URL(localizedPath(lang, path), configured).href,
          ]),
          ["x-default", new URL(localizedPath("en", path), configured).href],
        ]),
      }
    : undefined;
  return {
    title: `${meta.title} | AJS Technologies`,
    description: meta.description,
    alternates,
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: "AJS Technologies",
      locale: languageTags[locale].replace("-", "_"),
      type: "website",
      ...(alternates ? { url: alternates.canonical } : {}),
    },
  };
}
