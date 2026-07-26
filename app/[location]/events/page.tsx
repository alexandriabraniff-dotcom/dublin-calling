import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getLocation } from "@/lib/locations";
import FadeIn from "@/components/FadeIn";

type TagColor = "red" | "gold" | "green" | "default";

const EVENT_DATA: Record<
  string,
  {
    day: string;
    name: string;
    description: string;
    details: string[];
    tag: string;
    tagColor: TagColor;
    image?: string;
    ticketUrl?: string;
  }[]
> = {
  adelaide: [
    {
      day: "Every Sunday",
      name: "Bills Backers Watch Party",
      description:
        "The official Buffalo Bills fan chapter in Toronto. Show up, represent, and watch every game with the loudest Bills fans in the city. Drink specials run all game long.",
      details: [
        "Official Buffalo Bills fan chapter",
        "Every game day",
        "Drink specials all game",
        "Best seat in the house for Bills fans",
      ],
      tag: "NFL",
      tagColor: "gold",
    },
    {
      day: "Every Monday",
      name: "Trivia Night",
      description:
        "Think you know everything? Prove it. Hosted by TriviaTO every Monday night. Grab your table, form your team, and get competitive for prizes.",
      details: [
        "Hosted by TriviaTO",
        "Doors at 7:00 PM",
        "Prizes for top table",
        "Free to enter",
      ],
      tag: "Weekly",
      tagColor: "default",
    },
    {
      day: "Fight Nights",
      name: "UFC Live",
      description:
        "Every UFC card, every fight night, live on 20+ big screens. The atmosphere at Dublin Calling Adelaide on fight night is unmatched. Come early — best seats go fast.",
      details: [
        "Every card live",
        "20+ big screens",
        "Come early for best seats",
        "Fight night drink specials",
      ],
      tag: "UFC",
      tagColor: "red",
    },
    {
      day: "Sun to Fri, 4–6 PM",
      name: "Happy Hour",
      description:
        "Six days a week, every week. Discounted draught, cocktails, and more — the perfect way to kick off your evening before the main event.",
      details: [
        "4:00 PM to 6:00 PM",
        "Discounted drinks all week",
        "Draught, cocktails and more",
        "Sunday through Friday",
      ],
      tag: "Daily",
      tagColor: "green",
    },
  ],
  danforth: [
    {
      day: "Every Monday",
      name: "Pool Tournament",
      description:
        "Open to all skill levels. Sign in by 7 PM and compete for bragging rights and prizes on our full-size tables. Whether you're a shark or a rookie — everyone's welcome.",
      details: [
        "Sign in by 7:00 PM",
        "Open to all skill levels",
        "Prizes for winners",
        "Free to enter",
      ],
      tag: "Weekly",
      tagColor: "default",
    },
    {
      day: "Every Tuesday",
      name: "Trivia Night",
      description:
        "Think you know everything? Prove it. Hosted by TriviaTO every Tuesday on the main floor. Get a team together and compete for top-table prizes.",
      details: [
        "Hosted by TriviaTO",
        "Main floor, 7:00 PM",
        "Prizes for top table",
        "Free to enter",
      ],
      tag: "Weekly",
      tagColor: "default",
    },
    {
      day: "Fight Nights",
      name: "UFC Live",
      description:
        "Every UFC card on our big screens. The energy at Dublin Calling Danforth on fight night is something else — come find out for yourself.",
      details: [
        "Every card live on our big screens",
        "Come early for best seats",
        "Fight night drink specials",
      ],
      tag: "UFC",
      tagColor: "red",
    },
    {
      day: "Sun to Fri, 4–6 PM",
      name: "Happy Hour",
      description:
        "Six days a week, every week. Discounted draught, cocktails, and more. The perfect way to start your evening at the Danforth.",
      details: [
        "4:00 PM to 6:00 PM",
        "Discounted drinks daily",
        "Draught, cocktails and more",
        "Sunday through Friday",
      ],
      tag: "Daily",
      tagColor: "green",
    },
  ],
  vancouver: [
    {
      day: "Aug 15, 6:00 PM",
      name: "UFC 330",
      description:
        "One of the biggest cards of the year. Makhachev defends the lightweight title against Machado Garry — watch every round live at Dublin Calling Vancouver on every screen in the house. VIP table packages available.",
      details: [
        "Makhachev vs Machado Garry",
        "Doors open at 6:00 PM",
        "VIP table packages available",
        "15 screens throughout the venue",
      ],
      tag: "UFC",
      tagColor: "red",
      image: "/ufc-330.jpg",
    },
    {
      day: "Every Friday, 8 PM",
      name: "Ladies Night",
      description:
        "Every Friday from 8 PM till late. Live DJ spinning all night, $6.95 Vodka Highballs, and the best crowd on Granville Street. Get your tickets in advance — this one fills up fast.",
      details: [
        "Every Friday, 8PM till late",
        "Live DJ all night",
        "$6.95 Vodka Highballs",
        "Tickets via AdmitOne",
      ],
      tag: "Event",
      tagColor: "gold",
      image: "/ladies-night.jpg",
      ticketUrl:
        "https://admitone.com/events/vancouver/community/party/ladies-night/RQMN6R?referral=website",
    },
  ],
};

function tagStyle(color: TagColor) {
  if (color === "red")   return "bg-[#C8102E] text-white";
  if (color === "gold")  return "bg-[#F2B035] text-[#101010]";
  if (color === "green") return "border border-[#169B62] text-[#169B62]";
  return "border border-white/20 text-[#F4EFE6]/50";
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const base = `/${loc.slug}`;
  const events = EVENT_DATA[loc.slug] ?? [];

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[#0F5132] border-b border-white/10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p
              className="text-[#F2B035] mb-4"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
              }}
            >
              {loc.name.toUpperCase()} &nbsp;·&nbsp; EVENTS
            </p>
            <h1
              className="text-[#F4EFE6] leading-none mb-4"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                letterSpacing: "0.02em",
              }}
            >
              What&apos;s On
            </h1>
            <p className="text-[#F4EFE6]/50 text-sm max-w-md leading-relaxed">
              Live sport, weekly events, and nights you won&apos;t forget.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section className="bg-[#101010] py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          {events.map((event, i) => (
            <FadeIn key={event.name} direction="none" delay={i * 80}>
              <div className="border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* Image or placeholder */}
                {event.image ? (
                  <div className="relative w-full aspect-[16/9] md:aspect-auto md:min-h-[340px]">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>
                ) : (
                  <div className="hidden md:flex items-center justify-center bg-[#0d0d0d] border-r border-white/10 min-h-[340px]">
                    <span
                      className="text-[#F4EFE6]/6 font-black uppercase"
                      style={{ fontFamily: "'Oswald', sans-serif", fontSize: "6rem", letterSpacing: "0.05em" }}
                      aria-hidden
                    >
                      {event.tag}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-between p-8 md:p-10 bg-[#0a0a0a]">
                  <div>
                    {/* Tag + day */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span
                        className={`inline-block px-2.5 py-0.5 uppercase tracking-widest ${tagStyle(event.tagColor)}`}
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: "0.58rem",
                          fontWeight: 700,
                        }}
                      >
                        {event.tag}
                      </span>
                      <span
                        className="text-[#F4EFE6]/35 uppercase tracking-[0.18em]"
                        style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.58rem" }}
                      >
                        {event.day}
                      </span>
                    </div>

                    {/* Name */}
                    <h2
                      className="text-[#F4EFE6] mb-4"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                        letterSpacing: "0.02em",
                        lineHeight: 1.1,
                      }}
                    >
                      {event.name}
                    </h2>

                    {/* Description */}
                    <p className="text-[#F4EFE6]/50 text-sm leading-relaxed mb-7">
                      {event.description}
                    </p>

                    {/* Detail list */}
                    <ul className="flex flex-col gap-2.5 mb-9">
                      {event.details.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-xs text-[#F4EFE6]/40">
                          <span className="text-[#F2B035] mt-[1px] shrink-0">—</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    {event.ticketUrl ? (
                      <a
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#F2B035] text-[#101010] font-semibold uppercase tracking-[0.15em] hover:bg-[#e0a020] transition-colors"
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: "clamp(11px, 1vw, 13px)",
                          padding: "0.75rem 2rem",
                        }}
                      >
                        Get Tickets
                      </a>
                    ) : null}
                    <Link
                      href={`${base}/book-a-table`}
                      className="inline-block border border-white/20 text-[#F4EFE6]/60 uppercase tracking-[0.15em] hover:border-white/40 hover:text-[#F4EFE6] transition-colors"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: "clamp(11px, 1vw, 13px)",
                        padding: "0.75rem 2rem",
                      }}
                    >
                      Book a Table
                    </Link>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
