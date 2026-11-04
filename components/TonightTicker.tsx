"use client";

import { useState } from "react";

/* Tonight's listings, one at a time: each slides up into the centre from below, holds, then
   slides away upward as the next comes in (one 3.5 s CSS cycle per listing; the next one starts
   when the cycle ends). Hovering or the pause button freezes the animation exactly where it is,
   and it carries on from there afterwards. Pausable (WCAG 2.2.2), stops for reduced motion,
   and screen readers get the whole list instead of the animation. */
export default function TonightTicker({ items }: { items: { title: string; time?: string }[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const moving = items.length > 1;
  const still = paused || hovered;

  const item = items[i % items.length];

  return (
    <div className="w-full sm:w-auto flex-1 min-w-0 flex items-center gap-2" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <ul className="sr-only">
        {items.map((it, n) => (
          <li key={n}>
            {it.title}
            {it.time && `, ${it.time}`}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="relative flex-1 min-w-0 h-6 overflow-hidden">
        <p
          key={i}
          onAnimationEnd={() => setI((n) => (n + 1) % items.length)}
          className={`${moving ? "ticker-item" : ""} absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap`}
          style={{ animationPlayState: still ? "paused" : "running" }}
        >
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
