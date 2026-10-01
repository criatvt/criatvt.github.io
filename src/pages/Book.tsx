import SafeImage from "../components/SafeImage";
import {book, endorsements} from "../data/content";

export default function Book() {
  return (
    <>
      {/* Hero on a black band: the cover beside the title and actions. */}
      <section className="band">
        <div className="page grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <a
            href={book.amazon}
            target="_blank"
            rel="noreferrer"
            aria-label={`${book.title} on Amazon`}
            className="enter mx-auto block w-48 sm:w-56 md:w-full md:max-w-[340px]"
          >
            <SafeImage
              src={book.cover}
              alt={`Cover of ${book.title}`}
              referrerPolicy="no-referrer"
              fallback={
                <div className="flex aspect-[5/8] w-full items-end rounded-[4px] bg-paper p-6 text-ink shadow-cover">
                  <span className="title-3">{book.title}</span>
                </div>
              }
              className="aspect-[5/8] w-full rounded-[4px] object-cover shadow-cover"
            />
          </a>

          <div className="enter-2 text-center md:text-left">
            <p className="label">My first book</p>
            <h1 className="title-1 mt-3">{book.title}</h1>
            <p className="lede mx-auto mt-5 max-w-[30ch] md:mx-0">{book.tagline}</p>
            <p className="mt-6 text-[0.9375rem] text-muted">
              <span className="font-semibold text-on-band tabular-nums">{book.rating}</span> out of 5,
              average on Amazon
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:justify-start">
              <a href={book.amazon} target="_blank" rel="noreferrer" className="btn btn-primary">
                Order on Amazon
              </a>
              <a href={`${import.meta.env.BASE_URL}resources/`} className="link-more tap">
                Book resources
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Endorsements, set large on paper. */}
      <section className="page pt-[var(--space-section)] md:pt-[var(--space-section-lg)]">
        <h2 className="sr-only">Endorsements</h2>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          {endorsements.map((r) => (
            <figure key={r.by} className="flex flex-col gap-5">
              <blockquote className="title-2">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="text-[0.9375rem] text-muted">{r.by}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-12">
          <a href={`${book.amazon}#customerReviews`} target="_blank" rel="noreferrer" className="link-more tap">
            Read all reviews on Amazon
          </a>
        </p>
      </section>
    </>
  );
}
