import {Link} from "react-router-dom";

// Inline link style shared across the narrative.
const link = "link";

// Placeholder for the professional bio, to be adapted from the LinkedIn About
// section (linkedin.com/in/aasifiqbalj). Until it is filled in, the Profile
// block shows a short holding line and a link to LinkedIn. Replace null with
// an array of paragraphs.
const LINKEDIN_ABOUT: string[] | null = null;

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
        <div className="prose-col flex flex-col gap-6 text-[1.1875rem] leading-[1.6] text-ink/85">
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

      {/* Profile: the professional bio (placeholder until it is written). */}
      <section className="page pt-20 md:pt-24">
        <div className="tile px-7 py-12 sm:px-12 md:py-14">
          <h2 className="title-2">Profile</h2>
          <p className="mt-3 text-muted">
            Co-founder, iamneo (an NIIT venture)
          </p>
          <div className="prose-col mt-6 flex flex-col gap-4 text-ink/85">
            {LINKEDIN_ABOUT ? (
              LINKEDIN_ABOUT.map((para) => <p key={para}>{para}</p>)
            ) : (
              <p>A fuller professional bio is on its way.</p>
            )}
          </div>
          <a
            href="https://linkedin.com/in/aasifiqbalj"
            target="_blank"
            rel="noreferrer"
            className="link-more mt-6"
          >
            View on LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
