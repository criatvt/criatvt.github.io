import {useState, type ImgHTMLAttributes, type ReactNode} from "react";

const PREVIEW = Boolean(import.meta.env.VITE_PREVIEW);
const isRemote = (src?: string) => !!src && /^https?:\/\//.test(src);
const hostOf = (src: string) => {
  try {
    return new URL(src).hostname.replace(/^www\./, "");
  } catch {
    return "another site";
  }
};

// An <img> that survives its host going away. Remote covers and press images
// are hotlinked, so when one fails the frame keeps its size and shows the
// surface colour (or `fallback`; null collapses it) instead of a broken icon.
// In preview builds remote images can't load at all, so they render as a
// labelled placeholder that keeps the layout reviewable.
export default function SafeImage({
  fallback,
  className = "",
  alt,
  src,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & {fallback?: ReactNode}) {
  const [failed, setFailed] = useState(false);
  if (PREVIEW && isRemote(src)) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} flex items-center justify-center bg-surface p-4 text-center text-[0.875rem] text-muted`}
      >
        Image from {hostOf(src as string)}
      </div>
    );
  }
  if (failed) {
    if (fallback === null) return null;
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div role="img" aria-label={alt} className={`${className} bg-surface`} />
    );
  }
  return <img alt={alt} src={src} className={className} onError={() => setFailed(true)} {...rest} />;
}
