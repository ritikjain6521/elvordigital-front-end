"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, CheckCircle2, ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export default function ProductSpotlight() {
  const metaCourse = PRODUCTS.find((p) => p.slug === "meta-ads-mastery-2026");
  if (!metaCourse) return null;

  return (
    <section className="relative z-10 py-20 lg:py-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#161334] via-[#1b173e] to-[#0f0c24] border border-purple-500/30 p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
                <Zap size={14} className="text-yellow-400" />
                <span>FEATURED PRODUCT SPOTLIGHT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Meta Ads Mastery 2026 –{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Pro Edition
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-[#A7A3BC] leading-relaxed">
                The masterclass built for the new era of Meta advertising. Master Advantage+ campaigns, server-side CAPI tracking, creative testing matrices, and scaling strategies to turn clicks into predictable customers.
              </p>

              {/* Learning Outcomes List */}
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {metaCourse.learningOutcomes?.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-gray-300 leading-normal">{outcome}</span>
                  </div>
                ))}
              </div>

              {/* What's Included Preview */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-[#A7A3BC]">
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white font-bold">50+ HD</span> Video Lessons
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white font-bold">8 Master</span> Modules
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white font-bold">7 Premium</span> Bonuses Included
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white font-bold">500+ Ad</span> Templates
                </div>
              </div>

              {/* Price & CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">₹1,499</span>
                  <span className="text-base text-gray-500 line-through">₹2,999</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    Save 50%
                  </span>
                </div>

                <Link
                  href="/product/meta-ads-mastery-2026"
                  className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:scale-[1.02] transition-all w-full sm:w-auto"
                >
                  <span>Explore Course &amp; Enroll</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Course Visual Mockup (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#211a47] to-[#100d28] border border-purple-500/40 p-6 shadow-2xl">
                {/* Visual player simulation */}
                <div className="relative aspect-video rounded-xl bg-gradient-to-tr from-[#2f1b63] to-[#0c0a20] border border-white/10 flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="h-16 w-16 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 mb-3"
                  >
                    <Play size={26} fill="currentColor" className="ml-1" />
                  </motion.div>
                  <span className="text-sm font-bold text-white">Course Video Preview</span>
                  <span className="text-[11px] text-[#A7A3BC] mt-1">
                    Watch the Module 01 Overview Walkthrough
                  </span>
                </div>

                {/* Rating badge */}
                <div className="mt-4 flex items-center justify-between text-xs text-[#A7A3BC]">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Star size={15} fill="currentColor" />
                    <span className="font-bold text-white">5.0 / 5.0</span>
                    <span className="text-gray-400">(642 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-300 font-semibold">
                    <ShieldCheck size={14} />
                    <span>Verified Masterclass</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
