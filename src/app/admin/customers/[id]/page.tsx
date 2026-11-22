"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  ShoppingBag,
  Download,
  KeyRound,
  Ban,
  Plus,
  Clock,
  HeadphonesIcon
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";

export default function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const customerId = resolvedParams?.id as string;
  const {
    customers,
    orders,
    accessRecords,
    tickets,
    addCustomerNote,
    toggleBlockCustomer
  } = useAdminData();

  const customer = customers.find((c) => c.id === customerId);
  const [newNote, setNewNote] = useState("");

  if (!customer) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Customer Not Found</h2>
        <Link href="/admin/customers" className="text-xs text-purple-400 underline">
          Back to Customer List
        </Link>
      </div>
    );
  }

  // Related records
  const customerOrders = orders.filter((o) => o.customerEmail === customer.email);
  const customerAccess = accessRecords.filter((a) => a.customerEmail === customer.email);
  const customerTickets = tickets.filter((t) => t.customerEmail === customer.email);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addCustomerNote(customer.id, newNote);
    setNewNote("");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/customers"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Customers</span>
        </Link>
        <button
          onClick={() => toggleBlockCustomer(customer.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
            customer.status === "active"
              ? "bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
          }`}
        >
          <Ban size={13} />
          <span>{customer.status === "active" ? "Block Customer" : "Unblock Customer"}</span>
        </button>
      </div>

      {/* Customer Header Dossier */}
      <div className="p-6 rounded-3xl bg-[#17152E]/90 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white font-black text-xl flex items-center justify-center shadow-lg">
            {customer.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{customer.name}</h1>
              {customer.isEmailVerified && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={11} />
                  <span>Verified Email</span>
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#A7A3BC] mt-1">
              <span className="flex items-center gap-1 text-purple-300">
                <Mail size={13} />
                <span>{customer.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone size={13} />
                <span>{customer.phone}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                <span>Joined {customer.registeredDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="flex items-center gap-6 sm:border-l sm:border-white/10 sm:pl-6 text-right">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Orders</span>
            <span className="text-xl font-black text-white">{customer.totalOrders}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Lifetime Spend</span>
            <span className="text-xl font-black text-purple-300">
              ₹{customer.totalSpending.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Orders & Entitlements (7 cols) + Notes & Tickets (5 cols) */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Product Entitlements */}
          <AdminCard
            title="Digital Product Entitlements"
            subtitle="Email-based access permissions assigned to this user"
            action={
              <Link
                href="/admin/access"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300"
              >
                Manage Access →
              </Link>
            }
          >
            {customerAccess.length > 0 ? (
              <div className="space-y-2">
                {customerAccess.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {acc.productName}
                      </span>
                      <span className="text-[10px] text-[#A7A3BC]">
                        Purchased {acc.purchaseDate} • {acc.downloadCount} of {acc.downloadLimit} downloads used
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        acc.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-pink-500/20 text-pink-300"
                      }`}
                    >
                      {acc.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 py-3">No active product entitlements found.</p>
            )}
          </AdminCard>

          {/* Purchase History */}
          <AdminCard title="Order History" subtitle="Transactions on record">
            {customerOrders.length > 0 ? (
              <div className="space-y-2">
                {customerOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <Link
                        href={`/admin/orders/${ord.id}`}
                        className="text-xs font-bold text-white hover:text-purple-300"
                      >
                        {ord.orderNumber}
                      </Link>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        {ord.orderDate.split("T")[0]} • {ord.paymentMethod}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-white block">
                        ₹{ord.totalAmount.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase ${
                          ord.paymentStatus === "paid" ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {ord.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 py-3">No orders placed yet.</p>
            )}
          </AdminCard>
        </div>

        {/* Right Column: Notes & Tickets (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Internal Notes */}
          <AdminCard title="Internal Admin Notes" subtitle="Private team notes for this customer">
            <form onSubmit={handleAddNote} className="space-y-3 mb-4">
              <textarea
                rows={2}
                placeholder="Add an internal observation or note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white"
              >
                Add Internal Note
              </button>
            </form>

            <div className="space-y-2">
              {customer.notes.length > 0 ? (
                customer.notes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-300">
                    {note}
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No notes recorded yet.</p>
              )}
            </div>
          </AdminCard>

          {/* Support Tickets */}
          <AdminCard title="Support History" subtitle="Inquiries logged by this customer">
            {customerTickets.length > 0 ? (
              <div className="space-y-2">
                {customerTickets.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="font-bold text-white block truncate">{t.subject}</span>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                      <span>{t.productName}</span>
                      <span className="text-purple-300 font-semibold uppercase">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No support tickets recorded.</p>
            )}
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
