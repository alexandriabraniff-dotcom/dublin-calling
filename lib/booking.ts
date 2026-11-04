import type { LocationSlug } from "@/lib/locations";

/* Table bookings go through OpenTable. Paste each location's OpenTable link here when MRG
   sends them; until then every "Book a Table" button opens the location's Book a Table page. */
export const OPENTABLE: Record<LocationSlug, string> = {
  adelaide: "",
  danforth: "",
  vancouver: "",
};

// Vancouver already has an OpenTable restaurant id (from the old site's reservation widget)
export const OPENTABLE_WIDGET: Partial<Record<LocationSlug, string>> = {
  vancouver:
    "https://www.opentable.ca/widget/reservation/loader?rid=1400461&type=standard&theme=wide&color=1&dark=false&iframe=true&overlay=false&lang=en-CA&newtab=false&ot_source=Restaurant%20website",
};

export const tableHref = (slug: LocationSlug) => OPENTABLE[slug] || `/${slug}/book-a-table`;
export const tableIsExternal = (slug: LocationSlug) => !!OPENTABLE[slug];
