import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocation } from "@/lib/locations";

export default async function LocationHome({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const base = `/${loc.slug}`;

  // Location-specific weekly schedule
  const weeklySchedule: Record<string, { day: string; event: string; detail: string; tag?: string; tagColor?: string }[]> = {
    adelaide: [
      { day: "Mon", event: "Trivia Night", detail: "TriviaTO — 7:00 PM", tag: "Weekly" },
      { day: "Wed", event: "UFC / Fight Night", detail: "All cards live on the big screens", tag: "Sports", tagColor: "red" },
      { day: "Thu–Fri", event: "Happy Hour", detail: "4:00 PM – 6:00 PM · Drink specials", tag: "Daily", tagColor: "green" },
      { day: "Sun", event: "Bills Backers Watch Party", detail: "Official chapter · Every game day", tag: "NFL", tagColor: "gold" },
      { day: "Every Day", event: "Happy Hour", detail: "Sun–Fri · 4:00 PM – 6:00 PM", tagColor: "green" },
    ],
    danforth: [
      { day: "Mon", event: "Pool Tournament", detail: "Sign in by 7:00 PM to compete", tag: "Weekly" },
      { day: "Tue", event: "Trivia Night", detail: "TriviaTO — 7:00 PM · Main floor", tag: "Weekly" },
      { day: "Thu", event: "UFC / Fight Night", detail: "All cards live on screen", tag: "Sports", tagColor: "red" },
      { day: "Sun", event: "Bills Backers Watch Party", detail: "Official chapter · Every game day", tag: "NFL", tagColor: "gold" },
      { day: "Every Day", event: "Happy Hour", detail: "Sun–Fri · 4:00 PM – 6:00 PM", tagColor: "green" },
    ],
    vancouver: [
      { day: "Tue", event: "Trivia Night", detail: "TriviaTO — biweekly · Main floor", tag: "Weekly" },
      { day: "Jul 11", event: "UFC 329 — McGregor vs Holloway 2", detail: "The biggest fight of the year", tag: "UFC", tagColor: "red" },
      { day: "Jul 10, 17, 31", event: "Ladies Night", detail: "Tickets via AdmitOne", tag: "Ticketed", tagColor: "gold" },
      { day: "Aug 15", event: "UFC 330", detail: "Next major card — come early", tag: "UFC", tagColor: "red" },
      { day: "Every Day", event: "Happy Hour", detail: "Sun–Fri · 4:00 PM – 6:00 PM", tagColor: "green" },
    ],
  };

  const schedule = weeklySchedule[loc.slug] ?? [];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#101010] min-h-[90vh] flex flex-col justify-between py-16 sm:py-20 overflow-hidden">
        {/* Oversized background letter — pure typographic atmosphere */}
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none opacity-[0.03] text-[#F4EFE6]"
          aria-hidden="true"
          style={{
            fontFamily: "'Lobster Two', cursive",
            fontSize: "clamp(280px, 50vw, 600px)",
          }}
        >
          DC
        </div>

        {/* Age / location note */}
        {loc.ageNote && (
          <div className="absolute top-4 right-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8102E] border border-[#C8102E] px-2 py-1">
              {loc.ageNote}
            </span>
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col flex-1 justify-center gap-10">
          {/* Eyebrow */}
          <p className="text-[#F2B035] text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em]">
            {loc.city} &nbsp;·&nbsp; {loc.name} &nbsp;·&nbsp; Party Pub &amp; Kitchen
          </p>

          {/* Main heading */}
          <div>
            <h1
              className="text-[#F4EFE6] leading-[0.92] mb-6"
              style={{
                fontFamily: "'Lobster Two', cursive",
                fontSize: "clamp(4rem, 14vw, 12rem)",
              }}
            >
              {loc.name === "Vancouver" ? (
                <>
                  Open<br />
                  <span className="text-[#169B62]">Until 3AM</span>
                </>
              ) : loc.name === "Danforth" ? (
                <>
                  East<br />
                  <span className="text-[#169B62]">Toronto&apos;s</span><br />
                  Pub
                </>
              ) : (
                <>
                  Downtown<br />
                  <span className="text-[#169B62]">Toronto&apos;s</span><br />
                  Party Pub
                </>
              )}
            </h1>
            <p className="text-[#F4EFE6]/50 text-base sm:text-lg max-w-md font-light">
              {loc.heroTagline}
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3">
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F2B035] text-[#101010] text-xs font-bold uppercase tracking-widest hover:bg-[#e0a020] transition-colors"
            >
              Book a Table
            </a>
            <Link
              href={`${base}/events`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#F4EFE6]/20 text-[#F4EFE6]/70 text-xs font-bold uppercase tracking-widest hover:border-[#F4EFE6]/50 hover:text-[#F4EFE6] transition-colors"
            >
              See Events
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#F4EFE6]/20 text-[#F4EFE6]/70 text-xs font-bold uppercase tracking-widest hover:border-[#F4EFE6]/50 hover:text-[#F4EFE6] transition-colors"
            >
              View Menu
            </Link>
          </div>
        </div>

        {/* Stats anchored to bottom */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full mt-16">
          <div className="border-t border-white/10 pt-8 grid grid-cols-3 gap-8">
            {loc.stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-[#F4EFE6] leading-none mb-1"
                  style={{
                    fontFamily: "'Lobster Two', cursive",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-[#F4EFE6]/40 text-[10px] sm:text-xs uppercase tracking-widest font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THIS WEEK ── */}
      <section className="bg-[#0F5132] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[#F2B035] text-[10px] font-bold uppercase tracking-[0.35em] mb-3">
                {loc.name} Schedule
              </p>
              <h2
                className="text-[#F4EFE6] leading-none"
                style={{
                  fontFamily: "'Lobster Two', cursive",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                }}
              >
                This Week
              </h2>
            </div>
            <Link
              href={`${base}/events`}
              className="text-[#F4EFE6]/40 text-xs font-bold uppercase tracking-widest hover:text-[#F2B035] transition-colors flex items-center gap-2 shrink-0 pb-1"
            >
              All Events
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Schedule rows — editorial table style */}
          <div className="divide-y divide-white/10">
            {schedule.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 py-5 group hover:bg-white/5 -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors"
              >
                {/* Day */}
                <div className="w-20 sm:w-28 shrink-0">
                  <p className="text-[#F4EFE6]/30 text-xs font-bold uppercase tracking-widest">
                    {item.day}
                  </p>
                </div>

                {/* Event name */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[#F4EFE6] truncate"
                    style={{
                      fontFamily: "'Lobster Two', cursive",
                      fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                    }}
                  >
                    {item.event}
                  </p>
                  <p className="text-[#F4EFE6]/40 text-xs mt-0.5">{item.detail}</p>
                </div>

                {/* Tag */}
                {item.tag && (
                  <div className="shrink-0">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 ${
                        item.tagColor === "red"
                          ? "bg-[#C8102E] text-white"
                          : item.tagColor === "gold"
                            ? "bg-[#F2B035] text-[#101010]"
                            : item.tagColor === "green"
                              ? "border border-[#169B62] text-[#169B62]"
                              : "border border-white/20 text-[#F4EFE6]/50"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU + BOOK — split section ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2">
        {/* Menu */}
        <Link
          href={`${base}/menu`}
          className="group bg-[#101010] border-r border-white/5 px-10 sm:px-16 py-20 flex flex-col justify-between gap-10 hover:bg-[#0a0a0a] transition-colors"
        >
          <div>
            <p className="text-[#F2B035] text-[10px] font-bold uppercase tracking-[0.35em] mb-6">
              Food &amp; Drinks
            </p>
            <h2
              className="text-[#F4EFE6] leading-none"
              style={{
                fontFamily: "'Lobster Two', cursive",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
              }}
            >
              The Menu
            </h2>
            <p className="text-[#F4EFE6]/40 text-sm mt-4 max-w-xs">
              Pub classics, sharables, mains, and a drinks list built for long
              nights.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#F2B035] text-xs font-bold uppercase tracking-widest">
            View Menu
            <svg
              className="group-hover:translate-x-1 transition-transform"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </Link>

        {/* Book */}
        <a
          href={loc.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#0F5132] px-10 sm:px-16 py-20 flex flex-col justify-between gap-10 hover:bg-[#169B62]/20 transition-colors"
        >
          <div>
            <p className="text-[#F2B035] text-[10px] font-bold uppercase tracking-[0.35em] mb-6">
              Private Events
            </p>
            <h2
              className="text-[#F4EFE6] leading-none"
              style={{
                fontFamily: "'Lobster Two', cursive",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
              }}
            >
              Book Your Table
            </h2>
            <p className="text-[#F4EFE6]/40 text-sm mt-4 max-w-xs">
              Groups of any size. Online booking for up to 20. Larger parties,
              contact us directly.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#F2B035] text-xs font-bold uppercase tracking-widest">
            Reserve Now
            <svg
              className="group-hover:translate-x-1 transition-transform"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </a>
      </section>

      {/* ── SPORTS ── */}
      <section className="bg-[#101010] border-t border-white/5 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#F2B035] text-[10px] font-bold uppercase tracking-[0.35em] mb-6">
            Live on Screen
          </p>
          <h2
            className="text-[#F4EFE6] leading-none mb-10"
            style={{
              fontFamily: "'Lobster Two', cursive",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
            }}
          >
            Every Game.<br />
            <span className="text-[#169B62]">Every Screen.</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {[
              "NFL", "CFL", "MLB", "NBA", "NHL",
              "UFC / MMA", "Premier League", "Champions League",
              "MLS", "Rugby", "Tennis", "Golf",
            ].map((sport) => (
              <span
                key={sport}
                className="border border-white/10 text-[#F4EFE6]/50 text-xs font-semibold uppercase tracking-widest px-4 py-2 hover:border-[#169B62] hover:text-[#169B62] transition-colors cursor-default"
              >
                {sport}
              </span>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p
                className="text-[#F4EFE6] mb-1"
                style={{
                  fontFamily: "'Lobster Two', cursive",
                  fontSize: "3rem",
                }}
              >
                {loc.stats[0].value}
              </p>
              <p className="text-[#F4EFE6]/30 text-xs uppercase tracking-widest">{loc.stats[0].label}</p>
            </div>
            {loc.slug === "vancouver" && (
              <div>
                <p
                  className="text-[#F4EFE6] mb-1"
                  style={{
                    fontFamily: "'Lobster Two', cursive",
                    fontSize: "3rem",
                  }}
                >
                  12+
                </p>
                <p className="text-[#F4EFE6]/30 text-xs uppercase tracking-widest">Beers on Tap</p>
              </div>
            )}
            <div>
              <p
                className="text-[#F2B035] mb-1"
                style={{
                  fontFamily: "'Lobster Two', cursive",
                  fontSize: "3rem",
                }}
              >
                4–6PM
              </p>
              <p className="text-[#F4EFE6]/30 text-xs uppercase tracking-widest">Happy Hour · Sun–Fri</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION INFO ── */}
      <section className="bg-[#0F5132] border-t border-white/5 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#F2B035] text-[10px] font-bold uppercase tracking-[0.35em] mb-10">
            Find Us
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16">
            {/* Address */}
            <div>
              <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.25em] mb-3">Address</p>
              <address className="not-italic">
                <p className="text-[#F4EFE6] text-base font-medium leading-relaxed">
                  {loc.address}
                </p>
              </address>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-[#169B62] text-xs font-bold uppercase tracking-widest hover:text-[#F2B035] transition-colors"
              >
                Directions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* Hours */}
            <div>
              <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.25em] mb-3">Hours</p>
              <ul className="space-y-2">
                {loc.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 text-sm">
                    <span className="text-[#F4EFE6]/50">{h.days}</span>
                    <span className="text-[#F4EFE6] font-medium tabular-nums">{h.time}</span>
                  </li>
                ))}
              </ul>
              {loc.ageNote && (
                <p className="mt-3 text-[#C8102E] text-xs font-semibold">* {loc.ageNote}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.25em] mb-3">Contact</p>
              <div className="space-y-3">
                <p>
                  <a
                    href={`tel:${loc.phone}`}
                    className="text-[#F4EFE6] text-base font-medium hover:text-[#169B62] transition-colors"
                  >
                    {loc.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${loc.email}`}
                    className="text-[#F4EFE6]/60 text-sm hover:text-[#169B62] transition-colors break-all"
                  >
                    {loc.email}
                  </a>
                </p>
                <div className="flex gap-4 pt-2">
                  <a href={loc.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#F4EFE6]/30 hover:text-[#F4EFE6] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a href={loc.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#F4EFE6]/30 hover:text-[#F4EFE6] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
