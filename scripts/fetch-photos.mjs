import {writeFileSync, existsSync, readFileSync} from "node:fs";

// Builds public/photos.json — the album behind the Photography page.
//
// Two sources, in order of preference:
//   1. The Flickr API, when FLICKR_API_KEY is set. Returns the whole album.
//   2. The public album page's embedded model, which needs no key but only
//      carries the first 25 photos (the rest load client-side on scroll).
//
// Like fetch-essays.mjs, this never replaces good data with worse: a run that
// yields nothing — or fewer photos than the file already has — keeps the
// existing file and exits 0 so a build is never blocked.

const ALBUM_ID = "72157687588601032";
const USER_PATH = "criatvt";
const OUT = "public/photos.json";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function existing() {
  if (!existsSync(OUT)) return [];
  try {
    const parsed = JSON.parse(readFileSync(OUT, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function bail(reason) {
  console.warn(`fetch-photos: ${reason}; keeping existing ${OUT}.`);
  if (!existsSync(OUT)) writeFileSync(OUT, "[]\n"); // never leave the file missing
  process.exit(0);
}

const https = (url) => (url?.startsWith("//") ? `https:${url}` : url);

// Flickr descriptions are HTML (links, <br>, entities). The page renders them
// as plain text, so flatten them here rather than shipping markup.
function text(html) {
  return (html || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "") // links keep their visible text
    .replace(/&(nbsp|amp|quot|#0?39|apos|lt|gt);/g, (_, e) =>
      ({nbsp: " ", amp: "&", quot: '"', "#039": "'", "#39": "'", apos: "'", lt: "<", gt: ">"})[e],
    )
    .replace(/\s+/g, " ")
    .trim();
}

const pageUrl = (id) =>
  `https://www.flickr.com/photos/${USER_PATH}/${id}/in/album-${ALBUM_ID}/`;

// ---------------------------------------------------------------- API source

async function flickr(method, params) {
  const qs = new URLSearchParams({
    method,
    api_key: process.env.FLICKR_API_KEY,
    format: "json",
    nojsoncallback: "1",
    ...params,
  });
  const res = await fetch(`https://api.flickr.com/services/rest/?${qs}`, {
    headers: {"user-agent": UA},
  });
  if (!res.ok) throw new Error(`${method} returned HTTP ${res.status}`);
  const json = await res.json();
  if (json.stat !== "ok") throw new Error(`${method}: ${json.message}`);
  return json;
}

async function fromApi() {
  const lookup = await flickr("flickr.urls.lookupUser", {
    url: `https://www.flickr.com/photos/${USER_PATH}`,
  });
  const nsid = lookup?.user?.id;
  if (!nsid) throw new Error("could not resolve user NSID");

  const photos = [];
  for (let page = 1; ; page++) {
    const data = await flickr("flickr.photosets.getPhotos", {
      photoset_id: ALBUM_ID,
      user_id: nsid,
      per_page: "500",
      page: String(page),
      extras: "description,url_q,url_z,url_c,url_l,url_h,url_k",
    });
    const set = data.photoset;
    for (const p of set.photo ?? []) {
      const big =
        [
          [p.url_k, p.width_k, p.height_k],
          [p.url_h, p.width_h, p.height_h],
          [p.url_l, p.width_l, p.height_l],
          [p.url_c, p.width_c, p.height_c],
          [p.url_z, p.width_z, p.height_z],
        ].find(([u]) => u) ?? [];
      if (!p.url_q || !big[0]) continue;
      photos.push({
        id: p.id,
        title: p.title || "",
        description: text(p.description?._content),
        thumb: https(p.url_q),
        large: https(big[0]),
        width: Number(big[1]) || undefined,
        height: Number(big[2]) || undefined,
        link: pageUrl(p.id),
      });
    }
    if (page >= Number(set.pages || 1)) break;
  }
  return photos;
}

// ------------------------------------------------------------- Scrape source

// The album page ships its data as `modelExport: { ... }` inside a script tag.
// Slice it out by matching braces, then read the photo list off the model.
function modelExport(html) {
  const at = html.indexOf("modelExport: {");
  if (at < 0) throw new Error("no modelExport in album page");
  const start = html.indexOf("{", at);
  let depth = 0;
  for (let i = start; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}" && --depth === 0)
      return JSON.parse(html.slice(start, i + 1));
  }
  throw new Error("unbalanced modelExport");
}

async function fromAlbumPage() {
  const res = await fetch(
    `https://www.flickr.com/photos/${USER_PATH}/albums/${ALBUM_ID}/`,
    {headers: {"user-agent": UA}},
  );
  if (!res.ok) throw new Error(`album page returned HTTP ${res.status}`);
  const model = modelExport(await res.text());
  const set = model?.main?.["set-models"]?.[0]?.data;
  const list = set?.photoPageList?.data?._data ?? [];

  const photos = [];
  for (const item of list) {
    const p = item?.data;
    const sizes = p?.sizes?.data;
    if (!p?.id || !sizes) continue;
    const thumb = sizes.q?.data ?? sizes.sq?.data;
    const big = ["k", "h", "l", "c", "z", "m"]
      .map((k) => sizes[k]?.data)
      .find(Boolean);
    if (!thumb || !big) continue;
    photos.push({
      id: String(p.id),
      title: p.title || "",
      description: text(p.description),
      thumb: https(thumb.url),
      large: https(big.url),
      width: big.width,
      height: big.height,
      link: pageUrl(p.id),
    });
  }
  if (set?.photoCount && photos.length < set.photoCount) {
    console.warn(
      `fetch-photos: album page carries ${photos.length} of ${set.photoCount} photos. ` +
        "Set FLICKR_API_KEY to pull the whole album.",
    );
  }
  return photos;
}

// ------------------------------------------------------------------ Run them

let photos = [];
try {
  photos = process.env.FLICKR_API_KEY ? await fromApi() : await fromAlbumPage();
} catch (err) {
  bail(`fetch failed (${err.message})`);
}

if (photos.length === 0) bail("parsed 0 photos");

const had = existing().length;
if (photos.length < had) bail(`got ${photos.length} photos, file already has ${had}`);

writeFileSync(OUT, JSON.stringify(photos, null, 2) + "\n");
console.log(`Wrote ${photos.length} photos to ${OUT}`);
