import {Link} from "react-router-dom";

export default function NotFound() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-serif text-6xl md:text-8xl tracking-tight text-crimson mb-6">
          404
        </h1>
        <p className="font-body text-xl text-muted mb-10">
          This page wandered off the trail.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-ink text-paper px-8 py-4 rounded-full font-serif text-lg hover:bg-crimson transition-colors"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
