import {useState} from "react";
import SafeImage from "./SafeImage";
import {youtubeThumb, type Talk} from "../data/content";

// A magazine card: picture first, then a kicker, the title and a meta line.
// `lead` lays it out wide (picture beside the words) for the top story.
export function ImageCard({
  href,
  image,
  kicker,
  title,
  blurb,
  meta,
  lead = false,
}: {
  href: string;
  image?: string;
  kicker?: string;
  title: string;
  blurb?: string;
  meta?: string;
  lead?: boolean;
  key?: string; // this project's JSX types don't add `key` themselves
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`card ${lead ? "md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-10" : ""}`}
    >
      <div className="card-media aspect-[16/10]">
        {image && (
          <SafeImage
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        {kicker && <span className="label">{kicker}</span>}
        <span className={lead ? "title-2" : "card-title"}>{title}</span>
        {blurb && (
          <span className={`text-ink-2 ${lead ? "text-[1.0625rem]" : "line-clamp-3 text-[0.9375rem]"}`}>
            {blurb}
          </span>
        )}
        {meta && <span className="text-[0.875rem] text-muted tabular-nums">{meta}</span>}
      </div>
    </a>
  );
}

// A talk: the YouTube thumbnail with a play button; the player (privacy-
// enhanced youtube-nocookie) loads only when someone asks for it.
export function TalkVideo({talk}: {talk: Talk}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="card-media aspect-video">
      {playing ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${talk.youtubeId}?autoplay=1`}
          title={talk.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${talk.title}`}
          className="group relative block h-full w-full"
        >
          <SafeImage
            src={youtubeThumb(talk.youtubeId)}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-band/80 text-on-band backdrop-blur-sm transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
