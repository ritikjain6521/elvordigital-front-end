"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Download, Users, Infinity as InfinityIcon } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description: "Rigorously crafted, tested, and updated for high-converting output.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Download,
    title: "Instant Digital Access",
    description: "Zero waiting. Download and duplicate assets immediately after checkout.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Users,
    title: "Creator-Friendly Resources",
    description: "Built for founders, freelancers, solopreneurs, and agencies.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime Product Access",
    description: "Continuous file downloads & future masterclass additions included.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 py-12 border-y border-white/5 bg-[#0e0d22]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${item.bg} ${item.color}`}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-[#A7A3BC] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
