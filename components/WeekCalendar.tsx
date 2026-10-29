"use client";

import { useState } from "react";
import { addDays, calendarLink, fmt } from "@/lib/dates";
import { listingsOn, type ScheduleEvent, type WeeklyEvent } from "@/lib/locations";
import TeamIcon from "@/components/TeamIcon";

/* Homepage "Lineup": seven date tiles from today, then the chosen day's listings, each with
   a Book Your Spot button and an add-to-calendar link. Team nights get the team's round logo
   and sit in the team colour; everything else shares one plain style. */
export default function WeekCalendar({
  schedule,
  weekly = [],
  today,
  bookHref,
  address,
}: {
  schedule: ScheduleEvent[];
  weekly?: WeeklyEvent[];
  today: string;
  bookHref: string; // fallback for listings without their own Admit One link
  address: string;
}) {
  const [selected, setSelected] = useState(today);
  const start = today;

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return { date, isToday: date === today, count: listingsOn(schedule, weekly, date).length };
  });
  const items = listingsOn(schedule, weekly, selected);
  const heading = "Sports at Dublin Calling";
  const dayLabel =
    selected === today ? "Tonight at Dublin Calling" : fmt(selected, { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8 flex flex-col items-center gap-5 text-center">
        <h2
          className="text-white"
          style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "0.02em" }}
        >
          {heading}
        </h2>
      </div>

      {/* Date tiles */}
      <div role="group" aria-label="Choose a day" className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {week.map((day) => {
          const on = day.date === selected;
          const events = day.count === 0 ? "no events" : `${day.count} event${day.count === 1 ? "" : "s"}`;
          return (
            <button
              key={day.date}
              type="button"
              onClick={() => setSelected(day.date)}
              aria-pressed={on}
              aria-label={`${fmt(day.date, { weekday: "long", month: "long", day: "numeric" })}${day.isToday ? ", today" : ""}, ${events}`}
              className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-3 sm:py-5 border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B035] ${
                on ? "bg-[#F2B035] border-[#F2B035] text-[#101010]" : "border-white/25 text-white hover:border-[#F2B035]"
              }`}
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em]">
                {day.isToday ? "Today" : fmt(day.date, { weekday: "short" })}
              </span>
              <span
                className="leading-none"
                style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "clamp(1.25rem, 3.4vw, 2.6rem)" }}
              >
                {fmt(day.date, { day: "2-digit" })}
              </span>
              <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${day.count ? (on ? "bg-[#101010]" : "bg-[#F2B035]") : "bg-transparent"}`} />
            </button>
          );
        })}
      </div>

      {/* Listings for the chosen day */}
      <div className="mt-8" aria-live="polite">
        <p className="flex items-center gap-3 text-white/80 text-[11px] uppercase tracking-[0.25em] mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="4" width="20" height="14" rx="2" /><polyline points="8 22 12 18 16 22" />
          </svg>
          {dayLabel}
        </p>
        {items.length === 0 ? (
          <p className="border-2 border-white/15 px-5 py-6 text-white/80 text-sm italic">No events currently</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((item) => {
              const team = "team" in item ? item.team : undefined;
              return (
                <li
                  key={item.title + (item.time ?? "")}
                  className={`flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 border-2 ${team?.color ? "border-white/25" : "border-white/15 bg-[#101010]/30"}`}
                  style={team?.color ? { backgroundColor: team.color } : undefined}
                >
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    {team && <TeamIcon logo={team.logo} name={team.name} />}
                    <div className="min-w-0">
                      <p className={`font-text flex flex-wrap items-center gap-x-3 text-xs uppercase tracking-[0.08em] mb-1 ${team?.color ? "text-white" : "text-[#F2B035]"}`}>
                        {item.time && <span>{item.time}</span>}
                        {"bigScreen" in item && item.bigScreen && <span className="text-white/85">On the big screen</span>}
                      </p>
                      <p
                        className="text-white uppercase"
                        style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "clamp(1rem, 1.6vw, 1.25rem)", letterSpacing: "0.04em" }}
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={item.url ?? bookHref}
                      {...(item.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="btn flex-1 sm:flex-none min-h-11 inline-flex items-center justify-center px-6 bg-[#F2B035] text-[#101010] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#e0a020] transition-colors"
                    >
                      Book Your Spot<span className="sr-only">: {item.title}{item.url ? " (opens Admit One in a new tab)" : ""}</span>
                    </a>
                    <a
                      href={calendarLink(selected, item.title, item.time, address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Add ${item.title} to Google Calendar (opens in a new tab)`}
                      className="w-11 h-11 shrink-0 flex items-center justify-center border-2 border-white/60 text-white hover:border-[#F2B035] hover:text-[#F2B035] transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="12" y1="14" x2="12" y2="18" /><line x1="10" y1="16" x2="14" y2="16" />
                      </svg>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
