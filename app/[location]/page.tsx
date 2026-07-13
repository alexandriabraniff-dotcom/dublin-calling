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

  // Event cards — coloured top panel + info bottom
  type TagColor = "red" | "gold" | "green" | "default";
  const eventCards: { day: string; name: string; detail: string; tag: string; tagColor: TagColor; emoji: string; }[] = ({
    adelaide: [
      { day: "Every Sunday",  name: "Bills Backers Watch Party", detail: "Official Buffalo Bills fan chapter — every game day", tag: "NFL",    tagColor: "gold",    emoji: "🏈" },
      { day: "Every Monday",  name: "Trivia Night",              detail: "TriviaTO — doors at 7:00 PM",                        tag: "Weekly", tagColor: "default", emoji: "🧠" },
      { day: "Fight Nights",  name: "UFC Live",                  detail: "Every card live on 20+ big screens",                 tag: "UFC",    tagColor: "red",     emoji: "🥊" },
      { day: "Sun – Fri",     name: "Happy Hour",                detail: "4:00 PM – 6:00 PM · Drink specials all week",        tag: "Daily",  tagColor: "green",   emoji: "🍺" },
    ],
    danforth: [
      { day: "Every Monday",  name: "Pool Tournament",   detail: "Sign in by 7:00 PM to compete",            tag: "Weekly", tagColor: "default", emoji: "🎱" },
      { day: "Every Tuesday", name: "Trivia Night",      detail: "TriviaTO — main floor, 7:00 PM",           tag: "Weekly", tagColor: "default", emoji: "🧠" },
      { day: "Fight Nights",  name: "UFC Live",          detail: "Every card live on our big screens",        tag: "UFC",    tagColor: "red",     emoji: "🥊" },
      { day: "Sun – Fri",     name: "Happy Hour",        detail: "4:00 PM – 6:00 PM · Drink specials",        tag: "Daily",  tagColor: "green",   emoji: "🍺" },
    ],
    vancouver: [
      { day: "Jul 17 + Jul 31",  name: "Ladies Night",                    detail: "Recurring event — tickets via AdmitOne",       tag: "Event",  tagColor: "gold", emoji: "👑" },
      { day: "Biweekly Tuesdays",name: "Trivia Night",                    detail: "TriviaTO — main floor, 7:00 PM",               tag: "Weekly", tagColor: "default", emoji: "🧠" },
      { day: "Sun – Fri",        name: "Happy Hour",                      detail: "4:00 PM – 6:00 PM · 12+ taps on special",      tag: "Daily",  tagColor: "green", emoji: "🍺" },
      { day: "Fight Nights",     name: "UFC Live",                        detail: "Every card live on our big screens",            tag: "UFC",    tagColor: "red",  emoji: "🥊" },
    ],
  } as Record<string, { day: string; name: string; detail: string; tag: string; tagColor: TagColor; emoji: string; }[]>)[loc.slug] ?? [];

  const features = [
    {
      title: loc.stats[0].value + " Big Screens",
      body: `Every major game. Every sport. ${loc.stats[0].value} big screens so you never miss a moment — wherever you're sitting.`,
      accent: "#F2B035",
    },
    {
      title: loc.slug === "vancouver" ? "12+ Beers on Tap" : "Ice-Cold Draught",
      body: loc.slug === "vancouver"
        ? "Twelve taps, always rotating. Ask your server what's pouring tonight."
        : "Draught pints, craft cans, and a cocktail list built for long nights.",
      accent: "#169B62",
    },
  ];

  const googleMapsUrls: Record<string, string> = {
    adelaide: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2!2d-79.3897!3d43.6488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d2e5ab4a5b%3A0x1a2b3c4d5e6f7a8b!2s250%20Adelaide%20St%20W%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000001",
    danforth: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2!2d-79.3523!3d43.6783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b33ef7c2a3d0f%3A0x2b3c4d5e6f7a8b9c!2s526%20Danforth%20Ave%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000002",
    vancouver: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.8!2d-123.1219!3d49.2773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673d3d8070513%3A0x3c4d5e6f7a8b9c0d!2s900%20Granville%20St%2C%20Vancouver%2C%20BC!5e0!3m2!1sen!2sca!4v1700000000003",
  };

  const tagStyle = (color: "red" | "gold" | "green" | "default") => {
    if (color === "red")     return "bg-[#C8102E] text-white";
    if (color === "gold")    return "bg-[#F2B035] text-[#101010]";
    if (color === "green")   return "border border-[#169B62] text-[#169B62]";
    return "border border-white/20 text-[#F4EFE6]/40";
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#0F5132] flex flex-col items-center justify-center text-center"
        style={{ minHeight: "calc(100dvh - 68px)", padding: "clamp(4rem, 8vh, 7rem) 1.5rem clamp(3rem, 6vh, 5rem)" }}>

        {loc.ageNote && (
          <div className="absolute top-6 right-6">
            <span className="border border-[#C8102E] text-[#C8102E] px-2 py-1"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em" }}>
              {loc.ageNote.toUpperCase()}
            </span>
          </div>
        )}

        <p className="text-[#F4EFE6]/35 uppercase tracking-[0.3em] mb-6"
          style={{ fontSize: "clamp(9px, 0.8vw, 11px)" }}>
          {loc.city} &nbsp;·&nbsp; {loc.name} &nbsp;·&nbsp; Party Pub &amp; Kitchen
        </p>

        <Image src="/logo.png" alt="Dublin Calling" width={140} height={140}
          className="w-24 sm:w-32 md:w-40 h-auto mb-8 drop-shadow-2xl" priority />

        <h1 className="text-[#F4EFE6] leading-[1.05] mb-4"
          style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(3rem, 10vw, 8rem)" }}>
          {loc.name === "Vancouver"
            ? <>Open Until <span className="text-[#F2B035]">3AM</span></>
            : loc.name === "Danforth"
            ? <>East Toronto&apos;s <span className="text-[#F2B035]">Party Pub</span></>
            : <>Downtown <span className="text-[#F2B035]">Toronto&apos;s</span> Party Pub</>}
        </h1>

        <p className="text-[#F4EFE6]/50 font-light max-w-md mb-10"
          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>
          {loc.heroTagline}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a href={loc.bookingUrl} target="_blank" rel="noopener noreferrer"
            className="bg-[#F2B035] text-[#101010] font-semibold uppercase tracking-[0.12em] hover:bg-[#e0a020] transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(11px, 0.85vw, 13px)", padding: "clamp(0.65rem, 1.2vh, 0.85rem) clamp(1.5rem, 2.5vw, 3rem)" }}>
            Book a Table
          </a>
          <Link href={`${base}/events`}
            className="border border-[#F4EFE6]/25 text-[#F4EFE6] font-semibold uppercase tracking-[0.12em] hover:border-[#F4EFE6]/60 hover:bg-white/5 transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(11px, 0.85vw, 13px)", padding: "clamp(0.65rem, 1.2vh, 0.85rem) clamp(1.5rem, 2.5vw, 3rem)" }}>
            See Events
          </Link>
        </div>

        {/* Stat strip */}
        <div className="absolute bottom-0 inset-x-0 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-white/10 py-5">
            {loc.stats.map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="text-[#F2B035] leading-none"
                  style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
                  {s.value}
                </p>
                <p className="text-[#F4EFE6]/30 uppercase tracking-[0.2em] mt-1"
                  style={{ fontSize: "clamp(8px, 0.65vw, 10px)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS CARDS ── */}
      <section className="bg-[#101010] py-14 border-b border-white/10">
        <FadeIn className="max-w-7xl mx-auto px-6 mb-6 flex items-end justify-between">
          <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em]">What&apos;s On</p>
          <Link href={`${base}/events`}
            className="text-[#F2B035] text-xs uppercase tracking-widest hover:text-[#e0a020] transition-colors">
            Full Schedule +
          </Link>
        </FadeIn>

        {/* Horizontal scroll on mobile, 4-col on desktop */}
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-3 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {eventCards.map((card) => (
              <Link key={card.name} href={`${base}/events`}
                className="group border border-white/10 hover:border-[#F2B035]/40 transition-colors overflow-hidden shrink-0 snap-start w-[78vw] sm:w-80 lg:w-auto flex flex-col">
                {/* Top — coloured panel */}
                <div
                  className={`flex flex-col items-center justify-center p-8 gap-3 ${
                    card.tagColor === "red" ? "bg-[#C8102E]"
                    : card.tagColor === "gold" ? "bg-[#F2B035]"
                    : card.tagColor === "green" ? "bg-[#169B62]"
                    : "bg-[#0F5132]"
                  }`}
                  style={{ height: "clamp(120px, 14vw, 180px)" }}>
                  <span style={{ fontSize: "3rem" }}>{card.emoji}</span>
                  <span className="text-white/70 text-[10px] uppercase tracking-[0.2em] font-medium">{card.tag}</span>
                </div>
                {/* Bottom — info */}
                <div className="bg-[#0F5132] p-5 flex flex-col gap-3 flex-1">
                  <p className="text-[#F4EFE6]/40 text-[10px] uppercase tracking-[0.2em]">{card.day}</p>
                  <h3 className="text-[#F4EFE6] leading-tight"
                    style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}>
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
      <section className="bg-[#0F5132] border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-12">
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em]">The Experience</p>
          </FadeIn>

          {features.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 120}
              className={`flex flex-col md:flex-row items-center gap-8 ${i > 0 ? "mt-10" : ""}`}>
              {/* Text side */}
              <div className={`flex flex-col gap-3 w-full md:w-[40%] shrink-0 ${i % 2 === 1 ? "md:order-2 md:pl-10" : "md:pr-10"}`}>
                <h3 className="text-[#F4EFE6] leading-none"
                  style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                  {feat.title}
                </h3>
                <p className="text-[#F4EFE6]/55 text-sm leading-relaxed max-w-xs">{feat.body}</p>
              </div>
              {/* Visual panel */}
              <div className={`w-full flex-1 bg-[#101010] border border-white/10 flex items-center justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}
                style={{ height: "clamp(180px, 24vw, 280px)" }}>
                <div className="text-center">
                  <p className="leading-none text-[#F4EFE6]"
                    style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(4rem, 10vw, 8rem)", color: feat.accent, opacity: 0.15 }}>
                    {i === 0 ? loc.stats[0].value : loc.slug === "vancouver" ? "12+" : "🍺"}
                  </p>
                </div>
                <div className="absolute">
                  <p className="text-[#F4EFE6]/60 text-center"
                    style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(3rem, 8vw, 6rem)", color: feat.accent }}>
                    {i === 0 ? loc.stats[0].value : loc.slug === "vancouver" ? "12+" : "✓"}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── MENU + BOOK — split ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 border-t border-white/10">
        <Link href={`${base}/menu`}
          className="group bg-[#101010] border-r border-white/10 px-10 sm:px-14 py-16 flex flex-col justify-between gap-10 hover:bg-[#0a0a0a] transition-colors">
          <div>
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-5">Food &amp; Drinks</p>
            <h2 className="text-[#F4EFE6] leading-none"
              style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
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
        <a href={loc.bookingUrl} target="_blank" rel="noopener noreferrer"
          className="group bg-[#0F5132] px-10 sm:px-14 py-16 flex flex-col justify-between gap-10 hover:bg-[#0a4028] transition-colors">
          <div>
            <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-5">Private Events</p>
            <h2 className="text-[#F4EFE6] leading-none"
              style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
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

      {/* ── GROUP BOOKING CTA ── (Yale "brown section" equivalent) */}
      <FadeIn>
        <section className="bg-[#101010] border-t border-white/10 px-6 py-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-[#F4EFE6] leading-tight"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                Book Your Group Night
              </h2>
              <p className="mt-3 text-[#F4EFE6]/55 text-sm max-w-sm leading-relaxed">
                Birthdays, corporate outings, post-game parties. Get in touch and we&apos;ll take care of everything.
              </p>
            </div>
            <Link href={`${base}/group-bookings`}
              className="shrink-0 block w-full sm:w-auto text-center px-10 py-4 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors">
              Learn More
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ── FIND US ── */}
      <section id="find-us" className="bg-[#0F5132] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-10">Find Us</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Contact */}
            <FadeIn className="flex flex-col gap-5" direction="left">
              <div>
                <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-1">Address</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-[#F4EFE6]/60 text-sm hover:text-[#F4EFE6] transition-colors leading-relaxed">
                  {loc.address}
                </a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-1">Phone</p>
                <a href={`tel:${loc.phone}`} className="text-[#F4EFE6]/60 text-sm hover:text-[#F4EFE6] transition-colors">{loc.phone}</a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-1">Email</p>
                <a href={`mailto:${loc.email}`} className="text-[#F4EFE6]/60 text-sm hover:text-[#F4EFE6] transition-colors break-all">{loc.email}</a>
              </div>
              <div>
                <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-2">Follow</p>
                <div className="flex gap-5">
                  <a href={loc.social.instagram} target="_blank" rel="noopener noreferrer"
                    className="text-[#F4EFE6]/40 text-xs uppercase tracking-wider hover:text-[#F4EFE6] transition-colors">Instagram</a>
                  <a href={loc.social.facebook} target="_blank" rel="noopener noreferrer"
                    className="text-[#F4EFE6]/40 text-xs uppercase tracking-wider hover:text-[#F4EFE6] transition-colors">Facebook</a>
                </div>
              </div>
            </FadeIn>

            {/* Hours */}
            <FadeIn direction="none" delay={100}>
              <p className="text-[#F4EFE6]/30 text-[10px] uppercase tracking-[0.2em] mb-5">Hours</p>
              <div className="flex flex-col">
                {loc.hours.map((h, i) => (
                  <div key={h.days} className={`flex items-start justify-between py-3 ${i < loc.hours.length - 1 ? "border-b border-white/10" : ""}`}>
                    <span className="text-[#F4EFE6]/45 text-xs">{h.days}</span>
                    <span className="text-[#F4EFE6]/70 text-xs text-right">{h.time}</span>
                  </div>
                ))}
                {loc.ageNote && (
                  <p className="mt-3 text-[#C8102E] text-[10px] uppercase tracking-[0.12em] font-semibold">
                    * {loc.ageNote}
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
