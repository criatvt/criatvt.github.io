import {Link} from "react-router-dom";
import {ArrowUpRight} from "lucide-react";

// Numbered superscript footnote link (Hank-style). The number is the link;
// hovering/focusing reveals a tooltip describing the destination, and the
// padding gives it a usable tap target despite the small visual size.
const numClass =
  "text-crimson font-body text-[0.85em] align-super font-bold inline-block px-2 py-1.5 -my-1.5 -mx-1.5 rounded group-hover:bg-crimson/10 transition-colors";

// Tooltip is a hover-only desktop enhancement. Tailwind gates `group-hover`
// behind `@media (hover: hover)`, so it never fires on touch — on mobile the
// superscript is simply a redirect link (tap navigates), no tooltip flash.
const tipClass =
  "pointer-events-none absolute left-1/2 bottom-full z-30 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 font-body text-[13px] not-italic leading-none text-paper opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100";

function Foot({
  n,
  label,
  to,
  href,
}: {
  n: number;
  label: string;
  to?: string;
  href?: string;
}) {
  const num = href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={numClass}
      title={label}
      aria-label={`${label} (opens in new tab)`}
    >
      {n}
    </a>
  ) : (
    <Link to={to!} className={numClass} title={label} aria-label={label}>
      {n}
    </Link>
  );
  return (
    <span className="relative inline-block group">
      {num}
      <span role="tooltip" className={tipClass}>
        {label}
      </span>
    </span>
  );
}

const featured = [
  {
    label: "App",
    title: "Ploca",
    blurb: "A private, on-device dictation app for Mac.",
    href: "https://ploca.app",
    cta: "Visit Ploca",
    external: true,
  },
  {
    label: "Book",
    title: "Doomscroller to Reader",
    blurb: "My first book — build a reading habit without giving up your phone.",
    to: "/book",
    cta: "Read more",
    external: false,
  },
];

export default function Home() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Hero photo — placeholder until Aasif supplies one (public/hero.jpg) */}
        <img
          src="/hero.jpg"
          alt="Aasif Iqbal J."
          className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-8 border border-ink/10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Display heading — name in crimson */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05] mb-10">
          Hi, I'm <span className="text-crimson">Aasif</span>.
        </h1>

        {/* Bio — locked copy, verbatim. One thought per paragraph; numbered
            superscript links on the nouns (bound to the preceding word so the
            number never orphans to a new line). */}
        <div className="font-body text-base md:text-lg leading-snug tracking-tight text-ink space-y-4">
          <p>I would like to call myself a builder, writer and educator.</p>

          <p>I started my career, of course in IT, in 2010.</p>

          <p>
            Got bored after 6+ years of grind, so I went on a 4,000km solo
            motorcycle journey across East India for a month.
          </p>

          <p>Came back with a decision to work in education.</p>

          <p>
            Joined a K-12 EdTech startup and did everything from teaching to
            cold-calling.
          </p>

          <p>
            In 2020 I joined the founding team of iamneo, helped it scale 10x
            and became COO.
          </p>

          <p>The company was acquired by NIIT in 2025.</p>

          <p>
            The author in me came alive in January 2026 when I launched my first
            book, Doomscroller to{" "}
            <span className="whitespace-nowrap">
              Reader
              <Foot n={1} label="My first book" to="/book" />.
            </span>
          </p>

          <p>It has great reviews. Check it out.</p>

          <p>
            Today I spend most of my time building products with{" "}
            <span className="whitespace-nowrap">
              AI
              <Foot n={2} label="What I build" to="/build" />.
            </span>
          </p>

          <p>
            The one I've truly enjoyed building is{" "}
            <span className="whitespace-nowrap">
              Ploca
              <Foot n={3} label="ploca.app ↗" href="https://ploca.app" />,
            </span>{" "}
            a private dictation app for Mac.
          </p>

          <p>
            The rest of the time, I write without AI (mostly 😉) about
            technology, attention and{" "}
            <span className="whitespace-nowrap">
              learning
              <Foot n={4} label="My essays" to="/writing" />.
            </span>
          </p>

          <p>Public policy is a quieter interest I take seriously.</p>

          <p>
            I studied it at the Takshashila Institution, wrote op-eds in The{" "}
            <span className="whitespace-nowrap">
              Hindu
              <Foot n={5} label="Journalism" to="/writing" />,
            </span>{" "}
            and even built a game to test{" "}
            <span className="whitespace-nowrap">
              it
              <Foot
                n={6}
                label="Policy Wonk ↗"
                href="https://policywonkgame.aasifj.com"
              />.
            </span>
          </p>

          <p>
            A camera usually comes along for the{" "}
            <span className="whitespace-nowrap">
              ride
              <Foot n={7} label="Photography" to="/photography" />.
            </span>
          </p>
        </div>

        {/* Featured cards — Hank-style block under the bio */}
        <div className="mt-16 pt-10 border-t border-ink/10">
          <h2 className="font-serif text-xs uppercase tracking-[0.35em] text-crimson mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {featured.map((f) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-body text-[11px] uppercase tracking-widest text-muted">
                        {f.label}
                      </span>
                      <h3 className="font-serif text-2xl text-ink group-hover:text-crimson transition-colors mt-1">
                        {f.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted shrink-0 mt-1 transition-all group-hover:text-crimson group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="font-body text-base text-muted leading-relaxed mt-3">
                    {f.blurb}
                  </p>
                  <span className="inline-block font-body text-sm text-crimson mt-4">
                    {f.cta} &rarr;
                  </span>
                </>
              );
              const cls =
                "group block border border-ink/10 p-6 transition-colors hover:bg-card";
              return f.external ? (
                <a
                  key={f.title}
                  href={f.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <Link key={f.title} to={f.to!} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
