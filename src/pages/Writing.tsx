import {useEffect, useState} from "react";

// Render a date as its ISO day (2026-08-20), the typed index style.
function isoDay(raw?: string): string {
  if (!raw) return "";
  const t = Date.parse(raw);
  if (Number.isNaN(t)) return "";
  return new Date(t).toISOString().slice(0, 10);
}

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
// directly — and Substack also blocks the servers behind most plain CORS
// proxies (corsproxy.io, allorigins), which is how the page ended up stuck on
// the bundled snapshot. Feed services fare better: rss2json converts the feed
// to JSON with CORS enabled, and openrss re-serves it as RSS from its cache.
// Try them in order and take the first that yields a parseable feed, with the
// plain proxies kept as a tail-end long shot.
const FEED_SOURCES: {url: string; kind: "xml" | "json"}[] = [
  {
    url: `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      SUBSTACK_FEED,
    )}`,
    kind: "json",
  },
  {url: "https://openrss.org/aasifj.substack.com", kind: "xml"},
  {
    url: `https://corsproxy.io/?url=${encodeURIComponent(SUBSTACK_FEED)}`,
    kind: "xml",
  },
  {
    url: `https://api.allorigins.win/raw?url=${encodeURIComponent(SUBSTACK_FEED)}`,
    kind: "xml",
  },
];

// Parse rss2json's JSON envelope into essays.
function parseJsonFeed(body: string): Essay[] {
  const data = JSON.parse(body) as {
    status?: string;
    items?: {
      title?: string;
      link?: string;
      pubDate?: string;
      description?: string;
      enclosure?: {link?: string};
      thumbnail?: string;
    }[];
  };
  if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("bad feed");
  // rss2json reports pubDate as "YYYY-MM-DD HH:mm:ss" in UTC — a format
  // Safari's Date parser rejects — so normalise it to ISO.
  const iso = (d?: string) =>
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(d ?? "")
      ? (d as string).replace(" ", "T") + "Z"
      : d || undefined;
  return data.items
    .filter((i) => i && i.link)
    .map((i) => ({
      title: i.title ?? "",
      url: i.link as string,
      date: iso(i.pubDate),
      subtitle: (i.description ?? "").trim() || undefined,
      image: i.enclosure?.link || i.thumbnail || undefined,
    }));
}

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

// A post's canonical address, for deduping the same essay across sources —
// feed links can carry tracking params the archive's links don't.
function canonical(url: string): string {
  try {
    const u = new URL(url);
    return u.origin + u.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
}

function timeOf(date?: string): number {
  const t = date ? Date.parse(date) : NaN;
  return Number.isNaN(t) ? 0 : t;
}

// Union essays by URL, earlier lists winning on duplicates, newest first.
function mergeEssays(...lists: Essay[][]): Essay[] {
  const byUrl = new Map<string, Essay>();
  for (const list of lists)
    for (const e of list) {
      if (!e?.url) continue;
      const key = canonical(e.url);
      if (!byUrl.has(key)) byUrl.set(key, e);
    }
  return [...byUrl.values()].sort((a, b) => timeOf(b.date) - timeOf(a.date));
}

// The live Substack feed, via the first reachable source. Null if none work.
async function loadLive(): Promise<Essay[] | null> {
  for (const {url, kind} of FEED_SOURCES) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("source error");
      const body = await res.text();
      const parsed = kind === "json" ? parseJsonFeed(body) : parseFeed(body);
      if (parsed.length > 0) return parsed;
    } catch {
      // Try the next source.
    }
  }
  return null;
}

// The bundled snapshot, refreshed nightly by scripts/fetch-essays.mjs.
async function loadSnapshot(): Promise<Essay[] | null> {
  try {
    const res = await fetch("/essays.json");
    if (!res.ok) throw new Error("not found");
    const data = (await res.json()) as Essay[];
    return Array.isArray(data) ? data : [];
  } catch {
    return null;
  }
}

export default function Writing() {
  const [essays, setEssays] = useState<Essay[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // The feed alone can't show everything: Substack's RSS only carries the
    // newest posts, and rss2json trims that further (ten items on the free
    // tier) — using it as the sole source is how the page once shrank to ten
    // essays. So merge the live feed (fresh posts, appear without a rebuild)
    // with the bundled snapshot (the accumulated back-catalogue), live data
    // winning where the same essay appears in both.
    async function load() {
      const [live, snapshot] = await Promise.all([loadLive(), loadSnapshot()]);
      if (cancelled) return;
      if (live === null && snapshot === null) setError(true);
      else setEssays(mergeEssays(live ?? [], snapshot ?? []));
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="px-6 py-14 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[30px] md:text-[38px] font-bold uppercase tracking-[0.04em]">
          Writing
        </h1>
        <div className="typed-rule mt-1 mb-9" aria-hidden="true"></div>

        <p className="text-base leading-[1.9] text-ink/80 mb-14">
          I write about education, attention, and the subtle ways technology is
          changing how we think. Much of it returns to the analog. Books and
          paperbacks. Handwriting. Slower ways of reading. Mostly I ask what we
          quietly trade away as our tools grow smarter.
        </p>

        {/* Journalism — typed entries (op-eds in the press) */}
        <h2 className="eyebrow mb-6">Journalism</h2>
        <div className="flex flex-col gap-7 mb-16">
          {journalism.map((j) => (
            <div key={j.url} className="flex flex-col gap-1">
              <span className="text-[13px] text-muted">
                {isoDay(j.date)}&#160;&#160;{j.publication}
              </span>
              <a
                href={j.url}
                target="_blank"
                rel="noreferrer"
                className="text-[19px] font-bold leading-[1.5] text-ink hover:text-crimson transition-colors"
              >
                {j.title}
              </a>
            </div>
          ))}
        </div>

        {/* Essays — auto from Substack RSS, as a typed index */}
        <h2 className="eyebrow mb-6">Essays</h2>
        <div>
          {essays === null && !error && (
            <p className="text-muted italic">Loading essays&#8230;</p>
          )}
          {error && (
            <p className="text-muted italic">
              Essays are published on{" "}
              <a
                href="https://aasifj.substack.com"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Substack
              </a>
              .
            </p>
          )}
          {essays && essays.length > 0 && (
            <>
              <div className="flex flex-col gap-4">
                {essays.map((e) => (
                  <div key={e.url} className="flex gap-4 sm:gap-6">
                    <span className="text-sm text-muted pt-0.5 whitespace-nowrap">
                      {isoDay(e.date) || "—"}
                    </span>
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-ink hover:text-crimson transition-colors"
                    >
                      {e.title}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-[15px]">
                <a
                  href="https://aasifj.substack.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-crimson hover:text-crimson-dark transition-colors"
                >
                  [ <span className="underline decoration-1 underline-offset-4">Check more essays on Substack</span> -&gt; ]
                </a>
              </div>
            </>
          )}
          {essays && essays.length === 0 && (
            <p className="text-muted italic">
              No essays yet. Check{" "}
              <a
                href="https://aasifj.substack.com"
                target="_blank"
                rel="noreferrer"
                className="link"
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
