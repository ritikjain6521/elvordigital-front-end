"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Rocket } from "lucide-react";

export default function PromotionalBanner() {
  return (
    <section className="relative z-10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-[#20184a] via-[#2f1c5c] to-[#161f4b] border border-purple-500/30 shadow-2xl shadow-purple-950/50"
        >
          {/* Animated decorative glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6 backdrop-blur-md">
              <Rocket size={14} className="text-yellow-300" />
              <span>READY TO SCALE YOUR DIGITAL EXPERTISE?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Your Next Big Idea{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-200 leading-relaxed">
              Everything you need to create, launch, and grow your digital journey. Access immediate downloads of battle-tested prompt directories, design systems, and marketing courses.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/store"
                className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#090816] font-bold text-sm shadow-xl hover:bg-gray-100 hover:scale-[1.02] transition-all"
              >
                <span>Explore Premium Collection</span>
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-2 text-xs text-purple-200">
                <Sparkles size={15} className="text-yellow-300" />
                <span>Special 54% Launch Pricing Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
