import {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";

type Theme = "light" | "dark";

const query = "(prefers-color-scheme: dark)";

function systemTheme(): Theme {
  try {
    return matchMedia(query).matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

// An explicit choice, if the visitor made one with this toggle.
function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "dark" || t === "light" ? t : null;
  } catch {
    return null;
  }
}

// Appearance follows the system; the toggle overrides it. index.html applies
// the same rule before first paint, so this just has to agree with <html>.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => storedTheme() ?? systemTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // With no explicit choice, keep tracking the system as it changes (sunset,
  // Control Centre), the way native apps do.
  useEffect(() => {
    const mq = matchMedia(query);
    const onChange = () => {
      if (storedTheme() === null) setTheme(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      // Choosing what the system already shows clears the override, so the
      // site goes back to following the system.
      if (next === systemTheme()) localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private windows); the toggle still works
      // for the session, it just won't be remembered.
    }
  }

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Switch to light appearance" : "Switch to dark appearance"}
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-ink active:opacity-60"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
      ) : (
        <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      )}
    </button>
  );
}
