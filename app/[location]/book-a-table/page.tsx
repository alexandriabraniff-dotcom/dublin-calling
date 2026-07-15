import { notFound } from "next/navigation";
import { getLocation } from "@/lib/locations";

export default async function BookATablePage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <section className="bg-[#101010] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <p
          className="text-[#F2B035] mb-3"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
        >
          {loc.name.toUpperCase()} &nbsp;·&nbsp; GROUP BOOKINGS
        </p>
        <h1
          className="text-[#F4EFE6] mb-2 leading-none"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
        >
          Book a Table
        </h1>
        <p className="text-[#F4EFE6]/45 text-sm mb-10 max-w-md">
          Fill out the form below and our team will be in touch to confirm your booking.
        </p>

        <div className="w-full border border-white/10 overflow-hidden">
          <iframe
            src="https://themrggroup.tripleseat.com/dynamic_party_request/528"
            width="100%"
            height="900"
            frameBorder="0"
            title="Dublin Calling Group Booking Form"
            className="w-full"
            style={{ minHeight: "900px", background: "white" }}
          />
        </div>
      </div>
    </section>
  );
}
