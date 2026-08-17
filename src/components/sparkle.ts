// A small burst of stars at the click point. Used sparingly: the name on the
// home page and the featured rows. Nothing here blocks or delays the click,
// and it does nothing at all for readers who asked for less motion.

const STAR =
  "M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z";

const COLORS = ["#C72B33", "#E7B416", "#2B2620"];

export function sparkleBurst(x: number, y: number, count = 9) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layer = document.createElement("div");
  layer.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:0;height:0;z-index:60;pointer-events:none`;
  document.body.appendChild(layer);

  const animations: Animation[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 26 + Math.random() * 42;
    const size = 8 + Math.random() * 11;

    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    star.setAttribute("viewBox", "0 0 24 24");
    star.setAttribute("aria-hidden", "true");
    star.style.cssText = `position:absolute;left:${-size / 2}px;top:${-size / 2}px;width:${size}px;height:${size}px`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", STAR);
    path.setAttribute("fill", COLORS[i % COLORS.length]);
    star.appendChild(path);
    layer.appendChild(star);

    animations.push(
      star.animate(
        [
          {transform: "translate(0,0) scale(0.2) rotate(0deg)", opacity: 1},
          {
            transform: `translate(${Math.cos(angle) * distance}px, ${
              Math.sin(angle) * distance
            }px) scale(1) rotate(${90 + Math.random() * 120}deg)`,
            opacity: 1,
            offset: 0.45,
          },
          {
            transform: `translate(${Math.cos(angle) * distance * 1.35}px, ${
              Math.sin(angle) * distance * 1.35 + 10
            }px) scale(0.1) rotate(${180 + Math.random() * 120}deg)`,
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

  // Normally the layer goes when the last star lands. The timeout is the
  // backstop: animations don't advance in a backgrounded tab, and a route
  // change mid-burst would otherwise strand the layer in the DOM.
  const done = () => layer.remove();
  Promise.allSettled(animations.map((a) => a.finished)).then(done);
  window.setTimeout(done, 2500);
}

// Burst wherever the pointer was, for a given element. Keyboard activation
// reports 0,0, so fall back to the middle of the element. Bigger targets get a
// bigger burst: a card should feel like more than an inline word does.
export function sparkleAt(
  el: HTMLElement | null,
  clientX: number,
  clientY: number,
) {
  const rect = el?.getBoundingClientRect();
  let x = clientX;
  let y = clientY;
  if (!x && !y && rect) {
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }
  sparkleBurst(x, y, rect && rect.height > 44 ? 14 : 9);
}

// For React onClick on something that is not a link.
export function sparkleFromEvent(e: {
  clientX: number;
  clientY: number;
  currentTarget: EventTarget | null;
}) {
  sparkleAt(e.currentTarget as HTMLElement | null, e.clientX, e.clientY);
}
