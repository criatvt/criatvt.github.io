import {ArrowUpRight} from "lucide-react";

// Format an ISO date string into the site's card style (e.g. "20 Feb 2025").
// Returns "" for missing/invalid input so callers can gate on it.
export function formatDate(raw?: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// A single link card: cover image, meta row, title, subtitle. Shared by the
// Writing and Educate pages so every card grid looks identical.
//   - `label`  → small uppercase eyebrow (essays/talks use the date here)
//   - `brand`  → publication name, rendered as a serif masthead wordmark with a
//                crimson underline so journalism cards read as authentic press.
// Props are typed `any` on purpose: this project ships without @types/react, so
// React runs untyped and a concrete props type would reject the `key` prop that
// React strips at runtime (there's no LibraryManagedAttributes to handle it).
export function ArticleCard({url, image, label, brand, title, subtitle}: any) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col border border-ink/10 overflow-hidden transition-colors hover:bg-card"
    >
      {image && (
        <div className="aspect-[16/10] overflow-hidden bg-card">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(ev) => {
              ev.currentTarget.parentElement?.remove();
            }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="flex flex-col gap-2">
            {brand && (
              <span className="font-serif text-lg leading-none text-ink tracking-tight border-b-2 border-crimson/50 pb-1 self-start group-hover:border-crimson transition-colors">
                {brand}
              </span>
            )}
            {label && (
              <span className="font-body text-[11px] uppercase tracking-widest text-muted">
                {label}
              </span>
            )}
          </span>
          <ArrowUpRight className="w-5 h-5 text-muted shrink-0 ml-auto transition-all group-hover:text-crimson group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <h3 className="font-serif text-xl text-ink group-hover:text-crimson transition-colors mt-4 leading-snug">
          {title}
        </h3>
        {subtitle && (
          <p className="font-body text-sm text-muted mt-2 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </a>
  );
}
