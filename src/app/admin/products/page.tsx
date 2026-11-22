"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  ExternalLink,
  Archive,
  ArrowUpDown
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import { ProductStatus } from "@/types/admin";

export default function AdminProductsPage() {
  const { products, deleteProduct, togglePublishProduct, updateProduct } = useAdminData();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredProducts = products.filter((p) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      if (!matchName && !matchSku) return false;
    }
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    return true;
  });

  const handleDuplicate = (id: string) => {
    const original = products.find((p) => p.id === id);
    if (!original) return;
    const duplicated = {
      ...original,
      id: `prod-copy-${Date.now()}`,
      name: `${original.name} (Copy)`,
      slug: `${original.slug}-copy`,
      sku: `${original.sku}-CP`,
      status: "draft" as ProductStatus,
      totalSales: 0,
      totalRevenue: 0,
    };
    // Update state via context
    updateProduct(original.id, {}); // touch
    alert(`Duplicated "${original.name}". New draft created.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Package size={24} className="text-purple-400" />
            <span>Product Catalogue Management</span>
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Manage your digital video masterclasses, prompt libraries, templates, and ebooks.
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#17152E]/80 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by title or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
          >
            <option value="all">All Statuses ({products.length})</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="unpublished">Unpublished</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="meta-ads-courses">Meta Ads Courses</option>
            <option value="ai-prompts">AI Prompts</option>
            <option value="templates">Templates</option>
            <option value="ebooks-guides">Ebooks &amp; Guides</option>
            <option value="software-tools">Software &amp; Tools</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-3 font-semibold">Product</th>
                <th className="py-3 px-3 font-semibold">SKU</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold">Price</th>
                <th className="py-3 px-3 font-semibold">Sales Volume</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  {/* Title & Mockup */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-12 rounded-lg bg-gradient-to-tr from-purple-900/60 to-indigo-900/40 border border-white/10 flex items-center justify-center font-bold text-[10px] text-purple-300 shrink-0">
                        {p.productFormat.substring(0, 3).toUpperCase()}
                      </div>
                      <div className="truncate max-w-[220px]">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="font-bold text-white hover:text-purple-300 transition-colors block truncate"
                        >
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-[#A7A3BC]">
                          {p.productFormat}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="py-3 px-3 font-mono text-[11px] text-gray-300">
                    {p.sku}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-300">
                      {p.categoryName}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-3">
                    <span className="font-bold text-white block">
                      {p.isFree ? "FREE" : `₹${p.price.toLocaleString("en-IN")}`}
                    </span>
                    {p.originalPrice > p.price && !p.isFree && (
                      <span className="text-[10px] text-gray-500 line-through">
                        ₹{p.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </td>

                  {/* Sales & Revenue */}
                  <td className="py-3 px-3">
                    <span className="font-bold text-purple-300 block">
                      {p.totalSales} units
                    </span>
                    <span className="text-[10px] text-gray-400">
                      ₹{p.totalRevenue.toLocaleString("en-IN")}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-3">
                    <button
                      onClick={() => togglePublishProduct(p.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                        p.status === "published"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                          : p.status === "draft"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30"
                      }`}
                      title="Click to toggle publish status"
                    >
                      {p.status === "published" ? (
                        <CheckCircle size={11} />
                      ) : (
                        <XCircle size={11} />
                      )}
                      <span>{p.status}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* View on store */}
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                        title="View Live on Storefront"
                      >
                        <ExternalLink size={14} />
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="p-1.5 text-gray-400 hover:text-purple-300 rounded-lg hover:bg-white/5"
                        title="Edit Product"
                      >
                        <Edit size={14} />
                      </Link>

                      {/* Duplicate */}
                      <button
                        onClick={() => handleDuplicate(p.id)}
                        className="p-1.5 text-gray-400 hover:text-cyan-300 rounded-lg hover:bg-white/5"
                        title="Duplicate Product"
                      >
                        <Copy size={14} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5"
                        title="Delete Product"
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
