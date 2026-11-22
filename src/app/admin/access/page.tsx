"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Mail,
  ShieldCheck,
  Send,
  Eye,
  AlertTriangle,
  Download
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import Modal from "@/components/admin/ui/Modal";
import { AccessStatus, AccessType } from "@/types/admin";

export default function EmailAccessManagementPage() {
  const {
    accessRecords,
    products,
    grantAccess,
    revokeAccess,
    restoreAccess,
    extendAccess
  } = useAdminData();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [grantModalOpen, setGrantModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // Grant Form State
  const [grantForm, setGrantForm] = useState({
    customerEmail: "",
    customerName: "",
    productId: products[0]?.id || "",
    accessType: "purchase" as AccessType,
    expiryDate: "Lifetime",
    downloadLimit: 25,
    adminNote: "",
  });

  const filteredRecords = accessRecords.filter((a) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchEmail = a.customerEmail.toLowerCase().includes(q);
      const matchName = a.customerName.toLowerCase().includes(q);
      const matchProd = a.productName.toLowerCase().includes(q);
      if (!matchEmail && !matchName && !matchProd) return false;
    }
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    return true;
  });

  const handleGrantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantForm.customerEmail || !grantForm.customerName) {
      alert("Please fill in customer email and name");
      return;
    }

    const prod = products.find((p) => p.id === grantForm.productId);
    if (!prod) return;

    grantAccess({
      customerEmail: grantForm.customerEmail,
      customerName: grantForm.customerName,
      productId: prod.id,
      productName: prod.name,
      orderId: `MANUAL-${Date.now().toString().slice(-4)}`,
      status: "active",
      expiryDate: grantForm.expiryDate,
      downloadLimit: Number(grantForm.downloadLimit),
      accessType: grantForm.accessType,
      adminNote: grantForm.adminNote,
    });

    alert(`Product access to "${prod.name}" successfully granted to ${grantForm.customerEmail}!`);
    setGrantModalOpen(false);
    setGrantForm({
      customerEmail: "",
      customerName: "",
      productId: products[0]?.id || "",
      accessType: "complimentary",
      expiryDate: "Lifetime",
      downloadLimit: 25,
      adminNote: "",
    });
  };

  const handleResendInvitation = (record: typeof accessRecords[0]) => {
    alert(`Access invitation & download credentials simulated to: ${record.customerEmail} for "${record.productName}".`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <KeyRound size={24} className="text-purple-400" />
            <span>Digital Product Entitlements &amp; Email Access</span>
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Cryptographic access rights, verified purchaser entitlements, and protected download permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-library"
            target="_blank"
            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-purple-300 hover:text-white"
          >
            Open &quot;My Library&quot; Demo →
          </Link>

          <button
            onClick={() => setGrantModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            <Plus size={16} />
            <span>Grant Manual Access</span>
          </button>
        </div>
      </div>

      {/* Security Architecture Notice */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3.5 text-xs text-indigo-200">
        <ShieldCheck size={20} className="text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-white block mb-0.5">
            Production Security Integration Architecture:
          </strong>
          In a production backend, this entitlement ledger will be guarded by HMAC token verification, expiring pre-signed S3/Cloudflare URLs, and server-side payment verification hooks.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#17152E]/80 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by customer email, name, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
          >
            <option value="all">All Access Statuses ({accessRecords.length})</option>
            <option value="active">Active Only</option>
            <option value="pending">Pending Verification</option>
            <option value="expired">Expired</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-3 font-semibold">Customer Entitlement</th>
                <th className="py-3 px-3 font-semibold">Product Name</th>
                <th className="py-3 px-3 font-semibold">Order / Source</th>
                <th className="py-3 px-3 font-semibold">Access Type</th>
                <th className="py-3 px-3 font-semibold">Downloads</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRecords.map((acc) => (
                <tr key={acc.id} className="hover:bg-white/[0.02]">
                  {/* Customer Email & Name */}
                  <td className="py-3 px-3">
                    <span className="font-bold text-white block">
                      {acc.customerName}
                    </span>
                    <span className="text-[11px] text-purple-300 font-mono">
                      {acc.customerEmail}
                    </span>
                  </td>

                  {/* Product */}
                  <td className="py-3 px-3">
                    <span className="font-medium text-gray-200 block truncate max-w-[200px]">
                      {acc.productName}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Granted on {acc.purchaseDate}
                    </span>
                  </td>

                  {/* Order ID */}
                  <td className="py-3 px-3 font-mono text-[11px] text-gray-400">
                    {acc.orderId}
                  </td>

                  {/* Access Type */}
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-300 uppercase font-semibold">
                      {acc.accessType}
                    </span>
                  </td>

                  {/* Download count vs limit */}
                  <td className="py-3 px-3 font-bold text-white">
                    <span className="text-purple-300">{acc.downloadCount}</span>
                    <span className="text-gray-500 font-normal"> / {acc.downloadLimit}</span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        acc.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : acc.status === "revoked"
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {acc.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Resend email */}
                      <button
                        onClick={() => handleResendInvitation(acc)}
                        className="p-1.5 text-gray-400 hover:text-purple-300 rounded-lg hover:bg-white/5"
                        title="Resend Access Invitation Email"
                      >
                        <Send size={13} />
                      </button>

                      {/* Revoke / Restore */}
                      {acc.status === "active" ? (
                        <button
                          onClick={() => {
                            if (window.confirm(`Revoke access for ${acc.customerEmail}?`)) {
                              revokeAccess(acc.id);
                            }
                          }}
                          className="px-2 py-1 rounded-lg bg-red-500/10 text-red-300 hover:bg-red-500/20 text-[10px] font-bold"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => restoreAccess(acc.id)}
                          className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-[10px] font-bold"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* GRANT ACCESS MODAL */}
      <Modal
        isOpen={grantModalOpen}
        onClose={() => setGrantModalOpen(false)}
        title="Grant Digital Product Access"
        subtitle="Provision email-based product entitlement directly to a customer."
      >
        <form onSubmit={handleGrantSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
              Customer Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. founder@agency.com"
              value={grantForm.customerEmail}
              onChange={(e) => setGrantForm({ ...grantForm, customerEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
              Customer Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Malhotra"
              value={grantForm.customerName}
              onChange={(e) => setGrantForm({ ...grantForm, customerName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
              Select Digital Product
            </label>
            <select
              value={grantForm.productId}
              onChange={(e) => setGrantForm({ ...grantForm, productId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (₹{p.price})
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                Access Type
              </label>
              <select
                value={grantForm.accessType}
                onChange={(e) => setGrantForm({ ...grantForm, accessType: e.target.value as AccessType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
              >
                <option value="complimentary">Complimentary Review Access</option>
                <option value="purchase">Purchase-Based Access</option>
                <option value="promotional">Promotional Trial</option>
                <option value="subscription">Subscription Entitlement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                Download Limit
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={grantForm.downloadLimit}
                onChange={(e) => setGrantForm({ ...grantForm, downloadLimit: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
              Internal Admin Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Free access granted for podcast review"
              value={grantForm.adminNote}
              onChange={(e) => setGrantForm({ ...grantForm, adminNote: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setGrantModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-600/30"
            >
              Confirm &amp; Provision Access
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
