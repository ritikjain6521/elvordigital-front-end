"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";
import { API_BASE } from "@/lib/api";

export default function NewArrivalsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          const mongoList: Product[] = data.products
            .filter((p: any) => !p.status || p.status === "published")
            .map((p: any) => ({
              id: p._id || p.id,
              name: p.name,
              slug: p.slug,
              category: p.category,
              categoryName: p.categoryName || p.category,
              shortDescription: p.shortDescription || "",
              fullDescription: p.fullDescription || "",
              price: p.price,
              originalPrice: p.originalPrice || p.price,
              rating: p.rating || 5.0,
              reviewsCount: p.reviewsCount || 1,
              badge: p.badge || "New",
              isBestSeller: p.isBestSeller,
              isNewArrival: p.isNewArrival,
              isFeatured: p.isFeatured,
              isFree: p.isFree,
              productFormat: p.productFormat || "Digital Download",
              compatibility: p.compatibility || "Web & Mobile",
              features: p.features || [],
              whatsIncluded: p.whatsIncluded || [],
              bonuses: p.bonuses || [],
              faqs: p.faqs || [],
              photos: p.photos || [],
              thumbnail: p.thumbnail || p.photos?.[0] || "",
              accentGradient: p.accentGradient || "from-cyan-500 to-purple-600",
            }));
          setProducts(mongoList);
        }
      })
      .catch(() => { });
  }, []);

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  if (newArrivals.length === 0) return null;

  return (
    <section className="relative z-10 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles size={13} className="text-cyan-400" />
              <span>FRESH RELEASE VAULT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              New{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Arrivals
              </span>
            </h2>
            <p className="mt-2 text-sm text-[#A7A3BC] max-w-xl">
              Freshly engineered toolkits, updated automation blueprints, and specialized prompt collections.
            </p>
          </div>

          <Link
            href="/new-arrivals"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Browse All New Releases</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
