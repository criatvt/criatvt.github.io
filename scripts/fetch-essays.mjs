import {writeFileSync} from "node:fs";
import {execSync} from "node:child_process";

const FEED = "https://aasifj.substack.com/feed";

const xml = await (await fetch(FEED)).text();

// Pull in the parser transiently — no permanent dependency.
execSync("npm i --no-save fast-xml-parser", {stdio: "inherit"});
const {XMLParser} = await import("fast-xml-parser");

const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: "@_"});
const parsed = parser.parse(xml);
const rawItems = parsed?.rss?.channel?.item ?? [];
const items = Array.isArray(rawItems) ? rawItems : [rawItems];

const str = (v) => (typeof v === "string" ? v : v == null ? "" : String(v));

const essays = items.map((i) => ({
  title: str(i.title),
  url: i.link,
  date: i.pubDate,
  subtitle: str(i.description).trim() || undefined,
  image: i.enclosure?.["@_url"] || undefined,
}));

writeFileSync("public/essays.json", JSON.stringify(essays, null, 2) + "\n");
console.log(`Wrote ${essays.length} essays to public/essays.json`);
