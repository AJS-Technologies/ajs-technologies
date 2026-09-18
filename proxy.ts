import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "./lib/i18n/config";

export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[1];
  const legacyRoutes = ["services", "solutions", "process", "about", "contact"];
  if (!segment || legacyRoutes.includes(segment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }
  // Always overwrite the incoming value: document language follows the URL.
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", isLocale(segment) ? segment : defaultLocale);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
