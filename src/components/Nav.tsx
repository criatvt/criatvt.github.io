import {useState, useEffect} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {Menu, X} from "lucide-react";

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-paper/85 backdrop-blur-md border-b border-line">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-serif text-2xl tracking-tight text-ink hover:text-crimson transition-colors"
        >
          Aasif Iqbal J.
        </Link>

        {/* Desktop links, as a row of tabs that lift under the cursor. */}
        <div className="hidden md:flex gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({isActive}) =>
                `btn px-3 py-1.5 text-[11px] ${isActive ? "btn-active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-ink hover:text-crimson transition-colors"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-line bg-paper/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({isActive}) =>
                  `font-sans font-semibold text-base py-3 border-b border-line last:border-0 transition-colors hover:text-crimson ${
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
