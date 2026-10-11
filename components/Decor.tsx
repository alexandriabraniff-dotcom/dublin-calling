/* Decorative mono illustrations (from the Figma set) placed at the spots the client marked.
   The layer spans the full screen width over its parent, so x is a % of the viewport and
   y is any CSS length relative to the parent (e.g. "50%" or "calc(100% + 40px)").
   `spots` show from md up; `mobileSpots` show below md (the layout stacks there, so they get
   their own positions in gaps and edges). Purely decorative: hidden from assistive tech,
   not clickable, behind content unless `front`. */

export type DecorName = "beers" | "shamrock" | "eight-ball" | "pennant";

export interface DecorSpot {
  name: DecorName;
  x: number; // centre, % of viewport width
  y: string; // centre, relative to the parent
  rotate?: number;
  scale?: number; // 1 = default size
  front?: boolean; // sit in front of photos/frames like a sticker instead of behind content
}

const DESKTOP_SIZE = "clamp(110px, 12vw, 190px)";
const MOBILE_SIZE = "clamp(84px, 26vw, 130px)";

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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/decor/${s.name}.webp`}
          alt=""
          loading="lazy"
          className="absolute h-auto select-none opacity-80"
          style={{
            left: `${s.x}%`,
            top: s.y,
            width: `calc(${size} * ${s.scale ?? 1})`,
            transform: `translate(-50%, -50%) rotate(${s.rotate ?? 0}deg)`,
          }}
        />
      ))}
    </div>
  );
}
