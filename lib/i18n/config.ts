export const locales = ["en", "fa", "ps"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const languageNames: Record<Locale, string> = {
  en: "English",
  fa: "دری",
  ps: "پښتو",
};
export const languageTags: Record<Locale, string> = {
  en: "en",
  fa: "fa-AF",
  ps: "ps-AF",
};
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
export function direction(locale: Locale) {
  return locale === "en" ? "ltr" : "rtl";
}
export function localizedPath(locale: Locale, path = "") {
  return `/${locale}${path && path !== "/" ? `/${path.replace(/^\//, "")}` : ""}`;
}
