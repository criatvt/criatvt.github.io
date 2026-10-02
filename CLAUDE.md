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
  mobile sheet; its `links` array also drives the footer), `ThemeToggle`,
  `PlocaPanel`, `Cards`, `SafeImage`, `IntroReveal`.
- `src/index.css` — the whole design system: tokens in `@theme`, dark values
  under `.dark`, and component classes in `@layer components`.
- `src/data/photos.json` — the Photography album, committed.
- `public/essays.json` — Substack snapshot, refreshed nightly by
  `.github/workflows/essays.yml`.
- `public/resources/`, `public/nextread/` — standalone static pages with their
  own styles, outside the React app and the design system.
- `public/404.html` + the script in `index.html` — the GitHub Pages SPA
  deep-link redirect. Don't remove either.

## Design system (Apple product page + magazine)

Built from two references: Apple's Human Interface Guidelines
(github.com/dickwu/apple-design-skill) and Hallmark's anti-slop rules
(github.com/Nutlope/hallmark). Apple-style centred sections with one idea per
screen on Home, Ploca and Book; magazine image grids on Writing, Educate and
Build.

- **Type.** One family: the platform sans (SF Pro on Apple devices, Inter with
  optical sizes elsewhere, self-hosted via `@fontsource-variable/inter/opsz.css`
  in `src/main.tsx`; don't add a Google Fonts link or a second family).
  Headlines are bold and tightly tracked: `.display`, `.title-1`, `.title-2`,
  `.title-3` or plain `h1`–`h4`. Body text is 17px. Headings are never italic.
- **Colour.** Fully monochrome: colour comes only from images and Ploca’s
  own mark. Use only the tokens: `paper`, `surface`, `ink`, `ink-2` (body copy
  under a headline; never `text-ink/80`), `muted`, `line`, `action` and
  `on-action` (buttons, focus), `band`, `on-band`, `on-band-muted`, and
  `ploca` / `ploca-wash` (Ploca’s mark and panel only, never text colour).
  Links are ink with an underline; `.link-more` is ink with a ›. Never
  hard-code hex/rgb in components; add a token to `@theme` (and `.dark`)
  first. Every text pair meets WCAG AA (4.5:1) in both themes, so re-check
  contrast whenever a colour changes.
- **Appearance.** The site follows the system light/dark setting. The nav
  toggle stores an override in `localStorage.theme`; choosing what the system
  already shows clears it. `index.html` applies the same rule before first
  paint, so keep the two in sync.
- **Sizes.** Nothing a reader needs is under 14px. Interactive targets are at
  least 44px: use `.tap` on small links; `.btn` already has `min-h-11`.
- **Components.**
  - `.band`: a full-bleed black section in both themes, used once (“Read.
    Think. Create.” on Story). Keep it that rare.
  - `.card`, `.card-media`, `.card-title`: the magazine card (picture first,
    words beneath). Use `ImageCard` and `TalkVideo` in
    `src/components/Cards.tsx` rather than hand-building them.
  - `PlocaPanel` (src/components) is the one way Ploca appears, on Home and
    Build: a rounded `ploca-wash` panel.
  - `SafeImage` wraps every hotlinked image. It handles failures, and preview
    builds show labelled placeholders.
  - Also: `.page` (1024px max, side gutters), `.prose-col` (~68ch measure),
    `.lede`, `.label`, `.tile`, `.grouped` + `.row` + `.chevron` (short link
    lists only), `.btn .btn-primary`, `.link`, `.link-more`.
- **Shared data.** Essays load through `useEssays()` (`src/data/essays.ts`).
  Press, talks and the book live in `src/data/content.ts`.
- **Icons.** The favicon and touch icons come from `public/memoji.png` (an
  AI-made Genmoji-style avatar). The share card is `public/share.png`, which
  is text only. The site itself shows no portrait.
- **Motion.** Only page headers animate (`.enter`, `.enter-2`, `.enter-3`),
  plus hover zoom on card images and the Home intro (`IntroReveal`). The intro
  is an iPhone-ad-style black stage: the two lines resolve out of a blur and
  the stage lifts to reveal the site. It plays once per browser session, any
  input skips it, and reduced motion never shows it. Don't add scroll-triggered animation. Every
  animation and transition has a `prefers-reduced-motion` fallback.
- **Checks before shipping UI.** No horizontal scroll at 320–1440px. Clickable
  text never wraps to two lines. Tap targets are at least 44px. Check both
  themes.
- **Preview builds.** `VITE_PREVIEW=1 npx vite build --base ./` gives a
  hash-routed build for review links.

## Content rules

- **Ploca is always featured at the top**, labelled "Currently building": the
  first panel on the Build page, above every other build, and the panel
  directly after the intro on Home.
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
