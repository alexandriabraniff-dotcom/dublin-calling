"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { LocationSlug } from "@/lib/locations";

const LOCATION_LABELS: Record<LocationSlug, string> = {
  adelaide: "Toronto, Adelaide",
  danforth: "Toronto, Danforth",
  vancouver: "Vancouver",
};

const LEFT_LINKS = [
  { href: "/about",  label: "About"  },
  { href: "/menu",   label: "Menu"   },
  { href: "/events", label: "Events" },
];

const RIGHT_LINKS = [
  { href: "/world-cup",      label: "World Cup"  },
  { href: "/group-bookings", label: "Groups"     },
  { href: "/faq",            label: "FAQ"        },
];

function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]">
      <span className={`block w-5 h-[1.5px] bg-current origin-center transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
      <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
      <span className={`block w-5 h-[1.5px] bg-current origin-center transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
    </div>
  );
}

export default function Navbar({ location }: { location: LocationSlug }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const base = `/${location}`;
  const allLinks = [...LEFT_LINKS, ...RIGHT_LINKS];

  function isActive(href: string) {
    return pathname === `${base}${href}`;
  }

  const linkClass = (href: string) =>
    `font-medium uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${
      isActive(href) ? "text-[#F2B035]" : "text-[#F4EFE6]/55 hover:text-[#F4EFE6]"
    }`;

  return (
    <>
      {/* DESIGNER CREDIT BANNER */}
      <div className="w-full bg-[#101010] text-[#F4EFE6]/40 text-xs text-center py-1.5 px-4">
        Website designed by{" "}
        <a href="https://alexandriabraniff.com" target="_blank" rel="noopener noreferrer"
          className="underline hover:text-[#F2B035] transition-colors">Alexandria Braniff</a>{" "}·{" "}
        <a href="mailto:hello@alexandriabraniff.com"
          className="underline hover:text-[#F2B035] transition-colors">hello@alexandriabraniff.com</a>
      </div>

      {/* ── DESKTOP ── */}
      {/* overflow-visible lets the logo hang below into the hero */}
      <header
        className="hidden md:block sticky top-0 z-50 bg-[#0F5132] border-b border-white/10 overflow-visible"
        style={{ height: "72px" }}
      >
        <div className="relative h-full flex items-center px-8 gap-4">

          {/* Far left — Location picker */}
          <div className="relative shrink-0 z-10">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-1 text-[#F4EFE6]/55 hover:text-[#F4EFE6] uppercase tracking-[0.12em] transition-colors"
              style={{ fontSize: "clamp(10px, 0.85vw, 11px)" }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {LOCATION_LABELS[location]}
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                className={`transition-transform ${locationOpen ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {locationOpen && (
              <div className="absolute left-0 top-full mt-2 w-52 bg-[#101010] border border-white/10 z-50">
                {(["adelaide", "danforth", "vancouver"] as LocationSlug[]).map(s => (
                  <Link key={s} href={`/${s}`} onClick={() => setLocationOpen(false)}
                    className={`flex w-full px-4 py-3 uppercase tracking-[0.12em] transition-colors ${
                      s === location ? "text-[#F2B035]" : "text-[#F4EFE6]/50 hover:text-[#F4EFE6] hover:bg-white/5"
                    }`}
                    style={{ fontSize: "11px" }}>
                    {LOCATION_LABELS[s]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Left nav — flex-1, right-aligned toward logo */}
          <nav className="flex-1 flex items-center justify-end gap-8 pr-6">
            {LEFT_LINKS.map(l => (
              <Link key={l.href} href={`${base}${l.href}`}
                className={linkClass(l.href)}
                style={{ fontSize: "clamp(10px, 0.85vw, 12px)" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo gap — matches logo width so left/right navs balance */}
          <div className="shrink-0" style={{ width: "clamp(100px, 13vw, 150px)" }} />

          {/* Right nav — flex-1, left-aligned away from logo */}
          <nav className="flex-1 flex items-center justify-start gap-8 pl-6">
            {RIGHT_LINKS.map(l => (
              <Link key={l.href} href={`${base}${l.href}`}
                className={linkClass(l.href)}
                style={{ fontSize: "clamp(10px, 0.85vw, 12px)" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Far right — Book Now */}
          <a
            href="https://themrggroup.tripleseat.com/dynamic_party_request/528"
            target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-[#F2B035] text-[#101010] font-semibold uppercase tracking-[0.12em] hover:bg-[#e0a020] transition-colors"
            style={{ fontSize: "clamp(10px, 0.85vw, 12px)", padding: "0.45rem 1.2rem" }}
          >
            Book Now
          </a>

          {/* Centre logo — absolutely positioned, overflows below */}
          <div className="absolute inset-x-0 flex justify-center pointer-events-none" style={{ top: "6px" }}>
            <Link href={base} className="pointer-events-auto relative z-[60]">
              <Image
                src="/logo.png"
                alt="Dublin Calling"
                width={200}
                height={200}
                className="drop-shadow-2xl w-auto"
                style={{ height: "clamp(100px, 13vw, 150px)" }}
                priority
              />
            </Link>
          </div>
        </div>
      </header>

      {/* ── MOBILE ── */}
      <header className="md:hidden sticky top-0 z-50 bg-[#0F5132] border-b border-white/10">
        <div className="flex items-center justify-between px-5 h-[60px]">
          <Link href={base}>
            <Image src="/logo.png" alt="Dublin Calling" width={52} height={52} className="h-12 w-auto" priority />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors"
            aria-label="Toggle menu"
          >
            <Hamburger open={menuOpen} />
          </button>
        </div>

        {menuOpen && (
          <div className="bg-[#0F5132] border-t border-white/10" style={{ animation: "slideDown 0.2s ease forwards" }}>
            {allLinks.map(l => (
              <Link key={l.href} href={`${base}${l.href}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] border-b border-white/8 transition-colors ${
                  isActive(l.href) ? "text-[#F2B035]" : "text-[#F4EFE6]/55 hover:text-[#F4EFE6]"
                }`}>
                {l.label}
              </Link>
            ))}
            {(["adelaide", "danforth", "vancouver"] as LocationSlug[]).map(s => (
              <Link key={s} href={`/${s}`} onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.15em] border-b border-white/8 transition-colors ${
                  s === location ? "text-[#F2B035] font-semibold" : "text-[#F4EFE6]/40 hover:text-[#F4EFE6]"
                }`}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {LOCATION_LABELS[s]}
              </Link>
            ))}
            <div className="p-4">
              <a
                href="https://themrggroup.tripleseat.com/dynamic_party_request/528"
                target="_blank" rel="noopener noreferrer"
                className="block w-full text-center py-3.5 bg-[#F2B035] text-[#101010] font-semibold text-xs uppercase tracking-[0.15em]"
              >
                Book a Table
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
