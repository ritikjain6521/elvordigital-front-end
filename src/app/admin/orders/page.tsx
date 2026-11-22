"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  FileText,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Printer
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import { PaymentStatus } from "@/types/admin";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdminData();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((o) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchNum = o.orderNumber.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchEmail = o.customerEmail.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchEmail) return false;
    }
    if (statusFilter !== "all" && o.paymentStatus !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ShoppingBag size={24} className="text-purple-400" />
            <span>Orders &amp; Purchase Transactions</span>
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Real-time ledger of digital purchases, payment gateways, and automated access dispatch.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-[#17152E]/80 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by order #, customer name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
        >
          <option value="all">All Statuses ({orders.length})</option>
          <option value="paid">Paid ({orders.filter((o) => o.paymentStatus === "paid").length})</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Orders Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-3 font-semibold">Order ID</th>
                <th className="py-3 px-3 font-semibold">Customer</th>
                <th className="py-3 px-3 font-semibold">Items</th>
                <th className="py-3 px-3 font-semibold">Total Amount</th>
                <th className="py-3 px-3 font-semibold">Payment Status</th>
                <th className="py-3 px-3 font-semibold">Access Status</th>
                <th className="py-3 px-3 font-semibold">Date</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/[0.02]">
                  {/* Order Number */}
                  <td className="py-3 px-3 font-mono font-bold text-white">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="hover:text-purple-300 transition-colors"
                    >
                      {ord.orderNumber}
                    </Link>
                  </td>

                  {/* Customer */}
                  <td className="py-3 px-3">
                    <span className="font-semibold text-white block truncate max-w-[150px]">
                      {ord.customerName}
                    </span>
                    <span className="text-[10px] text-gray-400 truncate block">
                      {ord.customerEmail}
                    </span>
                  </td>

                  {/* Items */}
                  <td className="py-3 px-3">
                    <span className="text-gray-300 block truncate max-w-[180px]">
                      {ord.items[0]?.productName || "Digital Asset"}
                    </span>
                    {ord.items.length > 1 && (
                      <span className="text-[10px] text-purple-400">
                        +{ord.items.length - 1} more item(s)
                      </span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-3 font-bold text-white">
                    ₹{ord.totalAmount.toLocaleString("en-IN")}
                  </td>

                  {/* Payment Status Dropdown Selector */}
                  <td className="py-3 px-3">
                    <select
                      value={ord.paymentStatus}
                      onChange={(e) =>
                        updateOrderStatus(ord.id, e.target.value as PaymentStatus)
                      }
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border cursor-pointer ${
                        ord.paymentStatus === "paid"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : ord.paymentStatus === "refunded"
                          ? "bg-pink-500/20 text-pink-300 border-pink-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      <option value="paid" className="bg-[#17152E] text-white">PAID</option>
                      <option value="pending" className="bg-[#17152E] text-white">PENDING</option>
                      <option value="failed" className="bg-[#17152E] text-white">FAILED</option>
                      <option value="refunded" className="bg-[#17152E] text-white">REFUNDED</option>
                    </select>
                  </td>

                  {/* Access Status */}
                  <td className="py-3 px-3">
                    <span
                      className={`text-[11px] font-semibold ${
                        ord.accessStatus === "granted" ? "text-purple-300" : "text-gray-500"
                      }`}
                    >
                      {ord.accessStatus === "granted" ? "Granted ✓" : "Pending"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-3 text-gray-400 text-[11px]">
                    {ord.orderDate.split("T")[0]}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 inline-flex"
                      title="View Order Details"
                    >
                      <Eye size={14} />
                    </Link>
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
