import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Brand fonts from MRG: Selphia (the "Dublin Calling" script) for titles, Ft Thyson (the
// "Party Pub & Kitchen" caps) for buttons, nav and labels, DIN for body and small text
const selphia = localFont({ src: "./fonts/Selphia.ttf", variable: "--font-title", display: "swap" });
const thyson = localFont({ src: "./fonts/Ft-Thyson-Bold.otf", variable: "--font-label", weight: "700", display: "swap" });
const din = localFont({ src: "./fonts/DINCE-BoldAlternate.otf", variable: "--font-text", display: "swap" });

export const metadata: Metadata = {
  title: "Dublin Calling | Party Pub & Kitchen",
  description:
    "Dublin Calling is Toronto and Vancouver's favourite party pub and kitchen. Three locations: Adelaide St (Toronto), Danforth Ave (Toronto), and Granville St (Vancouver).",
  keywords: [
    "Dublin Calling",
    "party pub",
    "sports bar",
    "Toronto pub",
    "Vancouver pub",
    "Irish pub",
    "happy hour",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full ${selphia.variable} ${thyson.variable} ${din.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
