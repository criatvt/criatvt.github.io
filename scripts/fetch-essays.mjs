import {writeFileSync, existsSync, readFileSync} from "node:fs";
import {execSync} from "node:child_process";

const SUBSTACK = "https://aasifj.substack.com";
const FEED = `${SUBSTACK}/feed`;
const OUT = "public/essays.json";

// Substack blocks default/datacenter clients (e.g. CI runners), which used to
// silently produce an empty feed. Send a browser User-Agent to look like a
// normal reader, and — crucially — never overwrite a good essays.json with an
// empty result. A blocked fetch should preserve the last known-good data
// rather than wipe it.
function bail(reason) {
  console.warn(`fetch-essays: ${reason}; keeping existing ${OUT}.`);
  if (!existsSync(OUT)) writeFileSync(OUT, "[]\n"); // never leave the file missing
  process.exit(0); // exit 0 so `npm run build` / deploy is not blocked
}

const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  accept: "application/rss+xml, application/xml, text/xml, application/json, */*",
};

// A post's canonical address, for deduping the same essay across sources —
// feed links can carry tracking params the archive's links don't.
const canonical = (url) => {
  try {
    const u = new URL(url);
    return u.origin + u.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
};

const timeOf = (date) => {
  const t = date ? Date.parse(date) : NaN;
  return Number.isNaN(t) ? 0 : t;
};

// The feed only carries Substack's newest posts (and rss2json trims it to ten
// on the free tier), so a plain overwrite loses every essay older than the
// current feed window — which is how essays.json once shrank to ten entries.
// Union the fetch into the existing file instead: fetched entries win on
// duplicates, nothing already recorded is ever dropped. (The flip side: a post
// deleted on Substack lingers here until removed from essays.json by hand.)
function writeMerged(fetched, source) {
  let existing = [];
  try {
    const data = JSON.parse(readFileSync(OUT, "utf8"));
    if (Array.isArray(data)) existing = data;
  } catch {
    // Missing or malformed snapshot: start from the fetch alone.
  }
  const byUrl = new Map();
  for (const e of [...fetched, ...existing]) {
    if (!e?.url) continue;
    const key = canonical(e.url);
    if (!byUrl.has(key)) byUrl.set(key, e);
  }
  const merged = [...byUrl.values()].sort((a, b) => timeOf(b.date) - timeOf(a.date));
  writeFileSync(OUT, JSON.stringify(merged, null, 2) + "\n");
  console.log(
    `fetch-essays: ${fetched.length} essays via ${source}, ${merged.length} total in ${OUT}`,
  );
}

// Substack's archive API returns every post, not just the feed window, so it
// is the preferred source. Like the feed it 403s datacenter IPs, so from CI
// this usually fails and the feed sources below take over — but a local
// `npm run essays` from a residential connection backfills the full archive.
async function fetchArchive() {
  const essays = [];
  const limit = 50;
  for (let offset = 0; ; offset += limit) {
    const res = await fetch(
      `${SUBSTACK}/api/v1/archive?sort=new&offset=${offset}&limit=${limit}`,
      {headers: HEADERS},
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();
    if (!Array.isArray(posts)) throw new Error("unexpected archive response");
    for (const p of posts) {
      if (!p?.canonical_url) continue;
      essays.push({
        title: p.title || "",
        url: p.canonical_url,
        date: p.post_date || undefined,
        subtitle: (p.subtitle || p.description || "").trim() || undefined,
        image: p.cover_image || undefined,
      });
    }
    if (posts.length < limit) break;
  }
  if (essays.length === 0) throw new Error("archive returned 0 posts");
  return essays;
}

try {
  writeMerged(await fetchArchive(), "archive API");
  process.exit(0);
} catch (err) {
  console.warn(`fetch-essays: archive API failed (${err.message}); trying the feed.`);
}

// The direct fetch works from a residential machine but Substack 403s GitHub's
// runner IPs, so from CI the feed has to come through an intermediary whose
// own server does the fetch — Substack sees its IP, not the runner's. Plain
// CORS proxies (corsproxy.io, allorigins, codetabs) are blocked or dead too,
// so the reliable sources are the feed services: openrss.org re-serves the
// feed as RSS XML from its cache, and rss2json.com converts it to JSON. Same
// source list the Writing page uses in the browser.
const SOURCES = [
  {url: FEED, kind: "xml"},
  {url: `https://openrss.org/aasifj.substack.com`, kind: "xml"},
  {
    url: `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED)}`,
    kind: "json",
  },
  {url: `https://corsproxy.io/?url=${encodeURIComponent(FEED)}`, kind: "xml"},
  {url: `https://api.allorigins.win/raw?url=${encodeURIComponent(FEED)}`, kind: "xml"},
];

let xml = "";
let xmlHost = "";
let jsonEssays = null;
const failures = [];
for (const {url, kind} of SOURCES) {
  try {
    const res = await fetch(url, {headers: HEADERS});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.text();
    if (kind === "json") {
      // rss2json envelope: {status: "ok", items: [{title, link, pubDate,
      // description, enclosure: {link}, thumbnail}, ...]}
      const data = JSON.parse(body);
      if (data.status !== "ok" || !Array.isArray(data.items) || !data.items.length)
        throw new Error("no items in JSON response");
      // rss2json reports pubDate as "YYYY-MM-DD HH:mm:ss" in UTC — a format
      // Safari's Date parser rejects — so normalise it to ISO.
      const iso = (d) =>
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(d || "")
          ? d.replace(" ", "T") + "Z"
          : d || undefined;
      jsonEssays = data.items
        .filter((i) => i && i.link)
        .map((i) => ({
          title: i.title || "",
          url: i.link,
          date: iso(i.pubDate),
          subtitle: (i.description || "").trim() || undefined,
          image: i.enclosure?.link || i.thumbnail || undefined,
        }));
    } else {
      if (!body.includes("<item")) throw new Error("no <item> in response");
      xml = body;
      xmlHost = new URL(url).host;
    }
    console.log(`fetch-essays: got feed via ${new URL(url).host}`);
    break;
  } catch (err) {
    failures.push(`${new URL(url).host}: ${err.message}`);
  }
}
if (!xml && !jsonEssays) bail(`all sources failed (${failures.join("; ")})`);

if (jsonEssays) {
  writeMerged(jsonEssays, "rss2json");
  process.exit(0);
}

// Pull in the parser transiently — no permanent dependency.
execSync("npm i --no-save fast-xml-parser", {stdio: "inherit"});
const {XMLParser} = await import("fast-xml-parser");

const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: "@_"});
const parsed = parser.parse(xml);
const rawItems = parsed?.rss?.channel?.item ?? [];
const items = Array.isArray(rawItems) ? rawItems : [rawItems];

const str = (v) => (typeof v === "string" ? v : v == null ? "" : String(v));

const essays = items
  .filter((i) => i && i.link)
  .map((i) => ({
    title: str(i.title),
    url: i.link,
    date: i.pubDate,
    subtitle: str(i.description).trim() || undefined,
    image: i.enclosure?.["@_url"] || undefined,
  }));

if (essays.length === 0) bail("parsed 0 essays from feed");

writeMerged(essays, xmlHost || "feed");
