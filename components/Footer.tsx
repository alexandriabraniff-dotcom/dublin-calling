import Link from "next/link";
import Image from "next/image";
import type { Location } from "@/lib/locations";
import FooterMap from "@/components/FooterMap";

const NAV_LINKS = [
  { href: "", label: "Home" },
  { href: "#about", label: "About" },
  { href: "/menu", label: "Menus" },
  { href: "/events", label: "Events" },
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

const LOCATIONS = [
  { slug: "adelaide", label: "Toronto, Adelaide" },
  { slug: "danforth", label: "Toronto, Danforth" },
  { slug: "vancouver", label: "Vancouver" },
];

const labelStyle = { fontFamily: "var(--font-label)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.25em" } as const;

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const contactBtn =
  "btn flex items-center justify-center gap-2 min-h-[48px] w-full border-2 border-[#F2B035] text-[#F4EFE6] text-sm font-semibold uppercase tracking-[0.12em] hover:bg-[#F2B035] hover:text-[#101010] transition-colors";

const socialBtn =
  "w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#F4EFE6]/60 text-[#F4EFE6] hover:border-[#F2B035] hover:text-[#F2B035] transition-colors";

/* Phone layout: centred, logo first, big tap targets for call / email / directions,
   hours in a framed box, two-column link lists, then legal + MRG + copyright. */
function MobileFooter({ location, base }: { location: Location; base: string }) {
  return (
    <div className="md:hidden px-6 pt-12 pb-8 flex flex-col items-center text-center">
      <Link href={base} aria-label={`Dublin Calling ${location.name} home`}>
        <Image src="/logo.png" alt="" width={200} height={200} className="w-auto" style={{ height: "128px" }} />
      </Link>

      <div className="flex items-center gap-3 mt-5">
        <a href={location.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Dublin Calling on Facebook (opens in a new tab)" className={socialBtn}>
          <FacebookIcon />
        </a>
        <a href={location.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Dublin Calling on Instagram (opens in a new tab)" className={socialBtn}>
          <InstagramIcon />
        </a>
      </div>

      {/* Contact */}
      <h2 className="font-label text-[#F2B035] mt-10 mb-4 uppercase" style={labelStyle}>
        Dublin Calling {location.name}
      </h2>
      <div className="w-full flex flex-col gap-3">
        <a href={`tel:${location.phone}`} className={contactBtn}>
          <PhoneIcon />
          Call {location.phone}
        </a>
        <a href={`mailto:${location.email}`} className={contactBtn}>
          <MailIcon />
          Email Us
        </a>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer" className={contactBtn}>
          <PinIcon />
          Get Directions<span className="sr-only"> (opens Google Maps)</span>
        </a>
      </div>
      <p className="text-[#F4EFE6]/85 text-sm mt-4 leading-relaxed">{location.address}</p>

      {/* Hours, in the logo's double gold frame */}
      <div className="w-full mt-8 border-4 border-[#F2B035] p-[3px]">
        <div className="border-2 border-[#F2B035] px-5 py-5">
          <h2 className="font-label text-[#F2B035] mb-3 uppercase" style={labelStyle}>
            Hours
          </h2>
          <dl className="flex flex-col gap-2 text-sm">
            {location.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt className="text-[#F4EFE6]/85 text-left">{h.days}</dt>
                <dd className="text-[#F4EFE6] text-right">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Links */}
      <div className="w-full grid grid-cols-2 gap-6 mt-10 text-left">
        <nav aria-label="Footer">
          <h2 className="font-label text-[#F2B035] mb-2 uppercase" style={labelStyle}>
            Navigate
          </h2>
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href === "" ? base : `${base}${link.href}`} className="block py-2 text-[#F4EFE6]/90 text-sm hover:text-[#F2B035] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Locations">
          <h2 className="font-label text-[#F2B035] mb-2 uppercase" style={labelStyle}>
            Locations
          </h2>
          <ul className="flex flex-col">
            {LOCATIONS.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/${l.slug}`}
                  aria-current={l.slug === location.slug ? "page" : undefined}
                  className={`block py-2 text-sm transition-colors ${l.slug === location.slug ? "text-[#F2B035] font-semibold" : "text-[#F4EFE6]/90 hover:text-[#F2B035]"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Legal + MRG */}
      <p className="text-[#F4EFE6]/85 text-xs leading-relaxed mt-10">
        You must be of legal drinking age to purchase alcohol.
        <br />
        Valid Photo ID required.
      </p>
      <Link href={`${base}/privacy-policy`} className="mt-3 py-2 text-[#F4EFE6]/90 hover:text-[#F2B035] transition-colors uppercase tracking-widest text-xs">
        Privacy Policy
      </Link>
      <a href="https://www.themrggroup.com" target="_blank" rel="noopener noreferrer" aria-label="The MRG Group (opens in a new tab)" className="mt-6 opacity-80 hover:opacity-100 transition-opacity">
        <Image src="/mrg-logo.png" alt="" width={200} height={80} className="w-auto" style={{ height: "56px" }} />
      </a>

      <div className="w-full mt-8 pt-5 border-t-2 border-[#F4EFE6]">
        <p className="text-[#F4EFE6]/85 uppercase text-xs" style={{ letterSpacing: "0.15em" }}>
          Dublin Calling &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
}

interface FooterProps {
  location: Location;
}

export default function Footer({ location }: FooterProps) {
  const base = `/${location.slug}`;

  return (
    <footer id="find-us" className="bg-[#0F5132] border-t-2 border-[#F2B035] scroll-mt-[72px]">
      {/* ── MAP (homepage only) ── */}
      <FooterMap location={location} />

      {/* ── MOBILE FOOTER (below md) ── */}
      <MobileFooter location={location} base={base} />

      {/* ── DESKTOP FOOTER ── */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 items-start">

          {/* Col 1 — Navigate + Locations */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[#F4EFE6]/80 mb-1"
              style={{ fontFamily: "var(--font-label)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em" }}
            >
              NAVIGATE
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href === "" ? base : `${base}${link.href}`}
                className="text-[#F4EFE6]/85 text-xs hover:text-[#F4EFE6] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <p
              className="text-[#F4EFE6]/80 mt-5 mb-1"
              style={{ fontFamily: "var(--font-label)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em" }}
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
                    : "text-[#F4EFE6]/85 hover:text-[#F4EFE6]"
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
                className="text-[#F4EFE6]/80 hover:text-[#F4EFE6] transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href={location.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#F4EFE6]/80 hover:text-[#F4EFE6] transition-colors"
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
            <p className="text-[#F4EFE6]/80 text-[11px] leading-relaxed">
              You must be of legal drinking age to purchase alcohol.<br />
              Valid Photo ID required.
            </p>

            {/* Privacy */}
            <Link
              href={`/${location.slug}/privacy-policy`}
              className="text-[#F4EFE6]/80 hover:text-[#F2B035] transition-colors uppercase tracking-widest"
              style={{ fontSize: "0.7rem" }}
            >
              Privacy Policy
            </Link>
          </div>

          {/* Col 3 — Contact (right-aligned) */}
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <p
              className="text-[#F4EFE6]/80 mb-1"
              style={{ fontFamily: "var(--font-label)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em" }}
            >
              CONTACT: {location.name.toUpperCase()}
            </p>
            <a
              href={`tel:${location.phone}`}
              className="text-[#F4EFE6]/85 text-xs hover:text-[#F4EFE6] transition-colors"
            >
              {location.phone}
            </a>
            <a
              href={`mailto:${location.email}`}
              className="text-[#F4EFE6]/85 text-xs hover:text-[#F4EFE6] transition-colors break-all"
            >
              {location.email}
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4EFE6]/85 text-xs hover:text-[#F4EFE6] transition-colors leading-relaxed"
            >
              {location.address}
            </a>

            {/* Hours */}
            <div className="mt-4 pt-4 border-t border-white/25 space-y-1.5 md:text-right">
              {location.hours.map((h) => (
                <p key={h.days} className="text-xs text-[#F4EFE6]/80">
                  <span className="text-[#F4EFE6]/80">{h.days}: </span>{h.time}
                </p>
              ))}
              </div>

            {/* MRG Group logo */}
            <div className="mt-6 pt-5 border-t border-white/25 flex md:justify-end">
              <a
                href="https://www.themrggroup.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The MRG Group"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/mrg-logo.png"
                  alt="The MRG Group"
                  width={200}
                  height={80}
                  className="object-contain w-auto"
                  style={{ height: "70px" }}
                />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t-2 border-[#F4EFE6] flex flex-col sm:flex-row justify-between gap-2">
          <p
            className="text-[#F4EFE6]/80 uppercase"
            style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}
          >
            Dublin Calling &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
