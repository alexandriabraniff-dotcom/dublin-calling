import Image from "next/image";
import type { ScheduleEvent, WeeklyEvent } from "@/lib/locations";
import type { Fight, Matchup } from "@/lib/espn";

type Listing = ScheduleEvent | WeeklyEvent;

const isHappyHour = (item: Listing) => /happy hour/i.test(item.title);
const isUFC = (item: Listing) => /\bUFC\b/i.test(item.title);
const isTrivia = (item: Listing) => /trivia|bingo/i.test(item.title);

const label = { fontFamily: "var(--font-label-stack)" } as const;
const script = { fontFamily: "var(--font-title-stack)" } as const;

// Happy Hour: copper ale fading to amber, with the brand deck's halftone dots
const HAPPY_HOUR_BG = {
  backgroundColor: "#8A3A14",
  backgroundImage: "radial-gradient(rgba(242,176,53,0.22) 1.2px, transparent 1.6px), linear-gradient(160deg, #6E2610 0%, #A3501A 100%)",
  backgroundSize: "9px 9px, 100% 100%",
} as const;

// Trivia: green chalkboard, like the Trivia Tuesdays poster
const CHALKBOARD_BG = {
  backgroundColor: "#1E4634",
  backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.07), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.25), transparent 55%)",
} as const;

/* One calendar listing. The whole tile is clickable and opens a short write-up; the calendar
   icon in the corner is for booking a table (OpenTable once MRG sends the links). Games show as
   the league name over team logo vs team logo, Happy Hour as a copper sign, trivia as a
   chalkboard with the light bulb, and UFC nights as card number, title belt and main event. */
// Everything a listing needs to be drawn, shared by the events-page tile and the homepage row
function describe(item: Listing) {
  const team = "team" in item ? item.team : undefined;
  const m = "matchup" in item ? item.matchup : undefined;
  const fight = "fight" in item ? item.fight : undefined;
  const happy = isHappyHour(item);
  const ufc = !happy && isUFC(item);
  const trivia = !happy && !ufc && isTrivia(item);
  const style = happy ? HAPPY_HOUR_BG : trivia ? CHALKBOARD_BG : ufc ? UFC_BG : team?.color ? { backgroundColor: team.color } : undefined;
  const teamTile = !happy && !ufc && !trivia && !!team?.color;
  const info = "info" in item ? item.info : "about" in item ? item.about : undefined;
  const text =
    info ??
    (m || ("bigScreen" in item && item.bigScreen)
      ? "On the big screens with the sound on. Grab your crew and a table and catch every play."
      : happy
        ? "Drink and food specials to kick off the night. See the Happy Hour menu for what's on."
        : ufc
          ? "Every fight on the big screens with the sound on. Get here early for a good seat."
          : "Grab your crew and a table. See you there!");
  return { team, m, fight, happy, ufc, trivia, style, teamTile, text };
}

export default function EventTile({ item, bookHref }: { item: Listing; bookHref: string }) {
  const { team, m, fight, happy, ufc, trivia, style, teamTile, text } = describe(item);

  return (
    <li className={`relative overflow-hidden ${ufc ? "border-2 border-[#C8102E]" : ""} ${style ? "" : "bg-white/[0.07]"}`} style={style}>
      {trivia && <ChalkBubbles />}
      {teamTile && <TeamTexture color={team!.color!} logo={watermark(m)} />}
      <details className="group relative">
        <summary className="font-text list-none cursor-pointer block p-3 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F2B035] [&::-webkit-details-marker]:hidden">
          <p className="font-text text-white/85 text-xs uppercase tracking-[0.04em] pr-8 min-h-4">{item.time ?? ""}</p>
          <div className="mt-2">
            {happy ? (
              <HappyHour />
            ) : ufc ? (
              <FaceOff fight={fight} title={item.title} />
            ) : trivia ? (
              <Trivia title={item.title} />
            ) : m ? (
              <MatchupLogos m={m} />
            ) : (
              <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
            )}
          </div>
        </summary>
        <p className="relative px-3 pb-3 text-white/90 text-xs leading-relaxed">
          {m && <span className="block font-semibold mb-1">{`${m.away.name} vs ${m.home.name}`}</span>}
          {fight && <span className="block font-semibold mb-1">{`Main event: ${fight.a.fullName} vs ${fight.b.fullName}`}</span>}
          {text}
        </p>
      </details>
      <a
        href={bookHref}
        {...(bookHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={`Book a table for ${item.title}`}
        className="absolute top-1 right-1 w-9 h-9 flex items-center justify-center text-white hover:text-[#F2B035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B035]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      </a>
    </li>
  );
}

function Drawing({ name, className }: { name: string; className: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/decor/${name}.webp`} alt="" aria-hidden="true" className={className} />;
}

/* ── Happy Hour: script "Happy Hour" sign on the left, the mug + clock drawing on the right ── */
function HappyHour() {
  return (
    <div className="flex items-center gap-1">
      <p
        className="shrink-0 text-[#F4EFE6] leading-[0.92] -rotate-[4deg]"
        style={{ ...script, fontSize: "1.45rem", textShadow: "2px 2px 0 #3A1406" }}
      >
        Happy
        <br />
        <span className="text-[#F2B035]">Hour</span>
      </p>
      <Drawing name="happy-hour" className="flex-1 min-w-0 w-full h-auto max-h-28 object-contain object-right -mr-1" />
    </div>
  );
}

/* ── Trivia: chalkboard with doodled speech bubbles and the light bulb ── */
function ChalkBubbles() {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 140" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full text-white/[0.16] pointer-events-none">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 18c0-6 6-10 14-10s14 4 14 10-6 10-14 10c-3 0-5 0-7-1l-6 4 2-6c-2-2-3-4-3-7z" />
        <path d="M118 8h30a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-18l-7 6v-6h-5a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6z" />
        <path d="M14 112c0-7 7-12 16-12s16 5 16 12-7 12-16 12c-2 0-4 0-6-1l-8 5 3-7c-3-2-5-5-5-9z" />
        <path d="M126 104c0-6 5-10 12-10s12 4 12 10-5 10-12 10l-2 0-5 4 1-5c-4-2-6-5-6-9z" />
      </g>
      <g fill="currentColor" style={{ fontFamily: "var(--font-label-stack)" }} fontSize="11" textAnchor="middle">
        <text x="22" y="22">?</text>
        <text x="135" y="25">!?</text>
        <text x="30" y="116">?</text>
      </g>
    </svg>
  );
}

function Trivia({ title }: { title: string }) {
  const word = /trivia/i.test(title) ? "Trivia" : "Bingo";
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[#F4EFE6] uppercase leading-none" style={{ ...label, fontWeight: 700, fontSize: "1.5rem", letterSpacing: "0.02em" }}>
          {word}
        </p>
        <Drawing name="lightbulb" className="h-20 w-auto shrink-0 rotate-[10deg] -mr-1" />
      </div>
      <p className="mt-1 text-[#F2B035] text-xs font-semibold leading-snug">{title}</p>
    </div>
  );
}

/* ── UFC: card number, the approved title belt, then the main event "Name vs Name" ── */
// Textured black: fine grain (SVG noise) over a soft spotlight, framed by the red border on the tile
const UFC_BG = {
  backgroundColor: "#0d0d0d",
  backgroundImage: [
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
    "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.07), transparent 65%)",
  ].join(", "),
} as const;

function FaceOff({ fight, title }: { fight?: Fight; title: string }) {
  return (
    <div className="relative text-center">
      <p className="text-[#F2B035] uppercase text-xs tracking-[0.18em]" style={{ ...label, fontWeight: 700 }}>{title}</p>
      <Drawing name="title-belt" className="block -mx-3 mt-1 w-[calc(100%+1.5rem)] max-w-none h-auto max-h-32 object-contain" />
      {fight && (
        <p className="mt-1 text-white uppercase leading-tight text-sm" style={{ ...label, fontWeight: 700, letterSpacing: "0.04em" }}>
          {fight.a.name} <span className="text-[#F2B035]">vs</span> {fight.b.name}
        </p>
      )}
    </div>
  );
}

/* ── Games: league name, team logo vs team logo ── */
function Logo({ src, name, size = 28 }: { src?: string; name: string; size?: number }) {
  if (!src) return <span className="text-white text-[11px] font-semibold">{name}</span>;
  return (
    <span className="shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ width: size, height: size }}>
      <Image src={src} alt="" width={size * 2} height={size * 2} className="w-[82%] h-[82%] object-contain" />
    </span>
  );
}

// League typed out (client: a league logo next to two team logos looked odd)
const LEAGUE_NAMES: Record<string, string> = { EPL: "Premier League", UCL: "Champions League" };

function MatchupLogos({ m }: { m: Matchup }) {
  const league = LEAGUE_NAMES[m.league] ?? m.league;
  return (
    <>
      <span aria-hidden="true" className="flex flex-col items-center gap-1.5">
        <span className="text-white uppercase text-xs tracking-[0.12em]" style={{ ...label, fontWeight: 700 }}>
          {league}
        </span>
        <span className="flex items-center gap-1">
          <Logo src={m.away.logo} name={m.away.name} size={46} />
          <span className="text-white text-[11px] font-semibold uppercase">vs</span>
          <Logo src={m.home.logo} name={m.home.name} size={46} />
        </span>
      </span>
      <span className="sr-only">{`${league}: ${m.away.name} vs ${m.home.name}`}</span>
    </>
  );
}

/* ── Team-colour tiles (Raptors red, Leafs blue...): texture + the league logo under the colour ── */
export type TextureStyle = "hardwood" | "halftone" | "mesh";
export const TEAM_TEXTURE: TextureStyle = "hardwood";

// What sits faintly under the team colour: the league logo, or a wordless version where the
// logo repeats the league name already typed on the tile (NBA: just the player silhouette).
const WATERMARKS: Record<string, string> = { NBA: "/decor/league/nba-silhouette.png" };
const watermark = (m?: Matchup) => (m ? (WATERMARKS[m.league] ?? m.leagueLogo) : undefined);

// logoPlace: where the league logo sits under the colour. Tiles: off the right edge. Homepage rows:
// in the gap between the league name and the team logos (client 2026-11-04).
const LOGO_PLACE = {
  tile: "-right-5 h-[135%]",
  row: "left-[14.5rem] sm:left-[17rem] -translate-x-1/2 h-[120%]", // phones: the open space right of the logos
} as const;

function TeamTexture({ color, logo, style = TEAM_TEXTURE, place = "tile" }: { color: string; logo?: string; style?: TextureStyle; place?: keyof typeof LOGO_PLACE }) {
  const pattern =
    style === "hardwood"
      ? // court planks: narrow boards with a little grain
        "repeating-linear-gradient(90deg, rgba(0,0,0,0.16) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 9px, rgba(0,0,0,0.05) 9px 15px, rgba(255,255,255,0.03) 15px 22px), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.22))"
      : style === "halftone"
        ? "radial-gradient(rgba(0,0,0,0.28) 1.3px, transparent 1.8px), linear-gradient(160deg, rgba(255,255,255,0.10), rgba(0,0,0,0.25))"
        : // jersey mesh
          "radial-gradient(circle at 3px 3px, rgba(0,0,0,0.32) 1.4px, transparent 1.9px), radial-gradient(circle at 9px 9px, rgba(0,0,0,0.32) 1.4px, transparent 1.9px), linear-gradient(160deg, rgba(255,255,255,0.10), rgba(0,0,0,0.25))";
  const size = style === "halftone" ? "8px 8px, 100% 100%" : style === "mesh" ? "12px 12px, 12px 12px, 100% 100%" : "22px 100%, 22px 100%, 100% 100%";
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" className={`absolute top-1/2 -translate-y-1/2 w-auto max-w-none grayscale opacity-90 ${LOGO_PLACE[place]}`} />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: color, opacity: 0.86 }} />
      <div className="absolute inset-0" style={{ backgroundImage: pattern, backgroundSize: size }} />
    </div>
  );
}

/* ── Homepage Lineup: the same listing as a full-width row ──
   Same backgrounds, textures, artwork and click-to-open write-up as the events-page tile, laid
   out sideways: time on the left, the artwork filling the row's height, the book-a-table icon
   on the right. Rows stay compact (about 96px) with the artwork as big as that allows. */
export function EventRow({ item, bookHref }: { item: Listing; bookHref: string }) {
  const { team, m, fight, happy, ufc, trivia, style, teamTile, text } = describe(item);
  const league = m ? (LEAGUE_NAMES[m.league] ?? m.league) : undefined;
  const big = { ...label, fontWeight: 700, letterSpacing: "0.04em" } as const;

  return (
    <li className={`relative overflow-hidden ${ufc ? "border-2 border-[#C8102E]" : ""} ${style ? "" : "bg-white/[0.07]"}`} style={style}>
      {trivia && <ChalkBubbles />}
      {teamTile && <TeamTexture color={team!.color!} logo={watermark(m)} place="row" />}
      <details className="group relative">
        <summary className="font-text list-none cursor-pointer flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-4 sm:px-6 py-3 pr-16 sm:pr-20 min-h-24 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F2B035] [&::-webkit-details-marker]:hidden">
          <p className="font-text shrink-0 sm:w-32 text-white/90 text-xs sm:text-sm uppercase tracking-[0.06em]">{item.time ?? ""}</p>
          <div className="flex-1 min-w-0 flex items-center gap-3 sm:gap-5">
            {happy ? (
              <>
                <p className="shrink-0 text-[#F4EFE6] leading-none -rotate-[3deg]" style={{ ...script, fontSize: "clamp(1.6rem, 3vw, 2.3rem)", textShadow: "2px 2px 0 #3A1406" }}>
                  Happy <span className="text-[#F2B035]">Hour</span>
                </p>
                <Drawing name="happy-hour" className="h-20 sm:h-24 w-auto max-w-[45%] object-contain -my-2" />
              </>
            ) : ufc ? (
              <>
                <p className="shrink-0 text-[#F2B035] uppercase text-sm sm:text-base tracking-[0.16em]" style={big}>{item.title}</p>
                <Drawing name="title-belt" className="h-16 sm:h-20 w-auto max-w-[40%] object-contain -my-2" />
                {fight && (
                  <p className="min-w-0 text-white uppercase text-base sm:text-xl" style={big}>
                    {fight.a.name} <span className="text-[#F2B035]">vs</span> {fight.b.name}
                  </p>
                )}
              </>
            ) : trivia ? (
              <>
                <p className="shrink-0 text-[#F4EFE6] uppercase leading-none" style={{ ...big, fontSize: "clamp(1.6rem, 3vw, 2.3rem)" }}>
                  {/trivia/i.test(item.title) ? "Trivia" : "Bingo"}
                </p>
                <p className="min-w-0 text-[#F2B035] text-sm font-semibold leading-snug">{item.title}</p>
                <Drawing name="lightbulb" className="h-20 sm:h-24 w-auto shrink-0 rotate-[10deg] -my-2 ml-auto" />
              </>
            ) : m ? (
              <>
                <span className="shrink-0 text-white uppercase text-xs sm:text-sm tracking-[0.12em] sm:w-36" style={big}>{league}</span>
                <span aria-hidden="true" className="flex items-center gap-2 shrink-0">
                  <Logo src={m.away.logo} name={m.away.name} size={52} />
                  <span className="text-white text-xs font-semibold uppercase">vs</span>
                  <Logo src={m.home.logo} name={m.home.name} size={52} />
                </span>
                <span className="hidden sm:block min-w-0 text-white uppercase text-base md:text-lg truncate" style={big}>
                  {m.away.name} <span className="text-white/70">vs</span> {m.home.name}
                </span>
                <span className="sr-only sm:hidden">{`${league}: ${m.away.name} vs ${m.home.name}`}</span>
              </>
            ) : (
              <p className="text-white uppercase text-base sm:text-lg" style={big}>{item.title}</p>
            )}
          </div>
        </summary>
        <p className="relative px-4 sm:px-6 sm:pl-[12.5rem] pb-4 pr-16 text-white/90 text-sm leading-relaxed max-w-4xl">
          {fight && <span className="block font-semibold mb-1">{`Main event: ${fight.a.fullName} vs ${fight.b.fullName}`}</span>}
          {text}
        </p>
      </details>
      <a
        href={bookHref}
        {...(bookHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={`Book a table for ${item.title}`}
        className="absolute top-6 right-4 sm:right-5 w-11 h-11 flex items-center justify-center border-2 border-white/60 text-white hover:border-[#F2B035] hover:text-[#F2B035] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B035]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      </a>
    </li>
  );
}
