"use client";

import { useEffect, useState, type RefObject } from "react";

/* Shared horizontal-scroller behaviour: snap stops, prev/next state and the active position dot.
   Items inside the track are marked with data-card. */
export function useSnapCarousel(trackRef: RefObject<HTMLDivElement | null>, count: number) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [active, setActive] = useState(0);
  // One stop per item, merged where items near the end can't reach the left edge
  const [stops, setStops] = useState<number[]>(() => Array.from({ length: count }, (_, i) => i));

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let current: number[] = [];
    const measure = () => {
      const padL = parseFloat(getComputedStyle(el).paddingLeft);
      const max = el.scrollWidth - el.clientWidth;
      const positions = Array.from(el.querySelectorAll<HTMLElement>("[data-card]")).map((c) =>
        Math.round(Math.min(Math.max(c.offsetLeft - padL, 0), max))
      );
      current = max > 4 ? positions.filter((p, i) => i === 0 || p - positions[i - 1] > 4) : [];
      setStops(current);
    };
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
      let best = 0;
      current.forEach((p, i) => {
        if (Math.abs(p - el.scrollLeft) < Math.abs(current[best] - el.scrollLeft)) best = i;
      });
      setActive(best);
    };
    const onResize = () => { measure(); update(); };
    onResize();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, [trackRef]);

  const goTo = (i: number) => trackRef.current?.scrollTo({ left: stops[i] ?? 0, behavior: "smooth" });
  const step = (dir: 1 | -1) => goTo(Math.min(Math.max(active + dir, 0), stops.length - 1));

  return { canPrev, canNext, active, stops, goTo, step };
}

export function CarouselArrow({
  dir,
  disabled,
  onClick,
  label,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-12 h-12 flex items-center justify-center border-2 border-[#F2B035] text-[#F2B035] hover:bg-[#F2B035] hover:text-[#101010] disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4EFE6]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        {dir === "prev" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

/* Position dots: tap one to jump to that stop */
export function CarouselDots({
  stops,
  active,
  goTo,
  labels,
  groupLabel,
  className = "",
}: {
  stops: number[];
  active: number;
  goTo: (i: number) => void;
  labels: string[];
  groupLabel: string;
  className?: string;
}) {
  if (stops.length < 2) return null;
  return (
    <div role="group" aria-label={groupLabel} className={`flex justify-center gap-1.5 mt-5 ${className}`}>
      {stops.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Show ${labels[i] ?? "more"}`}
          aria-current={i === active}
          className="w-6 h-6 flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B035]"
        >
          <span className={`block w-2.5 h-2.5 rounded-full transition-all ${i === active ? "bg-[#F2B035] scale-125" : "bg-[#F4EFE6]/60"}`} />
        </button>
      ))}
    </div>
  );
}
