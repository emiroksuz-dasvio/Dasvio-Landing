# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The actual application lives in **`dasvio-web/`**, not the repo root. `cd dasvio-web` before running any npm/build command. The repo root also holds the original macOS export (`dasvio-web (1).zip`, `__MACOSX/`) — ignore these; they are not part of the app.

`dasvio-web/` is a **Next.js 16.2.6 + React 19 marketing/landing site** for Dasvio (a Turkish restaurant-management SaaS). It statically exports to `out/` and deploys to Netlify.

## ⚠️ This is NOT the Next.js you know

Per `dasvio-web/AGENTS.md`: this Next.js version has breaking changes vs. training-data conventions (APIs, file structure, config). **Read the relevant guide in `dasvio-web/node_modules/next/dist/docs/` before writing framework code**, and heed deprecation notices. Notably: `params` is a `Promise` that must be `await`ed in pages/layouts; the dev server runs webpack explicitly (`--webpack`), not Turbopack.

## Commands

All commands run from `dasvio-web/`:

```bash
npm run dev          # dev server (webpack). Port 3000, or next free port if taken
npm run build        # build:next THEN restore:snapshot — see "Build & snapshot" below
npm run build:next   # Next build only (output: "export" → writes out/)
npm run start        # `next start` — does NOT work with output:"export"; use preview instead
npm run preview      # serve built out/ over http (tools/preview.mjs) — real production nav speed
npm run lint         # eslint (flat config, next/core-web-vitals + next/typescript)
npm run verify       # python3 tools/verify.py — diff recovered pages vs. reference export
npm run verify:assets
npm run restore:snapshot  # overlay snapshot/ onto out/ (runs as part of build)
```

There is no unit-test framework; `verify` is the correctness check (see below). `verify.py` needs Python 3 and its `--deploy` reference dir defaults to a hardcoded macOS path (`/Users/cly/...`), so pass `--deploy DIR` explicitly or it will fail to find the reference export.

**Do not judge navigation/page speed from `npm run dev`.** In dev, Next compiles each route on first visit (JIT), so the first click to any link takes seconds. All 65 routes are prerendered static HTML (SSG); in production a `<Link>` click fetches a ~30–70 KB static RSC payload and renders in single-digit ms. Use `npm run build && npm run preview` to feel real speed.

## Architecture

### Internationalization is the routing backbone
- Locales are `["tr", "en"]`, default `tr` (`src/i18n/config.ts`). Turkish is primary; most hardcoded copy is Turkish.
- **Every route is under `src/app/[lang]/`.** There is no page at `/` — in dev, `/` returns 404; go to `/tr` or `/en`. Root→locale redirect is a Netlify Accept-Language rule (`netlify.toml`), not app code, so it only works in production.
- Each page/layout does `if (!hasLocale(lang)) notFound()` and calls `getDictionary(locale)`. `params` is always `await`ed.
- Dictionaries live in `src/dictionaries/{tr,en}.json`, loaded server-side via `getDictionary` (marked `server-only`). Server components slice the dictionary and pass the relevant piece down as a `t` prop (e.g. `<Hero t={t.hero} />`). Top-level dictionary keys: `nav, hero, stats, problem, features, logos, personas, qrMenu, multiBranch, integrations, analytics, testimonials, sectors, about, pricing, demoForm, trust, footer`.
- Every dynamic page exports `generateStaticParams()` enumerating locales × slugs, because the whole site is statically exported.

### Content lives in typed data maps, not the CMS or dictionary
Dynamic pages (`solutions/[slug]`, `products/[slug]`, `policies/[slug]`, `blog`) are driven by typed `Record<Slug, Data>` objects in `src/lib/` — `solutions.ts`, `products.ts`, `policies-data.ts`, `blog.ts`. Each exports the map, a `SLUGS` array, and an `isXSlug()` type guard used by the route to `notFound()` on unknown slugs. To add a solution/product, add an entry to the map — routing and static params follow automatically. Note the dictionary JSON mostly covers the **homepage sections only**; per-solution/product copy is inline Turkish inside these lib files.

### Presentation
- `src/components/` is split into `sections/` (page sections, take a `t` prop), `ui/` (primitives: Button, Container, Reveal, Animated*), `layout/` (Navbar, Footer, LocaleSwitcher), `mockups/` (hand-built SVG/CSS product visuals), `blog/`, `policies/`.
- A data record can select among layout variants at render time — e.g. `solution.variant` picks `HeroSplitPhoto` / `HeroCenteredStat` / `HeroPanel`, and `accentTint` drives per-entry theming via inline styles.
- Styling is **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config` — config is CSS-first in `src/app/globals.css`). Custom color tokens like `bg-bg`, `text-fg`, `text-fg-muted`, `text-accent`, `bg-bg-subtle` are defined there. Theme (dark/light) is handled by `src/context/ThemeContext.tsx`.
- Path alias: `@/*` → `src/*`.

### Build & snapshot — the unusual part
The editable React app is **still being reconstructed from a verified production export**. `snapshot/` holds that export and is the source of truth. `npm run build` runs `build:next` (fresh Next export → `out/`) then `restore:snapshot` (`tools/restore_snapshot.mjs`), which **overlays `snapshot/` on top of `out/`**, preserving exact production HTML/assets/client chunks, and writes redirect-fallback HTML for blog and resource slugs that aren't yet reimplemented. `npm run verify` then diffs recovered pages against the reference to confirm parity. When editing pages, expect that a plain `build:next` may differ from what actually ships until the snapshot overlay is reconciled — check `tools/restore_snapshot.mjs` for which pages are still snapshot-served vs. React-rendered.

## Platform note
`node_modules` is OS-specific (native binaries: `lightningcss`, `@tailwindcss/oxide`, `next-swc`). This repo arrived zipped from macOS, so on Windows/Linux you must run `npm install` to fetch the correct platform binaries — otherwise pages 500 with `Cannot find module '../lightningcss.<platform>.node'`.
