import { unstable_cache } from "next/cache";

/* Full-season team schedules from ESPN's public JSON (no key). Unofficial, so every
   failure returns [] and the page carries on with Admit One and the weekly listings. */

export interface Team {
  key: string; // our tag, also matched against Admit One event group tags
  league: string; // short label shown in titles, e.g. "NHL"
  name: string; // how the team reads in titles, e.g. "Leafs"
  path: string; // ESPN sport/league/team path, e.g. "hockey/nhl/teams/tor"
}

export interface Game {
  team: string; // Team.key
  start: string; // ISO datetime (UTC)
  title: string; // "NHL: Leafs vs Canucks"
}

interface RawCompetitor {
  homeAway?: string;
  team?: { abbreviation?: string; shortDisplayName?: string };
}

interface RawEvent {
  date?: string;
  timeValid?: boolean;
  competitions?: { competitors?: RawCompetitor[] }[];
}

async function fetchTeamGames(team: Team): Promise<Game[]> {
  try {
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${team.path}/schedule`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = (await res.json()) as { events?: RawEvent[] };
    const abbr = team.path.split("/").pop()!.toUpperCase();
    const out: Game[] = [];
    for (const e of json.events ?? []) {
      if (!e.date || e.timeValid === false) continue;
      const comps = e.competitions?.[0]?.competitors ?? [];
      const opp = comps.find((c) => c.team?.abbreviation?.toUpperCase() !== abbr);
      if (!opp?.team?.shortDisplayName) continue;
      out.push({ team: team.key, start: e.date, title: `${team.league}: ${team.name} vs ${opp.team.shortDisplayName}` });
    }
    return out;
  } catch {
    return [];
  }
}

async function fetchGames(teams: Team[]): Promise<Game[]> {
  const lists = await Promise.all(teams.map(fetchTeamGames));
  return lists.flat();
}

// Schedules change rarely; refresh every 6 hours
export const getGames = unstable_cache(fetchGames, ["espn-games"], { revalidate: 21600 });
