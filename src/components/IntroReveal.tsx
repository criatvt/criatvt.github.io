import {useEffect, useState} from "react";

// The Home intro, styled like an iPhone ad: a black stage on which
// "Hi, I’m Aasif." and then the tagline resolve out of a soft blur, before the
// stage lifts away to the site. It plays once per browser session, never for
// readers who prefer reduced motion, and any click, key, wheel or touch ends it.
const KEY = "intro-seen";
let decided: boolean | null = null; // computed once per page load
let done = false; // set when it has played (or been skipped) in this load

function shouldPlay(): boolean {
  if (decided !== null) return decided;
  try {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return (decided = false);
    // Preview builds replay it on every load so it can be reviewed.
    if (!import.meta.env.VITE_PREVIEW && sessionStorage.getItem(KEY)) return (decided = false);
    sessionStorage.setItem(KEY, "1");
  } catch {
    // Storage blocked: play once for this page load.
  }
  return (decided = true);
}

export default function IntroReveal() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">(() =>
    shouldPlay() && !done ? "show" : "gone",
  );

  useEffect(() => {
    if (phase === "gone") return;
    const root = document.documentElement;
    root.classList.add("intro-playing");
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const finish = () => {
      done = true;
      setPhase("gone");
    };
    const toLeave = window.setTimeout(() => setPhase("leave"), 4600);
    const skipEvents = ["pointerdown", "keydown", "wheel", "touchmove"] as const;
    skipEvents.forEach((e) => window.addEventListener(e, finish, {passive: true}));

    return () => {
      window.clearTimeout(toLeave);
      skipEvents.forEach((e) => window.removeEventListener(e, finish));
      root.style.overflow = prevOverflow;
      root.classList.remove("intro-playing");
    };
  }, [phase === "gone"]);

  // The page's own entrance plays as the stage starts to lift.
  useEffect(() => {
    if (phase !== "show") document.documentElement.classList.remove("intro-playing");
  }, [phase]);

  if (phase === "gone") return null;
  return (
    <div
      aria-hidden="true"
      className={`intro-stage ${phase === "leave" ? "intro-out" : ""}`}
      onAnimationEnd={(e) => {
        if (e.animationName === "intro-out") {
          done = true;
          setPhase("gone");
        }
      }}
    >
      <p className="display intro-line text-on-band">Hi, I&rsquo;m Aasif.</p>
      <p className="title-2 intro-line intro-line-2 mt-5 font-semibold text-on-band-muted">
        I build software, write, and educate.
      </p>
    </div>
  );
}
