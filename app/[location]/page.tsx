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

  const weeklySchedule: Record<string, { day: string; event: string; detail: string; tag?: string; tagColor?: string }[]> = {
    adelaide: [
      { day: "Mon", event: "Trivia Night", detail: "TriviaTO — 7:00 PM", tag: "Weekly" },
      { day: "Wed", event: "UFC / Fight Night", detail: "All cards live on the big screens", tag: "UFC", tagColor: "red" },
      { day: "Sun", event: "Bills Backers Watch Party", detail: "Official chapter — every game day", tag: "NFL", tagColor: "gold" },
      { day: "Sun – Fri", event: "Happy Hour", detail: "4:00 PM – 6:00 PM · Drink specials all week", tag: "Daily", tagColor: "green" },
    ],
    danforth: [
      { day: "Mon", event: "Pool Tournament", detail: "Sign in by 7:00 PM to compete", tag: "Weekly" },
      { day: "Tue", event: "Trivia Night", detail: "TriviaTO — 7:00 PM · Main floor", tag: "Weekly" },
      { day: "Thu", event: "UFC / Fight Night", detail: "All cards live on screen", tag: "UFC", tagColor: "red" },
      { day: "Sun", event: "Bills Backers Watch Party", detail: "Official chapter — every game day", tag: "NFL", tagColor: "gold" },
      { day: "Sun – Fri", event: "Happy Hour", detail: "4:00 PM – 6:00 PM · Drink specials", tag: "Daily", tagColor: "green" },
    ],
    vancouver: [
      { day: "Tue", event: "Trivia Night", detail: "TriviaTO — biweekly · Main floor", tag: "Weekly" },
      { day: "Jul 11", event: "UFC 329 — McGregor vs Holloway 2", detail: "The biggest fight of the year", tag: "UFC", tagColor: "red" },
      { day: "Jul 10, 17, 31", event: "Ladies Night", detail: "Tickets via AdmitOne", tag: "Ticketed", tagColor: "gold" },
      { day: "Aug 15", event: "UFC 330", detail: "Next major card — come early", tag: "UFC", tagColor: "red" },
      { day: "Sun – Fri", event: "Happy Hour", detail: "4:00 PM – 6:00 PM · Tap beers and cocktails", tag: "Daily", tagColor: "green" },
    ],
  };

  const schedule = weeklySchedule[loc.slug] ?? [];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#0F5132] min-h-[88vh] flex flex-col justify-between pt-16 sm:pt-20 pb-16">
        {/* Age note */}
        {loc.ageNote && (
          <div className="absolute top-5 right-6">
            <span
              className="text-[#C8102E] border border-[#C8102E] px-2 py-1"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em" }}
            >
              {loc.ageNote.toUpperCase()}
            </span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col flex-1 justify-center gap-10">
          {/* Eyebrow */}
          <p
            className="text-[#F2B035]"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
          >
            {loc.city.toUpperCase()} &nbsp;·&nbsp; {loc.name.toUpperCase()} &nbsp;·&nbsp; PARTY PUB &amp; KITCHEN
          </p>

          {/* Main headline */}
          <div>
            <h1
              className="text-[#F4EFE6] leading-[1.0] mb-6"
              style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: "clamp(3.5rem, 13vw, 10rem)",
              }}
            >
              {loc.name === "Vancouver" ? (
                <>Open Until<br /><span className="text-[#F2B035]">3AM</span></>
              ) : loc.name === "Danforth" ? (
                <>East Toronto&apos;s<br /><span className="text-[#F2B035]">Party Pub</span></>
              ) : (
                <>Downtown<br /><span className="text-[#F2B035]">Toronto&apos;s</span><br />Party Pub</>
              )}
            </h1>
            <p className="text-[#F4EFE6]/50 text-base sm:text-lg font-light max-w-md">
              {loc.heroTagline}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3 bg-[#F2B035] text-[#101010] hover:bg-[#e0a020] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em" }}
            >
              BOOK A TABLE
            </a>
            <Link
              href={`${base}/events`}
              className="inline-flex items-center px-7 py-3 border border-[#F4EFE6]/25 text-[#F4EFE6]/70 hover:border-[#F4EFE6]/60 hover:text-[#F4EFE6] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              SEE EVENTS
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center px-7 py-3 border border-[#F4EFE6]/25 text-[#F4EFE6]/70 hover:border-[#F4EFE6]/60 hover:text-[#F4EFE6] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              VIEW MENU
            </Link>
          </div>
        </div>

        {/* Stats row — bottom of hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full mt-16 pt-8 border-t border-white/15">
          <div className="grid grid-cols-3 gap-8">
            {loc.stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-[#F2B035] leading-none mb-1"
                  style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[#F4EFE6]/40"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.2em" }}
                >
                  {stat.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THIS WEEK ── */}
      <section className="bg-[#101010] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p
                className="text-[#F2B035] mb-3"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
              >
                {loc.name.toUpperCase()} SCHEDULE
              </p>
              <h2
                className="text-[#F4EFE6] leading-none"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                This Week
              </h2>
            </div>
            <Link
              href={`${base}/events`}
              className="text-[#F4EFE6]/30 hover:text-[#F2B035] transition-colors flex items-center gap-2 pb-1"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              ALL EVENTS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className="divide-y divide-white/8">
            {schedule.map((item, i) => (
              <div key={i} className="flex items-center gap-6 py-5 -mx-4 sm:-mx-6 px-4 sm:px-6 hover:bg-white/3 transition-colors">
                {/* Day */}
                <div className="w-20 sm:w-28 shrink-0">
                  <p
                    className="text-[#F4EFE6]/30"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em" }}
                  >
                    {item.day.toUpperCase()}
                  </p>
                </div>

                {/* Event */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[#F4EFE6] truncate"
                    style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
                  >
                    {item.event}
                  </p>
                  <p className="text-[#F4EFE6]/35 text-xs mt-0.5">{item.detail}</p>
                </div>

                {/* Tag */}
                {item.tag && (
                  <div className="shrink-0">
                    <span
                      className={`px-3 py-1 ${
                        item.tagColor === "red"
                          ? "bg-[#C8102E] text-white"
                          : item.tagColor === "gold"
                            ? "bg-[#F2B035] text-[#101010]"
                            : item.tagColor === "green"
                              ? "border border-[#169B62] text-[#169B62]"
                              : "border border-white/20 text-[#F4EFE6]/40"
                      }`}
                      style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em" }}
                    >
                      {item.tag.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU + BOOK split ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2">
        <Link
          href={`${base}/menu`}
          className="group bg-[#0F5132] border-r border-white/10 px-10 sm:px-16 py-20 flex flex-col justify-between gap-10 hover:bg-[#0a4028] transition-colors"
        >
          <div>
            <p
              className="text-[#F2B035] mb-5"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
            >
              FOOD &amp; DRINKS
            </p>
            <h2
              className="text-[#F4EFE6] leading-tight"
              style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              The Menu
            </h2>
            <p className="text-[#F4EFE6]/40 text-sm mt-4 max-w-xs leading-relaxed">
              Pub classics, sharables, mains — and a drinks list built for long nights.
            </p>
          </div>
          <div
            className="flex items-center gap-2 text-[#F2B035] group-hover:gap-3 transition-all"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em" }}
          >
            VIEW MENU
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </Link>

        <a
          href={loc.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#101010] px-10 sm:px-16 py-20 flex flex-col justify-between gap-10 hover:bg-[#0F5132] transition-colors"
        >
          <div>
            <p
              className="text-[#F2B035] mb-5"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
            >
              PRIVATE EVENTS
            </p>
            <h2
              className="text-[#F4EFE6] leading-tight"
              style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Book Your Table
            </h2>
            <p className="text-[#F4EFE6]/40 text-sm mt-4 max-w-xs leading-relaxed">
              Groups of any size. Online booking for up to 20. Larger parties contact us directly.
            </p>
          </div>
          <div
            className="flex items-center gap-2 text-[#F2B035] group-hover:gap-3 transition-all"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em" }}
          >
            RESERVE NOW
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </a>
      </section>

      {/* ── SPORTS ── */}
      <section className="bg-[#0F5132] border-t border-white/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p
            className="text-[#F2B035] mb-5"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
          >
            LIVE ON SCREEN
          </p>
          <h2
            className="text-[#F4EFE6] leading-none mb-10"
            style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
          >
            Every Game.<br />
            <span className="text-[#F2B035]">Every Screen.</span>
          </h2>

          <div className="flex flex-wrap gap-2 mb-14">
            {["NFL", "CFL", "MLB", "NBA", "NHL", "UFC / MMA", "Premier League", "Champions League", "MLS", "Rugby"].map((sport) => (
              <span
                key={sport}
                className="border border-white/15 text-[#F4EFE6]/50 hover:border-[#F2B035] hover:text-[#F2B035] transition-colors cursor-default px-4 py-2"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em" }}
              >
                {sport}
              </span>
            ))}
          </div>

          <div className="pt-10 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <p
                className="text-[#F2B035] leading-none mb-1"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {loc.stats[0].value}
              </p>
              <p
                className="text-[#F4EFE6]/30"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em" }}
              >
                {loc.stats[0].label.toUpperCase()}
              </p>
            </div>
            {loc.slug === "vancouver" && (
              <div>
                <p
                  className="text-[#F2B035] leading-none mb-1"
                  style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  12+
                </p>
                <p
                  className="text-[#F4EFE6]/30"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em" }}
                >
                  BEERS ON TAP
                </p>
              </div>
            )}
            <div>
              <p
                className="text-[#F2B035] leading-none mb-1"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                4–6PM
              </p>
              <p
                className="text-[#F4EFE6]/30"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em" }}
              >
                HAPPY HOUR · SUN–FRI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION INFO ── */}
      <section className="bg-[#101010] border-t border-white/5 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p
            className="text-[#F2B035] mb-10"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
          >
            FIND US
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16">
            <div>
              <p
                className="text-[#F4EFE6]/25 mb-3"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em" }}
              >
                ADDRESS
              </p>
              <p className="text-[#F4EFE6] text-base font-medium leading-relaxed">{loc.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-[#169B62] hover:text-[#F2B035] transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em" }}
              >
                GET DIRECTIONS
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <div>
              <p
                className="text-[#F4EFE6]/25 mb-3"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em" }}
              >
                HOURS
              </p>
              <ul className="space-y-2">
                {loc.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 text-sm">
                    <span className="text-[#F4EFE6]/45">{h.days}</span>
                    <span className="text-[#F4EFE6] font-medium tabular-nums">{h.time}</span>
                  </li>
                ))}
              </ul>
              {loc.ageNote && (
                <p
                  className="mt-3 text-[#C8102E]"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  * {loc.ageNote.toUpperCase()}
                </p>
              )}
            </div>

            <div>
              <p
                className="text-[#F4EFE6]/25 mb-3"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em" }}
              >
                CONTACT
              </p>
              <div className="space-y-3">
                <p>
                  <a href={`tel:${loc.phone}`} className="text-[#F4EFE6] text-base font-medium hover:text-[#169B62] transition-colors">
                    {loc.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${loc.email}`} className="text-[#F4EFE6]/50 text-sm hover:text-[#169B62] transition-colors break-all">
                    {loc.email}
                  </a>
                </p>
                <div className="flex gap-4 pt-2">
                  <a href={loc.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#F4EFE6]/25 hover:text-[#F4EFE6] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a href={loc.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#F4EFE6]/25 hover:text-[#F4EFE6] transition-colors">
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
