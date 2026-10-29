import { getAdmitOneEvents, type AdmitOneEvent } from "@/lib/admitone";
import { getGames, LEAGUES, type Game } from "@/lib/espn";
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
  logo?: string; // team series without a poster: shown as the team logo on the team colour
  color?: string;
  category: string; // filter chip on the events page
  dates: SeriesDate[]; // upcoming only, soonest first
}

// Display names for Admit One series tags (their own titles only name the first opponent)
const SERIES_TITLES: Record<string, string> = {
  leafs: "Leafs Nights at Dublin Calling",
  raptors: "Raptors Always On",
  mlb: "Blue Jays & MLB at Dublin Calling",
};

const CATEGORY_ORDER = ["Canucks", "Leafs", "Raptors", "Blue Jays", "NFL", "UFC", "Games & Trivia", "Parties"];

// Filter category for each followed team's own series (locations without an Admit One feed)
const TEAM_CATEGORY: Record<string, string> = { canucks: "Canucks", leafs: "Leafs", raptors: "Raptors", mlb: "Blue Jays", bills: "NFL" };

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
    getGames(loc.teams, LEAGUES),
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

const teamInfo = (loc: Location, key: string) => {
  const t = loc.teams.find((x) => x.key === key);
  return t ? { name: t.name, logo: t.logo, color: t.color } : undefined;
};

const shorten = (text: string, max = 220) => (text.length > max ? text.slice(0, text.lastIndexOf(" ", max)) + "..." : text);

/* Dated listings for the Lineup, the events calendar and the tonight bar, sorted by start time */
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
      rows.push({
        date,
        time: localTime(d.start, tz),
        title: game?.title ?? (e.tag === "leafs" || e.tag === "raptors" ? SERIES_TITLES[e.tag] : e.title),
        url: d.url,
        // Team styling only when that team actually plays (a World Series night tagged "mlb" isn't a Jays game)
        team: game ? { name: game.title.split(":")[0], logo: game.logo, color: game.color } : e.tag === "leafs" || e.tag === "raptors" ? teamInfo(loc, e.tag) : undefined,
        info: e.description ? shorten(e.description) : undefined,
        start: d.start,
      });
    }
  }

  for (const g of games) {
    if (used.has(g)) continue;
    const date = localDate(g.start, tz);
    // e.g. a Bills game on a night with an "NFL Season Event": book through that event
    const league = g.title.split(":")[0];
    const host = rows.find((r) => r.date === date && r.url && r.title.toUpperCase().includes(league));
    rows.push({
      date,
      time: localTime(g.start, tz),
      title: g.title,
      url: host?.url,
      bigScreen: true,
      team: { name: g.title.split(":")[0], logo: g.logo, color: g.color },
      start: g.start,
    });
  }

  rows.sort((a, b) => a.start.localeCompare(b.start));
  return rows.map((r) => ({ date: r.date, time: r.time, title: r.title, url: r.url, bigScreen: r.bigScreen, team: r.team, info: r.info }));
}

/* Series cards for the events page, with a filter category each: Admit One events grouped by
   series, or (no Admit One feed yet) the location's weekly nights plus each followed team's games */
export async function getSeries(loc: Location): Promise<Series[]> {
  const { events, games } = await load(loc);
  const tz = loc.timezone;
  if (events.length === 0) return fallbackSeries(loc, games);
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

const byCategory = (a: Series, b: Series) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);

function fallbackSeries(loc: Location, games: Game[]): Series[] {
  const tz = loc.timezone;
  const today = localDate(new Date().toISOString(), tz);
  const book = `/${loc.slug}/book-a-table`;
  const out: Series[] = [];

  // Weekly nights with a poster: the next eight weeks of dates
  for (const w of loc.weekly) {
    if (!w.image) continue;
    const dates: SeriesDate[] = [];
    for (let i = 0; i < 56; i++) {
      const d = new Date(Date.parse(today + "T12:00:00Z") + i * 86400000);
      if (!w.days.includes(d.getUTCDay())) continue;
      dates.push({ date: d.toISOString().slice(0, 10), time: w.time ?? "", label: "", url: w.url ?? book, soldOut: false });
    }
    out.push({
      key: w.title,
      title: w.title,
      description: w.about ?? "",
      image: w.image,
      category: /trivia|bingo|pool|darts/i.test(w.title) ? "Games & Trivia" : "Parties",
      dates,
    });
  }

  // Each followed team's games (a Leafs at Canucks night belongs to both teams' cards)
  const sides = (g: Game) => g.title.split(": ")[1]?.split(" vs ") ?? [];
  for (const t of loc.teams) {
    const mine = games.filter((g) => g.team === t.key || sides(g).some((n) => n.includes(t.name)));
    if (!mine.length) continue;
    out.push({
      key: t.key,
      title: `${t.name} Games at Dublin Calling`,
      description: `Every ${t.name} game live on the big screens with the sound on.`,
      logo: t.logo,
      color: t.color,
      category: TEAM_CATEGORY[t.key] ?? t.league,
      dates: mine.map((g) => ({
        date: localDate(g.start, tz),
        time: localTime(g.start, tz),
        label: `vs ${sides(g).find((n) => !n.includes(t.name)) ?? sides(g)[1]}`,
        url: book,
        soldOut: false,
      })),
    });
  }

  return out.sort(byCategory);
}
