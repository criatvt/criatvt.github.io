import {ArticleCard, formatDate} from "../components/ArticleCard";

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

// The two press pieces most relevant to AI in education. Cover images,
// subtitles, and dates mirror the `journalism` list on the Writing page.
const articles = [
  {
    title: "India's tech education crisis: When engineers can't code",
    publication: "The Hindu",
    url: "https://www.thehindu.com/education/indias-tech-education-crisis-when-computer-engineers-cant-code/article69243098.ece",
    date: "2025-02-20T19:33:55+05:30",
    subtitle:
      "Infosys layoffs spark debate on Indian graduates' programming skills, and the case for a hybrid assessment framework in higher education.",
    image:
      "https://th-i.thgim.com/public/incoming/oqcs7d/article69243145.ece/alternates/LANDSCAPE_1200/iStock-1354205521.jpg",
  },
  {
    title: "CBSE's future-ready AI curriculum, but are students ready?",
    publication: "The Hindu",
    url: "https://www.thehindu.com/education/cbses-future-ready-ai-curriculum-but-are-students-ready/article70823388.ece",
    date: "2026-04-06T08:00:00+05:30",
    subtitle:
      "New AI curriculum launches in India but overlooks essential literacy skills, risking effective learning for young students.",
    image:
      "https://th-i.thgim.com/public/education/2mmdj2/article70823593.ece/alternates/LANDSCAPE_1200/iStock-2139297549.jpg",
  },
];

const CTA_EMAIL = "aasif@aasifj.com";

// A talk block: responsive 16:9 YouTube embed, then title, host/date, blurb,
// and the panel line. Props typed `any` for the same reason as ArticleCard:
// this project runs React untyped, so a concrete type rejects React's `key`.
function TalkCard({talk}: any) {
  return (
    <article className="flex flex-col">
      <div className="aspect-video overflow-hidden border border-ink/10 bg-card">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${talk.youtubeId}`}
          title={talk.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="mt-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {talk.host} · {formatDate(talk.date)}
        </span>
        <h3 className="font-serif text-2xl text-ink mt-2 leading-snug">
          {talk.title}
        </h3>
        <p className="font-body text-base text-muted mt-3 leading-relaxed">
          {talk.blurb}
        </p>
        <p className="font-body text-sm text-muted/90 mt-3 leading-relaxed">
          {talk.panel}
        </p>
      </div>
    </article>
  );
}

export default function Educate() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-ink mb-6">
          Educate
        </h1>
        <p className="font-body text-lg text-muted leading-relaxed max-w-xl mb-16">
          I speak and write about how children learn, and how technology is
          changing it. Lately that means one topic more than any other: AI in
          the classroom. Not whether it belongs there, but how to bring it in
          responsibly. A few of those conversations are here.
        </p>

        {/* Talks — embedded panels and webinars */}
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted mb-8">
          Talks
        </h2>
        <div className="flex flex-col gap-12 mb-16">
          {talks.map((t) => (
            <TalkCard key={t.youtubeId} talk={t} />
          ))}
        </div>

        {/* Writing — the AI-in-education press pieces (also on /writing) */}
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted mb-8">
          Writing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {articles.map((a) => (
            <ArticleCard
              key={a.url}
              url={a.url}
              image={a.image}
              brand={a.publication}
              label={formatDate(a.date) || undefined}
              title={a.title}
              subtitle={a.subtitle}
            />
          ))}
        </div>

        {/* CTA */}
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted mb-8">
          Let&rsquo;s talk
        </h2>
        <p className="font-body text-lg text-ink leading-relaxed max-w-xl">
          I enjoy speaking and trading perspectives with fellow educators,
          founders, and builders. On AI in education, building AI products, and
          startups. If that sounds like you,{" "}
          <a
            href={`mailto:${CTA_EMAIL}`}
            className="text-crimson underline decoration-crimson/40 underline-offset-4 transition-colors hover:decoration-crimson"
          >
            write to me
          </a>
          .
        </p>
      </div>
    </section>
  );
}
