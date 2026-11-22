import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Globe, Heart, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us | ZenovaVibe – The Modern Digital Marketplace",
  description:
    "Learn about ZenovaVibe's mission to curate battle-tested digital playbooks, prompt bundles, and creative templates for modern founders.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About ZenovaVibe" }]} />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto my-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
            <Sparkles size={13} className="text-pink-400" />
            <span>OUR STORY &amp; MISSION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Built For The Modern{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
              Digital Creator.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#A7A3BC] leading-relaxed">
            ZenovaVibe was born from a simple conviction: digital entrepreneurs, designers, and marketers shouldn&apos;t have to wade through generic templates and outdated theory to build high-growth assets.
          </p>
        </div>

        {/* Value pillars */}
        <div className="grid sm:grid-cols-3 gap-6 my-16">
          <div className="p-6 rounded-2xl bg-[#17152E]/70 border border-white/10 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-white">Curated Rigor</h3>
            <p className="text-xs text-[#A7A3BC] leading-relaxed">
              Every prompt file, video lesson, and template system undergoes testing in real commercial environments before listing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#17152E]/70 border border-white/10 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 flex items-center justify-center">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-white">Zero Friction Delivery</h3>
            <p className="text-xs text-[#A7A3BC] leading-relaxed">
              We eliminate technical barriers. Instant 1-click downloads, Notion workspace duplication, and responsive streamable video.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#17152E]/70 border border-white/10 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center">
              <Globe size={20} />
            </div>
            <h3 className="text-base font-bold text-white">Global Scalability</h3>
            <p className="text-xs text-[#A7A3BC] leading-relaxed">
              Tailored for remote teams, solopreneurs, e-commerce stores, and high-ticket agencies around the world.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#17152E]/50 border border-white/10 space-y-6 text-sm text-gray-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">Why &ldquo;ZenovaVibe&rdquo;?</h2>
          <p>
            The name blends <strong className="text-purple-300">Zen</strong> (clarity, focus, calm mastery) with <strong className="text-pink-300">Nova</strong> (explosive brilliance, creative energy), anchored by the electric vibe of modern digital innovation.
          </p>
          <p>
            Whether you are running Meta ad campaigns at multi-lakh scale, architecting complex prompt workflows for GPT-4o, or crafting agency pitch decks in Canva, our digital assets are engineered to shave months off your learning curve.
          </p>
          <div className="pt-4 border-t border-white/5 flex items-center gap-4">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
            >
              <span>Explore The Catalogue</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
