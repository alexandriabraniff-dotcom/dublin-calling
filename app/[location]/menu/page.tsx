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

  const menuCategories = [
    {
      name: "Starters",
      emoji: "🍟",
      items: [
        { name: "Loaded Nachos", desc: "Tortilla chips, cheddar, jalapeños, sour cream, salsa", price: "$18" },
        { name: "Crispy Calamari", desc: "Lemon aioli, fresh herbs", price: "$16" },
        { name: "Chicken Wings", desc: "Choice of sauce: Buffalo, BBQ, Honey Garlic, or Dry Rub (1 lb)", price: "$18" },
        { name: "Spinach & Artichoke Dip", desc: "Warm dip, grilled pita, tortilla chips", price: "$15" },
      ],
    },
    {
      name: "Mains",
      emoji: "🍔",
      items: [
        { name: "DC Smash Burger", desc: "Double smash patty, cheddar, pickles, DC sauce, brioche bun", price: "$20" },
        { name: "Fish & Chips", desc: "Beer battered cod, fries, coleslaw, tartar sauce", price: "$22" },
        { name: "Chicken Sandwich", desc: "Crispy chicken, brioche, lettuce, pickles, hot honey", price: "$19" },
        { name: "Steak Frites", desc: "6oz flat iron, house fries, compound butter", price: "$28" },
        { name: "Veggie Burger", desc: "House black bean patty, avocado, roasted peppers, brioche", price: "$17" },
      ],
    },
    {
      name: "Sharables",
      emoji: "🫕",
      items: [
        { name: "Poutine", desc: "Fries, cheese curds, beef gravy", price: "$14" },
        { name: "Pretzel & Beer Cheese", desc: "Soft pretzel, house beer cheese dip", price: "$13" },
        { name: "Onion Rings", desc: "Crispy beer battered, smoked paprika mayo", price: "$11" },
        { name: "DC Platter", desc: "Wings, nachos, onion rings, fries — great for the group", price: "$42" },
      ],
    },
    {
      name: "Salads & Lighter",
      emoji: "🥗",
      items: [
        { name: "Caesar Salad", desc: "Romaine, parmesan, croutons, house caesar (add chicken +$5)", price: "$15" },
        { name: "Pub Salad", desc: "Mixed greens, cherry tomatoes, cucumber, balsamic", price: "$13" },
      ],
    },
  ];

  const drinkCategories = [
    {
      name: "Draught Beer",
      emoji: "🍺",
      items: [
        { name: "Guinness", desc: "The classic Irish stout. 20oz", price: "$10" },
        { name: "Harp Lager", desc: "Crisp Irish lager. 20oz", price: "$9" },
        { name: "Rotating Craft Tap", desc: "Ask your server what's pouring tonight", price: "Varies" },
        ...(loc.slug === "vancouver"
          ? [{ name: "12+ Taps", desc: "Extensive rotating tap list — ask what's on today", price: "Varies" }]
          : []),
      ],
    },
    {
      name: "Cocktails",
      emoji: "🍹",
      items: [
        { name: "Irish Mule", desc: "Jameson, ginger beer, lime, mint", price: "$14" },
        { name: "Espresso Martini", desc: "Vodka, espresso, Kahlua, simple syrup", price: "$15" },
        { name: "Green Goblin", desc: "Midori, vodka, lime, house mix — house specialty", price: "$13" },
        { name: "Whiskey Sour", desc: "Bourbon, lemon juice, egg white, bitters", price: "$14" },
      ],
    },
    {
      name: "Happy Hour Specials",
      emoji: "⏰",
      items: [
        { name: "House Draught", desc: "Rotating selection", price: "$6" },
        { name: "Rail Cocktails", desc: "Well spirits, house mix", price: "$7" },
        { name: "House Wine", desc: "Red or white", price: "$6" },
        { name: "Domestic Bottles", desc: "Molson, Budweiser, Coors", price: "$5" },
      ],
    },
    {
      name: "Non-Alcoholic",
      emoji: "🥤",
      items: [
        { name: "Soft Drinks", desc: "Coke, Diet Coke, Sprite, Ginger Ale", price: "$4" },
        { name: "Sparkling Water", desc: "San Pellegrino", price: "$4" },
        { name: "Juice", desc: "Orange, cranberry, pineapple", price: "$4" },
      ],
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F5132] py-20 border-b border-[#169B62]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#F2B035] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            {loc.name} — {loc.city}
          </p>
          <h1
            className="text-[#F4EFE6] text-6xl sm:text-7xl mb-4"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Menu
          </h1>
          <p className="text-[#F4EFE6] opacity-60 text-lg max-w-xl">
            Pub classics done properly. Built for big nights, great games, and
            even better company.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#101010] rounded px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-[#F2B035]" />
            <span className="text-[#F4EFE6] text-sm opacity-70">
              Happy Hour: {loc.happyHour}
            </span>
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="py-16 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-[#0F5132]" />
            <h2
              className="text-[#F4EFE6] text-4xl"
              style={{ fontFamily: "'Lobster Two', cursive" }}
            >
              Food
            </h2>
            <div className="h-px flex-1 bg-[#0F5132]" />
          </div>

          <div className="space-y-14">
            {menuCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.emoji}</span>
                  <h3
                    className="text-[#F2B035] text-2xl"
                    style={{ fontFamily: "'Lobster Two', cursive" }}
                  >
                    {category.name}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0F5132]/30">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-[#101010] p-5 flex items-start justify-between gap-4 hover:bg-[#0F5132]/20 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-[#F4EFE6] font-semibold text-sm">{item.name}</p>
                        <p className="text-[#F4EFE6] opacity-50 text-xs mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <span className="text-[#F2B035] text-sm font-bold shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drinks */}
      <section className="py-16 bg-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-[#169B62]/40" />
            <h2
              className="text-[#F4EFE6] text-4xl"
              style={{ fontFamily: "'Lobster Two', cursive" }}
            >
              Drinks
            </h2>
            <div className="h-px flex-1 bg-[#169B62]/40" />
          </div>

          {loc.slug === "vancouver" && (
            <div className="mb-8 bg-[#101010] rounded-lg px-6 py-4 border border-[#F2B035]/30 flex items-center gap-3">
              <span className="text-2xl">🍺</span>
              <p className="text-[#F4EFE6] text-sm">
                <span className="text-[#F2B035] font-bold">Vancouver:</span>{" "}
                12+ beers on tap. Ask your server for today&apos;s full tap list.
              </p>
            </div>
          )}

          <div className="space-y-14">
            {drinkCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.emoji}</span>
                  <h3
                    className="text-[#F4EFE6] text-2xl"
                    style={{ fontFamily: "'Lobster Two', cursive" }}
                  >
                    {category.name}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0F5132]">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-[#0F5132] border border-[#169B62]/10 p-5 flex items-start justify-between gap-4 hover:bg-[#101010]/30 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-[#F4EFE6] font-semibold text-sm">{item.name}</p>
                        <p className="text-[#F4EFE6] opacity-50 text-xs mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <span className="text-[#F2B035] text-sm font-bold shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-[#101010] border-t border-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#F4EFE6] opacity-30 text-xs">
            Menu items and prices subject to change without notice. Please inform your server of any dietary restrictions or allergies. All prices in CAD. Taxes extra.
          </p>
        </div>
      </section>
    </>
  );
}
