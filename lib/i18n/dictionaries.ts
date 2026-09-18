import { cache } from "react";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import type common from "@/locales/en/common.json";
import type home from "@/locales/en/home.json";
import type services from "@/locales/en/services.json";
import type solutions from "@/locales/en/solutions.json";
import type process from "@/locales/en/process.json";
import type about from "@/locales/en/about.json";
import type contact from "@/locales/en/contact.json";
import type detail from "@/locales/en/service-detail.json";
import type service from "@/locales/en/web-development.json";
import type { ServiceSlug } from "@/lib/services";

export type Dictionaries = {
  common: typeof common;
  home: typeof home;
  services: typeof services;
  solutions: typeof solutions;
  process: typeof process;
  about: typeof about;
  contact: typeof contact;
  "service-detail": typeof detail;
} & Record<ServiceSlug, typeof service>;
export type Namespace = keyof Dictionaries;
export type PageProps = { params: Promise<{ locale: string }> };
export async function pageLocale(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

// Route and namespace validation constrain imports to the authored dictionaries.
export const getDictionary = cache(
  async <N extends Namespace>(
    locale: Locale,
    namespace: N,
  ): Promise<Dictionaries[N]> => {
    const dictionary = await import(
      `../../locales/${locale}/${namespace}.json`
    );
    return dictionary.default;
  },
);
