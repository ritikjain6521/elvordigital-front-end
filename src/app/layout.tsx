import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZenovaVibe | Discover. Download. Create. Grow. – Premium Digital Marketplace",
  description:
    "Explore ZenovaVibe: The premier digital marketplace for AI prompt bundles, Meta advertising courses, Canva creator kits, business ebooks, and productivity software tools.",
  keywords: [
    "digital marketplace",
    "ai prompt bundles",
    "meta ads courses",
    "canva templates",
    "digital products",
    "business blueprints",
    "productivity tools",
    "ZenovaVibe",
  ],
  openGraph: {
    title: "ZenovaVibe – Premium Digital Marketplace",
    description:
      "Unlock your digital potential with curated AI tools, masterclasses, creative templates, and business blueprints.",
    type: "website",
    siteName: "ZenovaVibe",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenovaVibe – Premium Digital Marketplace",
    description: "Discover curated digital products to create more, work smarter, and grow faster.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ZenovaVibe",
              url: "https://zenovavibe.com",
              description: "Premium digital product marketplace for creators, founders, and marketers.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://zenovavibe.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#090816] text-white selection:bg-purple-500/30 selection:text-white">
        <Providers>
          <ParticlesBackground />
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <div className="flex-1 flex flex-col pt-16">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
