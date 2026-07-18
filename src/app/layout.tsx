import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const SITE_URL = "https://macrotrack.app";
const SITE_DESCRIPTION =
  "The all-in-one AI fitness app to track workouts, calories, nutrition, water, body measurements, and AI-powered progress.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MacroTrack – AI Fitness Tracking App",
    template: "%s · MacroTrack",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "MacroTrack",
    "AI fitness app",
    "calorie tracker",
    "macro tracker",
    "workout tracker",
    "AI coach",
    "fitness waitlist",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "MacroTrack – AI Fitness Tracking App",
    description: SITE_DESCRIPTION,
    siteName: "MacroTrack",
  },
  twitter: {
    card: "summary_large_image",
    title: "MacroTrack – AI Fitness Tracking App",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Loaded via <link> rather than next/font so the build has no
            external network dependency — swap to next/font/google any
            time for automatic self-hosting and zero layout shift. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ ["--font-inter" as string]: "'Inter', system-ui, sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
