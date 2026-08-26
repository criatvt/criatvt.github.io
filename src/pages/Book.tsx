const AMAZON = "https://www.amazon.in/dp/B0GH73Z8RP";

// Read off the Amazon India listing on 17 Aug 2026. The rating count is
// deliberately not shown anywhere: it moves every week and would go stale on
// the page. The score is stable enough to be worth stating.
const rating = {score: 4.6};

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

export default function Book() {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Cover, centred, resting on a hard typed shadow */}
        <a
          href={AMAZON}
          target="_blank"
          rel="noreferrer"
          className="block w-44 md:w-56 mx-auto mb-12"
        >
          <img
            src="https://m.media-amazon.com/images/P/B0GH73Z8RP.01.LZZZZZZZ.jpg"
            alt="Doomscroller to Reader"
            className="w-full border border-ink shadow-[10px_10px_0_var(--color-line)]"
            referrerPolicy="no-referrer"
          />
        </a>

        <h1 className="text-[26px] md:text-[36px] font-bold uppercase tracking-[0.03em] leading-[1.35]">
          Doomscroller to <span className="text-crimson">Reader</span>
        </h1>
        <div className="typed-rule mt-1 mb-8" aria-hidden="true"></div>

        <p className="text-lg leading-[1.9] mb-12">
          Build a reading habit without giving up your phone.
        </p>

        {/* Endorsements */}
        <h2 className="eyebrow mb-6">Endorsements</h2>
        <div className="flex flex-col gap-8 mb-14">
          {endorsements.map((r) => (
            <blockquote key={r.by} className="flex flex-col gap-2">
              <p className="text-base leading-[1.9] italic text-ink/80">
                &#8220;{r.quote}&#8221;
              </p>
              <footer className="text-[13px] uppercase tracking-[0.12em] text-muted">
                {r.by}
              </footer>
            </blockquote>
          ))}
        </div>

        {/* What readers make of it */}
        <h2 className="eyebrow mb-5">User reviews</h2>
        <div className="flex flex-col gap-3 mb-14">
          <p className="text-[22px] font-bold">
            {rating.score}/5{" "}
            <span className="text-[13px] font-normal uppercase tracking-[0.12em] text-muted">
              &#160;Average on Amazon
            </span>
          </p>
          <a
            href={`${AMAZON}#customerReviews`}
            target="_blank"
            rel="noreferrer"
            className="link text-sm self-start"
          >
            Read all reviews on Amazon -&gt;
          </a>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <a
            href={AMAZON}
            target="_blank"
            rel="noreferrer"
            className="btn btn-solid px-7 py-3.5 text-sm self-start"
          >
            Order on Amazon
          </a>
          <a
            href="/resources/"
            className="text-[15px] text-crimson hover:text-crimson-dark transition-colors"
          >
            [ <span className="underline decoration-1 underline-offset-4">Book resources</span> -&gt; ]
          </a>
        </div>
      </div>
    </section>
  );
}
