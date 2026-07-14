import { notFound } from "next/navigation";
import { getLocation } from "@/lib/locations";

export default async function WorldCupPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const fixtures = [
    { group: "Group A", match: "Canada vs. Argentina", date: "Jun 12, 2026", time: "4:00 PM ET" },
    { group: "Group B", match: "England vs. France", date: "Jun 13, 2026", time: "7:00 PM ET" },
    { group: "Group C", match: "Brazil vs. Germany", date: "Jun 14, 2026", time: "1:00 PM ET" },
    { group: "Group D", match: "Spain vs. Portugal", date: "Jun 14, 2026", time: "7:00 PM ET" },
    { group: "Group E", match: "USA vs. Mexico", date: "Jun 15, 2026", time: "4:00 PM ET" },
    { group: "Group F", match: "Japan vs. South Korea", date: "Jun 16, 2026", time: "10:00 AM ET" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F5132] min-h-[65vh] flex flex-col justify-end py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-2 border border-[#C8102E] text-[#101010] px-3 py-1.5"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              LIVE EVENTS
            </span>
          </div>
          <h1
            className="text-[#F4EFE6] leading-none mb-4"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            World Cup <span className="text-[#F2B035]">2026</span>
          </h1>
          <p className="text-[#F4EFE6]/70 text-xl sm:text-2xl mb-3 max-w-2xl">
            Every Goal. Every Game. Every Moment.
          </p>
          <p className="text-[#F4EFE6]/40 text-base max-w-md">
            Watch every match of FIFA World Cup 2026 on our big screens at Dublin Calling {loc.name}, the best pub in {loc.city}.
          </p>
        </div>
      </section>

      {/* Why watch here */}
      <section className="py-16 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-[#F4EFE6] mb-10"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            The Best Seat in {loc.city}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "📺", title: `${loc.stats[0].value} Big Screens`, desc: "Crystal-clear screens covering every angle. You won't miss a second." },
              { icon: "🍺", title: loc.slug === "vancouver" ? "12+ Beers on Tap" : "Ice Cold Pints", desc: loc.slug === "vancouver" ? "12+ beers on tap. The perfect match companion." : "Draught pints and happy hour deals all tournament long." },
              { icon: "🎉", title: "Incredible Atmosphere", desc: "Hundreds of fans under one roof. This is how football was meant to be watched." },
            ].map((item) => (
              <div key={item.title} className="bg-[#0F5132] border border-white/10 p-8">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3
                  className="text-[#F4EFE6] mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "1.4rem" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#F4EFE6]/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixtures */}
      <section className="py-16 bg-[#0F5132] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-[#F4EFE6] mb-10"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Key Fixtures
          </h2>
          <div className="divide-y divide-white/10">
            {fixtures.map((fix) => (
              <div key={fix.match} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5 hover:bg-white/5 -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors">
                <div className="flex items-center gap-4">
                  <span
                    className="bg-[#101010] text-[#F2B035] px-2.5 py-1 shrink-0"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em" }}
                  >
                    {fix.group.toUpperCase()}
                  </span>
                  <p className="text-[#F4EFE6] font-semibold text-sm">{fix.match}</p>
                </div>
                <div className="flex items-center gap-5 shrink-0 pl-14 sm:pl-0">
                  <span className="text-[#F4EFE6]/35 text-xs">{fix.date}</span>
                  <span
                    className="text-[#169B62]"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em" }}
                  >
                    {fix.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[#F4EFE6]/25 text-xs">
            * Full schedule subject to confirmation. All times subject to change.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#101010] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-[#F4EFE6] mb-5"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Watching with a Group?
          </h2>
          <p className="text-[#F4EFE6]/50 text-base max-w-md mx-auto mb-10">
            Reserve your table for the big matches. Groups up to 20 book online. Larger groups contact us directly.
          </p>
          <a
            href={loc.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#F2B035] text-[#101010] hover:bg-[#e0a020] transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em" }}
          >
            RESERVE YOUR TABLE
          </a>
        </div>
      </section>
    </>
  );
}
