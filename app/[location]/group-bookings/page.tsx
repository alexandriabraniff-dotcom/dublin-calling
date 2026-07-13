import { notFound } from "next/navigation";
import { getLocation } from "@/lib/locations";

export default async function GroupBookingsPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const packages = [
    {
      name: "Social Outing",
      size: "Up to 20 guests",
      desc: "Perfect for friend groups, birthday celebrations, and casual get-togethers. Book online in minutes.",
      features: ["Reserved table or booth", "Personalized drinks package", "Sport of choice on screen", "Happy Hour eligible"],
      cta: "Book Online",
      url: loc.bookingUrl,
    },
    {
      name: "Team Event",
      size: "20–60 guests",
      desc: "Work team outings, corporate gatherings, and end-of-season parties. Contact us directly to tailor your experience.",
      features: ["Dedicated floor section", "Customised food & drink package", "Private screens for your game", "Staff dedicated to your group"],
      cta: "Email Us",
      url: `mailto:${loc.email}`,
    },
    {
      name: "Private Venue",
      size: "60+ guests",
      desc: "Full or partial venue buyout for large private events. Speak with our events team to build your perfect night.",
      features: ["Full or partial venue hire", "Custom menu curation", "AV & screen setup", "Dedicated events coordinator"],
      cta: "Contact Events Team",
      url: `mailto:${loc.email}`,
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F5132] py-20 border-b border-[#169B62]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#F2B035] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            {loc.name} — {loc.city}
          </p>
          <h1
            className="text-[#F4EFE6] text-6xl sm:text-7xl mb-4"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Group Bookings
          </h1>
          <p className="text-[#F4EFE6] opacity-60 text-lg max-w-xl">
            From birthday gatherings to full venue buyouts, Dublin Calling is
            built for big nights. We&apos;ll make sure your group has the space,
            the drinks, and the screens they need.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`rounded-xl border flex flex-col ${
                  i === 1
                    ? "bg-[#0F5132] border-[#169B62]"
                    : "bg-[#0F5132] border-[#169B62]/20"
                }`}
              >
                {i === 1 && (
                  <div className="bg-[#F2B035] text-[#101010] text-xs font-bold uppercase tracking-widest text-center py-2 rounded-t-xl">
                    Most Popular
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <h2
                      className="text-[#F4EFE6] text-3xl mb-1"
                      style={{ fontFamily: "'Lobster Two', cursive" }}
                    >
                      {pkg.name}
                    </h2>
                    <span className="inline-block text-xs font-bold text-[#F2B035] uppercase tracking-wider">
                      {pkg.size}
                    </span>
                  </div>
                  <p className="text-[#F4EFE6] opacity-65 text-sm leading-relaxed mb-6">
                    {pkg.desc}
                  </p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-[#F4EFE6] opacity-80">
                        <svg
                          className="shrink-0 mt-0.5 text-[#169B62]"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={pkg.url}
                    target={pkg.url.startsWith("http") ? "_blank" : "_self"}
                    rel={pkg.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block w-full text-center px-5 py-3 bg-[#F2B035] text-[#101010] font-bold text-sm rounded hover:bg-[#e0a020] transition-colors"
                  >
                    {pkg.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#0F5132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-[#F4EFE6] text-4xl sm:text-5xl mb-12"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Date",
                desc: "Book online for groups up to 20, or reach out directly for larger events.",
              },
              {
                step: "2",
                title: "We Get You Set Up",
                desc: "We'll confirm your space, set your screens, and curate a food and drinks package for your group.",
              },
              {
                step: "3",
                title: "Show Up & Enjoy",
                desc: "Walk in, your table is ready. Cold drinks, great food, and the game you came to watch.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="shrink-0">
                  <span
                    className="w-12 h-12 rounded-full bg-[#F2B035] text-[#101010] flex items-center justify-center text-xl font-bold"
                    style={{ fontFamily: "'Lobster Two', cursive" }}
                  >
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-[#F4EFE6] text-xl mb-2"
                    style={{ fontFamily: "'Lobster Two', cursive" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#F4EFE6] opacity-65 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-[#101010]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-[#F4EFE6] text-5xl sm:text-6xl mb-4"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Questions?
          </h2>
          <p className="text-[#F4EFE6] opacity-60 text-lg max-w-lg mx-auto mb-10">
            Reach our events team directly and we&apos;ll help you plan the
            perfect group experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${loc.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F5132] border border-[#169B62] text-[#F4EFE6] font-semibold text-sm rounded hover:bg-[#169B62] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.26 12a19.79 19.79 0 0 1-3-8.57A2 2 0 0 1 3.18 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 13 14.91l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
              </svg>
              {loc.phone}
            </a>
            <a
              href={`mailto:${loc.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F2B035] text-[#101010] font-bold text-sm rounded hover:bg-[#e0a020] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {loc.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
