import Image from "next/image";
import type { MenuItem, MenuSection } from "@/lib/menus";

/* A printed-menu look in real text (good for SEO): cream paper, the logo up top, spaced green
   section titles between gold rules, item names with dotted leaders to gold prices. */

const condensed = { fontFamily: "var(--font-label)" } as const;

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="break-inside-avoid mb-5">
      <div className="flex items-baseline gap-2">
        <h4 className="text-[#0F5132] uppercase font-bold tracking-[0.04em] text-[15px] md:text-base" style={condensed}>
          {item.name}
          {item.note && <span className="text-[12px] font-semibold"> {item.note}</span>}
        </h4>
        {item.price && (
          <>
            <span aria-hidden="true" className="flex-1 min-w-4 border-b-2 border-dotted border-[#B07A12]/60 translate-y-[-3px]" />
            <span className="font-text text-[#8A5A00] font-bold tabular-nums whitespace-nowrap text-[15px] md:text-base">
              {item.price}
            </span>
          </>
        )}
      </div>
      {item.desc && <p className="text-[#101010]/80 text-sm leading-relaxed mt-1">{item.desc}</p>}
      {item.extra && <p className="text-[#0F5132] text-[11px] font-bold uppercase tracking-[0.08em] mt-1">{item.extra}</p>}
    </li>
  );
}

function Section({ section }: { section: MenuSection }) {
  return (
    <section className="break-inside-avoid mb-10">
      <div className="border-y-2 border-[#C9962E] py-3 mb-5 text-center">
        <h3 className="text-[#0F5132] uppercase font-bold tracking-[0.35em] text-2xl md:text-3xl" style={condensed}>
          {section.title}
        </h3>
      </div>
      {section.intro && <p className="text-[#0F5132] text-xs font-bold uppercase tracking-[0.08em] text-center mb-5">{section.intro}</p>}
      {section.items.length > 0 && <ul>{section.items.map((it) => <Item key={it.name} item={it} />)}</ul>}
      {section.groups?.map((g) => (
        <div key={g.label} className="break-inside-avoid">
          <p className="font-title text-center text-[#0F5132] text-2xl mt-2 mb-2">
            {g.label}
          </p>
          <ul>{g.items.map((it) => <Item key={it.name} item={it} />)}</ul>
        </div>
      ))}
    </section>
  );
}

export default function MenuBoard({ heading, sub, sections }: { heading: string; sub?: string; sections: MenuSection[] }) {
  return (
    <div className="bg-[#F4EFE6] px-6 py-10 md:px-12 md:py-14 shadow-2xl">
      <div className="flex flex-col items-center text-center mb-10">
        <Image src="/logo.png" alt="" width={140} height={140} className="w-auto h-24 md:h-28" />
        <h2 className="mt-4 text-[#0F5132] uppercase font-bold tracking-[0.3em] text-3xl md:text-4xl" style={condensed}>
          {heading}
        </h2>
        {sub && <p className="mt-2 text-[#8A5A00] text-sm font-bold uppercase tracking-[0.15em]">{sub}</p>}
      </div>
      <div className="md:columns-2 md:gap-12">
        {sections.map((s) => (
          <Section key={s.title} section={s} />
        ))}
      </div>
    </div>
  );
}
