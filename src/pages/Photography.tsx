import {useEffect, useRef, useState} from "react";

const ALBUM_ID = "72157687588601032";
const USER_PATH = "criatvt";

// Photos come from public/photos.json, refreshed by scripts/fetch-photos.mjs
// (see prebuild). If that file is missing or empty, the page falls back to the
// Flickr album player so there is always something to look at.
type Photo = {
  id: string;
  title: string;
  description?: string;
  thumb: string;
  large: string;
  width?: number;
  height?: number;
  link: string;
};

// One photo per screen. The page is its own scroll container — a viewport
// minus the fixed nav (5rem) — with mandatory y-snapping, so a scroll settles
// on the next photo instead of stopping halfway. It has to be a local
// container rather than the document: Layout's `overflow-x-hidden` wrapper
// captures the snap areas, which silently kills document-level snapping.
const FRAME = "h-[calc(100svh-5rem)] overflow-y-auto snap-y snap-mandatory";
const SECTION =
  "snap-start h-full flex flex-col items-center justify-center px-4 md:px-8 py-8";

export default function Photography() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const frame = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/photos.json");
        if (!res.ok) throw new Error("not found");
        const data = (await res.json()) as Photo[];
        if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
        if (!cancelled) setPhotos(data);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Track which photo is on screen, for the counter in the corner. The title
  // and closing screens carry index -1, which clears the counter.
  useEffect(() => {
    const root = frame.current;
    if (!photos || !root) return;
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
  }, [photos]);

  return (
    <div ref={frame} className={FRAME}>
      {/* Opening screen: the page's own title card. */}
      <section data-index={-1} className={`${SECTION} text-center`}>
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-ink mb-6">
            Photography
          </h1>
          <p className="font-body text-lg text-muted leading-relaxed mb-6">
            Photography is more than a hobby. It helps me slow down time and be
            in the moment. I took it up in the late 2000s at college, borrowing
            cameras from friends. I bought one for myself in the mid-2010s, once
            I started earning enough. My photos have been shown at exhibitions
            in Bengaluru, and I have won cash prizes in contests. While I did
            take up professional engagements, it wasn't as fun as doing it for
            myself. I learnt more about photography when I started teaching it
            to children.
          </p>
          <p className="font-body text-lg text-muted leading-relaxed">
            This page shows some of my favourite published shots. There are
            thousands more that I may publish... someday :)
          </p>
          <p className="eyebrow mt-10">
            Scroll ↓
          </p>
        </div>
      </section>

      {failed ? (
        // Fallback: album player (photos.json missing or empty).
        <section className={SECTION}>
          <div className="w-full max-w-5xl aspect-[4/5] md:aspect-video bg-card overflow-hidden rounded-[9px] border border-line">
            <iframe
              src={`https://www.flickr.com/photos/${USER_PATH}/albums/${ALBUM_ID}/player/`}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Photography Archive"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </section>
      ) : photos === null ? (
        <section className={SECTION}>
          <p className="font-body text-muted italic">Loading photos…</p>
        </section>
      ) : (
        photos.map((p, i) => (
          <section
            key={p.id}
            data-index={i}
            className={`${SECTION} gap-5`}
          >
            {/* The image takes most of the frame, contained so nothing is ever
                cropped; the rest is left for the caption below it. */}
            <img
              src={p.large}
              alt={p.title || "Photograph"}
              width={p.width}
              height={p.height}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              // min-h-0 lets a tall photo give way to a long caption on short
              // screens instead of spilling past the frame.
              className="max-h-[78%] min-h-0 w-auto max-w-full object-contain"
            />
            {(p.title || p.description) && (
              <figcaption className="shrink-0 max-w-xl text-center">
                {p.title && (
                  <h2 className="text-lg md:text-xl text-ink">
                    {p.title}
                  </h2>
                )}
                {p.description && (
                  <p className="mt-1 font-body text-sm text-muted leading-relaxed">
                    {p.description}
                  </p>
                )}
              </figcaption>
            )}
          </section>
        ))
      )}

      {/* Closing screen. */}
      <section data-index={-1} className={`${SECTION} text-center`}>
        <p className="font-serif text-2xl md:text-3xl text-ink mb-4">
          That's the album.
        </p>
        <a
          href={`https://www.flickr.com/photos/${USER_PATH}/albums/${ALBUM_ID}/`}
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          View the full album on Flickr →
        </a>
      </section>

      {/* Position in the album, pinned out of the way. */}
      {photos && current !== null && (
        <p className="eyebrow fixed bottom-5 right-5 z-40 tabular-nums pointer-events-none">
          {String(current + 1).padStart(2, "0")} / {photos.length}
        </p>
      )}
    </div>
  );
}
