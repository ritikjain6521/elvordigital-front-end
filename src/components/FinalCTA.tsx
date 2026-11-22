"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { handlePurchase } from "@/lib/utils";

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-20 lg:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Ready to Get Started?
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
            Your Next Successful Ad Campaign{" "}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl mx-auto">
            Stop guessing. Start learning. Advertise smarter.
          </p>

          {/* Price */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-2xl text-gray-500 line-through">
              {BRAND.currency}{BRAND.originalPrice}
            </span>
            <span className="text-5xl sm:text-6xl font-black text-white">
              {BRAND.currency}{BRAND.price}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={handlePurchase}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              UNLOCK META ADS MASTERY NOW
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          {/* Pulsing ring effect */}
          <div className="relative mt-6 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute w-48 h-12 rounded-full bg-purple-500/10 blur-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
