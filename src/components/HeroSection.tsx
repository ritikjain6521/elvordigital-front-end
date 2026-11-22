"use client";

import { motion } from "framer-motion";
import {
  PlayCircle,
  ArrowRight,
  Check,
  TrendingUp,
  BarChart3,
  MousePointerClick,
  Eye,
  Zap,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { handlePurchase, scrollToSection } from "@/lib/utils";

const floatingCards = [
  { icon: TrendingUp, label: "ROAS", value: "4.8×", color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20" },
  { icon: MousePointerClick, label: "CTR", value: "3.2%", color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20" },
  { icon: Eye, label: "Reach", value: "125K", color: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20" },
  { icon: BarChart3, label: "Leads", value: "2.4K", color: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/20" },
];

const checkItems = [
  "50+ HD Video Lessons",
  "7 Premium Bonus Resources",
  "Beginner to Advanced",
  "Self-Paced Learning",
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
            >
              <Zap size={14} className="text-purple-400" />
              <span className="text-xs sm:text-sm font-medium text-purple-300 tracking-wide">
                2026 PRO EDITION | COMPLETE META ADS MASTERCLASS
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Master Facebook &amp; Instagram Ads.{" "}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Turn Clicks Into Customers.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Learn professional Meta advertising from beginner to advanced.
              Launch profitable campaigns, generate quality leads, optimize ad
              spend and scale your business with practical training and premium
              marketing resources.
            </p>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <span className="text-gray-500 line-through text-lg">
                {BRAND.currency}{BRAND.originalPrice}
              </span>
              <span className="text-4xl sm:text-5xl font-black text-white">
                {BRAND.currency}{BRAND.price}
              </span>
              <span className="text-sm font-medium uppercase tracking-wider text-white">
                only
              </span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 text-sm font-bold">
                {BRAND.discountPercent}% OFF – LIMITED LAUNCH OFFER
              </span>
            </motion.div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handlePurchase}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-base shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  GET INSTANT ACCESS – {BRAND.currency}{BRAND.price}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={() => scrollToSection("#curriculum")}
                className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 hover:border-white/20 transition-all duration-300"
              >
                EXPLORE COURSE CURRICULUM
              </button>
            </div>

            {/* Check items */}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 max-w-md mx-auto lg:mx-0">
              {checkItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={16} className="text-green-400 shrink-0" />
                  <span className="text-sm text-gray-400">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right visual – floating dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main dashboard card */}
            <div className="relative mx-auto w-full max-w-lg">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/20 via-cyan-500/10 to-purple-500/20 blur-2xl" />

              {/* Dashboard */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#12183a] to-[#0d1025] border border-white/10 p-6 backdrop-blur-xl shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Campaign Dashboard</p>
                    <p className="text-lg font-bold text-white mt-1">Ad Performance</p>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>

                {/* Chart mockup */}
                <div className="h-40 flex items-end gap-2 mb-6">
                  {[35, 50, 40, 65, 55, 80, 70, 90, 75, 95, 85, 100].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{
                          duration: 0.6,
                          delay: 0.8 + i * 0.08,
                          ease: "easeOut",
                        }}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-purple-600/60 to-cyan-400/40"
                      />
                    )
                  )}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Impressions", value: "1.2M" },
                    { label: "Conversions", value: "8,432" },
                    { label: "ROAS", value: "4.8×" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-white/5 border border-white/5 px-3 py-2.5 text-center"
                    >
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="text-lg font-bold text-white mt-0.5">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => {
                const positions = [
                  "-top-6 -left-10",
                  "-top-6 -right-10",
                  "-bottom-6 -left-6",
                  "-bottom-6 -right-6",
                ];
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                    className={`absolute ${positions[i]} z-20`}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${card.color} border ${card.border} backdrop-blur-lg shadow-lg`}
                    >
                      <card.icon size={16} className="text-white/80" />
                      <div>
                        <p className="text-[10px] text-gray-400">{card.label}</p>
                        <p className="text-sm font-bold text-white">{card.value}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Play button overlay */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="w-16 h-16 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-purple-500/30 cursor-pointer hover:bg-purple-500/90 transition-colors">
                  <PlayCircle size={32} className="text-white ml-0.5" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
