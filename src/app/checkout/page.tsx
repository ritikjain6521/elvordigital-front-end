"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert,
  Smartphone,
  Building,
  Loader2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, discountAmount, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [formData, setFormData] = useState({
    name: "Ritik Verma",
    email: "ritik@example.com",
    phone: "9876543210",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        items: cart.map((item) => {
          const itemSlug = item.product.slug || item.product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return {
            productId: item.product.id,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            format: item.product.productFormat,
            googleDriveLink:
              (item.product as any).googleDriveLink ||
              `https://drive.google.com/drive/folders/1zenovavibe-${itemSlug}-master-vault`,
            accessFolderLink:
              (item.product as any).accessFolderLink ||
              `https://cloud.zenovavibe.com/folders/${itemSlug}`,
            downloadFileUrl:
              (item.product as any).downloadFileUrl ||
              `https://assets.zenovavibe.com/${itemSlug}-bundle.zip`,
          };
        }),
        subtotal: total + discountAmount,
        discount: discountAmount,
        totalAmount: total,
        paymentMethod: paymentMethod.toUpperCase(),
        simulatePaymentSuccess: true,
      };

      // Cache order items locally for instant guarantee on confirmation screen
      if (typeof window !== "undefined") {
        sessionStorage.setItem("znv_recent_order", JSON.stringify(payload));
        localStorage.setItem("znv_recent_order", JSON.stringify(payload));
      }

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      clearCart();

      if (data.success && data.order) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("znv_recent_order", JSON.stringify(data.order));
          localStorage.setItem("znv_recent_order", JSON.stringify(data.order));
        }
        router.push(`/order-success/${data.order.orderNumber}`);
      } else {
        const fallbackOrderNum = `ZNV-${Math.floor(1000 + Math.random() * 9000)}`;
        router.push(`/order-success/${fallbackOrderNum}`);
      }
    } catch {
      // Backend fallback
      const fallbackOrderNum = `ZNV-${Math.floor(1000 + Math.random() * 9000)}`;
      clearCart();
      router.push(`/order-success/${fallbackOrderNum}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Cart", href: "/cart" },
            { label: "Demo Checkout" },
          ]}
        />

        <div className="mt-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Checkout Simulation
          </h1>
          <p className="mt-2 text-sm text-[#A7A3BC]">
            Simulated digital checkout flow. No real charges will be made.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 text-xs text-amber-200">
          <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-white block mb-0.5">Frontend Demo Notice:</strong>
            This is a demonstration checkout interface. No payment credentials or real bank card details are processed or stored.
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Customer info & payment method (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Contact info */}
              <div className="p-6 rounded-2xl bg-[#17152E]/80 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white pb-3 border-b border-white/5">
                  1. Contact &amp; Delivery Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Email Address (for instant file delivery)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="p-6 rounded-2xl bg-[#17152E]/80 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white pb-3 border-b border-white/5">
                  2. Select Payment Method (Simulation)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "upi"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-[#0e0d22] border-white/10 text-[#A7A3BC]"
                    }`}
                  >
                    <Smartphone size={20} className={paymentMethod === "upi" ? "text-purple-400" : ""} />
                    <span className="text-xs font-bold">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "card"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-[#0e0d22] border-white/10 text-[#A7A3BC]"
                    }`}
                  >
                    <CreditCard size={20} className={paymentMethod === "card" ? "text-purple-400" : ""} />
                    <span className="text-xs font-bold">Debit / Credit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "netbanking"
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-[#0e0d22] border-white/10 text-[#A7A3BC]"
                    }`}
                  >
                    <Building size={20} className={paymentMethod === "netbanking" ? "text-purple-400" : ""} />
                    <span className="text-xs font-bold">Netbanking</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-400 text-center">
                  Selected method: <strong className="text-white uppercase">{paymentMethod}</strong> (Demo Mock Mode)
                </div>
              </div>
            </div>

            {/* Order Items & Place Order (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#17152E]/90 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white pb-3 border-b border-white/5">
                  Order Items ({cart.length})
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-xs py-1"
                    >
                      <div className="truncate pr-2">
                        <span className="font-semibold text-white truncate block">
                          {item.product.name}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-white shrink-0">
                        {item.product.isFree
                          ? "FREE"
                          : `₹${(item.product.price * item.quantity).toLocaleString("en-IN")}`}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-sm font-bold text-white">Amount Due:</span>
                    <span className="text-2xl font-black text-white">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Processing & Granting Access...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={15} />
                      <span>Confirm & Place Order (₹{total.toLocaleString("en-IN")})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
