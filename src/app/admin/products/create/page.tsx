"use client";

import React, { useState } from "react";
import { API_BASE } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Upload,
  Sparkles,
  FileText,
  DollarSign,
  Download,
  Image as ImageIcon,
  FolderLock,
  Layers,
  HelpCircle,
  Gift,
  Plus,
  X,
  Video,
  Globe,
  Loader2,
  Megaphone,
  Layout,
  Target,
  CheckSquare,
  ShieldAlert,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import ImageDropzone from "@/components/admin/ui/ImageDropzone";
import { ProductCategory } from "@/types";

export default function CreateProductPage() {
  const router = useRouter();
  const { addProduct, addAuditLog } = useAdminData();

  const [activeTab, setActiveTab] = useState<
    "basic" | "photos" | "access" | "deliverables" | "features" | "bonuses" | "faqs" | "ads" | "sections" | "custom"
  >("basic");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    category: "meta-ads-courses" as ProductCategory,
    categoryName: "Meta Ads Courses",
    shortDescription: "",
    fullDescription: "",
    price: 499,
    originalPrice: 1099,
    isFree: false,
    badge: "New" as "Bestseller" | "New" | "Featured" | "Popular" | "54% OFF" | "Free",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    productFormat: "50+ HD Video Lessons + Master Resource Pack",
    compatibility: "Web, Mobile, Cloud Storage",
    fileSize: "850 MB Cloud Archive",
    fileType: "ZIP / MP4 / Notion",
    version: "2026.1",
    licenseType: "Commercial Creator License",
    status: "published" as "published" | "draft",
    accentGradient: "from-purple-600 to-pink-500",

    // Point 5 & 8: Photos & Access Links
    photos: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
    googleDriveLink: "https://drive.google.com/drive/folders/1ElvorDigital-meta-ads-2026-pro-master-vault",
    accessFolderLink: "https://cloud.ElvorDigital.com/folders/meta-ads-mastery",
    videoLink: "https://player.vimeo.com/video/849201940",
    downloadFileUrl: "https://assets.ElvorDigital.com/meta-ads-mastery-2026-pro-bundle.zip",

    // Point 6: Product Details Page Sections
    overviewText: "Complete practical masterclass and resource vault designed to scale your business with Meta Ads.",
    deliverables: [
      "50+ HD Video Lessons covering Advantage+, Lookalikes & Retargeting",
      "Plug-and-Play Ad Creative Canva & Figma Templates",
      "High-Converting Ad Copy Swipe File (100+ proven frameworks)",
      "ROAS & Scaling Calculator Spreadsheet",
    ],
    features: [
      {
        title: "2026 AI-Powered Algorithm Targeting",
        description: "Leverage Meta's modern machine learning targeting architecture for lowest CPA.",
      },
      {
        title: "High-CTR Creative Frameworks",
        description: "Hook formulas, visual pacing guides, and UGC scripts that captivate audiences.",
      },
      {
        title: "Scaling & Budget Optimization Protocol",
        description: "Step-by-step systems to double spend safely without breaking campaign performance.",
      },
    ],
    previewVideoUrl: "https://player.vimeo.com/video/849201940",
    bonuses: [
      {
        title: "100+ Proven Ad Copy Swipe File",
        value: "₹2,999",
        description: "Fill-in-the-blank headlines, hooks, and body copy proven across 30+ niches.",
      },
      {
        title: "Private Discord Mastermind VIP Access",
        value: "₹4,999",
        description: "Direct access to daily campaign reviews and marketing Q&A sessions.",
      },
    ],
    faqs: [
      {
        question: "How do I access the product after purchase?",
        answer: "Immediately upon payment confirmation, you are redirected to the download vault with instant Google Drive access. Direct credentials and backup links are also sent to your email.",
      },
      {
        question: "Is this course updated for the 2026 Meta Ads algorithm?",
        answer: "Yes, every module and template reflects the latest 2026 AI targeting, Advantage+ campaign structures, and creative testing strategies.",
      },
    ],

    // Point 2: Meta Ads & Marketing Copy
    adCopy: {
      headline: "Stop scrolling: The only Meta Ads system you need in 2026",
      hook: "3-Second scroll stopper hook with viral UGC structure",
      primaryText: "Tired of burning budget on bad creative? Get 50+ video lessons and 100+ proven ad copy frameworks.",
      callToAction: "Get Instant Access",
      targetAudience: "E-commerce Founders, Dropshippers & Agency Owners",
      adMediaUrl: "",
      adImages: [] as string[],
    },

    // Custom Admin-Defined Product Fields & Sections
    customSections: [] as Array<{
      id: string;
      title: string;
      fieldType: "text" | "image" | "video" | "link";
      content: string;
      mediaUrl: string;
      buttonLabel: string;
    }>,

    // Point 2: Extended Sections
    curriculum: [
      { title: "Module 1: Strategy & Advantage+ Setup", duration: "45 mins" },
      { title: "Module 2: High-CTR Creative Hooks & Swipe Files", duration: "60 mins" },
      { title: "Module 3: Scaling Protocol & Budget Optimization", duration: "50 mins" },
    ],
    targetAudienceList: [
      "Digital Product Creators, Marketers & Founders",
      "Media Buyers looking for proven 2026 scaling protocols",
      "Agencies managing client advertising campaigns",
    ],
    requirements: [
      "Computer with internet access and basic social media knowledge",
      "Active Meta Business Manager account (free setup covered in module 1)",
    ],
    guaranteeText: "100% Risk-Free Guarantee: Instant verified access granted upon payment.",
    urgencyNotice: "⚡ Launch Discount Active: Save 54% today with bonus masterclass included.",
  });

  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newAdImageUrl, setNewAdImageUrl] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const sku = `ELV-${formData.category.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug,
      sku: prev.sku || sku,
    }));
  };

  const handleCategoryChange = (cat: ProductCategory) => {
    const names: Record<ProductCategory, string> = {
      "meta-ads-courses": "Meta Ads Courses",
      "ai-prompts": "AI Prompt Bundles",
      "templates": "Website & Canva Templates",
      "ebooks-guides": "Ebooks & Guides",
      "software-tools": "Software & Tools",
    };
    setFormData((prev) => ({
      ...prev,
      category: cat,
      categoryName: names[cat],
    }));
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
        { title: "Exclusive Bonus Asset", value: "₹1,499", description: "Included free for limited time." },
      ],
    }));
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        { question: "Frequently Asked Question", answer: "Clear, helpful answer explaining product value or access." },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent, statusToSet: "published" | "draft") => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a product title");
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      status: statusToSet,
      rating: 5.0,
      reviewsCount: 1,
      whatsIncluded: formData.deliverables.map((d) => ({
        title: d,
        description: "Full master asset",
        format: formData.fileType,
        count: "1 Item",
      })),
      bonuses: formData.bonuses.map((b) => ({
        title: b.title,
        description: b.description,
        demoValue: b.value,
      })),
    };

    // 1. Post to MongoDB Atlas via Backend API
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : null;
      await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(submissionData),
      });
    } catch {
      // Local context backup
    }

    // 2. Add to Local Admin Context
    addProduct(submissionData as any);

    addAuditLog(
      "Created New Product",
      "Products",
      `Published product "${formData.name}" with photos, Google Drive links, and details sections`
    );

    setIsSubmitting(false);
    alert(`Product "${formData.name}" created successfully as ${statusToSet}!`);
    router.push("/admin/products");
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
          <button
            type="button"
            disabled={isSubmitting}
            onClick={(e) => handleSubmit(e, "draft")}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={(e) => handleSubmit(e, "published")}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <CheckCircle size={14} />
            )}
            <span>Publish to Store</span>
          </button>
        </div>
      </div>

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black text-white">Create New Digital Product</h1>
        <p className="text-xs text-[#A7A3BC] mt-0.5">
          Configure photos, Google Drive access links, overview, deliverables, bonuses, and FAQs directly synced with MongoDB Atlas.
        </p>
      </div>

      {/* 7 Navigation Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 border-b border-white/10 pb-px overflow-x-auto">
        {[
          { id: "basic", label: "Basic & Pricing", icon: FileText },
          { id: "photos", label: "Photos & Gallery", icon: ImageIcon },
          { id: "access", label: "Google Drive & Access", icon: FolderLock },
          { id: "deliverables", label: "Overview & Deliverables", icon: Layers },
          { id: "features", label: "Preview & Features", icon: Sparkles },
          { id: "bonuses", label: "Comparison & Bonuses", icon: Gift },
          { id: "faqs", label: "Product FAQs", icon: HelpCircle },
          { id: "ads", label: "Ads & Marketing", icon: Megaphone },
          { id: "sections", label: "Curriculum & Sections", icon: Layout },
          { id: "custom", label: "Custom Fields & Media", icon: Plus },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 pb-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-purple-500 text-white"
                  : "border-transparent text-[#A7A3BC] hover:text-white"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={(e) => handleSubmit(e, "published")} className="space-y-6">
        {/* TAB 1: BASIC & PRICING */}
        {activeTab === "basic" && (
          <div className="space-y-6">
            <AdminCard title="Product Identification">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. META ADS MASTERY 2026 – PRO EDITION"
                    value={formData.name}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      SKU Code
                    </label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value as ProductCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="meta-ads-courses">Meta Ads Courses</option>
                      <option value="ai-prompts">AI Prompt Bundles</option>
                      <option value="templates">Templates & Canva</option>
                      <option value="ebooks-guides">Ebooks & Guides</option>
                      <option value="software-tools">Software & Tools</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Badge Label
                    </label>
                    <select
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="Bestseller">Bestseller</option>
                      <option value="New">New</option>
                      <option value="Featured">Featured</option>
                      <option value="54% OFF">54% OFF</option>
                      <option value="Free">Free</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Short Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Learn. Launch. Optimize. Scale."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </AdminCard>

            <AdminCard title="Pricing & Financials">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Sale Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Original Strike Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                    <input
                      type="checkbox"
                      checked={formData.isFree}
                      onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                      className="rounded border-white/20 text-purple-600 focus:ring-purple-500"
                    />
                    <span>Make this product 100% Free</span>
                  </label>
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* TAB 2: PHOTOS & GALLERY */}
        {activeTab === "photos" && (
          <AdminCard title="Product Photos & Visual Assets">
            <div className="space-y-4">
              <p className="text-xs text-gray-400">
                Add high-resolution product mockup images, course covers, and preview screenshots. The primary thumbnail is displayed on store cards and the product hero.
              </p>

              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1.5">
                  Primary Thumbnail Image URL (Shown on Storefront Cards)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-purple-500/30 text-xs text-white focus:outline-none focus:border-purple-400"
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
                  placeholder="Paste direct image URL (https://...)"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
                >
                  <Plus size={14} />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {formData.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#0e0d22] aspect-video"
                  >
                    <img src={photo} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnail: photo })}
                        className="text-[10px] font-bold text-purple-200 bg-purple-950/90 hover:bg-purple-600 px-2.5 py-1 rounded border border-purple-500/40"
                      >
                        {formData.thumbnail === photo ? "✓ Primary Thumbnail" : "Set as Thumbnail"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="p-1 rounded bg-red-500/30 hover:bg-red-500 text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 3: ACCESS & GOOGLE DRIVE */}
        {activeTab === "access" && (
          <div className="space-y-6">
            <AdminCard title="Google Drive & Secure Access URLs">
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200">
                  <strong className="block text-white font-bold mb-1">Automated Delivery Protocol:</strong>
                  These links are granted exclusively to paying customers. Upon verified payment, the customer is redirected to their access screen and an email containing these links is automatically dispatched.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                    <FolderLock size={14} className="text-purple-400" />
                    <span>Master Google Drive Vault Link *</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.googleDriveLink}
                    onChange={(e) => setFormData({ ...formData, googleDriveLink: e.target.value })}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                      <Globe size={14} className="text-cyan-400" />
                      <span>Cloud Folder / Notion Portal</span>
                    </label>
                    <input
                      type="url"
                      value={formData.accessFolderLink}
                      onChange={(e) => setFormData({ ...formData, accessFolderLink: e.target.value })}
                      placeholder="https://cloud.ElvorDigital.com/folders/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                      <Video size={14} className="text-pink-400" />
                      <span>Video Lessons Portal / Player URL</span>
                    </label>
                    <input
                      type="url"
                      value={formData.videoLink}
                      onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                      placeholder="https://player.vimeo.com/video/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                    <Download size={14} className="text-purple-400" />
                    <span>Direct ZIP / Master File Download URL</span>
                  </label>
                  <input
                    type="url"
                    value={formData.downloadFileUrl}
                    onChange={(e) => setFormData({ ...formData, downloadFileUrl: e.target.value })}
                    placeholder="https://assets.ElvorDigital.com/package.zip"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* TAB 4: OVERVIEW & DELIVERABLES */}
        {activeTab === "deliverables" && (
          <div className="space-y-6">
            <AdminCard title="Section 1: Overview & Deliverables">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Full Description / Overview Text
                  </label>
                  <textarea
                    rows={4}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="Comprehensive explanation of what students or creators will accomplish with this product..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 leading-relaxed"
                  />
                </div>

                <div className="pt-2 border-t border-white/5 space-y-3">
                  <label className="block text-xs font-bold text-white">
                    Deliverables Checklist ("What's Included")
                  </label>

              <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 50+ HD Video Lessons (Lifetime Access)"
                      value={newDeliverable}
                      onChange={(e) => setNewDeliverable(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                    <button
                      type="button"
                      onClick={handleAddDeliverable}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="space-y-2 pt-2">
                    {formData.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#0e0d22] border border-white/5 text-xs text-gray-200"
                      >
                        <span>• {item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDeliverable(idx)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* TAB 5: PREVIEW & FEATURES */}
        {activeTab === "features" && (
          <AdminCard title="Section 2: Preview & Features">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs text-[#A7A3BC]">
                  Manage feature highlights displayed on the product details page.
                </span>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white transition-colors flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>Add Feature</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0e0d22] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300">Feature #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            features: formData.features.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) => {
                        const updated = [...formData.features];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, features: updated });
                      }}
                      placeholder="Feature Title"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...formData.features];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, features: updated });
                      }}
                      placeholder="Feature Description"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 6: COMPARISON & BONUSES */}
        {activeTab === "bonuses" && (
          <AdminCard title="Section 3: Comparison & Bonuses">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs text-[#A7A3BC]">
                  High-converting bonuses bundled free with the product purchase.
                </span>
                <button
                  type="button"
                  onClick={handleAddBonus}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white transition-colors flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>Add Bonus</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.bonuses.map((bonus, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0e0d22] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                        <Gift size={13} /> Bonus #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            bonuses: formData.bonuses.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={bonus.title}
                        onChange={(e) => {
                          const updated = [...formData.bonuses];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, bonuses: updated });
                        }}
                        placeholder="Bonus Title"
                        className="sm:col-span-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={bonus.value}
                        onChange={(e) => {
                          const updated = [...formData.bonuses];
                          updated[idx].value = e.target.value;
                          setFormData({ ...formData, bonuses: updated });
                        }}
                        placeholder="Value (e.g. ₹2,999)"
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-yellow-300 font-bold"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={bonus.description}
                      onChange={(e) => {
                        const updated = [...formData.bonuses];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, bonuses: updated });
                      }}
                      placeholder="Bonus details and benefits..."
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 7: PRODUCT FAQS */}
        {activeTab === "faqs" && (
          <AdminCard title="Section 4: Product FAQs">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs text-[#A7A3BC]">
                  Add objection-handling FAQs for the product details page.
                </span>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white transition-colors flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0e0d22] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <HelpCircle size={13} /> Question #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            faqs: formData.faqs.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[idx].question = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                      placeholder="Customer Question"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[idx].answer = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                      placeholder="Clear explanation answering this question..."
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 8: META ADS & MARKETING COPY */}
        {activeTab === "ads" && (
          <div className="space-y-6">
            <AdminCard title="Meta Ads & Promotion Campaign Copy">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Primary Ad Headline
                  </label>
                  <input
                    type="text"
                    value={formData.adCopy.headline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, headline: e.target.value },
                      })
                    }
                    placeholder="e.g. Stop scrolling: The only Meta Ads system you need in 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    3-Second Hook / Ad Angle
                  </label>
                  <input
                    type="text"
                    value={formData.adCopy.hook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, hook: e.target.value },
                      })
                    }
                    placeholder="e.g. Why 95% of Meta Ad creatives fail within 48 hours (and the fix)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Primary Ad Body Text / Caption (Facebook & Instagram)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.adCopy.primaryText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, primaryText: e.target.value },
                      })
                    }
                    placeholder="Write the full persuasive copy for Facebook/Instagram feeds..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Call To Action (CTA)
                    </label>
                    <select
                      value={formData.adCopy.callToAction}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adCopy: { ...formData.adCopy, callToAction: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="Get Instant Access">Get Instant Access</option>
                      <option value="Download Now">Download Now</option>
                      <option value="Learn More">Learn More</option>
                      <option value="Shop Now">Shop Now</option>
                      <option value="Claim Discount Offer">Claim Discount Offer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Target Audience / Niche Tags
                    </label>
                    <input
                      type="text"
                      value={formData.adCopy.targetAudience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adCopy: { ...formData.adCopy, targetAudience: e.target.value },
                        })
                      }
                      placeholder="e.g. Media Buyers, E-commerce, Creators"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Ad Creative Media Banner / Video URL
                  </label>
                  <input
                    type="url"
                    value={formData.adCopy.adMediaUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, adMediaUrl: e.target.value },
                      })
                    }
                    placeholder="https://images.unsplash.com/... or Vimeo/YouTube video preview"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                {/* Additional Ad Banner Images */}
                <div className="pt-3 border-t border-white/5 space-y-3">
                  <label className="block text-xs font-semibold text-white">
                    Additional Ad Banner Images (Shown in Ad Spotlight)
                  </label>

              <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste Ad Banner Image URL (https://...)"
                      value={newAdImageUrl}
                      onChange={(e) => setNewAdImageUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
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
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
                    >
                      <Plus size={14} />
                      <span>Add Ad Image</span>
                    </button>
                  </div>

                  {(formData.adCopy.adImages || []).length > 0 && (
                    <div className="grid sm:grid-cols-3 gap-3 pt-1">
                      {(formData.adCopy.adImages || []).map((imgUrl, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#0e0d22] aspect-video">
                          <img src={imgUrl} alt={`Ad Banner ${idx + 1}`} className="w-full h-full object-cover" />
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
                            className="absolute top-2 right-2 p-1 rounded bg-red-600/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* TAB 9: CURRICULUM & EXTENDED SECTIONS */}
        {activeTab === "sections" && (
          <div className="space-y-6">
            {/* Curriculum Breakdown */}
            <AdminCard title="Course Modules & Curriculum Breakdown">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs text-[#A7A3BC]">
                    Add step-by-step module breakdown for the product details page.
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        curriculum: [
                          ...formData.curriculum,
                          {
                            title: `Module ${formData.curriculum.length + 1}: New Topic`,
                            duration: "45 mins",
                          },
                        ],
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white transition-colors flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Add Module</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.curriculum.map((mod, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0e0d22] border border-white/5 flex items-center gap-3">
                      <div className="flex-1 grid sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={mod.title}
                            onChange={(e) => {
                              const updated = [...formData.curriculum];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, curriculum: updated });
                            }}
                            placeholder="Module Title"
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-semibold"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={mod.duration || ""}
                            onChange={(e) => {
                              const updated = [...formData.curriculum];
                              updated[idx].duration = e.target.value;
                              setFormData({ ...formData, curriculum: updated });
                            }}
                            placeholder="Duration (e.g. 45 mins)"
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            curriculum: formData.curriculum.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </AdminCard>

            {/* Target Audience ("Who This Is For") */}
            <AdminCard title="Target Audience (Who This Is For)">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs text-[#A7A3BC]">
                    Help customers quickly identify if this product is made for them.
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        targetAudienceList: [
                          ...formData.targetAudienceList,
                          "New customer persona or professional profile",
                        ],
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white transition-colors flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Add Persona</span>
                  </button>
                </div>

                {formData.targetAudienceList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...formData.targetAudienceList];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, targetAudienceList: updated });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#0e0d22] border border-white/10 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          targetAudienceList: formData.targetAudienceList.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-gray-500 hover:text-red-400 p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </AdminCard>

            {/* Requirements & Policy */}
            <AdminCard title="Requirements, Guarantee & Promotional Notice">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Risk-Free Guarantee & Refund Policy Text
                  </label>
                  <input
                    type="text"
                    value={formData.guaranteeText}
                    onChange={(e) => setFormData({ ...formData, guaranteeText: e.target.value })}
                    placeholder="100% Risk-Free Guarantee: Instant verified access granted upon payment."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Urgency Banner / Limited Offer Notice
                  </label>
                  <input
                    type="text"
                    value={formData.urgencyNotice}
                    onChange={(e) => setFormData({ ...formData, urgencyNotice: e.target.value })}
                    placeholder="⚡ Special Launch Pricing: Available for a limited period only."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* TAB 10: CUSTOM FIELDS & MEDIA SECTIONS */}
        {activeTab === "custom" && (
          <div className="space-y-6">
            <AdminCard title="Custom Product Fields & Media Sections">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <p className="text-xs text-[#A7A3BC]">
                    Create custom sections tailored to this product — add demo images, walkthrough videos, text blocks, or resource links shown directly on the product page.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        customSections: [
                          ...prev.customSections,
                          {
                            id: `sec-${Date.now()}`,
                            title: "Product Showcase / Custom Field",
                            fieldType: "image",
                            content: "",
                            mediaUrl: "",
                            buttonLabel: "Open Resource",
                          },
                        ],
                      }))
                    }
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
                  >
                    <Plus size={14} />
                    <span>Add Custom Field</span>
                  </button>
                </div>

                {formData.customSections.length === 0 && (
                  <div className="p-6 rounded-xl bg-[#0e0d22] border border-dashed border-white/10 text-center text-xs text-gray-400">
                    No custom fields added yet. Click &quot;Add Custom Field&quot; to attach product-specific images, videos, or info blocks.
                  </div>
                )}

                <div className="space-y-4">
                  {formData.customSections.map((sec, idx) => (
                    <div key={sec.id || idx} className="p-4 rounded-xl bg-[#0e0d22] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-cyan-400">Custom Section #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              customSections: prev.customSections.filter((_, i) => i !== idx),
                            }))
                          }
                          className="text-gray-400 hover:text-red-400 p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-[#A7A3BC] mb-1">
                            Section / Field Title *
                          </label>
                          <input
                            type="text"
                            value={sec.title}
                            onChange={(e) => {
                              const updated = [...formData.customSections];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setFormData({ ...formData, customSections: updated });
                            }}
                            placeholder="e.g. Course Walkthrough Video or Bonus Template Preview"
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#A7A3BC] mb-1">
                            Field Type
                          </label>
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
                            className="w-full px-3 py-2 rounded-lg bg-[#17152E] border border-white/10 text-xs text-white"
                          >
                            <option value="image">Image Showcase</option>
                            <option value="video">Video (YouTube / Vimeo / MP4)</option>
                            <option value="text">Text / Details Block</option>
                            <option value="link">External Link / Button</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#A7A3BC] mb-1">
                          Description / Content
                        </label>
                        <textarea
                          rows={2}
                          value={sec.content}
                          onChange={(e) => {
                            const updated = [...formData.customSections];
                            updated[idx] = { ...updated[idx], content: e.target.value };
                            setFormData({ ...formData, customSections: updated });
                          }}
                          placeholder="Explain what this section shows or add detailed notes..."
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-200"
                        />
                      </div>

                      {sec.fieldType !== "text" && (
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className={sec.fieldType === "link" ? "" : "sm:col-span-2"}>
                            <label className="block text-[11px] font-semibold text-[#A7A3BC] mb-1">
                              {sec.fieldType === "image"
                                ? "Image URL (https://...)"
                                : sec.fieldType === "video"
                                ? "Video URL (YouTube, Vimeo, or MP4)"
                                : "Target Link URL (https://...)"}
                            </label>
                            <input
                              type="url"
                              value={sec.mediaUrl}
                              onChange={(e) => {
                                const updated = [...formData.customSections];
                                updated[idx] = { ...updated[idx], mediaUrl: e.target.value };
                                setFormData({ ...formData, customSections: updated });
                              }}
                              placeholder="https://..."
                              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-cyan-300 font-mono"
                            />
                          </div>

                          {sec.fieldType === "link" && (
                            <div>
                              <label className="block text-[11px] font-semibold text-[#A7A3BC] mb-1">
                                Button Label
                              </label>
                              <input
                                type="text"
                                value={sec.buttonLabel}
                                onChange={(e) => {
                                  const updated = [...formData.customSections];
                                  updated[idx] = { ...updated[idx], buttonLabel: e.target.value };
                                  setFormData({ ...formData, customSections: updated });
                                }}
                                placeholder="Open Live Demo"
                                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AdminCard>
          </div>
        )}
      </form>
    </div>
  );
}
