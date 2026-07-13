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

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-end"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(22,155,98,0.18) 0%, rgba(15,81,50,0.25) 40%, #101010 80%)",
        }}
      >
        {/* Atmospheric pub grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#f4efe6 1px, transparent 1px), linear-gradient(to right, #f4efe6 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Corner shamrock accent */}
        <div className="absolute top-12 right-12 opacity-10 hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="#169B62">
            <text
              x="50"
              y="80"
              textAnchor="middle"
              style={{ fontSize: "80px" }}
            >
              ☘
            </text>
          </svg>
        </div>

        {/* Location badge */}
        {loc.ageNote && (
          <div className="absolute top-8 left-6 bg-[#C8102E] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-widest">
            {loc.ageNote}
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-20 pt-32 w-full">
          {/* Eyebrow */}
          <p className="text-[#F2B035] text-sm font-semibold uppercase tracking-[0.25em] mb-4">
            {loc.city} &mdash; {loc.name}
          </p>

          {/* Main heading */}
          <h1
            className="text-[clamp(3.5rem,10vw,8rem)] text-[#F4EFE6] leading-[1.05] mb-6"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Dublin{" "}
            <span className="text-[#169B62]">Calling</span>
          </h1>

          {/* Sub */}
          <p className="text-[#F4EFE6] text-xl sm:text-2xl font-light max-w-xl mb-3 opacity-90">
            Party Pub &amp; Kitchen
          </p>
          <p className="text-[#F4EFE6] text-base sm:text-lg opacity-60 max-w-lg mb-10">
            {loc.heroTagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F2B035] text-[#101010] font-bold text-sm rounded hover:bg-[#e0a020] transition-colors"
            >
              Book a Table
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            <Link
              href={`${base}/events`}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#169B62] text-[#F4EFE6] font-semibold text-sm rounded hover:bg-[#0F5132] transition-colors"
            >
              See Events
            </Link>
            <Link
              href={`${base}/menu`}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#F4EFE6]/20 text-[#F4EFE6]/70 font-semibold text-sm rounded hover:border-[#F4EFE6]/50 hover:text-[#F4EFE6] transition-colors"
            >
              View Menu
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#101010] to-transparent pointer-events-none" />
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0F5132] py-10 border-y border-[#169B62]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 divide-x divide-[#169B62]/30">
            {loc.stats.map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p
                  className="text-[#F2B035] text-4xl sm:text-5xl mb-1"
                  style={{ fontFamily: "'Lobster Two', cursive" }}
                >
                  {stat.value}
                </p>
                <p className="text-[#F4EFE6] text-xs sm:text-sm uppercase tracking-wider opacity-80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HAPPY HOUR BANNER ── */}
      <section className="bg-[#101010] border-b border-[#0F5132] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🍺</span>
            <div>
              <p
                className="text-[#F2B035] text-2xl"
                style={{ fontFamily: "'Lobster Two', cursive" }}
              >
                Happy Hour
              </p>
              <p className="text-[#F4EFE6] text-sm opacity-70">
                {loc.happyHour}
              </p>
            </div>
          </div>
          <Link
            href={`${base}/menu`}
            className="px-6 py-2.5 border border-[#F2B035] text-[#F2B035] text-sm font-semibold rounded hover:bg-[#F2B035] hover:text-[#101010] transition-colors"
          >
            View Menu
          </Link>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-20 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-[#169B62] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              What&apos;s On
            </p>
            <h2
              className="text-[#F4EFE6] text-5xl sm:text-6xl"
              style={{ fontFamily: "'Lobster Two', cursive" }}
            >
              Your Pub, Your Way
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loc.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#0F5132] rounded-lg p-6 border border-[#169B62]/20 hover:border-[#169B62]/60 transition-colors group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3
                  className="text-[#F4EFE6] text-xl mb-2"
                  style={{ fontFamily: "'Lobster Two', cursive" }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#F4EFE6] text-sm opacity-65 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="py-20 bg-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[#F2B035] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                What&apos;s Coming
              </p>
              <h2
                className="text-[#F4EFE6] text-5xl sm:text-6xl"
                style={{ fontFamily: "'Lobster Two', cursive" }}
              >
                Upcoming Events
              </h2>
            </div>
            <Link
              href={`${base}/events`}
              className="text-[#169B62] text-sm font-semibold hover:text-[#F2B035] transition-colors flex items-center gap-2"
            >
              All Events
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {loc.events.slice(0, 4).map((event) => (
              <div
                key={event.title}
                className="bg-[#101010] rounded-lg p-6 border border-[#0F5132] hover:border-[#169B62] transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs text-[#F4EFE6] opacity-50 font-medium uppercase tracking-wider mt-0.5">
                    {event.date}
                  </span>
                  {event.tag && (
                    <span className="shrink-0 text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F2B035] text-[#101010] uppercase tracking-wide">
                      {event.tag}
                    </span>
                  )}
                </div>
                <h3
                  className="text-[#F4EFE6] text-xl mb-2"
                  style={{ fontFamily: "'Lobster Two', cursive" }}
                >
                  {event.title}
                </h3>
                <p className="text-[#F4EFE6] text-sm opacity-60 leading-relaxed">
                  {event.description}
                </p>
                {event.ticketUrl && (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-[#F2B035] text-xs font-semibold hover:underline"
                  >
                    Get Tickets
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPORTS SECTION ── */}
      <section className="py-20 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#169B62] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                Never Miss a Game
              </p>
              <h2
                className="text-[#F4EFE6] text-5xl sm:text-6xl mb-6"
                style={{ fontFamily: "'Lobster Two', cursive" }}
              >
                Every Sport. Every Game.
              </h2>
              <p className="text-[#F4EFE6] opacity-65 text-base leading-relaxed mb-8">
                We broadcast every major game across our big screens. Whether
                you&apos;re here for the NFL, Premier League, UFC, or the
                playoffs, you&apos;ve got the best seat in the house.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "NFL",
                  "MLB",
                  "NBA",
                  "NHL",
                  "UFC / MMA",
                  "Premier League",
                  "MLS",
                  "Rugby",
                ].map((sport) => (
                  <div
                    key={sport}
                    className="flex items-center gap-2.5 text-sm text-[#F4EFE6] opacity-80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#169B62] shrink-0" />
                    {sport}
                  </div>
                ))}
              </div>
            </div>

            {/* Atmospheric score card */}
            <div className="relative">
              <div className="bg-[#0F5132] rounded-2xl p-8 border border-[#169B62]/30">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs text-[#F2B035] font-bold uppercase tracking-widest">
                    Live on Screen
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#C8102E] font-bold uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { sport: "NFL", game: "Bills vs. Dolphins", time: "Sun 1PM" },
                    { sport: "UFC", game: "Main Card", time: "Sat 10PM" },
                    { sport: "EPL", game: "Man City vs. Arsenal", time: "Sat 7AM" },
                    { sport: "MLB", game: "Blue Jays vs. Yankees", time: "Daily" },
                  ].map((item) => (
                    <div
                      key={item.game}
                      className="flex items-center justify-between py-3 border-b border-[#169B62]/20 last:border-0"
                    >
                      <div>
                        <span className="text-xs text-[#F2B035] font-bold uppercase">
                          {item.sport}
                        </span>
                        <p className="text-[#F4EFE6] text-sm font-medium mt-0.5">
                          {item.game}
                        </p>
                      </div>
                      <span className="text-[#F4EFE6] opacity-50 text-xs">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION INFO ── */}
      <section className="py-20 bg-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Address */}
            <div className="bg-[#101010] rounded-xl p-8 border border-[#169B62]/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#0F5132] flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#169B62"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3
                  className="text-[#F4EFE6] text-xl"
                  style={{ fontFamily: "'Lobster Two', cursive" }}
                >
                  Find Us
                </h3>
              </div>
              <p className="text-[#F4EFE6] opacity-70 text-sm leading-relaxed mb-4">
                {loc.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#169B62] text-sm font-semibold hover:text-[#F2B035] transition-colors flex items-center gap-1.5"
              >
                Get Directions
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* Hours */}
            <div className="bg-[#101010] rounded-xl p-8 border border-[#169B62]/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#0F5132] flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#169B62"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3
                  className="text-[#F4EFE6] text-xl"
                  style={{ fontFamily: "'Lobster Two', cursive" }}
                >
                  Hours
                </h3>
              </div>
              <ul className="space-y-2.5">
                {loc.hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex justify-between text-sm text-[#F4EFE6]"
                  >
                    <span className="opacity-60">{h.days}</span>
                    <span className="font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
              {loc.ageNote && (
                <p className="mt-4 text-xs text-[#C8102E] font-semibold">
                  * {loc.ageNote}
                </p>
              )}
            </div>

            {/* Unique feature + contact */}
            <div className="bg-[#101010] rounded-xl p-8 border border-[#169B62]/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#0F5132] flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#169B62"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.26 12a19.79 19.79 0 0 1-3-8.57A2 2 0 0 1 3.18 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 13 14.91l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                  </svg>
                </div>
                <h3
                  className="text-[#F4EFE6] text-xl"
                  style={{ fontFamily: "'Lobster Two', cursive" }}
                >
                  Contact
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-[#F4EFE6] opacity-70 text-sm">
                  <a
                    href={`tel:${loc.phone}`}
                    className="hover:text-[#169B62] hover:opacity-100 transition-colors"
                  >
                    {loc.phone}
                  </a>
                </p>
                <p className="text-[#F4EFE6] opacity-70 text-sm">
                  <a
                    href={`mailto:${loc.email}`}
                    className="hover:text-[#169B62] hover:opacity-100 transition-colors break-all"
                  >
                    {loc.email}
                  </a>
                </p>
              </div>
              {loc.uniqueFeature && (
                <div className="mt-6 pt-5 border-t border-[#0F5132]">
                  <p className="text-xs text-[#F2B035] font-bold uppercase tracking-widest mb-1">
                    Signature Feature
                  </p>
                  <p className="text-[#F4EFE6] text-sm opacity-80">
                    {loc.uniqueFeature}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── GROUP BOOKINGS CTA ── */}
      <section className="py-20 bg-[#101010]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#169B62] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Private Events
          </p>
          <h2
            className="text-[#F4EFE6] text-5xl sm:text-6xl mb-6"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Hosting a Group?
          </h2>
          <p className="text-[#F4EFE6] opacity-65 text-lg max-w-xl mx-auto mb-10">
            Team outings, birthdays, corporate events, post-game parties. We
            handle groups of any size. Online booking for up to 20 people.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F2B035] text-[#101010] font-bold text-sm rounded hover:bg-[#e0a020] transition-colors"
            >
              Book Your Group
            </a>
            <Link
              href={`${base}/group-bookings`}
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#F4EFE6]/20 text-[#F4EFE6]/70 font-semibold text-sm rounded hover:border-[#F4EFE6]/50 hover:text-[#F4EFE6] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
