export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLocation, todayIn } from "@/lib/locations";
import FadeIn from "@/components/FadeIn";
import DecorLayer from "@/components/Decor";
import InstagramFeed from "@/components/InstagramFeed";
import WeekCalendar from "@/components/WeekCalendar";
import EventCarousel, { type EventCard } from "@/components/EventCarousel";

export default async function LocationHome({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const base = `/${loc.slug}`;

  // Event cards
  const eventCards: EventCard[] = (
    {
      adelaide: [
        { day: "Every Sunday",  name: "Bills Backers Watch Party", details: ["Official Buffalo Bills fan chapter", "Every game day", "Drink specials all game"],  tag: "NFL",    tagColor: "gold",    emoji: "🏈" },
        { day: "Every Monday",  name: "Trivia Night",              details: ["Hosted by TriviaTO", "Doors at 7:00 PM", "Prizes for top table"],                  tag: "Weekly", tagColor: "default", emoji: "🧠" },
        { day: "Fight Nights",  name: "UFC Live",                  details: ["Every card live", "20+ big screens", "Come early for best seats"],                  tag: "UFC",    tagColor: "red",     emoji: "🥊" },
        { day: "Sun to Fri",    name: "Happy Hour",                details: ["4:00 PM to 6:00 PM", "Discounted drinks all week", "Draught, cocktails and more"],  tag: "Daily",  tagColor: "green",   emoji: "🍺" },
      ],
      danforth: [
        { day: "Every Monday",  name: "Pool Tournament",   details: ["Sign in by 7:00 PM", "Open to all skill levels", "Prizes for winners"],            tag: "Weekly", tagColor: "default", emoji: "🎱" },
        { day: "Every Tuesday", name: "Trivia Night",      details: ["Hosted by TriviaTO", "Main floor, 7:00 PM", "Prizes for top table"],               tag: "Weekly", tagColor: "default", emoji: "🧠" },
        { day: "Fight Nights",  name: "UFC Live",          details: ["Every card live on our big screens", "Come early for best seats"],                  tag: "UFC",    tagColor: "red",     emoji: "🥊" },
        { day: "Sun to Fri",    name: "Happy Hour",        details: ["4:00 PM to 6:00 PM", "Discounted drinks daily", "Draught, cocktails and more"],    tag: "Daily",  tagColor: "green",   emoji: "🍺" },
      ],
      vancouver: [
        { day: "Bi-weekly Tuesdays, 7 to 10PM", name: "Music Bingo",          details: [], tag: "Event", tagColor: "gold", emoji: "🎵", image: "/event-music-bingo.jpg" },
        { day: "Bi-weekly Tuesdays, 7 to 10PM", name: "Trivia Tuesdays",      details: [], tag: "Event", tagColor: "gold", emoji: "🧠", image: "/event-trivia-tuesdays.jpg" },
        { day: "Every Thursday, 8PM to 2AM",    name: "Thursday Nights",      details: [], tag: "Event", tagColor: "gold", emoji: "🎧", image: "/event-thursday-nights.jpg" },
        { day: "Every Friday, 8PM to Late",     name: "Ladies Night",         details: [], tag: "Event", tagColor: "gold", emoji: "👑", image: "/event-ladies-night.jpg" },
        { day: "Every Saturday, 10PM to 3AM",   name: "Saturday Shenanigans", details: [], tag: "Event", tagColor: "gold", emoji: "☘️", image: "/event-saturday-shenanigans.jpg" },
      ],
    } as Record<string, EventCard[]>
  )[loc.slug] ?? [];

  const tagStyle = (color: "red" | "gold" | "green" | "default") => {
    if (color === "red")   return "border border-[#C8102E] text-[#101010]";
    if (color === "gold")  return "bg-[#F2B035] text-[#101010]";
    if (color === "green") return "border border-[#169B62] text-[#169B62]";
    return "border border-white/20 text-[#F4EFE6]/70";
  };

  // Hero subtitle
  const heroLabel =
    loc.slug === "vancouver"
      ? "Party Pub & Kitchen"
      : `${loc.city} · ${loc.name} · Party Pub & Kitchen`;

  const heroH1 =
    loc.slug === "vancouver"
      ? <>Vancouver&apos;s <span className="text-[#F2B035]">Sports Bar</span></>
      : loc.slug === "danforth"
      ? <>East Toronto&apos;s <span className="text-[#F2B035]">Party Pub</span></>
      : <>Downtown <span className="text-[#F2B035]">Toronto&apos;s</span> Party Pub</>;

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex flex-col"
        style={{ height: "calc(100dvh - 72px)" }}
      >
        {/* Background photo */}
        <Image
          src="/hero.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#101010]/60" />


        {/* Centre content — pushed down to clear logo overflow */}
        <div
          className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6"
          style={{ paddingTop: "clamp(32px, 12vh, 110px)", paddingBottom: "clamp(40px, 10vh, 90px)" }}
        >
          {/* Logo in the hero on phones/tablets (on desktop the header logo hangs into the hero) */}
          <Image
            src="/logo.png"
            alt=""
            width={240}
            height={240}
            priority
            className="lg:hidden w-auto mb-6 drop-shadow-2xl"
            style={{ height: "clamp(120px, 34vw, 190px)" }}
          />

          <p className="text-[#F4EFE6]/75 uppercase tracking-[0.3em] mb-5" style={{ fontSize: "11px" }}>
            {heroLabel}
          </p>

          <h1
            className="text-[#F4EFE6] leading-[1.0] mb-5"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.8rem, 9vw, 6rem)", letterSpacing: "0.02em" }}
          >
            {heroH1}
          </h1>

          {loc.slug !== "vancouver" && (
            <p
              className="text-[#F4EFE6]/80 max-w-md mb-10"
              style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)", lineHeight: 1.8 }}
            >
              {loc.heroTagline}
            </p>
          )}
          {loc.slug === "vancouver" && <div className="mb-10" />}

          <div className="w-full sm:w-auto flex flex-wrap justify-center gap-3">
            <Link
              href={`${base}/events`}
              className="btn bg-[#F2B035] text-[#101010] font-semibold uppercase tracking-[0.12em] hover:bg-[#e0a020] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(11px, 0.85vw, 13px)", padding: "clamp(0.65rem, 1.2vh, 0.85rem) clamp(1.5rem, 2.5vw, 3rem)" }}
            >
              See Events
            </Link>
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-[#F4EFE6]/30 text-[#F4EFE6] font-semibold uppercase tracking-[0.12em] hover:border-[#F4EFE6]/60 hover:bg-white/5 transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(11px, 0.85vw, 13px)", padding: "clamp(0.65rem, 1.2vh, 0.85rem) clamp(1.5rem, 2.5vw, 3rem)" }}
            >
              Book a Table
            </a>
          </div>
        </div>

      </section>

      {/* ── THIS WEEK AT DUBLIN CALLING: calendar (dated + weekly events), then the event nights ── */}
      <section className="relative isolate overflow-x-clip bg-[#0F5132] border-t border-white/10 py-16">
        <DecorLayer spots={[
          { name: "beers", x: 12.5, y: "80px", rotate: -8 },
          { name: "pennant", x: 78, y: "112px", rotate: 6, scale: 1.15 },
        ]} mobileSpots={[
          { name: "beers", x: 12, y: "26px", rotate: -8, scale: 0.8 },
          { name: "pennant", x: 82, y: "calc(100% - 26px)", rotate: 6 },
        ]} />
        <FadeIn>
          <WeekCalendar schedule={loc.schedule} weekly={loc.weekly} today={todayIn(loc.timezone)} sectionBg="#0F5132" />
        </FadeIn>
        <FadeIn className="mt-16">
          <EventCarousel cards={eventCards} base={base} />
        </FadeIn>
      </section>


      {/* ── GROUP BOOKING CTA ── */}
      <FadeIn>
        <section className="relative isolate overflow-x-clip bg-[#F2B035] px-6 py-20">
          <DecorLayer
            spots={[{ name: "beers", x: 63, y: "50%", rotate: -6, scale: 1.6 }]}
            mobileSpots={[{ name: "beers", x: 84, y: "40px", rotate: -6, scale: 0.8 }]}
          />
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2
                className="text-[#101010] leading-tight"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "0.02em" }}
              >
                Book Your Group Night
              </h2>
              <p className="mt-3 text-[#101010]/85 text-sm max-w-sm leading-relaxed">
                Birthdays, corporate outings, post-game parties. Get in touch and we&apos;ll take care of everything.
              </p>
            </div>
            <Link
              href={`${base}/group-bookings`}
              className="btn shrink-0 block w-full sm:w-auto text-center px-10 py-4 bg-[#101010] text-[#F2B035] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#0F5132] hover:text-[#F4EFE6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101010]"
            >
              Learn More
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ── INSTAGRAM ── */}
      <InstagramFeed profileUrl={loc.social.instagram} locationName={loc.name} />

    </>
  );
}
