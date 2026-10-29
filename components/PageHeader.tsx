import DecorLayer from "@/components/Decor";

/* One header style for every inner page (everything except the homepage),
   based on the Events page: gold location label, title, optional short line,
   and the MMA gloves + baseball and bat drawings in the open space on the right. */
export default function PageHeader({
  location,
  label,
  title,
  subtitle,
}: {
  location: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-x-clip bg-[#0F5132] border-b border-white/10 pt-14 pb-10 md:pt-16 md:pb-12 px-6">
      <DecorLayer
        spots={[
          { name: "baseball-bat", x: 76, y: "55%", rotate: -14, scale: 0.95 },
          { name: "mma-gloves", x: 91, y: "50%", rotate: 8, scale: 0.85 },
        ]}
        mobileSpots={[{ name: "mma-gloves", x: 87, y: "38px", rotate: 8, scale: 0.55 }]}
      />
      <div className="max-w-5xl mx-auto">
        <p
          className="text-[#F2B035] mb-3 uppercase"
          style={{ fontFamily: "var(--font-label)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.3em" }}
        >
          {location}
          <span aria-hidden="true">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span className="sr-only">, </span>
          {label}
        </p>
        <h1
          className="text-[#F4EFE6] leading-none"
          style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", letterSpacing: "0.02em" }}
        >
          {title}
        </h1>
        {subtitle && <p className="text-[#F4EFE6]/80 text-sm md:text-base max-w-xl leading-relaxed mt-3">{subtitle}</p>}
      </div>
    </section>
  );
}
