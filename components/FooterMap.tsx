"use client";

import { usePathname } from "next/navigation";
import type { Location } from "@/lib/locations";

/* Map strip at the top of the footer, on the location homepage only (other pages get the plain footer) */
export default function FooterMap({ location }: { location: Location }) {
  const pathname = usePathname();
  if (pathname !== `/${location.slug}`) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-14">
      <div className="w-full overflow-hidden border-2 border-[#F2B035]/70" style={{ height: "clamp(220px, 28vw, 320px)" }}>
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
    </div>
  );
}
