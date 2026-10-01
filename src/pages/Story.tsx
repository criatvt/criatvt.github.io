import {Link} from "react-router-dom";

// Inline link style shared across the narrative.
const link = "link";

// The professional bio, from the LinkedIn About section
// (linkedin.com/in/aasifiqbalj). One string per paragraph.
const LINKEDIN_ABOUT: string[] = [
  "15 years in IT consulting and Edtech.",
  "My career has been driven by two forces: a fascination with technology and a love for teaching.",
  "I started as a software engineer at Tata Consultancy Services and Accenture. I soon moved to pitching customers at a startup, finding my calling where those two forces met: Education Technology.",
  "I became a Co-founder and COO at iamneo. Our mission was to build a developer upskilling platform that universities and enterprises actually loved. My focus: leading B2B Sales, shaping the customer experience, and scaling a high-performance, “never-give-up” team.",
  "We built something special. In April 2025, iamneo was acquired by NIIT.",
  "Now? I’ve traded Teams calls for long reads. Quarterly reviews for quiet reflection. After a 15-year sprint, my focus has shifted to being present. My new work is to Read. Think. Create.",
  "After the startup grind, I wrote and published my first book called Doomscroller to Reader. It is a habit memoir that helps people build a reading habit that sticks.",
  "I have also been sharing my perspectives of AI in education via essays, Op-Eds in The Hindu and speaking at education conferences. It only reinforced my opinion and almost the truth that attention is the currency in this era. Getting the foundation LSRW is essential not just for children but anyone who wants to learn and sharpen their critical thinking.",
  "With the pace at which AI is evolving, I couldn’t stop myself from exploring different models. I do commentary on these models by building actually useful tools. Check them all on my website and Github.",
  "Occasionally, I take up some consulting gigs that require my expertise in sales, governance, operations, systems and processes, specifically in optimizing with the help of AI.",
];

export default function Story() {
  return (
    <>
      <header className="page pt-16 pb-12 md:pt-28 md:pb-16">
        <h1 className="title-1 enter">My story</h1>
        <p className="lede enter-2 mt-5 max-w-[30ch]">
          I started my career in IT, in 2010.
        </p>
      </header>

      <article className="page">
        <div className="prose-col flex flex-col gap-6 text-[1.1875rem] leading-[1.6] text-ink-2">
          <p>
            After 6+ years of the grind I got restless, so I rode 4,000km solo
            across East India for a month.
          </p>

          <p>
            I came back with a decision to work in education. I joined a K‑12
            edtech startup and did a bit of everything, from teaching to
            cold-calling.
          </p>

          <p>
            In 2020 I joined the founding team of iamneo. We scaled it 10x, and
            the company was acquired by{" "}
            <a
              href="https://www.business-standard.com/industry/news/niit-acquires-coimbatore-based-deep-skilling-training-provider-iamneo-125041701208_1.html"
              target="_blank"
              rel="noreferrer"
              className={link}
            >
              NIIT
            </a>{" "}
            in 2025.
          </p>

          <p>
            The author in me came alive in January 2026, when I launched my
            first book,{" "}
            <Link to="/book" className={link}>
              Doomscroller to Reader
            </Link>
            .
          </p>

          <p>
            Public policy is a quieter interest I take seriously. I studied it at
            the Takshashila Institution, wrote op-eds in The Hindu and Deccan
            Herald, and even built a{" "}
            <a
              href="https://policywonkgame.aasifj.com"
              target="_blank"
              rel="noreferrer"
              className={link}
            >
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
        </div>
      </article>

      {/* Profile: the professional bio. */}
      <section className="page pt-20 md:pt-24">
        <div className="tile px-7 py-12 sm:px-12 md:py-14">
          <h2 className="title-2">Profile</h2>
          <p className="mt-3 text-muted">
            Co-founder, iamneo (an NIIT venture)
          </p>
          <div className="prose-col mt-6 flex flex-col gap-4 text-ink-2">
            {LINKEDIN_ABOUT.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <a
            href="https://linkedin.com/in/aasifiqbalj"
            target="_blank"
            rel="noreferrer"
            className="link-more tap mt-4"
          >
            View on LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
