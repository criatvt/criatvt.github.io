import {Link} from "react-router-dom";

// Ploca's mark: three concentric discs, drawn from the product's own icon.
function PlocaMark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="mx-auto h-24 w-24 text-ploca-on-band md:h-28 md:w-28">
      <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.16" />
      <circle cx="50" cy="50" r="34" fill="currentColor" fillOpacity="0.45" />
      <circle cx="50" cy="50" r="20" fill="currentColor" />
    </svg>
  );
}

// The flagship, as a full-bleed black band: the one way Ploca appears, first
// after the intro on Home and first on Build. Copy follows ploca.app.
export default function PlocaBand({more}: {more?: {to: string; label: string}}) {
  return (
    <section aria-labelledby="ploca-title" className="band">
      <div className="page text-center">
        <PlocaMark />
        <p className="label mt-8">Currently building</p>
        <h2 id="ploca-title" className="display mt-2">ploca</h2>
        <p className="title-3 mx-auto mt-5 max-w-[24ch] font-semibold text-on-band">
          Dictation in the way you speak, privately on your Mac.
        </p>
        <p className="lede mx-auto mt-4 max-w-[38ch]">
          Hinglish, Tanglish or English, landing at your cursor in any app.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a href="https://ploca.app" target="_blank" rel="noreferrer" className="btn btn-primary">
            Visit ploca.app
          </a>
          {more && (
            <Link to={more.to} className="link-more tap">
              {more.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
