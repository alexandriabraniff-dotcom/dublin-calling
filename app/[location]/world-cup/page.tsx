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
      <section
        className="relative min-h-[60vh] flex flex-col justify-end"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(22,155,98,0.22) 0%, rgba(15,81,50,0.3) 40%, #101010 80%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#f4efe6 1px, transparent 1px), linear-gradient(to right, #f4efe6 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-24 w-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5 text-xs text-[#C8102E] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              Live Events
            </span>
          </div>
          <h1
            className="text-[#F4EFE6] text-[clamp(3rem,10vw,7rem)] mb-4 leading-none"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            World Cup{" "}
            <span className="text-[#F2B035]">2026</span>
          </h1>
          <p className="text-[#F4EFE6] text-xl sm:text-2xl opacity-80 mb-3 max-w-2xl">
            Every Goal. Every Game. Every Moment.
          </p>
          <p className="text-[#F4EFE6] opacity-55 text-base max-w-lg">
            Watch every match of FIFA World Cup 2026 on our big screens at Dublin
            Calling {loc.name}. The biggest sporting event in the world, in the best
            pub in {loc.city}.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#101010] to-transparent pointer-events-none" />
      </section>

      {/* Why watch here */}
      <section className="py-16 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-[#F4EFE6] text-4xl sm:text-5xl mb-10"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            The Best Seat in {loc.city}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "📺",
                title: `${loc.stats[0].value} Big Screens`,
                desc: "Crystal-clear screens covering every angle. You won't miss a second.",
              },
              {
                icon: "🍺",
                title: "Ice Cold Pints",
                desc: loc.slug === "vancouver"
                  ? "12+ beers on tap — the perfect companion for every match."
                  : "Draught pints, cold bottles, and happy hour deals all tournament long.",
              },
              {
                icon: "🎉",
                title: "Incredible Atmosphere",
                desc: "Hundreds of fans under one roof. This is how football was meant to be watched.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#0F5132] rounded-xl p-8 border border-[#169B62]/20"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="text-[#F4EFE6] text-xl mb-2"
                  style={{ fontFamily: "'Lobster Two', cursive" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#F4EFE6] opacity-60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixtures */}
      <section className="py-16 bg-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-[#F4EFE6] text-4xl sm:text-5xl mb-10"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Key Fixtures
          </h2>
          <div className="space-y-3">
            {fixtures.map((fix) => (
              <div
                key={fix.match}
                className="bg-[#101010] rounded-lg px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#0F5132] hover:border-[#169B62] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#F2B035] bg-[#0F5132] px-2.5 py-1 rounded uppercase tracking-wider shrink-0">
                    {fix.group}
                  </span>
                  <p className="text-[#F4EFE6] font-semibold text-base">
                    {fix.match}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[#F4EFE6] opacity-50 text-sm">{fix.date}</span>
                  <span className="text-[#169B62] font-bold text-sm">{fix.time}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[#F4EFE6] opacity-40 text-xs">
            * Full fixture schedule available closer to the tournament. All times subject to change.
          </p>
        </div>
      </section>

      {/* Book section */}
      <section className="py-20 bg-[#101010]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-[#F4EFE6] text-5xl sm:text-6xl mb-6"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Watching with a Group?
          </h2>
          <p className="text-[#F4EFE6] opacity-60 text-lg max-w-lg mx-auto mb-10">
            Reserve your table for the big matches. Groups up to 20 can book
            online. Larger groups, contact us directly.
          </p>
          <a
            href={loc.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F2B035] text-[#101010] font-bold text-sm rounded hover:bg-[#e0a020] transition-colors"
          >
            Reserve Your Table
          </a>
        </div>
      </section>
    </>
  );
}
