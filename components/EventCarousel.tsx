"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type TagColor = "red" | "gold" | "green" | "default";

export interface EventCard {
  day: string;
  name: string;
  details: string[];
  tag: string;
  tagColor: TagColor;
  emoji: string;
  image?: string;
}

function Arrow({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous events" : "Next events"}
      className="w-11 h-11 flex items-center justify-center border-2 border-[#F2B035] text-[#F2B035] hover:bg-[#F2B035] hover:text-[#101010] disabled:opacity-25 disabled:pointer-events-none transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {dir === "prev" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

export default function EventCarousel({ cards, base }: { cards: EventCard[]; base: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [active, setActive] = useState(0);
  // One stop per card, merged where cards near the end can't reach the left edge
  const [stops, setStops] = useState<number[]>(() => cards.map((_, i) => i));

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
      current = positions.filter((p, i) => i === 0 || p - positions[i - 1] > 4);
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
  }, []);

  function scrollByCard(dir: 1 | -1) {
    const target = stops[Math.min(Math.max(active + dir, 0), stops.length - 1)];
    trackRef.current?.scrollTo({ left: target, behavior: "smooth" });
  }

  function goTo(i: number) {
    trackRef.current?.scrollTo({ left: stops[i], behavior: "smooth" });
  }

  // Left edge lines up with the max-w-7xl content column; right edge bleeds off-screen
  const edge = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-end justify-between gap-4">
        <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em]">Events</p>
        <div className="flex items-center gap-4">
          <Link
            href={`${base}/events`}
            className="hidden sm:inline text-[#F2B035] text-xs uppercase tracking-widest hover:text-[#e0a020] transition-colors"
          >
            Full Schedule +
          </Link>
          <div className="flex gap-2">
            <Arrow dir="prev" disabled={!canPrev} onClick={() => scrollByCard(-1)} />
            <Arrow dir="next" disabled={!canNext} onClick={() => scrollByCard(1)} />
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingLeft: edge, paddingRight: edge, scrollPaddingLeft: edge }}
        >
          {cards.map((card) => (
            <Link
              key={card.name}
              data-card
              href={`${base}/events`}
              className="group shrink-0 snap-start w-[72vw] sm:w-[280px] lg:w-[300px] border-4 border-[#F2B035] bg-[#0F5132] p-[3px] flex"
            >
              <div className="border-2 border-[#F2B035] flex flex-col w-full overflow-hidden">
                {card.image ? (
                  <div className="relative aspect-[2/1] overflow-hidden border-b-2 border-[#F2B035]">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 72vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div
                    className={`aspect-[2/1] flex flex-col items-center justify-center gap-2 border-b-2 border-[#F2B035] ${
                      card.tagColor === "red"
                        ? "bg-[#101010]"
                        : card.tagColor === "gold"
                        ? "bg-[#F2B035]"
                        : card.tagColor === "green"
                        ? "bg-[#169B62]"
                        : "bg-[#0a3d26]"
                    }`}
                  >
                    <span style={{ fontSize: "2.2rem" }}>{card.emoji}</span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-medium ${
                        card.tagColor === "gold" ? "text-[#101010]" : "text-white/70"
                      }`}
                    >
                      {card.tag}
                    </span>
                  </div>
                )}

                <div className="p-5 flex flex-col gap-3 flex-1 min-h-[190px]">
                  <p className="text-[#F2B035] text-[10px] uppercase tracking-[0.2em]">{card.day}</p>
                  <h3
                    className="text-[#F4EFE6] leading-tight"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "0.02em" }}
                  >
                    {card.name}
                  </h3>
                  {card.details.length > 0 && (
                    <ul className="flex flex-col gap-1">
                      {card.details.map((d) => (
                        <li key={d} className="flex items-start gap-1.5 text-[#F4EFE6]/55 text-xs leading-relaxed">
                          <span className="text-[#F2B035] mt-[3px] shrink-0">·</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="text-[#F2B035]/70 group-hover:text-[#F2B035] transition-colors text-xs uppercase tracking-widest mt-auto">
                    Details +
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Edge fades hint there is more to scroll */}
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#101010] to-transparent transition-opacity ${canNext ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#101010] to-transparent transition-opacity ${canPrev ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Position dots: tap one to jump to that card */}
      <div role="group" aria-label="Event nights" className="flex justify-center gap-1.5 mt-5">
        {stops.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${cards[i]?.name ?? "more events"}`}
            aria-current={i === active}
            className="w-6 h-6 flex items-center justify-center"
          >
            <span className={`block w-2 h-2 rounded-full transition-all ${i === active ? "bg-[#F2B035] scale-125" : "bg-[#F4EFE6]/50"}`} />
          </button>
        ))}
      </div>
    </>
  );
}
