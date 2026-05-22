import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Orbitron, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://sport-verse-client.vercel.app"),

  title: {
    default: "SportVerse",
    template: "%s | SportVerse",
  },

  description:
    "Modern Sports Booking Platform - Book football, cricket, basketball and more venues easily.",

  keywords: [
    "sports booking",
    "football ground booking",
    "cricket ground booking",
    "basketball court",
    "sports venue",
    "SportVerse",
  ],

  authors: [
    {
      name: "SportVerse",
    },
  ],

  creator: "SportVerse",

  openGraph: {
    title: "SportVerse - Book Sports Facilities",

    description:
      "Find and book the best sports venues near you. Book • Play • Win",

    url: "https://sport-verse-client.vercel.app",

    siteName: "SportVerse",

    images: [
      {
        url: "https://sport-verse-client.vercel.app/icon.png",
        width: 1200,
        height: 630,
        alt: "SportVerse Logo",
      },
    ],

    locale: "en_BD",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "SportVerse",

    description:
      "Find and book the best sports venues near you. Book • Play • Win",

    images: [
      "https://sport-verse-client.vercel.app/icon.png",
    ],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden bg-[#050816] text-white antialiased">
        <div className="fixed inset-0 -z-50 overflow-hidden">
          <div className="absolute inset-0 bg-[#050816]" />

          <div className="absolute left-[-150px] top-[-100px] h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-3xl" />

          <div className="absolute right-[-150px] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute bottom-[-200px] left-[30%] h-[450px] w-[450px] rounded-full bg-lime-400/10 blur-3xl" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(163,230,53,0.08),transparent_25%)]" />
        </div>

        <Toaster position="top-center" reverseOrder={false} />

        <div className="relative flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}