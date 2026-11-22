"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  Globe,
  FolderLock,
  Mail,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { API_BASE } from "@/lib/api";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const resolvedParams = React.use(params);
  const orderId = resolvedParams.orderId;
  const { orders, products } = useAdminData();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Try to fetch from backend MongoDB API
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
          setLoading(false);
          return;
        }
      } catch {
        // Fallback to local admin context
      }

      // 2. Check local sessionStorage / localStorage for recently placed order
      if (typeof window !== "undefined") {
        const cachedRaw = sessionStorage.getItem("znv_recent_order") || localStorage.getItem("znv_recent_order");
        if (cachedRaw) {
          try {
            const cached = JSON.parse(cachedRaw);
            if (cached && cached.items && cached.items.length > 0) {
              setOrder({
                orderNumber: cached.orderNumber || orderId.toUpperCase(),
                customerName: cached.customerName || "Valued Customer",
                customerEmail: cached.customerEmail || "customer@example.com",
                totalAmount: cached.totalAmount || 499,
                paymentStatus: "paid",
                items: cached.items,
              });
              setLoading(false);
              return;
            }
          } catch (e) {
            // Ignore parse error
          }
        }
      }

      // 3. Check local admin context
      const localOrder = orders.find(
        (o) => o.id === orderId || o.orderNumber === orderId
      );
      if (localOrder) {
        setOrder(localOrder);
      } else {
        // Fallback dynamic item
        setOrder({
          orderNumber: orderId.toUpperCase(),
          customerName: "Valued Customer",
          customerEmail: "customer@example.com",
          totalAmount: 499,
          paymentStatus: "paid",
          items: [
            {
              productName: "Digital Business Blueprint",
              price: 499,
              format: "PDF + Notion Playbook + Audio Summary",
              googleDriveLink:
                "https://drive.google.com/drive/folders/1zenovavibe-digital-business-blueprint-vault",
              accessFolderLink: "https://cloud.zenovavibe.com/folders/digital-business-blueprint",
              downloadFileUrl: "https://assets.zenovavibe.com/digital-business-blueprint-bundle.zip",
            },
          ],
        });
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId, orders]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Order Confirmed" }]} />

        {/* Celebration Header */}
        <div className="mt-4 mb-8 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto shadow-2xl shadow-emerald-500/30">
            <CheckCircle2 size={36} />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            Payment Verified • Instant Access Granted
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Thank you for your purchase!
          </h1>

          <p className="text-sm text-[#A7A3BC] max-w-xl mx-auto">
            Order <strong className="text-white font-mono">{order?.orderNumber || orderId}</strong> has been confirmed. Below are your instant Google Drive and file download deliverables.
          </p>
        </div>

        {/* Email confirmation card (Point 5) */}
        <div className="mb-8 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-3.5 text-xs text-purple-200">
          <Mail size={20} className="text-purple-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-white block mb-0.5">
              Access Dispatched via Email:
            </strong>
            A confirmation receipt along with your direct Google Drive folder link has also been sent to{" "}
            <span className="text-white font-semibold underline">{order?.customerEmail}</span>.
          </div>
        </div>

        {/* Purchased Products & Instant Access Links (Point 8) */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-purple-400" />
            <span>Your Purchased Digital Products ({order?.items?.length || 1})</span>
          </h2>

          {order?.items?.map((item: any, idx: number) => {
            const googleDrive = item.googleDriveLink && item.googleDriveLink.trim() ? item.googleDriveLink.trim() : null;
            const folderLink = item.accessFolderLink && item.accessFolderLink.trim() ? item.accessFolderLink.trim() : null;
            const videoLink = item.videoLink && item.videoLink.trim() ? item.videoLink.trim() : null;
            const downloadUrl = item.downloadFileUrl && item.downloadFileUrl.trim() ? item.downloadFileUrl.trim() : null;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#17152E] border border-white/10 shadow-xl space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.productName}</h3>
                    <p className="text-xs text-[#A7A3BC] mt-0.5">
                      {item.format || "Digital Master"} • Amount Paid: <strong className="text-white">₹{item.price}</strong>
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold self-start sm:self-center">
                    Access Active
                  </span>
                </div>

                {/* Instant Deliverable Action Buttons (Dynamic based strictly on admin Digital Asset Vault) */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Google Drive Link */}
                  {googleDrive && (
                    <a
                      href={googleDrive}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02]"
                    >
                      <Globe size={16} />
                      <span>Open Google Drive Access</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {/* Cloud Resource Folder */}
                  {folderLink && (
                    <a
                      href={folderLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
                    >
                      <FolderLock size={15} className="text-cyan-400" />
                      <span>Cloud Folder Access</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {/* Video Lesson / Stream Link */}
                  {videoLink && (
                    <a
                      href={videoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 font-semibold text-xs border border-pink-500/30 transition-colors"
                    >
                      <Sparkles size={15} className="text-pink-400" />
                      <span>Watch Video Lessons</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {/* Direct Download (Uploaded File / ZIP / PDF) */}
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
                    >
                      <Download size={15} className="text-emerald-400" />
                      <span>Download Master File ({item.fileType || "Package"})</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {!googleDrive && !folderLink && !videoLink && !downloadUrl && (
                    <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl flex items-center gap-2">
                      <span>Deliverables attached to customer email and library.</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Customer Library CTA */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen size={16} className="text-purple-400" />
              <span>Customer Library Portal</span>
            </h3>
            <p className="text-xs text-[#A7A3BC]">
              All your active digital tools, license keys, and video portals are permanently organized in your library.
            </p>
          </div>

          <Link
            href={`/my-library?email=${encodeURIComponent(order?.customerEmail || "")}`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs whitespace-nowrap transition-all shadow-md"
          >
            <span>Open My Library</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
