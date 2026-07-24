import {writeFileSync, existsSync, readFileSync} from "node:fs";
import {execSync} from "node:child_process";

const FEED = "https://aasifj.substack.com/feed";
const OUT = "public/essays.json";

// Substack blocks default/datacenter clients (e.g. CI runners), which used to
// silently produce an empty feed. Send a browser User-Agent to look like a
// normal reader, and — crucially — never overwrite a good essays.json with an
// empty result. This file is only a fallback; the site fetches the feed live in
// the browser, so a blocked CI fetch should preserve the last known-good data
// rather than wipe it.
function bail(reason) {
  console.warn(`fetch-essays: ${reason}; keeping existing ${OUT}.`);
  if (!existsSync(OUT)) writeFileSync(OUT, "[]\n"); // never leave the file missing
  process.exit(0); // exit 0 so `npm run build` / deploy is not blocked
}

let xml = "";
try {
  const res = await fetch(FEED, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });
  if (!res.ok) bail(`feed returned HTTP ${res.status}`);
  xml = await res.text();
} catch (err) {
  bail(`feed fetch failed (${err.message})`);
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
