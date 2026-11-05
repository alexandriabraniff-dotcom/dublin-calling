/* Decorative illustrations (from the Figma set) placed at the spots the client marked.
   The layer spans the full screen width over its parent, so x is a % of the viewport and
   y is any CSS length relative to the parent (e.g. "50%" or "calc(100% + 40px)").
   `spots` show from md up; `mobileSpots` show below md (the layout stacks there, so they get
   their own positions in gaps and edges). Purely decorative: hidden from assistive tech,
   not clickable, behind content unless `front`.

   Every drawing is shown at the SAME visual size (client, 2026-11-04): each one covers the same
   area whatever its shape, so a tall foam finger and a wide bat read as equally big. */

export type DecorName =
  | "beers"
  | "eight-ball"
  | "football"
  | "hockey"
  | "basketball"
  | "soccer-ball"
  | "jersey"
  | "foam-finger"
  | "mma-gloves"
  | "baseball-bat"
  | "burger"
  | "wings"
  | "happy-hour"
  | "title-belt"
  | "lightbulb";

// width / height of each trimmed drawing in public/decor
const ASPECT: Record<DecorName, number> = {
  beers: 440 / 375,
  "eight-ball": 440 / 439,
  football: 440 / 363,
  hockey: 440 / 382,
  basketball: 436 / 440,
  "soccer-ball": 1,
  jersey: 426 / 440,
  "foam-finger": 248 / 440,
  "mma-gloves": 415 / 440,
  "baseball-bat": 440 / 282,
  burger: 440 / 368,
  wings: 440 / 355,
  "happy-hour": 440 / 340,
  lightbulb: 375 / 440,
  "title-belt": 440 / 253,
};

export interface DecorSpot {
  name: DecorName;
  x: number; // centre, % of viewport width
  y: string; // centre, relative to the parent
  rotate?: number;
  front?: boolean; // sit in front of photos/frames like a sticker instead of behind content
}

// The one size for every drawing: the side of a square with the same area
export const DESKTOP_SIZE = "clamp(100px, 10vw, 150px)";
export const MOBILE_SIZE = "clamp(64px, 19vw, 84px)";

// Width for a drawing so its area matches a size x size square
export const decorWidth = (name: DecorName, size: string) => `calc(${size} * ${Math.sqrt(ASPECT[name]).toFixed(3)})`;

// faded: the homepage drawings sit behind content at 80%; the page headers show them at full strength
export function DecorImg({ name, size, rotate = 0, className = "", faded = true }: { name: DecorName; size: string; rotate?: number; className?: string; faded?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/decor/${name}.webp`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`h-auto select-none pointer-events-none ${faded ? "opacity-80" : ""} ${className}`}
      style={{ width: decorWidth(name, size), transform: `rotate(${rotate}deg)` }}
    />
  );
}

export default function DecorLayer({ spots = [], mobileSpots = [] }: { spots?: DecorSpot[]; mobileSpots?: DecorSpot[] }) {
  return (
    <>
      <Layer spots={spots.filter((s) => !s.front)} z="-z-10" show="hidden md:block" size={DESKTOP_SIZE} />
      <Layer spots={spots.filter((s) => s.front)} z="z-10" show="hidden md:block" size={DESKTOP_SIZE} />
      <Layer spots={mobileSpots.filter((s) => !s.front)} z="-z-10" show="md:hidden" size={MOBILE_SIZE} />
      <Layer spots={mobileSpots.filter((s) => s.front)} z="z-10" show="md:hidden" size={MOBILE_SIZE} />
    </>
  );
}

function Layer({ spots, z, show, size }: { spots: DecorSpot[]; z: string; show: string; size: string }) {
  if (spots.length === 0) return null;
  return (
    <div aria-hidden="true" className={`${show} pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 ${z}`}>
      {spots.map((s, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x}%`, top: s.y }}>
          <DecorImg name={s.name} size={size} rotate={s.rotate} />
        </div>
      ))}
    </div>
  );
}
