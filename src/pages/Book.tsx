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
    <>
      {/* Cover beside title and actions; stacked on phones. */}
      <section className="page pt-12 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <a
            href={AMAZON}
            target="_blank"
            rel="noreferrer"
            className="enter mx-auto block w-48 sm:w-56 md:w-full md:max-w-[340px]"
          >
            <img
              src="https://m.media-amazon.com/images/P/B0GH73Z8RP.01.LZZZZZZZ.jpg"
              alt="Cover of Doomscroller to Reader"
              referrerPolicy="no-referrer"
              className="aspect-[5/8] w-full rounded-[4px] bg-surface object-cover shadow-cover"
            />
          </a>

          <div className="enter-2 text-center md:text-left">
            <p className="label">My first book</p>
            <h1 className="title-1 mt-3">Doomscroller to Reader</h1>
            <p className="lede mt-5 max-w-[30ch] mx-auto md:mx-0">
              Build a reading habit without giving up your phone.
            </p>
            <p className="mt-6 text-[0.9375rem] text-muted">
              <span className="font-semibold text-ink tabular-nums">{rating.score}</span> out of 5,
              average on Amazon
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 md:justify-start">
              <a href={AMAZON} target="_blank" rel="noreferrer" className="btn btn-primary">
                Order on Amazon
              </a>
              <a href="/resources/" className="link-more">Book resources</a>
            </div>
          </div>
        </div>
      </section>

      {/* Endorsements, set as pull quotes. */}
      <section className="page">
        <div className="tile px-7 py-14 sm:px-12 md:py-20">
          <h2 className="sr-only">Endorsements</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {endorsements.map((r) => (
              <figure key={r.by} className="flex flex-col gap-5">
                <blockquote className="font-display text-[1.5rem] font-medium leading-[1.3] tracking-[-0.014em] md:text-[1.75rem]">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="text-[0.9375rem] text-muted">{r.by}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center">
          <a href={`${AMAZON}#customerReviews`} target="_blank" rel="noreferrer" className="link-more">
            Read all reviews on Amazon
          </a>
        </p>
      </section>
    </>
  );
}
