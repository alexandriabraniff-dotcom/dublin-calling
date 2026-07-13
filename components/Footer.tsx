import Link from "next/link";
import Image from "next/image";
import type { Location } from "@/lib/locations";

interface FooterProps {
  location: Location;
}

export default function Footer({ location }: FooterProps) {
  const base = `/${location.slug}`;

  return (
    <footer className="bg-[#101010] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/logo.png"
              alt="Dublin Calling"
              width={72}
              height={72}
              className="w-16 h-auto mb-5"
            />
            <p className="text-[#F4EFE6]/25 text-xs uppercase tracking-widest mb-1">
              {location.name}
            </p>
            <p className="text-[#F4EFE6]/20 text-xs">{location.address}</p>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[#F4EFE6]/25 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
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
                    className="text-[#F4EFE6]/40 text-xs hover:text-[#F4EFE6] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <p className="text-[#F4EFE6]/25 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              Locations
            </p>
            <ul className="space-y-2.5">
              {[
                { slug: "adelaide", label: "Toronto — Adelaide" },
                { slug: "danforth", label: "Toronto — Danforth" },
                { slug: "vancouver", label: "Vancouver" },
              ].map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/${loc.slug}`}
                    className={`text-xs transition-colors ${
                      loc.slug === location.slug
                        ? "text-[#F2B035] font-semibold"
                        : "text-[#F4EFE6]/40 hover:text-[#F4EFE6]"
                    }`}
                  >
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-[#F4EFE6]/25 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              Hours
            </p>
            <ul className="space-y-2">
              {location.hours.map((h) => (
                <li key={h.days} className="text-xs">
                  <span className="text-[#F4EFE6]/25 block">{h.days}</span>
                  <span className="text-[#F4EFE6]/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#F4EFE6]/20 text-xs">
            &copy; {new Date().getFullYear()} Dublin Calling / MRG Group. All rights reserved.
          </p>
          <p className="text-[#F4EFE6]/20 text-xs">
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
