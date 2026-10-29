/* Dates are handled as YYYY-MM-DD strings in UTC so they never shift with the viewer's timezone */
export const DAY = 86400000;
export const toUTC = (iso: string) => Date.parse(iso + "T00:00:00Z");
export const toISO = (t: number) => new Date(t).toISOString().slice(0, 10);
export const addDays = (iso: string, n: number) => toISO(toUTC(iso) + n * DAY);
export const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(toUTC(iso)).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
export const dayOfWeek = (iso: string) => new Date(toUTC(iso)).getUTCDay(); // 0 = Sunday

// Google Calendar "add event" link for a listing (all-day on that date; the time goes in the details)
export function calendarLink(iso: string, title: string, time: string | undefined, address: string) {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${title} at Dublin Calling`,
    dates: `${iso.replaceAll("-", "")}/${addDays(iso, 1).replaceAll("-", "")}`,
    details: time ? `${title}, ${time}` : title,
    location: address,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}
