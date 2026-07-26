import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocation } from "@/lib/locations";
import FadeIn from "@/components/FadeIn";

const BOOKING: Record<string, { type: "opentable" | "tripleseat"; url: string }> = {
  vancouver: {
    type: "opentable",
    url: "https://www.opentable.ca/widget/reservation/loader?rid=1400461&type=standard&theme=wide&color=1&dark=false&iframe=true&overlay=false&lang=en-CA&newtab=false&ot_source=Restaurant%20website",
  },
  adelaide: {
    type: "tripleseat",
    url: "https://themrggroup.tripleseat.com/dynamic_party_request/528",
  },
  danforth: {
    type: "tripleseat",
    url: "https://themrggroup.tripleseat.com/dynamic_party_request/528",
  },
};

export default async function BookATablePage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const booking = BOOKING[loc.slug];
  const base = `/${loc.slug}`;

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[#0F5132] border-b border-white/10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p
              className="text-[#F2B035] mb-4"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
              }}
            >
              {loc.name.toUpperCase()} &nbsp;·&nbsp; RESERVATIONS
            </p>
            <h1
              className="text-[#F4EFE6] leading-none mb-4"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                letterSpacing: "0.02em",
              }}
            >
              Book a Table
            </h1>
            <p className="text-[#F4EFE6]/50 text-sm max-w-md leading-relaxed">
              {loc.address}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── INFO STRIP ── */}
      <section className="bg-[#101010] border-b border-white/10 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Hours */}
          <FadeIn direction="left">
            <p
              className="text-[#F4EFE6]/30 mb-3"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
              }}
            >
              HOURS
            </p>
            <div className="flex flex-col gap-1.5">
              {loc.hours.map((h) => (
                <p key={h.days} className="text-[#F4EFE6]/55 text-xs leading-relaxed">
                  <span className="text-[#F4EFE6]/30">{h.days}: </span>
                  {h.time}
                </p>
              ))}
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn direction="none" delay={80}>
            <p
              className="text-[#F4EFE6]/30 mb-3"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
              }}
            >
              CONTACT
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${loc.phone}`}
                className="text-[#F4EFE6]/55 text-xs hover:text-[#F4EFE6] transition-colors"
              >
                {loc.phone}
              </a>
              <a
                href={`mailto:${loc.email}`}
                className="text-[#F4EFE6]/55 text-xs hover:text-[#F4EFE6] transition-colors break-all"
              >
                {loc.email}
              </a>
            </div>
          </FadeIn>

          {/* Group Bookings CTA */}
          <FadeIn direction="right" delay={160}>
            <p
              className="text-[#F4EFE6]/30 mb-3"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
              }}
            >
              LARGE GROUPS
            </p>
            <p className="text-[#F4EFE6]/50 text-xs leading-relaxed mb-4">
              Planning a birthday, corporate night, or big group outing?
            </p>
            <Link
              href={`${base}/group-bookings`}
              className="inline-block text-[#F2B035] text-xs uppercase tracking-widest hover:text-[#e0a020] transition-colors"
            >
              Group Bookings +
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── BOOKING WIDGET ── */}
      <section className="bg-[#101010] py-16 px-6 min-h-[50vh]">
        <div className="max-w-4xl mx-auto">
          {booking.type === "opentable" ? (
            <FadeIn>
              <p
                className="text-[#F4EFE6]/30 mb-6"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                }}
              >
                RESERVATION REQUEST
              </p>
              <div className="border border-white/10 overflow-hidden">
                <iframe
                  src={booking.url}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title={`Dublin Calling ${loc.name} Reservations`}
                  className="w-full"
                  style={{ minHeight: "550px", background: "white" }}
                />
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <p
                className="text-[#F4EFE6]/30 mb-6"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                }}
              >
                RESERVATION REQUEST
              </p>
              <div className="border border-white/10 overflow-hidden">
                <iframe
                  src={booking.url}
                  width="100%"
                  height="900"
                  frameBorder="0"
                  title={`Dublin Calling ${loc.name} Booking`}
                  className="w-full"
                  style={{ minHeight: "900px", background: "white" }}
                />
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
