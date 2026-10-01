import {Link} from "react-router-dom";

// Ploca's mark: three concentric discs, drawn from the product's own icon.
// It uses the --color-ploca token so it flips with the theme.
function PlocaMark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="h-24 w-24 shrink-0 text-ploca md:h-28 md:w-28">
      <circle cx="50" cy="50" r="50" fill="currentColor" fillOpacity="0.1" />
      <circle cx="50" cy="50" r="34" fill="currentColor" fillOpacity="0.4" />
      <circle cx="50" cy="50" r="20" fill="currentColor" />
    </svg>
  );
}

// The flagship, shown the same way wherever it appears (Home, Build). The
// copy follows ploca.app; `more` adds an optional secondary link.
export default function PlocaTile({more}: {more?: {to: string; label: string}}) {
  return (
    <section aria-labelledby="ploca-title" className="tile px-7 py-12 sm:px-12 md:py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <PlocaMark />
        <div>
          <p className="label">Currently building</p>
          <h2 id="ploca-title" className="title-1 mt-2">ploca</h2>
          <p className="title-3 mt-4 max-w-[26ch] font-normal text-ink-2">
            Dictation in the way you speak, privately on your Mac.
          </p>
          <p className="mt-3 max-w-[40ch] text-muted">
            Hinglish, Tanglish or English, landing at your cursor in any app.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
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
      </div>
    </section>
  );
}
