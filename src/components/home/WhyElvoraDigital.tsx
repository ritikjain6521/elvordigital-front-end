"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Zap, CheckCircle2, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Layers,
    title: "Carefully Curated Resources",
    description:
      "We test and refine every digital product before it ever reaches our catalogue. No generic fluff, no outdated advice.",
    badge: "Quality First",
    color: "from-purple-500/20 to-indigo-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Zap,
    title: "Instant Digital Access",
    description:
      "Direct file downloads, Notion links, and video streaming credentials land in your inbox the second payment confirms.",
    badge: "Zero Friction",
    color: "from-pink-500/20 to-purple-500/10",
    iconColor: "text-pink-400",
  },
  {
    icon: CheckCircle2,
    title: "Practical & Ready-to-Use Products",
    description:
      "Pre-formatted templates, copy-paste prompts, and plug-and-play workflows engineered for immediate real-world execution.",
    badge: "Action-Oriented",
    color: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: HeartHandshake,
    title: "Creator-Focused Collection",
    description:
      "Built for the modern digital economy: founders building SaaS, freelancers pitching retainers, and creators scaling audiences.",
    badge: "Ecosystem Fit",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
];

export default function WhyElvoraDigital() {
  return (
    <section className="relative z-10 py-20 lg:py-24 bg-[#0e0d22]/50 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <span>THE ELVORAVIBE ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Why Creators &amp; Founders{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Choose ElvoraDigital
            </span>
          </h2>
          <p className="mt-3 text-sm text-[#A7A3BC]">
            We bridge the gap between high-level digital theory and rapid execution with master-grade digital assets.
          </p>
        </div>

        {/* 4 Feature blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative rounded-2xl bg-[#17152E]/90 border border-white/10 p-6 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} border border-white/10 ${item.iconColor}`}
                    >
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300/80 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
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
