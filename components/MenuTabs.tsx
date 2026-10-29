"use client";

import { useRef, useState, useSyncExternalStore } from "react";

export interface MenuPanel {
  id: string; // also the ?tab= value
  label: string;
  content: React.ReactNode;
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/* Second nav bar on the Menus page: sticks under the header, one tab per menu.
   Every panel is in the HTML (search engines read all menus); inactive ones are hidden. */
export default function MenuTabs({ panels }: { panels: MenuPanel[] }) {
  // ?tab= in the URL picks the opening tab (links like /adelaide/menu?tab=happy-hour)
  const urlTab = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get("tab"),
    () => null,
  );
  const [picked, setPicked] = useState<string | null>(null);
  const active = picked ?? (panels.some((p) => p.id === urlTab) ? urlTab! : panels[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function choose(id: string, focus = false) {
    setPicked(id);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    window.history.replaceState(null, "", url);
    if (focus) tabRefs.current[panels.findIndex((p) => p.id === id)]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const n = panels.length;
    const to = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    choose(panels[to].id, true);
  }

  return (
    <>
      <div className="sticky top-[60px] lg:top-[72px] z-40 bg-[#101010]/95 backdrop-blur border-b border-white/10">
        <div role="tablist" aria-label="Menus" className="max-w-5xl mx-auto px-4 flex justify-center gap-1 sm:gap-3">
          {panels.map((p, i) => {
            const on = p.id === active;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tab-${p.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`panel-${p.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => choose(p.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`flex-1 sm:flex-none min-h-12 px-3 sm:px-8 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] border-b-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F2B035] ${
                  on ? "border-[#F2B035] text-[#F2B035]" : "border-transparent text-[#F4EFE6]/80 hover:text-[#F4EFE6]"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {panels.map((p) => (
        <div key={p.id} id={`panel-${p.id}`} role="tabpanel" aria-labelledby={`tab-${p.id}`} hidden={p.id !== active} tabIndex={0} className="focus:outline-none">
          {p.content}
        </div>
      ))}
    </>
  );
}
