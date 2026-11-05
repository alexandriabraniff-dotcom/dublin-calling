"use client";

import { useState } from "react";
import { addDays, fmt } from "@/lib/dates";
import { listingsOn, type ScheduleEvent, type WeeklyEvent } from "@/lib/locations";
import DatePicker from "@/components/DatePicker";
import EventTile from "@/components/EventTile";


const condensed = { fontFamily: "var(--font-label)" } as const;

/* Events page calendar, after the current dublincalling.com one: seven days starting today (so
   it moves on by itself every day and never shows past days), with Today / previous / next /
   pick-a-date controls. Desktop shows all seven days as columns of event
   tiles; phones get a row of day numbers and the chosen day's tiles. Each tile has the time, a
   book (arrow) or add-to-calendar icon, the title and a More info drop-down. */
export default function EventsCalendar({
  schedule,
  weekly = [],
  today,
  bookHref,
}: {
  schedule: ScheduleEvent[];
  weekly?: WeeklyEvent[];
  today: string;
  bookHref: string; // book a table (OpenTable once MRG sends the links)
  address?: string;
}) {
  const [weekStart, setWeekStart] = useState(today);
  const [selected, setSelected] = useState(today);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return { date, isToday: date === today, items: listingsOn(schedule, weekly, date) };
  });
  const isThisWeek = weekStart === today;
  // Thyson title + the script accent "at Dublin Calling" (brand deck callout style)
  const heading = isThisWeek ? "Sports We're Watching" : `Week of ${fmt(weekStart, { month: "long", day: "numeric" })}`;
  const range = `${fmt(weekStart, { weekday: "short", month: "short", day: "numeric" })} to ${fmt(addDays(weekStart, 6), { weekday: "short", month: "short", day: "numeric" })}`;
  const chosen = days.find((d) => d.date === selected) ?? days[0];

  function goWeek(start: string) {
    const from = start < today ? today : start; // never before today
    setWeekStart(from);
    setSelected(from);
  }

  const ctrl =
    "min-h-11 min-w-11 px-3 inline-flex items-center justify-center border-2 border-white/50 text-white hover:border-[#F2B035] hover:text-[#F2B035] transition-colors disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header + week controls */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
        <h2 className="text-white" aria-live="polite" style={{ ...condensed, fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "0.02em" }}>
          {heading}{" "}
          <span className="font-title text-[#F2B035]" style={{ fontSize: "1.1em" }}>
            at Dublin Calling
          </span>
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => goWeek(today)} disabled={isThisWeek} className={`${ctrl} text-xs font-semibold uppercase tracking-[0.12em]`}>
              Today
            </button>
            <button type="button" onClick={() => goWeek(addDays(weekStart, -7))} disabled={isThisWeek} aria-label="Previous week" className={ctrl}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            </button>
            <p className="flex-1 sm:flex-none text-white text-sm leading-tight sm:min-w-[11rem] text-center" aria-live="polite">
              <span className="block text-white/75 text-[11px] uppercase tracking-[0.15em]">Week of</span>
              <span className="font-semibold">{range}</span>
            </p>
            <button type="button" onClick={() => goWeek(addDays(weekStart, 7))} aria-label="Next week" className={ctrl}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          </div>
          <DatePicker today={today} selected={weekStart} onPick={(iso) => goWeek(iso)} />
        </div>
      </div>

      {/* Desktop: the whole week */}
      <div className="hidden lg:grid grid-cols-7 gap-3">
        {days.map((d) => (
          <div key={d.date}>
            <DayHeader date={d.date} isToday={d.isToday} />
            <ul className="flex flex-col gap-2 mt-3">
              {d.items.length === 0 ? (
                <li className="text-white/75 text-xs italic px-1">No events</li>
              ) : (
                d.items.map((it, i) => <EventTile key={i} item={it} bookHref={bookHref} />)
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Phones and tablets: day picker + the chosen day */}
      <div className="lg:hidden">
        <div role="group" aria-label="Choose a day" className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const on = d.date === chosen.date;
            return (
              <button
                key={d.date}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(d.date)}
                aria-label={`${fmt(d.date, { weekday: "long", month: "long", day: "numeric" })}${d.isToday ? ", today" : ""}, ${d.items.length} event${d.items.length === 1 ? "" : "s"}`}
                className={`flex flex-col items-center py-2 border-b-4 transition-colors ${on ? "border-[#F2B035] text-[#F2B035]" : "border-transparent text-white"}`}
              >
                <span className="text-xs">{fmt(d.date, { weekday: "short" })}</span>
                <span className="leading-none" style={{ ...condensed, fontWeight: 700, fontSize: "1.6rem" }}>{fmt(d.date, { day: "numeric" })}</span>
                <span aria-hidden="true" className={`mt-1 w-1.5 h-1.5 rounded-full ${d.items.length ? "bg-[#F2B035]" : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
        <ul className="flex flex-col gap-2 mt-5" aria-live="polite">
          {chosen.items.length === 0 ? (
            <li className="border-2 border-white/15 px-4 py-5 text-white/80 text-sm italic">No events currently</li>
          ) : (
            chosen.items.map((it, i) => <EventTile key={i} item={it} bookHref={bookHref} />)
          )}
        </ul>
      </div>
    </div>
  );
}

function DayHeader({ date, isToday }: { date: string; isToday: boolean }) {
  return (
    <div className="border-b-2 border-white/20 pb-3">
      <p className="flex items-center justify-between text-white text-sm">
        {fmt(date, { weekday: "short" })}
        {isToday && <span className="bg-[#F2B035] text-[#101010] text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full">Today</span>}
      </p>
      <p className="text-white leading-none mt-1" style={{ ...condensed, fontWeight: 700, fontSize: "2.6rem" }}>
        {fmt(date, { day: "2-digit" })}
      </p>
    </div>
  );
}
