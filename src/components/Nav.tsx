import {useState, useEffect} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {Menu, X} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  {to: "/", label: "Home"},
  {to: "/build", label: "Build"},
  {to: "/writing", label: "Writing"},
  {to: "/book", label: "Book"},
  {to: "/photography", label: "Photography"},
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-paper/95 backdrop-blur-md border-b border-ink">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
        <Link
          to="/"
          className="text-[15px] md:text-[17px] font-bold uppercase tracking-[0.06em] text-ink hover:text-crimson transition-colors"
        >
          Aasif Iqbal J.
        </Link>

        {/* One lights switch for both breakpoints: desktop puts it after the
            typed links, mobile beside the hamburger. */}
        <div className="flex items-center gap-1 -mr-2 md:mr-0 md:gap-7">
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({isActive}) =>
                  `text-[13px] uppercase tracking-[0.1em] transition-colors ${
                    isActive
                      ? "text-crimson underline decoration-1 underline-offset-4"
                      : "text-muted hover:text-crimson"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <ThemeToggle />

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-11 h-11 text-ink hover:text-crimson transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-ink bg-paper/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({isActive}) =>
                  `text-sm font-bold uppercase tracking-[0.1em] py-3.5 border-b border-line last:border-0 transition-colors hover:text-crimson ${
                    isActive ? "text-crimson" : "text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
