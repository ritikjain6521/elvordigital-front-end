"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, Download, Clock, Mail, CheckCircle2 } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#070612] text-white overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 blur-3xl pointer-events-none" />

      {/* Trust reassurance strip above footer links */}
      <div className="border-b border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Download size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Instant Access</h4>
                <p className="text-xs text-[#A7A3BC]">Download digital assets immediately</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Curated Quality</h4>
                <p className="text-xs text-[#A7A3BC]">Tested tools & actionable playbooks</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Continuous Access</h4>
                <p className="text-xs text-[#A7A3BC]">Revisit files & updates anytime</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Dedicated Support</h4>
                <p className="text-xs text-[#A7A3BC]">Prompt help from our digital desk</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] p-[1px]">
                <div className="h-full w-full rounded-[11px] bg-[#090816] flex items-center justify-center font-black text-purple-300 text-sm">
                  Z
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Zenova<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vibe</span>
              </span>
            </Link>

            <p className="text-sm text-[#A7A3BC] leading-relaxed max-w-sm">
              Discover. Download. Create. Grow. ZenovaVibe is a premium marketplace for ambitious founders, creators, and marketers seeking world-class digital assets and knowledge.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">
                Join our Creator Dispatch
              </h4>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                  <CheckCircle2 size={16} />
                  <span>Thank you! You are subscribed to new drop alerts.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#17152E] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-xs text-[#A7A3BC] hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/store" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/free-resources" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  Free Resources
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  Search Catalogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Support & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  About ZenovaVibe
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  Marketplace FAQ
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-xs text-[#A7A3BC] hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7A3BC]">
          <p>© 2026 ZenovaVibe. All Rights Reserved. Crafted for digital creators worldwide.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Refund Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
