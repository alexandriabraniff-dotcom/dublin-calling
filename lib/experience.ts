import type { Location } from "@/lib/locations";

export interface ExperienceItem {
  title: string;
  body: string;
  image?: string;
}

// Rows in the homepage About section
export function getExperience(loc: Location): ExperienceItem[] {
  const items: ExperienceItem[] = [
    {
      title: `${loc.stats[0].value} Big Screens`,
      body: `Every major game, every sport. ${loc.stats[0].value} big screens across the room mean you never miss a moment, wherever you're sitting. Hockey, football, UFC, soccer and more, all live with a crowd that cares as much as you do.`,
      image: "/big-screens.png",
    },
    {
      title: loc.slug === "vancouver" ? "12+ Beers on Tap" : "Ice-Cold Draught",
      body:
        loc.slug === "vancouver"
          ? "Twelve taps, always rotating, with Canadian craft favourites poured alongside the classics. Ask your server what's pouring tonight and grab a pint for the game."
          : "Draught pints, craft cans, and a cocktail list built for long nights. Whatever you're drinking, it comes out cold and keeps coming.",
      image: loc.slug === "vancouver" ? "/beers-on-tap.jpg" : undefined,
    },
  ];

  return items;
}

// Extra About rows, Vancouver only, after the shared rows
export function getAboutExtras(loc: Location): ExperienceItem[] {
  if (loc.slug !== "vancouver") return [];
  return [
    {
      title: "DJs & Live Music on Weekends",
      body: "When the night picks up, Dublin Calling brings the party to Granville Street. With DJs spinning and live music every weekend, there's always a reason to hit the dance floor, sing along, and keep the good times going all night long.",
    },
  ];
}
