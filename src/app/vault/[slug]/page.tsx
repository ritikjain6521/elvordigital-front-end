"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderLock,
  Download,
  ExternalLink,
  CheckCircle2,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  Layers,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Globe,
  Gift,
  HelpCircle
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { API_BASE } from "@/lib/api";

export default function CloudVaultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "playbook" | "swipefiles" | "bonuses">("overview");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          // Fallback title formatting
          const name = slug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          setProduct({
            name,
            slug,
            productFormat: "Interactive Digital Masterclass & Resource Vault",
            fileSize: "Complete Archive",
            features: [
              "Step-by-step tactical implementation guides",
              "100+ proven high-converting swipe files and frameworks",
              "Interactive Notion operating system and spreadsheets",
              "Lifetime updates and verified customer licensing",
            ],
            bonuses: [
              { title: "VIP Action Checklist", value: "₹999", description: "Quick sprint implementation checklist" },
              { title: "Client Acquisition Swipe File", value: "₹1,499", description: "Cold outreach and pitch scripts" }
            ]
          });
        }
      })
      .catch(() => {
        const name = slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        setProduct({
          name,
          slug,
          productFormat: "Interactive Digital Masterclass & Resource Vault",
          fileSize: "Complete Archive",
          features: [
            "Step-by-step tactical implementation guides",
            "100+ proven high-converting swipe files and frameworks",
            "Interactive Notion operating system and spreadsheets",
          ],
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopy = (text: string, index: number) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const downloadApiUrl = `${API_BASE}/api/download/${slug}`;
  const driveUrl = product?.googleDriveLink && !product.googleDriveLink.includes("1zenovavibe")
    ? product.googleDriveLink
    : `https://drive.google.com/drive/u/0/my-drive`;

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Store", href: "/store" },
            { label: product.name, href: `/product/${slug}` },
            { label: "Cloud Resource Vault" },
          ]}
        />

        {/* Hero Header */}
        <div className="mt-6 p-8 rounded-3xl bg-gradient-to-br from-[#1b163a] via-[#14122d] to-[#0c0a1f] border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>Verified License • Access Granted</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>
              <p className="text-xs sm:text-sm text-[#A7A3BC]">
                {product.productFormat} • Cloud Vault ID: <span className="text-purple-300 font-mono">ZNV-{slug.toUpperCase()}</span>
              </p>
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <a
                href={downloadApiUrl}
                download
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.02]"
              >
                <Download size={16} />
                <span>Download Master ZIP</span>
              </a>

              <a
                href={driveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
              >
                <Globe size={15} className="text-cyan-400" />
                <span>Google Drive Vault</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Vault Navigation Tabs */}
        <div className="mt-8 border-b border-white/10 pb-px flex items-center gap-3 overflow-x-auto">
          {[
            { id: "overview", label: "Vault Assets & Downloads", icon: Layers },
            { id: "playbook", label: "Master Guide & Modules", icon: BookOpen },
            { id: "swipefiles", label: "Copy-Paste Swipe Files", icon: FileText },
            { id: "bonuses", label: "Included VIP Bonuses", icon: Gift },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-purple-500 text-white"
                    : "border-transparent text-[#A7A3BC] hover:text-white"
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ASSET DOWNLOADS */}
        {activeTab === "overview" && (
          <div className="mt-8 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-[#17152E] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                    <Download size={18} />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Ready to Save
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">Full Master Bundle Archive</h3>
                <p className="text-xs text-[#A7A3BC]">
                  Includes the complete high-resolution playbook, Notion workspace shortcut, and swipe files.
                </p>
                <a
                  href={downloadApiUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
                >
                  <Download size={14} />
                  <span>Download .ZIP</span>
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-[#17152E] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
                    <Globe size={18} />
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    Cloud Synced
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">Google Drive Cloud Mirror</h3>
                <p className="text-xs text-[#A7A3BC]">
                  Instant cloud drive storage sync for team sharing and mobile access on Google Workspace.
                </p>
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-colors"
                >
                  <Globe size={14} className="text-cyan-400" />
                  <span>Open Drive</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-[#17152E] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-pink-500/20 text-pink-300">
                    <FileText size={18} />
                  </span>
                  <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                    Interactive
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">Notion Enterprise OS</h3>
                <p className="text-xs text-[#A7A3BC]">
                  One-click duplicate into your personal Notion workspace with live databases and matrices.
                </p>
                <button
                  type="button"
                  onClick={() => alert("Notion 1-Click Duplicate Link: In production deployment, clicking this imports the template directly to your Notion account.")}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-colors"
                >
                  <Sparkles size={14} className="text-pink-400" />
                  <span>Duplicate Notion OS</span>
                </button>
              </div>
            </div>

            {/* Core Features / Deliverables checklist */}
            <div className="p-6 rounded-2xl bg-[#17152E] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white">Included Modules & Deliverables</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {(product.features || []).map((feat: any, idx: number) => {
                  const title = typeof feat === "string" ? feat : feat.title;
                  return (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-200">{title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PLAYBOOK MODULES */}
        {activeTab === "playbook" && (
          <div className="mt-8 space-y-4">
            {[
              {
                title: "Module 1: Strategic Ideation & Market Validation",
                desc: "Discovering untapped market gaps, analyzing competitor moats, and securing proof of willingness-to-pay before writing code or creating content.",
              },
              {
                title: "Module 2: Value Architecture & High-Ticket Pricing",
                desc: "Structuring irresistible offers, designing tiered pricing models, and maximizing Average Order Value (AOV) with one-click upsells.",
              },
              {
                title: "Module 3: Zero-Cost Organic Acquisition Engine",
                desc: "Deploying high-retention social hooks, algorithm-friendly carousels, and automated direct message funnels that drive inbound buyers.",
              },
              {
                title: "Module 4: Paid Acquisition & Scaling Protocols",
                desc: "Harnessing 2026 AI targeting algorithms, testing creative hook angles, and scaling daily ad budgets profitably without audience fatigue.",
              },
            ].map((module, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#17152E] border border-white/10 space-y-2">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                  Chapter 0{i + 1}
                </span>
                <h3 className="text-base font-bold text-white">{module.title}</h3>
                <p className="text-xs text-[#A7A3BC] leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SWIPE FILES */}
        {activeTab === "swipefiles" && (
          <div className="mt-8 space-y-4">
            {[
              {
                title: "Viral Hook Formula: The Counter-Intuitive Truth",
                text: "Most creators believe you need 100,000 followers to make ₹1,00,000/mo. Here is the exact breakdown of how we did it with only 1,400 active subscribers:",
              },
              {
                title: "High-Converting Headline: Fill-in-the-Blank Matrix",
                text: "How To [Achieve Desired Outcome] In [Timeframe] Without [Biggest Pain Point Or Frustration]",
              },
              {
                title: "Cold Partner Outreach Email Template",
                text: "Hey [Name], Loved your recent piece on [Topic]. We noticed a gap in [Specific Area] and engineered a resource specifically solving it for your community. Would love to send you full VIP access free of charge—no strings attached. Let me know if you want the link!",
              },
            ].map((swipe, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#17152E] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{swipe.title}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(swipe.text, idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-purple-300 border border-white/10 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Swipe</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0e0d22] border border-white/5 text-xs text-gray-300 font-mono leading-relaxed select-all">
                  {swipe.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: BONUSES */}
        {activeTab === "bonuses" && (
          <div className="mt-8 space-y-4">
            {(product.bonuses || []).map((bonus: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-r from-[#1e173d] to-[#120f26] border border-pink-500/30 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                      <Gift size={14} /> VIP Bonus #{idx + 1}
                    </span>
                    <span className="text-[10px] text-pink-300 font-bold bg-pink-500/20 px-2 py-0.5 rounded-full">
                      Worth {bonus.value || bonus.demoValue || "₹1,499"}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{bonus.title}</h4>
                  <p className="text-xs text-[#A7A3BC] mt-0.5">{bonus.description}</p>
                </div>
                <a
                  href={downloadApiUrl}
                  download
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shrink-0 transition-colors"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
