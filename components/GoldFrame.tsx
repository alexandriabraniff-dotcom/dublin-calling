// Double gold border from the logo ring: one thick line, a green gap, one thin line.
// "sm" is a lighter version for small tiles.
export default function GoldFrame({
  children,
  className = "",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "sm";
}) {
  const outer = size === "sm" ? "border-[3px] p-[2px]" : "border-4 p-[3px]";
  const inner = size === "sm" ? "border" : "border-2";
  return (
    <div className={`${outer} border-[#F2B035] bg-[#0F5132] ${className}`}>
      <div className={`${inner} border-[#F2B035] relative w-full h-full overflow-hidden`}>{children}</div>
    </div>
  );
}
