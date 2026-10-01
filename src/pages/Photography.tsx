import {useEffect, useRef, useState} from "react";
import photos from "../data/photos.json";

const ALBUM_ID = "72157687588601032";
const USER_PATH = "criatvt";

// The album is a committed list (src/data/photos.json), refreshed by hand with
// `npm run photos`; nothing is fetched at build time or in the browser. Each
// photo links to its page in Flickr's lightbox, which shows it at full
// resolution and steps through the rest of the album.
type Photo = {
  id: string;
  title: string;
  description?: string;
  thumb: string;
  large: string;
  width?: number;
  height?: number;
  link: string; // the photo's page within the album
};

const album = photos as Photo[];
const lightbox = (p: Photo) => `${p.link.replace(/\/$/, "")}/lightbox/`;
const albumUrl = `https://www.flickr.com/photos/${USER_PATH}/albums/${ALBUM_ID}/`;

// One photo per screen. The page is its own scroll container — a viewport
// minus the fixed nav (52px) — with mandatory y-snapping, so a scroll settles
// on the next photo instead of stopping halfway. It has to be a local
// container rather than the document: snapping on the document is fragile
// across browsers once any ancestor clips overflow.
const FRAME =
  "h-[calc(100svh-52px)] overflow-y-auto snap-y snap-mandatory outline-none";
const SECTION =
  "snap-start h-full flex flex-col items-center justify-center px-4 md:px-10 py-6 md:py-10";
// The intro write-up runs longer than a phone screen. It needs min-h-full
// rather than h-full: a centered flex column clips the top of anything taller
// than itself, so the section must be allowed to grow with its text.
const INTRO_SECTION =
  "snap-start min-h-full flex flex-col justify-center py-12";

// The write-up, two sentences to a paragraph: short beats carry better on a
// phone than one long block.
const INTRO_PARAS = [
  "Photography is more than a hobby. It helps me slow down time and be in the moment.",
  "I took it up in the late 2000s at college, borrowing cameras from friends. I bought one for myself in the mid-2010s, once I started earning enough.",
  "My photos have been shown at exhibitions in Bengaluru, and I have won cash prizes in contests. While I did take up professional engagements, it wasn’t as fun as doing it for myself.",
  "I learnt more about photography when I started teaching it to children.",
  "This page shows some of my favourite published shots. There are thousands more that I may publish… someday :)",
];

export default function Photography() {
  const [current, setCurrent] = useState<number | null>(null);
  const frame = useRef<HTMLDivElement | null>(null);

  // Focus the frame so Space, Page Down and the arrow keys scroll the album
  // straight away, without a click first.
  useEffect(() => {
    frame.current?.focus({preventScroll: true});
  }, []);

  // Track which photo is on screen, for the counter in the corner. The title
  // and closing screens carry index -1, which clears the counter.
  useEffect(() => {
    const root = frame.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.index);
          setCurrent(i >= 0 ? i : null);
        }
      },
      {root, threshold: 0.55},
    );
    root.querySelectorAll("section[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={frame} tabIndex={-1} className={FRAME} aria-label="Photography album">
      {/* Opening screen: title and write-up. */}
      <section data-index={-1} className={INTRO_SECTION}>
        <div className="page">
          <h1 className="title-1 enter">Photography</h1>
          <div className="prose-col enter-2 mt-8 flex flex-col gap-4 text-ink-2 md:mt-10 md:gap-5">
            {INTRO_PARAS.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <p className="enter-3 mt-10 flex items-center gap-2 text-[0.9375rem] text-muted">
            <span>Scroll to begin</span>
            <span aria-hidden="true" className="text-[1.125rem] leading-none">↓</span>
          </p>
        </div>
      </section>

      {album.map((p, i) => (
        <section key={p.id} data-index={i} className={`${SECTION} gap-5 md:gap-6`}>
          {/* The image takes most of the frame, contained so nothing is ever
              cropped. Its cap is measured against the viewport (the frame is
              100svh minus the nav) so the caption sits right under it; min-h-0
              lets it give way to a long caption on short screens. It opens the
              photo in Flickr's full-resolution lightbox. */}
          <a
            href={lightbox(p)}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-0 max-w-full justify-center"
            aria-label={`${p.title || "Photograph"}, open full size on Flickr`}
          >
            <img
              src={p.large}
              alt={p.title || "Photograph"}
              width={p.width}
              height={p.height}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              className="max-h-[calc((100svh-52px)*0.74)] min-h-0 w-auto max-w-full object-contain"
            />
          </a>
          {(p.title || p.description) && (
            <div className="shrink-0 max-w-xl text-center">
              {p.title && <h2 className="title-3">{p.title}</h2>}
              {p.description && (
                <p className="mt-1.5 text-[0.9375rem] leading-[1.55] text-muted">
                  {p.description}
                </p>
              )}
            </div>
          )}
        </section>
      ))}

      {/* Closing screen: the whole album, one by one, at full resolution. */}
      <section data-index={-1} className={`${SECTION} text-center`}>
        <h2 className="title-2">That&rsquo;s the album.</h2>
        <p className="mt-4 max-w-[36ch] text-muted">
          See every photo at full resolution, one by one, in Flickr&rsquo;s
          lightbox.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          {album[0] && (
            <a href={lightbox(album[0])} target="_blank" rel="noreferrer" className="btn btn-primary">
              Open the lightbox
            </a>
          )}
          <a href={albumUrl} target="_blank" rel="noreferrer" className="link-more">
            Album on Flickr
          </a>
        </div>
      </section>

      {/* Position in the album, pinned out of the way. */}
      {current !== null && (
        <p className="fixed bottom-5 right-5 z-40 rounded-full bg-paper/75 px-3 py-1 text-[0.875rem] text-muted tabular-nums backdrop-blur-md pointer-events-none">
          {current + 1} of {album.length}
        </p>
      )}
    </div>
  );
}
