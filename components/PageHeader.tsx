/* One header style for every inner page (everything except the homepage),
   based on the Events page: gold location label, title, optional short line. */
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
    <section className="bg-[#0F5132] border-b border-white/10 pt-14 pb-10 md:pt-16 md:pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <p
          className="text-[#F2B035] mb-3 uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.3em" }}
        >
          {location}
          <span aria-hidden="true">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span className="sr-only">, </span>
          {label}
        </p>
        <h1
          className="text-[#F4EFE6] leading-none"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", letterSpacing: "0.02em" }}
        >
          {title}
        </h1>
        {subtitle && <p className="text-[#F4EFE6]/80 text-sm md:text-base max-w-xl leading-relaxed mt-3">{subtitle}</p>}
      </div>
    </section>
  );
}
