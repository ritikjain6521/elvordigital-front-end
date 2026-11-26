"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Zap, Package } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { Product } from "@/types";

export default function ProductSpotlight() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpotlight() {
      try {
        const res = await fetch(`${API_BASE}/api/products?limit=1&sort=createdAt`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.products && data.products.length > 0) {
            setProduct(data.products[0]);
          }
        }
      } catch {
        // silently ignore — ProductSpotlight is optional
      } finally {
        setLoading(false);
      }
    }
    fetchSpotlight();
  }, []);

  if (loading || !product) return null;

  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <section className="relative z-10 py-20 lg:py-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#161334] via-[#1b173e] to-[#0f0c24] border border-purple-500/30 p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
                <Zap size={14} className="text-yellow-400" />
                <span>FEATURED PRODUCT SPOTLIGHT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {product.name}
              </h2>

              {product.tagline && (
                <p className="mt-3 text-base font-semibold text-purple-300">{product.tagline}</p>
              )}

              <p className="mt-4 text-sm sm:text-base text-[#A7A3BC] leading-relaxed line-clamp-3">
                {product.shortDescription || product.fullDescription}
              </p>

              {/* Key Points from features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {product.features.slice(0, 4).map((feat, idx: number) => {
                    const label = typeof feat === "string" ? feat : feat.title;
                    return (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="text-purple-400 mt-0.5 shrink-0">✓</span>
                        <span className="text-xs text-gray-300 leading-normal">{label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Price & CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  {savings && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                      Save {savings}%
                    </span>
                  )}
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:scale-[1.02] transition-all w-full sm:w-auto"
                >
                  <span>View Product</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Visual Mockup (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#211a47] to-[#100d28] border border-purple-500/40 p-6 shadow-2xl">
                {product.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                ) : (
                  <div className="relative aspect-video rounded-xl bg-gradient-to-tr from-[#2f1b63] to-[#0c0a20] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-16 w-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mb-3"
                    >
                      <Package size={28} className="text-purple-300" />
                    </motion.div>
                    <span className="text-sm font-bold text-white">{product.productFormat || "Digital Bundle"}</span>
                    <span className="text-[11px] text-[#A7A3BC] mt-1">
                      {product.categoryName || "Digital Product"}
                    </span>
                  </div>
                )}

                {/* Rating badge */}
                <div className="mt-4 flex items-center justify-between text-xs text-[#A7A3BC]">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Star size={15} fill="currentColor" />
                    <span className="font-bold text-white">5.0 / 5.0</span>
                    <span className="text-gray-400">Premium</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-300 font-semibold">
                    <ShieldCheck size={14} />
                    <span>Verified Product</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
