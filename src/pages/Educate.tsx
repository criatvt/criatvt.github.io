import {ImageCard, TalkVideo} from "../components/Cards";
import {press, talks, type Talk} from "../data/content";

// The two press pieces most relevant to AI in education, as on /writing.
const articles = press.filter((p) => p.publication === "The Hindu");

const CTA_EMAIL = "aasif@aasifj.com";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata", // the dates are Indian; show the same day to everyone
  });
}

// A talk: the click-to-play video, then date and host, title, blurb and panel.
function TalkCard({talk}: {talk: Talk; key?: string}) {
  return (
    <article className="grid grid-cols-1 gap-7 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-10">
      <TalkVideo talk={talk} />
      <div className="flex flex-col gap-3">
        <span className="text-[0.875rem] text-muted">
          {formatDate(talk.date)} · {talk.host}
        </span>
        <h3 className="title-3">{talk.title}</h3>
        <p className="text-[1rem] leading-[1.6] text-ink-2">{talk.blurb}</p>
        <p className="text-[0.875rem] leading-[1.55] text-muted">{talk.panel}</p>
      </div>
    </article>
  );
}

export default function Educate() {
  return (
    <>
      <header className="page pt-16 pb-14 md:pt-28 md:pb-20">
        <h1 className="title-1 enter">Educate</h1>
        <p className="lede enter-2 mt-5 max-w-[46ch]">
          I speak and write about how children learn, and how technology is
          changing it. Lately that means one topic more than any other: AI in
          the classroom. Not whether it belongs there, but how to bring it in
          responsibly. A few of those conversations are here.
        </p>
      </header>

      <section className="page">
        <h2 className="title-1">Talks</h2>
        <div className="mt-10 flex flex-col gap-16 md:gap-20">
          {talks.map((t) => (
            <TalkCard key={t.youtubeId} talk={t} />
          ))}
        </div>
      </section>

      <section className="page pt-[var(--space-section)] md:pt-[var(--space-section-lg)]">
        <h2 className="title-1">Writing</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-[repeat(2,minmax(0,1fr))]">
          {articles.map((a) => (
            <ImageCard
              key={a.url}
              href={a.url}
              image={a.image}
              kicker={a.publication}
              title={a.title}
              meta={formatDate(a.date ?? "")}
            />
          ))}
        </div>
      </section>

      {/* Invitation to get in touch. */}
      <section className="page pt-[var(--space-section)] md:pt-[var(--space-section-lg)]">
        <div className="tile px-7 py-14 text-center sm:px-12 md:py-20">
          <h2 className="title-1">Let&rsquo;s talk</h2>
          <p className="mx-auto mt-5 max-w-[44ch] text-ink-2">
            I enjoy speaking and trading perspectives with fellow educators,
            founders, and builders. On AI in education, building AI products,
            and startups. If that sounds like you, write to me.
          </p>
          <a href={`mailto:${CTA_EMAIL}`} className="btn btn-primary mt-8">
            Write to me
          </a>
        </div>
      </section>
    </>
  );
}
