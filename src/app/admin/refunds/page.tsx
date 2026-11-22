"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Search,
  Clock,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";

export default function AdminRefundsPage() {
  const { refunds, processRefund } = useAdminData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRefunds = refunds.filter((r) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        r.orderId.toLowerCase().includes(q) ||
        r.customerEmail.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <RotateCcw size={24} className="text-purple-400" />
          <span>Customer Refund Claims Queue</span>
        </h1>
        <p className="text-xs text-[#A7A3BC] mt-0.5">
          Review digital product dispute requests, duplicate purchases, and policy exceptions.
        </p>
      </div>

      {/* Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Refund Access Protection:</strong> Approving a refund automatically revokes customer access and marks the order as refunded in the main sales ledger.
        </div>
      </div>

      {/* Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-3 font-semibold">Order ID</th>
                <th className="py-3 px-3 font-semibold">Customer</th>
                <th className="py-3 px-3 font-semibold">Amount</th>
                <th className="py-3 px-3 font-semibold">Stated Reason</th>
                <th className="py-3 px-3 font-semibold">Requested Date</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRefunds.map((ref) => (
                <tr key={ref.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-mono font-bold text-white">
                    <Link
                      href={`/admin/orders/${ref.orderId}`}
                      className="hover:text-purple-300"
                    >
                      {ref.orderId}
                    </Link>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-gray-200 block truncate max-w-[150px]">
                      {ref.customerName}
                    </span>
                    <span className="text-[10px] text-gray-400">{ref.customerEmail}</span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    ₹{ref.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3 text-[#A7A3BC] max-w-xs truncate">
                    {ref.reason}
                  </td>
                  <td className="py-3 px-3 text-gray-400">
                    {ref.requestedDate}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ref.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : ref.status === "rejected"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {ref.status === "pending" ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            if (window.confirm(`Approve refund of ₹${ref.amount} for ${ref.customerEmail}?`)) {
                              processRefund(ref.id, "approve");
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 font-bold text-[11px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Reject refund for ${ref.customerEmail}?`)) {
                              processRefund(ref.id, "reject");
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 font-bold text-[11px]"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-500 font-medium">
                        Processed on {ref.processedDate || "N/A"}
                      </span>
                    )}
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
