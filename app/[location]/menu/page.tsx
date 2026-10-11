import { notFound } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { getLocation } from "@/lib/locations";

export default async function MenuPage({
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
      <PageHeader location={loc.name} label="Menu" title="Menu" subtitle="Pub classics done properly. Built for big nights and even better company." />

      {/* Menu images — side by side */}
      <section className="bg-[#101010] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Food menu */}
            <div className="flex flex-col gap-4">
              <p className="text-[#F2B035] text-[11px] uppercase tracking-[0.25em]" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>
                Food Menu
              </p>
              <div className="relative w-full border border-white/10">
                <Image
                  src="/menu-food.webp"
                  alt="Dublin Calling Food Menu"
                  width={800}
                  height={1100}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Drinks menu */}
            <div className="flex flex-col gap-4">
              <p className="text-[#F2B035] text-[11px] uppercase tracking-[0.25em]" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>
                Drinks Menu
              </p>
              <div className="relative w-full border border-white/10">
                <Image
                  src="/menu-drinks.webp"
                  alt="Dublin Calling Drinks Menu"
                  width={800}
                  height={1100}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <p className="text-[#F4EFE6]/70 text-xs mt-10">
            Menu items and prices subject to change. Please inform your server of any dietary restrictions or allergies. All prices in CAD. Taxes extra.
          </p>
        </div>
      </section>
    </>
  );
}
