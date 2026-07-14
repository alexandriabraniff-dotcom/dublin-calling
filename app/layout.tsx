import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
