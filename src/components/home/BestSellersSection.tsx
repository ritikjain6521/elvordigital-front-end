"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";

export default function BestSellersSection() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          const mongoList: Product[] = data.products.map((p: any) => ({
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
            badge: p.badge || "Featured",
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
            accentGradient: p.accentGradient || "from-pink-500 to-purple-600",
          }));
          const mongoSlugs = new Set(mongoList.map((p) => p.slug));
          const extra = PRODUCTS.filter((p) => !mongoSlugs.has(p.slug));
          setProducts([...mongoList, ...extra]);
        }
      })
      .catch(() => {});
  }, []);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 6);

  return (
    <section className="relative z-10 py-20 lg:py-24 bg-[#0e0d22]/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-3">
              <Flame size={13} className="text-pink-400" />
              <span>COMMUNITY FAVORITES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Best Selling{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Digital Products
              </span>
            </h2>
            <p className="mt-2 text-sm text-[#A7A3BC] max-w-xl">
              Proven resources and playbooks trusted by hundreds of founders, designers, and growth marketers.
            </p>
          </div>

          <Link
            href="/best-sellers"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
          >
            <span>See All Best Sellers</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
