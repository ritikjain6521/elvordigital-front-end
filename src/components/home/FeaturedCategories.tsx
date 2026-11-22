"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Target, Layout, Cpu, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  Sparkles,
  Target,
  Layout,
  Cpu,
};

export default function FeaturedCategories() {
  return (
    <section className="relative z-10 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles size={13} />
              <span>CURATED COLLECTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Explore Featured{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="mt-2 text-sm text-[#A7A3BC] max-w-xl">
              Specialized digital toolkits, course materials, and frameworks organized by your creative &amp; business goals.
            </p>
          </div>

          <Link
            href="/store"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Categories Grid (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {CATEGORIES.map((cat, index) => {
            const Icon = iconMap[cat.iconName] || Sparkles;
            const productCount = PRODUCTS.filter((p) => p.category === cat.id).length;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="group relative flex flex-col justify-between h-full p-6 rounded-2xl bg-[#17152E]/70 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/30 hover:-translate-y-1 backdrop-blur-sm"
                >
                  {/* Subtle hover gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  />

                  <div>
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 mb-5 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                      <Icon size={22} />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      {cat.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs text-[#A7A3BC] line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom link & count */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-purple-400">
                      {productCount} Products
                    </span>
                    <span className="flex items-center gap-1 font-bold text-white group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
