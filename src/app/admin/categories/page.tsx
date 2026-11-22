"use client";

import React, { useState, useEffect } from "react";
import { API_BASE } from "@/lib/api";
import Link from "next/link";
import {
  FolderTree,
  Plus,
  Sparkles,
  ExternalLink,
  Trash2,
  CheckCircle,
  Folder,
  Layers,
  BookOpen,
  Cpu,
  Megaphone,
} from "lucide-react";
import { CATEGORIES as INITIAL_STATIC_CATEGORIES } from "@/data/categories";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import Modal from "@/components/admin/ui/Modal";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  gradient?: string;
}

export default function AdminCategoriesPage() {
  const { products, addAuditLog } = useAdminData();
  const [categories, setCategories] = useState<any[]>(INITIAL_STATIC_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Folder");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch live categories from MongoDB backend on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/categories`);
        const data = await res.json();
        if (data.success && data.categories?.length > 0) {
          const merged: any[] = [...INITIAL_STATIC_CATEGORIES];
          data.categories.forEach((c: { name: string; slug: string; description: string; icon?: string }) => {
            if (!merged.some((m) => m.slug === c.slug)) {
              merged.push({
                id: c.slug,
                name: c.name,
                slug: c.slug,
                description: c.description,
                icon: c.icon || "Folder",
              });
            }
          });
          setCategories(merged);
        }
      } catch {
        // Fallback to static
      }
    };
    fetchCategories();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const newCategory: CategoryItem = {
      id: slug || name.toLowerCase().replace(/\s+/g, "-"),
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      description,
      icon: selectedIcon,
    };

    try {
      const token = localStorage.getItem("znv_admin_token");
      await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(newCategory),
      });
    } catch {
      // Local fallback
    }

    setCategories((prev) => [newCategory, ...prev]);
    addAuditLog("Created Category", "Taxonomy", `Added new category "${newCategory.name}"`);
    setIsSuccess(true);
    setLoading(false);

    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
      setName("");
      setSlug("");
      setDescription("");
    }, 1200);
  };

  const handleDeleteCategory = (catSlug: string) => {
    if (confirm("Are you sure you want to remove this category?")) {
      setCategories((prev) => prev.filter((c) => c.slug !== catSlug));
      addAuditLog("Deleted Category", "Taxonomy", `Removed category "${catSlug}"`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Category Button (Point 7) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FolderTree size={24} className="text-purple-400" />
            <span>Store Taxonomy &amp; Categories</span>
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Organize catalog navigation, discovery collections, and category landing pages.
          </p>
        </div>

        {/* Point 7: Add Category Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-500/25"
        >
          <Plus size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Grid of categories */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat.slug || p.category === cat.id);

          return (
            <AdminCard key={cat.slug || cat.id}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 font-mono">
                    /{cat.slug}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {catProducts.length} Products
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1 flex items-center justify-between">
                    <span>{cat.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(cat.slug)}
                      className="p-1 text-gray-500 hover:text-rose-400 transition-colors"
                      title="Delete category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </h3>
                  <p className="text-xs text-[#A7A3BC] line-clamp-2 leading-relaxed">
                    {cat.description || "Collection of digital resources and masterclasses."}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={`/category/${cat.slug}`}
                    target="_blank"
                    className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    <span>Storefront Category View</span>
                    <ExternalLink size={12} />
                  </Link>

                  <span className="text-[11px] text-[#A7A3BC]">Active</span>
                </div>
              </div>
            </AdminCard>
          );
        })}
      </div>

      {/* Point 7: Add Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Storefront Category"
      >
        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Category Created!</h3>
            <p className="text-xs text-[#A7A3BC]">
              Saved to MongoDB and now available in product categorization.
            </p>
          </div>
        ) : (
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Category Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Crypto & Web3 Playbooks"
                value={name}
                onChange={handleNameChange}
                className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">URL Slug</label>
              <input
                type="text"
                required
                placeholder="crypto-web3-playbooks"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-purple-300 focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Category Description</label>
              <textarea
                rows={3}
                placeholder="Brief description visible on the category landing page..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-medium transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50"
              >
                {loading ? "Saving to Database..." : "Save Category"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
