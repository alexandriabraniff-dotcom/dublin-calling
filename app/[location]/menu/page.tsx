import { notFound } from "next/navigation";
import { getLocation } from "@/lib/locations";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const foodSections = [
    {
      name: "Starters",
      items: [
        { name: "Loaded Nachos", desc: "Tortilla chips, cheddar, jalapeños, sour cream, salsa", price: "$18" },
        { name: "Crispy Calamari", desc: "Lemon aioli, fresh herbs", price: "$16" },
        { name: "Chicken Wings", desc: "Buffalo, BBQ, Honey Garlic, or Dry Rub (1 lb)", price: "$18" },
        { name: "Spinach & Artichoke Dip", desc: "Warm dip, grilled pita, tortilla chips", price: "$15" },
      ],
    },
    {
      name: "Mains",
      items: [
        { name: "DC Smash Burger", desc: "Double smash patty, cheddar, pickles, DC sauce, brioche bun", price: "$20" },
        { name: "Fish & Chips", desc: "Beer battered cod, fries, coleslaw, tartar sauce", price: "$22" },
        { name: "Chicken Sandwich", desc: "Crispy chicken, brioche, lettuce, pickles, hot honey", price: "$19" },
        { name: "Steak Frites", desc: "6oz flat iron, house fries, compound butter", price: "$28" },
        { name: "Veggie Burger", desc: "House black bean patty, avocado, roasted peppers", price: "$17" },
      ],
    },
    {
      name: "Sharables",
      items: [
        { name: "Poutine", desc: "Fries, cheese curds, beef gravy", price: "$14" },
        { name: "Pretzel & Beer Cheese", desc: "Soft pretzel, house beer cheese dip", price: "$13" },
        { name: "Onion Rings", desc: "Crispy beer battered, smoked paprika mayo", price: "$11" },
        { name: "DC Platter", desc: "Wings, nachos, onion rings, fries. Great for the group.", price: "$42" },
      ],
    },
  ];

  const drinkSections = [
    {
      name: "Draught Beer",
      items: [
        { name: "Guinness", desc: "The classic Irish stout, 20oz pint", price: "$10" },
        { name: "Harp Lager", desc: "Crisp Irish lager, 20oz pint", price: "$9" },
        { name: loc.slug === "vancouver" ? "12+ Rotating Taps" : "Rotating Craft Tap", desc: "Ask your server what's pouring tonight", price: "Varies" },
      ],
    },
    {
      name: "Cocktails",
      items: [
        { name: "Irish Mule", desc: "Jameson, ginger beer, lime, mint", price: "$14" },
        { name: "Espresso Martini", desc: "Vodka, espresso, Kahlua, simple syrup", price: "$15" },
        { name: "Green Goblin", desc: "Midori, vodka, lime. House specialty.", price: "$13" },
        { name: "Whiskey Sour", desc: "Bourbon, lemon juice, egg white, bitters", price: "$14" },
      ],
    },
    {
      name: "Happy Hour Specials",
      items: [
        { name: "House Draught", desc: "Rotating selection", price: "$6" },
        { name: "Rail Cocktails", desc: "Well spirits, house mix", price: "$7" },
        { name: "House Wine", desc: "Red or white", price: "$6" },
        { name: "Domestic Bottles", desc: "Molson, Budweiser, Coors", price: "$5" },
      ],
    },
  ];

  const Label = ({ text }: { text: string }) => (
    <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.25em" }}
       className="text-[#F2B035]">
      {text}
    </p>
  );

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F5132] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Label text={`${loc.name.toUpperCase()} · ${loc.city.toUpperCase()}`} />
          <h1
            className="text-[#F4EFE6] mt-3 mb-4"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(3.5rem, 10vw, 7rem)", letterSpacing: "0.02em" }}
          >
            Menu
          </h1>
          <p className="text-[#F4EFE6]/50 text-lg font-light max-w-xl">
            Pub classics done properly. Built for big nights and even better company.
          </p>
          <div className="mt-5 inline-flex items-center gap-3 border border-[#169B62] px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-[#169B62]" />
            <span className="text-[#F4EFE6]/60 text-xs">Happy Hour: {loc.happyHour}</span>
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="py-16 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-5 mb-14">
            <div className="h-px flex-1 bg-white/8" />
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "2.2rem", letterSpacing: "0.02em" }} className="text-[#F4EFE6]">
              Food
            </h2>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          {foodSections.map((section) => (
            <div key={section.name} className="mb-12">
              <p
                className="text-[#F2B035] mb-5"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em" }}
              >
                {section.name.toUpperCase()}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-white/5 border-y border-white/5">
                {section.items.map((item) => (
                  <div key={item.name} className="flex justify-between gap-4 py-4 px-0 md:px-4 first:border-t-0 md:border-b border-white/5 hover:bg-white/3 transition-colors">
                    <div>
                      <p className="text-[#F4EFE6] text-sm font-semibold">{item.name}</p>
                      <p className="text-[#F4EFE6]/40 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                    <span
                      className="text-[#F2B035] shrink-0"
                      style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Drinks */}
      <section className="py-16 bg-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-5 mb-14">
            <div className="h-px flex-1 bg-white/15" />
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "2.2rem", letterSpacing: "0.02em" }} className="text-[#F4EFE6]">
              Drinks
            </h2>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          {loc.slug === "vancouver" && (
            <div className="mb-10 border border-[#F2B035]/30 bg-[#101010] px-6 py-4 flex items-center gap-3">
              <span className="text-2xl">🍺</span>
              <p className="text-[#F4EFE6]/70 text-sm">
                <span className="text-[#F2B035] font-bold">Vancouver:</span> 12+ beers on tap. Ask your server for today&apos;s full tap list.
              </p>
            </div>
          )}

          {drinkSections.map((section) => (
            <div key={section.name} className="mb-12">
              <p
                className="text-[#F2B035] mb-5"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em" }}
              >
                {section.name.toUpperCase()}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 border-y border-white/15">
                {section.items.map((item) => (
                  <div key={item.name} className="flex justify-between gap-4 py-4 px-0 md:px-4 border-b border-white/10 hover:bg-white/5 transition-colors">
                    <div>
                      <p className="text-[#F4EFE6] text-sm font-semibold">{item.name}</p>
                      <p className="text-[#F4EFE6]/40 text-xs mt-0.5">{item.desc}</p>
                    </div>
                    <span
                      className="text-[#F2B035] shrink-0"
                      style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6 bg-[#101010] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#F4EFE6]/20 text-xs">
            Menu items and prices subject to change. Please inform your server of any dietary restrictions or allergies. All prices in CAD. Taxes extra.
          </p>
        </div>
      </section>
    </>
  );
}
