"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";

export default function CreateLandingPage() {
  const router = useRouter();
  const { products, createLandingPage } = useAdminData();

  const [selectedProductId, setSelectedProductId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Auto-select first product once products finish loading from MongoDB
  useEffect(() => {
    if (!selectedProductId && products.length > 0) {
      const first = products[0];
      setSelectedProductId(first.id);
      if (!title) setTitle(`${first.name} Official Sales Page`);
      if (!slug) setSlug(first.slug);
    }
  }, [products, selectedProductId, title, slug]);

  const handleProductSelect = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = products.find((p) => p.id === prodId);
    if (prod) {
      setTitle(`${prod.name} Official Sales Page`);
      setSlug(prod.slug);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedProductId);
    if (!prod) {
      alert("Please select a product first.");
      return;
    }

    setIsCreating(true);
    try {
      const created = await createLandingPage({
        productId: prod.id,
        productSlug: prod.slug,
        productName: prod.name,
        title: title || `${prod.name} Sales Page`,
        slug: slug || prod.slug,
        status: "published",
        views: 0,
        conversions: 0,
        conversionRate: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
        sections: [
          {
            id: "sec-hero",
            type: "hero",
            title: "Product Hero Banner",
            subtitle: prod.tagline,
            enabled: true,
            content: {
              headline: prod.name,
              ctaText: `Get Instant Access – ₹${prod.price}`,
            },
          },
          {
            id: "sec-overview",
            type: "overview",
            title: "Product Deep Dive",
            enabled: true,
            content: { description: prod.fullDescription },
          },
          {
            id: "sec-features",
            type: "features",
            title: "Key Highlights",
            enabled: true,
            content: { features: prod.features },
          },
          {
            id: "sec-pricing",
            type: "pricing",
            title: "Pricing & Checkout",
            enabled: true,
            content: { price: prod.price },
          },
          {
            id: "sec-faqs",
            type: "faqs",
            title: "FAQ Support",
            enabled: true,
            content: { faqs: prod.faqs },
          },
        ],
      });

      if (created) {
        router.push(`/admin/landing-pages/${created.id}/edit`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/landing-pages"
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to Landing Pages</span>
      </Link>

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black text-white">Create New Landing Page</h1>
        <p className="text-xs text-[#A7A3BC] mt-0.5">
          Select an existing digital product to bootstrap a high-converting modular sales page.
        </p>
      </div>

      <form onSubmit={handleCreate}>
        <AdminCard title="Associate Product">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                Target Product
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => handleProductSelect(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
              >
                {products.length === 0 && (
                  <option value="">Loading products...</option>
                )}
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (SKU: {p.sku})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                Landing Page Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Meta Ads Mastery 2026 – Official Sales Page"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                URL Path
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-white/5 border border-r-0 border-white/10 rounded-l-xl text-xs text-gray-400 font-mono">
                  /lp/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-r-xl bg-[#0e0d22] border border-white/10 text-xs text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreating || !selectedProductId}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles size={15} />
              <span>{isCreating ? "Creating Landing Page..." : "Initialize Modular Builder"}</span>
            </button>
          </div>
        </AdminCard>
      </form>
    </div>
  );
}
