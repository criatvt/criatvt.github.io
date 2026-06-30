import {Link} from "react-router-dom";
import {Star, ArrowRight} from "lucide-react";

const reviews = [
  {
    quote:
      "Aasif shows you how to turn the same instinct that makes you reach for your phone into a lifelong reading habit that actually sticks.",
    by: "Ankur Warikoo, Entrepreneur",
  },
  {
    quote:
      "Doomscroller to Reader is simple, straightforward and surprisingly hopeful.",
    by: "Meetha Raghunath, Actor",
  },
];

export default function Book() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Cover */}
        <img
          src="https://m.media-amazon.com/images/P/B0GH73Z8RP.01.LZZZZZZZ.jpg"
          alt="Doomscroller to Reader"
          className="w-48 md:w-60 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] mb-10"
          referrerPolicy="no-referrer"
        />

        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-ink leading-tight mb-6">
          Doomscroller{" "}
          <span className="italic text-crimson">to Reader</span>
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-crimson text-crimson" />
            ))}
            <div className="relative w-4 h-4">
              <Star className="absolute inset-0 w-4 h-4 text-ink/15" />
              <div className="absolute inset-0 overflow-hidden w-[80%]">
                <Star className="w-4 h-4 text-crimson fill-crimson" />
              </div>
            </div>
          </div>
          <span className="font-serif text-lg text-ink">4.8/5</span>
          <span className="font-body text-xs uppercase tracking-widest text-muted">
            Reader Reviews
          </span>
        </div>

        <p className="font-body text-xl md:text-2xl text-ink leading-relaxed mb-10">
          Build a reading habit without giving up your phone.
        </p>

        {/* Reviews */}
        <div className="space-y-8 border-l border-ink/10 pl-6 mb-12">
          {reviews.map((r) => (
            <blockquote
              key={r.by}
              className="font-body italic text-lg text-muted leading-relaxed"
            >
              "{r.quote}"
              <footer className="mt-3 font-body text-xs uppercase tracking-widest not-italic text-ink">
                &mdash; {r.by}
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <a
            href="https://www.amazon.in/dp/B0GH73Z8RP"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center bg-ink text-paper px-8 py-4 rounded-full font-serif text-lg hover:bg-crimson transition-colors"
          >
            Order on Amazon
          </a>
          <a
            href="/resources"
            className="group inline-flex items-center gap-2 font-serif text-lg text-crimson hover:text-ink transition-colors"
          >
            Book resources
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
