import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import GoldFrame from "@/components/GoldFrame";
import ExperienceList from "@/components/ExperienceList";
import DecorLayer from "@/components/Decor";
import { getExperience } from "@/lib/experience";
import type { Location } from "@/lib/locations";

/* Homepage About section (replaces the old About page): Our Story, then the venue rows */
export default function AboutSection({ location }: { location: Location }) {
  return (
    <section id="about" className="relative isolate overflow-x-clip bg-[#101010] border-t border-white/10 py-16 md:py-20 scroll-mt-[72px]">
      <DecorLayer mobileSpots={[{ name: "basketball", x: 88, y: "34px", rotate: -10, scale: 0.6 }]} />
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 mb-16 md:mb-20">
          <div className="flex flex-col gap-4 md:gap-5 w-full md:flex-1">
            <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.25em]">About Us</p>
            <h2
              className="text-[#F2B035] leading-none"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
            >
              Party Pub &amp; Kitchen.
            </h2>
            <div className="flex flex-col gap-4 max-w-xl">
              <p className="text-white text-base leading-relaxed">
                Dublin Calling is a Party Pub &amp; Kitchen built around one idea: a great night out should have
                everything under one roof. Cold pints, live sports on big screens, food worth ordering, and a crowd
                worth being around.
              </p>
              <p className="text-white text-base leading-relaxed">
                Part of The MRG Group family, we operate locations in Toronto and Vancouver, each with its own
                character, its own regular crowd, and its own reason to come back. Whether you&apos;re here for the
                game, the trivia, the happy hour, or just because it&apos;s Tuesday and you want a pint, this is your pub.
              </p>
            </div>
          </div>
          <GoldFrame className="w-full md:w-[42%] shrink-0 aspect-[16/10]">
            <Image src="/group-social.jpg" alt={`A crowd out together at Dublin Calling ${location.name}`} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />
          </GoldFrame>
        </FadeIn>

        <ExperienceList
          items={getExperience(location)}
          offset={1} // Our Story above has the write-up on the left, so the first row flips
          decor={{
            0: [
              { name: "basketball", x: 50, y: "-64px", rotate: -10, scale: 0.75 }, // between Our Story and the first row
              { name: "foam-finger", x: 50, y: "calc(100% + 80px)", rotate: 10, scale: 0.8 },
            ],
            1: [{ name: "soccer-ball", x: 94, y: "calc(100% + 40px)", rotate: -8, scale: 0.85 }],
            2: [{ name: "jersey", x: 8, y: "calc(100% + 30px)", rotate: 8, scale: 0.9 }],
          }}
          mobileDecor={{
            0: [{ name: "foam-finger", x: 86, y: "calc(100% + 24px)", rotate: 10, scale: 0.6 }],
            1: [{ name: "soccer-ball", x: 14, y: "calc(100% + 24px)", rotate: -8, scale: 0.55 }],
          }}
        />
      </div>
    </section>
  );
}
