import type { LocationSlug } from "@/lib/locations";

/* Typed menus (real text for SEO, styled like the printed menus on the Menus page).
   Adelaide is transcribed from the dublincalling.com/toronto/menu images (Oct 2026).
   Locations without an entry keep showing their menu images. */

export interface MenuItem {
  name: string;
  note?: string; // small caps after the name, e.g. "(5 pcs)"
  price?: string;
  desc?: string;
  extra?: string; // small gold line under the description, e.g. "Add chicken for $5.95"
}

export interface MenuSection {
  title: string;
  intro?: string;
  items: MenuItem[];
  groups?: { label: string; items: MenuItem[] }[]; // e.g. wine: White / Red / Sparkling, specials by day
}

export type MenuTab = "food" | "drinks" | "happy-hour";

export interface LocationMenus {
  food: MenuSection[];
  drinks: MenuSection[];
  happyHour?: { when: string; sections: MenuSection[] };
}

const ADELAIDE: LocationMenus = {
  food: [
    {
      title: "Weekly Specials",
      items: [],
      groups: [
        { label: "Sunday", items: [{ name: "Pulled Pork Sandwich", price: "$16.95", desc: "BBQ pulled pork sandwich with pineapple salsa." }] },
        { label: "Monday", items: [{ name: "Steak Pie", price: "$18.95", desc: "Braised beef in Guinness with root veggies in puff pastry." }] },
        { label: "Tuesday", items: [{ name: "Chicken Wrap", price: "$14.95", desc: "Crispy chicken tender, Jack cheese, lettuce, tomato, Buffalo hot sauce." }] },
        { label: "Wednesday", items: [{ name: "BOGO Wings", price: "$16.95", desc: "Our classic chicken wings with your choice of sauce." }] },
        { label: "Thursday", items: [{ name: "Pork Mac N' Cheese", price: "$18.95", desc: "BBQ pulled pork served with 3 cheese mac n' cheese." }] },
        { label: "Friday", items: [{ name: "Fish N' Chips", price: "$16.95", desc: "Beer-battered haddock, coleslaw, tartar sauce, lemon." }] },
        { label: "Saturday", items: [{ name: "Beef Dip", price: "$16.95", desc: "Braised short rib, served with jus." }] },
      ],
    },
    {
      title: "Appetizers",
      items: [
        { name: "Smoked Mozzarella Sticks", note: "(5 pcs)", price: "$10.95", desc: "Made in house, served with chili-tomato jam." },
        { name: "Fried Pickles", note: "(5 pcs)", price: "$12.95", desc: "Served with ranch sauce." },
        { name: "Chicken & Vegetable Potstickers", note: "(5 pcs)", price: "$12.95", desc: "Served with sweet and sour chili sauce." },
        { name: "Quesadilla", price: "$14.95", desc: "Cheddar Jack, refried beans, tomatoes, pickled jalapenos. Served with salsa and sour cream.", extra: "Add spicy beef or spicy chicken for $5.95" },
        { name: "DC Nachos", price: "$19.95", desc: "Corn chips, Cheddar Jack, pickled jalapenos, olives, tomatoes, green onions, guacamole, salsa, sour cream, refried beans.", extra: "Add spicy beef or spicy chicken for $5.95" },
        { name: "Chicken Wings", note: "(1 lb / 2 lb)", price: "$16.95 / $29.95", desc: "House brined and fried. Served with buttermilk ranch or blue cheese dip. Wet: DC Red Hot, BBQ, Honey Garlic, Buffalo Butter. Dry: Salt and Pepper, Lemon Pepper." },
      ],
    },
    {
      title: "Handhelds",
      intro: "All handhelds come with your choice of fries or house salad. Upgrade to poutine or Caesar salad +$3.95.",
      items: [
        { name: "Turkey Clubhouse Sandwich", price: "$18.95", desc: "Roasted turkey breast, bacon, Cheddar cheese, deli leaf lettuce, tomato, mayo, toasted sourdough bread.", extra: "Sub avocado at no extra charge" },
        { name: "Swiss Mushroom Melt", price: "$16.95", desc: "Roasted cremini and portobello mushrooms, caramelized onions, Swiss cheese, sourdough bread." },
        { name: "Buffalo Chicken Wrap", price: "$16.95", desc: "Crispy chicken tenders, Cheddar Jack cheese, deli leaf lettuce, tomato, Buffalo hot sauce, ranch, flour tortilla." },
        { name: "Smash Burger", price: "$18.95", desc: "5 oz patty, bacon, American cheese, iceberg, 1000 Island, potato roll.", extra: "Sub plant based at no extra charge" },
        { name: "Spicy Chicken Sandwich", price: "$18.95", desc: "Southern fried chicken breast, cheese, iceberg, tomato, chipotle mayo." },
      ],
    },
    {
      title: "Aces Pizza",
      intro: "Golden, crispy Detroit-style deep dish pizza stacked with premium toppings and bold flavours in every slice.",
      items: [
        { name: "Cheese", price: "$22.95", desc: "Red sauce, brick cheese, mozzarella cheese, chili flakes." },
        { name: "Pepperoni", price: "$24.95", desc: "Red sauce, brick cheese, mozzarella cheese, crispy pepperoni." },
        { name: "Supreme Deluxe", price: "$25.95", desc: "Red sauce, brick cheese, mozzarella cheese, pepperoni, bacon, Italian sausage, green pepper, mushrooms, black olives." },
      ],
    },
    {
      title: "Mains",
      items: [
        { name: "Fish & Chips", note: "(1 pc / 2 pc)", price: "$19.95 / $24.95", desc: "Beer battered haddock, fries, coleslaw, tartar sauce, lemon wedge." },
        { name: "Crispy Chicken Tenders & Fries", price: "$16.95", desc: "Seasoned chicken fingers, fries, Buffalo sauce." },
        { name: "Guinness & Steak Pie", price: "$22.95", desc: "Braised beef in Guinness with root vegetables and puff pastry." },
      ],
    },
    {
      title: "Salads",
      items: [
        { name: "Chopped Caesar Salad", price: "$14.95", desc: "Romaine, croutons, bacon, Grana Padano.", extra: "Add chicken for $5.95" },
        { name: "Irish Pub Salad", price: "$15.95", desc: "Deli leaf lettuce, Cheddar, cucumber, onions, pickled beans and beets, hard boiled egg, lemon and dill dressing.", extra: "Add chicken for $5.95" },
      ],
    },
    {
      title: "Sides",
      items: [
        { name: "House Salad", price: "$6.95" },
        { name: "Fries", price: "$6.95" },
        { name: "Onion Rings", price: "$7.95" },
        { name: "Poutine", price: "$11.95" },
      ],
    },
  ],
  drinks: [
    {
      title: "Beer",
      items: [
        { name: "Domestic Draft Beer", note: "(16 oz)", price: "$9.95", desc: "Budweiser, Bud Light, Michelob Ultra." },
        { name: "Premium Draft Beer", note: "(16 oz)", price: "$10.95", desc: "Mill St. Tankhouse, Mill St. Organic, Mill St. Blue Wave, Mill St. Haze Phaze IPA, Mill St. Orange Citrus Wheat, Stella Artois." },
        { name: "Draft Cider", note: "(16 oz)", price: "$11.95", desc: "Brickworks Batch 1904." },
        { name: "Guinness", note: "(20 oz)", price: "$7.95", desc: "All day, every day." },
        { name: "Tall Cans", note: "(473 ml)", price: "$8.95", desc: "Budweiser, Bud Light, Goose Island IPA." },
        { name: "Domestic Pitchers", price: "$32.95", desc: "Budweiser, Bud Light, Michelob Ultra." },
        { name: "Premium Pitchers", price: "$35.95", desc: "Mill St. Tankhouse, Mill St. Organic, Mill St. Blue Wave, Mill St. Haze Phaze IPA, Mill St. Orange Citrus Wheat, Stella Artois." },
        { name: "Draft Towers", price: "$64.95", desc: "Budweiser, Bud Light, Michelob Ultra." },
        { name: "Corona Bottle", price: "$8.95" },
        { name: "Corona Bucket", note: "(5 bottles)", price: "$39.95" },
        { name: "Nütrl", price: "$10.95" },
      ],
    },
    {
      title: "Cocktails",
      items: [
        { name: "Irish Mule", price: "$13.95", desc: "Jameson Irish Whiskey, fresh lime juice, ginger beer, mint and lime garnish." },
        { name: "Dublin Spritz", price: "$14.95", desc: "Aperol, prosecco, orange wheel." },
        { name: "Classic Caesar", price: "$13.95", desc: "Smirnoff Vodka, Mott's Clamato, Worcestershire sauce, Tabasco and Matt & Steve's Extreme Bean." },
        { name: "Old Fashioned", price: "$13.95", desc: "Bulleit Bourbon, Monin cane syrup, Angostura bitters, orange peel garnish." },
        { name: "Mimosa", price: "$10.95", desc: "Prosecco, orange juice, orange wheel." },
      ],
    },
    {
      title: "Wine",
      intro: "Glass / bottle.",
      items: [],
      groups: [
        { label: "White", items: [{ name: "Gabbiano Pinot Grigio", price: "$12.95 / $59.95" }, { name: "Beringer Main & Vine Pinot Grigio", price: "$15.95 / $69.95" }] },
        { label: "Red", items: [{ name: "Gabbiano Chianti", price: "$12.95 / $59.95" }, { name: "Beringer Main & Vine Cabernet Sauvignon", price: "$15.95 / $69.95" }] },
        { label: "Sparkling", items: [{ name: "Mionetto Brut Prosecco", price: "$14.95 / $64.95" }] },
      ],
    },
    {
      title: "Non-Alcoholic",
      items: [
        { name: "Edna's Mule", price: "$10.95" },
        { name: "Corona Cero", price: "$8.95" },
        { name: "Guinness 0", price: "$8.95" },
        { name: "Gruvi", price: "$8.95", desc: "Golden Lager, Juicy IPA." },
        { name: "Gruvi Dry Secco", price: "$10.95" },
        { name: "Red Bull", price: "$5.95" },
      ],
    },
  ],
  happyHour: {
    when: "4 PM to 6 PM, Sunday to Friday",
    sections: [
      {
        title: "Drinks",
        intro: "Add a shot of Jameson to your beer for +$6.",
        items: [
          { name: "Budweiser", price: "$5.95" },
          { name: "Bud Light", price: "$5.95" },
          { name: "Mill Street Organic", price: "$5.95" },
          { name: "Mill Street Hazy IPA", price: "$5.95" },
          { name: "Bottles of Wine", price: "Half price" },
        ],
      },
      {
        title: "Food",
        intro: "All $6.95.",
        items: [
          { name: "Chips and Dip", price: "$6.95", desc: "BBQ chips with roasted onion dip." },
          { name: "Single Smash Cheeseburger", price: "$6.95", desc: "All beef patty, American cheese, 1000 Island, iceberg lettuce." },
          { name: "Solo Nachos", price: "$6.95", desc: "Mixed cheese, jalapeños, tomatoes, green onion, sour cream." },
        ],
      },
    ],
  },
};

const MENUS: Partial<Record<LocationSlug, LocationMenus>> = { adelaide: ADELAIDE };

export function getMenus(slug: LocationSlug): LocationMenus | undefined {
  return MENUS[slug];
}
