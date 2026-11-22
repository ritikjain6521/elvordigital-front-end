"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Eye,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  MoveUp,
  MoveDown,
  Trash2,
  Plus,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Layers,
  Check
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { LandingPageSection } from "@/types/admin";

export default function LandingPageBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const lpId = resolvedParams?.id as string;
  const { landingPages, updateLandingPage } = useAdminData();

  const landingPage = landingPages.find((lp) => lp.id === lpId);

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [sections, setSections] = useState<LandingPageSection[]>(
    landingPage?.sections || []
  );
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    landingPage?.sections[0]?.id || "sec-hero"
  );

  if (!landingPage) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Landing Page Not Found</h2>
        <Link href="/admin/landing-pages" className="text-xs text-purple-400 underline">
          Return to Landing Pages
        </Link>
      </div>
    );
  }

  const selectedSection = sections.find((s) => s.id === selectedSectionId) || sections[0];

  const handleToggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setSections((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    setSections((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleUpdateSectionContent = (key: string, value: unknown) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionId
          ? {
              ...s,
              content: {
                ...s.content,
                [key]: value,
              },
            }
          : s
      )
    );
  };

  const handleSavePage = () => {
    updateLandingPage(landingPage.id, {
      sections,
      status: "published",
    });
    alert(`Landing page for "${landingPage.productName}" saved & published!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/landing-pages"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Builder: {landingPage.title}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                LIVE
              </span>
            </h1>
            <p className="text-xs text-[#A7A3BC]">
              Modifies layout, copy, and CTAs for /product/{landingPage.slug}
            </p>
          </div>
        </div>

        {/* Device preview toggles & Save */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-[#17152E] border border-white/10 text-gray-400">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1.5 rounded-lg ${previewDevice === "desktop" ? "bg-purple-600 text-white" : "hover:text-white"}`}
              title="Desktop View"
            >
              <Monitor size={15} />
            </button>
            <button
              onClick={() => setPreviewDevice("tablet")}
              className={`p-1.5 rounded-lg ${previewDevice === "tablet" ? "bg-purple-600 text-white" : "hover:text-white"}`}
              title="Tablet View"
            >
              <Tablet size={15} />
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1.5 rounded-lg ${previewDevice === "mobile" ? "bg-purple-600 text-white" : "hover:text-white"}`}
              title="Mobile View"
            >
              <Smartphone size={15} />
            </button>
          </div>

          <Link
            href={`/product/${landingPage.slug}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">Storefront</span>
          </Link>

          <button
            onClick={handleSavePage}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30"
          >
            <Save size={14} />
            <span>Publish Page</span>
          </button>
        </div>
      </div>

      {/* Main Builder Layout: Sections Left Panel (4 cols) + Live Editor (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sections List & Order (4 cols) */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-[#17152E]/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Page Sections ({sections.length})
            </span>
            <span className="text-[10px] text-gray-400">Drag &amp; Reorder</span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedSectionId === sec.id
                    ? "bg-purple-600/20 border-purple-500 text-white font-bold shadow-md"
                    : "bg-[#0e0d22] border-white/5 text-gray-300 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="font-mono text-[10px] opacity-60">0{idx + 1}</span>
                  <span className="truncate">{sec.title}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Up / Down */}
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1 hover:text-white disabled:opacity-30"
                  >
                    <MoveUp size={12} />
                  </button>
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === sections.length - 1}
                    className="p-1 hover:text-white disabled:opacity-30"
                  >
                    <MoveDown size={12} />
                  </button>

                  {/* Enable / Disable toggle */}
                  <button
                    onClick={() => handleToggleSection(sec.id)}
                    className={`ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      sec.enabled
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-gray-500/20 text-gray-500"
                    }`}
                  >
                    {sec.enabled ? "ON" : "OFF"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Section Content Editor & Device Frame (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section Settings Panel */}
          {selectedSection && (
            <div className="p-6 rounded-2xl bg-[#17152E]/90 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Section Content: {selectedSection.title}
                  </h3>
                  <p className="text-[11px] text-[#A7A3BC]">
                    Configure section typography, headings, and CTA triggers.
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase bg-white/5 px-2 py-1 rounded text-purple-300">
                  Type: {selectedSection.type}
                </span>
              </div>

              {/* Dynamic Field Inputs depending on section content */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Section Headline
                  </label>
                  <input
                    type="text"
                    value={
                      (selectedSection.content.headline as string) ||
                      selectedSection.title ||
                      ""
                    }
                    onChange={(e) => handleUpdateSectionContent("headline", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Supporting Copy / Text
                  </label>
                  <textarea
                    rows={3}
                    value={
                      (selectedSection.content.description as string) ||
                      selectedSection.subtitle ||
                      ""
                    }
                    onChange={(e) => handleUpdateSectionContent("description", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white resize-none"
                  />
                </div>

                {selectedSection.content.ctaText !== undefined && (
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Primary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={(selectedSection.content.ctaText as string) || ""}
                      onChange={(e) => handleUpdateSectionContent("ctaText", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interactive Responsive Device Frame Simulation */}
          <div className="p-6 rounded-2xl bg-[#090816] border border-white/10 flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-wider text-gray-500 mb-3 font-semibold">
              Live Responsive Canvas ({previewDevice.toUpperCase()} PREVIEW)
            </span>

            <div
              className={`border border-white/15 rounded-2xl p-6 bg-[#0f0d26] transition-all shadow-2xl overflow-hidden ${
                previewDevice === "mobile"
                  ? "w-[360px]"
                  : previewDevice === "tablet"
                  ? "w-[600px]"
                  : "w-full"
              }`}
            >
              {/* Simulated Header */}
              <div className="text-center py-6 border-b border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                  Preview Simulation
                </span>
                <h2 className="text-xl font-black text-white">
                  {(selectedSection?.content.headline as string) || landingPage.productName}
                </h2>
                <p className="text-xs text-[#A7A3BC] max-w-sm mx-auto">
                  {(selectedSection?.content.description as string) ||
                    "Instant access delivery to your email."}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-5 py-2 rounded-xl bg-purple-600 text-xs font-bold text-white shadow-lg">
                    {(selectedSection?.content.ctaText as string) || "Get Instant Access"}
                  </span>
                </div>
              </div>

              {/* Sections list summary inside canvas */}
              <div className="py-4 space-y-2 text-xs">
                {sections
                  .filter((s) => s.enabled)
                  .map((s) => (
                    <div
                      key={s.id}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-300 flex items-center justify-between"
                    >
                      <span>✓ {s.title}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
