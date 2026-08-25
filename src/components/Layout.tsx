import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import Nav from "./Nav";
import {burstAt, type BurstKind} from "./sparkle";

// Brand glyphs (single-path, 24x24) from simple-icons — solid marks read far
// stronger than hairline line-icons, and give Substack a real logo lucide lacks.
const socials = [
  {
    href: "https://github.com/criatvt/",
    label: "GitHub",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    href: "https://x.com/theaasifj",
    label: "Twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    href: "https://linkedin.com/in/aasifiqbalj",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    href: "https://aasifj.substack.com",
    label: "Substack",
    path: "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z",
  },
];

export default function Layout() {
  // Hyperlinks — and only hyperlinks — burst when clicked. Handled once here
  // rather than per element, so any link added later gets it too. The glyphs
  // live on document.body, outside React, so a burst survives the navigation
  // it just triggered. Links to ploca.app get tiny hearts; everything else
  // gets stars. The title bar is chrome rather than content, so its tabs and
  // wordmark stay quiet.
  useEffect(() => {
    const hit = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      return el && !el.closest("nav") ? el : null;
    };

    const kindFor = (el: HTMLAnchorElement): BurstKind =>
      el.hostname === "ploca.app" || el.hostname.endsWith(".ploca.app")
        ? "hearts"
        : "stars";

    // Fire on press, not on click. Links that open a new tab hand the window
    // over the moment the click lands, so a burst started then plays in a tab
    // nobody is looking at. Starting on pointerdown means it is already
    // running before the browser switches away.
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const el = hit(e);
      if (el) burstAt(el, e.clientX, e.clientY, kindFor(el));
    };

    // Keyboard activation never sends a pointer event. Those clicks arrive
    // with detail 0, which is also how we avoid double-bursting mouse clicks.
    const onClick = (e: MouseEvent) => {
      if (e.detail !== 0) return;
      const el = hit(e);
      if (el) burstAt(el, e.clientX, e.clientY, kindFor(el));
    };

    // Capture, not bubble: react-router's Link calls preventDefault on its way
    // to a client-side navigation, and a bubbling listener that skipped
    // cancelled clicks would then miss every internal link on the site.
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink overflow-x-hidden">
      <Nav />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <footer className="border-t border-line px-6 py-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col gap-1 text-[13px] text-muted">
            {/* Written with [at] so scrapers can't harvest it as a live mailto. */}
            <span>aasif [at] aasifj.com</span>
            <span className="uppercase tracking-[0.08em]">
              &copy; {new Date().getFullYear()} Aasif Iqbal J.
            </span>
          </div>
          <div className="flex gap-5">
            {socials.map(({href, label, path}) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-muted hover:text-crimson transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-[17px] h-[17px]"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
