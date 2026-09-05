import {Link} from "react-router-dom";
import PlocaMark from "../components/PlocaMark";

// One shared inline-link style for the intro.
const link = "link";

export default function Home() {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[30px] md:text-[42px] font-bold leading-[1.2] mb-10">
          Hi, I&#39;m Aasif.
          <span className="pulse-dot" aria-hidden="true"></span>
        </h1>

        <div className="flex flex-col gap-6 text-[17px] leading-[1.9]">
          <p>
            I <Link to="/build" className={link}>build software</Link>,{" "}
            <Link to="/writing" className={link}>write</Link>, and{" "}
            <Link to="/educate" className={link}>educate</Link>.
          </p>

          <p>
            When I am not doing any of these, I{" "}
            <Link to="/photography" className={link}>take photographs</Link>{" "}
            with a real camera and process them all myself, sometimes
            attempting to colour-correct at the pixel level.
          </p>

          <p>
            Formerly, as a co-founder and Chief Operating Officer, I helped
            scale{" "}
            <a href="https://iamneo.ai" target="_blank" rel="noreferrer" className={link}>
              iamneo
            </a>
            , an edtech startup, by 10x, culminating in a majority-stake
            acquisition by NIIT Limited in 2025.
          </p>

          <p>
            After my exit from iamneo, I wrote my first book,{" "}
            <Link to="/book" className={link}>Doomscroller to Reader</Link>,
            which helps people build a reading habit without giving up their
            phone.
          </p>

          <p>
            More about me <Link to="/story" className={link}>here</Link>.
          </p>
        </div>

        {/* Typed section break */}
        <div className="text-center text-base tracking-[0.5em] text-muted my-12" aria-hidden="true">
          *&#160;*&#160;*
        </div>

        {/* Current priority — a soft callout, not a boxed one */}
        <span className="eyebrow block mb-4">Current priority</span>
        <div className="callout flex gap-4">
          <span className="icon-tile" aria-hidden="true">
            <PlocaMark className="w-6 h-6" />
          </span>
          <div className="flex flex-col gap-3 pt-0.5">
            <span className="font-serif text-2xl font-bold">ploca</span>
            <span className="text-[19px] italic">
              Write at the speed of thought, privately.
            </span>
            <span className="text-[15px] leading-[1.8] text-muted">
              A fast, accurate voice-to-text app for Mac that is truly private.
            </span>
            <a
              href="https://ploca.app"
              target="_blank"
              rel="noreferrer"
              className="link text-sm mt-1 self-start"
            >
              ploca.app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
