# B2B Insight Panel — Marketing Site

Production-ready marketing site for the **B2B Insight Panel** survey-reward system,
built from the approved `Home v1` Claude Design. Server-rendered, fully
internationalized, and SEO-optimized.

## Tech stack

- **Next.js 16** (App Router, Server Components by default)
- **React 19** + **TypeScript** (strict, no `any`)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **next/font** (Urbanist + Roboto, self-hosted)
- JSON-based **i18n** with locale routing and RTL support
- **React Hook Form** + **Zod** (installed for future forms)
- ESLint + Prettier

## Internationalization

Five locales ship on day one: **English (en)**, **French (fr)**,
**Arabic (ar, RTL)**, **Hindi (hi)** and **Telugu (te)**.

- Routing: every page lives under `app/[locale]/`. The `src/proxy.ts`
  (Next.js 16's renamed Middleware) redirects `/` → `/{locale}` using the
  `Accept-Language` header.
- Translations: `src/locales/{locale}/{common,home}.json`. English is the
  canonical schema; every string the user sees comes from these files.
- Dictionaries load **server-only** (`src/i18n/dictionaries.ts`) — translation
  JSON never reaches the client bundle.
- The header language dropdown (`LocaleSwitcher`) swaps the first path segment
  and is the primary client-side control.
- `<html lang dir>` is set per locale; Arabic renders right-to-left.

## Project structure

```
src/
  app/
    [locale]/          layout, page, loading, error, not-found, opengraph-image
    globals.css        Tailwind theme tokens + keyframes
    robots.ts, sitemap.ts
  components/
    layout/            Navbar, Footer, Brand, LocaleSwitcher, MobileNav
    ui/                Button, Container, Section, Eyebrow, icons
  features/home/       Home page sections (Hero, Stats, Rewards, FAQ, ...)
  i18n/                config, dictionaries, system-messages
  lib/                 fonts, site, navigation, cn, interpolate
  locales/             en / fr / ar / hi / te  ×  common.json + home.json
  proxy.ts             locale detection & redirect
```

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000  ->  /en
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (prerenders all 5 locales) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## SEO

Each locale generates full metadata via `generateMetadata`: title, description,
keywords, canonical URL, `hreflang` alternates, Open Graph and Twitter cards,
plus a dynamic per-locale OG image and `WebSite` JSON-LD. `robots.txt` and
`sitemap.xml` are generated from the locale list.

## Notes

- Lifestyle photo and hero-video slots render as styled gradient placeholders.
  Drop real assets in `public/` and swap them into `About` / `VideoReveal` using
  `next/image` when available.
- `NEXT_PUBLIC_SITE_URL` drives all absolute URLs — never hardcoded.
