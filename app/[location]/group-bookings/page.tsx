import { notFound } from "next/navigation";
import Image from "next/image";
import { getLocation } from "@/lib/locations";
import { getBookingTypes } from "@/lib/group-bookings";
import FadeIn from "@/components/FadeIn";
import GoldFrame from "@/components/GoldFrame";
import EnquiryDialog from "@/components/EnquiryDialog";

export default async function GroupBookingsPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const types = getBookingTypes(loc.slug);

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F5132] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1
            className="text-[#F4EFE6]"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            Group Bookings
          </h1>
        </div>
      </section>

      {/* Booking types: photo + write-up + its own enquiry pop-up */}
      <section className="bg-[#101010] py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-14">
          {types.map((t, i) => (
            <FadeIn
              key={t.id}
              className={`flex flex-col md:flex-row md:items-center gap-8 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <GoldFrame className="w-full md:w-1/2 shrink-0 aspect-[3/2]">
                <Image src={t.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </GoldFrame>

              <div className="flex flex-col gap-5 md:flex-1">
                <h2
                  className="text-[#F4EFE6] leading-none"
                  style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "0.02em" }}
                >
                  {t.title}
                </h2>
                <p className="text-[#F4EFE6]/80 text-base md:text-lg leading-relaxed max-w-lg">{t.body}</p>
                <EnquiryDialog type={t} location={loc.slug} locationName={loc.name} email={loc.email} phone={loc.phone} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
