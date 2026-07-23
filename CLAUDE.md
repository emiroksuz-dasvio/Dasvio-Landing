# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The application lives in **`dasvio-web/`**, not the repo root. `cd dasvio-web` before running any npm/build command. The repo root also holds `__MACOSX/` — a leftover from the original macOS zip export; ignore it, it is not part of the app.

`dasvio-web/` is a **Next.js 16.2.6 + React 19 marketing/landing site** for Dasvio (a Turkish restaurant-management SaaS). It statically exports to `out/` (93 prerendered pages) and deploys to Netlify.

## ⚠️ This is NOT the Next.js you know

Per `dasvio-web/AGENTS.md`: this Next.js version has breaking changes vs. training-data conventions (APIs, file structure, config). **Read the relevant guide in `dasvio-web/node_modules/next/dist/docs/` before writing framework code**, and heed deprecation notices. Notably: `params` is a `Promise` that must be `await`ed in pages/layouts; dev and build both run webpack explicitly (`--webpack`), not Turbopack.

## Commands

All commands run from `dasvio-web/`:

```bash
npm run dev          # dev server (webpack). Port 3000, or next free port if taken
npm run build        # build:next THEN restore:snapshot (redirect fallbacks) — see below
npm run build:next   # Next build only (output: "export" → writes out/)
npm run start        # `next start` — does NOT work with output:"export"; use preview instead
npm run preview      # serve built out/ over http (tools/preview.mjs) — real production nav speed
npm run lint         # eslint (flat config, next/core-web-vitals + next/typescript). Currently clean
npm run restore:snapshot  # writes blog/resource redirect fallbacks into out/ (part of build)
```

**`npm run verify` / `verify:assets` are dead scripts.** They diff `out/` against a reference production export whose path is hardcoded to a macOS directory (`/Users/cly/Downloads/deploy-…`) that does not exist here. The snapshot-recovery workflow they belonged to has been retired (see below). There is no unit-test framework; `npm run build` + `npm run lint` are the correctness gate.

**Do not judge navigation/page speed from `npm run dev`.** In dev, Next compiles each route on first visit (JIT), so the first click to any link takes seconds. All routes are prerendered static HTML (SSG); in production a `<Link>` click fetches a small static RSC payload and renders in single-digit ms. Use `npm run build && npm run preview` to feel real speed.

## Architecture

### Internationalization is the routing backbone
- Locales are `["tr", "en"]`, default `tr` (`src/i18n/config.ts`). Turkish is primary.
- **Every route is under `src/app/[lang]/`.** There is no page at `/` — in dev, `/` returns 404; go to `/tr` or `/en`. Root→locale redirect is a Netlify Accept-Language rule (`netlify.toml`), not app code, so it only works in production.
- Each page/layout does `if (!hasLocale(lang)) notFound()` and calls `getDictionary(locale)`. `params` is always `await`ed.
- Dictionaries live in `src/dictionaries/{tr,en}.json`, loaded server-side via `getDictionary` (marked `server-only`). Server components slice the dictionary and pass the relevant piece down as a `t` prop (e.g. `<Hero t={t.hero} />`).
- Every dynamic page exports `generateStaticParams()` enumerating locales × slugs, because the whole site is statically exported.

**Both locales are fully translated, in two different places — put new copy in the right one.**
- **Chrome and page furniture** (nav, footer, section eyebrows, CTAs, form labels, empty states) → `src/dictionaries/{tr,en}.json`. Top-level keys: `meta, nav, hero, stats, problem, features, logos, personas, testimonials, sectors, about, pricing, demoForm, trust, footer, resourcesPage, contactPage, productPage, solutionPage, blogPage, policyPage`. Strings with a runtime value use a `{placeholder}` and a `.replace()` at the call site.
- **Content records** (solutions, products, blog) → paired `*.ts` / `*.en.ts` files in `src/lib/`, read through a `get*(locale)` accessor. Never import the bare `SOLUTIONS` / `PRODUCTS` / `BLOG_POSTS` map in a page — it is only the `tr` half.

Dictionary keys `qrMenu`, `multiBranch`, `integrations`, `analytics` are **dead leftovers** — those standalone homepage sections were folded into `FeatureGrid` and the `/products/[slug]` pages.

Two things are Turkish on `/en` **on purpose**, so don't "fix" them:
- **`policies-data.ts`** — KVKK, distance-selling contract etc. are Turkish-law instruments. Both policy pages render `policyPage.languageNote` on `/en` to say so.
- **Turkish proper nouns** in the mockups (branch names like Kadıköy/Beşiktaş) and the `GİB` acronym. The three genuinely generic mockup labels are localised via the `locale` prop that `VisualProps` threads into every visual.

### Content lives in typed data maps, not a CMS or the dictionary
Dynamic pages are driven by typed objects in `src/lib/`:

| File (+ `.en.ts` twin) | Accessor | Shape | Routes |
| --- | --- | --- | --- |
| `solutions.ts` | `getSolutions(locale)`, `SOLUTION_SLUGS`, `isSolutionSlug` | `Record<SolutionSlug, SolutionData>` | 8 slugs × 2 locales |
| `products.ts` | `getProducts(locale)`, `PRODUCT_SLUGS`, `isProductSlug` | `Record<ProductSlug, ProductData>` | 14 slugs × 2 locales |
| `blog.ts` | `getPosts/getPostBySlug/getRelatedPosts(locale)` | `BlogPost[]` | 12 slugs × 2 locales |
| `blog-content.ts` | `getArticle(slug, locale)` | `Record<slug, ArticleBody>` — typed block union | article bodies |
| `policies-data.ts` | `POLICIES` (Turkish only, deliberate) | `Policy[]` with typed `PolicyBlock` unions | 4 slugs × 2 locales |

To add a solution/product/post, add an entry to the map **and its `.en.ts` twin** — the twin is typed `Record<Slug, Data>`, so forgetting it is a build error. Routing and static params follow automatically; the route uses the `isXSlug()` type guard to `notFound()` on unknown slugs.

Article bodies are a typed `ArticleBlock` union (`p | h2 | ul | ol | quote | stats | callout`) rendered by a switch in `blog/[slug]/page.tsx` — no markdown parser, no `dangerouslySetInnerHTML`. `getArticle` falls back to the Turkish body when an English one is missing, so a new post can never 404 `/en`.

**Resource sub-pages still have no React routes.** The `resources` cards link to `/{locale}/{academy,docs,help,stories,templates}`; `tools/restore_snapshot.mjs` post-processes `out/` to write meta-refresh redirect HTML for those 5 slugs, pointing back at the `/resources` hub. **These links 404 in `npm run dev` and only resolve after a full `npm run build`.** Blog slugs used to be in that list and are *not* any more — they have real routes now, and re-adding them would overwrite the generated pages.

### Presentation
- `src/components/` is split into `sections/` (homepage sections, take a `t` prop: Hero, FeatureGrid, Sectors, LogosBand, Personas, Testimonials, About, Pricing, DemoForm, Trust), `ui/` (primitives: Button, Container, Reveal, AnimatedHeadline, AnimatedStats, LiveConsole, ParallaxGlow, Logo, ThemeToggle), `layout/` (Navbar, Footer, LocaleSwitcher), `mockups/` (hand-built SVG/CSS product visuals — `FeatureSubVisuals.tsx` is the largest file in the repo at ~860 lines), `blog/`, `policies/`.
- A data record can select among layout variants at render time — `solution.variant` picks `HeroSplitPhoto` / `HeroCenteredStat` / `HeroPanel`, `product.variant` picks `HeroSplit` / `HeroStack` / `HeroMagazine`, and `accentTint` drives per-entry theming via inline styles.
- The homepage `FeatureGrid` **derives its hero visual and four sub-cards from the product records** (`productByIcon` maps the tab's icon key to a `ProductSlug`). It does not restate that copy — don't reintroduce a local `subCardsMap`.
- Styling is **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config` — config is CSS-first in `src/app/globals.css`). Custom tokens: `bg-bg`, `bg-bg-subtle`, `bg-bg-muted`, `bg-bg-inverse`, `text-fg`, `text-fg-muted`, `text-fg-subtle`, `text-accent`, `border-border-default`.
- The design language is "iOS liquid glass": `.liquid-glass`, `.liquid-glass-strong`, `.liquid-glass-sm`, `.liquid-glass-input`, `.nav-glass`, plus `.liquid-card` — one shared hover (lift + rose glow) used by every glass content card so the sections stay identical. `.mockup-container` is deliberately always dark. Accent is rose `#f43f5e`.
- Layout width: everything uses `.container-page` (max-width 1440px) via `<Container>`. Keep new sections on it.
- `framer-motion` is a dependency but is used in exactly one place (`LiveConsole.tsx`). Everything else animates with hand-rolled `IntersectionObserver` + inline transitions (`Reveal`) or CSS keyframes in `globals.css`.
- `useReducedMotion()` (`src/lib/useReducedMotion.ts`) is **hardcoded to return `false`** — the site intentionally ignores the OS `prefers-reduced-motion` setting so parallax/reveal/count-up always play. The file documents how to restore real support.

### Theme
There is **no theme provider and no context** — `<html data-theme>` *is* the store. `themeInitScript` (exported from `src/context/ThemeContext.tsx`) is rendered as a plain inline `<script>` that must stay the **first child of `<body>`**; it stamps the stored/system theme onto `<html>` before anything paints, so there is no flash. `useTheme()` reads that attribute back through `useSyncExternalStore` and works anywhere without a provider — which is deliberate, because the previous provider-based version silently did nothing when nobody mounted the provider. Note the repo's eslint config rejects synchronous `setState` inside an effect (`react-hooks/set-state-in-effect`), so don't reintroduce a mirror-into-state version.

### Forms
`DemoForm` posts to **Netlify Forms**: `data-netlify="true"` plus a hidden `form-name` input (required because it submits via `fetch`, not a native POST) and a `netlify-honeypot` field that must stay present and visually hidden. Netlify's build bot registers the form by scanning the deployed HTML. **Form handling has to be enabled once in the Netlify UI** — until then submissions 404 and the component shows its error state.

## Build & deploy
- `next.config.ts` sets `output: "export"`, `images.unoptimized: true`, and allows remote images from `images.unsplash.com` (solution/blog hero photos are Unsplash URLs). It also caps `experimental.cpus: 2` with `staticGenerationRetryCount: 3` — this is a deliberate fix for the flaky "Jest worker encountered N child process exceptions" build failure caused by memory pressure during parallel static generation. Don't raise it without a reason.
- `netlify.toml` publishes `out/`, immutably caches `/_next/static/*`, and holds the Accept-Language root redirect rules.

## Platform note
`node_modules` is OS-specific (native binaries: `lightningcss`, `@tailwindcss/oxide`, `next-swc`). This repo arrived zipped from macOS, so on Windows/Linux you must run `npm install` to fetch the correct platform binaries — otherwise pages 500 with `Cannot find module '../lightningcss.<platform>.node'`. (It is already installed and building cleanly on this machine.)
