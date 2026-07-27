import {useEffect, useState} from "react";
import {ArticleCard, formatDate} from "../components/ArticleCard";

type Essay = {
  title: string;
  url: string;
  date?: string;
  subtitle?: string;
  image?: string;
};

// Journalism — manual list. Pre-filled from Aasif's published op-eds.
// Images and subtitles are the articles' OpenGraph cover/description,
// captured from each publication so the cards match the essay cards.
// TODO(Aasif): add publication dates if you want them shown.
const journalism: {
  title: string;
  publication: string;
  url: string;
  date?: string;
  subtitle?: string;
  image?: string;
}[] = [
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
  {
    title: "Lessons about social media usage from the idiot-box era",
    publication: "Deccan Herald",
    url: "https://www.deccanherald.com/education/lessons-about-social-media-usage-from-the-idiot-box-era-2-3958121",
    date: "2026-04-07T09:28:11+05:30",
    subtitle:
      "Short-form video's grip on children echoes an earlier era's fears about television, and what that history suggests about balanced use.",
    image:
      "https://media.assettype.com/deccanherald%2F2026-04-07%2Fyy3ksxvx%2FiStock-1413735503.jpg?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop",
  },
];

const SUBSTACK_FEED = "https://aasifj.substack.com/feed";
// Substack's RSS feed sends no CORS header, so the browser can't read it
// directly — we route it through a read-only public proxy and parse it here.
const FEED_PROXY = `https://corsproxy.io/?url=${encodeURIComponent(
  SUBSTACK_FEED,
)}`;

// Parse a Substack RSS feed into essays using the browser's built-in parser.
function parseFeed(xml: string): Essay[] {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  if (doc.querySelector("parsererror")) throw new Error("bad feed");
  return Array.from(doc.querySelectorAll("item")).map((item) => ({
    title: item.querySelector("title")?.textContent?.trim() ?? "",
    url: item.querySelector("link")?.textContent?.trim() ?? "",
    date: item.querySelector("pubDate")?.textContent?.trim() || undefined,
    subtitle: item.querySelector("description")?.textContent?.trim() || undefined,
    image: item.querySelector("enclosure")?.getAttribute("url") || undefined,
  }));
}

export default function Writing() {
  const [essays, setEssays] = useState<Essay[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Prefer the live Substack feed so new essays appear without a rebuild;
    // fall back to the bundled snapshot if the proxy is unreachable.
    async function load() {
      try {
        const res = await fetch(FEED_PROXY);
        if (!res.ok) throw new Error("proxy error");
        const parsed = parseFeed(await res.text());
        if (parsed.length === 0) throw new Error("empty feed");
        if (!cancelled) setEssays(parsed);
        return;
      } catch {
        // Fall through to the bundled snapshot.
      }

      try {
        const res = await fetch("/essays.json");
        if (!res.ok) throw new Error("not found");
        const data = (await res.json()) as Essay[];
        if (!cancelled) setEssays(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-ink mb-6">
          Writing
        </h1>
        <p className="font-body text-lg text-muted leading-relaxed max-w-xl mb-16">
          I write about education, attention, and the subtle ways technology is
          changing how we think. Much of it returns to the analog. Books and
          paperbacks. Handwriting. Slower ways of reading. Mostly I ask what we
          quietly trade away as our tools grow smarter.
        </p>

        {/* Journalism — manual list, shown as cards (op-eds in the press) */}
        <h2 className="font-serif text-sm uppercase tracking-[0.3em] text-muted mb-8">
          Journalism
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {journalism.map((j) => (
            <ArticleCard
              key={j.url}
              url={j.url}
              image={j.image}
              brand={j.publication}
              label={formatDate(j.date) || undefined}
              title={j.title}
              subtitle={j.subtitle}
            />
          ))}
        </div>

        {/* Essays — auto from Substack RSS */}
        <h2 className="font-serif text-sm uppercase tracking-[0.3em] text-muted mb-8">
          Essays
        </h2>
        <div>
          {essays === null && !error && (
            <p className="font-body text-muted italic">Loading essays…</p>
          )}
          {error && (
            <p className="font-body text-muted italic">
              Essays are published on{" "}
              <a
                href="https://aasifj.substack.com"
                target="_blank"
                rel="noreferrer"
                className="text-crimson underline decoration-1 underline-offset-4 decoration-crimson/40 hover:decoration-crimson"
              >
                Substack
              </a>
              .
            </p>
          )}
          {essays && essays.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {essays.map((e) => (
                <ArticleCard
                  key={e.url}
                  url={e.url}
                  image={e.image}
                  label={formatDate(e.date) || undefined}
                  title={e.title}
                  subtitle={e.subtitle}
                />
              ))}
            </div>
          )}
          {essays && essays.length === 0 && (
            <p className="font-body text-muted italic">
              No essays yet. Check{" "}
              <a
                href="https://aasifj.substack.com"
                target="_blank"
                rel="noreferrer"
                className="text-crimson underline decoration-1 underline-offset-4 decoration-crimson/40 hover:decoration-crimson"
              >
                Substack
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
