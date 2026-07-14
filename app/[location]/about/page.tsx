import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocation } from "@/lib/locations";
import FadeIn from "@/components/FadeIn";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const base = `/${loc.slug}`;

  const highlights: {
    title: string;
    body: string;
    accent: string;
    stat: string;
    statLabel: string;
  }[] = [
    {
      title: "Live Sports on Every Screen",
      body: `${loc.stats[0].value} high-definition screens covering every angle of the room. NFL, CFL, MLB, NBA, NHL, UFC, Premier League, MLS, Champions League. If it's on, we've got it. No matter where you're sitting, you won't miss a moment.`,
      accent: "#F2B035",
      stat: loc.stats[0].value,
      statLabel: loc.stats[0].label,
    },
    {
      title:
        loc.slug === "vancouver" ? "12+ Beers on Tap" : "Pub Food Done Right",
      body:
        loc.slug === "vancouver"
          ? "Twelve taps, always rotating. Great Canadian and international craft beers alongside the classics. Ask your server what's pouring tonight. Happy Hour every weekday from 4 to 6PM on draught."
          : "Our kitchen is built for big nights and bigger groups. Pub classics, sharables, burgers, fish and chips. Proper food made to go with cold pints. Happy Hour every weekday from 4 to 6PM.",
      accent: "#169B62",
      stat: loc.slug === "vancouver" ? "12+" : "4–6PM",
      statLabel: loc.slug === "vancouver" ? "Beers on Tap" : "Happy Hour Daily",
    },
    {
      title:
        loc.slug === "adelaide"
          ? "Home of the Bills Backers"
          : loc.slug === "danforth"
          ? "Monday Night Pool"
          : "Open Until 3AM",
      body:
        loc.slug === "adelaide"
          ? "We are the home of the Official Bills Backers Club in Toronto. Every game day, Bills fans from across the city find their way to Adelaide. Join the chapter, register online, and never watch a game alone again. Plus weekly Trivia Night with TriviaTO every Monday at 7PM."
          : loc.slug === "danforth"
          ? "Monday nights are for pool at the Danforth. Sign up before 7PM, grab your cue, and compete for the top spot. Tuesday nights bring TriviaTO to the main floor. It's the most fun block of the week on the east side."
          : "Friday and Saturday nights, we're open until 3AM. Granville Street's best late-night spot. Recurring Ladies Night events, biweekly trivia with TriviaTO, and 15 screens running every sport worth watching.",
      accent: "#C8102E",
      stat:
        loc.slug === "adelaide"
          ? "Official"
          : loc.slug === "danforth"
          ? "Mon"
          : "3AM",
      statLabel:
        loc.slug === "adelaide"
          ? "Bills Chapter"
          : loc.slug === "danforth"
          ? "Pool Tournaments"
          : "Fri & Sat",
    },
    {
      title: "Private Events & Groups",
      body: "From birthday parties to corporate nights out, post-game celebrations to full venue buyouts. Our events team will make sure your group has the space, drinks, and screens they need. Book online for groups up to 20, or reach out directly for larger events.",
      accent: "#F2B035",
      stat: "60+",
      statLabel: "Guest Capacity",
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F5132] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p
            className="text-[#F2B035] mb-4"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
            }}
          >
            {loc.name.toUpperCase()} &nbsp;·&nbsp; {loc.city.toUpperCase()}
          </p>
          <h1
            className="text-[#F4EFE6] mb-4"
            style={{
              fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em",
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
            }}
          >
            About Us
          </h1>
          <p className="text-[#F4EFE6]/50 text-lg font-light max-w-xl">
            Your neighbourhood Party Pub &amp; Kitchen. Live sports, cold
            drinks, and a room full of people who showed up for the same reason
            you did.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#101010] border-b border-white/10">
        <div className="flex flex-col md:flex-row">
          {/* Photo placeholder */}
          <div
            className="md:w-[45%] shrink-0 bg-[#0a0a0a] border-r border-white/10 flex flex-col items-center justify-center gap-3"
            style={{ minHeight: "clamp(220px, 30vw, 480px)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-[#F4EFE6]/20">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p className="text-[#F4EFE6]/20 text-[10px] uppercase tracking-[0.25em]">Photo Coming Soon</p>
          </div>

          {/* Text */}
          <div className="flex-1 px-6 py-10 md:py-16 md:px-12 flex flex-col justify-center gap-4 md:gap-6">
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em]">
              Our Story
            </p>
            <h2
              className="text-[#F2B035] leading-none"
              style={{
                fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em",
                fontSize: "clamp(2.5rem, 4vw, 4.5rem)",
              }}
            >
              Party Pub &amp; Kitchen.
            </h2>
            <div className="flex flex-col gap-4 max-w-lg">
              <p className="text-[#F4EFE6]/65 text-sm leading-relaxed">
                Dublin Calling is a Party Pub &amp; Kitchen built around one
                idea: a great night out should have everything under one roof.
                Cold pints, live sport on big screens, food worth ordering, and
                a crowd worth being around.
              </p>
              <p className="text-[#F4EFE6]/65 text-sm leading-relaxed">
                Part of the MRG Group family, we operate locations in Toronto
                and Vancouver, each with its own character, its own regular
                crowd, and its own reason to come back. Whether you&apos;re
                here for the game, the trivia, the happy hour, or just because
                it&apos;s Tuesday and you want a pint, this is your pub.
              </p>
              <p className="text-[#F4EFE6]/65 text-sm leading-relaxed">
                The {loc.name} location sits at{" "}
                <span className="text-[#F4EFE6]/85">{loc.address}</span>.{" "}
                {loc.heroTagline} Pull up a stool and stay a while.
              </p>
            </div>
            <Link
              href={`${base}/events`}
              className="block w-full sm:w-auto text-center px-8 py-3 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* Good to Know strip */}
      <section className="bg-[#101010] border-b border-white/10 px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-2">
              Good to Know
            </p>
            <p className="text-[#F4EFE6]/65 text-sm leading-relaxed max-w-md">
              {loc.slug === "vancouver"
                ? "Our kitchen serves pub classics all day and into the night. Happy Hour runs Sunday to Friday, 4PM to 6PM."
                : "No cover charge for most nights. Ticketed events are listed on our events page. Our kitchen runs from open until late, with pub classics, sharables, and mains on the menu."}
            </p>
          </div>
          <Link
            href={`${base}/menu`}
            className="block w-full sm:w-auto text-center px-8 py-3 border border-[#F4EFE6]/20 text-[#F4EFE6]/60 font-semibold text-xs tracking-[0.1em] uppercase hover:border-[#F4EFE6]/50 hover:text-[#F4EFE6] transition-colors"
          >
            View Menu
          </Link>
        </div>
      </section>

      {/* Highlights — alternating layout */}
      <section className="bg-[#101010] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-14">
            What We Offer
          </p>
          <div className="flex flex-col gap-16">
            {highlights.map((item, i) => (
              <FadeIn
                key={item.title}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                {/* Photo placeholder */}
                <div
                  className="bg-[#0a0a0a] border border-white/10 overflow-hidden shrink-0 w-full md:w-[55%] flex flex-col items-center justify-center gap-3"
                  style={{ height: "clamp(220px, 32vw, 380px)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-[#F4EFE6]/20">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p className="text-[#F4EFE6]/20 text-[10px] uppercase tracking-[0.25em]">Photo Coming Soon</p>
                </div>

                {/* Text */}
                <div
                  className={`flex flex-col gap-4 w-full ${
                    i % 2 === 0 ? "md:pr-6" : "md:pl-6"
                  }`}
                >
                  <h3
                    className="text-[#F4EFE6] leading-none"
                    style={{
                      fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em",
                      fontSize: "clamp(2.2rem, 4vw, 4rem)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#F4EFE6]/60 text-sm leading-relaxed max-w-md">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Hours strip */}
      <section className="bg-[#0F5132] border-t border-white/10 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-8">
              Hours: {loc.name}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
              {loc.hours.map((h) => (
                <div key={h.days} className="bg-[#0F5132] px-6 py-6">
                  <p className="text-[#F4EFE6]/40 text-[10px] uppercase tracking-[0.18em] mb-2">
                    {h.days}
                  </p>
                  <p
                    className="text-[#F2B035]"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h.time}
                  </p>
                </div>
              ))}
            </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* CTA — group bookings */}
      <section className="bg-[#101010] border-t border-white/10 px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2
              className="text-[#F4EFE6] leading-tight"
              style={{
                fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              }}
            >
              Bringing a Group?
            </h2>
            <p className="mt-3 text-[#F4EFE6]/55 text-sm max-w-sm leading-relaxed">
              We handle everything. Tables, screens, food and drink packages
              Get in touch and we&apos;ll take care of the rest.
            </p>
          </div>
          <Link
            href={`${base}/group-bookings`}
            className="shrink-0 block w-full sm:w-auto text-center px-10 py-4 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors"
          >
            Group Bookings
          </Link>
        </div>
      </section>
    </>
  );
}
