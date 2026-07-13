import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLocation, LOCATION_SLUGS } from "@/lib/locations";
import type { LocationSlug } from "@/lib/locations";

export function generateStaticParams() {
  return LOCATION_SLUGS.map((slug) => ({ location: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return {
    title: `Dublin Calling ${loc.name} — Party Pub & Kitchen | ${loc.city}`,
    description: `Dublin Calling ${loc.name} — ${loc.address}. Party pub, sports bar, live events, happy hour and group bookings in ${loc.city}.`,
  };
}

export default async function LocationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar location={loc.slug as LocationSlug} />
      <main className="flex-1">{children}</main>
      <Footer location={loc} />
    </div>
  );
}
