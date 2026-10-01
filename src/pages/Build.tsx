import PlocaTile from "../components/PlocaTile";

// Newest first. `kind` is the one-word label shown beside each name.
const builds = [
  {
    name: "Re-halli",
    kind: "Game",
    url: "https://rehalli.aasifj.com",
    blurb:
      "A civic simulation game. As Chief Urban Planner of Marathahalli, Bengaluru’s most notorious traffic chokepoint, you weigh policies across a three-year term, and today’s shortcut becomes next quarter’s crisis.",
  },
  {
    name: "Next Read",
    kind: "Tool",
    url: "https://nextread.aasifj.com",
    blurb:
      "A free tool that recommends your next book, matched to your taste and reading level.",
  },
  {
    name: "Reading Run",
    kind: "Game",
    url: "https://readingrun.aasifj.com",
    blurb:
      "A browser game about going from doomscroller to reader, one dodged distraction at a time.",
  },
  {
    name: "Policy Wonk",
    kind: "Game",
    url: "https://policywonkgame.aasifj.com",
    blurb: "A game to test and sharpen your public-policy fundamentals.",
  },
  {
    name: "Claude-Mirror",
    kind: "Open source",
    url: "https://github.com/criatvt/claude-mirror",
    blurb: "An open-source tool to analyse your own Claude conversations, locally.",
  },
];

// The address a visitor will land on, shown under each name.
const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function Build() {
  return (
    <>
      <header className="page pt-16 pb-14 md:pt-28 md:pb-20">
        <h1 className="title-1 enter">Build</h1>
        <p className="lede enter-2 mt-5 max-w-[40ch]">
          I enjoy building software with AI. Here is a curated list of tools
          and games that you can use too.
        </p>
      </header>

      {/* Currently building: Ploca, always first. */}
      <section className="page">
        <PlocaTile />
      </section>

      {/* Everything else, as one grouped list. */}
      <section className="page pt-16 md:pt-20">
        <h2 className="sr-only">Tools and games</h2>
        <ul className="grouped">
          {builds.map((b) => (
            <li key={b.name}>
              <a href={b.url} target="_blank" rel="noreferrer" className="row items-start py-6 sm:py-7">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-[1.375rem] font-semibold tracking-[-0.014em]">
                      {b.name}
                    </span>
                    <span className="text-[0.875rem] text-muted">{b.kind}</span>
                  </div>
                  <p className="max-w-[60ch] text-[0.9375rem] leading-[1.55] text-ink-2">{b.blurb}</p>
                  <span className="text-[0.875rem] text-muted">{host(b.url)}</span>
                </div>
                <span className="chevron self-center" aria-hidden="true">›</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
