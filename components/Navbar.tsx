"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { LocationSlug } from "@/lib/locations";

const LOCATION_LABELS: Record<LocationSlug, string> = {
  adelaide: "Toronto, Adelaide",
  danforth: "Toronto, Danforth",
  vancouver: "Vancouver",
};

const LEFT_LINKS = [
  { href: "#about",  label: "About"  }, // homepage About section
  { href: "/menu",   label: "Menus"  },
  { href: "/events", label: "Events" },
];

const RIGHT_LINKS = [
  { href: "/group-bookings", label: "Group Bookings" },
  { href: "#find-us",        label: "Find Us"        }, // homepage footer (contact, hours and map), from any page
  { href: "/faq",            label: "FAQ"            },
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
  const [logoSmall, setLogoSmall] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  // Escape closes open menus; clicking outside closes the location picker
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLocationOpen(false); setMenuOpen(false); }
    };
    const onClick = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) setLocationOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Shrink the desktop logo once 85% of the hero (first section) has scrolled under the header
  useEffect(() => {
    const HEADER_H = 72;
    const update = () => {
      const hero = document.querySelector("section");
      if (!hero) return setLogoSmall(window.scrollY > HEADER_H);
      const rect = hero.getBoundingClientRect();
      setLogoSmall(HEADER_H - rect.top >= rect.height * 0.85);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  const base = `/${location}`;
  // On the homepage the hero already shows the big logo below lg, so the header logo waits until the hero scrolls away
  const hideMobileLogo = pathname === base && !logoSmall;
  const allLinks = [...LEFT_LINKS, ...RIGHT_LINKS];

  function isActive(href: string) {
    return pathname === `${base}${href}`;
  }

  const linkClass = (href: string) =>
    `font-medium uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${
      isActive(href) ? "text-[#F2B035]" : "text-[#F4EFE6]/75 hover:text-[#F4EFE6]"
    }`;

  return (
    <>
      {/* ── DESKTOP ── */}
      {/* overflow-visible lets the logo hang below into the hero */}
      <header
        className="hidden lg:block sticky top-0 z-50 bg-[#0F5132] border-b border-white/10 overflow-visible"
        style={{ height: "72px" }}
      >
        {/* Three columns: equal 1fr sides around the logo gap, so the logo sits dead centre and
            Events / Group Bookings are the same distance from it */}
        <div className="relative h-full grid grid-cols-[1fr_auto_1fr] items-center px-8">

          {/* Left: location picker, then the left links hugging the logo */}
          <div className="flex items-center justify-between gap-4 min-w-0">
            <div ref={locationRef} className="relative shrink-0 z-10">
              {/* Clear, boxed location switch so visitors notice which venue they're viewing */}
              <button
                type="button"
                onClick={() => setLocationOpen(!locationOpen)}
                aria-expanded={locationOpen}
                aria-controls="location-menu"
                aria-label={`Location: ${LOCATION_LABELS[location]}. Change location`}
                className="flex items-center gap-2 border-2 border-[#F2B035] px-3 py-1.5 text-left text-[#F4EFE6] hover:bg-[#F2B035] hover:text-[#101010] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.18em] opacity-80">Location</span>
                  <span className="uppercase tracking-[0.08em] font-bold" style={{ fontSize: "clamp(11px, 0.95vw, 13px)" }}>{LOCATION_LABELS[location]}</span>
                </span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  className={`shrink-0 transition-transform ${locationOpen ? "rotate-180" : ""}`} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {locationOpen && (
                <div id="location-menu" className="absolute left-0 top-full mt-2 w-52 bg-[#101010] border border-white/10 z-50">
                  {(["adelaide", "danforth", "vancouver"] as LocationSlug[]).map(s => (
                    <Link key={s} href={`/${s}`} onClick={() => setLocationOpen(false)}
                      aria-current={s === location ? "page" : undefined}
                      className={`flex w-full px-4 py-3 uppercase tracking-[0.12em] transition-colors ${
                        s === location ? "text-[#F2B035]" : "text-[#F4EFE6]/75 hover:text-[#F4EFE6] hover:bg-white/5"
                      }`}
                      style={{ fontSize: "11px" }}>
                      {LOCATION_LABELS[s]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <nav className="flex items-center gap-8 pr-10">
              {LEFT_LINKS.map(l => (
                <Link key={l.href} href={`${base}${l.href}`}
                  className={linkClass(l.href)}
                  style={{ fontSize: "clamp(10px, 0.85vw, 12px)" }}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logo gap: matches the logo width */}
          <div style={{ width: "clamp(100px, 13vw, 150px)" }} />

          {/* Right: the right links hugging the logo, then Book a Table */}
          <div className="flex items-center justify-between gap-4 min-w-0">
            <nav className="flex items-center gap-8 pl-10">
              {RIGHT_LINKS.map(l => (
                <Link key={l.href} href={`${base}${l.href}`}
                  className={linkClass(l.href)}
                  style={{ fontSize: "clamp(10px, 0.85vw, 12px)" }}>
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Far right — Book a Table */}
            <Link
              href={`${base}/book-a-table`}
              className="shrink-0 bg-[#F2B035] text-[#101010] font-semibold uppercase tracking-[0.12em] hover:bg-[#e0a020] transition-colors"
              style={{ fontSize: "clamp(10px, 0.85vw, 12px)", padding: "0.45rem 1.2rem" }}
            >
              Book a Table
            </Link>
          </div>

          {/* Centre logo — absolutely positioned, overflows below */}
          <div className="absolute inset-x-0 flex justify-center pointer-events-none" style={{ top: "6px" }}>
            <Link href={base} className="pointer-events-auto relative z-[60]">
              <Image
                src="/logo.png"
                alt="Dublin Calling"
                width={200}
                height={200}
                className="drop-shadow-2xl w-auto transition-[height] duration-300 ease-out"
                style={{ height: logoSmall ? "60px" : "clamp(100px, 13vw, 150px)" }}
                priority
              />
            </Link>
          </div>
        </div>
      </header>

      {/* ── MOBILE ── */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#0F5132] border-b border-white/10">
        <div className="flex items-center justify-between px-5 h-[60px]">
          <Link
            href={base}
            aria-hidden={hideMobileLogo || undefined}
            tabIndex={hideMobileLogo ? -1 : undefined}
            className={`transition-opacity duration-300 ${hideMobileLogo ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <Image src="/logo.png" alt="Dublin Calling" width={52} height={52} className="h-12 w-auto" priority />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={`Location: ${LOCATION_LABELS[location]}. Change location`}
              className="flex items-center gap-1.5 border-2 border-[#F2B035] px-2.5 py-1.5 text-[#F4EFE6] text-[11px] uppercase tracking-[0.1em] font-bold"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {LOCATION_LABELS[location]}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-3 -mr-3 text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Hamburger open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Main" className="bg-[#0F5132] border-t border-white/10" style={{ animation: "slideDown 0.2s ease forwards" }}>
            {allLinks.map(l => (
              <Link key={l.href} href={`${base}${l.href}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] border-b border-white/8 transition-colors ${
                  isActive(l.href) ? "text-[#F2B035]" : "text-[#F4EFE6]/75 hover:text-[#F4EFE6]"
                }`}>
                {l.label}
              </Link>
            ))}
            {(["adelaide", "danforth", "vancouver"] as LocationSlug[]).map(s => (
              <Link key={s} href={`/${s}`} onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.15em] border-b border-white/8 transition-colors ${
                  s === location ? "text-[#F2B035] font-semibold" : "text-[#F4EFE6]/70 hover:text-[#F4EFE6]"
                }`}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {LOCATION_LABELS[s]}
              </Link>
            ))}
            <div className="p-4">
              <Link
                href={`${base}/book-a-table`}
                onClick={() => setMenuOpen(false)}
                className="btn block w-full text-center py-3.5 bg-[#F2B035] text-[#101010] font-semibold text-xs uppercase tracking-[0.15em]"
              >
                Book a Table
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
