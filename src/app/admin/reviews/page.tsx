"use client";

import React, { useState } from "react";
import {
  Star,
  Check,
  X,
  Search,
  Filter,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { AdminCard } from "@/components/admin/ui/AdminCard";

export default function ReviewsPage() {
  const { reviews, updateReviewStatus, toggleFeaturedReview, deleteReview } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Reviews & Social Proof Moderation
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Moderate customer feedback, approve genuine reviews, and curate featured testimonials for product pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs font-semibold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Store Rating: {averageRating} / 5.0</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
            <input
              type="text"
              placeholder="Search reviews, products, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-[#A7A3BC] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#A7A3BC]" />
            {(["all", "approved", "pending", "rejected"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  statusFilter === status
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-white/5 text-[#A7A3BC] hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </AdminCard>

      {/* Reviews Table */}
      <AdminCard
        title="Customer Feedback Ledger"
        subtitle={`Showing ${filteredReviews.length} of ${reviews.length} total customer reviews`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A7A3BC]">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-[#A7A3BC]">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Customer</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Feedback & Review</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-[#A7A3BC]">
                    No reviews matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((r) => (
                  <tr key={r.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{r.customerName}</p>
                      <p className="text-xs text-[#A7A3BC]">{r.customerEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-white max-w-[180px] truncate">
                      {r.productName}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < r.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-sm">
                      <p className="text-xs text-white/90 line-clamp-2 italic">
                        &quot;{r.comment}&quot;
                      </p>
                      <span className="text-[10px] text-[#A7A3BC] mt-0.5 block">{r.createdAt}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          r.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : r.status === "pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleFeaturedReview(r.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          r.isFeatured
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm"
                            : "bg-white/5 text-[#A7A3BC] hover:text-white"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {r.isFeatured ? "Featured" : "Regular"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {r.status !== "approved" && (
                          <button
                            onClick={() => updateReviewStatus(r.id, "approved")}
                            className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg transition-colors"
                            title="Approve Review"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {r.status !== "rejected" && (
                          <button
                            onClick={() => updateReviewStatus(r.id, "rejected")}
                            className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors"
                            title="Reject Review"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete review by ${r.customerName}?`)) {
                              deleteReview(r.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
