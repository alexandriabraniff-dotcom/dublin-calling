"use client";

import { useState } from "react";
import Image from "next/image";
import { addDays, fmt } from "@/lib/dates";
import { listingsOn, type ScheduleEvent, type WeeklyEvent } from "@/lib/locations";
import DatePicker from "@/components/DatePicker";

type Listing = ScheduleEvent | WeeklyEvent;

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
  const heading = isThisWeek ? "Sports We're Watching at Dublin Calling" : `Week of ${fmt(weekStart, { month: "long", day: "numeric" })}`;
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
          {heading}
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
                d.items.map((it, i) => <Tile key={i} item={it} date={d.date} bookHref={bookHref} />)
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
            chosen.items.map((it, i) => <Tile key={i} item={it} date={chosen.date} bookHref={bookHref} />)
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

const HAPPY_HOUR_BG = "#7A2E12"; // deep copper ale, so the gold in the beers drawing pops
const isHappyHour = (item: Listing) => /happy hour/i.test(item.title);

function Logo({ src, name, size = 28 }: { src?: string; name: string; size?: number }) {
  if (!src) return <span className="text-white text-[11px] font-semibold">{name}</span>;
  return (
    <span className="shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ width: size, height: size }}>
      <Image src={src} alt="" width={size} height={size} className="w-[80%] h-[80%] object-contain" />
    </span>
  );
}

/* One listing: time + book-a-table calendar icon, then the listing itself. Games show as
   league logo, team logo vs team logo; Happy Hour as the clinking beers on copper; anything
   else by name. "More info" opens a short write-up. */
function Tile({ item, bookHref }: { item: Listing; date: string; bookHref: string }) {
  const team = "team" in item ? item.team : undefined;
  const m = "matchup" in item ? item.matchup : undefined;
  const happy = isHappyHour(item);
  const bg = happy ? HAPPY_HOUR_BG : team?.color;
  const info = "info" in item ? item.info : "about" in item ? item.about : undefined;
  const text =
    info ??
    (m || ("bigScreen" in item && item.bigScreen)
      ? "On the big screens with the sound on. Grab your crew and a table and catch every play."
      : happy
        ? "Drink and food specials to kick off the night. See the Happy Hour menu for what's on."
        : undefined);

  return (
    <li className={`p-3 ${bg ? "" : "bg-white/[0.07]"}`} style={bg ? { backgroundColor: bg } : undefined}>
      <div className="flex items-start justify-between gap-2">
        <p className="font-text text-white/85 text-xs uppercase tracking-[0.04em]">{item.time ?? ""}</p>
        <a
          href={bookHref}
          {...(bookHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={`Book a table for ${item.title}`}
          className="-m-2 p-2 text-white hover:text-[#F2B035]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
        </a>
      </div>
      <div className="mt-2">
        {happy ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/decor/beers.webp" alt="" className="h-14 w-auto mx-auto" />
            <span className="sr-only">{item.title}</span>
          </>
        ) : m ? (
          <>
            <span aria-hidden="true" className="flex flex-wrap items-center justify-center gap-1">
              <Logo src={m.leagueLogo} name={m.league} />
              <span className="flex items-center gap-1">
                <Logo src={m.away.logo} name={m.away.name} />
                <span className="text-white text-[11px] font-semibold uppercase">vs</span>
                <Logo src={m.home.logo} name={m.home.name} />
              </span>
            </span>
            <span className="sr-only">{`${m.league}: ${m.away.name} vs ${m.home.name}`}</span>
          </>
        ) : (
          <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
        )}
      </div>
      {text && (
        <details className="group mt-2">
          <summary className="list-none cursor-pointer inline-flex items-center gap-1 min-h-6 text-white/85 text-xs hover:text-[#F2B035] [&::-webkit-details-marker]:hidden">
            More info
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" className="transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9" /></svg>
          </summary>
          <p className="mt-2 text-white/90 text-xs leading-relaxed">
            {m && <span className="block font-semibold mb-1">{`${m.away.name} vs ${m.home.name}`}</span>}
            {text}
          </p>
        </details>
      )}
    </li>
  );
}
