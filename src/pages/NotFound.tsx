import {Link} from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page pt-24 pb-10 md:pt-40">
      <p className="label">404</p>
      <h1 className="title-1 mt-3 max-w-[16ch]">This page wandered off the trail.</h1>
      <p className="lede mt-5 max-w-[34ch]">The page you were after is not here, but the rest of the site is.</p>
      <Link to="/" className="btn btn-primary mt-10">
        Back home
      </Link>
    </section>
  );
}
