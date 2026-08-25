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
    <section className="px-6 py-14 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[30px] md:text-[38px] font-bold uppercase tracking-[0.04em]">
          Build
        </h1>
        <div className="typed-rule mt-1 mb-9" aria-hidden="true"></div>

        <p className="text-[17px] leading-[1.9] mb-12">
          I enjoy building softwares with AI. Here is a curated list of tools
          and games that you can use too.
        </p>

        {/* Featured — Ploca in a tagged box */}
        <div className="relative border border-ink px-7 py-8 md:px-9 mb-16">
          <span className="eyebrow absolute -top-[9px] left-7 bg-paper px-2.5">
            Featured
          </span>
          <div className="flex flex-col gap-2.5">
            <span className="text-[22px] font-bold">ploca</span>
            <span className="text-[15px] leading-[1.8] text-muted">
              A private, on-device dictation app for Mac.
            </span>
            <a
              href="https://ploca.app"
              target="_blank"
              rel="noreferrer"
              className="link text-sm mt-1 self-start"
            >
              -&gt; ploca.app
            </a>
          </div>
        </div>

        {/* Numbered index of tools and games */}
        <div className="flex flex-col gap-10">
          {tools.map((t, i) => (
            <div key={t.name} className="flex gap-6">
              <span className="text-[15px] font-bold text-crimson pt-0.5 min-w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[19px] font-bold text-ink hover:text-crimson transition-colors"
                >
                  {t.name}
                </a>
                <p className="text-[15px] leading-[1.8] text-muted">
                  {t.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
