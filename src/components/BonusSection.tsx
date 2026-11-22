"use client";

import { motion } from "framer-motion";
import {
  Palette,
  FileText,
  Sparkles,
  BarChart3,
  Users,
  Rocket,
  BookCheck,
} from "lucide-react";
import { BONUSES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Palette,
  FileText,
  Sparkles,
  BarChart3,
  Users,
  Rocket,
  BookCheck,
};

const gradients = [
  "from-purple-500/15 to-indigo-500/10",
  "from-cyan-500/15 to-blue-500/10",
  "from-pink-500/15 to-rose-500/10",
  "from-amber-500/15 to-orange-500/10",
  "from-emerald-500/15 to-green-500/10",
  "from-violet-500/15 to-purple-500/10",
  "from-sky-500/15 to-cyan-500/10",
];

const borderColors = [
  "border-purple-500/20 hover:border-purple-500/40",
  "border-cyan-500/20 hover:border-cyan-500/40",
  "border-pink-500/20 hover:border-pink-500/40",
  "border-amber-500/20 hover:border-amber-500/40",
  "border-emerald-500/20 hover:border-emerald-500/40",
  "border-violet-500/20 hover:border-violet-500/40",
  "border-sky-500/20 hover:border-sky-500/40",
];

const iconColors = [
  "text-purple-400",
  "text-cyan-400",
  "text-pink-400",
  "text-amber-400",
  "text-emerald-400",
  "text-violet-400",
  "text-sky-400",
];

export default function BonusSection() {
  return (
    <section id="bonuses" className="relative z-10 py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              Exclusive 7-in-1 Bundle
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Get 7 Premium Marketing Bonuses –{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Absolutely Included!
            </span>
          </h2>
        </motion.div>

        {/* Bonus grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {BONUSES.map((bonus, i) => {
            const Icon = iconMap[bonus.icon];
            return (
              <motion.div
                key={bonus.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`group relative rounded-2xl bg-gradient-to-br ${gradients[i]} border ${borderColors[i]} p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${i === 6 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Bonus number badge */}
                <div className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-500">
                    {String(bonus.id).padStart(2, "0")}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {Icon && <Icon size={28} className={iconColors[i]} />}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {bonus.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {bonus.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
