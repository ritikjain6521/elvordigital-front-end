"use client";

import { motion } from "framer-motion";
import {
  PlayCircle,
  BookOpen,
  Gift,
  Palette,
  Sparkles,
} from "lucide-react";
import { TRUST_ITEMS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  PlayCircle,
  BookOpen,
  Gift,
  Palette,
  Sparkles,
};

export default function TrustStrip() {
  return (
    <section className="relative z-10 py-16 border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-3 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-all duration-300">
                  {Icon && (
                    <Icon
                      size={24}
                      className="text-purple-400 group-hover:text-purple-300 transition-colors"
                    />
                  )}
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  {item.value}
                </p>
                <p className="text-sm text-gray-400 mt-1">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
