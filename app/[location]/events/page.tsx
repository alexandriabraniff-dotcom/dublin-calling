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
    Weekly: "border border-white/20 text-[#F4EFE6]/50",
    Daily: "border border-[#169B62] text-[#169B62]",
    NFL: "border border-[#F2B035] text-[#F2B035]",
    Sports: "border border-white/20 text-[#F4EFE6]/50",
  };

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F5132] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p
            className="text-[#F2B035] mb-4"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
          >
            {loc.name.toUpperCase()} &nbsp;·&nbsp; {loc.city.toUpperCase()}
          </p>
          <h1
            className="text-[#F4EFE6] mb-4"
            style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            Events
          </h1>
          <p className="text-[#F4EFE6]/50 text-lg max-w-xl font-light">
            Live sports, trivia nights, ticketed events, and more. Something on every night of the week.
          </p>
        </div>
      </section>

      {/* Happy Hour banner */}
      <section className="bg-[#101010] border-b border-white/8 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <span className="text-4xl">🍺</span>
            <div>
              <h2
                className="text-[#F2B035]"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.8rem" }}
              >
                Happy Hour Every Day
              </h2>
              <p className="text-[#F4EFE6]/50 text-sm mt-0.5">{loc.happyHour}</p>
            </div>
          </div>
          <span
            className="border border-[#169B62] text-[#169B62] px-4 py-1.5"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em" }}
          >
            DRINK SPECIALS
          </span>
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16 bg-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {loc.events.map((event) => (
              <article
                key={event.title}
                className="bg-[#101010] border border-white/8 hover:border-[#F2B035]/40 transition-colors flex flex-col"
              >
                {/* Top colour strip */}
                <div className={`h-1 w-full ${
                  event.tag === "UFC" ? "bg-[#C8102E]"
                  : event.tag === "Ticketed" ? "bg-[#F2B035]"
                  : event.tag === "Daily" ? "bg-[#169B62]"
                  : "bg-[#0F5132]"
                }`} />

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span
                      className="text-[#F4EFE6]/35 mt-0.5"
                      style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em" }}
                    >
                      {event.date.toUpperCase()}
                    </span>
                    {event.tag && (
                      <span
                        className={`shrink-0 px-2.5 py-0.5 ${tagColors[event.tag] ?? "border border-white/20 text-[#F4EFE6]/40"}`}
                        style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em" }}
                      >
                        {event.tag.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <h2
                    className="text-[#F4EFE6] mb-3 flex-1"
                    style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(1.3rem, 3vw, 1.8rem)" }}
                  >
                    {event.title}
                  </h2>
                  <p className="text-[#F4EFE6]/50 text-sm leading-relaxed">{event.description}</p>

                  {event.ticketUrl && (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2B035] text-[#101010] hover:bg-[#e0a020] transition-colors"
                      style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em" }}
                    >
                      GET TICKETS
                    </a>
                  )}
                </div>
              </article>
            ))}

            {/* Book your own night */}
            <article className="bg-[#0F5132] border border-[#F2B035]/25 hover:border-[#F2B035]/60 transition-colors flex flex-col">
              <div className="h-1 w-full bg-[#F2B035]" />
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <p
                    className="text-[#F2B035] mb-4"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em" }}
                  >
                    PRIVATE EVENT
                  </p>
                  <h2
                    className="text-[#F4EFE6] mb-3"
                    style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(1.3rem, 3vw, 1.8rem)" }}
                  >
                    Host Your Own Night
                  </h2>
                  <p className="text-[#F4EFE6]/50 text-sm leading-relaxed">
                    Birthday? Work event? Post-game celebration? Book the space and let us handle the rest.
                  </p>
                </div>
                <a
                  href={loc.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 self-start inline-flex items-center px-5 py-2.5 bg-[#F2B035] text-[#101010] hover:bg-[#e0a020] transition-colors"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em" }}
                >
                  BOOK NOW
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Sports strip */}
      <section className="py-12 bg-[#101010] border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-[#F4EFE6] mb-6"
            style={{ fontFamily: "'Pacifico', cursive", fontSize: "2rem" }}
          >
            Every Major Sport, Every Night
          </h2>
          <div className="flex flex-wrap gap-2">
            {["NFL","CFL","MLB","NBA","NHL","UFC","Premier League","MLS","Champions League","Rugby","Tennis","Golf"].map((sport) => (
              <span
                key={sport}
                className="border border-white/10 text-[#F4EFE6]/40 hover:border-[#F2B035] hover:text-[#F2B035] transition-colors cursor-default px-4 py-2"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.12em" }}
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
