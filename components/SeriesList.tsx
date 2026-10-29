"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { Series, SeriesDate } from "@/lib/schedule";
import TeamIcon from "@/components/TeamIcon";

// Round logo for each filter (team and league logos from ESPN, Dublin Calling art otherwise)
const espn = (path: string) => `https://a.espncdn.com/i/teamlogos/${path}.png`;
const FILTER_ICONS: Record<string, string> = {
  All: "/logo.png",
  Canucks: espn("nhl/500/van"),
  Leafs: espn("nhl/500/tor"),
  Raptors: espn("nba/500/tor"),
  "Blue Jays": espn("mlb/500/tor"),
  NFL: espn("leagues/500/nfl"),
  UFC: espn("leagues/500/ufc"),
  "Games & Trivia": "/decor/eight-ball.webp",
  Parties: "/decor/beers.webp",
};

// Admit One links open in a new tab; the fallback booking page stays on the site
const external = (url: string) => (/^https?:/.test(url) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {});
const newTab = (url: string) => (/^https?:/.test(url) ? " (opens Admit One in a new tab)" : "");

const fmtDay = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });

/* Events page: a filter bar (like the Real Sports team filter), then one card per series.
   Each card leads with the next date and one Book Your Spot button; every other date sits in
   a collapsible list grouped by month, instead of a wall of date buttons. */
export default function SeriesList({ series, categories }: { series: Series[]; categories: string[] }) {
  const present = categories.filter((c) => series.some((s) => s.category === c));
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? series : series.filter((s) => s.category === filter);

  return (
    <div className="max-w-5xl mx-auto">
      <div role="group" aria-label="Filter events" className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-4 mb-10">
        {["All", ...present].map((c) => {
          const on = c === filter;
          const icon = FILTER_ICONS[c];
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c)}
              className="group flex flex-col items-center gap-2 w-[76px] focus-visible:outline-none"
            >
              <span
                className={`w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden ring-offset-2 ring-offset-[#101010] transition-shadow group-focus-visible:ring-4 group-focus-visible:ring-[#F2B035] ${
                  on ? "ring-4 ring-[#F2B035]" : "ring-2 ring-white/30 group-hover:ring-[#F2B035]/70"
                }`}
              >
                {icon && <Image src={icon} alt="" width={64} height={64} className="w-[72%] h-[72%] object-contain" />}
              </span>
              <span className={`text-[11px] uppercase tracking-[0.1em] text-center leading-tight ${on ? "text-[#F2B035]" : "text-[#F4EFE6]/85"}`}>{c}</span>
            </button>
          );
        })}
      </div>

      <ul className="flex flex-col gap-5">
        {shown.map((s) => (
          <li key={s.key}>
            <SeriesCard series={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SeriesCard({ series: s }: { series: Series }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const next = s.dates[0];
  const rest = s.dates.length - 1;

  // Group the remaining dates by month for the All dates list
  const months: { label: string; dates: SeriesDate[] }[] = [];
  for (const d of s.dates) {
    const label = fmtDay(d.date, { month: "long", year: "numeric" });
    const m = months.at(-1);
    if (m && m.label === label) m.dates.push(d);
    else months.push({ label, dates: [d] });
  }

  return (
    <article className="border border-white/10 bg-[#0a0a0a] grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
      {/* Whole artwork, never cropped: letterboxed on the dark panel */}
      <div className="relative aspect-video md:self-start bg-[#101010]">
        {s.image ? (
          <Image src={s.image} alt="" fill sizes="(min-width: 768px) 320px, 100vw" className="object-contain" />
        ) : s.logo ? (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: s.color }}>
            <TeamIcon logo={s.logo} name="" size={110} />
          </div>
        ) : null}
      </div>

      <div className="p-5 md:p-6 flex flex-col gap-3">
        <p className="text-[#F2B035] text-[11px] uppercase tracking-[0.25em]">{s.category}</p>
        <h2
          className="text-[#F4EFE6] leading-tight"
          style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "clamp(1.3rem, 2vw, 1.6rem)", letterSpacing: "0.02em" }}
        >
          {s.title}
        </h2>
        {s.description && <p className="text-[#F4EFE6]/75 text-sm leading-relaxed line-clamp-2">{s.description}</p>}

        <div className="border-t border-white/15 pt-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.2em] mb-1">{rest > 0 ? "Next date" : "Date"}</p>
            <p className="font-text text-[#F4EFE6] font-semibold">
              {fmtDay(next.date, { weekday: "short", month: "short", day: "numeric" })} · {next.time}
              {next.label && <span className="text-[#F4EFE6]/80 font-normal"> · {next.label}</span>}
            </p>
          </div>
          {next.soldOut ? (
            <span className="min-h-11 inline-flex items-center justify-center px-6 border-2 border-white/30 text-[#F4EFE6]/80 text-xs uppercase tracking-[0.15em]">Sold Out</span>
          ) : (
            <a
              href={next.url}
              {...external(next.url)}
              className="btn min-h-11 inline-flex items-center justify-center px-6 bg-[#F2B035] text-[#101010] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#e0a020] transition-colors"
            >
              Book Your Spot<span className="sr-only">: {s.title}, {fmtDay(next.date, { month: "long", day: "numeric" })}{newTab(next.url)}</span>
            </a>
          )}
        </div>

        {rest > 0 && (
          <div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(!open)}
              className="min-h-11 inline-flex items-center gap-2 text-[#F2B035] text-xs font-semibold uppercase tracking-[0.15em] hover:text-[#F4EFE6] transition-colors"
            >
              {open ? "Hide dates" : `All dates (${s.dates.length})`}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div id={panelId} hidden={!open} className="mt-2 max-h-80 overflow-y-auto border border-white/15" tabIndex={open ? 0 : -1} aria-label={`All dates for ${s.title}`} role="region">
              {months.map((m) => (
                <div key={m.label}>
                  <p className="sticky top-0 bg-[#0F5132] text-[#F4EFE6] text-[11px] uppercase tracking-[0.2em] px-4 py-2">{m.label}</p>
                  <ul>
                    {m.dates.map((d) => (
                      <li key={d.url + d.date} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/10 last:border-b-0">
                        <span className="font-text flex-1 text-sm text-[#F4EFE6]">
                          {fmtDay(d.date, { weekday: "short", month: "short", day: "numeric" })} · {d.time}
                          {d.label && <span className="text-[#F4EFE6]/75"> · {d.label}</span>}
                        </span>
                        {d.soldOut ? (
                          <span className="text-[#F4EFE6]/75 text-xs uppercase tracking-[0.12em]">Sold out</span>
                        ) : (
                          <a
                            href={d.url}
                            {...external(d.url)}
                            className="min-h-11 min-w-11 inline-flex items-center justify-end text-[#F2B035] text-xs font-semibold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-[#F4EFE6]"
                          >
                            Book<span className="sr-only"> {fmtDay(d.date, { month: "long", day: "numeric" })}{newTab(d.url)}</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
