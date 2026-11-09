import type { LocationSlug } from "@/lib/locations";

/* Typed menus (real text for SEO, styled like the printed menus on the Menus page).
   Adelaide is transcribed from the dublincalling.com/toronto/menu images (Oct 2026), Danforth from
   dublincalling.com/danforth/menu (Nov 2026), Vancouver from the dcv_menu PDF (Oct 2026).
   A location without a happyHour menu shows the generic Happy Hour box instead. */

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

// Transcribed from the dublincalling.com/danforth/menu images (Nov 2026)
const DANFORTH: LocationMenus = {
  food: [
    {
      title: "Weekly Specials",
      items: [],
      groups: [
        { label: "Sunday", items: [{ name: "Pulled Pork Sandwich", price: "$16.95", desc: "BBQ pulled pork, pickles, coleslaw." }] },
        { label: "Monday", items: [{ name: "Steak Pie", price: "$18.95", desc: "Guinness braised beef and root veg in puff pastry." }] },
        { label: "Tuesday", items: [{ name: "Chicken Wrap", price: "$19.95", desc: "Crispy chicken tender, Jack cheese, lettuce, tomatoes, Buffalo and ranch dressing." }] },
        { label: "Wednesday", items: [{ name: "BOGO Wings", price: "$18.95", desc: "Our classic chicken wings with your choice of sauce." }] },
        { label: "Thursday", items: [{ name: "Pork Mac N' Cheese", price: "$18.95", desc: "BBQ pulled pork served with 3 cheese mac n' cheese." }] },
        { label: "Friday", items: [{ name: "Fish N' Chips", price: "$20.95", desc: "Beer-battered haddock, coleslaw, tartar sauce, lemon." }] },
        { label: "Saturday", items: [{ name: "Beef Dip", price: "$18.95", desc: "Braised short rib, served with jus." }] },
      ],
    },
    {
      title: "Bills Game Days",
      intro: "Monday, Thursday and Sunday.",
      items: [
        { name: "Bills Box", price: "$39.95" },
        { name: "Wings of the Week", price: "$13.95" },
        { name: "Game Day Pitchers", price: "$29.95" },
        { name: "Sunday Sports Buffet", desc: "Every Sunday game day." },
      ],
    },
    {
      title: "Appetizers",
      items: [
        { name: "Vegetable Spring Rolls", note: "(5 pcs)", price: "$12.95", desc: "Served with sweet chili sauce." },
        { name: "Fried Pickles", note: "(5 pcs)", price: "$12.95", desc: "Served with buttermilk ranch." },
        { name: "Mozzarella Sticks", note: "(5 pcs)", price: "$13.95", desc: "Served with marinara." },
        { name: "Quesadilla", price: "$16.95", desc: "Cheddar Jack, refried beans, tomatoes, pickled jalapenos. Served with salsa and sour cream." },
        { name: "Chicken Wings", note: "(1 lb / 2 lb)", price: "$18.95 / $32.95", desc: "Lightly breaded and fried. Served with ranch or blue cheese dip. Wet: DC Hot, BBQ, Honey Garlic, Buffalo. Dry: Salt and Pepper, Lemon Pepper." },
        { name: "DC Nachos", price: "$20.95", desc: "Corn chips, Cheddar Jack, pickled jalapenos, olives, tomatoes, green onions. Served with salsa and sour cream.", extra: "Add guac or refried beans $3.95. Add chili beef or spicy chicken $5.95" },
      ],
    },
    {
      title: "Handhelds",
      intro: "All handhelds come with your choice of fries or house salad. Upgrade to poutine or Caesar salad.",
      items: [
        { name: "Smash Burger", price: "$20.95", desc: "5 oz patty, bacon, cheese, iceberg, 1000 Island, Martin's bun.", extra: "Sub plant based at no extra charge. Make it a double $4.95" },
        { name: "Spicy Chicken Sandwich", price: "$20.95", desc: "Southern fried chicken breast, iceberg, tomatoes, chipotle mayo." },
        { name: "Turkey Clubhouse Sandwich", price: "$21.95", desc: "Roasted turkey breast, bacon, Cheddar, lettuce, tomatoes, mayo, toasted sourdough bread.", extra: "Sub avocado at no extra charge" },
        { name: "Swiss Mushroom Melt", price: "$21.95", desc: "Braised portobello mushrooms and cremini, caramelized onions, Swiss cheese, sourdough." },
        { name: "Buffalo Chicken Wrap", price: "$22.95", desc: "Crispy chicken tenders, Cheddar Jack, lettuce, tomatoes, Buffalo sauce, ranch, flour tortilla." },
      ],
    },
    {
      title: "Aces Pizza",
      intro: "Detroit-style deep dish pizza.",
      items: [
        { name: "Cheese", price: "$22.95", desc: "Red sauce, brick cheese, mozzarella cheese, chili flakes." },
        { name: "Pepperoni", price: "$24.95", desc: "Red sauce, brick cheese, mozzarella cheese, crispy pepperoni." },
        { name: "Aloha", price: "$25.95", desc: "Red sauce, brick cheese, mozzarella cheese, smoked ham hock, Hawaiian BBQ sauce, pickled red onion." },
        { name: "Carnivore", price: "$25.95", desc: "Red sauce, brick cheese, mozzarella cheese, pepperoni, bacon, sopressata, Italian sausage." },
        { name: "Supreme Deluxe", price: "$25.95", desc: "Red sauce, brick cheese, mozzarella cheese, pepperoni, bacon, Italian sausage, green pepper, mushrooms, black olives." },
        { name: "Korean Fried Chicken", price: "$25.95", desc: "Red sauce, brick cheese, mozzarella cheese, Korean fried chicken, Korean BBQ sauce, kimchi, green onions, sesame seeds." },
        { name: "Canadian", price: "$24.95", desc: "Red sauce, brick cheese, mozzarella cheese, bacon, pepperoni, mushrooms." },
        { name: "Veggie", price: "$24.95", desc: "Red sauce, brick cheese, mozzarella cheese, mushroom, peppers, artichoke, zucchini, basil." },
      ],
    },
    {
      title: "Plates",
      items: [
        { name: "Tenders & Fries", price: "$17.95", desc: "Crispy seasoned chicken fingers, fries. Served with ranch." },
        { name: "Guinness & Steak Pie", price: "$22.95", desc: "Braised beef in Guinness with root vegetables and puff pastry." },
        { name: "Fish & Chips", note: "(1 pc / 2 pc)", price: "$25.95 / $32.95", desc: "Beer battered haddock, fries, coleslaw, tartar sauce, lemon wedge." },
      ],
    },
    {
      title: "Salads",
      items: [
        { name: "Caesar Salad", price: "$14.95", desc: "Romaine, croutons, bacon, Parm, housemade dressing.", extra: "Add chicken for $5.95" },
        { name: "Irish Pub Salad", price: "$15.95", desc: "Mixed lettuce, Cheddar, cucumbers, red onions, pickled beans and beets, hard boiled egg, lemon dill dressing.", extra: "Add chicken for $5.95" },
      ],
    },
    {
      title: "Sides",
      items: [
        { name: "House Salad", price: "$6.95" },
        { name: "Fries", price: "$6.95" },
        { name: "Onion Rings", price: "$7.95" },
        { name: "Poutine", price: "$12.95" },
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
      intro: "Proudly serving Coca-Cola.",
      items: [
        { name: "Corona Sunbrew", price: "$8.95" },
        { name: "Guinness 0", price: "$8.95" },
        { name: "Edna's Mule", price: "$10.95" },
        { name: "Gruvi", price: "$8.95", desc: "Golden Lager, Juicy IPA." },
        { name: "Gruvi Dry Secco", price: "$10.95" },
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
        intro: "All $7.95.",
        items: [
          { name: "Fried Pickles", price: "$7.95", desc: "Served with buttermilk ranch." },
          { name: "Single Smash Burger", price: "$7.95", desc: "All beef patty, cheese, 1000 Island, iceberg." },
          { name: "Solo Nachos", price: "$7.95", desc: "Tortilla chips, cheese, jalapenos, tomatoes, olive, green onion, salsa and sour cream." },
        ],
      },
    ],
  },
};

// Transcribed from Kaitlyn's dcv_menu_8.5x11 PDF (16 Oct 2026); no happy hour menu yet
const VANCOUVER: LocationMenus = {
  food: [
    {
      title: "Appetizers & Shareables",
      items: [
        { name: "Wings", note: "(1 lb / 2 lb)", price: "$16.95 / $29.95", desc: "Wet: DC Red Hot Sauce, BBQ, Honey Garlic, Buffalo Butter. Dry: Salt and Pepper, Lemon Pepper. Dipping sauce: ranch or blue cheese." },
        { name: "Smoked Mozzarella Sticks", note: "(5 pcs)", price: "$13.95", desc: "Spicy marinara." },
        { name: "DC Nachos", note: "(GF & V)", price: "$23.95", desc: "Corn chips, Cheddar Jack, pickled jalapenos, olives, tomatoes, green onions, guacamole, salsa, sour cream, refried beans.", extra: "Add spicy chicken or spicy beef for $5.95" },
        { name: "Fried Pickles", note: "(5 pcs)", price: "$13.95", desc: "Ranch sauce." },
        { name: "Spice Bag", price: "$18.95", desc: "Combination of fries, chicken, peppers and onions, and spices and curry." },
        { name: "Quesadilla", price: "$17.95", desc: "Cheddar Jack, refried beans, tomatoes, pickled jalapenos, salsa, sour cream.", extra: "Add spicy chicken or spicy beef for $5.95" },
        { name: "Chicken and Vegetable Potstickers", note: "(5 pcs)", price: "$13.95", desc: "Ponzu sauce." },
      ],
    },
    {
      title: "Salads",
      items: [
        { name: "Chopped Caesar Salad", price: "$15.95", desc: "Romaine, croutons, bacon, Parmesan cheese.", extra: "Add chicken for $5.95" },
        { name: "Irish Pub Salad", price: "$16.95", desc: "Deli leaf lettuce, Cheddar, cucumber, onions, pickled beans and beets, hard boiled egg, lemon and dill dressing.", extra: "Add chicken for $5.95" },
        { name: "House Salad", price: "$15.95", desc: "Deli leaf lettuce, tomatoes, cucumbers, carrots, lemon and dill dressing.", extra: "Add chicken for $5.95" },
      ],
    },
    {
      title: "Handhelds",
      intro: "All handhelds come with your choice of fries or house salad. Upgrade to onion rings, garlic Parm fries, poutine or Caesar salad +$3.95.",
      items: [
        { name: "Turkey Club House Sandwich", price: "$18.95", desc: "Roasted turkey breast, bacon, Cheddar cheese, deli leaf lettuce, tomato, mayo, toasted sourdough bread.", extra: "Substitute avocado at no extra charge" },
        { name: "Swiss Mushroom Melt", price: "$16.95", desc: "Roasted cremini and portobello mushrooms, caramelized onions, Swiss cheese, sourdough bread." },
        { name: "Buffalo Chicken Wrap", price: "$18.95", desc: "Crispy chicken tenders, Cheddar Jack cheese, leaf lettuce, tomato, Buffalo hot sauce, ranch, flour tortilla." },
        { name: "Smash Burger", price: "$18.95", desc: "5 oz patty, bacon, American cheese, iceberg, 1000 Island, potato roll.", extra: "Substitute plant based at no extra charge" },
        { name: "Spicy Chicken Sandwich", price: "$18.95", desc: "Southern fried chicken breast, cheese, iceberg, tomato, chipotle mayo." },
      ],
    },
    {
      title: "Mains",
      items: [
        { name: "Fish and Chips", note: "(1 pc / 2 pc)", price: "$19.95 / $24.95", desc: "Beer battered haddock, coleslaw, tartar sauce, lemon wedge, fries." },
        { name: "Crispy Chicken Tenders and Fries", price: "$17.95", desc: "Chicken tenders tossed in Buffalo sauce, fries, side of ranch." },
        { name: "Guinness and Steak Pie", price: "$23.95", desc: "Braised beef in Guinness with root vegetables and puff pastry." },
      ],
    },
    {
      title: "Sides",
      items: [
        { name: "House Salad", price: "$7.95" },
        { name: "Fries", price: "$7.95" },
        { name: "Caesar Salad", price: "$9.95" },
        { name: "Onion Rings", price: "$9.95" },
        { name: "Garlic Parm Fries", price: "$9.95" },
        { name: "Poutine", price: "$11.95" },
      ],
    },
  ],
  drinks: [
    {
      title: "Beer",
      items: [],
      groups: [
        { label: "16 oz Draft", items: [{ name: "Budweiser, Bud Light, Dublin Lager", price: "$9.75" }, { name: "Stanley Park & Okanagan", price: "$9.95", desc: "Stanley Park Pilsner, Amber Ale, Sunsetter, Parklandia Hazy IPA, Rotating Tap. Okanagan Apple Cider." }, { name: "Stella Artois", price: "$10.45" }] },
        { label: "Pitchers", items: [{ name: "Budweiser, Bud Light, Dublin Lager", price: "$26.95" }, { name: "Stanley Park & Okanagan", price: "$29.95", desc: "Stanley Park Pilsner, Amber Ale, Sunsetter, Parklandia Hazy IPA, Rotating Tap. Okanagan Apple Cider." }, { name: "Stella Artois", price: "$33.95" }] },
        { label: "Guinness & Bottles", items: [{ name: "Guinness Draft", note: "(20 oz)", price: "$10.95" }, { name: "Bottled Beer", note: "(341 ml)", price: "$9.75", desc: "Budweiser, Bud Light, Michelob Ultra." }, { name: "Imported Bottled Beer", note: "(330 ml)", price: "$10.25", desc: "Corona, Stella Artois." }] },
      ],
    },
    {
      title: "Ready to Drink",
      items: [
        { name: "Cans", note: "(355 ml)", price: "$10.50", desc: "Nütrl (ask your server for flavours), Mike's Hard Lemonade." },
      ],
    },
    {
      title: "Energy",
      items: [],
      groups: [
        { label: "Alcoholic", items: [{ name: "Japanese Margarita", price: "$13.95", desc: "1 oz tequila, lime juice, simple syrup, Red Bull Sudachi Lime." }, { name: "White Peach Margarita", price: "$13.95", desc: "1 oz tequila, lime juice, simple syrup, Red Bull White Peach." }, { name: "Electric Dublin Spritz", price: "$13.95", desc: "1 oz Aperol, 2 oz prosecco, Red Bull White Peach." }] },
        { label: "Non-Alcoholic", items: [{ name: "Summer Citrus Twist", price: "$9.95", desc: "Red Bull White Peach, grapefruit juice, soda, mint garnish." }, { name: "Red Bull Energy Drink", price: "$6.95", desc: "Sugarfree, White Peach." }] },
      ],
    },
    {
      title: "Spirits",
      intro: "Well: Smirnoff Vodka, Gordon's Gin, Captain Morgan White, Spiced Rum, Seagram's Canadian Whisky. Premium: Jameson, Jose Cuervo Tequila.",
      items: [],
      groups: [
        { label: "Well", items: [{ name: "1 oz", price: "$8.95" }, { name: "2 oz", price: "$14.95" }] },
        { label: "Premium", items: [{ name: "1 oz", price: "$10.95" }, { name: "2 oz", price: "$16.95" }] },
      ],
    },
    {
      title: "Features & Sharing",
      items: [],
      groups: [
        { label: "Towers of Power", items: [{ name: "Mimosa Tower", price: "$49.95" }, { name: "House Beer Tower", price: "$54.95", desc: "Bud, Bud Light, Dublin Lager." }] },
        { label: "Beer Buckets", items: [{ name: "Import Beers", price: "$39.95" }, { name: "Domestics", price: "$34.95" }] },
        { label: "Game Days", items: [{ name: "Import Beers", price: "$29.95" }, { name: "Domestics", price: "$27.95" }] },
      ],
    },
    {
      title: "Wine",
      intro: "6 oz / 9 oz / bottle.",
      items: [],
      groups: [
        { label: "White", items: [{ name: "House White", price: "$9.95 / $13.95 / $38.95" }, { name: "Mission Hill White", price: "$14.95 / $21.95 / $57.95" }] },
        { label: "Red", items: [{ name: "House Red", price: "$9.95 / $13.95 / $38.95" }, { name: "Mission Hill Red", price: "$14.95 / $21.95 / $57.95" }] },
        { label: "Rosé", items: [{ name: "House Rosé", price: "$9.95 / $13.95 / $38.95" }] },
        { label: "Sparkling", items: [{ name: "Henkell Sparkling Bottle", note: "(750 ml)", price: "$37.95" }, { name: "Henkell Sparkling Bottle", note: "(250 ml)", price: "$13.95" }] },
      ],
    },
    {
      title: "Non-Alcoholic",
      intro: "Proudly serving Coca-Cola.",
      items: [
        { name: "Red Bull Energy Drink", price: "$6.95", desc: "Sugarfree, White Peach Edition." },
        { name: "Guinness Zero", price: "$8.95" },
        { name: "Corona Cero", price: "$6.95" },
        { name: "Fentimans Ginger Beer", price: "$6.95" },
        { name: "Juice", price: "$5.95" },
        { name: "Edna's Non-Alcoholic Cocktails", price: "$7.95", desc: "Ask your server for flavours." },
        { name: "Soft Drinks", price: "$4.95", desc: "Coke, Coke Zero, Sprite, Ginger Ale, Fuze Lemon Iced Tea, Tonic, Club Soda." },
      ],
    },
  ],
};

const MENUS: Partial<Record<LocationSlug, LocationMenus>> = { adelaide: ADELAIDE, danforth: DANFORTH, vancouver: VANCOUVER };

export function getMenus(slug: LocationSlug): LocationMenus | undefined {
  return MENUS[slug];
}
