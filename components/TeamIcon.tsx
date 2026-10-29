import Image from "next/image";

// Round team logo for listings (white disc so every logo reads on any colour)
export default function TeamIcon({ logo, name, size = 44 }: { logo: string; name: string; size?: number }) {
  return (
    <span
      className="shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-white/60"
      style={{ width: size, height: size }}
    >
      <Image src={logo} alt={name} width={size} height={size} className="w-[78%] h-[78%] object-contain" />
    </span>
  );
}
