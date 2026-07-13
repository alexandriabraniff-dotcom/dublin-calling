import { notFound } from "next/navigation";
import { getLocation } from "@/lib/locations";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const tagColors: Record<string, string> = {
    UFC: "bg-[#C8102E] text-white",
    Ticketed: "bg-[#F2B035] text-[#101010]",
    Weekly: "bg-[#0F5132] text-[#F4EFE6] border border-[#169B62]",
    Daily: "bg-[#169B62] text-white",
    NFL: "bg-[#0F5132] text-[#F4EFE6] border border-[#169B62]",
    Sports: "bg-[#0F5132] text-[#F4EFE6] border border-[#169B62]",
  };

  return (
    <>
      {/* Header */}
      <section className="bg-[#101010] py-20 border-b border-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#F2B035] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            {loc.name} — {loc.city}
          </p>
          <h1
            className="text-[#F4EFE6] text-6xl sm:text-7xl mb-4"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Events
          </h1>
          <p className="text-[#F4EFE6] opacity-60 text-lg max-w-xl">
            Live sports, trivia nights, ticketed events, and more. Something on
            every night of the week.
          </p>
        </div>
      </section>

      {/* Happy Hour callout */}
      <section className="bg-[#0F5132] py-10 border-b border-[#169B62]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <span className="text-5xl">🍺</span>
            <div>
              <p
                className="text-[#F2B035] text-3xl"
                style={{ fontFamily: "'Lobster Two', cursive" }}
              >
                Happy Hour — Every Day
              </p>
              <p className="text-[#F4EFE6] opacity-70 text-sm mt-1">
                {loc.happyHour}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#101010] rounded px-5 py-3">
            <span className="w-2 h-2 rounded-full bg-[#169B62]" />
            <span className="text-[#F4EFE6] text-sm font-medium">
              Drink specials on draught, cocktails &amp; more
            </span>
          </div>
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loc.events.map((event) => (
              <article
                key={event.title}
                className="bg-[#0F5132] rounded-xl overflow-hidden border border-[#169B62]/20 hover:border-[#169B62]/60 transition-colors flex flex-col"
              >
                {/* Color top bar by tag */}
                <div
                  className={`h-1.5 w-full ${
                    event.tag === "UFC"
                      ? "bg-[#C8102E]"
                      : event.tag === "Ticketed"
                        ? "bg-[#F2B035]"
                        : event.tag === "Daily"
                          ? "bg-[#169B62]"
                          : "bg-[#0F5132]"
                  }`}
                />

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-xs text-[#F4EFE6] opacity-50 font-medium uppercase tracking-wider leading-5">
                      {event.date}
                    </span>
                    {event.tag && (
                      <span
                        className={`shrink-0 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
                          tagColors[event.tag] ??
                          "bg-[#0F5132] text-[#F4EFE6] border border-[#169B62]"
                        }`}
                      >
                        {event.tag}
                      </span>
                    )}
                  </div>

                  <h2
                    className="text-[#F4EFE6] text-2xl mb-3 flex-1"
                    style={{ fontFamily: "'Lobster Two', cursive" }}
                  >
                    {event.title}
                  </h2>
                  <p className="text-[#F4EFE6] text-sm opacity-65 leading-relaxed">
                    {event.description}
                  </p>

                  {event.ticketUrl && (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2B035] text-[#101010] text-sm font-bold rounded hover:bg-[#e0a020] transition-colors"
                    >
                      Get Tickets
                      <svg
                        width="14"
                        height="14"
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
              </article>
            ))}

            {/* Standing card: Book for events */}
            <article className="bg-[#101010] rounded-xl overflow-hidden border border-[#F2B035]/30 hover:border-[#F2B035]/60 transition-colors flex flex-col">
              <div className="h-1.5 w-full bg-[#F2B035]" />
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-[#F2B035] text-xs font-bold uppercase tracking-widest mb-3">
                    Private Event
                  </p>
                  <h2
                    className="text-[#F4EFE6] text-2xl mb-3"
                    style={{ fontFamily: "'Lobster Two', cursive" }}
                  >
                    Host Your Own Night
                  </h2>
                  <p className="text-[#F4EFE6] text-sm opacity-60 leading-relaxed">
                    Birthday? Work event? Post-game celebration? Book the space
                    and let us handle the rest.
                  </p>
                </div>
                <a
                  href={loc.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2B035] text-[#101010] text-sm font-bold rounded hover:bg-[#e0a020] transition-colors"
                >
                  Book Now
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Sports schedule strip */}
      <section className="py-12 bg-[#0F5132] border-t border-[#169B62]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-[#F4EFE6] text-3xl mb-8"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Every Major Sport, Every Night
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "NFL",
              "CFL",
              "MLB",
              "NBA",
              "NHL",
              "UFC",
              "Premier League",
              "MLS",
              "Champions League",
              "Rugby",
              "Tennis",
              "Golf",
            ].map((sport) => (
              <span
                key={sport}
                className="px-4 py-2 border border-[#169B62]/40 text-[#F4EFE6] opacity-80 text-sm rounded-full hover:border-[#F2B035] hover:text-[#F2B035] hover:opacity-100 transition-colors cursor-default"
              >
                {sport}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
