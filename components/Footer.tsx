import Link from "next/link";
import Image from "next/image";
import type { Location } from "@/lib/locations";

const NAV_LINKS = [
  { href: "", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/world-cup", label: "World Cup 2026" },
  { href: "/group-bookings", label: "Group Bookings" },
  { href: "/faq", label: "FAQ" },
];

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

interface FooterProps {
  location: Location;
}

export default function Footer({ location }: FooterProps) {
  const base = `/${location.slug}`;

  return (
    <footer className="bg-[#101010] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 items-start">

          {/* Col 1 — Navigate + Locations */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[#F4EFE6]/30 mb-1"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em" }}
            >
              NAVIGATE
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href === "" ? base : `${base}${link.href}`}
                className="text-[#F4EFE6]/50 text-xs hover:text-[#F4EFE6] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <p
              className="text-[#F4EFE6]/30 mt-5 mb-1"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em" }}
            >
              LOCATIONS
            </p>
            {[
              { slug: "adelaide", label: "Toronto, Adelaide" },
              { slug: "danforth", label: "Toronto, Danforth" },
              { slug: "vancouver", label: "Vancouver" },
            ].map((loc) => (
              <Link
                key={loc.slug}
                href={`/${loc.slug}`}
                className={`text-xs transition-colors ${
                  loc.slug === location.slug
                    ? "text-[#F2B035]"
                    : "text-[#F4EFE6]/50 hover:text-[#F4EFE6]"
                }`}
              >
                {loc.label}
              </Link>
            ))}
          </div>

          {/* Col 2 — Social + Logo + Legal */}
          <div className="flex flex-col items-center gap-5 text-center">
            {/* Social icons */}
            <div className="flex items-center gap-5">
              <a
                href={location.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#F4EFE6]/40 hover:text-[#F4EFE6] transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href={location.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#F4EFE6]/40 hover:text-[#F4EFE6] transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>

            {/* Logo — large, centred, same treatment as Yale */}
            <Link href={base}>
              <Image
                src="/logo.png"
                alt="Dublin Calling"
                width={200}
                height={200}
                className="object-contain w-auto"
                style={{ height: "clamp(7rem, 14vw, 11rem)" }}
              />
            </Link>

            {/* Legal notice */}
            <p className="text-[#F4EFE6]/25 text-[10px] leading-relaxed">
              You must be of legal drinking age to purchase alcohol.<br />
              Valid Photo ID required.
            </p>

            {/* Privacy */}
            <a
              href="https://www.themrggroup.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4EFE6]/25 hover:text-[#F4EFE6]/50 transition-colors uppercase tracking-widest"
              style={{ fontSize: "0.6rem" }}
            >
              Privacy Policy
            </a>
          </div>

          {/* Col 3 — Contact (right-aligned) */}
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <p
              className="text-[#F4EFE6]/30 mb-1"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em" }}
            >
              CONTACT: {location.name.toUpperCase()}
            </p>
            <a
              href={`tel:${location.phone}`}
              className="text-[#F4EFE6]/50 text-xs hover:text-[#F4EFE6] transition-colors"
            >
              {location.phone}
            </a>
            <a
              href={`mailto:${location.email}`}
              className="text-[#F4EFE6]/50 text-xs hover:text-[#F4EFE6] transition-colors break-all"
            >
              {location.email}
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4EFE6]/50 text-xs hover:text-[#F4EFE6] transition-colors leading-relaxed"
            >
              {location.address}
            </a>

            {/* Hours */}
            <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 md:text-right">
              {location.hours.map((h) => (
                <p key={h.days} className="text-xs text-[#F4EFE6]/35">
                  <span className="text-[#F4EFE6]/25">{h.days}: </span>{h.time}
                </p>
              ))}
              </div>

            {/* MRG Group logo */}
            <div className="mt-6 pt-5 border-t border-white/10 flex md:justify-end">
              <a
                href="https://www.themrggroup.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The MRG Group"
                className="opacity-80 hover:opacity-100 transition-opacity bg-white px-4 py-2 inline-flex items-center"
              >
                <Image
                  src="/mrg-logo.png"
                  alt="The MRG Group"
                  width={200}
                  height={80}
                  className="object-contain w-auto"
                  style={{ height: "50px" }}
                />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2">
          <p
            className="text-[#F4EFE6]/25 uppercase"
            style={{ fontSize: "0.6rem", letterSpacing: "0.15em" }}
          >
            Dublin Calling &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <p className="text-[#F4EFE6]/25" style={{ fontSize: "0.6rem" }}>
            Website designed by{" "}
            <a
              href="https://alexandriabraniff.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#F4EFE6]/50 transition-colors"
            >
              Alexandria Braniff
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
