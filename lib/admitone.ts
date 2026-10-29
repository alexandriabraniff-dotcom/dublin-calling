import { unstable_cache } from "next/cache";

/* Admit One public events feed (the same one the old dublincalling.com used via dc-list.js).
   One request per location returns every event and every date with its checkout link. */
const FEED = "https://gateway.admitone.com/embed/events";

export interface AdmitOneDate {
  start: string; // ISO datetime (UTC)
  url: string;
  soldOut: boolean;
}

export interface AdmitOneEvent {
  title: string;
  description: string; // plain text
  image?: string;
  tag: string; // Admit One event group tag, e.g. "leafs" ("" when none)
  dates: AdmitOneDate[];
}

interface RawEvent {
  title?: string;
  description?: string;
  event_image?: string;
  event_group_tag?: string;
  event_dates?: { event_date?: string; event_url?: string; sold_out?: boolean }[];
}

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

async function fetchEvents(nodeId: string): Promise<AdmitOneEvent[]> {
  try {
    const res = await fetch(`${FEED}?organizationNodeId=${encodeURIComponent(nodeId)}`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = (await res.json()) as { events?: RawEvent[] };
    return (json.events ?? []).map((e) => ({
      title: (e.title ?? "").trim(),
      description: stripHtml(e.description ?? ""),
      image: e.event_image || undefined,
      tag: (e.event_group_tag ?? "").trim().toLowerCase(),
      dates: (e.event_dates ?? [])
        .filter((d) => d.event_date && d.event_url)
        .map((d) => ({ start: d.event_date!, url: d.event_url!, soldOut: !!d.sold_out })),
    }));
  } catch {
    return []; // feed down: the site falls back to its weekly listings
  }
}

// Cached for 15 minutes so new Admit One events show up without a redeploy
export const getAdmitOneEvents = unstable_cache(fetchEvents, ["admitone-events"], { revalidate: 900 });
