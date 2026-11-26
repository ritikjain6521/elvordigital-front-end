"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const heroBenefits = [
  "11,000+ Printable Worksheets",
  "Learning Through Fun Activities",
  "Preschool to Primary Learning",
  "Creative & Educational Activities",
  "Perfect for Home & Classroom",
  "Instant Digital Access",
  "Multiple Learning Categories",
];

export default function Hero() {
  return (
    <section className="relative pt-14 pb-20 px-4 overflow-hidden">
      {/* Ambient background glows matching Kids Worksheets aesthetic */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* LIMITED TIME BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
            🔥 LIMITED-TIME SPECIAL OFFER
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Headline, Benefits & Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                11,000+
              </span>
              <br />
              <span className="text-white">KIDS</span>
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                WORKSHEETS
              </span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-white/90 mb-3">
              The Ultimate All-in-One Learning &amp; Activity Bundle for Kids!
            </p>
            <p className="text-base text-purple-300 font-semibold mb-7">
              Make Learning Fun, Creative, Interactive &amp; Enjoyable!
            </p>

            {/* Quick benefits list */}
            <ul className="mb-8 space-y-2 inline-block text-left">
              {heroBenefits.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-semibold text-white/85">
                  <span className="text-green-400 text-base">✓</span> {b}
                </li>
              ))}
            </ul>

            {/* PRICING & CTA CARD */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 block w-full lg:max-w-lg">
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-3">
                <span className="text-white/40 line-through text-2xl font-bold">₹999</span>
                <span className="text-5xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                  ₹199
                </span>
                <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                  80% OFF
                </span>
              </div>
              <p className="text-xs text-white/50 mb-4 text-center lg:text-left">
                One-time payment • Lifetime access • Instant download
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/checkout?product=11000-kids-worksheets-bundle"
                  className="flex-1 text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 text-white font-black text-base px-6 py-4 rounded-xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-[1.03]"
                >
                  🛒 BUY NOW — Only ₹199
                </Link>
                <Link
                  href="/store"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm transition-all"
                >
                  <span>Browse Store</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
              <p className="text-xs text-white/40 text-center lg:text-left mt-3">
                🔒 Secure Payment • 100% Safe Checkout
              </p>
            </div>
          </motion.div>

          {/* RIGHT: 3D Product Box Visual & Floating Worksheet Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="relative flex justify-center items-center py-6"
          >
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              {/* Glow behind product */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-pink-500/40 rounded-3xl blur-2xl scale-110" />

              {/* Product Box */}
              <div className="relative bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-800 rounded-3xl p-6 shadow-2xl border border-white/20 w-full h-full flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent rounded-t-3xl" />

                <div className="relative z-10">
                  <div className="text-5xl mb-2">📚</div>
                  <div className="text-yellow-300 font-black text-4xl leading-none">11,000+</div>
                  <div className="text-white font-black text-xl">KIDS</div>
                  <div className="text-sky-200 font-black text-2xl">WORKSHEETS</div>
                  <div className="text-white/70 text-xs mt-1 font-semibold">MEGA BUNDLE</div>
                </div>

                {/* Floating decorative icons */}
                <div className="absolute bottom-6 right-4 opacity-60 text-3xl">🎨</div>
                <div className="absolute top-24 right-6 opacity-50 text-2xl">✏️</div>
                <div className="absolute bottom-14 left-4 opacity-50 text-2xl">🔢</div>
                <div className="absolute top-20 left-4 opacity-40 text-xl">🔤</div>

                <div className="relative z-10">
                  <div className="flex flex-wrap gap-1">
                    {["ABC", "123", "Art", "Math", "GK", "Fun"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/15 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating worksheet cards */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-6 sm:-right-8 bg-white rounded-xl p-3 shadow-xl rotate-12 w-24 h-28 flex flex-col items-center justify-center border border-gray-100"
              >
                <div className="text-2xl mb-1">🔤</div>
                <div className="text-gray-700 text-[9px] font-bold text-center">ABC Tracing</div>
                <div className="mt-1 space-y-1 w-full">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-6 sm:-left-8 bg-white rounded-xl p-3 shadow-xl -rotate-6 w-24 h-28 flex flex-col items-center justify-center border border-gray-100"
              >
                <div className="text-2xl mb-1">🔢</div>
                <div className="text-gray-700 text-[9px] font-bold text-center">Numbers</div>
                <div className="mt-1 flex gap-1 justify-center">
                  {["1", "2", "3"].map((n) => (
                    <div
                      key={n}
                      className="w-5 h-5 bg-blue-100 rounded text-[10px] font-bold text-blue-700 flex items-center justify-center"
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-8 sm:-left-10 -translate-y-1/2 bg-white rounded-xl p-3 shadow-xl -rotate-3 w-20 h-24 flex flex-col items-center justify-center border border-gray-100"
              >
                <div className="text-xl mb-1">🎨</div>
                <div className="text-gray-700 text-[9px] font-bold text-center">Coloring</div>
                <div className="mt-1 flex gap-0.5">
                  {["bg-red-300", "bg-yellow-300", "bg-blue-300"].map((c) => (
                    <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
