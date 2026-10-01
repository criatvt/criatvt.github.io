import {useEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export const links = [
  {to: "/build", label: "Build"},
  {to: "/writing", label: "Writing"},
  {to: "/book", label: "Book"},
  {to: "/educate", label: "Educate"},
  {to: "/photography", label: "Photography"},
  {to: "/story", label: "Story"},
];

// A translucent bar, like Apple's: it sits clear over the top of the page and
// frosts, with a hairline, once content scrolls beneath it. On phones the
// links fold into a full-height sheet of large serif entries.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the sheet is open: no page scroll behind it, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // Move focus into the sheet; hand it back to the button on close.
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const button = buttonRef.current;
    return () => {
      button?.focus();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // The Photography page scrolls inside its own frame, so the window never
  // does; treat it as always scrolled so the bar keeps its frost there.
  const frosted = scrolled || open || location.pathname === "/photography";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        frosted
          ? "glass bg-paper/75 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-paper/0"
      }`}
    >
      <nav className="page flex h-[52px] items-center justify-between" aria-label="Main">
        <Link
          to="/"
          className="tap font-display text-[1.1875rem] font-semibold tracking-[-0.015em] text-ink transition-opacity hover:opacity-70"
        >
          Aasif Iqbal J.
        </Link>

        <div className="flex items-center gap-1 md:gap-8 -mr-3 md:mr-0">
          <ul className="hidden md:flex items-center gap-5 lg:gap-7">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({isActive}) =>
                    `tap whitespace-nowrap text-[0.875rem] underline decoration-2 underline-offset-[10px] transition-colors ${
                      isActive
                        ? "text-ink decoration-ink"
                        : "text-muted decoration-transparent hover:text-ink"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="md:-mr-3">
            <ThemeToggle />
          </div>

          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-11 w-11 items-center justify-center text-ink active:opacity-60"
          >
            {/* Two bars that cross into an X. */}
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-apple ${
                  open ? "top-[5px] rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-apple ${
                  open ? "top-[5px] -rotate-45" : "top-[8.5px]"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden h-[calc(100dvh-52px)] overflow-y-auto bg-paper"
        >
          <ul className="page flex flex-col pt-6 pb-10">
            {[{to: "/", label: "Home"}, ...links].map((l, i) => (
              <li
                key={l.to}
                className="enter"
                style={{animationDelay: `${i * 35}ms`, animationDuration: "450ms"}}
              >
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({isActive}) =>
                    `block py-2.5 font-display text-[2rem] font-semibold tracking-[-0.02em] ${
                      isActive ? "text-ink" : "text-muted active:text-ink"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
