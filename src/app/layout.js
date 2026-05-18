import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Orbitron, Inter } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "SportVerse",
  description: "Modern Sports Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden bg-[#050816] text-white antialiased">
        {/* BACKGROUND EFFECTS */}
        <div className="fixed inset-0 -z-50 overflow-hidden">
          {/* Main Background */}
          <div className="absolute inset-0 bg-[#050816]" />

          {/* Purple Glow */}
          <div className="absolute left-[-150px] top-[-100px] h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-3xl" />

          {/* Blue Glow */}
          <div className="absolute right-[-150px] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-3xl" />
          
          <div className="absolute bottom-[-200px] left-[30%] h-[450px] w-[450px] rounded-full bg-lime-400/10 blur-3xl" />

          {/* Extra Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(163,230,53,0.08),transparent_25%)]" />
        </div>

        <div className="relative flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}