"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingDown,
  Puzzle,
  Target,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { PROBLEMS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  DollarSign,
  TrendingDown,
  Puzzle,
  Target,
};

export default function ProblemSolution() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Problem headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Still Spending on Ads Without Knowing{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              What Actually Works?
            </span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PROBLEMS.map((problem, i) => {
            const Icon = iconMap[problem.icon];
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/10 p-6 hover:border-red-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  {Icon && <Icon size={24} className="text-red-400" />}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative text-center max-w-3xl mx-auto"
        >
          {/* Glow */}
          <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-purple-500/10 blur-2xl" />

          <div className="relative rounded-2xl bg-gradient-to-br from-[#12183a] to-[#0d1025] border border-purple-500/20 p-8 sm:p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-6">
              <Lightbulb size={32} className="text-purple-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
              ElvorDigital Helps You{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Advertise Smarter.
              </span>
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
              Stop wasting money on ads that don&apos;t convert. Our structured
              training provides practical frameworks, step-by-step campaign
              strategies, and ready-to-use resources so you can launch, optimize,
              and scale profitable Meta ad campaigns with confidence.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-purple-400 font-medium">
              <span>Explore the curriculum below</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
