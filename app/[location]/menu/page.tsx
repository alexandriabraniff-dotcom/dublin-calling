import { notFound } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import MenuTabs, { type MenuPanel } from "@/components/MenuTabs";
import MenuBoard from "@/components/MenuBoard";
import GoldFrame from "@/components/GoldFrame";
import { getLocation, type LocationSlug } from "@/lib/locations";
import { getMenus, type MenuSection } from "@/lib/menus";

const NOTE = "Menu items and prices subject to change. Please inform your server of any dietary restrictions or allergies. All prices in CAD. Taxes extra.";

// Schema.org Menu markup so search engines can read every dish and price
function menuJsonLd(name: string, tabs: { name: string; sections: MenuSection[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name,
    hasMenuSection: tabs.flatMap((t) =>
      t.sections.map((s) => ({
        "@type": "MenuSection",
        name: `${t.name}: ${s.title}`,
        hasMenuItem: [...s.items, ...(s.groups ?? []).flatMap((g) => g.items)].map((i) => ({
          "@type": "MenuItem",
          name: i.name,
          ...(i.desc ? { description: i.desc } : {}),
          ...(i.price?.match(/^\$([0-9.]+)/) ? { offers: { "@type": "Offer", price: i.price.match(/^\$([0-9.]+)/)![1], priceCurrency: "CAD" } } : {}),
        })),
      }))
    ),
  };
}

function ImageMenu({ src, alt }: { src: string; alt: string }) {
  return (
    <GoldFrame className="w-full">
      <Image src={src} alt={alt} width={800} height={1100} className="w-full h-auto" />
    </GoldFrame>
  );
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const menus = getMenus(loc.slug as LocationSlug);
  const panels: MenuPanel[] = menus
    ? [
        { id: "food", label: "Food", content: <MenuBoard heading="Food" sections={menus.food} /> },
        { id: "drinks", label: "Drinks", content: <MenuBoard heading="Drinks" sections={menus.drinks} /> },
        ...(menus.happyHour
          ? [{ id: "happy-hour", label: "Happy Hour", content: <MenuBoard heading="Happy Hour" sub={menus.happyHour.when} sections={menus.happyHour.sections} /> }]
          : []),
      ]
    : [
        // Not typed out yet for this location: show the menu images
        { id: "food", label: "Food", content: <ImageMenu src="/menu-food.webp" alt={`Dublin Calling ${loc.name} food menu`} /> },
        { id: "drinks", label: "Drinks", content: <ImageMenu src="/menu-drinks.webp" alt={`Dublin Calling ${loc.name} drinks menu`} /> },
        {
          id: "happy-hour",
          label: "Happy Hour",
          content: (
            <div className="border-2 border-[#F2B035] bg-[#0F5132] px-6 py-12 text-center">
              <h2 className="text-[#F2B035] uppercase font-bold tracking-[0.2em] text-3xl" style={{ fontFamily: "'Oswald', sans-serif" }}>Happy Hour</h2>
              <p className="mt-3 text-[#F4EFE6] text-lg">{loc.happyHour}</p>
              <p className="mt-2 text-[#F4EFE6]/80 text-sm">Ask your server about this week&apos;s happy hour drinks and bites.</p>
            </div>
          ),
        },
      ];

  const jsonLd = menus
    ? menuJsonLd(`Dublin Calling ${loc.name} Menus`, [
        { name: "Food", sections: menus.food },
        { name: "Drinks", sections: menus.drinks },
        ...(menus.happyHour ? [{ name: "Happy Hour", sections: menus.happyHour.sections }] : []),
      ])
    : null;

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <PageHeader location={loc.name} label="Menus" title="Menus" subtitle="Pub classics done properly. Built for big nights and even better company." />

      <section className="bg-[#101010] pb-16">
        <MenuTabs
          panels={panels.map((p) => ({
            ...p,
            content: <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">{p.content}</div>,
          }))}
        />
        <p className="max-w-5xl mx-auto px-4 sm:px-6 text-[#F4EFE6]/75 text-xs mt-10">{NOTE}</p>
      </section>
    </>
  );
}
