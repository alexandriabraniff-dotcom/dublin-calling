"use client";

import { useState } from "react";
import { addDays, fmt } from "@/lib/dates";
import { listingsOn, type ScheduleEvent, type WeeklyEvent } from "@/lib/locations";
import { EventRow } from "@/components/EventTile";

/* Homepage "Lineup": seven date tiles from today, then the chosen day's listings as rows with
   the same look as the events calendar (components/EventTile.tsx EventRow): copper Happy Hour,
   chalkboard trivia, UFC belt on textured black, game rows with league logo + texture under the
   team colour. Each row opens a write-up; the calendar icon books a table. */
export default function WeekCalendar({
  schedule,
  weekly = [],
  today,
  bookHref,
}: {
  schedule: ScheduleEvent[];
  weekly?: WeeklyEvent[];
  today: string;
  bookHref: string; // book a table
  address?: string;
}) {
  const [selected, setSelected] = useState(today);
  const start = today;

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return { date, isToday: date === today, count: listingsOn(schedule, weekly, date).length };
  });
  const items = listingsOn(schedule, weekly, selected);
  const heading = "Sports"; // + the script accent "at Dublin Calling"
  const dayLabel =
    selected === today ? "Tonight at Dublin Calling" : fmt(selected, { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8 flex flex-col items-center gap-5 text-center">
        <h2
          className="text-[#F2B035]"
          style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "0.02em" }}
        >
          {heading}{" "}
          <span className="font-title text-[#F2B035]" style={{ fontSize: "1.1em" }}>
            at Dublin Calling
          </span>
        </h2>
      </div>

      {/* Date tiles */}
      <div role="group" aria-label="Choose a day" className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {week.map((day) => {
          const on = day.date === selected;
          const events = day.count === 0 ? "no events" : `${day.count} event${day.count === 1 ? "" : "s"}`;
          return (
            <button
              key={day.date}
              type="button"
              onClick={() => setSelected(day.date)}
              aria-pressed={on}
              aria-label={`${fmt(day.date, { weekday: "long", month: "long", day: "numeric" })}${day.isToday ? ", today" : ""}, ${events}`}
              className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-3 sm:py-5 border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B035] ${
                on ? "bg-[#F2B035] border-[#F2B035] text-[#082a1c]" : "border-white/25 text-white hover:border-[#F2B035]"
              }`}
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em]">
                {day.isToday ? "Today" : fmt(day.date, { weekday: "short" })}
              </span>
              <span
                className="leading-none"
                style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "clamp(1.25rem, 3.4vw, 2.6rem)" }}
              >
                {fmt(day.date, { day: "2-digit" })}
              </span>
              <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${day.count ? (on ? "bg-[#082a1c]" : "bg-[#F2B035]") : "bg-transparent"}`} />
            </button>
          );
        })}
      </div>

      {/* Listings for the chosen day */}
      <div className="mt-8" aria-live="polite">
        <p className="flex items-center gap-3 text-white/80 text-[11px] uppercase tracking-[0.25em] mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="4" width="20" height="14" rx="2" /><polyline points="8 22 12 18 16 22" />
          </svg>
          {dayLabel}
        </p>
        {items.length === 0 ? (
          <p className="border-2 border-white/15 px-5 py-6 text-white/80 text-sm italic">No events currently</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <EventRow key={item.title + (item.time ?? "")} item={item} bookHref={bookHref} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
