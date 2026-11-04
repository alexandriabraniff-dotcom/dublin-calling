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
   league logo + team logo vs team logo, Happy Hour as a copper sign, trivia as a chalkboard
   with the light bulb, and UFC nights as a face-off of the main event. */
export default function EventTile({ item, bookHref }: { item: Listing; bookHref: string }) {
  const team = "team" in item ? item.team : undefined;
  const m = "matchup" in item ? item.matchup : undefined;
  const fight = "fight" in item ? item.fight : undefined;
  const happy = isHappyHour(item);
  const ufc = !happy && isUFC(item);
  const trivia = !happy && !ufc && isTrivia(item);

  const style = happy ? HAPPY_HOUR_BG : trivia ? CHALKBOARD_BG : ufc ? { backgroundColor: "#101010" } : team?.color ? { backgroundColor: team.color } : undefined;

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

  return (
    <li className={`relative overflow-hidden ${ufc ? "border-l-4 border-[#C8102E]" : ""} ${style ? "" : "bg-white/[0.07]"}`} style={style}>
      {trivia && <ChalkBubbles />}
      {ufc && <Octagon />}
      <details className="group relative">
        <summary className="font-text list-none cursor-pointer block p-3 pr-10 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F2B035] [&::-webkit-details-marker]:hidden">
          <p className="font-text text-white/85 text-xs uppercase tracking-[0.04em]">{item.time ?? ""}</p>
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" className="absolute right-3 bottom-3 text-white/70 transition-transform group-open:rotate-180">
            <polyline points="6 9 12 15 18 9" />
          </svg>
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
  return <img src={`/decor/${name}.webp`} alt="" aria-hidden="true" className={`w-auto ${className}`} />;
}

/* ── Happy Hour: clock + pint with a script "Happy Hour" sign ── */
function HappyHour() {
  return (
    <div className="flex flex-col items-center text-center">
      <Drawing name="happy-hour" className="h-12" />
      <p
        className="mt-1 text-[#F4EFE6] leading-[0.95] -rotate-[4deg]"
        style={{ ...script, fontSize: "1.65rem", textShadow: "2px 2px 0 #3A1406" }}
      >
        Happy
        <br />
        <span className="text-[#F2B035]">Hour</span>
      </p>
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
        <Drawing name="lightbulb" className="h-14 shrink-0 rotate-[10deg]" />
      </div>
      <p className="mt-1 text-[#F2B035] text-xs font-semibold leading-snug">{title}</p>
    </div>
  );
}

/* ── UFC: the main event as a face-off ── */
function Octagon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 m-auto h-[90%] w-auto text-white/[0.08] pointer-events-none">
      <polygon points="30,3 70,3 97,30 97,70 70,97 30,97 3,70 3,30" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function Headshot({ src, name }: { src?: string; name: string }) {
  return (
    <span className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden bg-[#2a2a2a] ring-2 ring-[#F2B035]">
      {src ? (
        <Image src={src} alt="" fill sizes="48px" className="object-cover object-top scale-125 translate-y-1" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">{name[0]}</span>
      )}
    </span>
  );
}

function FaceOff({ fight, title }: { fight?: Fight; title: string }) {
  if (!fight) {
    return (
      <div className="relative text-center">
        <Drawing name="title-belt" className="h-10 mx-auto" />
        <p className="mt-1 text-white uppercase tracking-[0.08em] text-sm font-bold" style={label}>{title}</p>
      </div>
    );
  }
  return (
    <div className="relative text-center">
      <p className="text-[#F2B035] uppercase text-xs tracking-[0.18em]" style={{ ...label, fontWeight: 700 }}>{title}</p>
      <div aria-hidden="true" className="mt-2 flex items-center justify-center gap-1.5">
        <Headshot src={fight.a.headshot} name={fight.a.name} />
        <span className="text-[#EF3B4F] text-sm font-bold uppercase" style={label}>vs</span>
        <Headshot src={fight.b.headshot} name={fight.b.name} />
      </div>
      <p className="mt-2 text-white uppercase leading-tight text-sm" style={{ ...label, fontWeight: 700, letterSpacing: "0.04em" }}>
        {fight.a.name} <span className="text-[#F2B035]">vs</span> {fight.b.name}
      </p>
    </div>
  );
}

/* ── Games: league logo, team logo vs team logo ── */
function Logo({ src, name, size = 28 }: { src?: string; name: string; size?: number }) {
  if (!src) return <span className="text-white text-[11px] font-semibold">{name}</span>;
  return (
    <span className="shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ width: size, height: size }}>
      <Image src={src} alt="" width={size} height={size} className="w-[80%] h-[80%] object-contain" />
    </span>
  );
}

function MatchupLogos({ m }: { m: Matchup }) {
  return (
    <>
      <span aria-hidden="true" className="flex flex-wrap items-center justify-center gap-1">
        <Logo src={m.leagueLogo} name={m.league} />
        <span className="flex items-center gap-1">
          <Logo src={m.away.logo} name={m.away.name} />
          <span className="text-white text-[11px] font-semibold uppercase">vs</span>
          <Logo src={m.home.logo} name={m.home.name} />
        </span>
      </span>
      <span className="sr-only">{`${m.league}: ${m.away.name} vs ${m.home.name}`}</span>
    </>
  );
}
