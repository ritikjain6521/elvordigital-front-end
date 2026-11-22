"use client";

import React, { useState } from "react";
import {
  Tag,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Calendar,
  Percent,
  IndianRupee,
  RotateCcw
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import Modal from "@/components/admin/ui/Modal";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useAdminData();

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    minOrderAmount: 299,
    maxDiscount: 500,
    usageLimit: 500,
    status: "active" as "active" | "inactive",
    expiryDate: "2026-12-31",
  });

  const filteredCoupons = coupons.filter((c) => {
    if (searchTerm.trim()) {
      return c.code.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) {
      alert("Please enter a coupon code");
      return;
    }

    addCoupon({
      code: form.code.toUpperCase().trim(),
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      minOrderAmount: Number(form.minOrderAmount),
      maxDiscount: Number(form.maxDiscount),
      usageLimit: Number(form.usageLimit),
      status: form.status,
      expiryDate: form.expiryDate,
    });

    alert(`Coupon "${form.code.toUpperCase()}" is now active and usable in the store!`);
    setModalOpen(false);
    setForm({
      code: "",
      discountType: "percentage",
      discountValue: 15,
      minOrderAmount: 399,
      maxDiscount: 500,
      usageLimit: 300,
      status: "active",
      expiryDate: "2026-12-31",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Tag size={24} className="text-purple-400" />
            <span>Coupons &amp; Promotional Discounts</span>
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Configure promotional percentage and flat discount codes for checkout.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-3 font-semibold">Coupon Code</th>
                <th className="py-3 px-3 font-semibold">Discount</th>
                <th className="py-3 px-3 font-semibold">Min. Order</th>
                <th className="py-3 px-3 font-semibold">Redemptions</th>
                <th className="py-3 px-3 font-semibold">Expiry Date</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCoupons.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-purple-300 px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-500/30 text-xs">
                      {c.code}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    ₹{c.minOrderAmount}
                  </td>
                  <td className="py-3 px-3 font-semibold text-white">
                    {c.usageCount} <span className="text-gray-500 font-normal">/ {c.usageLimit}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-400 font-mono text-[11px]">
                    {c.expiryDate}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggleCoupon(c.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        c.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {c.status}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete coupon "${c.code}"?`)) {
                          deleteCoupon(c.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* CREATE COUPON MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Promotional Coupon Code"
        subtitle="Codes immediately integrate into the store cart validation."
      >
        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
              Coupon Code *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. FLASH30"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white font-mono uppercase"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                Discount Type
              </label>
              <select
                value={form.discountType}
                onChange={(e) => setForm({ ...form, discountType: e.target.value as "percentage" | "fixed" })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
              >
                <option value="percentage">Percentage Discount (%)</option>
                <option value="fixed">Fixed Amount (₹ INR)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                Discount Value *
              </label>
              <input
                type="number"
                required
                min="1"
                value={form.discountValue}
                onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                Min. Order Amount (₹)
              </label>
              <input
                type="number"
                min="0"
                value={form.minOrderAmount}
                onChange={(e) => setForm({ ...form, minOrderAmount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                Usage Limit Count
              </label>
              <input
                type="number"
                min="1"
                value={form.usageLimit}
                onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg"
            >
              Create &amp; Activate
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
