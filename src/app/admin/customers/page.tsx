"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  Ban,
  Eye,
  FileText,
  Mail,
  Phone,
  ShieldAlert,
  ArrowRight,
  Trash2
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";

export default function AdminCustomersPage() {
  const { customers, toggleBlockCustomer, deleteCustomer } = useAdminData();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter((c) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchPhone = c.phone.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone) return false;
    }
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users size={24} className="text-purple-400" />
            <span>Customer Relationship Management (CRM)</span>
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Monitor registered purchasers, access permissions, lifetime values, and customer notes.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-[#17152E]/80 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by customer name, email, or phone..."
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
          <option value="all">All Customers ({customers.length})</option>
          <option value="active">Active Only</option>
          <option value="blocked">Blocked / Suspended</option>
        </select>
      </div>

      {/* Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-3 font-semibold">Customer</th>
                <th className="py-3 px-3 font-semibold">Phone</th>
                <th className="py-3 px-3 font-semibold">Registered</th>
                <th className="py-3 px-3 font-semibold">Orders</th>
                <th className="py-3 px-3 font-semibold">Lifetime Spend</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02]">
                  {/* Name, email, avatar */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden">
                        {c.avatar && (c.avatar.startsWith("http") || c.avatar.startsWith("/")) ? (
                          <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                        ) : (
                          c.avatar || (c.name ? c.name.charAt(0) : "?")
                        )}
                      </div>
                      <div className="truncate max-w-[180px]">
                        <Link
                          href={`/admin/customers/${c.id}`}
                          className="font-bold text-white hover:text-purple-300 block truncate"
                        >
                          {c.name}
                        </Link>
                        <span className="text-[10px] text-[#A7A3BC] truncate block">
                          {c.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="py-3 px-3 text-gray-300 font-mono text-[11px]">
                    {c.phone}
                  </td>

                  {/* Registered */}
                  <td className="py-3 px-3 text-gray-400">
                    {c.registeredDate && !isNaN(Date.parse(c.registeredDate))
                      ? new Date(c.registeredDate).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
                      : c.registeredDate}
                  </td>

                  {/* Orders */}
                  <td className="py-3 px-3 font-bold text-white">
                    {c.totalOrders}
                  </td>

                  {/* Spending */}
                  <td className="py-3 px-3 font-black text-purple-300">
                    ₹{c.totalSpending.toLocaleString("en-IN")}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        c.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="p-1.5 text-gray-400 hover:text-purple-300 rounded-lg hover:bg-white/5"
                        title="View Full Customer Dossier"
                      >
                        <Eye size={14} />
                      </Link>

                      <button
                        onClick={() => toggleBlockCustomer(c.id)}
                        className={`p-1.5 rounded-lg hover:bg-white/5 ${
                          c.status === "active"
                            ? "text-gray-400 hover:text-red-400"
                            : "text-red-400 hover:text-emerald-400"
                        }`}
                        title={c.status === "active" ? "Block Customer" : "Unblock Customer"}
                      >
                        <Ban size={14} />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete customer "${c.name}" (${c.email}) and all their orders/access records?`)) {
                            deleteCustomer(c.id, c.email);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5"
                        title="Delete Customer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
