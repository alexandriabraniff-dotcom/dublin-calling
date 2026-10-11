"use client";

import { useRef } from "react";
import { useSnapCarousel, CarouselArrow, CarouselDots } from "@/components/carousel";

export interface WeekDay {
  dayName: string;
  dateLabel: string;
  isToday: boolean;
  items: string[];
}

/* "This Week" schedule: a centred 7-column grid on desktop, a swipeable row with
   side gutters, arrows, a peeking next day and position dots below lg */
export default function WeekCalendar({ week }: { week: WeekDay[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { canPrev, canNext, active, stops, goTo, step } = useSnapCarousel(trackRef, week.length);
  const labels = week.map((d) => (d.isToday ? "Today" : d.dayName));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-6 mb-8 flex flex-col items-center gap-5 text-center">
        <h2
          className="text-white"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "0.02em" }}
        >
          This Week at Dublin Calling
        </h2>
        <div className="flex items-center gap-3 lg:hidden">
          <CarouselArrow dir="prev" label="Previous day" disabled={!canPrev} onClick={() => step(-1)} />
          <p className="text-white/80 text-xs uppercase tracking-[0.2em] min-w-[9rem]" aria-live="polite">
            {labels[active] ?? labels[0]}
          </p>
          <CarouselArrow dir="next" label="Next day" disabled={!canNext} onClick={() => step(1)} />
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          role="region"
          aria-label="This week's schedule, scroll sideways for more days"
          tabIndex={0}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B035] lg:grid lg:grid-cols-7 lg:gap-px lg:bg-white/10 lg:mx-6 lg:px-0 lg:overflow-visible lg:snap-none"
        >
          {week.map((day) => (
            <div
              key={day.dayName}
              data-card
              className={`flex flex-col gap-3 p-5 shrink-0 snap-start w-[72vw] sm:w-60 lg:w-auto border border-white/15 lg:border-0 ${day.isToday ? "bg-[#0a1f14]" : "bg-[#082a1c]"}`}
            >
              <div className="border-b border-white/20 pb-3">
                <h3
                  className={`text-[11px] uppercase tracking-[0.2em] ${day.isToday ? "text-[#F2B035]" : "text-white/75"}`}
                  style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
                >
                  {day.isToday ? "Today" : day.dayName}
                </h3>
                <p className="text-white/75 text-xs mt-0.5">{day.dateLabel}</p>
              </div>
              {day.items.length === 0 ? (
                <p className="text-white/80 text-xs italic">No events</p>
              ) : (
                <ul className="flex flex-col gap-2 flex-1">
                  {day.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span aria-hidden="true" className="text-[#F2B035] shrink-0 mt-[3px]">·</span>
                      <span className="text-white/85 text-xs leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Edge fade while more days are off-screen */}
        <div
          aria-hidden="true"
          className={`lg:hidden pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#082a1c] to-transparent transition-opacity ${canNext ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <CarouselDots stops={stops} active={active} goTo={goTo} labels={labels} groupLabel="Days this week" className="lg:hidden" />
    </div>
  );
}
