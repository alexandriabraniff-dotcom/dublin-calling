"use client";

import { useEffect, useRef, useState } from "react";
import { listingsOn, type ScheduleEvent, type WeeklyEvent } from "@/lib/locations";

/* Dates are handled as YYYY-MM-DD strings in UTC so they never shift with the viewer's timezone */
const DAY = 86400000;
const toUTC = (iso: string) => Date.parse(iso + "T00:00:00Z");
const toISO = (t: number) => new Date(t).toISOString().slice(0, 10);
const addDays = (iso: string, n: number) => toISO(toUTC(iso) + n * DAY);
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(toUTC(iso)).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });

// Google Calendar "add event" link for a listing (all-day on that date; the time goes in the details)
function calendarLink(iso: string, title: string, time: string | undefined, address: string) {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${title} at Dublin Calling`,
    dates: `${iso.replaceAll("-", "")}/${addDays(iso, 1).replaceAll("-", "")}`,
    details: time ? `${title}, ${time}` : title,
    location: address,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

/* "The Lineup": seven date tiles from the start day, then the chosen day's listings,
   each with a Book Your Spot button and an add-to-calendar link.
   withPicker adds a "Choose a date" calendar pop-up to jump to other weeks. */
export default function WeekCalendar({
  schedule,
  weekly = [],
  today,
  bookHref,
  address,
  withPicker = false,
}: {
  schedule: ScheduleEvent[];
  weekly?: WeeklyEvent[];
  today: string;
  bookHref: string; // fallback for listings without their own Admit One link
  address: string;
  withPicker?: boolean;
}) {
  const [start, setStart] = useState(today);
  const [selected, setSelected] = useState(today);

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return { date, isToday: date === today, count: listingsOn(schedule, weekly, date).length };
  });
  const items = listingsOn(schedule, weekly, selected);
  const isThisWeek = start === today;
  const heading = isThisWeek ? "This Week at Dublin Calling" : `Week of ${fmt(start, { month: "long", day: "numeric" })}`;
  const dayLabel =
    selected === today ? "Tonight at Dublin Calling" : fmt(selected, { weekday: "long", month: "long", day: "numeric" });

  function jumpTo(iso: string) {
    setStart(iso);
    setSelected(iso);
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8 flex flex-col items-center gap-5 text-center">
        <h2
          className="text-white"
          aria-live="polite"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "0.02em" }}
        >
          {heading}
        </h2>

        {withPicker && (
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <DatePicker today={today} selected={start} onPick={jumpTo} />
            {!isThisWeek && (
              <button
                type="button"
                onClick={() => jumpTo(today)}
                className="btn min-h-11 px-5 border-2 border-white/50 text-white text-xs uppercase tracking-[0.15em] hover:border-[#F2B035] hover:text-[#F2B035] transition-colors"
              >
                Back to This Week
              </button>
            )}
          </div>
        )}
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
                on ? "bg-[#F2B035] border-[#F2B035] text-[#101010]" : "border-white/25 text-white hover:border-[#F2B035]"
              }`}
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em]">
                {day.isToday ? "Today" : fmt(day.date, { weekday: "short" })}
              </span>
              <span
                className="leading-none"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.25rem, 3.4vw, 2.6rem)" }}
              >
                {fmt(day.date, { day: "2-digit" })}
              </span>
              <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${day.count ? (on ? "bg-[#101010]" : "bg-[#F2B035]") : "bg-transparent"}`} />
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
            {items.map((item, i) => (
              <li
                key={item.title + (item.time ?? "")}
                className={`flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 border-2 ${i === 0 ? "border-[#F2B035] bg-[#101010]/60" : "border-white/15 bg-[#101010]/30"}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="flex flex-wrap items-center gap-x-3 text-[#F2B035] text-xs uppercase tracking-[0.15em] mb-1">
                    {item.time && <span>{item.time}</span>}
                    {"bigScreen" in item && item.bigScreen && <span className="text-white/80">On the big screen</span>}
                  </p>
                  <p
                    className="text-white uppercase"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "clamp(1rem, 1.6vw, 1.25rem)", letterSpacing: "0.04em" }}
                  >
                    {item.title}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={item.url ?? bookHref}
                    {...(item.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="btn flex-1 sm:flex-none min-h-11 inline-flex items-center justify-center px-6 bg-[#F2B035] text-[#101010] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#e0a020] transition-colors"
                  >
                    Book Your Spot<span className="sr-only">: {item.title}{item.url ? " (opens Admit One in a new tab)" : ""}</span>
                  </a>
                  <a
                    href={calendarLink(selected, item.title, item.time, address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Add ${item.title} to Google Calendar (opens in a new tab)`}
                    className="w-11 h-11 shrink-0 flex items-center justify-center border-2 border-white/40 text-white hover:border-[#F2B035] hover:text-[#F2B035] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="12" y1="14" x2="12" y2="18" /><line x1="10" y1="16" x2="14" y2="16" />
                    </svg>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* Small month calendar pop-up. Arrow keys move between days, Enter picks, Escape closes. */
function DatePicker({ today, selected, onPick }: { today: string; selected: string; onPick: (iso: string) => void }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(selected);
  const [month, setMonth] = useState(selected.slice(0, 7)); // YYYY-MM
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep keyboard focus on the highlighted day as it moves
  useEffect(() => {
    if (open) gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focused}"]`)?.focus();
  }, [open, focused, month]);

  function toggle() {
    if (!open) {
      setFocused(selected);
      setMonth(selected.slice(0, 7));
    }
    setOpen(!open);
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function pick(iso: string) {
    onPick(iso);
    close();
  }

  function moveFocus(iso: string) {
    if (iso < today) iso = today;
    setFocused(iso);
    setMonth(iso.slice(0, 7));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in moves) {
      e.preventDefault();
      moveFocus(addDays(focused, moves[e.key]));
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  const first = month + "-01";
  const firstDow = new Date(toUTC(first)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(+month.slice(0, 4), +month.slice(5, 7), 0)).getUTCDate();
  const cells: (string | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => addDays(first, i)),
  ];
  const shiftMonth = (n: number) => {
    const d = new Date(toUTC(first));
    d.setUTCMonth(d.getUTCMonth() + n);
    const m = toISO(d.getTime()).slice(0, 7);
    setMonth(m);
    setFocused(m === today.slice(0, 7) ? today : m + "-01");
  };
  const canPrevMonth = month > today.slice(0, 7);
  const weekEnd = addDays(selected, 6);

  return (
    <div ref={wrapRef} className="relative w-full sm:w-auto">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="btn min-h-11 px-5 flex items-center gap-2 bg-[#F2B035] text-[#101010] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#e0a020] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Choose a Date
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose a date to see that week"
          onKeyDown={onKeyDown}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-40 w-[min(20rem,calc(100vw-2rem))] border-4 border-[#F2B035] bg-[#0F5132] p-[3px] text-left"
        >
          <div className="border-2 border-[#F2B035] bg-[#101010] p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                disabled={!canPrevMonth}
                aria-label="Previous month"
                className="w-12 h-12 flex items-center justify-center text-[#F2B035] hover:bg-white/10 disabled:opacity-30"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <p className="text-white text-sm font-semibold" aria-live="polite">
                {fmt(first, { month: "long", year: "numeric" })}
              </p>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className="w-12 h-12 flex items-center justify-center text-[#F2B035] hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-1" aria-hidden="true">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d} className="text-white/75 text-[11px] uppercase">{d}</span>
              ))}
            </div>
            <div ref={gridRef} className="grid grid-cols-7 gap-1">
              {cells.map((iso, i) =>
                iso === null ? (
                  <span key={`e${i}`} />
                ) : (
                  <button
                    key={iso}
                    type="button"
                    data-date={iso}
                    tabIndex={iso === focused ? 0 : -1}
                    disabled={iso < today}
                    onClick={() => pick(iso)}
                    aria-label={fmt(iso, { weekday: "long", month: "long", day: "numeric", year: "numeric" }) + (iso === today ? ", today" : "")}
                    aria-pressed={iso >= selected && iso <= weekEnd}
                    className={`h-10 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B035] disabled:text-white/30 disabled:cursor-not-allowed ${
                      iso >= selected && iso <= weekEnd
                        ? "bg-[#F2B035] text-[#101010] font-semibold"
                        : iso === today
                        ? "border border-[#F2B035] text-white"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {+iso.slice(8)}
                  </button>
                )
              )}
            </div>
            <p className="text-white/75 text-xs mt-3">Pick any day to see the seven days from that date.</p>
          </div>
        </div>
      )}
    </div>
  );
}
