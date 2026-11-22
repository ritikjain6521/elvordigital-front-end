"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Search,
  CheckCircle2,
  RotateCcw,
  Clock,
  ShieldCheck,
  IndianRupee,
  Smartphone,
  Building
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import StatCard from "@/components/admin/ui/StatCard";

export default function AdminPaymentsPage() {
  const { payments } = useAdminData();
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");

  const totalCollected = payments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter((p) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTxn = p.transactionId.toLowerCase().includes(q);
      const matchEmail = p.customerEmail.toLowerCase().includes(q);
      const matchOrd = p.orderId.toLowerCase().includes(q);
      if (!matchTxn && !matchEmail && !matchOrd) return false;
    }
    if (methodFilter !== "all" && p.paymentMethod !== methodFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <CreditCard size={24} className="text-purple-400" />
          <span>Payment Transactions &amp; Gateway Settlement</span>
        </h1>
        <p className="text-xs text-[#A7A3BC] mt-0.5">
          Settlement records across UPI, Cards, Netbanking, and Razorpay/Stripe webhooks.
        </p>
      </div>

      {/* Gateway Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Settled"
          value={`₹${totalCollected.toLocaleString("en-IN")}`}
          icon={IndianRupee}
          subtitle="Processed via gateway"
        />
        <StatCard
          title="Gateway Health"
          value="100% Uptime"
          icon={ShieldCheck}
          subtitle="Webhook endpoints active"
          accentColor="from-emerald-500/20 to-teal-500/10"
        />
        <StatCard
          title="Average Fee"
          value="1.2%"
          icon={Clock}
          subtitle="Blended payment processing cost"
          accentColor="from-cyan-500/20 to-blue-500/10"
        />
      </div>

      {/* Search / Filter */}
      <div className="p-4 rounded-2xl bg-[#17152E]/80 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Transaction ID, Email, or Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
          />
        </div>

        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
        >
          <option value="all">All Payment Methods</option>
          <option value="UPI">UPI / QR Code</option>
          <option value="Credit/Debit Card">Credit/Debit Cards</option>
          <option value="Netbanking">Netbanking</option>
        </select>
      </div>

      {/* Payments Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-3 font-semibold">Transaction ID</th>
                <th className="py-3 px-3 font-semibold">Order</th>
                <th className="py-3 px-3 font-semibold">Customer</th>
                <th className="py-3 px-3 font-semibold">Method</th>
                <th className="py-3 px-3 font-semibold">Amount</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-mono font-bold text-white">
                    {pay.transactionId}
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      href={`/admin/orders/${pay.orderId}`}
                      className="font-mono text-purple-300 hover:underline"
                    >
                      {pay.orderId}
                    </Link>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-gray-200 block truncate max-w-[150px]">
                      {pay.customerName}
                    </span>
                    <span className="text-[10px] text-gray-400">{pay.customerEmail}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {pay.paymentMethod}
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    ₹{pay.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        pay.status === "success"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : pay.status === "refunded"
                          ? "bg-pink-500/20 text-pink-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-gray-400">
                    {pay.paymentDate.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
