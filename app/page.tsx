import Link from "next/link";
import Image from "next/image";

const LOCATIONS = [
  {
    slug: "adelaide",
    name: "Adelaide",
    label: "Toronto",
    address: "250 Adelaide St. W",
    hours: "Mon–Fri from 3PM · Sat–Sun from 12PM",
    highlight: "20+ Big Screens · Bills Backers Club",
  },
  {
    slug: "danforth",
    name: "Danforth",
    label: "Toronto",
    address: "526 Danforth Ave",
    hours: "Mon–Fri from 3PM · Sat–Sun from 12PM",
    highlight: "Pool Tournaments · Trivia Nights",
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    label: "Granville St",
    address: "900 Granville St",
    hours: "Daily from 12PM · Open until 3AM Fri–Sat",
    highlight: "12+ Taps · Open Until 3AM",
  },
];

export default function RootPage() {
  return (
    <div className="min-h-dvh bg-[#101010] flex flex-col">
      {/* Top strip */}
      <div className="w-full bg-[#0F5132] text-[#F4EFE6] text-xs text-center py-1.5 px-4">
        Website designed by{" "}
        <a
          href="https://alexandriabraniff.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-[#F2B035] transition-colors"
        >
          Alexandria Braniff
        </a>{" "}
        —{" "}
        <a
          href="mailto:hello@alexandriabraniff.com"
          className="underline hover:text-[#F2B035] transition-colors"
        >
          hello@alexandriabraniff.com
        </a>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-10">
        <Image
          src="/logo.png"
          alt="Dublin Calling"
          width={140}
          height={140}
          className="w-28 sm:w-36 h-auto mb-8"
          priority
        />
        <p className="text-[#F4EFE6] text-xs font-semibold uppercase tracking-[0.3em] mb-3 opacity-50">
          Three Locations
        </p>
        <h1
          className="text-[#F4EFE6] text-center leading-none mb-2"
          style={{
            fontFamily: "'Lobster Two', cursive",
            fontSize: "clamp(3.5rem, 12vw, 8rem)",
          }}
        >
          Choose Your Pub
        </h1>
        <p className="text-[#F4EFE6] opacity-40 text-sm tracking-widest uppercase mb-16">
          Party Pub &amp; Kitchen
        </p>

        {/* Location cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1a1a1a]">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/${loc.slug}`}
              className="group bg-[#101010] hover:bg-[#0F5132] transition-colors duration-300 p-8 sm:p-10 flex flex-col gap-6"
            >
              <div>
                <p className="text-[#F2B035] text-xs font-bold uppercase tracking-[0.25em] mb-3">
                  {loc.label}
                </p>
                <h2
                  className="text-[#F4EFE6] leading-none mb-2"
                  style={{
                    fontFamily: "'Lobster Two', cursive",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  }}
                >
                  {loc.name}
                </h2>
                <p className="text-[#F4EFE6] opacity-50 text-sm">{loc.address}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[#F4EFE6] opacity-40 text-xs">{loc.hours}</p>
                <p className="text-[#169B62] text-xs font-semibold group-hover:text-[#F2B035] transition-colors">
                  {loc.highlight}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#F4EFE6] opacity-30 group-hover:opacity-100 group-hover:text-[#F2B035] transition-all text-xs font-bold uppercase tracking-widest">
                Enter
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a1a1a] px-6 py-4 text-center">
        <p className="text-[#F4EFE6] opacity-20 text-xs">
          &copy; {new Date().getFullYear()} Dublin Calling / MRG Group
        </p>
      </div>
    </div>
  );
}
