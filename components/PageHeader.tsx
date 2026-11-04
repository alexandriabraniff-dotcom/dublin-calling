/* One header style for every inner page (everything except the homepage): gold location label
   and a centred title with an illustration on each side. Each page gets its own pair (Menus:
   burger + clinking beers, and so on). The subtitle is the page's write-up for search engines:
   it stays in the HTML (and is read by screen readers) but isn't shown. */

export type HeaderPage = "menu" | "events" | "group-bookings" | "faq" | "book" | "privacy";

const ICONS: Record<HeaderPage, [string, string]> = {
  menu: ["burger", "beers"],
  events: ["foam-finger", "hockey"],
  "group-bookings": ["wings", "eight-ball"],
  faq: ["football", "soccer-ball"],
  book: ["wings", "beers"],
  privacy: ["mma-gloves", "baseball-bat"],
};

function Icon({ name, flip }: { name: string; flip?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/decor/${name}.webp`}
      alt=""
      aria-hidden="true"
      className="shrink-0 h-auto select-none pointer-events-none opacity-90"
      style={{ width: "clamp(64px, 11vw, 150px)", transform: `rotate(${flip ? 8 : -8}deg)` }}
    />
  );
}

export default function PageHeader({
  location,
  label,
  title,
  subtitle,
  page,
}: {
  location: string;
  label: string;
  title: string;
  subtitle?: string;
  page: HeaderPage;
}) {
  const [left, right] = ICONS[page];
  return (
    <section className="relative isolate overflow-x-clip bg-[#0F5132] border-b border-white/10 pt-10 pb-10 md:pt-12 md:pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 sm:gap-8 md:gap-12">
        <Icon name={left} />
        <div className="min-w-0 text-center">
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
          {subtitle && <p className="sr-only">{subtitle}</p>}
        </div>
        <Icon name={right} flip />
      </div>
    </section>
  );
}
