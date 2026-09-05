import {BookOpen, Github, PersonStanding} from "lucide-react";
import PlocaMark from "../components/PlocaMark";

// Policy Wonk's own mark is a two-tone wordmark (black "Policy", teal
// "Wonk."). Redrawn here as a two-letter monogram in the same colors and a
// serif + italic split, rather than shrinking the real lockup into 18px.
const policyWonkIcon = (
  <span className="font-serif text-[15px] font-bold leading-none">
    P<span className="italic text-[#0F766E]">W</span>
  </span>
);

const tools = [
  {
    name: "Next Read",
    url: "https://nextread.aasifj.com",
    blurb:
      "A free tool that recommends your next book, matched to your taste and reading level.",
    icon: <BookOpen className="w-[18px] h-[18px]" />,
  },
  {
    name: "Reading Run",
    url: "https://readingrun.aasifj.com",
    blurb:
      "A browser game about going from doomscroller to reader, one dodged distraction at a time.",
    icon: <PersonStanding className="w-[18px] h-[18px]" />,
  },
  {
    name: "Policy Wonk",
    url: "https://policywonkgame.aasifj.com",
    blurb:
      "A game to test and sharpen your public-policy fundamentals.",
    icon: policyWonkIcon,
  },
  {
    name: "Claude-Mirror",
    url: "https://github.com/criatvt/claude-mirror",
    blurb:
      "An open-source tool to analyse your own Claude conversations, locally.",
    icon: <Github className="w-[18px] h-[18px]" />,
  },
];

export default function Build() {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[30px] md:text-[38px] font-bold uppercase tracking-[0.04em]">
          Build
        </h1>
        <div className="title-rule mt-1 mb-9" aria-hidden="true"></div>

        <p className="text-[17px] leading-[1.9] mb-12">
          I enjoy building softwares with AI. Here is a curated list of tools
          and games that you can use too.
        </p>

        {/* Featured — ploca, in a soft callout */}
        <span className="eyebrow block mb-4">Featured</span>
        <div className="callout flex gap-4 mb-16">
          <span className="icon-tile" aria-hidden="true">
            <PlocaMark className="w-6 h-6" />
          </span>
          <div className="flex flex-col gap-2.5 pt-0.5">
            <span className="font-serif text-[22px] font-bold">ploca</span>
            <span className="text-[15px] leading-[1.8] text-muted">
              A private, on-device dictation app for Mac.
            </span>
            <a
              href="https://ploca.app"
              target="_blank"
              rel="noreferrer"
              className="link text-sm mt-1 self-start"
            >
              ploca.app
            </a>
          </div>
        </div>

        {/* Tools and games, each with its own icon */}
        <div className="flex flex-col gap-10">
          {tools.map((t) => (
            <div key={t.name} className="flex gap-5">
              <span className="icon-tile" aria-hidden="true">
                {t.icon}
              </span>
              <div className="flex flex-col gap-1.5 pt-1">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-serif text-[19px] font-bold text-crimson underline decoration-1 underline-offset-4 hover:text-crimson-dark transition-colors"
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
