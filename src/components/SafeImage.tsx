import {useState, type ImgHTMLAttributes, type ReactNode} from "react";

// An <img> that survives its host going away. Remote covers and press images
// are hotlinked, so when one fails to load the frame keeps its size and shows
// the surface colour (or `fallback`) instead of a broken-image icon.
export default function SafeImage({
  fallback,
  className = "",
  alt,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & {fallback?: ReactNode}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    if (fallback === null) return null;
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div role="img" aria-label={alt} className={`${className} bg-surface`} />
    );
  }
  return <img alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}
