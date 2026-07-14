"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getLocation } from "@/lib/locations";

export default function FAQPage() {
  const params = useParams();
  const loc = getLocation(params.location as string);
  const [open, setOpen] = useState<number | null>(null);

  if (!loc) return null;

  const generalFaqs = [
    { q: "Do you have Happy Hour at all locations?", a: "Yes. Sunday through Friday, 4:00 PM to 6:00 PM at all three Dublin Calling locations." },
    { q: "What sports do you broadcast?", a: "All major sports: NFL, CFL, MLB, NBA, NHL, UFC, Premier League, Bundesliga, MLS, Champions League, Rugby, and more." },
    { q: "Can I book for a private event?", a: "Absolutely. Groups of up to 20 can book online. Larger groups should contact the location directly." },
    { q: "Is there a dress code?", a: "No formal dress code. We ask all guests to be presentable and respectful. Management reserves the right to refuse entry." },
  ];

  const allFaqs = [
    ...loc.faqs,
    ...generalFaqs.filter((g) => !loc.faqs.some((l) => l.q === g.q)),
  ];

  return (
    <>
      <section className="bg-[#0F5132] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p
            className="text-[#F2B035] mb-4"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em" }}
          >
            {loc.name.toUpperCase()} &nbsp;·&nbsp; {loc.city.toUpperCase()}
          </p>
          <h1
            className="text-[#F4EFE6] mb-4"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            FAQ
          </h1>
          <p className="text-[#F4EFE6]/50 text-lg font-light max-w-xl">
            Got a question? We&apos;ve probably answered it below. If not, reach out directly.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#101010]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="divide-y divide-white/8">
            {allFaqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                  aria-expanded={open === i}
                >
                  <span className="text-[#F4EFE6] font-semibold text-sm group-hover:text-[#F2B035] transition-colors">
                    {faq.q}
                  </span>
                  <svg
                    className={`shrink-0 text-[#169B62] mt-0.5 transition-transform ${open === i ? "rotate-180" : ""}`}
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {open === i && (
                  <div className="pb-6">
                    <p className="text-[#F4EFE6]/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0F5132] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-[#F4EFE6] mb-4"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Still Have a Question?
          </h2>
          <p className="text-[#F4EFE6]/50 text-base max-w-sm mx-auto mb-8">
            Get in touch with the {loc.name} team directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${loc.phone}`}
              className="inline-flex items-center px-7 py-3 bg-[#101010] border border-white/15 text-[#F4EFE6] hover:border-[#F2B035] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              {loc.phone}
            </a>
            <a
              href={`mailto:${loc.email}`}
              className="inline-flex items-center px-7 py-3 bg-[#F2B035] text-[#101010] hover:bg-[#e0a020] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em" }}
            >
              {loc.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
