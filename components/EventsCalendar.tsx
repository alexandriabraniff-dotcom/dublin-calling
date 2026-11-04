"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { addDays, fmt } from "@/lib/dates";
import { listingsOn, type ScheduleEvent, type WeeklyEvent } from "@/lib/locations";
import DatePicker from "@/components/DatePicker";

type Listing = ScheduleEvent | WeeklyEvent;

const condensed = { fontFamily: "var(--font-label)" } as const;
const HOUR = 56; // px per hour in the time grid
const HAPPY_HOUR_BG = "#7A2E12"; // deep copper ale, so the gold in the beers drawing pops

/* Events page calendar laid out like a Google Calendar week: hours down the left side, each
   day a column, every listing a block placed at its time (so the blocks don't repeat the
   time). Games show as league logo + team logo vs team logo, Happy Hour as the clinking beers
   drawing on its own copper colour, everything else by name. A block opens a short write-up;
   the calendar icon on each block is for booking a table (OpenTable once MRG sends the links).
   Seven days from today, with Today / previous / next / pick-a-date controls. Phones get a
   row of day numbers and the chosen day's column. */
export default function EventsCalendar({
  schedule,
  weekly = [],
  today,
  bookHref,
}: {
  schedule: ScheduleEvent[];
  weekly?: WeeklyEvent[];
  today: string;
  bookHref: string;
  address?: string;
}) {
  const [weekStart, setWeekStart] = useState(today);
  const [selected, setSelected] = useState(today);
  const [open, setOpen] = useState<{ item: Listing; date: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return { date, isToday: date === today, items: listingsOn(schedule, weekly, date) };
  });
  const isThisWeek = weekStart === today;
  const heading = isThisWeek ? "Sports We're Watching at Dublin Calling" : `Week of ${fmt(weekStart, { month: "long", day: "numeric" })}`;
  const range = `${fmt(weekStart, { weekday: "short", month: "short", day: "numeric" })} to ${fmt(addDays(weekStart, 6), { weekday: "short", month: "short", day: "numeric" })}`;
  const chosen = days.find((d) => d.date === selected) ?? days[0];

  // Hours shown: the whole week on desktop, the chosen day on phones
  const { first, hours } = hourRange(days.flatMap((d) => d.items));
  const day = hourRange(chosen.items);

  function goWeek(start: string) {
    const from = start < today ? today : start; // never before today
    setWeekStart(from);
    setSelected(from);
  }

  function show(item: Listing, date: string) {
    setOpen({ item, date });
    dialog.current?.showModal();
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
      <div className="hidden lg:block">
        <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b-2 border-white/20">
          <div />
          {days.map((d) => (
            <div key={d.date} className="text-center pb-3">
              <p className={`text-xs uppercase tracking-[0.12em] ${d.isToday ? "text-[#F2B035]" : "text-white/80"}`}>{fmt(d.date, { weekday: "short" })}</p>
              <p
                className={`mx-auto mt-1 w-12 h-12 flex items-center justify-center rounded-full leading-none ${d.isToday ? "bg-[#F2B035] text-[#101010]" : "text-white"}`}
                style={{ ...condensed, fontWeight: 700, fontSize: "1.6rem" }}
              >
                {fmt(d.date, { day: "numeric" })}
              </p>
              {d.isToday && <span className="sr-only">Today</span>}
            </div>
          ))}
        </div>
        <AllDayRow days={days} onOpen={show} bookHref={bookHref} />
        <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))]">
          <TimeGutter hours={hours} />
          {days.map((d) => (
            <DayColumn key={d.date} date={d.date} items={d.items} first={first} hours={hours} onOpen={show} bookHref={bookHref} />
          ))}
        </div>
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
        <div className="mt-5" aria-live="polite">
          {chosen.items.length === 0 ? (
            <p className="border-2 border-white/15 px-4 py-5 text-white/80 text-sm italic">No events currently</p>
          ) : (
            <>
              <AllDayRow days={[chosen]} onOpen={show} bookHref={bookHref} />
              <div className="grid grid-cols-[56px_minmax(0,1fr)]">
                <TimeGutter hours={day.hours} />
                <DayColumn date={chosen.date} items={chosen.items} first={day.first} hours={day.hours} onOpen={show} bookHref={bookHref} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* The write-up for a block */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-labelledby="event-info-title"
        className="m-auto w-[min(92vw,26rem)] bg-[#101010] text-white border-2 border-[#F2B035] p-0 backdrop:bg-black/70"
      >
        {open && <Info item={open.item} date={open.date} onClose={() => dialog.current?.close()} />}
      </dialog>
    </div>
  );
}

/* ── Times ── */

interface Span {
  start: number; // minutes from midnight
  end: number;
}

const GAME_LENGTH: Record<string, number> = { NFL: 210, MLB: 180, NHL: 150, NBA: 150, EPL: 120, UCL: 120 };

// "7:00 PM", "4:00 to 6:00 PM", "9:00 PM to 1:00 AM" -> minutes; no time -> null (all-day row)
function span(item: Listing): Span | null {
  const t = item.time ?? "";
  const parts = [...t.matchAll(/(\d{1,2}):(\d{2})\s*(AM|PM)?/gi)];
  if (!parts.length) return null;
  const lastMeridiem = [...parts].reverse().find((p) => p[3])?.[3];
  const toMin = (p: RegExpMatchArray) => {
    const ampm = (p[3] ?? lastMeridiem ?? "PM").toUpperCase();
    return ((+p[1] % 12) + (ampm === "PM" ? 12 : 0)) * 60 + +p[2];
  };
  const start = toMin(parts[0]);
  let end = parts[1] ? toMin(parts[1]) : start + (GAME_LENGTH[matchupOf(item)?.league ?? ""] ?? 120);
  if (end <= start) end += 24 * 60; // runs past midnight
  return { start, end: Math.min(end, 27 * 60) };
}

// From the earliest start to the latest finish (at least 4 PM to midnight)
function hourRange(items: Listing[]) {
  const spans = items.map(span).filter((s): s is Span => !!s);
  const first = Math.min(16, ...spans.map((s) => Math.floor(s.start / 60)));
  const last = Math.max(24, ...spans.map((s) => Math.ceil(s.end / 60)));
  return { first, hours: Array.from({ length: last - first }, (_, i) => first + i) };
}

const hourLabel = (h: number) => {
  const hh = h % 24;
  return `${hh % 12 === 0 ? 12 : hh % 12} ${hh < 12 ? "AM" : "PM"}`;
};

function TimeGutter({ hours }: { hours: number[] }) {
  return (
    <div aria-hidden="true">
      {hours.map((h) => (
        <div key={h} className="relative font-text text-white/75 text-[11px] text-right pr-2" style={{ height: HOUR }}>
          <span className="relative -top-2">{hourLabel(h)}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Blocks ── */

const matchupOf = (item: Listing) => ("matchup" in item ? item.matchup : undefined);
const isHappyHour = (item: Listing) => /happy hour/i.test(item.title);

function DayColumn({
  date,
  items,
  first,
  hours,
  onOpen,
  bookHref,
}: {
  date: string;
  items: Listing[];
  first: number;
  hours: number[];
  onOpen: (item: Listing, date: string) => void;
  bookHref: string;
}) {
  // Overlapping blocks sit side by side, like Google Calendar
  const timed = items.map((item) => ({ item, s: span(item) })).filter((x): x is { item: Listing; s: Span } => !!x.s);
  timed.sort((a, b) => a.s.start - b.s.start || b.s.end - a.s.end);
  const placed: { item: Listing; s: Span; col: number; cols: number }[] = [];
  let cluster: typeof placed = [];
  let clusterEnd = -1;
  const flush = () => {
    const cols = Math.max(1, ...cluster.map((c) => c.col + 1));
    cluster.forEach((c) => (c.cols = cols));
    cluster = [];
  };
  for (const t of timed) {
    if (t.s.start >= clusterEnd) flush();
    const taken = new Set(cluster.filter((c) => c.s.end > t.s.start).map((c) => c.col));
    let col = 0;
    while (taken.has(col)) col++;
    const p = { ...t, col, cols: 1 };
    cluster.push(p);
    placed.push(p);
    clusterEnd = Math.max(clusterEnd, t.s.end);
  }
  flush();

  return (
    <div className="relative border-l border-white/15" style={{ height: hours.length * HOUR }}>
      {hours.map((h, i) => (
        <div key={h} aria-hidden="true" className="absolute inset-x-0 border-t border-white/10" style={{ top: i * HOUR }} />
      ))}
      <ul aria-label={fmt(date, { weekday: "long", month: "long", day: "numeric" })}>
        {placed.map(({ item, s, col, cols }, i) => (
          <li
            key={i}
            className="absolute p-0.5"
            style={{
              top: ((s.start - first * 60) / 60) * HOUR,
              height: Math.max(((s.end - s.start) / 60) * HOUR, 52),
              left: `${(col / cols) * 100}%`,
              width: `${100 / cols}%`,
            }}
          >
            <Block item={item} date={date} onOpen={onOpen} bookHref={bookHref} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Listings without a time, above the grid
function AllDayRow({
  days,
  onOpen,
  bookHref,
}: {
  days: { date: string; items: Listing[] }[];
  onOpen: (item: Listing, date: string) => void;
  bookHref: string;
}) {
  if (!days.some((d) => d.items.some((it) => !span(it)))) return null;
  return (
    <div className={`grid ${days.length > 1 ? "grid-cols-[56px_repeat(7,minmax(0,1fr))]" : "grid-cols-[56px_minmax(0,1fr)]"} border-b border-white/20 py-1`}>
      <p className="font-text text-white/75 text-[11px] text-right pr-2 pt-2">All day</p>
      {days.map((d) => (
        <ul key={d.date} className="flex flex-col gap-1 px-0.5" aria-label={`${fmt(d.date, { weekday: "long", month: "long", day: "numeric" })}, all day`}>
          {d.items.filter((it) => !span(it)).map((it, i) => (
            <li key={i} className="h-12">
              <Block item={it} date={d.date} onOpen={onOpen} bookHref={bookHref} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function Block({ item, date, onOpen, bookHref }: { item: Listing; date: string; onOpen: (item: Listing, date: string) => void; bookHref: string }) {
  const m = matchupOf(item);
  const team = "team" in item ? item.team : undefined;
  const happy = isHappyHour(item);
  const bg = happy ? HAPPY_HOUR_BG : team?.color;
  const label = `${item.title}${item.time ? `, ${item.time}` : ""}`;

  return (
    <div
      className={`@container relative h-full overflow-hidden rounded-md border-l-4 ${happy ? "border-[#F2B035]" : team?.color ? "border-white/70" : "border-[#F2B035] bg-[#1d3a2c]"}`}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <button
        type="button"
        onClick={() => onOpen(item, date)}
        aria-label={`${label}. More info`}
        aria-haspopup="dialog"
        className="absolute inset-0 w-full h-full flex items-center justify-center px-1 pt-6 pb-1 @[130px]:pt-1 @[130px]:pr-7 hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F2B035]"
      >
        {happy ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/decor/beers.webp" alt="" className="max-h-full w-auto max-w-full object-contain" style={{ height: 64 }} />
        ) : m ? (
          <Matchup m={m} />
        ) : (
          <span className="text-white text-[11px] @[110px]:text-xs font-semibold leading-tight text-center line-clamp-3 break-words hyphens-auto min-w-0">{item.title}</span>
        )}
      </button>
      {/* Book a table (OpenTable once the links arrive) */}
      <a
        href={bookHref}
        {...(bookHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={`Book a table for ${item.title}`}
        className="absolute top-0.5 right-0.5 w-6 h-6 flex items-center justify-center text-white hover:text-[#F2B035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B035]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      </a>
    </div>
  );
}

function Logo({ src, name, size }: { src?: string; name: string; size: number }) {
  if (!src) return <span className="text-white text-[11px] font-semibold">{name}</span>;
  return (
    <span className="shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ width: size, height: size }}>
      <Image src={src} alt="" width={size} height={size} className="w-[80%] h-[80%] object-contain" />
    </span>
  );
}

// "NHL [Leafs] vs [Avalanche]" as logos. In a narrow block (games overlapping) the league logo
// drops off and the two teams stack, so nothing gets cut off.
function Matchup({ m, size = 26, wide }: { m: NonNullable<ReturnType<typeof matchupOf>>; size?: number; wide?: boolean }) {
  return (
    <span className={`flex items-center justify-center gap-1 ${wide ? "flex-row" : "flex-col @[130px]:flex-row"}`}>
      <span className={wide ? "flex" : "hidden @[130px]:flex"}>
        <Logo src={m.leagueLogo} name={m.league} size={size} />
      </span>
      <span className={`flex items-center gap-1 ${wide ? "flex-row" : "flex-col @[96px]:flex-row"}`}>
        <Logo src={m.away.logo} name={m.away.name} size={size} />
        <span className="text-white text-[11px] font-semibold uppercase leading-none">vs</span>
        <Logo src={m.home.logo} name={m.home.name} size={size} />
      </span>
    </span>
  );
}

function Info({ item, date, onClose }: { item: Listing; date: string; onClose: () => void }) {
  const m = matchupOf(item);
  const info = "info" in item ? item.info : "about" in item ? item.about : undefined;
  const text =
    info ??
    (m || ("bigScreen" in item && item.bigScreen)
      ? "On the big screens with the sound on. Grab your crew and a table and catch every play."
      : isHappyHour(item)
        ? "Drink and food specials to kick off the night. See the Happy Hour menu for what's on."
        : undefined);
  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-text text-[#F2B035] text-xs uppercase tracking-[0.12em]">
            {fmt(date, { weekday: "long", month: "long", day: "numeric" })}
            {item.time && `, ${item.time}`}
          </p>
          <h3 id="event-info-title" className="font-label text-white uppercase mt-2 text-lg leading-snug">
            {m ? `${m.league}: ${m.away.name} vs ${m.home.name}` : item.title}
          </h3>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="-m-2 p-2 w-11 h-11 flex items-center justify-center text-white hover:text-[#F2B035]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
      </div>
      {m && (
        <div className="mt-4">
          <Matchup m={m} size={40} wide />
        </div>
      )}
      {text && <p className="text-white/90 text-sm leading-relaxed mt-4">{text}</p>}
    </div>
  );
}
