"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { handlePurchase, scrollToSection } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setMobileOpen(false);
      scrollToSection(href);
    },
    []
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080B18]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-purple-500/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => navigate("#home")}
          className="flex items-center gap-2 group"
          aria-label="Go to home"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/25">
            <div className="h-full w-full rounded-[6px] bg-[#090816] flex items-center justify-center overflow-hidden">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H19"
                  stroke="url(#navElvGrad)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12H15.5"
                  stroke="url(#navElvGrad)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <circle cx="19" cy="5" r="1.5" fill="#EC4899" />
                <circle cx="15.5" cy="12" r="1.5" fill="#A855F7" />
                <circle cx="19" cy="19" r="1.5" fill="#22D3EE" />
                <defs>
                  <linearGradient id="navElvGrad" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.5" stopColor="#A855F7" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-400/20 to-cyan-300/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Elvor<span className="text-[#8B5CF6]">Digital</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
            Login
          </button>
          <button
            onClick={() => {
              scrollToSection("#pricing");
            }}
            className="group relative px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Buy Now {BRAND.currency}{BRAND.price}</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#0a0f1f]/98 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(link.href)}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-3 space-y-2 border-t border-white/5">
                <button className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white">
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    scrollToSection("#pricing");
                  }}
                  className="block w-full px-4 py-3 text-center font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-purple-500"
                >
                  Buy Now {BRAND.currency}{BRAND.price}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
