import assert from "node:assert/strict";
import fs from "node:fs";

const origin = process.env.TEST_BASE_URL || "http://localhost:3000";
const pages = ["", "services", "solutions", "process", "about", "contact"];
const slugs = [
  "web-development",
  "business-systems",
  "ai-automation",
  "mobile-apps",
  "cloud-hosting",
  "it-networking",
];
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
async function request(route) {
  return fetch(new URL(route, origin), {
    redirect: "manual",
    headers: { "User-Agent": "Twitterbot" },
    signal: AbortSignal.timeout(60000),
  });
}
for (const locale of ["en", "fa", "ps"]) {
  for (const page of [...pages, ...slugs.map((slug) => `services/${slug}`)]) {
    const route = `/${locale}${page ? `/${page}` : ""}`;
    const response = await request(route);
    assert.equal(response.status, 200, `${route}: HTTP status`);
    const html = await response.text();
    const namespace = page.includes("/") ? page.split("/")[1] : page || "home";
    const dictionary = JSON.parse(
      fs.readFileSync(`locales/${locale}/${namespace}.json`, "utf8"),
    );
    const tag = { en: "en", fa: "fa-AF", ps: "ps-AF" }[locale];
    assert.ok(html.includes(`lang="${tag}"`), `${route}: HTML language`);
    assert.ok(
      html.includes(`dir="${locale === "en" ? "ltr" : "rtl"}"`),
      `${route}: document direction`,
    );
    assert.ok(
      html.includes(escape(dictionary.meta.title)),
      `${route}: translated metadata`,
    );
    assert.ok(
      html.includes(escape(dictionary.title)),
      `${route}: translated page heading`,
    );
    assert.ok(
      html.includes(`href="/${locale}/contact"`),
      `${route}: localized contact link`,
    );
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) || []).length,
      1,
      `${route}: one primary heading`,
    );
    console.log(`PASS ${route}`);
  }
}
for (const [route, target] of [
  ["/", "/en"],
  ["/services", "/en/services"],
  ["/contact?service=web-development", "/en/contact?service=web-development"],
]) {
  const response = await request(route);
  assert.ok([307, 308].includes(response.status), `${route}: redirect status`);
  assert.equal(
    new URL(response.headers.get("location"), origin).pathname +
      new URL(response.headers.get("location"), origin).search,
    target,
  );
  console.log(`PASS redirect ${route}`);
}
for (const route of ["/zz", "/en/services/not-a-service", "/fa/not-a-page"]) {
  const response = await request(route);
  assert.equal(
    response.status,
    404,
    `${route}: invalid routes must return 404`,
  );
  console.log(`PASS 404 ${route}`);
}
for (const name of [
  "ASJ_LAN_WHITE_LogoWithText.svg",
  "ASJ_POR_BLUE_LogoWithoutText.svg",
  "ASJ_POR_WHITE_LogoWithoutText.svg",
]) {
  const response = await request(`/ASJ%20Logo/${name}`);
  assert.equal(response.status, 200, `Logo ${name}`);
}
console.log(
  "All localized pages, metadata, directions, redirects, 404s, and logo assets passed.",
);
