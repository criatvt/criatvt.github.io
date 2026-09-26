# aasifj.com

Personal site of Aasif Iqbal J. React 19 + Vite 6 + Tailwind CSS v4 single-page
app, deployed to GitHub Pages (custom domain in `public/CNAME`).

## Commands

- `npm run dev` — dev server on port 3000
- `npm run lint` — typecheck (`tsc --noEmit`); run before every commit
- `npm run build` — production build to `dist/` (the `prebuild` step refreshes
  the essays snapshot; it keeps the old file if Substack is unreachable)
- `npm run photos` — manual, one-off refresh of the photo list (see below)

Deploys happen on push to `main` (`.github/workflows/deploy.yml`). Work on a
branch; never push to `main` directly.

## Layout

- `src/pages/` — one file per route: Home, Build, Writing, Book, Educate,
  Photography, Story, NotFound. Routes are in `src/App.tsx`.
- `src/components/` — `Layout` (footer, scroll reset), `Nav` (translucent bar,
  mobile sheet; its `links` array also drives the footer), `ThemeToggle`.
- `src/index.css` — the whole design system: tokens in `@theme`, dark values
  under `.dark`, and component classes in `@layer components`.
- `src/data/photos.json` — the Photography album, committed.
- `public/essays.json` — Substack snapshot, refreshed nightly by
  `.github/workflows/essays.yml`.
- `public/resources/`, `public/nextread/` — standalone static pages with their
  own styles, outside the React app and the design system.
- `public/404.html` + the script in `index.html` — the GitHub Pages SPA
  deep-link redirect. Don't remove either.

## Design system (Apple-editorial)

Built from two references: Apple's Human Interface Guidelines
(github.com/dickwu/apple-design-skill) and Hallmark's anti-slop rules
(github.com/Nutlope/hallmark).

- **Type.** Headlines are Source Serif 4 (variable, optical sizes), via
  `.display`, `.title-1`, `.title-2`, `.title-3` or plain `h1`–`h4`.
  Everything else is the platform sans: SF Pro on Apple devices, Inter
  elsewhere. Both fonts are self-hosted from npm (`@fontsource-variable/*`,
  imported in `src/main.tsx`), so don't add a Google Fonts link. Body text is
  17px. Headings are never italic. Two families only, so don't add a third.
- **Colour.** Use only the tokens: `paper`, `surface`, `ink`, `muted`, `line`,
  `crimson` (the single accent), `crimson-dark`, `crimson-fill`, `on-crimson`.
  Never hard-code hex/rgb in components; add a token to `@theme` (and `.dark`)
  first. Every text pair meets WCAG AA (4.5:1) in both themes, so re-check
  contrast whenever a colour changes.
- **Appearance.** The site follows the system light/dark setting. The nav
  toggle stores an override in `localStorage.theme`; choosing what the system
  already shows clears it. `index.html` applies the same rule before first
  paint, so keep the two in sync.
- **Components.** `.page` (1024px max, side gutters), `.prose-col` (~68ch
  measure), `.lede`, `.label`, `.tile` (rounded surface), `.grouped` + `.row`
  + `.chevron` (iOS inset grouped list), `.btn .btn-primary` / `.btn-secondary`
  (pills), `.link` (inline prose link), `.link-more` (accent link with ›).
- **Motion.** Only page headers animate (`.enter`, `.enter-2`, `.enter-3`).
  Don't add scroll-triggered animation to sections. Every animation and
  transition has a `prefers-reduced-motion` fallback.
- **Checks before shipping UI.** No horizontal scroll at 320–1440px. Clickable
  text never wraps to two lines. Tap targets are at least 44px. Check both
  themes.

## Content rules

- **Ploca is always featured at the top**, labelled "Currently building": the
  first tile on the Build page, above every other build, and the tile directly
  after the intro on Home.
- The Build list is newest first, below Ploca. Each entry has a name, a kind
  (Game / Tool / Open source), a URL and a one-sentence blurb.
- Honest copy only: no invented metrics, testimonials or dates. Keep Aasif's
  wording; fix only typos and grammar unless asked.
- Use typographic quotes and apostrophes (’ “ ”) in copy.

## Data

- **Photography** never calls Flickr at build time or in the browser. The page
  bundles `src/data/photos.json` and shows one photo per screen. Each photo,
  and the closing button, links to Flickr's lightbox
  (`<photo page>/lightbox/`), which steps through the full album at full
  resolution. To refresh the list, run `npm run photos` (uses
  `FLICKR_API_KEY` if set, else scrapes the album page, which yields only the
  first 25), then review and commit the diff.
- **Writing** merges the live Substack feed (through rss2json/openrss) with
  `public/essays.json`, newest first.

## Open items

- `src/data/photos.json` holds only the first 25 album photos. The full album
  list still needs to be committed. Cloud sessions can't reach flickr.com
  unless it's allowed in the environment's network settings.
- `src/pages/Story.tsx`: `LINKEDIN_ABOUT` is a placeholder (`null`) waiting
  for the bio adapted from linkedin.com/in/aasifiqbalj.
