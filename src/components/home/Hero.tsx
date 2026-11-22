"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Download,
  ShieldCheck,
  Star,
  CheckCircle,
  Play
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
      {/* Background radial glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide mb-6 shadow-sm shadow-purple-500/10"
            >
              <Sparkles size={14} className="text-pink-400" />
              <span>THE 2026 DIGITAL CREATOR MARKETPLACE</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Unlock Your{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Potential.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-base sm:text-lg text-[#A7A3BC] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover premium digital products, powerful AI resources, creative
              templates, and expert knowledge designed to help you create more,
              work smarter, and grow faster.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/store"
                className="group relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all duration-200"
              >
                <span>Explore Products</span>
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/new-arrivals"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Zap size={16} className="text-yellow-400" />
                <span>Discover What&apos;s New</span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#A7A3BC]">
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400" />
                <span>Premium Digital Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={15} className="text-cyan-400" />
                <span>Instant Download Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-purple-400" />
                <span>Creator-Focused Products</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Multi-layered 3D Card Stack */}
            <div className="relative mx-auto max-w-md w-full">
              {/* Back Card 1: AI Prompt Bundle Preview */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 sm:-right-8 w-64 rounded-2xl bg-[#1d193d]/90 border border-pink-500/30 p-4 shadow-2xl backdrop-blur-xl z-10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-[10px] font-bold text-pink-300">
                    AI PROMPTS
                  </span>
                  <div className="flex items-center text-amber-300 text-xs">
                    <Star size={12} fill="currentColor" />
                    <span className="ml-1 text-[11px] font-bold">4.9</span>
                  </div>
                </div>
                <h5 className="text-xs font-bold text-white">2,500+ Engineered Prompts</h5>
                <p className="text-[10px] text-gray-400 mt-0.5">Few-shot chains for GPT & Claude</p>
                <div className="mt-2 text-xs font-black text-white">₹399</div>
              </motion.div>

              {/* Back Card 2: Canva Kit Floating */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 w-60 rounded-2xl bg-[#15122e]/95 border border-purple-500/30 p-3.5 shadow-2xl backdrop-blur-xl z-20"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-6 w-6 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-300 text-xs font-bold">
                    1K+
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Canva Creator Kit</h5>
                    <p className="text-[9px] text-[#A7A3BC]">1,200+ Luxury Assets</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5">
                  <span className="text-[10px] text-emerald-400 font-semibold">1-Click Import</span>
                  <span className="text-xs font-bold text-white">₹499</span>
                </div>
              </motion.div>

              {/* Main Center Spotlight Card: Meta Ads Course Preview */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#1b173a] to-[#110e26] border border-purple-500/40 p-6 shadow-2xl shadow-purple-950/60 z-15">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
                      FLAGSHIP MASTERCLASS
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold">
                    PRO 2026
                  </span>
                </div>

                {/* Video/Course mockup visual */}
                <div className="relative aspect-video rounded-xl bg-gradient-to-br from-[#241c49] to-[#0c091f] border border-white/10 flex flex-col items-center justify-center overflow-hidden p-4 group cursor-pointer mb-4">
                  <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-purple-600 via-pink-600 to-blue-600" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg shadow-purple-600/40 mb-2 group-hover:scale-110 transition-transform">
                      <Play size={20} fill="currentColor" className="ml-0.5" />
                    </div>
                    <span className="text-xs font-bold text-white">Meta Ads Mastery 2026</span>
                    <span className="text-[10px] text-[#A7A3BC]">50+ HD Lessons • 8 Modules</span>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <h4 className="text-base font-bold text-white">Meta Ads Mastery – Pro Edition</h4>
                  <p className="text-xs text-[#A7A3BC]">
                    Complete advertising framework to scale profitable campaigns in 2026.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-white">₹1,499</span>
                    <span className="text-xs text-gray-500 line-through">₹2,999</span>
                  </div>
                  <Link
                    href="/product/meta-ads-mastery-2026"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
