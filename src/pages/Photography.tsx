import {useEffect, useState} from "react";

const ALBUM_ID = "72157687588601032";
const USER_PATH = "criatvt";
const API_KEY = import.meta.env.VITE_FLICKR_API_KEY as string | undefined;

type Photo = {
  id: string;
  title: string;
  url_q?: string; // square thumb
  url_m?: string; // medium fallback
};

async function flickr(method: string, params: Record<string, string>) {
  const qs = new URLSearchParams({
    method,
    api_key: API_KEY as string,
    format: "json",
    nojsoncallback: "1",
    ...params,
  });
  const res = await fetch(`https://api.flickr.com/services/rest/?${qs}`);
  if (!res.ok) throw new Error(`Flickr ${method} failed`);
  return res.json();
}

export default function Photography() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!API_KEY) return; // fall back to iframe
    (async () => {
      try {
        const lookup = await flickr("flickr.urls.lookupUser", {
          url: `https://www.flickr.com/photos/${USER_PATH}`,
        });
        const nsid = lookup?.user?.id;
        if (!nsid) throw new Error("no nsid");
        const data = await flickr("flickr.photosets.getPhotos", {
          photoset_id: ALBUM_ID,
          user_id: nsid,
          extras: "url_q,url_m",
        });
        const list: Photo[] = data?.photoset?.photo ?? [];
        setPhotos(list);
      } catch {
        setFailed(true);
      }
    })();
  }, []);

  const showGrid = API_KEY && !failed;

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-ink mb-4">
          Photography
        </h1>
        <p className="font-body text-lg text-muted mb-12">
          A camera usually comes along for the ride.
        </p>
      </div>

      {showGrid ? (
        <div className="max-w-5xl mx-auto">
          {photos === null ? (
            <p className="max-w-2xl mx-auto font-body text-muted italic">
              Loading photos…
            </p>
          ) : photos.length === 0 ? (
            <p className="max-w-2xl mx-auto font-body text-muted italic">
              No photos found.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {photos.map((p) => (
                <a
                  key={p.id}
                  href={`https://www.flickr.com/photos/${USER_PATH}/${p.id}/in/album-${ALBUM_ID}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="block aspect-square overflow-hidden bg-ink/5"
                >
                  <img
                    src={p.url_q ?? p.url_m}
                    alt={p.title || "Photograph"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Fallback: album-player iframe (no API key, or Flickr request failed).
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[4/5] md:aspect-video bg-card overflow-hidden border border-ink/5">
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
          <p className="mt-4 font-body text-sm text-muted">
            <a
              href={`https://www.flickr.com/photos/${USER_PATH}/albums/${ALBUM_ID}/`}
              target="_blank"
              rel="noreferrer"
              className="text-crimson underline decoration-1 underline-offset-4 decoration-crimson/40 hover:decoration-crimson"
            >
              View the full album on Flickr →
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
