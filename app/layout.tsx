import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar"; // ✅ Corrected Path
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"; // ✅ Ensure correct path for global styles

// Load Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "ThachanMart - Handmade Wooden Creations",
  description: "Explore premium handcrafted wooden furniture & products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#993819] text-gray-900`}>
        <Navbar className="bg-[#993819]" /> {/* ✅ Navbar color updated */}
        <main className="pt-16">{children}</main> {/* ✅ Ensure content is below navbar */}
      </body>
    </html>
  );
}
