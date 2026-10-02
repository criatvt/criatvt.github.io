import {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {links} from "../components/Nav";

// A dead link, said plainly: the address that missed, a way home, and the
// rest of the site one tap away.
export default function NotFound() {
  const {pathname} = useLocation();

  useEffect(() => {
    document.title = "Page not found · Aasif Iqbal J.";
  }, [pathname]);

  return (
    <section className="page pt-16 pb-8 text-center md:pt-28">
      {/* Decorative: the headline carries the meaning. */}
      <p aria-hidden="true" className="enter select-none text-[clamp(7rem,22vw,14rem)] font-bold leading-none tracking-[-0.06em] text-line">
        404
      </p>
      <h1 className="title-1 enter-2 mx-auto mt-4 max-w-[18ch]">This page wandered off the trail.</h1>
      <p className="lede enter-2 mx-auto mt-5 max-w-[36ch]">
        Nothing lives at{" "}
        <code className="[overflow-wrap:anywhere] rounded-md bg-surface px-1.5 py-0.5 font-sans text-[0.9em] text-ink">{pathname}</code>
        . It may have moved, or the link may have a typo.
      </p>
      <div className="enter-3 mt-10 flex justify-center">
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
      </div>

      <nav aria-label="Elsewhere on the site" className="enter-3 mx-auto mt-16 max-w-[48rem]">
        <p className="label">Or try one of these</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="btn btn-secondary">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
