/* Decorative mono illustrations (from the Figma set) placed at the spots the client marked.
   The layer spans the full screen width over its parent, so x is a % of the viewport and
   y is any CSS length relative to the parent (e.g. "50%" or "calc(100% + 40px)").
   Purely decorative: hidden from assistive tech, not clickable, behind content, hidden on phones. */

export type DecorName = "beers" | "shamrock" | "eight-ball" | "pennant";

export interface DecorSpot {
  name: DecorName;
  x: number; // centre, % of viewport width
  y: string; // centre, relative to the parent
  rotate?: number;
  scale?: number; // 1 = default size
  front?: boolean; // sit in front of photos/frames like a sticker instead of behind content
}

export default function DecorLayer({ spots }: { spots: DecorSpot[] }) {
  const back = spots.filter((s) => !s.front);
  const front = spots.filter((s) => s.front);
  return (
    <>
      {back.length > 0 && <Layer spots={back} z="-z-10" />}
      {front.length > 0 && <Layer spots={front} z="z-10" />}
    </>
  );
}

function Layer({ spots, z }: { spots: DecorSpot[]; z: string }) {
  return (
    <div aria-hidden="true" className={`hidden md:block pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 ${z}`}>
      {spots.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/decor/${s.name}.webp`}
          alt=""
          loading="lazy"
          className="absolute h-auto select-none"
          style={{
            left: `${s.x}%`,
            top: s.y,
            width: `calc(clamp(110px, 12vw, 190px) * ${s.scale ?? 1})`,
            transform: `translate(-50%, -50%) rotate(${s.rotate ?? 0}deg)`,
          }}
        />
      ))}
    </div>
  );
}
