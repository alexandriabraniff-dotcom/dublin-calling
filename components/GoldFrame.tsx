// Double gold border from the logo ring: one thick line, a green gap, one thin line
export default function GoldFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-4 border-[#F2B035] bg-[#0F5132] p-[3px] ${className}`}>
      <div className="border-2 border-[#F2B035] relative w-full h-full overflow-hidden">{children}</div>
    </div>
  );
}
