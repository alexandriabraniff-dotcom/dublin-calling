import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getLocation } from "@/lib/locations";
import { OPENTABLE, OPENTABLE_WIDGET } from "@/lib/booking";
import FadeIn from "@/components/FadeIn";

/* Table bookings are OpenTable only. With a location's OpenTable link set in lib/booking.ts the
   Book a Table buttons go straight there; this page covers the time before that (Vancouver's
   OpenTable widget, or a call-to-book note for the Toronto venues). */
export default async function BookATablePage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const link = OPENTABLE[loc.slug];
  const widget = OPENTABLE_WIDGET[loc.slug];
  const btn =
    "btn inline-flex items-center justify-center min-h-12 px-8 font-semibold uppercase tracking-[0.12em] text-xs transition-colors";

  return (
    <>
      <PageHeader
        location={loc.name}
        label="Reservations"
        title="Book a Table"
        page="book"
        subtitle={`Book a table at Dublin Calling ${loc.name}, ${loc.address}, with OpenTable.`}
      />

      <section className="bg-[#082a1c] py-16 px-6 min-h-[50vh]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            {widget && !link ? (
              <div className="border border-white/10 overflow-hidden">
                <iframe
                  src={widget}
                  width="100%"
                  height="600"
                  title={`Dublin Calling ${loc.name} reservations on OpenTable`}
                  className="w-full"
                  style={{ minHeight: "550px", background: "white", border: 0 }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-6">
                <p className="text-[#F4EFE6]/85 max-w-md leading-relaxed">
                  {link ? "Reserve your table on OpenTable." : "Online booking with OpenTable is coming soon. Give us a call and we'll save you a table."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#F2B035] text-[#082a1c] hover:bg-[#e0a020]`}>
                      Book on OpenTable<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  <a href={`tel:${loc.phone}`} className={`${btn} border-2 border-[#F2B035] text-[#F4EFE6] hover:bg-[#F2B035] hover:text-[#082a1c]`}>
                    Call {loc.phone}
                  </a>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
