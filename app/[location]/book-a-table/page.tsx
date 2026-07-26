import { notFound } from "next/navigation";
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
