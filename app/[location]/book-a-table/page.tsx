import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
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
      {/* Header */}
      <PageHeader location={loc.name} label="Reservations" title="Book a Table" subtitle={loc.address} />

      {/* ── BOOKING WIDGET ── */}
      <section className="bg-[#101010] py-16 px-6 min-h-[50vh]">
        <div className="max-w-4xl mx-auto">
          {booking.type === "opentable" ? (
            <FadeIn>
              <p
                className="text-[#F4EFE6]/70 mb-6"
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.7rem",
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
                className="text-[#F4EFE6]/70 mb-6"
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.7rem",
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
