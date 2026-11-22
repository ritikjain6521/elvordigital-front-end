"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Search,
  Eye,
  Edit,
  ExternalLink,
  Plus,
  ArrowUpRight,
  Sparkles,
  BarChart2
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";

export default function AdminLandingPagesList() {
  const { landingPages } = useAdminData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLps = landingPages.filter((lp) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        lp.title.toLowerCase().includes(q) ||
        lp.productName.toLowerCase().includes(q) ||
        lp.slug.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Layers size={24} className="text-purple-400" />
            <span>Product Landing Page Builder</span>
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Design high-converting, section-based sales pages for your digital catalog.
          </p>
        </div>

        <Link
          href="/admin/landing-pages/create"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Landing Page</span>
        </Link>
      </div>

      {/* Filter / Search */}
      <div className="p-4 rounded-2xl bg-[#17152E]/80 border border-white/10 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search landing pages by product or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
          />
        </div>
        <span className="text-xs text-[#A7A3BC]">
          {filteredLps.length} Pages Configured
        </span>
      </div>

      {/* Table */}
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-3 font-semibold">Page Title</th>
                <th className="py-3 px-3 font-semibold">Associated Product</th>
                <th className="py-3 px-3 font-semibold">Live Route</th>
                <th className="py-3 px-3 font-semibold">Views</th>
                <th className="py-3 px-3 font-semibold">CVR</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLps.map((lp) => (
                <tr key={lp.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-bold text-white">
                    <Link
                      href={`/admin/landing-pages/${lp.id}/edit`}
                      className="hover:text-purple-300 transition-colors"
                    >
                      {lp.title}
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-purple-300 font-medium">
                    {lp.productName}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-gray-400">
                    /product/{lp.slug}
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    {lp.views.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                      <BarChart2 size={12} />
                      <span>{lp.conversionRate}%</span>
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {lp.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/product/${lp.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                        title="View Live Storefront Page"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/admin/landing-pages/${lp.id}/edit`}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold"
                        title="Open Visual Builder"
                      >
                        <Edit size={13} />
                        <span>Visual Builder</span>
                      </Link>
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
