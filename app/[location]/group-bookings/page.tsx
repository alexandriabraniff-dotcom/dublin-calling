import { notFound } from "next/navigation";
import { getLocation } from "@/lib/locations";

function PhotoPlaceholder({ height = "clamp(200px, 28vw, 320px)" }: { height?: string }) {
  return (
    <div
      className="w-full bg-[#101010] border border-white/10 flex flex-col items-center justify-center gap-3 shrink-0"
      style={{ height }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-[#F4EFE6]/20">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      <p className="text-[#F4EFE6]/20 text-[10px] uppercase tracking-[0.25em]">Photo Coming Soon</p>
    </div>
  );
}

export default async function GroupBookingsPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const occasions = [
    {
      id: "social",
      label: "Group Bookings",
      name: "Social Events",
      highlight: "Any Occasion",
      highlightSub: "We've Got You Covered",
      desc: "Perfect for your next birthday party, bachelorette, or simply getting the crew together. Whatever the occasion, we will set you up with the space, drinks, and screens you need.",
      items: [
        "Reserved seating for your group",
        "Sport of choice on our big screens",
        "Personalised drinks package available",
        "Happy Hour eligible for early arrivals",
      ],
    },
    {
      id: "corporate",
      label: "Group Bookings",
      name: "Team Outings",
      highlight: "Up to 60+",
      highlightSub: "Guests Welcome",
      desc: "Planning your next team outing? Bring the crew together for some games, laughs, and delicious pub eats. We will take care of everything so you can just show up and enjoy.",
      items: [
        "Dedicated floor section for your group",
        "Custom food and drinks package",
        "Private screens for your game or event",
        "Dedicated staff for the evening",
      ],
    },
    {
      id: "private",
      label: "Group Bookings",
      name: "Private Events",
      highlight: "Full Venue",
      highlightSub: "Buyout Available",
      desc: "Let us plan the party for you. With all the fun and games already included, there is not much you need to think about. Our events team will build your perfect night from the ground up.",
      items: [
        "Full or partial venue hire",
        "Custom menu curation",
        "AV and screen setup included",
        "Dedicated events coordinator",
      ],
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F5132] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1
            className="text-[#F4EFE6] mb-4"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            Group Bookings
          </h1>
          <p className="text-[#F4EFE6]/50 text-lg font-light max-w-xl">
            Bring the party here.
          </p>
        </div>
      </section>

      {/* ── INTRO PACKAGE PANEL ── */}
      <section className="bg-[#101010] border-b border-white/10">
        <div className="flex flex-col md:flex-row">

          {/* Placeholder left */}
          <div
            className="md:w-[45%] shrink-0"
            style={{ minHeight: "clamp(280px, 45vh, 560px)" }}
          >
            <PhotoPlaceholder height="100%" />
          </div>

          {/* Content right */}
          <div className="flex-1 px-8 py-14 md:px-14 flex flex-col justify-center gap-6">
            <div>
              <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.25em] mb-3">Every Group Gets</p>
              <h2
                className="text-[#F4EFE6] leading-none"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "0.02em" }}
              >
                The Full Dublin<br />Calling Treatment.
              </h2>
            </div>
            <p className="text-[#F4EFE6]/55 text-sm leading-relaxed max-w-md">
              Get in touch before the day and we will have everything ready when you arrive. Reserved space, cold drinks, and all the games on the screens — exactly how you want it.
            </p>
            <ul className="flex flex-col gap-2.5 border-t border-white/10 pt-5">
              {[
                "Reserved seating guaranteed on arrival",
                "Sport or event of your choice on our screens",
                "Custom food and drinks packages available",
                "Groups of any size welcome — online booking up to 20",
                "Dedicated staff for larger events",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-[#F2B035]" />
                  <span className="text-[#F4EFE6]/65 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full sm:w-auto text-center px-8 py-3 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}
            >
              Book a Table Now
            </a>
          </div>
        </div>
      </section>

      {/* ── OCCASION CARDS — horizontal row ── */}
      <section className="bg-[#101010] py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {occasions.map((o) => (
              <div
                key={o.id}
                className="border border-white/10 hover:border-[#F2B035]/40 transition-colors overflow-hidden shrink-0 snap-start w-[80vw] sm:w-96 lg:w-auto flex flex-col"
              >
                {/* Photo placeholder top */}
                <PhotoPlaceholder height="clamp(180px, 18vw, 240px)" />

                {/* Content */}
                <div className="bg-[#0F5132] p-6 flex flex-col gap-4 flex-1">
                  <p className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-[0.2em]">{o.label}</p>
                  <h3
                    className="text-[#F4EFE6] leading-tight"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", letterSpacing: "0.02em" }}
                  >
                    {o.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[#F2B035]"
                      style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem" }}
                    >
                      {o.highlight}
                    </span>
                    <span className="text-[#F4EFE6]/35 text-[10px] uppercase tracking-wider">{o.highlightSub}</span>
                  </div>
                  <p className="text-[#F4EFE6]/50 text-xs leading-relaxed">{o.desc}</p>
                  <ul className="flex flex-col gap-2 border-t border-white/10 pt-4 flex-1">
                    {o.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="shrink-0 mt-[5px] w-1 h-1 rounded-full bg-[#F2B035]" />
                        <span className="text-[#F4EFE6]/55 text-xs leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:${loc.email}?subject=Group Booking Enquiry`}
                    className="mt-2 block w-full text-center py-3 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0F5132] border-t border-white/10 px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2
              className="text-[#F4EFE6] leading-tight"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em" }}
            >
              Ready to Book<br />Your Group?
            </h2>
            <p className="mt-3 text-[#F4EFE6]/55 text-sm max-w-sm leading-relaxed">
              Email us or call and we will get your group sorted. Include your date, group size, and what you are celebrating.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a href={`tel:${loc.phone}`} className="text-sm text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors">{loc.phone}</a>
              <a href={`mailto:${loc.email}`} className="text-sm text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors">{loc.email}</a>
            </div>
          </div>
          <a
            href={`mailto:${loc.email}?subject=Group Booking Enquiry`}
            className="shrink-0 block w-full sm:w-auto text-center px-12 py-5 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}
          >
            Email Us Now
          </a>
        </div>
      </section>
    </>
  );
}
