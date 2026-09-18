export const serviceSlugs = [
  "web-development",
  "business-systems",
  "ai-automation",
  "mobile-apps",
  "cloud-hosting",
  "it-networking",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];
export const serviceVisuals = [
  "web",
  "systems",
  "ai",
  "mobile",
  "cloud",
  "network",
];
export const serviceIcons = ["</>", "▦", "✳", "▯", "☁", "⌘"];
export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug);
}
