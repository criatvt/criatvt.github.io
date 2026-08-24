import {writeFileSync, existsSync, readFileSync} from "node:fs";
import {execSync} from "node:child_process";

const FEED = "https://aasifj.substack.com/feed";
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
let jsonEssays = null;
const failures = [];
for (const {url, kind} of SOURCES) {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        accept: "application/rss+xml, application/xml, text/xml, application/json, */*",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.text();
    if (kind === "json") {
      // rss2json envelope: {status: "ok", items: [{title, link, pubDate,
      // description, enclosure: {link}, thumbnail}, ...]}
      const data = JSON.parse(body);
      if (data.status !== "ok" || !Array.isArray(data.items) || !data.items.length)
        throw new Error("no items in JSON response");
      jsonEssays = data.items
        .filter((i) => i && i.link)
        .map((i) => ({
          title: i.title || "",
          url: i.link,
          date: i.pubDate || undefined,
          subtitle: (i.description || "").trim() || undefined,
          image: i.enclosure?.link || i.thumbnail || undefined,
        }));
    } else {
      if (!body.includes("<item")) throw new Error("no <item> in response");
      xml = body;
    }
    console.log(`fetch-essays: got feed via ${new URL(url).host}`);
    break;
  } catch (err) {
    failures.push(`${new URL(url).host}: ${err.message}`);
  }
}
if (!xml && !jsonEssays) bail(`all sources failed (${failures.join("; ")})`);

if (jsonEssays) {
  writeFileSync(OUT, JSON.stringify(jsonEssays, null, 2) + "\n");
  console.log(`Wrote ${jsonEssays.length} essays to ${OUT}`);
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

writeFileSync(OUT, JSON.stringify(essays, null, 2) + "\n");
console.log(`Wrote ${essays.length} essays to ${OUT}`);
