import PlocaBand from "../components/PlocaBand";

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
      <PlocaBand />

      {/* Everything else, newest first, as a two-column grid. */}
      <section className="page pt-[var(--space-section)] md:pt-[var(--space-section-lg)]">
        <h2 className="title-1">More I have built</h2>
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-[repeat(2,minmax(0,1fr))]">
          {builds.map((b) => (
            <li key={b.name}>
              <a
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className="tile group flex h-full flex-col gap-3 p-7 sm:p-8"
              >
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="title-3">{b.name}</span>
                  <span className="rounded-full bg-paper px-2.5 py-0.5 text-[0.875rem] text-muted">{b.kind}</span>
                </span>
                <p className="text-[1rem] leading-[1.55] text-ink-2">{b.blurb}</p>
                <span className="link-more mt-auto pt-2">{host(b.url)}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
