import Link from "next/link";
import {
  getDictionary,
  pageLocale,
  type PageProps,
} from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/app/components/ui/PageHero";
import CallToAction from "@/app/components/ui/CallToAction";
import SolutionExplorer from "@/app/components/solutions/SolutionExplorer";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  return pageMetadata(
    locale,
    "solutions",
    (await getDictionary(locale, "solutions")).meta,
  );
}
export default async function SolutionsPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const [t, common] = await Promise.all([
    getDictionary(locale, "solutions"),
    getDictionary(locale, "common"),
  ]);
  return (
    <>
      <PageHero
        locale={locale}
        homeLabel={common.nav.home}
        {...t}
        number="02"
      />
      <section className="section container">
        <SolutionExplorer locale={locale} t={t} />
        <div className="editorial-panel" data-reveal>
          <span className="editorial-mark" aria-hidden="true">
            ⌘
          </span>
          <div>
            <h2>{t.fitTitle}</h2>
            <p>{t.fitText}</p>
            <Link
              className="text-link"
              href={localizedPath(locale, "services")}
            >
              {t.fitAction}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <CallToAction locale={locale} t={common} />
    </>
  );
}
