"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Download,
  KeyRound,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Globe,
  FolderLock,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { API_BASE } from "@/lib/api";

export default function MyLibraryPage() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [inputEmail, setInputEmail] = useState(emailFromUrl);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [searched, setSearched] = useState(!!emailFromUrl);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch if email comes from order-success redirect
  useEffect(() => {
    if (emailFromUrl) {
      fetchLibrary(emailFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailFromUrl]);

  const fetchLibrary = async (lookupEmail: string) => {
    if (!lookupEmail.trim()) return;
    setLoading(true);
    setError(null);
    setOrders([]);
    setSearched(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/orders/my?email=${encodeURIComponent(lookupEmail.trim())}`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(inputEmail);
    fetchLibrary(inputEmail);
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "My Library" }]} />

        {/* Header */}
        <div className="mt-4 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <BookOpen size={14} className="text-pink-400" />
            <span>CUSTOMER DIGITAL ASSET PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Purchased Library
          </h1>
          <p className="mt-2 text-sm text-[#A7A3BC]">
            Enter your purchase email to access your courses, downloads, and links.
          </p>
        </div>

        {/* Email Lookup Form */}
        <form
          onSubmit={handleSearch}
          className="p-5 rounded-2xl bg-[#17152E]/90 border border-purple-500/30 mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
        >
          <div className="flex-1 relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
            <input
              type="email"
              required
              placeholder="Enter your purchase email address"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-sm text-white placeholder-[#A7A3BC]/50 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <>
                <span>Access My Library</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Results */}
        {!loading && searched && orders.length === 0 && (
          <div className="py-20 text-center p-8 rounded-3xl bg-[#17152E]/50 border border-white/10">
            <BookOpen size={48} className="mx-auto text-purple-400/40 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">
              No purchases found
            </h3>
            <p className="text-xs text-[#A7A3BC] mb-6">
              No paid orders found for <strong className="text-white">{email}</strong>. Use the exact email you used at checkout.
            </p>
            <Link
              href="/store"
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
            >
              Explore Products
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-6">
            <p className="text-xs text-[#A7A3BC]">
              Showing <strong className="text-white">{orders.reduce((acc, o) => acc + (o.items?.length || 0), 0)} product(s)</strong> purchased by{" "}
              <strong className="text-purple-300">{email}</strong>
            </p>

            {orders.map((order: any) =>
              order.items?.map((item: any, idx: number) => {
                const googleDrive =
                  item.googleDriveLink?.trim() || null;
                const folderLink =
                  item.accessFolderLink?.trim() || null;
                const videoLink = item.videoLink?.trim() || null;
                const rawDownload = item.downloadFileUrl?.trim() || null;
                const backendBase = process.env.NEXT_PUBLIC_API_URL || "https://elvordigital-back-end.onrender.com";
                const downloadUrl = rawDownload
                  ? rawDownload.startsWith("http")
                    ? rawDownload
                    : `${backendBase.replace(/\/+$/, "")}/${rawDownload.replace(/^\/+/, "")}`
                  : null;

                return (
                  <div
                    key={`${order._id}-${idx}`}
                    className="p-6 rounded-3xl bg-[#17152E]/80 border border-white/10 hover:border-purple-500/30 transition-all shadow-xl"
                  >
                    {/* Product Header */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {item.productName}
                        </h3>
                        <p className="text-xs text-[#A7A3BC] mt-0.5">
                          Order #{order.orderNumber} •{" "}
                          {item.format || "Digital Product"} • ₹{item.price}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 self-start">
                        <CheckCircle2 size={12} />
                        Active
                      </span>
                    </div>

                    {/* Access Buttons — strictly from Digital Asset Vault */}
                    <div className="flex flex-wrap gap-3">
                      {googleDrive && (
                        <a
                          href={googleDrive}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02]"
                        >
                          <Globe size={15} />
                          <span>Open Google Drive Access</span>
                        </a>
                      )}

                      {folderLink && (
                        <a
                          href={folderLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
                        >
                          <FolderLock size={15} className="text-cyan-400" />
                          <span>Cloud Folder Access</span>
                        </a>
                      )}

                      {videoLink && (
                        <a
                          href={videoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 font-semibold text-xs border border-pink-500/30 transition-colors"
                        >
                          <Sparkles size={15} className="text-pink-400" />
                          <span>Watch Video Lessons</span>
                        </a>
                      )}

                      {downloadUrl && (
                        <a
                          href={downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
                        >
                          <Download size={15} className="text-emerald-400" />
                          <span>Download Master Files</span>
                        </a>
                      )}

                      {!googleDrive && !folderLink && !videoLink && !downloadUrl && (
                        <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                          <KeyRound size={13} />
                          <span>Deliverables will be sent to your email shortly.</span>
                        </div>
                      )}
                    </div>

                    {/* View Product Link */}
                    {item.slug && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <Link
                          href={`/product/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <ExternalLink size={12} />
                          View Product Details
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
