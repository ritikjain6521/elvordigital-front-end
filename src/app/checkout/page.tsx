"use client";

import React, { useState, useEffect, Suspense } from "react";
import { API_BASE } from "@/lib/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Zap,
  ExternalLink,
  MailCheck,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, total, discountAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Pending SuperProfile order state (after clicking Pay with SuperProfile)
  const [pendingOrder, setPendingOrder] = useState<{
    orderNumber: string;
    superProfileUrl: string;
  } | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const confirmAndUnlockOrder = async (orderNumber: string, txnId?: string) => {
    setIsConfirming(true);
    setStatusMessage("Verifying payment, unlocking access & sending email...");
    try {
      const confirmRes = await fetch(`${API_BASE}/api/payment/superprofile-confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          transactionId: txnId || "",
        }),
      });

      const confirmData = await confirmRes.json();
      if (!confirmRes.ok || !confirmData.success) {
        throw new Error(confirmData?.message || "Failed to confirm order.");
      }

      // Frontend email relay fallback if backend SMTP timed out
      if (!confirmData.emailDispatched && confirmData.order) {
        try {
          await fetch("/api/send-order-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerEmail: confirmData.order.customerEmail,
              customerName: confirmData.order.customerName,
              orderNumber: confirmData.order.orderNumber,
              items: confirmData.order.items,
              totalAmount: confirmData.order.totalAmount,
            }),
          });
        } catch {
          // non-blocking
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(
          `elvora_order_${confirmData.orderNumber}`,
          JSON.stringify(confirmData.order)
        );
      }

      clearCart();
      router.push(`/order-success/${confirmData.orderNumber}`);
    } catch (err: any) {
      alert(err?.message || "Could not unlock order. Please try again.");
      setIsConfirming(false);
      setStatusMessage(null);
    }
  };

  // Auto-confirm if SuperProfile redirects back to /checkout?confirmOrder=ELV-XXXX
  useEffect(() => {
    const confirmOrderParam = searchParams.get("confirmOrder");
    if (confirmOrderParam) {
      confirmAndUnlockOrder(confirmOrderParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePayWithSuperProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setStatusMessage("Creating your order & preparing SuperProfile checkout...");

    try {
      const itemsPayload = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        format: item.product.productFormat || "Digital Download",
        googleDriveLink: item.product.googleDriveLink || "",
        accessFolderLink: item.product.accessFolderLink || "",
        videoLink: item.product.videoLink || "",
        downloadFileUrl: item.product.downloadFileUrl || "",
        superProfileUrl: item.product.superProfileUrl || "",
      }));

      const res = await fetch(`${API_BASE}/api/payment/superprofile-init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          items: itemsPayload,
          subtotal: total + discountAmount,
          discount: discountAmount,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to initialize SuperProfile checkout.");
      }

      const spUrl =
        data.superProfileUrl ||
        cart.find((i) => i.product.superProfileUrl?.trim())?.product.superProfileUrl?.trim() ||
        "";

      if (spUrl) {
        window.open(spUrl, "_blank", "noopener,noreferrer");
      }

      setPendingOrder({
        orderNumber: data.orderNumber,
        superProfileUrl: spUrl,
      });
      setStatusMessage(null);
      setIsSubmitting(false);
    } catch (err: any) {
      console.error("[SuperProfile Checkout] Error:", err);
      alert(err?.message || "Failed to start checkout. Please try again.");
      setIsSubmitting(false);
      setStatusMessage(null);
    }
  };

  if (cart.length === 0 && !pendingOrder && !isConfirming) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-purple-300">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Your cart is empty</h2>
        <p className="text-sm text-[#A7A3BC] mb-8">
          Please add at least one digital product before proceeding to checkout.
        </p>
        <Link
          href="/store"
          className="px-8 py-3.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-500 transition-colors"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Store", href: "/store" },
          { label: "Cart", href: "/cart" },
          { label: "SuperProfile Checkout" },
        ]}
      />

      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-400">
        <Zap size={14} />
        <span>SUPERPROFILE SECURE PAYMENT GATEWAY</span>
      </div>

      <h1 className="text-3xl font-black text-white mt-1 mb-2">Complete Your Purchase</h1>
      <p className="text-sm text-[#A7A3BC] mb-8">
        Enter your delivery details, pay securely via SuperProfile, and get instant access + confirmation email.
      </p>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customer Form OR Payment Confirmation */}
        <div className="lg:col-span-7">
          {!pendingOrder ? (
            <form onSubmit={handlePayWithSuperProfile} className="space-y-6">
              {/* Customer Contact Information */}
              <div className="p-6 rounded-2xl bg-[#17152E]/80 border border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3">
                  1. Customer &amp; Delivery Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A7A3BC] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e0d22] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#A7A3BC] mb-1.5">
                      Email Address (Access &amp; Receipt Email) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e0d22] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A7A3BC] mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0d22] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* SuperProfile Payment Method */}
              <div className="p-6 rounded-2xl bg-[#17152E]/80 border border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3">
                  2. Payment via SuperProfile
                </h2>

                <div className="p-4 rounded-xl bg-purple-600/15 border border-purple-500/40 flex items-start gap-3">
                  <Zap size={20} className="text-purple-300 shrink-0 mt-0.5" />
                  <div className="text-xs text-purple-100 space-y-1">
                    <p className="font-bold text-white">Pay with SuperProfile (UPI, Cards, Netbanking)</p>
                    <p className="text-purple-200/80">
                      Clicking &quot;Pay with SuperProfile&quot; will open the official SuperProfile payment page. After completing payment, your Google Drive / digital access links are unlocked immediately and emailed to <span className="font-semibold text-white">{formData.email || "your email"}</span>.
                    </p>
                  </div>
                </div>
              </div>

              {statusMessage && (
                <div className="p-4 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-purple-300" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 text-white font-black text-base shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Preparing SuperProfile Checkout...</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    <span>Pay with SuperProfile (₹{total.toLocaleString("en-IN")})</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Step 2: Complete SuperProfile Payment & Unlock Access */
            <div className="p-6 sm:p-8 rounded-2xl bg-[#17152E]/90 border border-emerald-500/40 space-y-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Order Created: {pendingOrder.orderNumber}
                  </span>
                  <h2 className="text-xl font-black text-white">
                    Complete Your SuperProfile Payment
                  </h2>
                  <p className="text-xs text-[#A7A3BC] mt-1">
                    Access &amp; email will be sent to <span className="text-white font-semibold">{formData.email}</span>
                  </p>
                </div>
              </div>

              {pendingOrder.superProfileUrl ? (
                <div className="p-4 rounded-xl bg-[#0e0d22] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-gray-300">
                    <p className="font-bold text-white">SuperProfile Payment Window Opened</p>
                    <p className="text-gray-400 mt-0.5">
                      Didn&apos;t see the payment tab? Click the button to open it.
                    </p>
                  </div>
                  <a
                    href={pendingOrder.superProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0"
                  >
                    <span>Open SuperProfile</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  No SuperProfile URL is configured on this product yet. You can still confirm below to test access &amp; email delivery.
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#A7A3BC] mb-1.5">
                  SuperProfile Payment / Reference ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. SP-TXN-123456"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0d22] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {statusMessage && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-emerald-300" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="button"
                disabled={isConfirming}
                onClick={() => confirmAndUnlockOrder(pendingOrder.orderNumber, transactionId)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-base shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isConfirming ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Unlocking Access &amp; Sending Email...</span>
                  </>
                ) : (
                  <>
                    <MailCheck size={18} />
                    <span>I Have Paid — Unlock Access &amp; Send Email</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#17152E] border border-purple-500/30 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
              Order Summary ({cart.length} {cart.length === 1 ? "item" : "items"})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-start gap-3 text-xs border-b border-white/5 pb-3"
                >
                  <div className="flex-1">
                    <p className="font-bold text-white leading-tight">{item.product.name}</p>
                    <span className="text-[11px] text-[#A7A3BC]">
                      {item.product.productFormat} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-white shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-[#A7A3BC] border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-semibold">
                  ₹{(total + discountAmount).toLocaleString("en-IN")}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied</span>
                  <span className="font-semibold">-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline text-base font-black text-white pt-2 border-t border-white/10">
                <span>Total Payable</span>
                <span className="text-2xl text-purple-300">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-[#A7A3BC]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Verified SuperProfile Payment + Instant Email Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-purple-400" />
                <span>Immediate Redirect to Access Vault Page</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>100% Lifetime Access &amp; Cloud Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white text-sm">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
