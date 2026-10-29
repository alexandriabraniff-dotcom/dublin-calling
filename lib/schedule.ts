import { getAdmitOneEvents, type AdmitOneEvent } from "@/lib/admitone";
import { getGames, type Game } from "@/lib/espn";
import type { Location, ScheduleEvent } from "@/lib/locations";

/* Live schedule for a location: Admit One events (with their Book Your Spot links) plus every
   followed team's game from ESPN. A game that already has an Admit One date (same day, same
   team tag) is merged into it, so the listing gets the opponent name and the Admit One link. */

export interface SeriesDate {
  date: string; // YYYY-MM-DD in the location's timezone
  time: string;
  label: string; // opponent for team nights ("vs Canucks"), otherwise ""
  url: string;
  soldOut: boolean;
}

export interface Series {
  key: string;
  title: string;
  description: string;
  image?: string;
  category: string; // filter chip on the events page
  dates: SeriesDate[]; // upcoming only, soonest first
}

// Display names for Admit One series tags (their own titles only name the first opponent)
const SERIES_TITLES: Record<string, string> = {
  leafs: "Leafs Nights at Dublin Calling",
  raptors: "Raptors Always On",
  mlb: "Blue Jays & MLB at Dublin Calling",
};

const CATEGORY_ORDER = ["Leafs", "Raptors", "Blue Jays", "NFL", "UFC", "Games & Trivia", "Parties"];

function category(tag: string, title: string): string {
  if (tag === "leafs") return "Leafs";
  if (tag === "raptors") return "Raptors";
  if (tag === "mlb" || /world series|mlb|jays/i.test(title)) return "Blue Jays";
  if (/nfl/i.test(title)) return "NFL";
  if (/ufc/i.test(title)) return "UFC";
  if (/trivia|darts|pool/i.test(title)) return "Games & Trivia";
  return "Parties";
}

const localDate = (iso: string, tz: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
const localTime = (iso: string, tz: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(new Date(iso));

async function load(loc: Location): Promise<{ events: AdmitOneEvent[]; games: Game[] }> {
  const [events, games] = await Promise.all([
    loc.admitOneNodeId ? getAdmitOneEvents(loc.admitOneNodeId) : Promise.resolve([]),
    loc.teams.length ? getGames(loc.teams) : Promise.resolve([]),
  ]);
  const now = Date.now() - 6 * 3600 * 1000; // keep tonight's games listed after they start
  return {
    events: events.map((e) => ({ ...e, dates: e.dates.filter((d) => Date.parse(d.start) >= now) })).filter((e) => e.dates.length),
    games: games.filter((g) => Date.parse(g.start) >= now),
  };
}

// The game (if any) that an Admit One team-night date is for
function gameFor(games: Game[], tag: string, date: string, tz: string) {
  return games.find((g) => g.team === tag && localDate(g.start, tz) === date);
}

/* Dated listings for the This Week Lineup and the tonight bar, sorted by start time */
export async function getLiveSchedule(loc: Location): Promise<ScheduleEvent[]> {
  const { events, games } = await load(loc);
  const tz = loc.timezone;
  const rows: (ScheduleEvent & { start: string })[] = [];
  const used = new Set<Game>();

  for (const e of events) {
    for (const d of e.dates) {
      const date = localDate(d.start, tz);
      const game = e.tag ? gameFor(games, e.tag, date, tz) : undefined;
      if (game) used.add(game);
      rows.push({ date, time: localTime(d.start, tz), title: game?.title ?? (e.tag === "leafs" || e.tag === "raptors" ? SERIES_TITLES[e.tag] : e.title), url: d.url, start: d.start });
    }
  }

  for (const g of games) {
    if (used.has(g)) continue;
    const date = localDate(g.start, tz);
    // e.g. a Bills game on a night with an "NFL Season Event": book through that event
    const league = g.title.split(":")[0];
    const host = rows.find((r) => r.date === date && r.url && r.title.toUpperCase().includes(league));
    rows.push({ date, time: localTime(g.start, tz), title: g.title, url: host?.url, bigScreen: true, start: g.start });
  }

  rows.sort((a, b) => a.start.localeCompare(b.start));
  return rows.map((r) => ({ date: r.date, time: r.time, title: r.title, url: r.url, bigScreen: r.bigScreen }));
}

/* Admit One events grouped into series for the events page, with a filter category each */
export async function getSeries(loc: Location): Promise<Series[]> {
  const { events, games } = await load(loc);
  const tz = loc.timezone;
  const groups = new Map<string, Series & { first: string; starts: string[] }>();

  for (const e of events) {
    const key = e.tag || e.title.toLowerCase();
    let s = groups.get(key);
    if (!s) {
      s = {
        key,
        title: SERIES_TITLES[e.tag] || e.title,
        description: e.description,
        image: e.image,
        category: category(e.tag, e.title),
        dates: [],
        first: e.dates[0].start,
        starts: [],
      };
      groups.set(key, s);
    }
    for (const d of e.dates) {
      const date = localDate(d.start, tz);
      const game = e.tag ? gameFor(games, e.tag, date, tz) : undefined;
      s.dates.push({ date, time: localTime(d.start, tz), label: game ? `vs ${game.title.split(" vs ")[1]}` : "", url: d.url, soldOut: d.soldOut });
      s.starts.push(d.start);
      if (d.start < s.first) s.first = d.start;
    }
  }

  return [...groups.values()]
    .sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) || a.first.localeCompare(b.first))
    .map((s) => ({
      key: s.key,
      title: s.title,
      description: s.description,
      image: s.image,
      category: s.category,
      dates: s.dates.map((d, i) => ({ d, start: s.starts[i] })).sort((a, b) => a.start.localeCompare(b.start)).map((x) => x.d),
    }));
}

export const SERIES_CATEGORIES = CATEGORY_ORDER;
