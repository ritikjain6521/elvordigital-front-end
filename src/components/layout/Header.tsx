"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  BookOpen,
  Target,
  Layout,
  Cpu,
  ArrowRight
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/data/categories";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  Sparkles,
  Target,
  Layout,
  Cpu,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  }, [pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090816]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-950/20 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with custom abstract E icon for ElvoraDigital */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#EC4899] p-[1.5px] shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
              <div className="h-full w-full rounded-[10px] bg-[#090816] flex items-center justify-center">
                {/* Custom abstract E glyph */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-110 transition-transform duration-300"
                >
                  <path
                    d="M19 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H19"
                    stroke="url(#elvoraGradHeader)"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 12H15.5"
                    stroke="url(#elvoraGradHeader)"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  <circle cx="19" cy="5" r="1.5" fill="#EC4899" />
                  <circle cx="15.5" cy="12" r="1.5" fill="#A855F7" />
                  <circle cx="19" cy="19" r="1.5" fill="#22D3EE" />
                  <defs>
                    <linearGradient id="elvoraGradHeader" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#8B5CF6" />
                      <stop offset="0.5" stopColor="#A855F7" />
                      <stop offset="1" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Elvora<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Digital</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#A7A3BC] -mt-1 hidden sm:block">
                Digital Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/"
                  ? "text-white bg-white/10"
                  : "text-[#A7A3BC] hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            <Link
              href="/store"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/store"
                  ? "text-white bg-white/10"
                  : "text-[#A7A3BC] hover:text-white hover:bg-white/5"
              }`}
            >
              Store
            </Link>

            {/* Categories dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname.startsWith("/category")
                    ? "text-white bg-white/10"
                    : "text-[#A7A3BC] hover:text-white hover:bg-white/5"
                }`}
                aria-expanded={categoriesDropdownOpen}
              >
                <span>Categories</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    categoriesDropdownOpen ? "rotate-180 text-purple-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {categoriesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#111027]/95 border border-white/15 p-2 shadow-2xl backdrop-blur-2xl z-50"
                  >
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-purple-300">
                      Explore Categories
                    </div>
                    <div className="space-y-1">
                      {CATEGORIES.map((cat) => {
                        const IconComponent = iconMap[cat.iconName] || Sparkles;
                        return (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                            onClick={() => setCategoriesDropdownOpen(false)}
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-105 group-hover:bg-purple-500/20 transition-all">
                              <IconComponent size={16} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                                {cat.name}
                              </span>
                              <span className="text-[11px] text-[#A7A3BC] line-clamp-1">
                                {cat.shortName}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/best-sellers"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/best-sellers"
                  ? "text-white bg-white/10"
                  : "text-[#A7A3BC] hover:text-white hover:bg-white/5"
              }`}
            >
              Best Sellers
            </Link>

            <Link
              href="/free-resources"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === "/free-resources"
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-emerald-400/90 hover:text-emerald-300 hover:bg-white/5"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Free Resources
            </Link>
          </nav>

          {/* Right utility icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <Link
              href="/search"
              aria-label="Search digital products"
              className="p-2.5 rounded-xl text-[#A7A3BC] hover:text-white hover:bg-white/10 transition-colors"
            >
              <Search size={19} />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="View Wishlist"
              className="relative p-2.5 rounded-xl text-[#A7A3BC] hover:text-white hover:bg-white/10 transition-colors"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="View Shopping Cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white hover:border-purple-500/50 transition-all group"
            >
              <ShoppingBag size={18} className="text-purple-300 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[11px] font-bold text-white shadow-lg">
                {itemCount}
              </span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#0e0d22]/98 border-b border-white/10 backdrop-blur-2xl"
          >
            <div className="px-4 py-5 space-y-2">
              <Link
                href="/"
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/10"
              >
                Home
              </Link>
              <Link
                href="/store"
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/10"
              >
                All Products (Store)
              </Link>
              <Link
                href="/best-sellers"
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/10"
              >
                Best Sellers
              </Link>
              <Link
                href="/new-arrivals"
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/10"
              >
                New Arrivals
              </Link>
              <Link
                href="/free-resources"
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-emerald-400 hover:bg-emerald-500/10"
              >
                Free Resources
              </Link>

              <div className="pt-2 border-t border-white/10">
                <span className="block px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
                  Categories
                </span>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="flex items-center justify-between px-4 py-2 text-sm text-[#A7A3BC] hover:text-white"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight size={14} className="opacity-50" />
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
                <Link
                  href="/about"
                  className="px-4 py-2 text-xs text-[#A7A3BC] hover:text-white"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-xs text-[#A7A3BC] hover:text-white"
                >
                  Contact Desk
                </Link>
                <Link
                  href="/faq"
                  className="px-4 py-2 text-xs text-[#A7A3BC] hover:text-white"
                >
                  FAQ Support
                </Link>
                <Link
                  href="/wishlist"
                  className="px-4 py-2 text-xs text-[#A7A3BC] hover:text-white"
                >
                  Wishlist ({wishlistCount})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
