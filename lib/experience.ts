import type { Location } from "@/lib/locations";

export interface ExperienceItem {
  title: string;
  body: string;
  image?: string;
}

// Rows in the homepage About section, after Our Story: big screens, beers on tap, DJs
const TAPS: Record<string, { title: string; body: string }> = {
  vancouver: {
    title: "12+ Beers on Tap",
    body: "Twelve taps, always rotating, with Canadian craft favourites poured alongside the classics. Ask your server what's pouring tonight and grab a pint for the game.",
  },
  // From the Adelaide drinks menu: 3 domestic, 6 premium, cider and Guinness on draught
  adelaide: {
    title: "10+ Beers on Tap",
    body: "Bud, Bud Light and Michelob Ultra, the Mill St. lineup, Stella, cider and a proper 20 oz Guinness, all on draught. Grab a pint, or a tower for the table, and settle in for the game.",
  },
};

const STREET: Record<string, string> = { vancouver: "Granville Street", adelaide: "Adelaide Street", danforth: "the Danforth" };

export function getExperience(loc: Location): ExperienceItem[] {
  const taps = TAPS[loc.slug] ?? {
    title: "Beers on Tap",
    body: "Draught pints, craft cans, and a cocktail list built for long nights. Whatever you're drinking, it comes out cold and keeps coming.",
  };
  return [
    {
      title: `${loc.stats[0].value} Big Screens`,
      body: `Every major game, every sport. ${loc.stats[0].value} big screens across the room mean you never miss a moment, wherever you're sitting. Hockey, football, UFC, soccer and more, all live with a crowd that cares as much as you do.`,
      image: "/big-screens.png",
    },
    { ...taps, image: "/beers-on-tap.jpg" },
    {
      title: "DJs & Live Music on Weekends",
      body: `When the night picks up, Dublin Calling brings the party to ${STREET[loc.slug] ?? "the city"}. With DJs spinning and live music every weekend, there's always a reason to hit the dance floor, sing along, and keep the good times going all night long.`,
    },
  ];
}
