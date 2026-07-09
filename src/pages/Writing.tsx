import {useEffect, useState} from "react";
import {ArrowUpRight} from "lucide-react";

type Essay = {title: string; url: string; date?: string};

// Journalism — manual list. Pre-filled from Aasif's published op-eds.
// TODO(Aasif): confirm titles/URLs and add publication dates if you want them shown.
const journalism: {
  title: string;
  publication: string;
  url: string;
  date?: string;
}[] = [
  {
    title: "India's tech education crisis: When engineers can't code",
    publication: "The Hindu",
    url: "https://www.thehindu.com/education/indias-tech-education-crisis-when-computer-engineers-cant-code/article69243098.ece",
  },
  {
    title: "CBSE's future-ready AI curriculum, but are students ready?",
    publication: "The Hindu",
    url: "https://www.thehindu.com/education/cbses-future-ready-ai-curriculum-but-are-students-ready/article70823388.ece",
  },
  {
    title: "Lessons about social media usage from the idiot-box era",
    publication: "Deccan Herald",
    url: "https://www.deccanherald.com/education/lessons-about-social-media-usage-from-the-idiot-box-era-2-3958121",
  },
];

function formatDate(raw?: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Writing() {
  const [essays, setEssays] = useState<Essay[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/essays.json")
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data: Essay[]) => setEssays(Array.isArray(data) ? data : []))
      .catch(() => setError(true));
  }, []);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-ink mb-12">
          Writing
        </h1>

        {/* Essays — auto from Substack RSS */}
        <h2 className="font-serif text-sm uppercase tracking-[0.3em] text-muted mb-8">
          Essays
        </h2>
        <div className="mb-16">
          {essays === null && !error && (
            <p className="font-body text-muted italic">Loading essays…</p>
          )}
          {error && (
            <p className="font-body text-muted italic">
              Essays are published on{" "}
              <a
                href="https://aasifj.substack.com"
                target="_blank"
                rel="noreferrer"
                className="text-crimson underline decoration-1 underline-offset-4 decoration-crimson/40 hover:decoration-crimson"
              >
                Substack
              </a>
              .
            </p>
          )}
          {essays && essays.length > 0 && (
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {essays.map((e) => (
                <li key={e.url}>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="font-serif text-xl text-ink group-hover:text-crimson transition-colors block leading-snug">
                        {e.title}
                      </span>
                      {formatDate(e.date) && (
                        <span className="font-body text-sm text-muted">
                          {formatDate(e.date)}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-muted shrink-0 mt-1 transition-all group-hover:text-crimson group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          )}
          {essays && essays.length === 0 && (
            <p className="font-body text-muted italic">
              No essays yet. Check{" "}
              <a
                href="https://aasifj.substack.com"
                target="_blank"
                rel="noreferrer"
                className="text-crimson underline decoration-1 underline-offset-4 decoration-crimson/40 hover:decoration-crimson"
              >
                Substack
              </a>
              .
            </p>
          )}
        </div>

        {/* Journalism — manual list */}
        <h2 className="font-serif text-sm uppercase tracking-[0.3em] text-muted mb-8">
          Journalism
        </h2>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {journalism.map((j) => (
            <li key={j.url}>
              <a
                href={j.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-4 py-5"
              >
                <span>
                  <span className="font-serif text-xl text-ink group-hover:text-crimson transition-colors block leading-snug">
                    {j.title}
                  </span>
                  <span className="font-body text-sm text-muted">
                    {j.publication}
                    {formatDate(j.date) ? ` · ${formatDate(j.date)}` : ""}
                  </span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted shrink-0 mt-1 transition-all group-hover:text-crimson group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
