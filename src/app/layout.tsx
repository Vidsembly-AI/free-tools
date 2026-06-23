import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Jost } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Vidsembly Free Tools | Video, Audio & Presentation Utilities",
  description:
    "Simple browser-based tools for creators, educators, trainers, and businesses. Convert, trim, merge, and transform media files for free.",
  metadataBase: new URL("https://tools.vidsembly.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body className="min-h-screen antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
