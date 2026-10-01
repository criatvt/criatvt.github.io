import {ImageCard} from "../components/Cards";
import {press} from "../data/content";
import {shortDate, useEssays} from "../data/essays";

const SUBSTACK = "https://aasifj.substack.com";

export default function Writing() {
  const {essays, error} = useEssays();
  const [lead, ...rest] = essays ?? [];

  return (
    <>
      <header className="page pt-16 pb-14 md:pt-28 md:pb-20">
        <h1 className="title-1 enter">Writing</h1>
        <p className="lede enter-2 mt-5 max-w-[46ch]">
          I write about education, attention, and the subtle ways technology is
          changing how we think. Much of it returns to the analog. Books and
          paperbacks. Handwriting. Slower ways of reading. Mostly I ask what we
          quietly trade away as our tools grow smarter.
        </p>
      </header>

      {/* Essays: the newest as a wide lead story, the rest in a grid. */}
      <section className="page" aria-labelledby="essays-title">
        <h2 id="essays-title" className="sr-only">Essays</h2>

        {essays === null && !error && (
          <div role="status" aria-label="Loading essays" className="card md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-10">
            <div className="card-media aspect-[16/10] animate-pulse motion-reduce:animate-none" />
            <div className="flex flex-col gap-3" aria-hidden="true">
              <div className="h-8 w-4/5 rounded-full bg-surface" />
              <div className="h-5 w-3/5 rounded-full bg-surface" />
            </div>
          </div>
        )}

        {(error || (essays && essays.length === 0)) && (
          <p className="text-muted">
            Essays are published on{" "}
            <a href={SUBSTACK} target="_blank" rel="noreferrer" className="link">
              Substack
            </a>
            .
          </p>
        )}

        {lead && (
          <ImageCard
            lead
            href={lead.url}
            image={lead.image}
            kicker="Latest essay"
            title={lead.title}
            blurb={lead.subtitle}
            meta={shortDate(lead.date)}
          />
        )}

        {rest.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {rest.map((e) => (
              <ImageCard
                key={e.url}
                href={e.url}
                image={e.image}
                title={e.title}
                blurb={e.subtitle}
                meta={shortDate(e.date)}
              />
            ))}
          </div>
        )}

        {essays && essays.length > 0 && (
          <p className="mt-12">
            <a href={SUBSTACK} target="_blank" rel="noreferrer" className="link-more tap">
              Subscribe on Substack
            </a>
          </p>
        )}
      </section>

      {/* Journalism: op-eds in the press. */}
      <section className="pt-[var(--space-section)] md:pt-[var(--space-section-lg)]" aria-labelledby="press-title">
        <div className="page">
          <h2 id="press-title" className="title-1">In the press</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-[repeat(3,minmax(0,1fr))]">
            {press.map((j) => (
              <ImageCard
                key={j.url}
                href={j.url}
                image={j.image}
                kicker={j.publication}
                title={j.title}
                meta={shortDate(j.date)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
