import {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";

type Theme = "light" | "dark";

// Light is the default: only an explicit "dark" in storage flips the class.
// index.html applies the same rule before first paint, so this just has to
// agree with what is already on <html>.
function readStored(): Theme {
  try {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readStored);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Storage can be unavailable (private windows); the toggle still works
      // for the session, it just won't be remembered.
    }
  }, [theme]);

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="flex items-center justify-center w-8 h-8 text-muted hover:text-crimson transition-colors"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
