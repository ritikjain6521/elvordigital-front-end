"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  RotateCcw,
  Send,
  CreditCard,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import Modal from "@/components/admin/ui/Modal";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const orderId = resolvedParams?.id as string;
  const { orders, recordOrderRefund, updateOrderStatus } = useAdminData();

  const order = orders.find((o) => o.id === orderId);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("");

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Order Not Found</h2>
        <Link href="/admin/orders" className="text-xs text-purple-400 underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundReason.trim()) {
      alert("Please enter a refund reason");
      return;
    }
    recordOrderRefund(order.id, order.totalAmount, refundReason);
    setRefundModalOpen(false);
    alert(`Refund of ₹${order.totalAmount} processed. Product access automatically revoked.`);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleResendConfirmation = () => {
    alert(`Order confirmation & digital credentials resent to ${order.customerEmail}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Orders</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handleResendConfirmation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10"
          >
            <Send size={13} />
            <span>Resend Email</span>
          </button>
          <button
            onClick={handlePrintInvoice}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/10"
          >
            <Printer size={13} />
            <span>Print Invoice</span>
          </button>
          {order.paymentStatus === "paid" && (
            <button
              onClick={() => setRefundModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-xs font-bold text-pink-300 border border-pink-500/30"
            >
              <RotateCcw size={13} />
              <span>Record Refund</span>
            </button>
          )}
        </div>
      </div>

      {/* Order Status Ribbon */}
      <div className="p-6 rounded-3xl bg-[#17152E]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[10px] font-mono text-gray-400 uppercase">
            Order Reference
          </span>
          <h1 className="text-2xl font-black text-white">{order.orderNumber}</h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Placed on {order.orderDate.replace("T", " ").replace("Z", "")} via {order.paymentMethod}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              order.paymentStatus === "paid"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : order.paymentStatus === "refunded"
                ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
            }`}
          >
            {order.paymentStatus}
          </span>
          <span className="text-xl font-black text-white">
            ₹{order.totalAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Grid: Items & Breakdown (7 cols) + Customer & Timeline (5 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Purchased Items */}
          <AdminCard title="Line Items">
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.productName}</h4>
                    <span className="text-[10px] text-[#A7A3BC]">{item.format} • Qty: {item.quantity}</span>
                  </div>
                  <span className="text-xs font-black text-white">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-[#A7A3BC]">
                <span>Items Subtotal</span>
                <span className="text-white">₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount ({order.couponUsed})</span>
                  <span>-₹{order.discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-[#A7A3BC]">
                <span>Taxes &amp; Delivery</span>
                <span className="text-emerald-400">FREE / ZERO TAX</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-white">
                <span>Total Paid</span>
                <span className="text-purple-300 text-lg">₹{order.totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </AdminCard>

          {/* Entitlement Status */}
          <AdminCard title="Product Access &amp; Entitlements">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
              <div className="flex items-center gap-2.5">
                <KeyRound size={18} className="text-purple-400" />
                <div>
                  <span className="font-bold text-white block">Email Entitlement Ledger</span>
                  <span className="text-[11px] text-[#A7A3BC]">Status: {order.accessStatus.toUpperCase()}</span>
                </div>
              </div>
              <Link
                href="/admin/access"
                className="text-xs font-semibold text-purple-300 hover:text-white"
              >
                Inspect Ledger →
              </Link>
            </div>
          </AdminCard>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Customer info */}
          <AdminCard title="Purchaser Details">
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-gray-400 text-[10px] uppercase block">Customer Name</span>
                <span className="font-bold text-white">{order.customerName}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase block">Email Address</span>
                <span className="font-mono text-purple-300">{order.customerEmail}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase block">Customer ID</span>
                <Link
                  href={`/admin/customers/${order.customerId}`}
                  className="font-mono text-gray-300 hover:text-white underline"
                >
                  {order.customerId}
                </Link>
              </div>
            </div>
          </AdminCard>

          {/* Order Timeline */}
          <AdminCard title="Order Lifecycle Timeline">
            <div className="space-y-4">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 pb-2 border-l border-purple-500/30 text-xs">
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-purple-500" />
                  <span className="font-bold text-white block">{event.title}</span>
                  <span className="text-[10px] text-gray-500 block">{event.time}</span>
                  <p className="text-[11px] text-[#A7A3BC] mt-0.5">{event.description}</p>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Refund Modal */}
      <Modal
        isOpen={refundModalOpen}
        onClose={() => setRefundModalOpen(false)}
        title="Record Refund for Order"
        subtitle={`Process full credit of ₹${order.totalAmount} for ${order.orderNumber}`}
      >
        <form onSubmit={handleRefundSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
              Reason for Refund *
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Duplicate order, format incompatibility, customer request..."
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs text-pink-300">
            ⚠️ Note: Recording this refund will immediately update the order status to &quot;Refunded&quot; and revoke product access for {order.customerEmail}.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setRefundModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-xs font-bold text-white shadow-lg"
            >
              Confirm Refund
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
