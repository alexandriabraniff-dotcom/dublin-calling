"use client";

import { usePathname } from "next/navigation";
import type { Location } from "@/lib/locations";

/* Small square map in the footer's contact column, on the location homepage only (other pages get the plain footer) */
export default function FooterMap({ location, className = "" }: { location: Location; className?: string }) {
  const pathname = usePathname();
  if (pathname !== `/${location.slug}`) return null;

  return (
    <div className={`aspect-square overflow-hidden border-2 border-[#F2B035]/70 ${className}`} style={{ width: "clamp(180px, 16vw, 220px)" }}>
      <iframe
        src={location.mapEmbed}
        width="100%"
        height="100%"
        style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map: Dublin Calling ${location.name}, ${location.address}`}
      />
    </div>
  );
}
