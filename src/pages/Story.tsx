import {Link} from "react-router-dom";

// Inline link style shared across the narrative.
const link = "link";
const ext = {target: "_blank", rel: "noreferrer"} as const;

// The narrative merges the earlier story with the LinkedIn About section
// (linkedin.com/in/aasifiqbalj). Facts come only from those two sources.
export default function Story() {
  return (
    <>
      <header className="page pt-16 pb-12 md:pt-28 md:pb-16">
        <h1 className="title-1 enter">My story</h1>
        <p className="lede enter-2 mt-5 max-w-[34ch]">
          Fifteen years in IT and edtech, driven by two forces: a fascination
          with technology and a love for teaching.
        </p>
      </header>

      <article>
        <div className="page">
          <div className="prose-col flex flex-col gap-6 text-[1.1875rem] leading-[1.6] text-ink-2">
            <p>
              I started my career in 2010 as a software engineer at Tata
              Consultancy Services and Accenture.
            </p>
            <p>
              After 6+ years of the grind I got restless, so I rode 4,000km solo
              across East India for a month.
            </p>
            <p>
              I came back with a decision to work in education. I joined a K‑12
              edtech startup and did a bit of everything, from teaching to
              cold-calling and pitching customers. That is where my two forces
              met: education technology.
            </p>
            <p>
              In 2020 I joined the founding team of iamneo as Co-founder and COO.
              Our mission was to build a developer upskilling platform that
              universities and enterprises actually loved. I led B2B sales,
              shaped the customer experience, and scaled a high-performance,
              “never-give-up” team. We grew it 10x, and in April 2025 iamneo was
              acquired by{" "}
              <a
                href="https://www.business-standard.com/industry/news/niit-acquires-coimbatore-based-deep-skilling-training-provider-iamneo-125041701208_1.html"
                className={link}
                {...ext}
              >
                NIIT
              </a>
              .
            </p>
          </div>
        </div>

        {/* The turn in the story, given a screen of its own. */}
        <section className="band my-[var(--space-section)] md:my-[var(--space-section-lg)]">
          <div className="page text-center">
            <p className="display">Read. Think. Create.</p>
            <p className="lede mx-auto mt-6 max-w-[40ch]">
              After a 15-year sprint, I’ve traded Teams calls for long reads, and
              quarterly reviews for quiet reflection. My focus has shifted to
              being present.
            </p>
          </div>
        </section>

        <div className="page">
          <div className="prose-col flex flex-col gap-6 text-[1.1875rem] leading-[1.6] text-ink-2">
            <p>
              The author in me came alive in January 2026, when I launched my
              first book,{" "}
              <Link to="/book" className={link}>
                Doomscroller to Reader
              </Link>
              , a habit memoir that helps people build a reading habit that
              sticks.
            </p>
            <p>
              I share my perspectives on AI in education through{" "}
              <Link to="/writing" className={link}>
                essays and op-eds
              </Link>{" "}
              in The Hindu and Deccan Herald, and by{" "}
              <Link to="/educate" className={link}>
                speaking
              </Link>{" "}
              at education conferences. It has only reinforced what I believe:
              attention is the currency of this era. A strong foundation in LSRW
              (listening, speaking, reading and writing) matters not just for
              children but for anyone who wants to learn and sharpen their
              critical thinking.
            </p>
            <p>
              With AI evolving this fast, I couldn’t stop myself from exploring
              different models. I comment on them by{" "}
              <Link to="/build" className={link}>
                building actually useful tools
              </Link>
              .
            </p>
            <p>
              Occasionally, I take up consulting work that needs my experience in
              sales, governance, operations, and systems and processes,
              especially in optimising them with AI.
            </p>
            <p>
              Public policy is a quieter interest I take seriously. I studied it at
              the Takshashila Institution and even built a{" "}
              <a href="https://policywonkgame.aasifj.com" className={link} {...ext}>
                game
              </a>{" "}
              to test the ideas.
            </p>
            <p>
              And a camera usually comes along for the{" "}
              <Link to="/photography" className={link}>
                ride
              </Link>
              .
            </p>
            <p>
              <a href="https://linkedin.com/in/aasifiqbalj" className="link-more tap" {...ext}>
                View on LinkedIn
              </a>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
