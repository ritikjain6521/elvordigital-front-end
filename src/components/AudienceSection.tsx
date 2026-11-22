"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Store,
  Briefcase,
  Laptop,
  Building2,
  ShoppingCart,
  Package,
  Link,
  Video,
  BookOpen,
  Award,
  Users,
} from "lucide-react";
import { AUDIENCE } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GraduationCap,
  Store,
  Briefcase,
  Laptop,
  Building2,
  ShoppingCart,
  Package,
  Link,
  Video,
  BookOpen,
  Award,
};

export default function AudienceSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Users size={14} className="text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Built For Everyone
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl mx-auto">
            Whether You&apos;re Starting From Zero or Growing Your Business,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              This Course Is For You.
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {AUDIENCE.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-purple-500/5 hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                  {Icon && (
                    <Icon
                      size={22}
                      className="text-purple-400 group-hover:text-purple-300 transition-colors"
                    />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-300 text-center leading-tight group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
