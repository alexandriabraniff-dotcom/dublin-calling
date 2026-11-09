export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import EventsBody from "@/components/EventsBody";
import { getLocation } from "@/lib/locations";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <>
      {/* Header */}
      <PageHeader location={loc.name} label="Events" title="What's On" page="events" subtitle={`Live sport on the big screens, weekly events and nights you won't forget at Dublin Calling ${loc.name}.`} />
      <EventsBody loc={loc} />
    </>
  );
}
