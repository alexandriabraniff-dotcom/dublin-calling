import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLocation } from "@/lib/locations";
import FadeIn from "@/components/FadeIn";

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
  type TagColor = "red" | "gold" | "green" | "default";
  const eventCards: {
    day: string;
    name: string;
    detail: string;
    tag: string;
    tagColor: TagColor;
    emoji: string;
  }[] = (
    {
      adelaide: [
        { day: "Every Sunday",  name: "Bills Backers Watch Party", detail: "Official Buffalo Bills fan chapter, every game day", tag: "NFL",    tagColor: "gold",    emoji: "🏈" },
        { day: "Every Monday",  name: "Trivia Night",              detail: "TriviaTO, doors at 7:00 PM",                        tag: "Weekly", tagColor: "default", emoji: "🧠" },
        { day: "Fight Nights",  name: "UFC Live",                  detail: "Every card live on 20+ big screens",                 tag: "UFC",    tagColor: "red",     emoji: "🥊" },
        { day: "Sun to Fri",    name: "Happy Hour",                detail: "4:00 PM to 6:00 PM · Drink specials all week",       tag: "Daily",  tagColor: "green",   emoji: "🍺" },
      ],
      danforth: [
        { day: "Every Monday",  name: "Pool Tournament",   detail: "Sign in by 7:00 PM to compete",          tag: "Weekly", tagColor: "default", emoji: "🎱" },
        { day: "Every Tuesday", name: "Trivia Night",      detail: "TriviaTO, main floor, 7:00 PM",         tag: "Weekly", tagColor: "default", emoji: "🧠" },
        { day: "Fight Nights",  name: "UFC Live",          detail: "Every card live on our big screens",      tag: "UFC",    tagColor: "red",     emoji: "🥊" },
        { day: "Sun to Fri",    name: "Happy Hour",        detail: "4:00 PM to 6:00 PM · Drink specials",    tag: "Daily",  tagColor: "green",   emoji: "🍺" },
      ],
      vancouver: [
        { day: "Recurring",         name: "Ladies Night",    detail: "Recurring event, tickets via AdmitOne",   tag: "Event",  tagColor: "gold",    emoji: "👑" },
        { day: "Biweekly Tuesdays", name: "Trivia Night",    detail: "TriviaTO, main floor, 7:00 PM",           tag: "Weekly", tagColor: "default", emoji: "🧠" },
        { day: "Sun to Fri",        name: "Happy Hour",      detail: "4:00 PM to 6:00 PM · 12+ taps on special", tag: "Daily",  tagColor: "green",   emoji: "🍺" },
        { day: "Fight Nights",      name: "UFC Live",        detail: "Every card live on our big screens",        tag: "UFC",    tagColor: "red",     emoji: "🥊" },
      ],
    } as Record<
      string,
      { day: string; name: string; detail: string; tag: string; tagColor: TagColor; emoji: string }[]
    >
  )[loc.slug] ?? [];

  const features = [
    {
      title: loc.stats[0].value + " Big Screens",
      body: `Every major game. Every sport. ${loc.stats[0].value} screens across the room so you never miss a moment, wherever you're sitting.`,
    },
    {
      title: loc.slug === "vancouver" ? "12+ Beers on Tap" : "Ice-Cold Draught",
      body:
        loc.slug === "vancouver"
          ? "Twelve taps, always rotating. Ask your server what's pouring tonight."
          : "Draught pints, craft cans, and a cocktail list built for long nights.",
    },
  ];

  const googleMapsUrls: Record<string, string> = {
    adelaide: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2!2d-79.3897!3d43.6488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d2e5ab4a5b%3A0x1a2b3c4d5e6f7a8b!2s250%20Adelaide%20St%20W%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000001",
    danforth: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2!2d-79.3523!3d43.6783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b33ef7c2a3d0f%3A0x2b3c4d5e6f7a8b9c!2s526%20Danforth%20Ave%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000002",
    vancouver: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.8!2d-123.1219!3d49.2773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673d3d8070513%3A0x3c4d5e6f7a8b9c0d!2s900%20Granville%20St%2C%20Vancouver%2C%20BC!5e0!3m2!1sen!2sca!4v1700000000003",
  };

  const tagStyle = (color: "red" | "gold" | "green" | "default") => {
    if (color === "red")   return "border border-[#C8102E] text-[#101010]";
    if (color === "gold")  return "bg-[#F2B035] text-[#101010]";
    if (color === "green") return "border border-[#169B62] text-[#169B62]";
    return "border border-white/20 text-[#F4EFE6]/40";
  };

  // Hero subtitle — avoid "Vancouver · Vancouver" repetition
  const heroLabel =
    loc.city === loc.name
      ? `${loc.city} · Party Pub & Kitchen`
      : `${loc.city} · ${loc.name} · Party Pub & Kitchen`;

  const heroH1 =
    loc.slug === "vancouver"
      ? <>Open Until <span className="text-[#F2B035]">3AM</span></>
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

        {/* Age note badge */}
        {loc.ageNote && (
          <div className="absolute top-6 right-6 z-10">
            <span
              className="border border-[#C8102E] text-[#F4EFE6] px-2 py-1"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em" }}
            >
              {loc.ageNote.toUpperCase()}
            </span>
          </div>
        )}

        {/* Centre content — pushed down to clear logo overflow */}
        <div
          className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6"
          style={{ paddingTop: "clamp(80px, 12vh, 110px)", paddingBottom: "clamp(60px, 10vh, 90px)" }}
        >
          <p className="text-[#F4EFE6]/50 uppercase tracking-[0.3em] mb-5" style={{ fontSize: "clamp(9px, 0.8vw, 11px)" }}>
            {heroLabel}
          </p>

          <h1
            className="text-[#F4EFE6] leading-[1.05] mb-5"
            style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.8rem, 9vw, 6rem)" }}
          >
            {heroH1}
          </h1>

          <p
            className="text-[#F4EFE6]/65 max-w-md mb-10"
            style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)", lineHeight: 1.8 }}
          >
            {loc.heroTagline}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F2B035] text-[#101010] font-semibold uppercase tracking-[0.12em] hover:bg-[#e0a020] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(11px, 0.85vw, 13px)", padding: "clamp(0.65rem, 1.2vh, 0.85rem) clamp(1.5rem, 2.5vw, 3rem)" }}
            >
              Book a Table
            </a>
            <Link
              href={`${base}/events`}
              className="border border-[#F4EFE6]/30 text-[#F4EFE6] font-semibold uppercase tracking-[0.12em] hover:border-[#F4EFE6]/60 hover:bg-white/5 transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(11px, 0.85vw, 13px)", padding: "clamp(0.65rem, 1.2vh, 0.85rem) clamp(1.5rem, 2.5vw, 3rem)" }}
            >
              See Events
            </Link>
          </div>
        </div>

      </section>

      {/* ── EVENTS CARDS ── */}
      <section className="bg-[#101010] py-14 border-b border-white/10">
        <FadeIn className="max-w-7xl mx-auto px-6 mb-6 flex items-end justify-between">
          <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em]">What&apos;s On</p>
          <Link
            href={`${base}/events`}
            className="text-[#F2B035] text-xs uppercase tracking-widest hover:text-[#e0a020] transition-colors"
          >
            Full Schedule +
          </Link>
        </FadeIn>

        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-3 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {eventCards.map((card) => (
              <Link
                key={card.name}
                href={`${base}/events`}
                className="group border border-white/10 hover:border-[#F2B035]/40 transition-colors overflow-hidden shrink-0 snap-start w-[78vw] sm:w-80 lg:w-auto flex flex-col"
              >
                {/* Top colour panel */}
                <div
                  className={`flex flex-col items-center justify-center p-8 gap-3 ${
                    card.tagColor === "red"
                      ? "bg-[#101010] border border-[#C8102E]"
                      : card.tagColor === "gold"
                      ? "bg-[#F2B035]"
                      : card.tagColor === "green"
                      ? "bg-[#169B62]"
                      : "bg-[#0F5132]"
                  }`}
                  style={{ height: "clamp(120px, 14vw, 180px)" }}
                >
                  <span style={{ fontSize: "3rem" }}>{card.emoji}</span>
                  <span
                    className={`text-[10px] uppercase tracking-[0.2em] font-medium ${
                      card.tagColor === "gold" ? "text-[#101010]" : "text-white/70"
                    }`}
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Bottom info */}
                <div className="bg-[#0F5132] p-5 flex flex-col gap-3 flex-1">
                  <p className="text-[#F4EFE6]/40 text-[10px] uppercase tracking-[0.2em]">{card.day}</p>
                  <h3
                    className="text-[#F4EFE6] leading-tight"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.3rem)", letterSpacing: "0.02em" }}
                  >
                    {card.name}
                  </h3>
                  <p className="text-[#F4EFE6]/50 text-xs leading-relaxed">{card.detail}</p>
                  <p className="text-[#F2B035]/70 group-hover:text-[#F2B035] transition-colors text-xs uppercase tracking-widest mt-auto">
                    Details +
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <FadeIn className="max-w-7xl mx-auto px-6 mt-5">
          <p className="text-[#F4EFE6]/25 text-[10px] uppercase tracking-[0.25em]">
            Happy Hour every Sunday through Friday, 4:00 PM to 6:00 PM
          </p>
        </FadeIn>
      </section>

      {/* ── FEATURES — alternating rows ── */}
      <section className="bg-[#0F5132] border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-16">
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em]">The Experience</p>
          </FadeIn>

          <div className="flex flex-col gap-16">
            {features.map((feat, i) => (
              <FadeIn
                key={feat.title}
                delay={i * 120}
                className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Text side */}
                <div className="flex flex-col gap-4 w-full md:w-[42%] shrink-0">
                  <h3
                    className="text-[#F4EFE6] leading-none"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "0.02em" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-[#F4EFE6]/55 text-sm leading-relaxed max-w-xs">{feat.body}</p>
                </div>

                {/* Photo placeholder */}
                <div
                  className="w-full flex-1 bg-[#101010] border border-white/10 flex flex-col items-center justify-center gap-3"
                  style={{ height: "clamp(200px, 26vw, 320px)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-[#F4EFE6]/20">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p className="text-[#F4EFE6]/20 text-[10px] uppercase tracking-[0.25em]">Photo Coming Soon</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU + BOOK — split ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 border-t border-white/10">
        <Link
          href={`${base}/menu`}
          className="group bg-[#101010] border-r border-white/10 px-10 sm:px-14 py-16 flex flex-col justify-between gap-10 hover:bg-[#0a0a0a] transition-colors"
        >
          <div>
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-5">Food &amp; Drinks</p>
            <h2
              className="text-[#F4EFE6] leading-none"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.02em" }}
            >
              The Menu
            </h2>
            <p className="text-[#F4EFE6]/45 text-sm mt-4 max-w-xs leading-relaxed">
              Pub classics, sharables, mains, and a full drinks list.
            </p>
          </div>
          <p className="text-[#F2B035]/70 group-hover:text-[#F2B035] text-xs uppercase tracking-widest transition-colors">
            View Menu +
          </p>
        </Link>

        <a
          href={loc.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#0F5132] px-10 sm:px-14 py-16 flex flex-col justify-between gap-10 hover:bg-[#0a4028] transition-colors"
        >
          <div>
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-5">Private Events</p>
            <h2
              className="text-[#F4EFE6] leading-none"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "0.02em" }}
            >
              Book Your Table
            </h2>
            <p className="text-[#F4EFE6]/45 text-sm mt-4 max-w-xs leading-relaxed">
              Groups of any size. Online booking for up to 20.
            </p>
          </div>
          <p className="text-[#F2B035]/70 group-hover:text-[#F2B035] text-xs uppercase tracking-widest transition-colors">
            Reserve Now +
          </p>
        </a>
      </section>

      {/* ── GROUP BOOKING CTA ── */}
      <FadeIn>
        <section className="bg-[#101010] border-t border-white/10 px-6 py-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2
                className="text-[#F4EFE6] leading-tight"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "0.02em" }}
              >
                Book Your Group Night
              </h2>
              <p className="mt-3 text-[#F4EFE6]/55 text-sm max-w-sm leading-relaxed">
                Birthdays, corporate outings, post-game parties. Get in touch and we&apos;ll take care of everything.
              </p>
            </div>
            <Link
              href={`${base}/group-bookings`}
              className="shrink-0 block w-full sm:w-auto text-center px-10 py-4 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ── FIND US ── */}
      <section id="find-us" className="bg-[#0F5132] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-12">Find Us</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Contact */}
            <FadeIn className="flex flex-col gap-6" direction="left">
              <div>
                <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-1">Address</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4EFE6]/60 text-sm hover:text-[#F4EFE6] transition-colors leading-relaxed"
                >
                  {loc.address}
                </a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-1">Phone</p>
                <a href={`tel:${loc.phone}`} className="text-[#F4EFE6]/60 text-sm hover:text-[#F4EFE6] transition-colors">
                  {loc.phone}
                </a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-1">Email</p>
                <a href={`mailto:${loc.email}`} className="text-[#F4EFE6]/60 text-sm hover:text-[#F4EFE6] transition-colors break-all">
                  {loc.email}
                </a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-2">Follow</p>
                <div className="flex gap-5">
                  <a
                    href={loc.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4EFE6]/40 text-xs uppercase tracking-wider hover:text-[#F4EFE6] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={loc.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4EFE6]/40 text-xs uppercase tracking-wider hover:text-[#F4EFE6] transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Hours */}
            <FadeIn direction="none" delay={100}>
              <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-6">Hours</p>
              <div className="flex flex-col">
                {loc.hours.map((h, i) => (
                  <div
                    key={h.days}
                    className={`flex items-start justify-between py-3 ${i < loc.hours.length - 1 ? "border-b border-white/10" : ""}`}
                  >
                    <span className="text-[#F4EFE6]/45 text-xs">{h.days}</span>
                    <span className="text-[#F4EFE6]/70 text-xs text-right">{h.time}</span>
                  </div>
                ))}
                {loc.ageNote && (
                  <p
                    className="mt-4 inline-block border border-[#C8102E] text-[#101010] px-2 py-0.5 self-start"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em" }}
                  >
                    * {loc.ageNote.toUpperCase()}
                  </p>
                )}
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
