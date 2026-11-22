"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Wishlist" }]} />

        <div className="mt-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Saved Wishlist ({wishlist.length})
          </h1>
          <p className="mt-2 text-sm text-[#A7A3BC]">
            Keep track of the prompt bundles, masterclasses, and toolkits you plan to explore.
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 p-8 rounded-3xl bg-[#17152E]/50 border border-white/10 max-w-md mx-auto">
            <Heart size={48} className="mx-auto text-pink-400/40 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-xs text-[#A7A3BC] mb-6">
              Browse our digital catalogue and tap the heart icon on any card to save it here.
            </p>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
