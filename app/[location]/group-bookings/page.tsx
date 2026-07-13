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
      features: ["Reserved table or booth", "Personalised drinks package", "Sport of choice on screen", "Happy Hour eligible"],
      cta: "BOOK ONLINE",
      url: loc.bookingUrl,
      featured: false,
    },
    {
      name: "Team Event",
      size: "20–60 guests",
      desc: "Work team outings, corporate gatherings, and end-of-season parties. Contact us to tailor your night.",
      features: ["Dedicated floor section", "Custom food & drink package", "Private screens for your game", "Dedicated staff"],
      cta: "EMAIL US",
      url: `mailto:${loc.email}`,
      featured: true,
    },
    {
      name: "Private Venue",
      size: "60+ guests",
      desc: "Full or partial venue buyout for large events. Our events team will build your perfect night.",
      features: ["Full or partial venue hire", "Custom menu curation", "AV & screen setup", "Dedicated events coordinator"],
      cta: "CONTACT EVENTS",
      url: `mailto:${loc.email}`,
      featured: false,
    },
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
            style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(3rem, 10vw, 6.5rem)" }}
          >
            Group Bookings
          </h1>
          <p className="text-[#F4EFE6]/50 text-lg font-light max-w-xl">
            From birthday gatherings to full venue buyouts. We&apos;ll make sure your group has the space, drinks, and screens they need.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-[#101010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`border flex flex-col ${
                  pkg.featured ? "border-[#F2B035]" : "border-white/8"
                } bg-[#0F5132]`}
              >
                {pkg.featured && (
                  <div
                    className="bg-[#F2B035] text-[#101010] text-center py-2"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em" }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <p
                    className="text-[#F2B035] mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em" }}
                  >
                    {pkg.size.toUpperCase()}
                  </p>
                  <h2
                    className="text-[#F4EFE6] mb-4"
                    style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
                  >
                    {pkg.name}
                  </h2>
                  <p className="text-[#F4EFE6]/50 text-sm leading-relaxed mb-6">{pkg.desc}</p>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-[#F4EFE6]/70">
                        <svg className="shrink-0 mt-0.5 text-[#169B62]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={pkg.url}
                    target={pkg.url.startsWith("http") ? "_blank" : "_self"}
                    rel={pkg.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block w-full text-center py-3 bg-[#F2B035] text-[#101010] hover:bg-[#e0a020] transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em" }}
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
      <section className="py-16 bg-[#0F5132] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-[#F4EFE6] mb-12"
            style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { step: "1", title: "Choose Your Date", desc: "Book online for up to 20. Reach out directly for larger events." },
              { step: "2", title: "We Get You Set Up", desc: "We confirm your space, set your screens, and sort your food and drinks package." },
              { step: "3", title: "Show Up & Enjoy", desc: "Walk in, your table is ready. Cold drinks, great food, and the game you came to watch." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div
                  className="w-10 h-10 bg-[#F2B035] text-[#101010] flex items-center justify-center shrink-0"
                  style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.2rem" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3
                    className="text-[#F4EFE6] mb-2"
                    style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.4rem" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#F4EFE6]/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-[#101010] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-[#F4EFE6] mb-4"
            style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Questions?
          </h2>
          <p className="text-[#F4EFE6]/50 text-base max-w-sm mx-auto mb-8">
            Reach our events team at {loc.name} directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${loc.phone}`}
              className="inline-flex items-center px-7 py-3 bg-[#0F5132] border border-[#169B62] text-[#F4EFE6] hover:border-[#F2B035] transition-colors"
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
