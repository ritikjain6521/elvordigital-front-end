"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  RotateCcw
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    total,
  } = useCart();

  const { showToast } = useToast();
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, success: res.success });
    showToast(res.message, res.success ? "success" : "info");
    if (res.success) setCouponInput("");
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Shopping Cart" }]} />

        <div className="mt-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Your Digital Cart
          </h1>
          <p className="mt-2 text-sm text-[#A7A3BC]">
            Review your selected digital assets, apply coupons, and proceed to instant access delivery.
          </p>
        </div>

        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-6 rounded-2xl bg-[#17152E]/70 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/5 text-xs text-[#A7A3BC]">
                  <span>Product Details</span>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1 text-pink-400 hover:text-pink-300"
                  >
                    <RotateCcw size={13} />
                    <span>Clear Cart</span>
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        {/* Mini cover preview */}
                        <div className="h-16 w-20 rounded-xl bg-gradient-to-br from-[#241c49] to-[#0e0b24] border border-white/10 flex items-center justify-center p-2 text-center shrink-0">
                          <span className="text-[10px] font-bold text-purple-300 line-clamp-2">
                            {item.product.name}
                          </span>
                        </div>

                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="text-sm sm:text-base font-bold text-white hover:text-purple-300 transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-[#A7A3BC] mt-0.5">
                            {item.product.categoryName} • {item.product.productFormat}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-black text-white">
                              {item.product.isFree
                                ? "FREE"
                                : `₹${item.product.price.toLocaleString("en-IN")}`}
                            </span>
                            {item.product.originalPrice > item.product.price && (
                              <span className="text-xs text-gray-500 line-through">
                                ₹{item.product.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-[#0e0d22] border border-white/10 text-xs">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:text-purple-300 text-gray-400"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:text-purple-300 text-gray-400"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant Delivery Assurance */}
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3 text-xs text-purple-200">
                <ShieldCheck size={20} className="text-purple-400 shrink-0" />
                <span>
                  All products are 100% digital. Download links &amp; portal access are generated immediately after checkout.
                </span>
              </div>
            </div>

            {/* Order Summary & Coupon (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-[#17152E]/90 border border-white/10 space-y-6 shadow-xl">
                <h3 className="text-base font-bold text-white pb-3 border-b border-white/5">
                  Order Summary
                </h3>

                {/* Subtotal, discount, total */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-[#A7A3BC]">
                    <span>Items Subtotal</span>
                    <span className="text-white font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Coupon Discount ({discountPercent}%)</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#A7A3BC]">
                    <span>Digital Delivery Fee</span>
                    <span className="text-emerald-400 font-medium">FREE</span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">Estimated Total</span>
                    <span className="text-2xl font-black text-white">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Coupon Code Box */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. ELVORA10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Active coupon status */}
                  {couponCode && (
                    <div className="mt-2 flex items-center justify-between text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>Code &apos;{couponCode}&apos; Applied!</span>
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-gray-400 hover:text-white underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {couponMsg && !couponCode && (
                    <p className={`text-[11px] mt-1.5 ${couponMsg.success ? "text-emerald-400" : "text-pink-400"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                {/* Proceed to Demo Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Demo Checkout</span>
                  <ArrowRight size={16} />
                </Link>

                <p className="text-[11px] text-center text-gray-500">
                  🔒 Encrypted 256-bit safe checkout simulation
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center py-24 p-8 rounded-3xl bg-[#17152E]/50 border border-white/10 max-w-md mx-auto">
            <ShoppingBag size={48} className="mx-auto text-purple-400/40 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Your cart is currently empty</h2>
            <p className="text-xs text-[#A7A3BC] mb-6">
              Looks like you haven&apos;t added any digital assets or courses yet. Explore our top resources to get started.
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
