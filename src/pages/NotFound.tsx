import {Link} from "react-router-dom";

export default function NotFound() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-crimson mb-6">
          404
        </h1>
        <p className="text-xl text-muted mb-10">
          This page wandered off the trail.
        </p>
        <Link
          to="/"
          className="btn btn-solid px-7 py-3.5 text-sm"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
