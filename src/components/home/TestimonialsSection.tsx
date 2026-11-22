"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 py-20 lg:py-24 bg-[#0e0d22]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <span>COMMUNITY FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            What Digital Creators{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="mt-3 text-sm text-[#A7A3BC]">
            Illustrative sample reviews reflecting typical workflow acceleration and commercial value reported by our digital product users.
          </p>
        </div>

        {/* 6 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#17152E]/80 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={18} className="text-purple-400/40" />
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic mb-6">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-xs font-bold text-white shadow-md">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-[#A7A3BC]">{item.role}</p>
                  </div>
                </div>

                <span className="text-[10px] text-purple-400 font-medium">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Demo data notice */}
        <p className="text-center text-[11px] text-gray-500 mt-8">
          * Note: User reviews shown are illustrative demonstrations of customer feedback.
        </p>
      </div>
    </section>
  );
}
