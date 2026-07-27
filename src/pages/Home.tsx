import {Link} from "react-router-dom";

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

// Shared style for the verb-links in the opening line — they double as the
// primary directory into the three main sections.
const verb =
  "underline decoration-crimson/40 underline-offset-4 transition-colors hover:text-crimson hover:decoration-crimson";

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

        {/* Bio — compact intro. The longer career narrative lives on /story;
            numbered superscript links cite the nouns worth chasing. */}
        <div className="font-body text-base md:text-lg leading-snug tracking-tight text-ink space-y-4">
          <p>
            I{" "}
            <Link to="/build" className={verb}>
              build
            </Link>
            ,{" "}
            <Link to="/writing" className={verb}>
              write
            </Link>
            , and{" "}
            <Link to="/educate" className={verb}>
              educate
            </Link>
            .
          </p>

          <p>
            Currently building{" "}
            <span className="whitespace-nowrap">
              Ploca
              <Foot n={1} label="ploca.app ↗" href="https://ploca.app" />,
            </span>{" "}
            a voice-to-text macOS app that&rsquo;s truly private.
          </p>

          <p>
            I regularly write about learning, technology, and policy in
            newspapers like The Hindu and Deccan{" "}
            <span className="whitespace-nowrap">
              Herald
              <Foot n={2} label="My writing" to="/writing" />.
            </span>
          </p>

          <p>
            I published my first book,{" "}
            <span className="whitespace-nowrap">
              Doomscroller to Reader
              <Foot n={3} label="My book" to="/book" />,
            </span>{" "}
            which helps people build a reading habit without giving up their
            phone.
          </p>

          <p>
            I was a co-founder and COO of iamneo, an edtech company, and helped
            scale it 10x, culminating in its acquisition by{" "}
            <span className="whitespace-nowrap">
              NIIT
              <Foot
                n={4}
                label="Business Standard ↗"
                href="https://www.business-standard.com/industry/news/niit-acquires-coimbatore-based-deep-skilling-training-provider-iamneo-125041701208_1.html"
              />
            </span>{" "}
            in 2025.
          </p>

          <p>
            You can read more about my story{" "}
            <Link
              to="/story"
              className="text-crimson underline decoration-crimson/40 underline-offset-4 transition-colors hover:decoration-crimson"
            >
              here
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
