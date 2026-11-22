"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, ArrowRight, Eye, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const inWishlist = isInWishlist(product.id);
  const isInCart = cart.some((item) => item.product.id === product.id);

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added "${product.name}" to cart!`, "success");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      inWishlist
        ? `Removed "${product.name}" from wishlist`
        : `Added "${product.name}" to wishlist`,
      "info"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 6) * 0.08, duration: 0.45 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#17152E]/80 border border-white/10 hover:border-purple-500/40 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/40 hover:-translate-y-1 backdrop-blur-sm"
    >
      {/* Visual Mockup Header */}
      <div>
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#1b1836] via-[#211d42] to-[#121024] p-4 flex flex-col justify-between border border-white/5 group-hover:border-purple-500/20 transition-colors">
          {/* Subtle gradient pattern */}
          <div
            className={`absolute inset-0 opacity-25 bg-gradient-to-tr ${product.accentGradient}`}
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Top badges & Wishlist */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/25 border border-purple-400/30 text-purple-200">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && !product.isFree && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-xl transition-all ${
                inWishlist
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                  : "bg-black/40 text-gray-400 hover:text-pink-400 hover:bg-black/60"
              }`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={16}
                fill={inWishlist ? "currentColor" : "none"}
                className={inWishlist ? "scale-110" : ""}
              />
            </button>
          </div>

          {/* Center 3D abstract cover preview */}
          <div className="relative z-10 my-auto text-center px-2 py-3">
            <div className="inline-block px-3 py-1 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300">
                {product.categoryName}
              </span>
            </div>
            <h4 className="text-base font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
              {product.name}
            </h4>
            <p className="text-[11px] text-[#A7A3BC] line-clamp-1 mt-0.5">
              {product.productFormat}
            </p>
          </div>

          {/* Quick link button overlay */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-[#A7A3BC] pt-1 border-t border-white/5">
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <Star size={13} fill="currentColor" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </span>
            <span className="text-[10px] text-gray-400">{product.fileSize || "Instant Access"}</span>
          </div>
        </div>

        {/* Content details */}
        <div className="pt-3.5 pb-2">
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#A7A3BC] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Pricing and Action Buttons */}
      <div className="pt-3 border-t border-white/5 mt-auto">
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            {product.isFree ? (
              <span className="text-lg font-black text-emerald-400">FREE</span>
            ) : (
              <>
                <span className="text-xl font-black text-white">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </>
            )}
          </div>
          <span className="text-[10px] uppercase font-semibold text-purple-400/80">
            Digital Bundle
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
          >
            <span>Details</span>
            <ArrowRight size={13} />
          </Link>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              isInCart
                ? "bg-emerald-600/30 border border-emerald-500/40 text-emerald-300"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20"
            }`}
          >
            {isInCart ? (
              <>
                <Check size={13} />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>{product.isFree ? "Get Free" : "Add to Cart"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
