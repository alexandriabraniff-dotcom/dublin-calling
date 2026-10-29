"use client";

import { useEffect, useRef, useState } from "react";
import { addDays, fmt, toISO, toUTC } from "@/lib/dates";

/* Small month calendar pop-up. Arrow keys move between days, Enter picks, Escape closes. */
export default function DatePicker({ today, selected, onPick }: { today: string; selected: string; onPick: (iso: string) => void }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(selected);
  const [month, setMonth] = useState(selected.slice(0, 7)); // YYYY-MM
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep keyboard focus on the highlighted day as it moves
  useEffect(() => {
    if (open) gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focused}"]`)?.focus();
  }, [open, focused, month]);

  function toggle() {
    if (!open) {
      setFocused(selected);
      setMonth(selected.slice(0, 7));
    }
    setOpen(!open);
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function pick(iso: string) {
    onPick(iso);
    close();
  }

  function moveFocus(iso: string) {
    if (iso < today) iso = today;
    setFocused(iso);
    setMonth(iso.slice(0, 7));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in moves) {
      e.preventDefault();
      moveFocus(addDays(focused, moves[e.key]));
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  const first = month + "-01";
  const firstDow = new Date(toUTC(first)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(+month.slice(0, 4), +month.slice(5, 7), 0)).getUTCDate();
  const cells: (string | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => addDays(first, i)),
  ];
  const shiftMonth = (n: number) => {
    const d = new Date(toUTC(first));
    d.setUTCMonth(d.getUTCMonth() + n);
    const m = toISO(d.getTime()).slice(0, 7);
    setMonth(m);
    setFocused(m === today.slice(0, 7) ? today : m + "-01");
  };
  const canPrevMonth = month > today.slice(0, 7);
  const weekEnd = addDays(selected, 6);

  return (
    <div ref={wrapRef} className="relative w-full sm:w-auto">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="btn min-h-11 px-5 flex items-center gap-2 bg-[#F2B035] text-[#101010] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#e0a020] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Choose a Date
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose a date to see that week"
          onKeyDown={onKeyDown}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-40 w-[min(20rem,calc(100vw-2rem))] border-4 border-[#F2B035] bg-[#0F5132] p-[3px] text-left"
        >
          <div className="border-2 border-[#F2B035] bg-[#101010] p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                disabled={!canPrevMonth}
                aria-label="Previous month"
                className="w-12 h-12 flex items-center justify-center text-[#F2B035] hover:bg-white/10 disabled:opacity-30"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <p className="text-white text-sm font-semibold" aria-live="polite">
                {fmt(first, { month: "long", year: "numeric" })}
              </p>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className="w-12 h-12 flex items-center justify-center text-[#F2B035] hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-1" aria-hidden="true">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d} className="text-white/75 text-[11px] uppercase">{d}</span>
              ))}
            </div>
            <div ref={gridRef} className="grid grid-cols-7 gap-1">
              {cells.map((iso, i) =>
                iso === null ? (
                  <span key={`e${i}`} />
                ) : (
                  <button
                    key={iso}
                    type="button"
                    data-date={iso}
                    tabIndex={iso === focused ? 0 : -1}
                    disabled={iso < today}
                    onClick={() => pick(iso)}
                    aria-label={fmt(iso, { weekday: "long", month: "long", day: "numeric", year: "numeric" }) + (iso === today ? ", today" : "")}
                    aria-pressed={iso >= selected && iso <= weekEnd}
                    className={`h-10 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B035] disabled:text-white/30 disabled:cursor-not-allowed ${
                      iso >= selected && iso <= weekEnd
                        ? "bg-[#F2B035] text-[#101010] font-semibold"
                        : iso === today
                        ? "border border-[#F2B035] text-white"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {+iso.slice(8)}
                  </button>
                )
              )}
            </div>
            <p className="text-white/75 text-xs mt-3">Pick any day to see the seven days from that date.</p>
          </div>
        </div>
      )}
    </div>
  );
}
