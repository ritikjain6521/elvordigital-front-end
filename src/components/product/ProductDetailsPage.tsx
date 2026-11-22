"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Gift,
  Check,
  X as XIcon,
  Layers,
  HelpCircle,
  Zap,
  Play
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/data/products";

interface ProductDetailsPageProps {
  product: Product;
}

export default function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<"overview" | "preview" | "curriculum" | "faqs">("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const inWishlist = isInWishlist(product.id);
  const inCart = cart.some((i) => i.product.id === product.id);

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast(`Added "${product.name}" to cart!`, "success");
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push("/cart");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      inWishlist
        ? `Removed "${product.name}" from wishlist`
        : `Added "${product.name}" to wishlist`,
      "info"
    );
  };

  // Related products from same or adjacent categories
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  return (
    <div className="min-h-screen py-8 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Store", href: "/store" },
            {
              label: product.categoryName,
              href: `/category/${product.category}`,
            },
            { label: product.name },
          ]}
        />

        {/* SECTION A: PRODUCT HERO */}
        <section className="mt-6 mb-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Product Info & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category & Badge */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <Link
                  href={`/category/${product.category}`}
                  className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/25 transition-colors"
                >
                  {product.categoryName}
                </Link>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                {discountPercent > 0 && !product.isFree && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {product.name}
                </h1>
                {product.tagline && (
                  <p className="mt-2 text-base sm:text-lg font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    {product.tagline}
                  </p>
                )}
              </div>

              {/* Compelling Short Description */}
              <p className="text-sm sm:text-base text-[#A7A3BC] leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 pt-1 text-xs text-[#A7A3BC]">
                <div className="flex items-center gap-1 text-amber-300 font-bold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-1 text-white text-sm">{product.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span className="text-gray-300 font-medium">
                  {product.reviewsCount} customer reviews
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} />
                  <span>Verified Purchase Rating</span>
                </span>
              </div>

              {/* Pricing Display */}
              <div className="p-6 rounded-2xl bg-[#17152E]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-xs text-[#A7A3BC] uppercase font-semibold tracking-wider block">
                    Digital Bundle Price
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    {product.isFree ? (
                      <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                        100% FREE
                      </span>
                    ) : (
                      <>
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-base text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-xs text-[#A7A3BC] space-y-1 sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                  <div className="flex sm:justify-end items-center gap-1.5 text-purple-300">
                    <Download size={14} />
                    <span>Instant Digital Delivery</span>
                  </div>
                  <div>Format: {product.productFormat}</div>
                </div>
              </div>

              {/* Action Buttons: Buy Now, Add to Cart, Wishlist */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Zap size={16} />
                  <span>{product.isFree ? "Download Now (Free)" : "Buy Now – Instant Access"}</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className={`w-full sm:w-auto py-4 px-6 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-2 ${
                    inCart
                      ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-300"
                      : "bg-white/5 hover:bg-white/10 border-white/15 text-white"
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check size={16} />
                      <span>In Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`p-4 rounded-xl border transition-colors ${
                    inWishlist
                      ? "bg-pink-500 border-pink-400 text-white"
                      : "bg-white/5 hover:bg-white/10 border-white/15 text-gray-300 hover:text-pink-400"
                  }`}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Instant Access Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5 text-xs text-[#A7A3BC]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span>Instant 1-Click Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-purple-400 shrink-0" />
                  <span>Guaranteed Safe Download</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Clock size={15} className="text-cyan-400 shrink-0" />
                  <span>Self-Paced Learning</span>
                </div>
              </div>
            </div>

            {/* Right: 3D Product Mockup & Floating Cards (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md w-full">
                {/* Background glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-blue-600/30 blur-2xl rounded-3xl" />

                {/* Main 3D Card Mockup */}
                <div className="relative rounded-3xl bg-gradient-to-b from-[#1c183d] via-[#14112e] to-[#0c091d] border border-purple-500/40 p-6 shadow-2xl overflow-hidden">
                  {/* Decorative Banner Ribbon */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                        {product.productFormat}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">
                      v2026.1
                    </span>
                  </div>

                  {/* Center Cover Art Mockup */}
                  <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#251e50] via-[#1b1540] to-[#0e0a24] border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-inner group">
                    <div
                      className={`absolute inset-0 opacity-30 bg-gradient-to-tr ${product.accentGradient}`}
                    />

                    {/* Badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
                        {product.categoryName}
                      </span>
                      {product.bonuses.length > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                          <Gift size={11} />
                          <span>+{product.bonuses.length} Free Bonuses</span>
                        </span>
                      )}
                    </div>

                    {/* Center Icon Graphic */}
                    <div className="relative z-10 text-center my-auto py-4">
                      <div className="h-14 w-14 rounded-2xl bg-purple-500/20 border border-purple-400/30 mx-auto flex items-center justify-center text-purple-300 mb-3 shadow-lg group-hover:scale-110 transition-transform">
                        {product.category === "meta-ads-courses" ? (
                          <Play size={26} fill="currentColor" className="ml-1" />
                        ) : (
                          <Sparkles size={26} />
                        )}
                      </div>
                      <h3 className="text-lg font-black text-white px-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#A7A3BC] mt-1">
                        {product.compatibility}
                      </p>
                    </div>

                    {/* Bottom Specs */}
                    <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-gray-400">
                      <span>{product.fileSize || "Instant Download"}</span>
                      <span className="text-white font-semibold">ZenovaVibe Certified</span>
                    </div>
                  </div>

                  {/* Deliverables summary below cover */}
                  <div className="mt-5 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block">
                      Core Assets Included:
                    </span>
                    <div className="space-y-1.5">
                      {product.whatsIncluded.slice(0, 3).map((item) => (
                        <div key={item.title} className="flex items-center justify-between text-xs text-gray-300">
                          <span className="truncate pr-2">• {item.title}</span>
                          <span className="text-[10px] text-purple-400 font-mono shrink-0">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Perks Card */}
                {product.bonuses[0] && (
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-6 -left-4 sm:-left-6 w-56 rounded-2xl bg-[#14122d]/95 border border-purple-500/30 p-3.5 shadow-2xl backdrop-blur-xl z-20"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Gift size={15} className="text-yellow-400 shrink-0" />
                      <span className="text-xs font-bold text-white truncate">
                        {product.bonuses[0].title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span>Value: {product.bonuses[0].demoValue}</span>
                      <span className="text-emerald-400 font-bold uppercase">Included Free</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION NAVIGATION TABS */}
        <div className="border-b border-white/10 mb-12">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-purple-500 text-white"
                  : "border-transparent text-[#A7A3BC] hover:text-white"
              }`}
            >
              Overview &amp; Deliverables
            </button>

            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "preview"
                  ? "border-purple-500 text-white"
                  : "border-transparent text-[#A7A3BC] hover:text-white"
              }`}
            >
              Preview &amp; Features
            </button>

            <button
              onClick={() => setActiveTab("curriculum")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "curriculum"
                  ? "border-purple-500 text-white"
                  : "border-transparent text-[#A7A3BC] hover:text-white"
              }`}
            >
              Comparison &amp; Bonuses
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "faqs"
                  ? "border-purple-500 text-white"
                  : "border-transparent text-[#A7A3BC] hover:text-white"
              }`}
            >
              Product FAQ ({product.faqs.length})
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & DELIVERABLES */}
        {activeTab === "overview" && (
          <div className="space-y-16">
            {/* Detailed Description */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-2xl font-bold text-white">Product Overview</h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                  {product.fullDescription}
                </p>

                {/* Key Features Bullet List */}
                <div className="pt-4">
                  <h3 className="text-base font-bold text-white mb-3">Key Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.features?.map((feature: any, idx: number) => {
                      const featTitle = typeof feature === "string" ? feature : feature.title;
                      const featDesc = typeof feature === "object" ? feature.description : null;
                      return (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-xs text-gray-200 font-semibold block">{featTitle}</span>
                            {featDesc && <span className="text-[11px] text-gray-400 mt-0.5 block">{featDesc}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Specs Sidebar Card */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#17152E]/70 border border-white/10 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Technical Specifications
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#A7A3BC]">Format</span>
                    <span className="text-white font-medium text-right">{product.productFormat}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#A7A3BC]">Compatibility</span>
                    <span className="text-white font-medium text-right">{product.compatibility}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#A7A3BC]">Delivery</span>
                    <span className="text-emerald-400 font-medium">Instant Download</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#A7A3BC]">Access Period</span>
                    <span className="text-white font-medium">Lifetime Access</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#A7A3BC]">Support</span>
                    <span className="text-white font-medium">Dedicated Help Desk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION C: WHAT'S INCLUDED DELIVERABLES */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  DELIVERY BREAKDOWN
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  What&apos;s Included In This Package
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {product.whatsIncluded.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#17152E]/80 border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-[10px] font-bold text-purple-300">
                          {item.format}
                        </span>
                        {item.count && (
                          <span className="text-xs font-bold text-white font-mono">
                            {item.count}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#A7A3BC] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PREVIEWS & LEARNING OUTCOMES */}
        {activeTab === "preview" && (
          <div className="space-y-16">
            {/* Learning outcomes / curriculum */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                What You Will Achieve &amp; Master
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {product.learningOutcomes?.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#17152E]/80 border border-white/10">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-200">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Preview Mockups */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Asset &amp; Interface Preview</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="rounded-2xl overflow-hidden bg-[#17152E] border border-white/10 p-4 aspect-[4/3] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-white/5">
                      <span>Preview Sheet 0{num}</span>
                      <span className="text-purple-400 font-mono">2026 Edition</span>
                    </div>
                    <div className="my-auto text-center p-4">
                      <Layers size={32} className="mx-auto text-purple-400/50 mb-2" />
                      <span className="text-xs font-bold text-white block">
                        Module Asset Vault #{num}
                      </span>
                      <span className="text-[11px] text-[#A7A3BC]">
                        High-resolution editable format
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-400 text-center pt-2 border-t border-white/5">
                      ✓ Instant Cloud Access Included
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMPARISON & BONUSES */}
        {activeTab === "curriculum" && (
          <div className="space-y-16">
            {/* Bonuses */}
            {product.bonuses.length > 0 && (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400 block mb-1">
                    VALUED ADD-ONS
                  </span>
                  <h2 className="text-2xl font-bold text-white">
                    Exclusive Bonus Assets Included Free
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.bonuses.map((bonus, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-gradient-to-br from-[#1d173d] to-[#120f26] border border-pink-500/30 flex flex-col justify-between shadow-lg"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-300">
                            <Gift size={15} />
                            <span>Bonus #{idx + 1}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold">
                            Worth {bonus.demoValue || (bonus as any).value || "₹1,499"}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">
                          {bonus.title}
                        </h4>
                        <p className="text-xs text-[#A7A3BC] leading-relaxed">
                          {bonus.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-3 border-t border-white/10 text-xs font-bold text-emerald-400">
                        Included with your order
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {product.comparison && product.comparison.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">
                  Why ZenovaVibe Beats Basic Alternatives
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#17152E]/70">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-[#121026]">
                        <th className="p-4 text-white font-bold">Feature Breakdown</th>
                        <th className="p-4 text-purple-300 font-bold bg-purple-950/30">
                          {product.name}
                        </th>
                        <th className="p-4 text-gray-400 font-bold">Standard Free Tutorials</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {product.comparison.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="p-4 text-gray-200 font-medium">{row.feature}</td>
                          <td className="p-4 bg-purple-950/15">
                            {row.zenova === true ? (
                              <Check size={16} className="text-emerald-400 font-bold" />
                            ) : (
                              <span className="text-white font-semibold">{row.zenova}</span>
                            )}
                          </td>
                          <td className="p-4 text-gray-500">
                            {row.standard === false ? (
                              <XIcon size={16} className="text-red-400" />
                            ) : (
                              <span>{row.standard}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === "faqs" && (
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            {product.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "bg-[#17152E] border-purple-500/40"
                      : "bg-[#111027]/70 border-white/10"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-purple-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A7A3BC] leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* SECTION K: FINAL CONVERSION BANNER */}
        <section className="mt-24 mb-20">
          <div className="rounded-3xl bg-gradient-to-r from-[#20184a] via-[#2f1c5c] to-[#161f4b] border border-purple-500/40 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                <Sparkles size={13} className="text-yellow-300" />
                <span>INSTANT DIGITAL ACCESS</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to Take Your Next Step?
              </h2>

              <p className="text-sm sm:text-base text-gray-200">
                Get instant access to resources designed to help you create more, work smarter, and grow faster.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#090816] font-bold text-sm hover:bg-gray-100 hover:scale-105 transition-all shadow-xl"
                >
                  {product.isFree ? "Download Now (Free)" : `Get This Product Now – ₹${product.price.toLocaleString("en-IN")}`}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION L: RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Similar Digital Products</h3>
                <p className="text-xs text-[#A7A3BC] mt-1">Recommended companions for your workflow</p>
              </div>
              <Link
                href={`/category/${product.category}`}
                className="text-xs font-bold text-purple-400 hover:text-purple-300"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct, i) => (
                <ProductCard key={relProduct.id} product={relProduct} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* SECTION M: STICKY PURCHASE BAR ON SCROLL */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#090816]/95 border-t border-white/10 py-3 px-4 backdrop-blur-xl shadow-2xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="hidden sm:block truncate">
            <h4 className="text-xs font-bold text-white truncate max-w-md">{product.name}</h4>
            <span className="text-[11px] text-purple-300">{product.productFormat}</span>
          </div>

          <div className="flex items-center gap-3 ml-auto w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white">
                {product.isFree ? "FREE" : `₹${product.price.toLocaleString("en-IN")}`}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors hidden xs:block"
              >
                {inCart ? "In Cart ✓" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
              >
                {product.isFree ? "Download Free" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
