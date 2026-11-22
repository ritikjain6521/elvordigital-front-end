"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  RotateCcw
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Product, ProductCategory } from "@/types";
import { CATEGORIES } from "@/data/categories";

interface StoreViewProps {
  initialProducts: Product[];
  title?: string;
  subtitle?: string;
  lockedCategory?: ProductCategory;
  lockedTitle?: string;
}

type SortOption = "featured" | "popular" | "newest" | "price-asc" | "price-desc";

export default function StoreView({
  initialProducts,
  title = "Explore the Digital Universe.",
  subtitle = "Find the tools, knowledge, and creative resources to bring your next big idea to life.",
  lockedCategory,
}: StoreViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    lockedCategory || "all"
  );
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Active filters calculation
  const hasActiveFilters =
    searchTerm !== "" ||
    (selectedCategory !== "all" && !lockedCategory) ||
    maxPrice < 4000 ||
    minRating > 0;

  const handleResetFilters = () => {
    setSearchTerm("");
    if (!lockedCategory) setSelectedCategory("all");
    setMaxPrice(4000);
    setMinRating(0);
    setSortBy("featured");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Search
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchDesc = p.shortDescription.toLowerCase().includes(query);
          const matchCat = p.categoryName.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        // Category
        if (lockedCategory) {
          if (p.category !== lockedCategory) return false;
        } else if (selectedCategory !== "all") {
          if (p.category !== selectedCategory) return false;
        }

        // Price
        if (p.price > maxPrice) return false;

        // Rating
        if (minRating > 0 && p.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "popular") return b.reviewsCount - a.reviewsCount;
        if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // Default "featured"
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    initialProducts,
    searchTerm,
    selectedCategory,
    lockedCategory,
    maxPrice,
    minRating,
    sortBy,
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Store", href: "/store" },
            ...(lockedCategory
              ? [
                  {
                    label:
                      CATEGORIES.find((c) => c.id === lockedCategory)?.name ||
                      "Category",
                  },
                ]
              : []),
          ]}
        />

        {/* Page Title */}
        <div className="mt-4 mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#A7A3BC] max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Search & Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#17152E]/70 border border-white/10 mb-8 backdrop-blur-md">
          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts, courses, templates, ebooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 justify-between sm:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold"
            >
              <Filter size={15} />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A7A3BC] hidden md:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none pl-3 pr-8 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs font-medium text-white focus:outline-none focus:border-purple-400 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-6 text-xs">
            <span className="text-gray-400">Active Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                &ldquo;{searchTerm}&rdquo;
                <button onClick={() => setSearchTerm("")}>
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCategory !== "all" && !lockedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Category: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("all")}>
                  <X size={12} />
                </button>
              </span>
            )}
            {maxPrice < 4000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Under ₹{maxPrice}
                <button onClick={() => setMaxPrice(4000)}>
                  <X size={12} />
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {minRating}+ Stars
                <button onClick={() => setMinRating(0)}>
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 ml-2"
            >
              <RotateCcw size={12} />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar (desktop) + Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl bg-[#17152E]/60 border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <SlidersHorizontal size={16} className="text-purple-400" />
                  <span>Refine Catalog</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-[#A7A3BC] hover:text-white"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Categories Filter */}
              {!lockedCategory && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedCategory === "all"
                          ? "bg-purple-600 text-white"
                          : "text-[#A7A3BC] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      All Categories ({initialProducts.length})
                    </button>
                    {CATEGORIES.map((cat) => {
                      const count = initialProducts.filter(
                        (p) => p.category === cat.id
                      ).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-purple-600 text-white"
                              : "text-[#A7A3BC] hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className="text-[10px] opacity-70">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Max Price
                  </h4>
                  <span className="text-xs font-black text-white">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>₹0 (Free)</span>
                  <span>₹4,000</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">
                  Minimum Rating
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[0, 4.7, 4.8, 4.9].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        minRating === rating
                          ? "bg-purple-600 text-white"
                          : "bg-[#0e0d22] text-[#A7A3BC] hover:text-white"
                      }`}
                    >
                      {rating === 0 ? "All Ratings" : `${rating}+ ★`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (3 cols desktop, 4 cols large) */}
          <main className="lg:col-span-3">
            {/* Results count header */}
            <div className="flex items-center justify-between mb-6 text-xs text-[#A7A3BC]">
              <span>
                Showing <strong className="text-white">{displayedProducts.length}</strong> of{" "}
                <strong className="text-white">{filteredProducts.length}</strong> products
              </span>
            </div>

            {/* Product Cards Grid */}
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="text-center py-20 p-8 rounded-3xl bg-[#17152E]/50 border border-white/10">
                <Sparkles size={36} className="mx-auto text-purple-400/60 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No matching digital products found</h3>
                <p className="text-xs text-[#A7A3BC] max-w-sm mx-auto mb-6">
                  Try adjusting your search terms, removing price thresholds, or resetting category filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 text-white font-semibold text-xs transition-all"
                >
                  Load More Products ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="ml-auto w-full max-w-xs h-full bg-[#111027] p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-sm font-bold text-white">Filter Products</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              {!lockedCategory && (
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase text-purple-300 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs ${
                        selectedCategory === "all"
                          ? "bg-purple-600 text-white"
                          : "text-[#A7A3BC]"
                      }`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs ${
                          selectedCategory === cat.id
                            ? "bg-purple-600 text-white"
                            : "text-[#A7A3BC]"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex justify-between text-xs mb-2 text-white">
                  <span>Max Price</span>
                  <span>₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
