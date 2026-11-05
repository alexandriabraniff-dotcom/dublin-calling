/* What's still to come today at a venue, judged by the venue's own clock (Toronto or Vancouver
   time, whatever the visitor's timezone). Used by the "What's happening tonight?" bar on the
   server and again in the browser every minute, so a cached page never shows something that
   has already started. A single time ("3:00 PM") drops off once it starts; a range ("4:00 to
   6:00 PM") stays up until it ends; a listing with no time stays all day. */

export interface TonightItem {
  title: string;
  time?: string;
}

// The venue's local date (YYYY-MM-DD) and minutes since midnight
export function venueNow(timezone: string, at: number = Date.now()): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(at));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, minutes: +get("hour") * 60 + +get("minute") };
}

// "7:00 PM" -> { start }, "4:00 to 6:00 PM" -> { start, end }; minutes since midnight
function parseTime(time: string): { start: number; end?: number } | null {
  const parts = [...time.matchAll(/(\d{1,2}):(\d{2})\s*(AM|PM)?/gi)];
  if (!parts.length) return null;
  const lastMeridiem = [...parts].reverse().find((p) => p[3])?.[3];
  const toMin = (p: RegExpMatchArray) => {
    const ampm = (p[3] ?? lastMeridiem ?? "PM").toUpperCase();
    return ((+p[1] % 12) + (ampm === "PM" ? 12 : 0)) * 60 + +p[2];
  };
  const start = toMin(parts[0]);
  if (!parts[1]) return { start };
  let end = toMin(parts[1]);
  if (end <= start) end += 24 * 60; // runs past midnight
  return { start, end };
}

export function stillToCome<T extends TonightItem>(items: T[], listDate: string, timezone: string, at: number = Date.now()): T[] {
  const now = venueNow(timezone, at);
  if (now.date !== listDate) return []; // the list is for a different day (page cached past midnight)
  return items.filter((it) => {
    const t = it.time ? parseTime(it.time) : null;
    if (!t) return true;
    return t.end !== undefined ? now.minutes < t.end : now.minutes < t.start;
  });
}
