"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Image as ImageIcon,
  Sparkles,
  CheckCircle,
  Loader2,
  LayoutTemplate,
  HelpCircle,
  Award,
  Layers,
  Star,
  Megaphone,
  Wand2,
  Share2,
  Copy,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import ImageDropzone from "@/components/admin/ui/ImageDropzone";
import { ProductCategory } from "@/types";
import { API_BASE } from "@/lib/api";
import { autoGenerateIcon } from "@/lib/autoIcon";

type AdminTab = "hero" | "media" | "whats-inside" | "why-choose" | "cta-faq" | "custom" | "meta-social";

export default function CreateProductPage() {
  const router = useRouter();
  const { addProduct, addAuditLog } = useAdminData();

  const [activeTab, setActiveTab] = useState<AdminTab>("hero");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    tagline: "",
    category: "ebooks-guides" as ProductCategory,
    categoryName: "Ebooks & Guides",
    shortDescription: "",
    fullDescription: "",
    price: 199,
    originalPrice: 999,
    isFree: false,
    badge: "Bestseller" as "Bestseller" | "New" | "Featured" | "Popular" | "54% OFF" | "Free",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    productFormat: "Printable PDF Bundle • Instant Access",
    compatibility: "Mobile, Tablet, Laptop & Print",
    fileSize: "Instant Digital Download",
    fileType: "PDF / ZIP",
    version: "2026.1",
    licenseType: "Personal & Classroom Use",
    status: "published" as "published" | "draft",
    accentGradient: "from-purple-600 to-pink-500",

    // Media
    photos: [] as string[],
    thumbnail: "",

    // Delivery link (used after checkout)
    googleDriveLink: "",
    downloadFileUrl: "",

    // Hero Key Points (✓ checkmarks)
    deliverables: [
      "11,000+ Printable Worksheets",
      "Learning Through Fun Activities",
      "Preschool to Primary Learning",
      "Perfect for Home & Classroom",
      "Instant Digital Access",
    ],

    // What's Inside (Feature / Category cards)
    features: [
      {
        icon: "🔤",
        title: "ABC Alphabet Tracing",
        description: "Letter formation & tracing worksheets for early learners",
      },
      {
        icon: "🔢",
        title: "Numbers & Counting",
        description: "Number recognition, counting, and sequencing",
      },
      {
        icon: "🎨",
        title: "Coloring & Creative Art",
        description: "Fun coloring pages and drawing practice sheets",
      },
    ] as Array<{ icon?: string; title: string; description: string }>,

    // Why Choose This Bundle? cards
    whatsIncluded: [
      {
        title: "Massive Worksheet Collection",
        description: "Covering all subjects and early learning skill levels",
        format: "📄",
        count: "11,000+ Sheets",
      },
      {
        title: "Home & Classroom Ready",
        description: "Ideal for parents, teachers, tutors, and homeschoolers",
        format: "🏠",
        count: "Age 2–10",
      },
      {
        title: "Instant Lifetime Access",
        description: "Download immediately after checkout and print unlimited copies",
        format: "⚡",
        count: "Lifetime",
      },
    ],

    // Bonus Cards
    bonuses: [] as Array<{ title: string; value: string; description: string }>,

    // Perfect For Everyone (Target Audience)
    targetAudienceList: ["Parents", "Teachers", "Schools", "Homeschoolers", "Tutors", "Educators"],

    // CTA & Offer
    urgencyNotice: "🔥 LIMITED-TIME SPECIAL OFFER",
    guaranteeText: "🔒 100% Secure Payment | ⚡ Instant Digital Access | 🖨️ Printable PDFs",
    adCopy: {
      headline: "",
      hook: "",
      primaryText: "",
      callToAction: "",
      targetAudience: "",
      adMediaUrl: "",
      adImages: [] as string[],
    },

    // FAQs
    faqs: [
      {
        question: "How do I access the product after purchase?",
        answer:
          "Immediately after payment confirmation, you get instant download access and an email with your direct link.",
      },
      {
        question: "Is this a one-time payment?",
        answer: "Yes! Pay once and enjoy lifetime access with unlimited prints.",
      },
    ],

    // Custom Sections
    customSections: [] as Array<{
      id: string;
      title: string;
      fieldType: "text" | "image" | "video" | "link";
      layout?: "card" | "split-left" | "split-right" | "banner" | "gallery";
      content: string;
      mediaUrl: string;
      images?: string[];
      buttonLabel: string;
    }>,
  });

  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newKeyPoint, setNewKeyPoint] = useState("");

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
      const removed = prev.photos[index];
      const updated = prev.photos.filter((_, i) => i !== index);
      return {
        ...prev,
        photos: updated,
        thumbnail: prev.thumbnail === removed ? updated[0] || "" : prev.thumbnail,
      };
    });
  };

  const handleAddKeyPoint = () => {
    if (!newKeyPoint.trim()) return;
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, newKeyPoint.trim()],
    }));
    setNewKeyPoint("");
  };

  const handleSubmit = async (e: React.FormEvent, statusToSet: "published" | "draft") => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a Hero Heading / Product Title");
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      status: statusToSet,
      rating: 5.0,
      reviewsCount: 1,
      bonuses: formData.bonuses.map((b) => ({
        title: b.title,
        description: b.description,
        demoValue: b.value,
      })),
    };

    let createdProduct: any = null;
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : null;
      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setIsSubmitting(false);
        alert(data?.message || `Failed to save product (HTTP ${res.status}). Make sure you are logged in to Admin.`);
        return;
      }
      createdProduct = data.product;
    } catch (err: any) {
      setIsSubmitting(false);
      alert(`Cannot connect to backend (${API_BASE}): ${err?.message || "Network error"}`);
      return;
    }

    addProduct({
      ...(submissionData as any),
      id: createdProduct?._id || createdProduct?.id,
      slug: createdProduct?.slug || submissionData.slug,
    });

    addAuditLog(
      "Created New Product",
      "Products",
      `Published product "${formData.name}"`
    );

    setIsSubmitting(false);
    alert(`Product "${formData.name}" created successfully as ${statusToSet}!`);
    router.push("/admin/products");
  };

  const tabs: Array<{ id: AdminTab; label: string; icon: any }> = [
    { id: "hero", label: "1. Hero & Pricing", icon: LayoutTemplate },
    { id: "media", label: "2. Thumbnail & Images", icon: ImageIcon },
    { id: "whats-inside", label: "3. What's Inside", icon: Sparkles },
    { id: "why-choose", label: "4. Why Choose Bundle", icon: Award },
    { id: "cta-faq", label: "5. CTA & FAQs", icon: HelpCircle },
    { id: "custom", label: "6. Custom Sections", icon: Layers },
    { id: "meta-social", label: "7. Meta Ads & Social", icon: Megaphone },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
            <span>Publish to Store</span>
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-black text-white">Create Product Page</h1>
        <p className="text-xs text-[#A7A3BC] mt-1">
          Configure every section of your high-converting product page in order.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === tab.id
                ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20"
                : "bg-[#17152E] text-[#A7A3BC] hover:text-white border border-white/5"
                }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={(e) => handleSubmit(e, "published")} className="space-y-6">
        {/* TAB 1: HERO SECTION & PRICING */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <AdminCard title="Hero Heading, Subheading & Offer Badge">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Top Offer Badge
                  </label>
                  <input
                    type="text"
                    value={formData.urgencyNotice}
                    onChange={(e) => setFormData({ ...formData, urgencyNotice: e.target.value })}
                    placeholder="🔥 LIMITED-TIME SPECIAL OFFER"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Hero Heading (Product Title) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11,000+ KIDS WORKSHEETS BUNDLE"
                    value={formData.name}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Hero Subheading (Tagline)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Ultimate All-in-One Learning & Activity Bundle for Kids!"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Hero Supporting Text / Short Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Make Learning Fun, Creative, Interactive & Enjoyable!"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">URL Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value as ProductCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                    >
                      <option value="ebooks-guides">Ebooks & Guides</option>
                      <option value="ai-prompts">AI Prompt Bundles</option>
                      <option value="templates">Templates & Canva</option>
                      <option value="meta-ads-courses">Meta Ads Courses</option>
                      <option value="software-tools">Software & Tools</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">Badge</label>
                    <select
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                    >
                      <option value="Bestseller">Bestseller</option>
                      <option value="New">New</option>
                      <option value="Featured">Featured</option>
                      <option value="Popular">Popular</option>
                      <option value="Free">Free</option>
                    </select>
                  </div>
                </div>
              </div>
            </AdminCard>

            <AdminCard title="Hero Key Points (✓ Checkmarks)">
              <div className="space-y-3">
                <p className="text-xs text-[#A7A3BC]">
                  Displayed with green checkmarks in the Hero and Pricing sections.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 11,000+ Printable Worksheets"
                    value={newKeyPoint}
                    onChange={(e) => setNewKeyPoint(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddKeyPoint();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyPoint}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Point
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.deliverables.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#0e0d22] border border-white/10 rounded-xl px-3 py-2">
                      <span className="text-green-400 text-xs font-bold">✓</span>
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => {
                          const updated = [...formData.deliverables];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, deliverables: updated });
                        }}
                        className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            deliverables: formData.deliverables.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </AdminCard>

            <AdminCard title="Hero Right-Side Image (Drag & Drop)">
              <div className="space-y-4">
                <p className="text-xs text-[#A7A3BC]">
                  Upload or paste the main image shown in the 3D showcase box on the right side of the Hero section.
                </p>
                <ImageDropzone
                  label="Drag & drop Hero right-side image here, or click to browse"
                  onUploadComplete={(urls) => {
                    const heroUrl = urls[0] || "";
                    if (!heroUrl) return;
                    setFormData((prev) => ({
                      ...prev,
                      thumbnail: heroUrl,
                      photos: prev.photos.includes(heroUrl) ? prev.photos : [heroUrl, ...prev.photos],
                    }));
                  }}
                />
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <input
                    type="url"
                    placeholder="Or paste Hero Image URL (https://...)"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="flex-1 w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-cyan-300 font-mono"
                  />
                  {formData.thumbnail && (
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-purple-500/40 bg-[#0e0d22] shrink-0">
                      <img src={formData.thumbnail} alt="Hero preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnail: "" })}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 hover:bg-red-500"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </AdminCard>

            <AdminCard title="Pricing & Instant Delivery Link">
              <div className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Special Launch Price (₹) *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="199"
                      value={formData.price === 0 ? "" : String(formData.price)}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, price: digits === "" ? 0 : Number(digits) });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-sm font-bold text-emerald-300 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Original Price (₹ Strikethrough)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="999"
                      value={formData.originalPrice === 0 ? "" : String(formData.originalPrice)}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, originalPrice: digits === "" ? 0 : Number(digits) });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-sm font-bold text-white/80 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Format Label
                    </label>
                    <input
                      type="text"
                      value={formData.productFormat}
                      onChange={(e) => setFormData({ ...formData, productFormat: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Google Drive / Access Link (Sent in Email)
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={formData.googleDriveLink}
                      onChange={(e) => setFormData({ ...formData, googleDriveLink: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-cyan-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Direct File Download URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.downloadFileUrl}
                      onChange={(e) => setFormData({ ...formData, downloadFileUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-cyan-300 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    Featured Product
                  </label>
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    />
                    Best Seller
                  </label>
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFree}
                      onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                    />
                    100% Free Product
                  </label>
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* TAB 2: THUMBNAIL & GALLERY IMAGES */}
        {activeTab === "media" && (
          <AdminCard title="Thumbnail & Product Gallery Images">
            <div className="space-y-5">
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
                  placeholder="Or paste Image URL (https://...)"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1"
                >
                  <Plus size={14} /> Add URL
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                  Primary Thumbnail Image URL (Hero 3D Box &amp; Store Cards)
                </label>
                <input
                  type="url"
                  placeholder="Auto-filled from first uploaded image, or paste URL"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-cyan-300 font-mono"
                />
              </div>

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {formData.photos.map((url, idx) => {
                    const isThumb = formData.thumbnail === url;
                    return (
                      <div
                        key={idx}
                        className={`relative rounded-xl overflow-hidden border bg-[#0e0d22] group ${isThumb ? "border-yellow-400 ring-2 ring-yellow-400/30" : "border-white/10"
                          }`}
                      >
                        <img src={url} alt={`Product ${idx + 1}`} className="w-full h-28 object-cover" />
                        <div className="p-2 flex items-center justify-between gap-1 bg-black/60">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, thumbnail: url })}
                            className={`text-[10px] font-bold flex items-center gap-1 ${isThumb ? "text-yellow-300" : "text-gray-300 hover:text-white"
                              }`}
                          >
                            <Star size={11} fill={isThumb ? "currentColor" : "none"} />
                            <span>{isThumb ? "Thumbnail" : "Set Thumb"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </AdminCard>
        )}

        {/* TAB 3: WHAT'S INSIDE SECTION */}
        {activeTab === "whats-inside" && (
          <AdminCard title="What's Inside Section (Categories & Key Cards)">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                  Section Intro / Full Description
                </label>
                <textarea
                  rows={3}
                  placeholder="A complete educational library covering every aspect of early childhood learning..."
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                <span className="text-xs text-[#A7A3BC]">
                  Add cards shown in the &quot;What&apos;s Inside&quot; 3-column grid.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        features: prev.features.map((f) => ({
                          ...f,
                          icon: autoGenerateIcon(f.title, f.description),
                        })),
                      }))
                    }
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold text-amber-300 flex items-center gap-1"
                  >
                    <Wand2 size={13} /> Auto-Generate Icons
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        features: [
                          ...prev.features,
                          { icon: "✨", title: "New Category", description: "Short description for this card" },
                        ],
                      }))
                    }
                    className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white flex items-center gap-1"
                  >
                    <Plus size={13} /> Add Card
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {formData.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0e0d22] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300">Card #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            features: formData.features.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4 sm:col-span-3 flex gap-1">
                        <input
                          type="text"
                          value={feat.icon || ""}
                          onChange={(e) => {
                            const updated = [...formData.features];
                            updated[idx].icon = e.target.value;
                            setFormData({ ...formData, features: updated });
                          }}
                          placeholder="🔤"
                          className="w-full px-2 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-center text-white"
                        />
                        <button
                          type="button"
                          title="Auto-generate icon from title"
                          onClick={() => {
                            const updated = [...formData.features];
                            updated[idx].icon = autoGenerateIcon(feat.title, feat.description);
                            setFormData({ ...formData, features: updated });
                          }}
                          className="px-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs"
                        >
                          <Wand2 size={12} />
                        </button>
                      </div>
                      <div className="col-span-8 sm:col-span-9">
                        <input
                          type="text"
                          value={feat.title}
                          onChange={(e) => {
                            const updated = [...formData.features];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, features: updated });
                          }}
                          placeholder="Category / Feature Title"
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-semibold"
                        />
                      </div>
                    </div>
                    <textarea
                      rows={2}
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...formData.features];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, features: updated });
                      }}
                      placeholder="Short description"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 4: WHY CHOOSE THIS BUNDLE? */}
        {activeTab === "why-choose" && (
          <div className="space-y-6">
            <AdminCard title="Why Choose This Bundle? (Benefit Cards)">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/5">
                  <span className="text-xs text-[#A7A3BC]">
                    Highlight bundle benefits (e.g. 11,000+ Worksheets, Age 2–10, Instant Access).
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          whatsIncluded: prev.whatsIncluded.map((w) => ({
                            ...w,
                            format: autoGenerateIcon(w.title, w.description),
                          })),
                        }))
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold text-amber-300 flex items-center gap-1"
                    >
                      <Wand2 size={13} /> Auto-Generate Icons
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          whatsIncluded: [
                            ...prev.whatsIncluded,
                            { title: "New Benefit", description: "Explain the value", format: "🎯", count: "Included" },
                          ],
                        }))
                      }
                      className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Benefit Card
                    </button>
                  </div>
                </div>

                {formData.whatsIncluded.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0e0d22] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-300">Benefit #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            whatsIncluded: formData.whatsIncluded.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={item.format}
                        onChange={(e) => {
                          const updated = [...formData.whatsIncluded];
                          updated[idx].format = e.target.value;
                          setFormData({ ...formData, whatsIncluded: updated });
                        }}
                        placeholder="Icon/Badge (e.g. 📄)"
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...formData.whatsIncluded];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, whatsIncluded: updated });
                        }}
                        placeholder="Benefit Title"
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-semibold"
                      />
                      <input
                        type="text"
                        value={item.count}
                        onChange={(e) => {
                          const updated = [...formData.whatsIncluded];
                          updated[idx].count = e.target.value;
                          setFormData({ ...formData, whatsIncluded: updated });
                        }}
                        placeholder="Tag (e.g. Lifetime)"
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...formData.whatsIncluded];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, whatsIncluded: updated });
                      }}
                      placeholder="Short description"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </AdminCard>

            <AdminCard title="Perfect For Everyone (Target Audience Pills)">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs text-[#A7A3BC]">Who this product is made for.</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        targetAudienceList: [...formData.targetAudienceList, "New Audience"],
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white flex items-center gap-1"
                  >
                    <Plus size={13} /> Add Audience
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {formData.targetAudienceList.map((aud, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={aud}
                        onChange={(e) => {
                          const updated = [...formData.targetAudienceList];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, targetAudienceList: updated });
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-[#0e0d22] border border-white/10 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            targetAudienceList: formData.targetAudienceList.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* TAB 5: CTA & FAQs */}
        {activeTab === "cta-faq" && (
          <div className="space-y-6">
            <AdminCard title="CTA Button & Checkout Guarantee">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Custom CTA Button Label (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Leave blank for default: 🛒 BUY NOW — Only ₹199"
                    value={formData.adCopy.callToAction}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, callToAction: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Guarantee &amp; Trust Line (Under CTA Button)
                  </label>
                  <input
                    type="text"
                    value={formData.guaranteeText}
                    onChange={(e) => setFormData({ ...formData, guaranteeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>
            </AdminCard>

            <AdminCard title="Frequently Asked Questions (FAQs)">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs text-[#A7A3BC]">Add expandable FAQ items.</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        faqs: [...prev.faqs, { question: "New Question?", answer: "Clear answer here." }],
                      }))
                    }
                    className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-xs font-semibold text-white flex items-center gap-1"
                  >
                    <Plus size={13} /> Add FAQ
                  </button>
                </div>

                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0e0d22] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300">FAQ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            faqs: formData.faqs.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={14} />
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
                      placeholder="Question"
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
                      placeholder="Answer"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </AdminCard>
          </div>
        )}

        {/* TAB 6: CUSTOM SECTIONS */}
        {activeTab === "custom" && (
          <AdminCard title="Custom Sections (Images, Videos, Text or Links)">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <p className="text-xs text-[#A7A3BC]">
                  Add extra custom showcase sections (sample pages, walkthrough videos, or info blocks).
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
                          title: "Sample Worksheet Preview",
                          fieldType: "image",
                          layout: "card",
                          content: "",
                          mediaUrl: "",
                          images: [],
                          buttonLabel: "Open Resource",
                        },
                      ],
                    }))
                  }
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
                >
                  <Plus size={14} /> Add Custom Section
                </button>
              </div>

              {formData.customSections.length === 0 && (
                <div className="p-6 rounded-xl bg-[#0e0d22] border border-dashed border-white/10 text-center text-xs text-gray-400">
                  No custom sections added yet.
                </div>
              )}

              {formData.customSections.map((sec, idx) => (
                <div key={sec.id || idx} className="p-4 rounded-xl bg-[#0e0d22] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">Custom Section #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          customSections: prev.customSections.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-gray-400 hover:text-red-400"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => {
                        const updated = [...formData.customSections];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setFormData({ ...formData, customSections: updated });
                      }}
                      placeholder="Section Title"
                      className="sm:col-span-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-semibold"
                    />
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
                      className="px-3 py-2 rounded-lg bg-[#17152E] border border-white/10 text-xs text-white"
                    >
                      <option value="image">Image Showcase</option>
                      <option value="video">Video (YouTube / Vimeo / MP4)</option>
                      <option value="text">Text Block</option>
                      <option value="link">External Link Button</option>
                    </select>
                    <select
                      value={sec.layout || "card"}
                      onChange={(e) => {
                        const updated = [...formData.customSections];
                        updated[idx] = {
                          ...updated[idx],
                          layout: e.target.value as "card" | "split-left" | "split-right" | "banner" | "gallery",
                        };
                        setFormData({ ...formData, customSections: updated });
                      }}
                      className="px-3 py-2 rounded-lg bg-[#17152E] border border-white/10 text-xs text-purple-300 font-semibold"
                    >
                      <option value="card">Layout: Card</option>
                      <option value="split-left">Layout: Image Left + Text</option>
                      <option value="split-right">Layout: Text Left + Image</option>
                      <option value="banner">Layout: Full-Width Banner</option>
                      <option value="gallery">Layout: Multi-Image Gallery</option>
                    </select>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Section text / description..."
                    value={sec.content}
                    onChange={(e) => {
                      const updated = [...formData.customSections];
                      updated[idx] = { ...updated[idx], content: e.target.value };
                      setFormData({ ...formData, customSections: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                  />

                  {sec.fieldType === "image" && (
                    <div className="space-y-3">
                      <ImageDropzone
                        label="Drag & drop section image(s) here, or click to upload"
                        onUploadComplete={(urls) => {
                          setFormData((prev) => {
                            const updated = [...prev.customSections];
                            const existingImages = updated[idx].images || [];
                            updated[idx] = {
                              ...updated[idx],
                              mediaUrl: updated[idx].mediaUrl || urls[0] || "",
                              images: [...existingImages, ...urls],
                            };
                            return { ...prev, customSections: updated };
                          });
                        }}
                      />

                      {((sec.images && sec.images.length > 0) || sec.mediaUrl) && (
                        <div className="flex flex-wrap gap-2">
                          {(sec.images && sec.images.length > 0 ? sec.images : [sec.mediaUrl]).map((imgUrl, imgIdx) => (
                            <div key={imgIdx} className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/15 bg-black">
                              <img src={imgUrl} alt={`Section preview ${imgIdx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...formData.customSections];
                                  const nextImgs = (updated[idx].images || []).filter((_, i) => i !== imgIdx);
                                  updated[idx] = {
                                    ...updated[idx],
                                    images: nextImgs,
                                    mediaUrl: updated[idx].mediaUrl === imgUrl ? nextImgs[0] || "" : updated[idx].mediaUrl,
                                  };
                                  setFormData({ ...formData, customSections: updated });
                                }}
                                className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full p-0.5 hover:bg-red-500"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {sec.fieldType !== "text" && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="url"
                        placeholder="Media or Link URL (https://...)"
                        value={sec.mediaUrl}
                        onChange={(e) => {
                          const updated = [...formData.customSections];
                          updated[idx] = { ...updated[idx], mediaUrl: e.target.value };
                          setFormData({ ...formData, customSections: updated });
                        }}
                        className={`px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 ${sec.fieldType === "link" ? "" : "sm:col-span-2"
                          }`}
                      />
                      {sec.fieldType === "link" && (
                        <input
                          type="text"
                          placeholder="Button Label"
                          value={sec.buttonLabel}
                          onChange={(e) => {
                            const updated = [...formData.customSections];
                            updated[idx] = { ...updated[idx], buttonLabel: e.target.value };
                            setFormData({ ...formData, customSections: updated });
                          }}
                          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AdminCard>
        )}

        {/* TAB 7: META ADS & SOCIAL MEDIA */}
        {activeTab === "meta-social" && (
          <div className="space-y-6">
            <AdminCard title="Meta Ads Campaign Copy & Creative (Drag & Drop)">
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Meta Ad Headline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Automate Everything with 5,000+ n8n Workflows"
                      value={formData.adCopy.headline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adCopy: { ...formData.adCopy, headline: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      3-Second Scroll-Stopper Hook
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Stop building automations from scratch!"
                      value={formData.adCopy.hook}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adCopy: { ...formData.adCopy, hook: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Primary Ad Copy (Facebook / Instagram Feed Text)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write compelling Meta Ad primary text with emojis & CTA..."
                    value={formData.adCopy.primaryText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, primaryText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                    Meta Ads Target Audience Interests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Entrepreneurs, Digital Marketing, SaaS, AI Tools, Automation"
                    value={formData.adCopy.targetAudience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adCopy: { ...formData.adCopy, targetAudience: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="pt-2 border-t border-white/10 space-y-3">
                  <label className="block text-xs font-semibold text-white">
                    Meta Ad Creative Banners / Square Images (Drag &amp; Drop)
                  </label>
                  <ImageDropzone
                    label="Drag & drop Meta Ad images (1:1 or 4:5), or click to browse"
                    onUploadComplete={(urls) => {
                      setFormData((prev) => ({
                        ...prev,
                        adCopy: {
                          ...prev.adCopy,
                          adMediaUrl: prev.adCopy.adMediaUrl || urls[0] || "",
                          adImages: [...(prev.adCopy.adImages || []), ...urls],
                        },
                      }));
                    }}
                  />

                  {formData.adCopy.adImages && formData.adCopy.adImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      {formData.adCopy.adImages.map((imgUrl, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border border-white/15 bg-[#0e0d22]">
                          <img src={imgUrl} alt={`Ad creative ${idx + 1}`} className="w-full h-24 object-cover" />
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
                            className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 hover:bg-red-500"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Featured Ad Video / Main Creative URL (YouTube, Vimeo, MP4 or Image)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.adCopy.adMediaUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adCopy: { ...formData.adCopy, adMediaUrl: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs font-mono text-cyan-300"
                    />
                  </div>
                </div>
              </div>
            </AdminCard>

            <AdminCard title="Social Media Share Preview & Quick Links">
              <div className="space-y-4">
                <div className="rounded-2xl bg-[#0e0d22] border border-white/10 overflow-hidden max-w-md">
                  {(formData.adCopy.adImages?.[0] || formData.thumbnail) && (
                    <img
                      src={formData.adCopy.adImages?.[0] || formData.thumbnail}
                      alt="Social preview"
                      className="w-full h-44 object-cover"
                    />
                  )}
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1">
                      <Share2 size={11} /> elvordigital.com/product/{formData.slug || "your-product"}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {formData.adCopy.headline || formData.name || "Your Product Title"}
                    </h4>
                    <p className="text-xs text-[#A7A3BC] line-clamp-2">
                      {formData.shortDescription || formData.tagline || "Product description preview for WhatsApp, Facebook & LinkedIn."}
                    </p>
                    <div className="pt-1 text-xs font-black text-emerald-400">
                      ₹{formData.price} {formData.originalPrice > formData.price ? `(Save ₹${formData.originalPrice - formData.price})` : ""}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const url = `${window.location.origin}/product/${formData.slug || ""}`;
                      navigator.clipboard?.writeText(url);
                      alert(`Copied Product URL: ${url}`);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white flex items-center gap-1.5"
                  >
                    <Copy size={13} /> Copy Product URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = `${window.location.origin}/checkout?product=${formData.slug || ""}`;
                      navigator.clipboard?.writeText(url);
                      alert(`Copied Direct Checkout URL: ${url}`);
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-xs font-semibold text-purple-200 flex items-center gap-1.5"
                  >
                    <Copy size={13} /> Copy Direct Meta-Ad Checkout URL
                  </button>
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* Bottom Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-sm font-black shadow-lg"
          >
            {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            <span>Publish Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
