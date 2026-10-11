"use client";

import { useEffect, useRef, useState } from "react";
import { useSnapCarousel, CarouselArrow, CarouselDots } from "@/components/carousel";
import type { ScheduleEvent } from "@/lib/locations";

/* Dates are handled as YYYY-MM-DD strings in UTC so they never shift with the viewer's timezone */
const DAY = 86400000;
const toUTC = (iso: string) => Date.parse(iso + "T00:00:00Z");
const toISO = (t: number) => new Date(t).toISOString().slice(0, 10);
const addDays = (iso: string, n: number) => toISO(toUTC(iso) + n * DAY);
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(toUTC(iso)).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });

/* "This Week" schedule: a centred 7-column grid on desktop, a swipeable row with
   side gutters, arrows, a peeking next day and position dots below lg.
   withPicker adds a "Choose a date" calendar pop-up to jump to other weeks. */
export default function WeekCalendar({
  schedule,
  today,
  withPicker = false,
  sectionBg = "#082a1c",
}: {
  schedule: ScheduleEvent[];
  today: string;
  withPicker?: boolean;
  sectionBg?: string; // colour of the surrounding section, for the edge fade
}) {
  const [start, setStart] = useState(today);
  const trackRef = useRef<HTMLDivElement>(null);
  const { canPrev, canNext, active, stops, goTo, step } = useSnapCarousel(trackRef, 7);

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return {
      date,
      isToday: date === today,
      dayName: fmt(date, { weekday: "long" }),
      dateLabel: fmt(date, { month: "short", day: "numeric" }),
      items: schedule.filter((e) => e.date === date),
    };
  });
  const labels = week.map((d) => (d.isToday ? "Today" : d.dayName));
  const isThisWeek = start === today;
  const heading = isThisWeek ? "This Week at Dublin Calling" : `Week of ${fmt(start, { month: "long", day: "numeric" })}`;

  function jumpTo(iso: string) {
    setStart(iso);
    trackRef.current?.scrollTo({ left: 0 });
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-6 mb-8 flex flex-col items-center gap-5 text-center">
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
          aria-label={`${heading}, scroll sideways for more days`}
          tabIndex={0}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B035] lg:grid lg:grid-cols-7 lg:gap-px lg:bg-white/10 lg:mx-6 lg:px-0 lg:overflow-visible lg:snap-none"
        >
          {week.map((day) => (
            <div
              key={day.date}
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
                <p className="text-white/80 text-xs italic">No events currently</p>
              ) : (
                <ul className="flex flex-col gap-2 flex-1">
                  {day.items.map((item) => (
                    <li key={item.title + (item.time ?? "")} className="flex items-start gap-1.5">
                      <span aria-hidden="true" className="text-[#F2B035] shrink-0 mt-[3px]">·</span>
                      <span className="text-white/85 text-xs leading-relaxed">
                        {item.title}
                        {item.time && <>, {item.time}</>}
                      </span>
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
          className={`lg:hidden pointer-events-none absolute inset-y-0 right-0 w-12 transition-opacity ${canNext ? "opacity-100" : "opacity-0"}`}
          style={{ background: `linear-gradient(to left, ${sectionBg}, transparent)` }}
        />
      </div>

      <CarouselDots stops={stops} active={active} goTo={goTo} labels={labels} groupLabel="Days this week" className="lg:hidden" />
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
