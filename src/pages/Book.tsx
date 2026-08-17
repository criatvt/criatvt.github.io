import {Link} from "react-router-dom";
import {Star, ArrowRight} from "lucide-react";

const AMAZON = "https://www.amazon.in/dp/B0GH73Z8RP";

// Read off the Amazon India listing on 17 Aug 2026. The rating count is
// deliberately not shown anywhere: it moves every week and would go stale on
// the page. The score is stable enough to be worth stating.
const rating = {score: 4.6};

// One or two reader reviews worth featuring, each trimmed to a sentence with
// the reviewer's name and their star rating. Amazon does not serve review text
// to anyone who is not signed in, so these are filled in by hand rather than
// fetched. An empty list simply hides the block.
const userReviews: {excerpt: string; by: string; stars: number}[] = [];

const endorsements = [
  {
    quote:
      "Aasif shows you how to turn the same instinct that makes you reach for your phone into a lifelong reading habit that actually sticks.",
    by: "Ankur Warikoo, Entrepreneur",
  },
  {
    quote:
      "Doomscroller to Reader is simple, straightforward and surprisingly hopeful.",
    by: "Meetha Raghunath, Actor",
  },
];

// Five stars, filled to a score: whole stars, then a partial one clipped to
// whatever fraction is left over.
// Sized with inline styles rather than w-/h- utilities: Tailwind scans the
// source for whole class names, so a template-built `w-${size}` never gets
// generated and the stars come out with no size at all.
function Stars({score, size = 16}: {score: number; size?: number}) {
  const box = {width: size, height: size};
  return (
    <div className="flex items-center gap-1" aria-label={`${score} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(Math.max(score - i, 0), 1);
        return (
          <div key={i} className="relative shrink-0" style={box}>
            <Star className="absolute inset-0 text-line" style={box} />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{width: `${fill * 100}%`}}
            >
              <Star className="text-crimson fill-crimson" style={box} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Book() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Cover, centred, lifting under the cursor like the site's cards */}
        <a
          href={AMAZON}
          target="_blank"
          rel="noreferrer"
          className="block w-48 md:w-60 mx-auto mb-12"
        >
          <img
            src="https://m.media-amazon.com/images/P/B0GH73Z8RP.01.LZZZZZZZ.jpg"
            alt="Doomscroller to Reader"
            className="w-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:rotate-[-1.5deg] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:rotate-0"
            referrerPolicy="no-referrer"
          />
        </a>

        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-ink leading-tight mb-6">
          Doomscroller{" "}
          <span className="italic text-crimson">to Reader</span>
        </h1>

        <p className="font-body text-xl md:text-2xl text-ink leading-relaxed mb-12">
          Build a reading habit without giving up your phone.
        </p>

        {/* Endorsements */}
        <div className="space-y-8 border-l border-line pl-6 mb-14">
          {endorsements.map((r) => (
            <blockquote
              key={r.by}
              className="font-body italic text-lg text-muted leading-relaxed"
            >
              "{r.quote}"
              <footer className="eyebrow mt-3 not-italic text-ink">
                &ndash; {r.by}
              </footer>
            </blockquote>
          ))}
        </div>

        {/* What readers make of it */}
        <h2 className="eyebrow mb-4">User reviews</h2>
        <div className="flex items-center gap-3 mb-6">
          <Stars score={rating.score} />
          <span className="font-sans font-bold text-base text-ink">
            {rating.score}/5
          </span>
          <span className="eyebrow">Average on Amazon</span>
        </div>

        {userReviews.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {userReviews.map((r) => (
              <div
                key={r.by}
                className="rounded-[9px] border border-line bg-card p-5"
              >
                <Stars score={r.stars} />
                <p className="font-body text-base text-ink mt-3 leading-relaxed">
                  "{r.excerpt}"
                </p>
                <p className="eyebrow mt-3">{r.by}</p>
              </div>
            ))}
          </div>
        )}

        <a
          href={`${AMAZON}#customerReviews`}
          target="_blank"
          rel="noreferrer"
          className="link font-sans text-sm inline-block mb-14"
        >
          Read all reviews on Amazon →
        </a>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <a
            href={AMAZON}
            target="_blank"
            rel="noreferrer"
            className="btn btn-solid px-7 py-3.5 text-sm"
          >
            Order on Amazon
          </a>
          <a href="/resources/" className="btn px-7 py-3.5 text-sm">
            Book resources
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
