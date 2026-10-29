import Link from "next/link";
import { listingsOn, todayIn, type Location } from "@/lib/locations";
import { getLiveSchedule } from "@/lib/schedule";

/* Thin bar above the header with tonight's listings, linking to the events page. Hidden when nothing is on. */
export default async function TonightBar({ location }: { location: Location }) {
  const schedule = [...location.schedule, ...(await getLiveSchedule(location))];
  const tonight = listingsOn(schedule, location.weekly, todayIn(location.timezone)).slice(0, 4);
  if (tonight.length === 0) return null;

  return (
    <div className="bg-[#F4EFE6] text-[#101010]">
      <Link
        href={`/${location.slug}/events`}
        className="max-w-7xl mx-auto px-5 lg:px-8 min-h-9 py-2 flex items-center gap-x-4 gap-y-1 flex-wrap text-[11px] uppercase tracking-[0.15em] hover:underline underline-offset-4"
      >
        <span className="font-semibold">What&apos;s happening tonight?</span>
        {tonight.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#0F5132]" />
            {item.title}
            {item.time && <span className="text-[#101010]/75">{item.time}</span>}
          </span>
        ))}
      </Link>
    </div>
  );
}
