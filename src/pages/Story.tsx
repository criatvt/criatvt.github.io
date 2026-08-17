import {Link} from "react-router-dom";

// Inline link style shared across the narrative — matches the "here" link on Home.
const link =
  "text-crimson underline decoration-crimson/40 underline-offset-4 transition-colors hover:decoration-crimson";

export default function Story() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-ink leading-[1.05] mb-10">
          My <span className="text-crimson">story</span>.
        </h1>

        <div className="font-body text-base md:text-lg leading-relaxed tracking-tight text-ink space-y-5">
          <p>I started my career in IT, in 2010.</p>

          <p>
            After 6+ years of the grind I got restless, so I rode 4,000km solo
            across East India for a month.
          </p>

          <p>
            I came back with a decision to work in education. I joined a K-12
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

        <div className="mt-16 pt-10 border-t border-line">
          <Link
            to="/"
            className="link font-sans text-sm font-semibold"
          >
            &larr; Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
