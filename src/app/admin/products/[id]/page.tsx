"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Trash2,
  ExternalLink,
  CheckCircle,
  Eye,
  IndianRupee,
  Layers,
  Image as ImageIcon,
  FolderLock,
  Plus,
  X,
  Sparkles,
  HelpCircle,
  Gift,
  FileCheck,
  Video,
  Upload,
  Globe,
  ShieldCheck,
  Megaphone,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import ImageDropzone from "@/components/admin/ui/ImageDropzone";
import { ProductCategory, ProductDeliverable, ProductBonus, ProductFAQ } from "@/types";
import { API_BASE } from "@/lib/api";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const productId = resolvedParams?.id as string;

  const { products, updateProduct, deleteProduct, togglePublishProduct, addAuditLog } = useAdminData();
  const product = products.find((p) => p.id === productId);

  const [activeTab, setActiveTab] = useState<
    "basic" | "photos" | "access" | "deliverables" | "features" | "bonuses" | "faqs" | "ads" | "custom"
  >("basic");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    category: "meta-ads-courses" as ProductCategory,
    categoryName: "Meta Ads Courses",
    shortDescription: "",
    fullDescription: "",
    price: 0,
    originalPrice: 0,
    isFree: false,
    badge: "Bestseller" as "Bestseller" | "New" | "Featured" | "Popular" | "54% OFF" | "Free",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    productFormat: "",
    fileSize: "",

    // Point 5 & 8: Photos & Access Links
    photos: [] as string[],
    thumbnail: "",
    googleDriveLink: "",
    accessFolderLink: "",
    videoLink: "",
    downloadFileUrl: "",

    // Point 6: Product Details Page Sections
    overviewText: "",
    deliverables: [] as string[],
    features: [] as { title: string; description: string }[],
    previewVideoUrl: "",
    bonuses: [] as { title: string; value: string; description: string }[],
    faqs: [] as { question: string; answer: string }[],
    adCopy: {
      headline: "",
      hook: "",
      primaryText: "",
      callToAction: "Get Instant Access",
      targetAudience: "",
      adMediaUrl: "",
      adImages: [] as string[],
    },
    customSections: [] as Array<{
      id: string;
      title: string;
      fieldType: "text" | "image" | "video" | "link";
      content: string;
      mediaUrl: string;
      buttonLabel: string;
    }>,
  });

  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newAdImageUrl, setNewAdImageUrl] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        category: product.category,
        categoryName: product.categoryName,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        price: product.price,
        originalPrice: product.originalPrice,
        isFree: !!product.isFree,
        badge: product.badge || "Featured",
        isFeatured: !!product.isFeatured,
        isBestSeller: !!product.isBestSeller,
        isNewArrival: !!product.isNewArrival,
        productFormat: product.productFormat,
        fileSize: product.fileSize || "45 MB",

        photos: product.photos || [
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
        ],
        thumbnail: product.thumbnail || (product.photos && product.photos[0]) || "",
        googleDriveLink:
          product.googleDriveLink ||
          "https://drive.google.com/drive/folders/1elvoradigital-meta-ads-2026-pro-master-vault",
        accessFolderLink: product.accessFolderLink || "https://cloud.elvoradigital.com/folders/meta-ads-mastery",
        videoLink: product.videoLink || "https://player.vimeo.com/video/849201940",
        downloadFileUrl: product.downloadFileUrl || product.downloadUrl || "",

        overviewText:
          (product as unknown as { overviewText?: string }).overviewText ||
          "Complete practical blueprint with 50+ video lessons, live campaign walkthroughs, and lifetime updates.",
        deliverables:
          (product as unknown as { deliverablesText?: string[] }).deliverablesText ||
          (product.whatsIncluded && product.whatsIncluded.map((w: ProductDeliverable) => w.title)) || [
            "50+ HD On-Demand Video Lessons (Lifetime Access)",
            "High-Converting Ad Copy Swipe File (100+ Proven Frameworks)",
            "Ad Creative Canva Templates (Figma & Photoshop files included)",
            "ROAS & Budget Scaling Calculator Spreadsheet",
          ],
        features:
          (product.features &&
            product.features.map((f: string | { title: string; description: string }) =>
              typeof f === "string" ? { title: f, description: "Professional marketing framework." } : f
            )) || [
            {
              title: "Advantage+ & AI Targeting Mastery",
              description: "Harness Meta's 2026 machine learning algorithm for predictable acquisition.",
            },
            {
              title: "Creative Strategy & Viral Hooks",
              description: "Stop the scroll with UGC frameworks, 3-second hook formulas, and high-CTR visual structures.",
            },
          ],
        previewVideoUrl: (product as unknown as { previewVideoUrl?: string }).previewVideoUrl || "",
        bonuses:
          (product.bonuses &&
            product.bonuses.map((b: ProductBonus) => ({
              title: b.title,
              value: b.demoValue || "₹1,999",
              description: b.description,
            }))) || [
            {
              title: "100+ Proven Meta Ad Copy Swipe File",
              value: "₹2,999",
              description: "Fill-in-the-blank headlines, hooks, and body copy proven across 30+ e-commerce niches.",
            },
          ],
        faqs:
          (product.faqs &&
            product.faqs.map((f: ProductFAQ) => ({
              question: f.question,
              answer: f.answer,
            }))) || [
            {
              question: "How do I access the course and resources after payment?",
              answer:
                "Immediately after payment confirmation, you are redirected to the order access page and receive an automated email containing your direct Google Drive master folder link, video portal access, and downloadable bonus packages.",
            },
          ],
        adCopy: {
          headline: (product as any).adCopy?.headline || "",
          hook: (product as any).adCopy?.hook || "",
          primaryText: (product as any).adCopy?.primaryText || "",
          callToAction: (product as any).adCopy?.callToAction || "Get Instant Access",
          targetAudience: (product as any).adCopy?.targetAudience || "",
          adMediaUrl: (product as any).adCopy?.adMediaUrl || "",
          adImages: Array.isArray((product as any).adCopy?.adImages) ? (product as any).adCopy.adImages : [],
        },
        customSections: Array.isArray((product as any).customSections)
          ? (product as any).customSections.map((s: any, idx: number) => ({
              id: s.id || `sec-${idx}`,
              title: s.title || "",
              fieldType: s.fieldType || "text",
              content: s.content || "",
              mediaUrl: s.mediaUrl || "",
              buttonLabel: s.buttonLabel || "Open Resource",
            }))
          : [],
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Product Not Found</h2>
        <Link href="/admin/products" className="text-xs text-purple-400 underline">
          Return to Products List
        </Link>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update in local admin context
    updateProduct(product.id, {
      ...formData,
      features: formData.features.map((f) => f.title),
      bonuses: formData.bonuses.map((b) => ({
        title: b.title,
        description: b.description,
        demoValue: b.value,
      })),
      faqs: formData.faqs,
    });

    // Also sync to MongoDB backend
    try {
      const token = sessionStorage.getItem("znv_admin_token");
      await fetch(`${API_BASE}/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(formData),
      });
    } catch {
      // Local context updated
    }

    addAuditLog(
      "Updated Product Sections & Links",
      "Products",
      `Saved photos, Google Drive links, and details sections for "${formData.name}"`
    );

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDelete = () => {
    if (window.confirm(`Permanently delete "${product.name}"?`)) {
      deleteProduct(product.id);
      router.push("/admin/products");
    }
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, newPhotoUrl.trim()],
      thumbnail: prev.thumbnail || newPhotoUrl.trim(),
    }));
    setNewPhotoUrl("");
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => {
      const updated = prev.photos.filter((_, i) => i !== index);
      return {
        ...prev,
        photos: updated,
        thumbnail: updated[0] || "",
      };
    });
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, newDeliverable.trim()],
    }));
    setNewDeliverable("");
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        { title: "New Feature / Capability", description: "Explain how this feature accelerates results." },
      ],
    }));
  };

  const handleAddBonus = () => {
    setFormData((prev) => ({
      ...prev,
      bonuses: [
        ...prev.bonuses,
        { title: "Exclusive Marketing Bonus", value: "₹1,499", description: "Included free for limited time." },
      ],
    }));
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        {
          question: "How do I access this resource after checkout?",
          answer: "Access link is emailed instantly and also shown on the checkout success screen.",
        },
      ],
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Products</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/product/${product.slug}`}
            target="_blank"
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white border border-white/10"
          >
            <ExternalLink size={13} />
            <span>Storefront View</span>
          </Link>
          <button
            onClick={() => togglePublishProduct(product.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold uppercase transition-all ${product.status === "published"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              }`}
          >
            {product.status === "published" ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-xl bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 border border-pink-500/30"
            title="Delete Product"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Edit: {formData.name}</h1>
          <p className="text-xs text-[#A7A3BC] font-mono mt-0.5">
            SKU: {product.sku} • Category: {formData.category} • Sales: {product.totalSales}
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5">
        {[
          { id: "basic", label: "General & Pricing", icon: Layers },
          { id: "photos", label: "Product Photos", icon: ImageIcon },
          { id: "access", label: "Google Drive & Access Links", icon: FolderLock },
          { id: "deliverables", label: "Overview & Deliverables", icon: FileCheck },
          { id: "features", label: "Preview & Features", icon: Sparkles },
          { id: "bonuses", label: "Comparison & Bonuses", icon: Gift },
          { id: "faqs", label: "Product FAQs", icon: HelpCircle },
          { id: "ads", label: "Ads & Marketing", icon: Megaphone },
          { id: "custom", label: "Custom Fields & Media", icon: Plus },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === tab.id
                ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20"
                : "bg-[#17152E] text-[#A7A3BC] hover:text-white border border-white/5"
                }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: BASIC & PRICING */}
        {activeTab === "basic" && (
          <AdminCard title="Product Basics & Pricing" subtitle="Core catalog parameters">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-purple-300 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Sale Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Short Sales Hook / Summary</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Comprehensive Description</label>
                <textarea
                  rows={4}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                ></textarea>
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 2: PRODUCT PHOTOS & MEDIA (Point 5) */}
        {activeTab === "photos" && (
          <AdminCard
            title="Product Image Gallery & Visual Assets"
            subtitle="Add product screenshots, 3D mockups, and cover photos"
          >
            <div className="space-y-5">
              {/* Add Photo Input */}
              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                  Primary Thumbnail Image URL (Shown on Storefront Cards)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-purple-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <ImageDropzone
                onUploadComplete={(urls) => {
                  setFormData((prev) => ({
                    ...prev,
                    photos: [...prev.photos, ...urls],
                    thumbnail: prev.thumbnail || urls[0] || "",
                  }));
                }}
              />

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste image URL (e.g. https://images.unsplash.com/... or /uploads/...)"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus size={14} /> Add Image
                </button>
              </div>

              {/* Photo Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {formData.photos.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-2xl overflow-hidden bg-black/40 border border-white/10 aspect-video flex items-center justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnail: url })}
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded-md font-bold text-[10px] transition-colors ${
                        formData.thumbnail === url
                          ? "bg-purple-600 text-white"
                          : "bg-black/70 text-gray-200 hover:bg-purple-600"
                      }`}
                    >
                      {formData.thumbnail === url ? "✓ Primary Thumbnail" : "Set Thumbnail"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 3: GOOGLE DRIVE & ACCESS DELIVERABLE LINKS (Point 5 & 8) */}
        {activeTab === "access" && (
          <AdminCard
            title="Protected Access & Google Drive Links"
            subtitle="Secure URLs delivered automatically to paid customers via email and order confirmation"
          >
            <div className="space-y-4">
              <div className="p-4 bg-purple-950/30 border border-purple-500/20 rounded-2xl text-xs text-purple-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-white">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Verified Payment Access Gate
                </span>
                <p>
                  Customers who complete payment will receive these direct access links immediately in their confirmation email and on their customer library portal. Unpaid users cannot view or download these resources.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase flex items-center gap-1.5">
                  <Globe size={14} className="text-purple-400" />
                  Google Drive Folder / Resource Link
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/1abc...xyz"
                  value={formData.googleDriveLink}
                  onChange={(e) => setFormData({ ...formData, googleDriveLink: e.target.value })}
                  className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-purple-300 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase flex items-center gap-1.5">
                  <FolderLock size={14} className="text-[#22D3EE]" />
                  Protected Cloud Storage / Folder URL
                </label>
                <input
                  type="url"
                  placeholder="https://cloud.elvoradigital.com/folders/..."
                  value={formData.accessFolderLink}
                  onChange={(e) => setFormData({ ...formData, accessFolderLink: e.target.value })}
                  className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase flex items-center gap-1.5">
                  <Video size={14} className="text-pink-400" />
                  Course Video Portal / Player Embed URL
                </label>
                <input
                  type="url"
                  placeholder="https://player.vimeo.com/video/... or YouTube unlisted"
                  value={formData.videoLink}
                  onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                  className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-pink-300 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase flex items-center gap-1.5">
                  <FileCheck size={14} className="text-emerald-400" />
                  Direct Download Archive / ZIP File URL
                </label>
                <input
                  type="url"
                  placeholder="https://assets.elvoradigital.com/package.zip"
                  value={formData.downloadFileUrl}
                  onChange={(e) => setFormData({ ...formData, downloadFileUrl: e.target.value })}
                  className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-emerald-300 focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 4: OVERVIEW & DELIVERABLES (Point 6) */}
        {activeTab === "deliverables" && (
          <AdminCard
            title="Section: Overview & Deliverables"
            subtitle="Manage what is included and delivered with this product"
          >
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Overview Summary</label>
                <textarea
                  rows={3}
                  value={formData.overviewText}
                  onChange={(e) => setFormData({ ...formData, overviewText: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase block mb-1.5">
                  What&apos;s Included (Deliverables Checklist)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="e.g. 50+ HD On-Demand Video Lessons"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-4 py-2 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white"
                    >
                      <span>✓ {item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-gray-500 hover:text-rose-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 5: PREVIEW & FEATURES (Point 6) */}
        {activeTab === "features" && (
          <AdminCard
            title="Section: Preview & Features"
            subtitle="Curate the core features and learning outcomes displayed on the product page"
            action={
              <button
                type="button"
                onClick={handleAddFeature}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#8B5CF6]/20 text-purple-300 border border-[#8B5CF6]/30 rounded-xl text-xs font-semibold"
              >
                <Plus size={14} /> Add Feature
              </button>
            }
          >
            <div className="space-y-4">
              {formData.features.map((feat, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300">Feature #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          features: prev.features.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-gray-500 hover:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Feature Title"
                      value={feat.title}
                      onChange={(e) => {
                        const updated = [...formData.features];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, features: updated });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Feature Description"
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...formData.features];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, features: updated });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-[#A7A3BC] focus:outline-none focus:border-[#8B5CF6]"
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        )}

        {/* TAB 6: COMPARISON & BONUSES (Point 6) */}
        {activeTab === "bonuses" && (
          <AdminCard
            title="Section: Comparison & Marketing Bonuses"
            subtitle="Add high-perceived-value bonus resources included free with purchase"
            action={
              <button
                type="button"
                onClick={handleAddBonus}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#8B5CF6]/20 text-purple-300 border border-[#8B5CF6]/30 rounded-xl text-xs font-semibold"
              >
                <Plus size={14} /> Add Bonus
              </button>
            }
          >
            <div className="space-y-4">
              {formData.bonuses.map((bonus, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-300">Free Bonus #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          bonuses: prev.bonuses.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-gray-500 hover:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        placeholder="Bonus Title"
                        value={bonus.title}
                        onChange={(e) => {
                          const updated = [...formData.bonuses];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, bonuses: updated });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Value (e.g. ₹2,999)"
                        value={bonus.value}
                        onChange={(e) => {
                          const updated = [...formData.bonuses];
                          updated[idx].value = e.target.value;
                          setFormData({ ...formData, bonuses: updated });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-emerald-300 focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Bonus description explaining benefits..."
                      value={bonus.description}
                      onChange={(e) => {
                        const updated = [...formData.bonuses];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, bonuses: updated });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-[#A7A3BC] focus:outline-none focus:border-[#8B5CF6]"
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        )}

        {/* TAB 7: PRODUCT FAQS (Point 6) */}
        {activeTab === "faqs" && (
          <AdminCard
            title="Section: Frequently Asked Questions"
            subtitle="Address customer objections, access queries, and guarantee policies"
            action={
              <button
                type="button"
                onClick={handleAddFaq}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#8B5CF6]/20 text-purple-300 border border-[#8B5CF6]/30 rounded-xl text-xs font-semibold"
              >
                <Plus size={14} /> Add FAQ
              </button>
            }
          >
            <div className="space-y-4">
              {formData.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#22D3EE]">FAQ #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          faqs: prev.faqs.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-gray-500 hover:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Question..."
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[idx].question = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Answer..."
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[idx].answer = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-[#A7A3BC] focus:outline-none focus:border-[#8B5CF6]"
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        )}

        {/* TAB 8: ADS & MARKETING */}
        {activeTab === "ads" && (
          <AdminCard
            title="Ads & Promotional Creative Showcase"
            subtitle="Add ad banner images, promotional copy, and spotlight media for this product"
          >
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Primary Ad Headline</label>
                <input
                  type="text"
                  value={formData.adCopy.headline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      adCopy: { ...formData.adCopy, headline: e.target.value },
                    })
                  }
                  placeholder="e.g. Stop scrolling: The only system you need in 2026"
                  className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Hook / Angle</label>
                <input
                  type="text"
                  value={formData.adCopy.hook}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      adCopy: { ...formData.adCopy, hook: e.target.value },
                    })
                  }
                  placeholder="e.g. 3-second viral hook..."
                  className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Ad Body / Product Details</label>
                <textarea
                  rows={3}
                  value={formData.adCopy.primaryText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      adCopy: { ...formData.adCopy, primaryText: e.target.value },
                    })
                  }
                  placeholder="Promotional copy displayed in the product's Ad Spotlight section..."
                  className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Call To Action (CTA)</label>
                  <input
                    type="text"
                    value={formData.adCopy.callToAction}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, callToAction: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Main Ad Image / Video URL</label>
                  <input
                    type="url"
                    value={formData.adCopy.adMediaUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, adMediaUrl: e.target.value },
                      })
                    }
                    placeholder="https://..."
                    className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-cyan-300 font-mono focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              {/* Additional Ad Images */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <label className="text-xs font-semibold text-white uppercase block">
                  Additional Ad Banner Images
                </label>

              <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste Ad Image URL (https://...)"
                    value={newAdImageUrl}
                    onChange={(e) => setNewAdImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newAdImageUrl.trim()) return;
                      setFormData((prev) => ({
                        ...prev,
                        adCopy: {
                          ...prev.adCopy,
                          adImages: [...(prev.adCopy.adImages || []), newAdImageUrl.trim()],
                        },
                      }));
                      setNewAdImageUrl("");
                    }}
                    className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Plus size={14} /> Add Ad Image
                  </button>
                </div>

                {(formData.adCopy.adImages || []).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(formData.adCopy.adImages || []).map((imgUrl, idx) => (
                      <div key={idx} className="relative group rounded-2xl overflow-hidden bg-black/40 border border-white/10 aspect-video">
                        <img src={imgUrl} alt={`Ad ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              adCopy: {
                                ...prev.adCopy,
                                adImages: (prev.adCopy.adImages || []).filter((_, i) => i !== idx),
                              },
                            }))
                          }
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 9: CUSTOM FIELDS & MEDIA SECTIONS */}
        {activeTab === "custom" && (
          <AdminCard
            title="Custom Product Fields & Media Sections"
            subtitle="Add custom images, videos, text blocks, or links tailored specifically for this product"
            action={
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    customSections: [
                      ...prev.customSections,
                      {
                        id: `sec-${Date.now()}`,
                        title: "Custom Product Showcase",
                        fieldType: "image",
                        content: "",
                        mediaUrl: "",
                        buttonLabel: "Open Resource",
                      },
                    ],
                  }))
                }
                className="flex items-center gap-1 px-3 py-1.5 bg-[#8B5CF6]/20 text-purple-300 border border-[#8B5CF6]/30 rounded-xl text-xs font-semibold"
              >
                <Plus size={14} /> Add Custom Field
              </button>
            }
          >
            <div className="space-y-4">
              {formData.customSections.length === 0 && (
                <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/10 text-center text-xs text-[#A7A3BC]">
                  No custom fields yet. Click &quot;Add Custom Field&quot; to attach product-specific images, videos, or info blocks.
                </div>
              )}

              {formData.customSections.map((sec, idx) => (
                <div key={sec.id || idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#22D3EE]">Custom Field #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          customSections: prev.customSections.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-gray-500 hover:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        placeholder="Field / Section Title..."
                        value={sec.title}
                        onChange={(e) => {
                          const updated = [...formData.customSections];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, customSections: updated });
                        }}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                    <div>
                      <select
                        value={sec.fieldType}
                        onChange={(e) => {
                          const updated = [...formData.customSections];
                          updated[idx] = {
                            ...updated[idx],
                            fieldType: e.target.value as "text" | "image" | "video" | "link",
                          };
                          setFormData({ ...formData, customSections: updated });
                        }}
                        className="w-full px-3 py-2 bg-[#17152E] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                      >
                        <option value="image">Image Showcase</option>
                        <option value="video">Video (YouTube / Vimeo / MP4)</option>
                        <option value="text">Text / Details Block</option>
                        <option value="link">External Link / Button</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Description / details..."
                    value={sec.content}
                    onChange={(e) => {
                      const updated = [...formData.customSections];
                      updated[idx] = { ...updated[idx], content: e.target.value };
                      setFormData({ ...formData, customSections: updated });
                    }}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-[#A7A3BC] focus:outline-none focus:border-[#8B5CF6]"
                  />

                  {sec.fieldType !== "text" && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className={sec.fieldType === "link" ? "" : "sm:col-span-2"}>
                        <input
                          type="url"
                          placeholder="Media or Link URL (https://...)"
                          value={sec.mediaUrl}
                          onChange={(e) => {
                            const updated = [...formData.customSections];
                            updated[idx] = { ...updated[idx], mediaUrl: e.target.value };
                            setFormData({ ...formData, customSections: updated });
                          }}
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      {sec.fieldType === "link" && (
                        <div>
                          <input
                            type="text"
                            placeholder="Button Label (e.g. Open Demo)"
                            value={sec.buttonLabel}
                            onChange={(e) => {
                              const updated = [...formData.customSections];
                              updated[idx] = { ...updated[idx], buttonLabel: e.target.value };
                              setFormData({ ...formData, customSections: updated });
                            }}
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AdminCard>
        )}

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {isSaved ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle size={15} />
              Product details, photos, and access links updated!
            </span>
          ) : (
            <span className="text-xs text-[#A7A3BC]">Changes will be reflected across the storefront.</span>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-500/25"
          >
            <Save size={16} />
            <span>Save Product Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
