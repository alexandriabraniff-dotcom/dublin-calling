import Link from "next/link";
import Image from "next/image";
import type { Location } from "@/lib/locations";

interface FooterProps {
  location: Location;
}

export default function Footer({ location }: FooterProps) {
  const base = `/${location.slug}`;

  return (
    <footer className="bg-[#101010] border-t border-[#0F5132] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logo.png"
              alt="Dublin Calling — Party Pub & Kitchen"
              width={100}
              height={100}
              className="w-24 h-auto mb-3"
            />
            <p className="text-[#F4EFE6] opacity-50 text-xs mt-2">
              {location.name} — {location.city}, {location.province}
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href={location.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#F4EFE6] opacity-60 hover:opacity-100 hover:text-[#169B62] transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={location.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#F4EFE6] opacity-60 hover:opacity-100 hover:text-[#169B62] transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-[#F2B035] text-xs font-bold uppercase tracking-widest mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { href: "", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/events", label: "Events" },
                { href: "/world-cup", label: "World Cup" },
                { href: "/group-bookings", label: "Group Bookings" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href === "" ? base : `${base}${link.href}`}
                    className="text-[#F4EFE6] opacity-70 hover:opacity-100 hover:text-[#169B62] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-[#F2B035] text-xs font-bold uppercase tracking-widest mb-4">
              Locations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/adelaide"
                  className="text-[#F4EFE6] opacity-70 hover:opacity-100 hover:text-[#169B62] text-sm transition-colors"
                >
                  Toronto — Adelaide St
                </Link>
              </li>
              <li>
                <Link
                  href="/danforth"
                  className="text-[#F4EFE6] opacity-70 hover:opacity-100 hover:text-[#169B62] text-sm transition-colors"
                >
                  Toronto — Danforth Ave
                </Link>
              </li>
              <li>
                <Link
                  href="/vancouver"
                  className="text-[#F4EFE6] opacity-70 hover:opacity-100 hover:text-[#169B62] text-sm transition-colors"
                >
                  Vancouver — Granville St
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#F2B035] text-xs font-bold uppercase tracking-widest mb-4">
              {location.name} Contact
            </h3>
            <address className="not-italic space-y-2 text-sm text-[#F4EFE6] opacity-70">
              <p>{location.address}</p>
              <p>
                <a
                  href={`tel:${location.phone}`}
                  className="hover:text-[#169B62] hover:opacity-100 transition-colors"
                >
                  {location.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${location.email}`}
                  className="hover:text-[#169B62] hover:opacity-100 transition-colors"
                >
                  {location.email}
                </a>
              </p>
            </address>

            <div className="mt-5">
              <h4 className="text-[#F4EFE6] opacity-50 text-xs uppercase tracking-wider mb-2">
                Hours
              </h4>
              <ul className="space-y-1">
                {location.hours.map((h) => (
                  <li
                    key={h.days}
                    className="text-xs text-[#F4EFE6] opacity-60 flex justify-between gap-4"
                  >
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#0F5132] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F4EFE6] opacity-40">
          <p>
            &copy; {new Date().getFullYear()} Dublin Calling / MRG Group. All rights reserved.
          </p>
          <p>
            Website designed by{" "}
            <a
              href="https://alexandriabraniff.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
            >
              Alexandria Braniff
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
