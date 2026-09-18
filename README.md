# AJS Technologies

A multilingual Next.js website with the AJS blue identity, animated visuals, and dedicated pages for services, solutions, process, about, and contact.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The root redirects to `/en`.

## Pages and languages

The site supports English (`en`), Dari (`fa`, document language `fa-AF`), and Pashto (`ps`, document language `ps-AF`). Dari and Pashto use right-to-left layouts. The styled language menu preserves the current page, query parameters, and anchor, and loads a new document so the HTML language and direction always match. It shows native language names and the current selection, supports arrow keys, Home/End and Escape, and closes on outside interaction.

Each language has these routes:

- `/{locale}` — home
- `/{locale}/services` — service overview, engagement options, and FAQs
- `/{locale}/services/{slug}` — six individual service detail pages
- `/{locale}/solutions` — interactive solution concepts with clearly labeled sample data
- `/{locale}/process` — delivery stages, outputs, and collaboration principles
- `/{locale}/about` — company story and values
- `/{locale}/contact` — project inquiry builder and FAQs

The service slugs are `web-development`, `business-systems`, `ai-automation`, `mobile-apps`, `cloud-hosting`, and `it-networking`.

## Project structure

```text
app/
  [locale]/
    layout.tsx                  Shared localized navigation and footer
    page.tsx                    Home page
    about/page.tsx              About page
    contact/page.tsx            Contact page
    process/page.tsx            Process page
    services/page.tsx           Services overview
    services/[slug]/page.tsx    Service detail template
    solutions/page.tsx          Solutions page
  components/
    home/                       Interactive home hero
    services/                   Service cards and visuals
    solutions/                  Accessible solution tabs
    contact/                    Inquiry form and copy fallback
    site/                       Header, footer, language and motion controls
    ui/                         Page hero, CTA, and FAQ components
  layout.tsx                    HTML language, direction, fonts, metadata
  globals.css                   Single stylesheet entry point
  styles/foundation.css         Shared type, spacing, color, and radius tokens
  styles/site.css               Navigation, footer, and calls to action
  styles/home.css               Homepage composition and workspace preview
  styles/components.css         Cards, solution explorer, FAQs, and forms
  styles/illustrations.css      Consistently sized service illustrations
  styles/pages.css              Interior page layouts
  styles/motion.css             Animation and reduced-motion behavior
lib/
  i18n/config.ts                Supported locales, direction, localized links
  i18n/dictionaries.ts          Typed, cached page dictionary loading
  metadata.ts                   Translated page metadata and optional canonicals
  services.ts                   Stable service route identifiers
locales/
  en/                          English page dictionaries
  fa/                          Dari page dictionaries
  ps/                          Pashto page dictionaries
scripts/
  check-translations.mjs        Translation completeness checks
  check-routes.mjs              HTTP checks against a running site
proxy.ts                       Root redirects and trusted locale header
```

## Editing translations

Every language folder contains 14 separate JSON files. `common.json` owns shared navigation, footer, errors, and CTAs. Each main page has its own file, such as `about.json` or `contact.json`. Each service detail also has its own file, such as `web-development.json`; `service-detail.json` contains only shared detail-page labels.

Change customer-facing text in these files, not in page components. Keep identical keys and array lengths across languages. The translation checker catches missing files, missing keys, empty strings, malformed encoding, and service-list mismatches. Translation imports are loaded on the server; only the relevant interactive components receive their page's content.

For a new page, create its route under `app/[locale]`, add a JSON file in each language folder, add its type to `lib/i18n/dictionaries.ts`, and use `getDictionary(locale, namespace)`. Export translated metadata with `pageMetadata`. Use `localizedPath` for internal links. Extend route checks to include the new route.

The Dari and Pashto content is an initial authored translation draft. Review terminology and company-specific wording before a public launch.

## Contact behavior

The contact form validates required fields and builds an email addressed to `info@ajstechnologies.com`. It opens the visitor's email application; nothing is sent automatically or stored on a server. The prepared inquiry remains visible with a copy button if no email application opens. Service links preselect the appropriate service using a stable query parameter.

A future server-side submission endpoint will need an email provider and deployment configuration. Confirm ownership and delivery of the contact mailbox before launch.

## Motion and accessibility

Cards and sections reveal once as they enter the viewport, with sibling staggering and subtle scale transitions on visual panels. Registration covers streamed content and client navigation; focused content is revealed immediately. Hover lifts, menu entrances, and FAQ text transitions add smaller motion details. Animations respect `prefers-reduced-motion`. The shared pause control applies across pages during navigation. The particle canvas stops rendering when offscreen or when the tab is hidden. Interactive solution tabs support arrow keys, Home, and End, with arrow direction matched to the document. Navigation has active-page indicators, a mobile menu, keyboard focus styles, and a skip link. FAQs use native keyboard-accessible disclosure elements.

The styles have a single entry point in `app/globals.css`. `app/styles/foundation.css` owns the shared typography, colors, spacing, and radii; the remaining stylesheets own site chrome, home sections, shared components, illustrations, interior pages, and motion. Change shared tokens instead of adding overriding design layers.

The visual system uses self-hosted Manrope for Latin text, Noto Sans Arabic for Dari/Pashto body text and controls, and Noto Naskh Arabic for their headings. Main reading text is 16–18 px at laptop breakpoints. The home experience includes animated specialties, aurora lighting, uniform service cards, a moving capabilities strip, and an illustrative workspace. Decorative hover lighting is limited to fine pointers; the shared motion control also pauses the specialty rotation and ribbon.

## Validation and formatting

```sh
npm run test
npm run lint
npm run build
npm run format:check
```

Run route checks while a development or production server is available:

```sh
npm run test:routes
```

`TEST_BASE_URL` can point the route checker to another local or deployed origin. Checks cover all 36 localized page URLs, translated metadata, document direction, headings, redirects, invalid routes, and logo assets. These are HTTP and content checks; they do not replace browser interaction or visual testing.

Run `npm run format` when changing source or translations.

The GitHub Actions workflow runs translation checks, lint, formatting, a production build, and the route checks on pushes to `main` and on pull requests.

## Domain and publishing

This remains a local draft. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin when it is known. Canonical links, language alternates, and sitemap URLs are emitted only when that value is configured, so a guessed production domain is never published. Restart development or rebuild after changing the value.

The app uses server rendering for reliable per-request HTML language and direction. Deploy to a host supporting the Next.js Node runtime; it is not a static HTML export. Page-specific metadata is supplied in every route, and invalid locales and service slugs return 404.

Brand assets remain in `public/ASJ Logo/`. No fabricated clients, testimonials, or project results are included.
