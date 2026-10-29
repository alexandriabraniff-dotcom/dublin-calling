import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import GoldFrame from "@/components/GoldFrame";
import type { ExperienceItem } from "@/lib/experience";
import DecorLayer, { type DecorSpot } from "@/components/Decor";

// One column at every width: each photo sits above its write-up.
// decor / mobileDecor: optional decorative drawings per row index, positioned relative to that row
export default function ExperienceList({
  items,
  decor,
  mobileDecor,
}: {
  items: ExperienceItem[];
  decor?: Record<number, DecorSpot[]>;
  mobileDecor?: Record<number, DecorSpot[]>;
}) {
  return (
    <div className="flex flex-col gap-14 md:gap-16 max-w-3xl mx-auto">
      {items.map((item, i) => (
        <FadeIn
          key={item.title}
          delay={i * 100}
          className="relative flex flex-col gap-6"
        >
          {(decor?.[i] || mobileDecor?.[i]) && <DecorLayer spots={decor?.[i]} mobileSpots={mobileDecor?.[i]} />}
          {/* Photo */}
          <GoldFrame className="w-full aspect-[16/10]">
            {item.image ? (
              <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            ) : (
              <div className="w-full h-full bg-[#101010] flex flex-col items-center justify-center gap-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-[#F4EFE6]/70">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <p className="text-[#F4EFE6]/70 text-[11px] uppercase tracking-[0.25em]">Photo Coming Soon</p>
              </div>
            )}
          </GoldFrame>
          {/* Text side */}
          <div className="flex flex-col gap-4 w-full">
            <h3
              className="text-[#F4EFE6] leading-none"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "0.02em" }}
            >
              {item.title}
            </h3>
            <p className="text-[#F4EFE6]/70 text-base md:text-lg leading-relaxed max-w-xl">{item.body}</p>
          </div>

        </FadeIn>
      ))}
    </div>
  );
}
