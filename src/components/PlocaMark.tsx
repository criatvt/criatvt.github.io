// ploca's mark: three concentric circles. Colors come from the
// --color-ploca-* tokens in index.css, which invert outer/inner between
// light and dark mode so the mark still reads against either background.
export default function PlocaMark({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11.5" className="fill-ploca-outer" />
      <circle cx="12" cy="12" r="7.8" className="fill-ploca-mid" />
      <circle cx="12" cy="12" r="4.5" className="fill-ploca-inner" />
    </svg>
  );
}
