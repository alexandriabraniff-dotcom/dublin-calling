import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import GoldFrame from "@/components/GoldFrame";
import type { ExperienceItem } from "@/lib/experience";
import DecorLayer, { type DecorSpot } from "@/components/Decor";

// Rows alternate sides on desktop (write-up left / photo right, then the reverse).
// offset shifts the pattern when a row above this list already took the first side.
// decor / mobileDecor: optional decorative drawings per row index, positioned relative to that row
export default function ExperienceList({
  items,
  decor,
  mobileDecor,
  offset = 0,
}: {
  items: ExperienceItem[];
  decor?: Record<number, DecorSpot[]>;
  mobileDecor?: Record<number, DecorSpot[]>;
  offset?: number;
}) {
  return (
    <div className="flex flex-col gap-12 md:gap-14">
      {items.map((item, i) => (
        <FadeIn
          key={item.title}
          delay={i * 100}
          className={`relative flex flex-col md:flex-row md:items-center gap-8 md:gap-12 ${(i + offset) % 2 === 1 ? "md:flex-row-reverse" : ""}`}
        >
          {(decor?.[i] || mobileDecor?.[i]) && <DecorLayer spots={decor?.[i]} mobileSpots={mobileDecor?.[i]} />}
          {/* Text side */}
          <div className="flex flex-col gap-4 w-full md:flex-1">
            <h3
              className="text-[#F2B035] leading-none"
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "0.02em" }}
            >
              {item.title}
            </h3>
            <p className="text-white text-base md:text-lg leading-relaxed max-w-xl">{item.body}</p>
          </div>

          {/* Photo */}
          <GoldFrame className="w-full md:w-[40%] shrink-0 aspect-[16/10]">
            {item.image ? (
              <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
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
        </FadeIn>
      ))}
    </div>
  );
}
