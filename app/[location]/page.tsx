export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLocation, todayIn } from "@/lib/locations";
import FadeIn from "@/components/FadeIn";
import ExperienceList from "@/components/ExperienceList";
import { getExperience } from "@/lib/experience";
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

  const googleMapsUrls: Record<string, string> = {
    adelaide: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2!2d-79.3897!3d43.6488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d2e5ab4a5b%3A0x1a2b3c4d5e6f7a8b!2s250%20Adelaide%20St%20W%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000001",
    danforth: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2!2d-79.3523!3d43.6783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b33ef7c2a3d0f%3A0x2b3c4d5e6f7a8b9c!2s526%20Danforth%20Ave%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000002",
    vancouver: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.8!2d-123.1219!3d49.2773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673d3d8070513%3A0x3c4d5e6f7a8b9c0d!2s900%20Granville%20St%2C%20Vancouver%2C%20BC!5e0!3m2!1sen!2sca!4v1700000000003",
  };

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
          style={{ paddingTop: "clamp(80px, 12vh, 110px)", paddingBottom: "clamp(60px, 10vh, 90px)" }}
        >
          <p className="text-[#F4EFE6]/75 uppercase tracking-[0.3em] mb-5" style={{ fontSize: "clamp(9px, 0.8vw, 11px)" }}>
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

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`${base}/events`}
              className="bg-[#F2B035] text-[#101010] font-semibold uppercase tracking-[0.12em] hover:bg-[#e0a020] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(11px, 0.85vw, 13px)", padding: "clamp(0.65rem, 1.2vh, 0.85rem) clamp(1.5rem, 2.5vw, 3rem)" }}
            >
              See Events
            </Link>
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#F4EFE6]/30 text-[#F4EFE6] font-semibold uppercase tracking-[0.12em] hover:border-[#F4EFE6]/60 hover:bg-white/5 transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(11px, 0.85vw, 13px)", padding: "clamp(0.65rem, 1.2vh, 0.85rem) clamp(1.5rem, 2.5vw, 3rem)" }}
            >
              Book a Table
            </a>
          </div>
        </div>

      </section>

      {/* ── EVENTS CARDS ── */}
      <section className="bg-[#101010] py-14 border-b border-white/10">
        <FadeIn>
          <EventCarousel cards={eventCards} base={base} />
        </FadeIn>
      </section>

      {/* ── THIS WEEK ── */}
      <section className="bg-[#0F5132] border-t border-white/10 py-16">
        <FadeIn>
          <WeekCalendar schedule={loc.schedule} today={todayIn(loc.timezone)} sectionBg="#0F5132" />
        </FadeIn>
      </section>


      {/* ── THE EXPERIENCE — alternating rows ── */}
      {/* Divider line between the calendar and The Experience (same style as the footer line) */}
      <section className="bg-[#0F5132] py-16">
        <div className="max-w-7xl mx-auto px-6 -mt-16 mb-16" aria-hidden="true">
          <div className="border-t-2 border-[#F4EFE6]" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.25em]">The Experience</p>
          </FadeIn>
          <ExperienceList items={getExperience(loc)} />
        </div>
      </section>


      {/* ── GROUP BOOKING CTA ── */}
      <FadeIn>
        <section className="bg-[#F2B035] px-6 py-20">
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
              className="shrink-0 block w-full sm:w-auto text-center px-10 py-4 bg-[#101010] text-[#F2B035] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#0F5132] hover:text-[#F4EFE6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101010]"
            >
              Learn More
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ── INSTAGRAM ── */}
      <InstagramFeed profileUrl={loc.social.instagram} locationName={loc.name} />

      {/* ── FIND US ── */}
      <section id="find-us" className="bg-[#0F5132] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.25em] mb-12">Find Us</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Contact */}
            <FadeIn className="flex flex-col gap-6" direction="left">
              <div>
                <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.2em] mb-1">Address</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4EFE6]/75 text-sm hover:text-[#F4EFE6] transition-colors leading-relaxed"
                >
                  {loc.address}
                </a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.2em] mb-1">Phone</p>
                <a href={`tel:${loc.phone}`} className="text-[#F4EFE6]/75 text-sm hover:text-[#F4EFE6] transition-colors">
                  {loc.phone}
                </a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.2em] mb-1">Email</p>
                <a href={`mailto:${loc.email}`} className="text-[#F4EFE6]/75 text-sm hover:text-[#F4EFE6] transition-colors break-all">
                  {loc.email}
                </a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.2em] mb-2">Follow</p>
                <div className="flex gap-5">
                  <a
                    href={loc.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4EFE6]/70 text-xs uppercase tracking-wider hover:text-[#F4EFE6] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={loc.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4EFE6]/70 text-xs uppercase tracking-wider hover:text-[#F4EFE6] transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Hours */}
            <FadeIn direction="none" delay={100}>
              <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.2em] mb-6">Hours</p>
              <div className="flex flex-col">
                {loc.hours.map((h, i) => (
                  <div
                    key={h.days}
                    className={`flex items-start justify-between py-3 ${i < loc.hours.length - 1 ? "border-b border-white/10" : ""}`}
                  >
                    <span className="text-[#F4EFE6]/75 text-xs">{h.days}</span>
                    <span className="text-[#F4EFE6]/70 text-xs text-right">{h.time}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Google Maps */}
            <FadeIn direction="right" delay={150}>
              <div className="w-full overflow-hidden" style={{ height: "280px" }}>
                <iframe
                  src={googleMapsUrls[loc.slug]}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Dublin Calling ${loc.name} location`}
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
    </>
  );
}
