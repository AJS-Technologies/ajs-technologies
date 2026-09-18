AJS Technologies — Draft Website

This repository contains a minimal Next.js draft site for AJS Technologies. It's a starting point with a hero, services list, and simple header/footer components.

Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

What I changed

- Updated site metadata (`app/layout.tsx`) to use the AJS Technologies title and description.
- Extracted header and footer into `app/components/Header.tsx` and `app/components/Footer.tsx` and wired them into `app/page.tsx`.
- Kept the existing hero and services layout as a draft you can iterate on.

Next steps (suggested)

- Add real branding assets in `public/` (logo, favicon).
- Replace placeholder copy with your company text and contact details.
- Add a contact form or CMS integration for content updates.

If you'd like, I can continue by adding a logo, contact form, or example projects section.
