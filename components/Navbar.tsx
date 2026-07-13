"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { LocationSlug } from "@/lib/locations";

const LOCATION_LABELS: Record<LocationSlug, string> = {
  adelaide: "Toronto — Adelaide",
  danforth: "Toronto — Danforth",
  vancouver: "Vancouver",
};

const NAV_LINKS = [
  { href: "", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/world-cup", label: "World Cup" },
  { href: "/group-bookings", label: "Groups" },
  { href: "/faq", label: "FAQ" },
];

interface NavbarProps {
  location: LocationSlug;
}

export default function Navbar({ location }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const base = `/${location}`;

  function isActive(href: string) {
    const full = href === "" ? base : `${base}${href}`;
    return pathname === full;
  }

  return (
    <>
      {/* DESIGNER CREDIT BANNER - remove only after client payment */}
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

      <header className="sticky top-0 z-50 bg-[#101010] border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[60px] gap-6">
          {/* Logo */}
          <Link href={base} aria-label="Dublin Calling home" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Dublin Calling"
              width={44}
              height={44}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href === "" ? base : `${base}${link.href}`}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors rounded-sm ${
                    isActive(link.href)
                      ? "text-[#F2B035]"
                      : "text-[#F4EFE6]/50 hover:text-[#F4EFE6]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Location switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#F4EFE6]/60 hover:text-[#F4EFE6] uppercase tracking-widest transition-colors py-2"
                aria-expanded={locationOpen}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {LOCATION_LABELS[location]}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className={`transition-transform ${locationOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {locationOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-[#0F5132] z-50 border border-white/10">
                  {(["adelaide", "danforth", "vancouver"] as LocationSlug[]).map((slug) => (
                    <Link
                      key={slug}
                      href={`/${slug}`}
                      onClick={() => setLocationOpen(false)}
                      className={`flex items-center gap-2 w-full px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${
                        slug === location
                          ? "text-[#F2B035]"
                          : "text-[#F4EFE6]/70 hover:text-[#F4EFE6] hover:bg-[#169B62]/20"
                      }`}
                    >
                      {LOCATION_LABELS[slug]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px h-4 bg-white/10" />

            {/* Book Now */}
            <a
              href="https://themrggroup.tripleseat.com/dynamic_party_request/528"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-[#F2B035] text-[#101010] text-xs font-bold uppercase tracking-widest hover:bg-[#e0a020] transition-colors"
            >
              Book Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#F4EFE6]/70 p-1.5 hover:text-[#F4EFE6] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#101010]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href === "" ? base : `${base}${link.href}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-6 py-4 text-xs font-semibold uppercase tracking-widest border-b border-white/5 transition-colors ${
                  isActive(link.href) ? "text-[#F2B035]" : "text-[#F4EFE6]/60 hover:text-[#F4EFE6]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile location switcher */}
            <div className="border-b border-white/5">
              {(["adelaide", "danforth", "vancouver"] as LocationSlug[]).map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-xs transition-colors ${
                    slug === location
                      ? "text-[#F2B035] font-bold"
                      : "text-[#F4EFE6]/40 hover:text-[#F4EFE6]"
                  }`}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {LOCATION_LABELS[slug]}
                </Link>
              ))}
            </div>
            <div className="p-4">
              <a
                href="https://themrggroup.tripleseat.com/dynamic_party_request/528"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-[#F2B035] text-[#101010] text-xs font-bold uppercase tracking-widest"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
