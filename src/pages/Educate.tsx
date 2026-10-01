// Talks — public panels and webinars on AI in education. Each embeds a
// responsive 16:9 YouTube player above its details.
type Talk = {
  youtubeId: string;
  title: string;
  host: string;
  date: string; // ISO
  blurb: string;
  panel: string;
};

const talks: Talk[] = [
  {
    youtubeId: "WVr3Ggy9xSY",
    title: "Need to teach responsible use of AI",
    host: "Sixth National Conference on Education · Vidya Vanam",
    date: "2026-05-30",
    blurb:
      "A panel at the Sixth National Conference on Education, a national gathering of educators, policymakers, and researchers hosted by Vidya Vanam in Anaikatti, Coimbatore, on the theme of AI in Education. The argument: AI in the classroom has to start with responsible use, not just the tools.",
    panel:
      "With Jibu Elias (Mozilla Foundation, who leads the Responsible Computing Challenge in India; AI ethicist, ex-INDIAai) and Neerja Singh (author and speaker on generational diversity and intergenerational communication, known as \"The Seenager\"). Moderated by Sudarshana Srinivasan.",
  },
  {
    youtubeId: "dC6O7ysyudU",
    title: "Curriculum: How should AI be taught to children?",
    host: "The Hindu",
    date: "2026-04-11",
    blurb:
      "A webinar on what an honest AI curriculum for children should actually teach, and what it should leave out.",
    panel:
      "With Viplav Baxi (Founder, AmplifiU) and Bhanu Potta (Senior Partner, EdTech & AI, Central Square Foundation). Moderated by M. Kalyanaraman (heads education at The Hindu).",
  },
];

// The two press pieces most relevant to AI in education, as on /writing.
const articles = [
  {
    title: "India's tech education crisis: When engineers can't code",
    publication: "The Hindu",
    url: "https://www.thehindu.com/education/indias-tech-education-crisis-when-computer-engineers-cant-code/article69243098.ece",
    date: "2025-02-20",
  },
  {
    title: "CBSE's future-ready AI curriculum, but are students ready?",
    publication: "The Hindu",
    url: "https://www.thehindu.com/education/cbses-future-ready-ai-curriculum-but-are-students-ready/article70823388.ece",
    date: "2026-04-06",
  },
];

const CTA_EMAIL = "aasif@aasifj.com";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata", // the dates are Indian; show the same day to everyone
  });
}

// A talk: responsive 16:9 YouTube embed on a rounded tile, then date and host,
// title, blurb, and panel. Props typed `any` because this project runs React
// untyped, so a concrete type rejects React's `key`.
function TalkCard({talk}: any) {
  return (
    <article className="grid grid-cols-1 gap-7 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-10">
      <div className="aspect-video overflow-hidden rounded-[1.25rem] bg-surface">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${talk.youtubeId}`}
          title={talk.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[0.875rem] text-muted">
          {formatDate(talk.date)} · {talk.host}
        </span>
        <h3 className="title-3">{talk.title}</h3>
        <p className="text-[0.9375rem] leading-[1.6] text-ink-2">{talk.blurb}</p>
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
        <h2 className="title-2">Talks</h2>
        <div className="mt-10 flex flex-col gap-16 md:gap-20">
          {talks.map((t) => (
            <TalkCard key={t.youtubeId} talk={t} />
          ))}
        </div>
      </section>

      <section className="page pt-20 md:pt-28">
        <h2 className="title-2">Writing</h2>
        <ul className="grouped mt-8">
          {articles.map((a) => (
            <li key={a.url}>
              <a href={a.url} target="_blank" rel="noreferrer" className="row">
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-[0.875rem] text-muted">
                    {a.publication} · {formatDate(a.date)}
                  </span>
                  <span className="font-display text-[1.1875rem] font-semibold leading-[1.3] tracking-[-0.01em]">
                    {a.title}
                  </span>
                </span>
                <span className="chevron" aria-hidden="true">›</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Invitation to get in touch. */}
      <section className="page pt-20 md:pt-28">
        <div className="tile px-7 py-14 text-center sm:px-12 md:py-20">
          <h2 className="title-2">Let&rsquo;s talk</h2>
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
