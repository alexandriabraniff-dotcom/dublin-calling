"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useSnapCarousel, CarouselArrow, CarouselDots } from "@/components/carousel";

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

export default function EventCarousel({ cards, base }: { cards: EventCard[]; base: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { canPrev, canNext, active, stops, goTo, step } = useSnapCarousel(trackRef, cards.length);

  // Left edge lines up with the max-w-7xl content column; right edge bleeds off-screen
  const edge = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-end justify-between gap-4">
        <h2 className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.25em]">Events</h2>
        <div className="flex items-center gap-4">
          <Link
            href={`${base}/events`}
            className="hidden sm:inline text-[#F2B035] text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B035] uppercase tracking-widest hover:text-[#e0a020] transition-colors"
          >
            Full Schedule +
          </Link>
          <div className="flex gap-2">
            <CarouselArrow dir="prev" label="Previous events" disabled={!canPrev} onClick={() => step(-1)} />
            <CarouselArrow dir="next" label="Next events" disabled={!canNext} onClick={() => step(1)} />
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          role="region"
          aria-label="Upcoming events, scroll sideways for more"
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingLeft: edge, paddingRight: edge, scrollPaddingLeft: edge }}
        >
          {cards.map((card) => (
            <Link
              key={card.name}
              data-card
              href={`${base}/events`}
              className="group shrink-0 snap-start w-[72vw] sm:w-[280px] lg:w-[300px] border-4 border-[#F2B035] bg-[#0F5132] p-[3px] flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4EFE6]"
            >
              <div className="border-2 border-[#F2B035] flex flex-col w-full overflow-hidden">
                {card.image ? (
                  <div className="relative aspect-[2/1] overflow-hidden border-b-2 border-[#F2B035]">
                    <Image
                      src={card.image}
                      alt=""
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
                    <span aria-hidden="true" style={{ fontSize: "2.2rem" }}>{card.emoji}</span>
                    <span
                      className={`text-[11px] uppercase tracking-[0.2em] font-medium ${
                        card.tagColor === "gold" || card.tagColor === "green" ? "text-[#101010]" : "text-white/80"
                      }`}
                    >
                      {card.tag}
                    </span>
                  </div>
                )}

                <div className="p-5 flex flex-col gap-3 flex-1 min-h-[190px]">
                  <p className="text-[#F2B035] text-[11px] uppercase tracking-[0.2em]">{card.day}</p>
                  <h3
                    className="text-[#F4EFE6] leading-tight"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "0.02em" }}
                  >
                    {card.name}
                  </h3>
                  {card.details.length > 0 && (
                    <ul className="flex flex-col gap-1">
                      {card.details.map((d) => (
                        <li key={d} className="flex items-start gap-1.5 text-[#F4EFE6]/75 text-xs leading-relaxed">
                          <span aria-hidden="true" className="text-[#F2B035] mt-[3px] shrink-0">·</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="text-[#F2B035] group-hover:text-[#F4EFE6] transition-colors text-xs uppercase tracking-widest mt-auto">
                    Details +
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Edge fades hint there is more to scroll */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#101010] to-transparent transition-opacity ${canNext ? "opacity-100" : "opacity-0"}`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#101010] to-transparent transition-opacity ${canPrev ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <CarouselDots stops={stops} active={active} goTo={goTo} labels={cards.map((c) => c.name)} groupLabel="Event nights" />
    </>
  );
}
