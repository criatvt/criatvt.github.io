import {Link} from "react-router-dom";
import {ArrowUpRight} from "lucide-react";

// One shared inline-link style for the intro line.
const link =
  "underline decoration-crimson/40 underline-offset-4 transition-colors hover:text-crimson hover:decoration-crimson";

// Ploca's brand navy, used only for its logo mark so the card carries a real
// touch of the product while the rest stays in the site palette.
const PLOCA_NAVY = "#1C2A4A";

function PlocaCard() {
  return (
    <a
      href="https://ploca.app"
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-ink/10 bg-card p-6 md:p-8 transition-colors hover:border-crimson/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* ploca mark — concentric dot, rebuilt from the product site */}
          <svg viewBox="0 0 32 32" aria-hidden="true" className="w-8 h-8 shrink-0">
            <circle cx="16" cy="16" r="16" fill="#E1E7F2" />
            <circle cx="16" cy="16" r="10.5" fill="#AEBDD8" />
            <circle cx="16" cy="16" r="6.5" fill={PLOCA_NAVY} />
          </svg>
          <span className="font-serif text-3xl text-ink leading-none">ploca</span>
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted transition-colors group-hover:text-crimson" />
      </div>

      <p className="font-serif text-xl md:text-2xl text-ink mt-5 leading-snug">
        Write at the speed of thought,{" "}
        <span className="italic">privately.</span>
      </p>
      <p className="font-body text-base text-muted mt-3 leading-relaxed">
        A fast, accurate voice-to-text app for Mac that is truly private.
      </p>

      <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">
        Free public beta · Apple Silicon · macOS 13+
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Hero portrait — large and centered, given room to breathe like the
            reference sites. Served from public/hero.jpg; hides until it exists. */}
        <img
          src="/hero.jpg"
          alt="Aasif Iqbal J."
          className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover object-[center_30%] mx-auto mb-10 ring-1 ring-ink/10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Display heading — name in crimson, centered under the portrait */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05] mb-8 text-center">
          Hi, I'm <span className="text-crimson">Aasif</span>.
        </h1>

        {/* One-line intro; the full narrative lives on /story */}
        <p className="font-body text-lg md:text-xl leading-relaxed text-ink mb-14 text-center max-w-lg mx-auto">
          I{" "}
          <Link to="/build" className={link}>
            build
          </Link>
          ,{" "}
          <Link to="/writing" className={link}>
            write
          </Link>
          , and{" "}
          <Link to="/educate" className={link}>
            educate
          </Link>
          . Read the long version{" "}
          <Link to="/story" className={link}>
            here
          </Link>
          .
        </p>

        {/* Current priority — the thing getting most of my time right now */}
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted mb-5">
          Current priority
        </h2>
        <PlocaCard />
      </div>
    </section>
  );
}
