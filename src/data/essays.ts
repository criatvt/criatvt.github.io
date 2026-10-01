import {useEffect, useState} from "react";

// Render a date the way the rest of the site does: 20 Aug 2026.
export function shortDate(raw?: string): string {
  if (!raw) return "";
  const t = Date.parse(raw);
  if (Number.isNaN(t)) return "";
  return new Date(t).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata", // the same day for every visitor, wherever they are
  });
}

export type Essay = {
  title: string;
  url: string;
  date?: string;
  subtitle?: string;
  image?: string;
};

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
    const res = await fetch(`${import.meta.env.BASE_URL}essays.json`);
    if (!res.ok) throw new Error("not found");
    const data = (await res.json()) as Essay[];
    return Array.isArray(data) ? data : [];
  } catch {
    return null;
  }
}

// Essays for any page: the bundled snapshot as soon as it arrives, then the
// live feed merged in. The feed alone can't show everything: Substack's RSS
// only carries the newest posts, and rss2json trims that further, so the
// snapshot supplies the back-catalogue and live data wins on duplicates.
export function useEssays(): {essays: Essay[] | null; error: boolean} {
  const [essays, setEssays] = useState<Essay[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const snapshotP = loadSnapshot();
      const liveP = loadLive();
      const snapshot = await snapshotP;
      if (cancelled) return;
      if (snapshot !== null) setEssays(mergeEssays(snapshot));
      const live = await liveP;
      if (cancelled) return;
      if (live === null && snapshot === null) setError(true);
      else setEssays(mergeEssays(live ?? [], snapshot ?? []));
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return {essays, error};
}
