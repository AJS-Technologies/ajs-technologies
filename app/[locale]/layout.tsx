import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/app/components/site/Header";
import Footer from "@/app/components/site/Footer";
import MotionProvider from "@/app/components/site/MotionProvider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale, "common");
  return (
    <MotionProvider>
      <div id="top" />
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <Header locale={locale} t={t} />
      <main id="main">{children}</main>
      <Footer locale={locale} t={t} />
    </MotionProvider>
  );
}
