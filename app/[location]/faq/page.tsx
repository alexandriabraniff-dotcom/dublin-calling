"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getLocation } from "@/lib/locations";

export default function FAQPage() {
  const params = useParams();
  const slug = params.location as string;
  const loc = getLocation(slug);

  const [open, setOpen] = useState<number | null>(null);

  if (!loc) return null;

  const generalFaqs = [
    {
      q: "Do you have Happy Hour at all locations?",
      a: "Yes! Happy Hour runs Sunday through Friday, 4:00 PM to 6:00 PM at all three Dublin Calling locations: Adelaide St (Toronto), Danforth Ave (Toronto), and Granville St (Vancouver).",
    },
    {
      q: "What sports do you broadcast?",
      a: "We show all major sports: NFL, CFL, MLB, NBA, NHL, UFC, Premier League, Bundesliga, MLS, Champions League, Rugby, and more. If there's a major game on, we've got it.",
    },
    {
      q: "Can I book for a private event?",
      a: "Absolutely. Groups of up to 20 can book online. Larger groups should contact the location directly via email or phone.",
    },
    {
      q: "Is there a dress code?",
      a: "No formal dress code. We ask all guests to be presentable and respectful. Management reserves the right to refuse entry.",
    },
    {
      q: "Are kids welcome?",
      a: "Dublin Calling is a pub environment. Age restrictions apply depending on the time and location. Please contact your nearest location to confirm.",
    },
  ];

  const allFaqs = [
    ...loc.faqs,
    ...generalFaqs.filter(
      (g) => !loc.faqs.some((l) => l.q === g.q)
    ),
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-[#101010] py-20 border-b border-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#F2B035] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            {loc.name} — {loc.city}
          </p>
          <h1
            className="text-[#F4EFE6] text-6xl sm:text-7xl mb-4"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            FAQ
          </h1>
          <p className="text-[#F4EFE6] opacity-60 text-lg max-w-xl">
            Got a question? We&apos;ve probably answered it below. If not, reach
            out directly.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-[#101010]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="divide-y divide-[#0F5132]">
            {allFaqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-6 flex items-start justify-between gap-4 group"
                  aria-expanded={open === i}
                >
                  <span
                    className="text-[#F4EFE6] font-semibold text-base group-hover:text-[#169B62] transition-colors"
                  >
                    {faq.q}
                  </span>
                  <svg
                    className={`shrink-0 text-[#169B62] mt-0.5 transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {open === i && (
                  <div className="pb-6">
                    <p className="text-[#F4EFE6] opacity-65 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#0F5132]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-[#F4EFE6] text-4xl sm:text-5xl mb-4"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Still Have a Question?
          </h2>
          <p className="text-[#F4EFE6] opacity-65 text-base max-w-md mx-auto mb-8">
            Get in touch with the {loc.name} team directly. We&apos;re happy to
            help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${loc.phone}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#101010] border border-[#169B62] text-[#F4EFE6] font-semibold text-sm rounded hover:bg-[#169B62] transition-colors"
            >
              {loc.phone}
            </a>
            <a
              href={`mailto:${loc.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F2B035] text-[#101010] font-bold text-sm rounded hover:bg-[#e0a020] transition-colors"
            >
              {loc.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
