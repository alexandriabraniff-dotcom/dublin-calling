"use client";

import { useEffect, useState } from "react";

const HOLD = 3500; // ms each listing stays up

/* Tonight's listings, one at a time: each slides up into the centre from below, holds, then
   slides away upward as the next comes in. Pausable (WCAG 2.2.2), stops for reduced motion,
   and screen readers get the whole list instead of the animation. */
export default function TonightTicker({ items }: { items: { title: string; time?: string }[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const still = paused || hovered || items.length < 2;

  useEffect(() => {
    if (still || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), HOLD);
    return () => clearInterval(id);
  }, [still, items.length]);

  const item = items[i % items.length];

  return (
    <div className="flex-1 min-w-0 flex items-center gap-2" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <ul className="sr-only">
        {items.map((it, n) => (
          <li key={n}>
            {it.title}
            {it.time && `, ${it.time}`}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="relative flex-1 min-w-0 h-6 overflow-hidden">
        <p key={i} className={`${still ? "ticker-enter" : "ticker-item"} absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap`}>
          <span className="truncate">{item.title}</span>
          {item.time && <span className="font-text text-[#101010]/75 shrink-0">{item.time}</span>}
        </p>
      </div>
      {items.length > 1 && (
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Play tonight's listings" : "Pause tonight's listings"}
          className="shrink-0 w-7 h-7 -my-1 flex items-center justify-center rounded-full hover:bg-[#101010]/10"
        >
          {paused ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4v16l14-8z" /></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>
          )}
        </button>
      )}
    </div>
  );
}
