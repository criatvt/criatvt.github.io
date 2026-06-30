import {Outlet} from "react-router-dom";
import {Linkedin, PenTool, Github, Instagram} from "lucide-react";
import Nav from "./Nav";

const socials = [
  {href: "https://linkedin.com/in/aasifiqbalj", label: "LinkedIn", Icon: Linkedin},
  {href: "https://aasifj.substack.com", label: "Substack", Icon: PenTool},
  {href: "https://github.com/criatvt/", label: "GitHub", Icon: Github},
  {href: "https://instagram.com/theaasifj", label: "Instagram", Icon: Instagram},
];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink overflow-x-hidden">
      <Nav />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <footer className="border-t border-ink/5 px-6 py-12">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col gap-1">
            <a
              href="mailto:aasif@aasifj.com"
              className="font-serif text-lg text-ink hover:text-crimson transition-colors"
            >
              aasif@aasifj.com
            </a>
            <span className="font-body text-xs text-muted">
              &copy; {new Date().getFullYear()} Aasif Iqbal J.
            </span>
          </div>
          <div className="flex gap-7">
            {socials.map(({href, label, Icon}) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-muted hover:text-crimson transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
