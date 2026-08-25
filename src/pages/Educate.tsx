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

// A talk block: responsive 16:9 YouTube embed in a typed frame, then the
// date/host line, title, blurb, and panel line. Props typed `any` because
// this project runs React untyped, so a concrete type rejects React's `key`.
function TalkCard({talk}: any) {
  return (
    <article className="flex flex-col gap-3.5">
      <div className="aspect-video overflow-hidden border border-ink bg-ink">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${talk.youtubeId}`}
          title={talk.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <span className="text-[13px] text-muted">
        {talk.date}&#160;&#160;{talk.host}
      </span>
      <h3 className="text-xl font-bold leading-[1.5]">{talk.title}</h3>
      <p className="text-[15px] leading-[1.85] text-ink/75">{talk.blurb}</p>
      <p className="text-[13px] leading-[1.8] text-muted">{talk.panel}</p>
    </article>
  );
}

export default function Educate() {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[30px] md:text-[38px] font-bold uppercase tracking-[0.04em]">
          Educate
        </h1>
        <div className="typed-rule mt-1 mb-9" aria-hidden="true"></div>

        <p className="text-base leading-[1.9] text-ink/80 mb-14">
          I speak and write about how children learn, and how technology is
          changing it. Lately that means one topic more than any other: AI in
          the classroom. Not whether it belongs there, but how to bring it in
          responsibly. A few of those conversations are here.
        </p>

        {/* Talks — embedded panels and webinars */}
        <h2 className="eyebrow mb-7">Talks</h2>
        <div className="flex flex-col gap-14 mb-16">
          {talks.map((t) => (
            <TalkCard key={t.youtubeId} talk={t} />
          ))}
        </div>

        {/* Writing — the AI-in-education press pieces (also on /writing) */}
        <h2 className="eyebrow mb-6">Writing</h2>
        <div className="flex flex-col gap-7 mb-16">
          {articles.map((a) => (
            <div key={a.url} className="flex flex-col gap-1">
              <span className="text-[13px] text-muted">
                {a.date}&#160;&#160;{a.publication}
              </span>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="text-[19px] font-bold leading-[1.5] text-ink hover:text-crimson transition-colors"
              >
                {a.title}
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <h2 className="eyebrow mb-6">Let&rsquo;s talk</h2>
        <p className="text-[17px] leading-[1.9]">
          I enjoy speaking and trading perspectives with fellow educators,
          founders, and builders. On AI in education, building AI products, and
          startups. If that sounds like you,{" "}
          <a href={`mailto:${CTA_EMAIL}`} className="link">
            write to me
          </a>
          .
        </p>
      </div>
    </section>
  );
}
