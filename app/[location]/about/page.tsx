import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getLocation } from "@/lib/locations";
import FadeIn from "@/components/FadeIn";
import ExperienceList from "@/components/ExperienceList";
import { getExperience, getAboutExtras } from "@/lib/experience";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const base = `/${loc.slug}`;

  return (
    <>

      {/* Header */}
      <PageHeader location={loc.name} label="About" title="About Us" subtitle="Your neighbourhood Party Pub & Kitchen. Live sports, cold drinks, and a room full of people who showed up for the same reason you did." />

      {/* Our Story */}
      <section className="bg-[#101010] border-b border-white/10">
        <div className="flex flex-col md:flex-row">
          {/* Photo placeholder */}
          <div
            className="md:w-[45%] shrink-0 bg-[#0a0a0a] border-r border-white/10 flex flex-col items-center justify-center gap-3"
            style={{ minHeight: "clamp(220px, 30vw, 480px)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-[#F4EFE6]/70">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.25em]">Photo Coming Soon</p>
          </div>

          {/* Text */}
          <div className="flex-1 px-6 py-10 md:py-16 md:px-12 flex flex-col justify-center gap-4 md:gap-6">
            <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.25em]">
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
              <p className="text-[#F4EFE6]/80 text-sm leading-relaxed">
                Dublin Calling is a Party Pub &amp; Kitchen built around one
                idea: a great night out should have everything under one roof.
                Cold pints, live sport on big screens, food worth ordering, and
                a crowd worth being around.
              </p>
              <p className="text-[#F4EFE6]/80 text-sm leading-relaxed">
                Part of the MRG Group family, we operate locations in Toronto
                and Vancouver, each with its own character, its own regular
                crowd, and its own reason to come back. Whether you&apos;re
                here for the game, the trivia, the happy hour, or just because
                it&apos;s Tuesday and you want a pint, this is your pub.
              </p>
              <p className="text-[#F4EFE6]/80 text-sm leading-relaxed">
                The {loc.name} location sits at{" "}
                <span className="text-[#F4EFE6]/85">{loc.address}</span>.{" "}
                {loc.heroTagline} Pull up a stool and stay a while.
              </p>
            </div>
            <Link
              href={`${base}/events`}
              className="btn block w-full sm:w-auto text-center px-8 py-3 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* The Experience — same content as the homepage section */}
      <section className="bg-[#0F5132] border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.25em]">The Experience</p>
          </FadeIn>
          <ExperienceList items={[...getExperience(loc), ...getAboutExtras(loc)]} />
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
            <p className="mt-3 text-[#F4EFE6]/75 text-sm max-w-sm leading-relaxed">
              We handle everything. Tables, screens, food and drink packages
              Get in touch and we&apos;ll take care of the rest.
            </p>
          </div>
          <Link
            href={`${base}/group-bookings`}
            className="btn shrink-0 block w-full sm:w-auto text-center px-10 py-4 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors"
          >
            Group Bookings
          </Link>
        </div>
      </section>
    </>
  );
}
