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
  { href: "/group-bookings", label: "Group Bookings" },
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

      <header className="sticky top-0 z-50 bg-[#101010] border-b border-[#0F5132]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={base}
            className="flex items-center shrink-0"
            aria-label="Dublin Calling home"
          >
            <Image
              src="/logo.png"
              alt="Dublin Calling — Party Pub & Kitchen"
              width={56}
              height={56}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href === "" ? base : `${base}${link.href}`}
                  className={`px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                    isActive(link.href)
                      ? "text-[#F2B035]"
                      : "text-[#F4EFE6] hover:text-[#169B62]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Location switcher + Book Now */}
          <div className="flex items-center gap-3">
            {/* Location switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-2 text-sm font-medium text-[#F4EFE6] bg-[#0F5132] hover:bg-[#169B62] px-3 py-1.5 rounded transition-colors"
                aria-expanded={locationOpen}
                aria-haspopup="listbox"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {LOCATION_LABELS[location]}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${locationOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {locationOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-[#0F5132] border border-[#169B62] rounded shadow-xl z-50">
                  {(["adelaide", "danforth", "vancouver"] as LocationSlug[]).map(
                    (slug) => (
                      <Link
                        key={slug}
                        href={`/${slug}`}
                        onClick={() => setLocationOpen(false)}
                        className={`flex items-center gap-2 w-full px-4 py-3 text-sm transition-colors ${
                          slug === location
                            ? "text-[#F2B035] font-semibold"
                            : "text-[#F4EFE6] hover:bg-[#169B62]"
                        }`}
                      >
                        {slug === location && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <circle cx="12" cy="12" r="6" />
                          </svg>
                        )}
                        {LOCATION_LABELS[slug]}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Book Now CTA */}
            <a
              href="https://themrggroup.tripleseat.com/dynamic_party_request/528"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-1.5 bg-[#F2B035] text-[#101010] text-sm font-bold rounded hover:bg-[#e0a020] transition-colors"
            >
              Book Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#F4EFE6] p-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0F5132] border-t border-[#169B62]">
            <ul className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href === "" ? base : `${base}${link.href}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                      isActive(link.href)
                        ? "text-[#F2B035] bg-[#101010]"
                        : "text-[#F4EFE6] hover:bg-[#101010]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Mobile location switcher */}
            <div className="px-4 pb-4 space-y-1 border-t border-[#169B62] pt-3">
              <p className="text-xs text-[#F4EFE6] opacity-60 uppercase tracking-wider mb-2">
                Switch Location
              </p>
              {(["adelaide", "danforth", "vancouver"] as LocationSlug[]).map(
                (slug) => (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2 text-sm rounded transition-colors ${
                      slug === location
                        ? "text-[#F2B035] font-semibold"
                        : "text-[#F4EFE6] hover:bg-[#101010]"
                    }`}
                  >
                    {LOCATION_LABELS[slug]}
                  </Link>
                )
              )}
            </div>
            <div className="px-4 pb-4">
              <a
                href="https://themrggroup.tripleseat.com/dynamic_party_request/528"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2.5 bg-[#F2B035] text-[#101010] text-sm font-bold rounded hover:bg-[#e0a020] transition-colors"
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
