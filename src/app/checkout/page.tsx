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
  ShoppingBag,
  XCircle,
  RefreshCw,
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

  const [pendingOrder, setPendingOrder] = useState<{
    orderNumber: string;
    superProfileUrl: string;
  } | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [paymentCancelled, setPaymentCancelled] = useState(false);

  const checkPaymentVerified = async (orderNumber: string, manualClick = false) => {
    if (manualClick) {
      setIsCheckingStatus(true);
      setVerificationError(null);
    }
    try {
      const res = await fetch(`${API_BASE}/api/payment/superprofile-status/${orderNumber}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (data.success && data.verified && data.order) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("elvora_pending_sp_order");
          localStorage.setItem(
            `elvora_order_${data.orderNumber}`,
            JSON.stringify(data.order)
          );
        }
        clearCart();
        router.push(`/order-success/${data.orderNumber}`);
        return true;
      }

      if (data.paymentStatus === "failed") {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("elvora_pending_sp_order");
        }
        setPaymentCancelled(true);
        setPendingOrder(null);
        setVerificationError("Payment was cancelled or failed. No access granted and no email sent.");
        return false;
      }

      if (manualClick) {
        setVerificationError(
          `Order ${orderNumber} is still waiting for confirmation from SuperProfile. If you completed payment, please wait a few seconds for the SuperProfile webhook/redirect, or share Order ID ${orderNumber} with Admin to approve.`
        );
      }
      return false;
    } catch {
      if (manualClick) {
        setVerificationError("Could not reach server to verify payment. Please try again.");
      }
      return false;
    } finally {
      if (manualClick) setIsCheckingStatus(false);
    }
  };

  // Restore pending SuperProfile order across refreshes/redirects
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem("elvora_pending_sp_order");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.orderNumber && !pendingOrder) {
          setPendingOrder({
            orderNumber: parsed.orderNumber,
            superProfileUrl: parsed.superProfileUrl || "",
          });
          if (parsed.email && !formData.email) {
            setFormData((prev) => ({ ...prev, email: parsed.email }));
          }
        }
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-poll payment verification every 3 seconds while waiting on SuperProfile
  useEffect(() => {
    if (!pendingOrder?.orderNumber) return;
    const interval = setInterval(() => {
      checkPaymentVerified(pendingOrder.orderNumber, false);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingOrder?.orderNumber]);

  // Handle SuperProfile Redirect URL (?sp_secret=...&confirmOrder=ELV-XXXX or restored pendingOrder)
  useEffect(() => {
    const confirmOrderParam = searchParams.get("confirmOrder");
    const spSecret = searchParams.get("sp_secret");
    const spPaid = searchParams.get("sp_paid");

    let targetOrder = confirmOrderParam || pendingOrder?.orderNumber || "";
    if (!targetOrder && typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("elvora_pending_sp_order");
        targetOrder = saved ? JSON.parse(saved)?.orderNumber || "" : "";
      } catch {
        // ignore
      }
    }

    if (spSecret && targetOrder && (spPaid === "1" || confirmOrderParam || spSecret)) {
      setIsCheckingStatus(true);
      fetch(`${API_BASE}/api/payment/superprofile-redirect-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: targetOrder, spSecret }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.verified && data.order) {
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("elvora_pending_sp_order");
              localStorage.setItem(`elvora_order_${data.orderNumber}`, JSON.stringify(data.order));
            }
            clearCart();
            router.push(`/order-success/${data.orderNumber}`);
          } else {
            setVerificationError(data.message || "Payment verification failed.");
          }
        })
        .catch(() => setVerificationError("Could not verify SuperProfile redirect."))
        .finally(() => setIsCheckingStatus(false));
      return;
    }

    if (confirmOrderParam) {
      checkPaymentVerified(confirmOrderParam, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePayWithSuperProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setPaymentCancelled(false);
    setVerificationError(null);
    setStatusMessage("Creating pending order & opening SuperProfile checkout...");

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

      const nextPending = {
        orderNumber: data.orderNumber,
        superProfileUrl: spUrl,
      };
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "elvora_pending_sp_order",
          JSON.stringify({ ...nextPending, email: formData.email })
        );
      }
      setPendingOrder(nextPending);
      setStatusMessage(null);
      setIsSubmitting(false);
    } catch (err: any) {
      alert(err?.message || "Failed to start checkout. Please try again.");
      setIsSubmitting(false);
      setStatusMessage(null);
    }
  };

  const handleCancelPayment = async () => {
    if (!pendingOrder?.orderNumber) return;
    try {
      await fetch(`${API_BASE}/api/payment/superprofile-cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: pendingOrder.orderNumber }),
      });
    } catch {
      // non-blocking
    }
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("elvora_pending_sp_order");
    }
    setPendingOrder(null);
    setPaymentCancelled(true);
    setVerificationError("Payment cancelled. No access has been granted and no email was sent.");
  };

  if (cart.length === 0 && !pendingOrder && !paymentCancelled) {
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
        <span>SUPERPROFILE VERIFIED PAYMENT GATEWAY</span>
      </div>

      <h1 className="text-3xl font-black text-white mt-1 mb-2">Complete Your Purchase</h1>
      <p className="text-sm text-[#A7A3BC] mb-8">
        Access &amp; email delivery are unlocked strictly after your SuperProfile payment is verified.
      </p>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          {paymentCancelled ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#17152E]/90 border border-red-500/40 space-y-5 text-center">
              <div className="h-14 w-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
                <XCircle size={28} />
              </div>
              <h2 className="text-xl font-black text-white">Payment Cancelled / Not Completed</h2>
              <p className="text-xs text-red-200/80 max-w-md mx-auto">
                Your payment was not completed. No access links were unlocked and no confirmation email was sent.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentCancelled(false);
                    setVerificationError(null);
                  }}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  Try Payment Again
                </button>
                <Link
                  href="/store"
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs"
                >
                  Back to Store
                </Link>
              </div>
            </div>
          ) : !pendingOrder ? (
            <form onSubmit={handlePayWithSuperProfile} className="space-y-6">
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

              <div className="p-6 rounded-2xl bg-[#17152E]/80 border border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3">
                  2. Payment via SuperProfile
                </h2>

                <div className="p-4 rounded-xl bg-purple-600/15 border border-purple-500/40 flex items-start gap-3">
                  <Zap size={20} className="text-purple-300 shrink-0 mt-0.5" />
                  <div className="text-xs text-purple-100 space-y-1">
                    <p className="font-bold text-white">Pay with SuperProfile (UPI, Cards, Netbanking)</p>
                    <p className="text-purple-200/80">
                      Only after your payment is verified will your access links be unlocked and emailed to{" "}
                      <span className="font-semibold text-white">{formData.email || "your email"}</span>.
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
            <div className="p-6 sm:p-8 rounded-2xl bg-[#17152E]/90 border border-amber-500/40 space-y-6 shadow-2xl">
              <div className="border-b border-white/10 pb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <Loader2 size={12} className="animate-spin" />
                  Waiting for Payment Verification — Order {pendingOrder.orderNumber}
                </span>
                <h2 className="text-xl font-black text-white">
                  Complete Payment on SuperProfile
                </h2>
                <p className="text-xs text-[#A7A3BC] mt-1">
                  Once SuperProfile confirms your payment, you will automatically be redirected to your Access Vault and receive your email at{" "}
                  <span className="text-white font-semibold">{formData.email}</span>.
                </p>
              </div>

              {pendingOrder.superProfileUrl ? (
                <div className="p-4 rounded-xl bg-[#0e0d22] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-gray-300">
                    <p className="font-bold text-white">SuperProfile Payment Window Opened</p>
                    <p className="text-gray-400 mt-0.5">
                      Complete your UPI/Card payment in the SuperProfile tab.
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
                  No SuperProfile URL is configured on this product. Please add one in Admin Panel or ask Admin to verify order <span className="font-mono font-bold">{pendingOrder.orderNumber}</span>.
                </div>
              )}

              {verificationError && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-medium">
                  {verificationError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={isCheckingStatus}
                  onClick={() => checkPaymentVerified(pendingOrder.orderNumber, true)}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isCheckingStatus ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Checking Verification...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      <span>Verify Payment Status</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancelPayment}
                  className="px-5 py-3.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-bold text-xs transition-all cursor-pointer"
                >
                  Cancel Payment
                </button>
              </div>
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
                <span>Access granted only after verified payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-purple-400" />
                <span>256-bit SSL Encrypted SuperProfile Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Instant Email &amp; Vault Redirect on Confirmation</span>
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
