import {Link} from "react-router-dom";
import PlocaPanel from "../components/PlocaPanel";
import SafeImage from "../components/SafeImage";
import {ImageCard} from "../components/Cards";
import {book, talks, youtubeThumb} from "../data/content";
import {shortDate, useEssays} from "../data/essays";
import photos from "../data/photos.json";

export default function Home() {
  const {essays} = useEssays();
  const latest = essays?.slice(0, 3) ?? [];
  const photo = (photos as {large: string; title: string}[])[0];

  return (
    <>
      {/* Intro: a large centred greeting, then the short version. */}
      <section className="page pt-16 pb-[var(--space-section)] text-center md:pt-28 md:pb-[var(--space-section-lg)]">
        <h1 className="display enter">Hi, I&rsquo;m Aasif.</h1>
        <p className="lede enter-2 mx-auto mt-6 max-w-[30ch] text-ink md:mt-8">
          I <Link to="/build" className="link">build software</Link>,{" "}
          <Link to="/writing" className="link">write</Link>, and{" "}
          <Link to="/educate" className="link">educate</Link>.
        </p>

        <div className="prose-col enter-3 mx-auto mt-12 flex flex-col gap-6 text-left text-[clamp(1.1875rem,0.3vw+1.1rem,1.25rem)] leading-[1.7] text-ink-2 md:mt-16">
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
      </section>

      {/* Currently building: always first after the intro. */}
      <PlocaPanel more={{to: "/build", label: "See everything I have built"}} />

      {/* Latest writing, as magazine cards. */}
      <section className="page pt-[var(--space-section)] md:pt-[var(--space-section-lg)]">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 className="title-1">Latest writing</h2>
          <Link to="/writing" className="link-more tap">All writing</Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          {latest.length === 0
            ? [0, 1, 2].map((i) => (
                <div key={i} className="card" aria-hidden="true">
                  <div className="card-media aspect-[16/10] animate-pulse motion-reduce:animate-none" />
                  <div className="h-5 w-4/5 rounded-full bg-surface" />
                </div>
              ))
            : latest.map((e) => (
                <ImageCard
                  key={e.url}
                  href={e.url}
                  image={e.image}
                  kicker="Essay"
                  title={e.title}
                  meta={shortDate(e.date)}
                />
              ))}
        </div>
      </section>

      {/* The book, set on paper: cover beside title and the order button. */}
      <section className="page pt-[var(--space-section)] md:pt-[var(--space-section-lg)]">
        <div className="grid grid-cols-1 items-center gap-10 rounded-[var(--radius-tile)] bg-surface px-7 py-12 sm:px-12 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-14 md:py-16">
          <Link to="/book" className="mx-auto block w-40 sm:w-48 md:w-full md:max-w-[260px]" aria-label={book.title}>
            <SafeImage
              src={book.cover}
              alt={`Cover of ${book.title}`}
              referrerPolicy="no-referrer"
              className="aspect-[5/8] w-full rounded-[4px] bg-paper object-cover shadow-cover"
            />
          </Link>
          <div className="text-center md:text-left">
            <p className="label">My first book</p>
            <h2 className="title-1 mt-2">{book.title}</h2>
            <p className="lede mt-4 max-w-[30ch] mx-auto md:mx-0">{book.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:justify-start">
              <a href={book.amazon} target="_blank" rel="noreferrer" className="btn btn-primary">
                Order on Amazon
              </a>
              <Link to="/book" className="link-more tap">About the book</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore: the rest of the site, each with its own picture. */}
      <section className="page pt-[var(--space-section)] md:pt-[var(--space-section-lg)]">
        <h2 className="title-1">Explore</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          <Link to="/educate" className="card">
            <div className="card-media aspect-[16/10]">
              <SafeImage src={youtubeThumb(talks[0].youtubeId)} alt="" loading="lazy" className="h-full w-full" />
            </div>
            <span className="label">Educate</span>
            <span className="card-title">Talks and writing on AI in the classroom</span>
          </Link>
          <Link to="/photography" className="card">
            <div className="card-media aspect-[16/10]">
              {photo && <SafeImage src={photo.large} alt="" loading="lazy" className="h-full w-full" />}
            </div>
            <span className="label">Photography</span>
            <span className="card-title">How I slow down time and stay in the moment</span>
          </Link>
          <Link to="/story" className="card">
            <div className="card-media flex aspect-[16/10] items-center justify-center bg-band">
              <span className="display text-on-band">2010&ndash;</span>
            </div>
            <span className="label">Story</span>
            <span className="card-title">From IT to edtech to an exit, and what came after</span>
          </Link>
        </div>
      </section>
    </>
  );
}
