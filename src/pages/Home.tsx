import {Link} from "react-router-dom";
import {ArrowUpRight} from "lucide-react";
import {sparkleFromEvent} from "../components/sparkle";

// One shared inline-link style for the intro line.
const link = "link";

// Ploca's brand navy, used only for its logo mark so the card carries a real
// touch of the product while the rest stays in the site palette.
const PLOCA_NAVY = "#1C2A4A";

function PlocaCard() {
  return (
    <a
      href="https://ploca.app"
      target="_blank"
      rel="noreferrer"
      className="card-lift group block rounded-[9px] p-6 md:p-8"
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
      <p className="font-sans text-base text-muted mt-3 leading-relaxed">
        A fast, accurate voice-to-text app for Mac that is truly private.
      </p>

      <div className="eyebrow mt-6">
        Free public beta · Apple Silicon · macOS 13+
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Photo and name share a line: a small portrait plate on the left,
            the greeting and intro beside it. Stacks on narrow screens. */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-14">
          <img
            src="/hero.jpg"
            alt="Aasif Iqbal J."
            className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 rounded-[9px] object-cover object-[center_25%] border border-line bg-card shadow-[0_2px_0_var(--color-line)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          <div>
            <h1
              onClick={sparkleFromEvent}
              className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-ink leading-[1.1] mb-4 cursor-default"
            >
              Hi, I'm <span className="text-crimson">Aasif</span>.
            </h1>
            <p className="font-body text-lg md:text-xl leading-relaxed text-ink">
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
          </div>
        </div>

        {/* Current priority — the thing getting most of my time right now */}
        <h2 className="eyebrow mb-5">Current priority</h2>
        <PlocaCard />
      </div>
    </section>
  );
}
