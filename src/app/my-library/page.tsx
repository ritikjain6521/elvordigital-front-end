"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Download,
  KeyRound,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Play,
  FileText,
  UserCheck
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function MyLibraryPage() {
  const { accessRecords, products, licenses } = useAdminData();

  // Selected customer for demo simulation
  const [selectedEmail, setSelectedEmail] = useState("aarav.sharma@gmail.com");

  // Get active entitlements for this email
  const userAccess = accessRecords.filter(
    (a) => a.customerEmail === selectedEmail && a.status === "active"
  );

  const userLicenses = licenses.filter((l) => l.customerEmail === selectedEmail);

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Customer My Library" }]} />

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
            Access your course portals, download master files, and view license tokens.
          </p>
        </div>

        {/* Demo Email Switcher Bar */}
        <div className="p-4 rounded-2xl bg-[#17152E]/90 border border-purple-500/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <UserCheck size={18} className="text-purple-400" />
            <div>
              <span className="text-xs font-bold text-white block">
                Simulated Customer Sign-In
              </span>
              <span className="text-[11px] text-[#A7A3BC]">
                Switch email address to test different entitlement libraries:
              </span>
            </div>
          </div>

          <select
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-purple-400 cursor-pointer"
          >
            <option value="aarav.sharma@gmail.com">Aarav Sharma (3 Products)</option>
            <option value="priya.nair@contentforge.co">Priya Nair (AI Prompts)</option>
            <option value="rohan.design@gmail.com">Rohan Verma (Canva Kit)</option>
            <option value="partner@techcreators.com">Kunal Shah (Complimentary)</option>
          </select>
        </div>

        {/* Protected Entitlements Grid */}
        {userAccess.length > 0 ? (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {userAccess.map((acc) => {
                const prod = products.find((p) => p.id === acc.productId);

                return (
                  <div
                    key={acc.id}
                    className="p-6 rounded-3xl bg-[#17152E]/80 border border-white/10 flex flex-col justify-between hover:border-purple-500/30 transition-all shadow-xl"
                  >
                    <div>
                      {/* Product Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase">
                          {acc.accessType} Entitlement
                        </span>
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={13} />
                          <span>Active Access</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1">
                        {acc.productName}
                      </h3>
                      <p className="text-xs text-[#A7A3BC] mb-4">
                        Order #{acc.orderId} • Purchased on {acc.purchaseDate}
                      </p>

                      {/* Download limits info */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs mb-6">
                        <div className="flex justify-between text-gray-300">
                          <span>Downloads Remaining:</span>
                          <span className="font-bold text-white">
                            {acc.downloadLimit - acc.downloadCount} of {acc.downloadLimit}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-400 text-[11px]">
                          <span>Access Term:</span>
                          <span className="text-purple-300 font-medium">{acc.expiryDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() =>
                          alert(`Simulating secure download for "${acc.productName}". In production, a 15-minute expiring signed URL would be generated.`)
                        }
                        className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                      >
                        <Download size={14} />
                        <span>Download Master Package</span>
                      </button>

                      {prod && (
                        <Link
                          href={`/product/${prod.slug}`}
                          className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink size={13} />
                          <span>View Product Overview</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Software Licenses if any */}
            {userLicenses.length > 0 && (
              <div className="p-6 rounded-3xl bg-[#17152E]/60 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound size={16} className="text-purple-400" />
                  <span>Software License Tokens</span>
                </h3>
                <div className="space-y-2">
                  {userLicenses.map((lic) => (
                    <div
                      key={lic.id}
                      className="p-3.5 rounded-xl bg-[#0e0d22] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">{lic.productName}</span>
                        <span className="text-gray-400 text-[11px]">
                          Activations: {lic.devicesUsed} of {lic.deviceLimit} devices
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-500/30 font-mono text-purple-300 text-xs select-all">
                          {lic.licenseKey}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center p-8 rounded-3xl bg-[#17152E]/50 border border-white/10">
            <BookOpen size={48} className="mx-auto text-purple-400/40 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">No active products for this email</h3>
            <p className="text-xs text-[#A7A3BC] mb-6">
              Switch customer emails above to preview purchased entitlements, or explore our store.
            </p>
            <Link
              href="/store"
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
