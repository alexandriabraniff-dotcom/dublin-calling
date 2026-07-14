import Link from "next/link";
import Image from "next/image";

const LOCATIONS = [
  {
    slug: "adelaide",
    label: "Toronto",
    sublabel: "Adelaide St",
    address: "250 Adelaide St. W",
    detail: "20+ Big Screens · Bills Backers Club · Trivia",
  },
  {
    slug: "danforth",
    label: "Toronto",
    sublabel: "Danforth Ave",
    address: "526 Danforth Ave",
    detail: "Pool Tournaments · Trivia Nights · 10+ Screens",
  },
  {
    slug: "vancouver",
    label: "Vancouver",
    sublabel: "Granville St",
    address: "900 Granville St",
    detail: "12+ Taps · Ladies Night · Open Until 3AM",
  },
];

export default function RootPage() {
  return (
    <div className="min-h-dvh bg-[#0F5132] flex flex-col">
      {/* DESIGNER CREDIT BANNER - remove only after client payment */}
      <div className="w-full bg-[#101010] text-[#F4EFE6] text-xs text-center py-1.5 px-4">
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <Image
          src="/logo.png"
          alt="Dublin Calling"
          width={160}
          height={160}
          className="w-32 sm:w-40 h-auto mb-8"
          priority
        />

        <h1
          className="text-[#F4EFE6] text-center leading-tight mb-2"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.8rem, 9vw, 6rem)", letterSpacing: "0.02em" }}
        >
          Dublin Calling
        </h1>
        <p
          className="text-[#F2B035] text-center tracking-[0.25em] mb-16"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(0.75rem, 2vw, 1rem)", fontWeight: 600 }}
        >
          PARTY PUB &amp; KITCHEN
        </p>

        {/* Location cards */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 border border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/${loc.slug}`}
              className="group bg-[#0F5132] hover:bg-[#101010] transition-colors duration-300 p-8 flex flex-col gap-5"
            >
              <div>
                <p
                  className="text-[#F2B035] tracking-[0.2em] mb-1"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600 }}
                >
                  {loc.label}
                </p>
                <h2
                  className="text-[#F4EFE6] leading-tight"
                  style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "0.02em" }}
                >
                  {loc.sublabel}
                </h2>
                <p className="text-[#F4EFE6]/40 text-xs mt-1">{loc.address}</p>
              </div>
              <p className="text-[#169B62] group-hover:text-[#F2B035] text-xs transition-colors leading-relaxed">
                {loc.detail}
              </p>
              <div className="flex items-center gap-2 text-[#F4EFE6]/25 group-hover:text-[#F2B035] transition-colors">
                <span
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em" }}
                >
                  ENTER
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center">
        <p className="text-[#F4EFE6]/20 text-xs">
          &copy; {new Date().getFullYear()} Dublin Calling / MRG Group
        </p>
      </div>
    </div>
  );
}
