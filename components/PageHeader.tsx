import { DecorImg, DESKTOP_SIZE, MOBILE_SIZE, type DecorName } from "@/components/Decor";

/* One header style for every inner page (everything except the homepage): gold location label
   and a centred title with approved illustrations beside it. Most pages get a pair; Menus and
   Book a Table show the clinking beers on their own (client 2026-11-04: no food drawings), with
   an invisible spacer on the left so the title stays centred. The subtitle is the page's
   write-up for search engines: it stays in the HTML (and is read by screen readers) but isn't shown. */

export type HeaderPage = "menu" | "events" | "group-bookings" | "faq" | "book" | "privacy";

// [left, right]; left null = the right drawing on its own
const ICONS: Record<HeaderPage, [DecorName | null, DecorName]> = {
  menu: [null, "beers"],
  events: ["foam-finger", "hockey"],
  "group-bookings": ["jersey", "eight-ball"],
  faq: ["football", "soccer-ball"],
  book: [null, "beers"],
  privacy: ["mma-gloves", "baseball-bat"],
};

// Same size as the drawings on the homepage (phone size below md)
function Icon({ name, rotate, spacer }: { name: DecorName; rotate: number; spacer?: boolean }) {
  return (
    <span className={`shrink-0 ${spacer ? "invisible" : ""}`} aria-hidden="true">
      <DecorImg name={name} size={DESKTOP_SIZE} rotate={rotate} faded={false} className="hidden md:block" />
      <DecorImg name={name} size={MOBILE_SIZE} rotate={rotate} faded={false} className="md:hidden" />
    </span>
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
        {left ? <Icon name={left} rotate={-8} /> : <Icon name={right} rotate={8} spacer />}
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
        <Icon name={right} rotate={8} />
      </div>
    </section>
  );
}
