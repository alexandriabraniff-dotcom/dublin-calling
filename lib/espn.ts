import { unstable_cache } from "next/cache";

/* Game schedules from ESPN's public JSON (no key). Unofficial, so every failure returns []
   and the page carries on with Admit One and the weekly listings.
   Two kinds of feed: a followed team's whole season (Leafs, Raptors...) and league-wide
   scoreboards filtered to the games a sports bar puts on (big Premier League clubs, NFL
   prime time), which is what MRG used to type into the old site by hand each week. */

export interface Team {
  key: string; // our tag, also matched against Admit One event group tags
  league: string; // short label shown in titles, e.g. "NHL"
  name: string; // how the team reads in titles, e.g. "Leafs"
  path: string; // ESPN sport/league/team path, e.g. "hockey/nhl/teams/tor"
  logo: string; // round icon in the Lineup and calendar
  color: string; // team colour for featured listings
}

export interface League {
  key: string;
  label: string; // title prefix, e.g. "EPL"
  path: string; // ESPN sport/league path, e.g. "soccer/eng.1"
  logo: string;
  clubs?: string[]; // keep games involving one of these clubs (matched on the ESPN display name)
  primetime?: boolean; // keep games starting 7 PM Eastern or later (NFL Thursday / Sunday / Monday nights)
}

export interface Game {
  id: string; // ESPN event id, used to drop duplicates (Leafs at Canucks is in both teams' feeds)
  team: string; // Team.key or League.key
  start: string; // ISO datetime (UTC)
  title: string; // "NHL: Leafs vs Canucks"
  logo: string;
  color?: string; // followed teams only: their nights are shown in the team colour
}

interface RawCompetitor {
  homeAway?: string;
  team?: { abbreviation?: string; shortDisplayName?: string; displayName?: string };
}

interface RawEvent {
  id?: string;
  date?: string;
  timeValid?: boolean;
  competitions?: { competitors?: RawCompetitor[] }[];
}

const API = "https://site.api.espn.com/apis/site/v2/sports";

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

async function fetchTeamGames(team: Team): Promise<Game[]> {
  const json = await getJson<{ events?: RawEvent[] }>(`${API}/${team.path}/schedule`);
  const abbr = team.path.split("/").pop()!.toUpperCase();
  const out: Game[] = [];
  for (const e of json?.events ?? []) {
    if (!e.id || !e.date || e.timeValid === false) continue;
    const opp = (e.competitions?.[0]?.competitors ?? []).find((c) => c.team?.abbreviation?.toUpperCase() !== abbr);
    if (!opp?.team?.shortDisplayName) continue;
    out.push({ id: e.id, team: team.key, start: e.date, title: `${team.league}: ${team.name} vs ${opp.team.shortDisplayName}`, logo: team.logo, color: team.color });
  }
  return out;
}

const easternHour = (iso: string) =>
  +new Intl.DateTimeFormat("en-US", { timeZone: "America/Toronto", hour: "numeric", hourCycle: "h23" }).format(new Date(iso));

const yyyymmdd = (t: number) => new Date(t).toISOString().slice(0, 10).replaceAll("-", "");

// League scoreboards, one call per day for the next two weeks
async function fetchLeagueGames(league: League): Promise<Game[]> {
  const days = Array.from({ length: 14 }, (_, i) => yyyymmdd(Date.now() + i * 86400000));
  const boards = await Promise.all(days.map((d) => getJson<{ events?: RawEvent[] }>(`${API}/${league.path}/scoreboard?dates=${d}`)));
  const out: Game[] = [];
  for (const e of boards.flatMap((b) => b?.events ?? [])) {
    if (!e.id || !e.date || e.timeValid === false) continue;
    const comps = e.competitions?.[0]?.competitors ?? [];
    const away = comps.find((c) => c.homeAway === "away")?.team;
    const home = comps.find((c) => c.homeAway === "home")?.team;
    if (!away?.shortDisplayName || !home?.shortDisplayName) continue;
    const names = [away.displayName ?? "", home.displayName ?? ""];
    const bigClub = league.clubs?.some((c) => names.some((n) => n.includes(c)));
    const prime = league.primetime && easternHour(e.date) >= 19;
    if (!bigClub && !prime) continue;
    out.push({ id: e.id, team: league.key, start: e.date, title: `${league.label}: ${away.shortDisplayName} vs ${home.shortDisplayName}`, logo: league.logo });
  }
  return out;
}

async function fetchGames(teams: Team[], leagues: League[]): Promise<Game[]> {
  const lists = await Promise.all([...teams.map(fetchTeamGames), ...leagues.map(fetchLeagueGames)]);
  // Same game in two feeds (a followed team's schedule and a league board): keep the first
  const seen = new Set<string>();
  return lists.flat().filter((g) => (seen.has(g.id) ? false : (seen.add(g.id), true)));
}

// Schedules change rarely; refresh every 6 hours
export const getGames = unstable_cache(fetchGames, ["espn-games-v2"], { revalidate: 21600 });

const BIG_ENGLISH = ["Arsenal", "Chelsea", "Liverpool", "Manchester City", "Manchester United", "Tottenham", "Newcastle", "Aston Villa"];

// The same games are on at every location (times shown in each venue's own timezone)
export const LEAGUES: League[] = [
  { key: "nfl", label: "NFL", path: "football/nfl", logo: "https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png", primetime: true },
  { key: "epl", label: "EPL", path: "soccer/eng.1", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png", clubs: BIG_ENGLISH },
  {
    key: "ucl",
    label: "UCL",
    path: "soccer/uefa.champions",
    logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png",
    clubs: [...BIG_ENGLISH, "Real Madrid", "Barcelona", "Bayern", "Atlético", "Paris Saint-Germain", "Internazionale", "AC Milan", "Juventus", "Dortmund"],
  },
];
