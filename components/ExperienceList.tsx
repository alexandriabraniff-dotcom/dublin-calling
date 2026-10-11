import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import GoldFrame from "@/components/GoldFrame";
import type { ExperienceItem } from "@/lib/experience";

export default function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="flex flex-col gap-12 md:gap-14">
      {items.map((item, i) => (
        <FadeIn
          key={item.title}
          delay={i * 100}
          className={`flex flex-col md:flex-row md:items-center gap-8 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
        >
          {/* Text side */}
          <div className="flex flex-col gap-4 w-full md:flex-1">
            <h3
              className="text-[#F4EFE6] leading-none"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "0.02em" }}
            >
              {item.title}
            </h3>
            <p className="text-[#F4EFE6]/70 text-base md:text-lg leading-relaxed max-w-xl">{item.body}</p>
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
