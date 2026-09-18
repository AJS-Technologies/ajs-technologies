import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve("locales");
const files = fs
  .readdirSync(path.join(root, "en"))
  .filter((file) => file.endsWith(".json"))
  .sort();
function shape(value, at = "") {
  if (typeof value === "string") {
    assert.ok(value.trim().length, `Empty translation: ${at}`);
    assert.ok(!value.includes("\uFFFD"), `Broken encoding: ${at}`);
    return [at];
  }
  assert.ok(
    value && typeof value === "object",
    `Expected dictionary content at ${at}`,
  );
  return Object.entries(value)
    .flatMap(([key, item]) => shape(item, `${at}.${key}`))
    .sort();
}
for (const locale of ["en", "fa", "ps"]) {
  test(`${locale}: every page has its own translation file`, () => {
    assert.deepEqual(
      fs
        .readdirSync(path.join(root, locale))
        .filter((file) => file.endsWith(".json"))
        .sort(),
      files,
    );
  });
  for (const file of files) {
    test(`${locale}/${file}: complete keys, arrays, and nonempty strings`, () => {
      const reference = JSON.parse(
        fs.readFileSync(path.join(root, "en", file), "utf8"),
      );
      const translation = JSON.parse(
        fs.readFileSync(path.join(root, locale, file), "utf8"),
      );
      assert.deepEqual(shape(translation), shape(reference));
      if (locale !== "en")
        assert.match(JSON.stringify(translation), /[\u0600-\u06ff]/);
    });
  }
}

test("service translations align with the six service routes", () => {
  const slugs = [
    "web-development",
    "business-systems",
    "ai-automation",
    "mobile-apps",
    "cloud-hosting",
    "it-networking",
  ];
  for (const locale of ["en", "fa", "ps"]) {
    const services = JSON.parse(
      fs.readFileSync(path.join(root, locale, "services.json"), "utf8"),
    );
    const contact = JSON.parse(
      fs.readFileSync(path.join(root, locale, "contact.json"), "utf8"),
    );
    assert.equal(services.items.length, slugs.length);
    assert.equal(contact.serviceOptions.length, slugs.length + 1);
    for (const slug of slugs)
      assert.ok(fs.existsSync(path.join(root, locale, `${slug}.json`)));
  }
});
