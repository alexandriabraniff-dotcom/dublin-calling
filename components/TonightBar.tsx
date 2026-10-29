import Link from "next/link";
import { listingsOn, todayIn, type Location } from "@/lib/locations";
import { getLiveSchedule } from "@/lib/schedule";
import TonightTicker from "@/components/TonightTicker";

/* Thin bar above the header: "What's happening tonight?" stays put (and links to the events page)
   while tonight's listings roll through one at a time beside it. Hidden when nothing is on. */
export default async function TonightBar({ location }: { location: Location }) {
  const schedule = [...location.schedule, ...(await getLiveSchedule(location))];
  const tonight = listingsOn(schedule, location.weekly, todayIn(location.timezone));
  if (tonight.length === 0) return null;

  return (
    <div className="bg-[#F4EFE6] text-[#101010]">
      {/* Phones: the label on its own line so tonight's listing gets the full width */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 min-h-9 py-1.5 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4 text-[11px] uppercase tracking-[0.15em]">
        <Link href={`/${location.slug}/events`} className="shrink-0 self-center font-semibold hover:underline underline-offset-4">
          What&apos;s happening tonight?
        </Link>
        <TonightTicker items={tonight.map((t) => ({ title: t.title, time: t.time }))} />
      </div>
    </div>
  );
}
