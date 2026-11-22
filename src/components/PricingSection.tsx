"use client";

import { motion } from "framer-motion";
import { Check, Shield, Zap, Crown, ArrowRight } from "lucide-react";
import { BRAND, PRICING_FEATURES } from "@/lib/constants";
import { handlePurchase } from "@/lib/utils";

export default function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Start Mastering Meta Ads{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Today!
            </span>
          </h2>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/30 via-cyan-500/20 to-purple-500/30 blur-lg" />

            <div className="relative rounded-3xl bg-gradient-to-br from-[#12183a] to-[#0d1025] border border-purple-500/30 overflow-hidden">
              {/* Top badge */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Crown size={16} className="text-yellow-300" />
                  <span className="text-sm font-bold text-white tracking-wide uppercase">
                    {BRAND.product}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-10">
                {/* Pricing */}
                <div className="text-center mb-8">
                  <p className="text-sm text-gray-400 mb-2">Regular Price</p>
                  <p className="text-2xl text-gray-500 line-through mb-1">
                    {BRAND.currency}{BRAND.originalPrice}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                    Special Launch Price
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-6xl sm:text-7xl font-black text-white">
                      {BRAND.currency}{BRAND.price}
                    </span>
                    <span className="text-xl font-bold text-white uppercase">
                      Only
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/15 to-emerald-500/10 border border-green-500/25">
                    <Zap size={14} className="text-green-400" />
                    <span className="text-sm font-bold text-green-400">
                      SAVE {BRAND.currency}{BRAND.discount} – {BRAND.discountPercent}% OFF
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {PRICING_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mt-0.5">
                        <Check size={12} className="text-purple-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={handlePurchase}
                  className="group relative w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-lg shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    BUY NOW – GET INSTANT ACCESS
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                {/* Secure checkout note */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield size={14} />
                  <span>
                    Secure checkout experience will be available once a payment link is configured.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
