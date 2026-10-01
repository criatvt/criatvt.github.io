import {Link} from "react-router-dom";
import PlocaTile from "../components/PlocaTile";

// The rest of the site, as one grouped index below the intro.
const index = [
  {to: "/build", title: "Build", blurb: "Tools and games I have made with AI."},
  {to: "/writing", title: "Writing", blurb: "Op-eds in the press and essays on Substack."},
  {to: "/book", title: "Book", blurb: "Doomscroller to Reader, my first book."},
  {to: "/educate", title: "Educate", blurb: "Talks and writing on AI in the classroom."},
  {to: "/photography", title: "Photography", blurb: "How I slow down time and stay in the moment."},
  {to: "/story", title: "Story", blurb: "From IT to edtech to an exit, and what came after."},
];

export default function Home() {
  return (
    <>
      {/* Intro: a large serif greeting beside a portrait, then the short version. */}
      <section className="page pt-12 pb-[var(--space-section)] md:pt-24 md:pb-[var(--space-section-lg)]">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] md:gap-16">
          <div>
            <h1 className="display enter">Hi, I&rsquo;m Aasif.</h1>
            <p className="lede enter-2 mt-6 max-w-[30ch] md:mt-8 text-ink">
              I <Link to="/build" className="link">build software</Link>,{" "}
              <Link to="/writing" className="link">write</Link>, and{" "}
              <Link to="/educate" className="link">educate</Link>.
            </p>

            <div className="prose-col enter-3 mt-10 flex flex-col gap-5 md:mt-12 text-ink-2">
              <p>
                Formerly, as a co-founder and Chief Operating Officer, I helped
                scale{" "}
                <a href="https://iamneo.ai" target="_blank" rel="noreferrer" className="link">
                  iamneo
                </a>
                , an edtech startup, by 10x, culminating in a majority-stake
                acquisition by NIIT Limited in 2025.
              </p>
              <p>
                After my exit from iamneo, I wrote my first book,{" "}
                <Link to="/book" className="link">Doomscroller to Reader</Link>,
                which helps people build a reading habit without giving up their
                phone.
              </p>
              <p>
                When I am not doing any of these, I{" "}
                <Link to="/photography" className="link">take photographs</Link>{" "}
                with a real camera.
              </p>
              <p>
                <Link to="/story" className="link-more tap">More about me</Link>
              </p>
            </div>
          </div>

          <img
            src={`${import.meta.env.BASE_URL}portrait.jpg`}
            width={960}
            height={1286}
            alt="Portrait of Aasif Iqbal J."
            fetchPriority="high"
            className="enter-2 order-first h-36 w-36 rounded-full bg-surface object-cover object-top md:order-none md:h-auto md:w-full md:aspect-[4/5] md:rounded-[var(--radius-tile)]"
          />
        </div>
      </section>

      {/* Currently building: always first after the intro. */}
      <section className="page">
        <PlocaTile more={{to: "/build", label: "See everything I have built"}} />
      </section>

      {/* Everything else. */}
      <section className="page pt-[var(--space-section)] md:pt-[var(--space-section-lg)]">
        <h2 className="title-2">Around the site</h2>
        <nav aria-label="Sections" className="grouped mt-8">
          {index.map((s) => (
            <Link key={s.to} to={s.to} className="row">
              <span className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-5">
                <span className="font-display text-[1.25rem] font-semibold tracking-[-0.012em] sm:w-36 sm:shrink-0">
                  {s.title}
                </span>
                <span className="text-[0.9375rem] text-muted">{s.blurb}</span>
              </span>
              <span className="chevron" aria-hidden="true">›</span>
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
