import type { Location } from "@/lib/locations";

export interface ExperienceItem {
  title: string;
  body: string;
  image?: string;
}

// Shared by the homepage "The Experience" section and the About page
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

  if (loc.slug === "vancouver") {
    items.push(
      {
        title: "Three Floors, Three Experiences",
        body: "Dublin Calling is a three-storey building, and every floor holds something new. Start the night with the game on the big screens, find your crew on another level, and keep the party moving as the night goes on. One address, three completely different experiences.",
      },
      {
        title: "Never a Dull Moment",
        body: "Waiting for the next UFC fight to start or halftime to wrap up? Rack up a game on our pool tables, test your power on the punching bag machines and more. There's always something to keep you busy between the big moments.",
      }
    );
  }

  return items;
}

// Extra rows shown on the About page only, after the shared Experience rows
export function getAboutExtras(loc: Location): ExperienceItem[] {
  if (loc.slug !== "vancouver") return [];
  return [
    {
      title: "Live DJ on Every Floor",
      body: "When the night picks up, every floor gets its own DJ. Three levels, three soundtracks, one big party on Granville Street. Find the floor that matches your mood, or keep moving between them all night long.",
    },
  ];
}
