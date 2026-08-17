import {ArrowUpRight} from "lucide-react";

const tools = [
  {
    name: "Next Read",
    url: "https://nextread.aasifj.com",
    blurb:
      "A free tool that recommends your next book, matched to your taste and reading level.",
  },
  {
    name: "Reading Run",
    url: "https://readingrun.aasifj.com",
    blurb:
      "A browser game about going from doomscroller to reader, one dodged distraction at a time.",
  },
  {
    name: "Policy Wonk",
    url: "https://policywonkgame.aasifj.com",
    blurb:
      "A game to test and sharpen your public-policy fundamentals.",
  },
  {
    name: "Claude-Mirror",
    url: "https://github.com/criatvt/claude-mirror",
    blurb:
      "An open-source tool to analyse your own Claude conversations, locally.",
  },
];

export default function Build() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-ink mb-12">
          Build
        </h1>

        {/* Tier 1 — Ploca, featured */}
        <a
          href="https://ploca.app"
          target="_blank"
          rel="noreferrer"
          className="group block border-l-4 border-crimson bg-crimson/5 pl-8 pr-6 py-10 mb-16 transition-colors hover:bg-crimson/10"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl md:text-3xl text-ink mb-3 group-hover:text-crimson transition-colors">
              Ploca
            </h2>
            <ArrowUpRight className="w-6 h-6 text-crimson shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <p className="font-body text-lg md:text-xl text-muted leading-relaxed">
            A private, on-device dictation app for Mac.
          </p>
        </a>

        {/* Tier 2 — tool grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-[9px] overflow-hidden">
          {tools.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="group block bg-paper/60 p-8 transition-colors hover:bg-card"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl text-ink group-hover:text-crimson transition-colors">
                  {t.name}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted shrink-0 mt-1 transition-all group-hover:text-crimson group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <p className="font-body text-base text-muted leading-relaxed">
                {t.blurb}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
