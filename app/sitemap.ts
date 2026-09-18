import type { MetadataRoute } from "next";
import { languageTags, locales, localizedPath } from "@/lib/i18n/config";
import { serviceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) return [];
  const paths = [
    "",
    "services",
    "solutions",
    "process",
    "about",
    "contact",
    ...serviceSlugs.map((slug) => `services/${slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: new URL(localizedPath(locale, path), origin).href,
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [
            languageTags[lang],
            new URL(localizedPath(lang, path), origin).href,
          ]),
        ),
      },
    })),
  );
}
