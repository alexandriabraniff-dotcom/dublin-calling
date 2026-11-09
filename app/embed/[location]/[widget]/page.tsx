export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getLocation, todayIn } from "@/lib/locations";
import { getLiveSchedule } from "@/lib/schedule";
import { tableHref } from "@/lib/booking";
import WeekCalendar from "@/components/WeekCalendar";
import InstagramFeed from "@/components/InstagramFeed";
import TonightBar from "@/components/TonightBar";
import EventsBody from "@/components/EventsBody";
import EmbedBridge from "@/components/EmbedBridge";

/* Live widgets for the Webflow build of the site. The Webflow pages load these in an iframe
   (site script: [data-dc-live="<widget>"][data-dc-loc="<slug>"]), so the sports schedule,
   tonight's listings and Instagram stay automatic there too. Same components as this site. */
const WIDGETS = ["lineup", "instagram", "tonight", "events"] as const;
type Widget = (typeof WIDGETS)[number];

export const metadata = { robots: { index: false, follow: false } };

export default async function EmbedWidget({ params }: { params: Promise<{ location: string; widget: string }> }) {
  const { location: slug, widget } = await params;
  const loc = getLocation(slug);
  if (!loc || !WIDGETS.includes(widget as Widget)) notFound();

  let content: React.ReactNode = null;
  if (widget === "lineup") {
    const schedule = [...loc.schedule, ...(await getLiveSchedule(loc))];
    content = <WeekCalendar schedule={schedule} weekly={loc.weekly} today={todayIn(loc.timezone)} bookHref={tableHref(loc.slug)} address={loc.address} />;
  } else if (widget === "instagram") {
    content = <InstagramFeed profileUrl={loc.social.instagram} locationName={loc.name} />;
  } else if (widget === "tonight") {
    content = <TonightBar location={loc} />;
  } else {
    content = <EventsBody loc={loc} />;
  }

  return (
    <>
      {/* The iframe sizes itself to the widget: no page background, no full-height body */}
      <style>{`html,body{background:transparent!important;min-height:0!important;height:auto!important}`}</style>
      <EmbedBridge id={`${slug}-${widget}`}>{content}</EmbedBridge>
    </>
  );
}
