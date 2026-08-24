// A small burst at the click point. Stars for ordinary hyperlinks, tiny
// hearts for links that point at ploca.app. Nothing here blocks or delays the
// click, and it does nothing at all for readers who asked for less motion.

const STAR =
  "M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z";

// Filled heart on the same 24x24 grid.
const HEART =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

export type BurstKind = "stars" | "hearts";

// Hearts are deliberately smaller and calmer than the stars: they spin only a
// little (an upside-down heart reads as a blob) and stay in the pink-red band.
const SHAPES: Record<
  BurstKind,
  {path: string; colors: string[]; minSize: number; sizeJitter: number; spin: number}
> = {
  stars: {
    path: STAR,
    colors: ["#C72B33", "#E7B416", "#2B2620"],
    minSize: 8,
    sizeJitter: 11,
    spin: 1,
  },
  hearts: {
    path: HEART,
    colors: ["#E0245E", "#F06292", "#C72B33"],
    minSize: 5,
    sizeJitter: 5,
    spin: 0.25,
  },
};

export function burst(kind: BurstKind, x: number, y: number, count = 9) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const shape = SHAPES[kind];

  const layer = document.createElement("div");
  layer.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:0;height:0;z-index:60;pointer-events:none`;
  document.body.appendChild(layer);

  const animations: Animation[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 26 + Math.random() * 42;
    const size = shape.minSize + Math.random() * shape.sizeJitter;

    const glyph = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    glyph.setAttribute("viewBox", "0 0 24 24");
    glyph.setAttribute("aria-hidden", "true");
    glyph.style.cssText = `position:absolute;left:${-size / 2}px;top:${-size / 2}px;width:${size}px;height:${size}px`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", shape.path);
    path.setAttribute("fill", shape.colors[i % shape.colors.length]);
    glyph.appendChild(path);
    layer.appendChild(glyph);

    animations.push(
      glyph.animate(
        [
          {transform: "translate(0,0) scale(0.2) rotate(0deg)", opacity: 1},
          {
            transform: `translate(${Math.cos(angle) * distance}px, ${
              Math.sin(angle) * distance
            }px) scale(1) rotate(${(90 + Math.random() * 120) * shape.spin}deg)`,
            opacity: 1,
            offset: 0.45,
          },
          {
            transform: `translate(${Math.cos(angle) * distance * 1.35}px, ${
              Math.sin(angle) * distance * 1.35 + 10
            }px) scale(0.1) rotate(${(180 + Math.random() * 120) * shape.spin}deg)`,
            opacity: 0,
          },
        ],
        {
          // Gentle ease-out rather than a hard one: a steep curve spends the
          // whole burst in the first hundred milliseconds and reads as a
          // flicker instead of a spark.
          duration: 750 + Math.random() * 350,
          easing: "cubic-bezier(0.25, 0.6, 0.35, 1)",
          fill: "forwards",
        },
      ),
    );
  }

  // Normally the layer goes when the last glyph lands. The timeout is the
  // backstop: animations don't advance in a backgrounded tab, and a route
  // change mid-burst would otherwise strand the layer in the DOM.
  const done = () => layer.remove();
  Promise.allSettled(animations.map((a) => a.finished)).then(done);
  window.setTimeout(done, 2500);
}

// Burst wherever the pointer was, for a given element. Keyboard activation
// reports 0,0, so fall back to the middle of the element. Bigger targets get a
// bigger burst: a card should feel like more than an inline word does.
export function burstAt(
  el: HTMLElement | null,
  clientX: number,
  clientY: number,
  kind: BurstKind = "stars",
) {
  const rect = el?.getBoundingClientRect();
  let x = clientX;
  let y = clientY;
  if (!x && !y && rect) {
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }
  burst(kind, x, y, rect && rect.height > 44 ? 14 : 9);
}
