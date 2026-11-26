import { Product, ProductCategory, CategoryInfo } from "@/types";
import { CATEGORIES } from "@/data/categories";

import { API_BASE as _API_BASE } from "@/lib/api";
const API_BASE = _API_BASE;

function mapMongoToProduct(p: any): Product {
  const whatsIncluded =
    Array.isArray(p.whatsIncluded) && p.whatsIncluded.length > 0
      ? p.whatsIncluded
      : Array.isArray(p.deliverables) && p.deliverables.length > 0
      ? p.deliverables.map((d: string) => ({
          title: d,
          description: "Full master asset included in package",
          format: p.fileType || "ZIP / Video",
          count: "1 Item",
        }))
      : [
          {
            title: "Master Course & Resource Pack",
            description: "Direct cloud access and video materials",
            format: "ZIP / MP4",
            count: "Full Vault",
          },
        ];

  const bonuses =
    Array.isArray(p.bonuses) && p.bonuses.length > 0
      ? p.bonuses.map((b: any) => ({
          title: b.title,
          description: b.description || "Exclusive marketing bonus asset",
          demoValue: b.demoValue || b.value || "₹1,999",
        }))
      : [];

  const features =
    Array.isArray(p.features) && p.features.length > 0
      ? p.features.map((f: any) =>
          typeof f === "string"
            ? f
            : {
                title: f.title || "",
                description: f.description || "",
                icon: f.icon || "",
              }
        )
      : ["Instant Digital Access", "Step-by-Step Training", "Lifetime Cloud Updates"];

  const faqs =
    Array.isArray(p.faqs) && p.faqs.length > 0
      ? p.faqs.map((faq: any) => ({
          question: faq.question,
          answer: faq.answer,
        }))
      : [
          {
            question: "How do I access this product after purchasing?",
            answer:
              "You will be immediately redirected to the access portal with direct Google Drive links, and an email confirmation will also be sent with full download credentials.",
          },
        ];

  const photos = Array.isArray(p.photos) ? p.photos : [];

  return {
    id: String(p._id || p.id),
    slug: p.slug,
    name: p.name,
    category: (p.category || "meta-ads-courses") as ProductCategory,
    categoryName: p.categoryName || p.category,
    tagline: p.tagline || "",
    shortDescription: p.shortDescription || "",
    fullDescription: p.fullDescription || "",
    price: Number(p.price || 499),
    originalPrice: Number(p.originalPrice || 1099),
    rating: Number(p.rating || 5.0),
    reviewsCount: Number(p.reviewsCount || 1),
    badge: p.badge || "Featured",
    isBestSeller: Boolean(p.isBestSeller),
    isNewArrival: Boolean(p.isNewArrival),
    isFeatured: Boolean(p.isFeatured),
    isFree: Boolean(p.isFree),
    productFormat: p.productFormat || "Digital Download + Video Course",
    compatibility: p.compatibility || "Web & Mobile Cloud Storage",
    fileSize: p.fileSize || "Cloud Vault",
    features,
    whatsIncluded,
    deliverablesText: Array.isArray(p.deliverables) ? p.deliverables : [],
    bonuses,
    faqs,
    photos,
    thumbnail: p.thumbnail || photos[0],
    googleDriveLink: p.googleDriveLink || "",
    accessFolderLink: p.accessFolderLink || "",
    videoLink: p.videoLink || "",
    downloadFileUrl: p.downloadFileUrl || "",
    accentGradient: p.accentGradient || "from-purple-600 to-pink-500",
    learningOutcomes: p.learningOutcomes || [
      "Launch profitable, scalable digital marketing campaigns",
      "Avoid common ad spend waste and optimize CPA & ROAS",
      "Master modern 2026 AI targeting algorithms and creative hooks",
    ],
    comparison: p.comparison || [
      { feature: "2026 Algorithm Training", elvora: true, standard: false },
      { feature: "Done-for-you Swipe Files", elvora: true, standard: false },
      { feature: "Direct Google Drive Vault Access", elvora: true, standard: false },
    ],
    adCopy: p.adCopy || undefined,
    customSections: Array.isArray(p.customSections) ? p.customSections : [],
    curriculum: p.curriculum || undefined,
    targetAudienceList: p.targetAudienceList || undefined,
    requirements: p.requirements || undefined,
    guaranteeText: p.guaranteeText || undefined,
    urgencyNotice: p.urgencyNotice || undefined,
    reviews: Array.isArray(p.reviews)
      ? p.reviews.map((r: any) => ({
          author: r.author,
          rating: Number(r.rating || 5),
          title: r.title || "",
          comment: r.comment || "",
          date: r.date
            ? new Date(r.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Recently",
          verified: r.verified !== false,
        }))
      : [],
  };
}

export async function fetchLiveProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        return data.products
          .filter((p: any) => !p.status || p.status === "published")
          .map(mapMongoToProduct);
      }
    }
  } catch {
    // Backend unreachable
  }
  return [];
}

export async function fetchLiveProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/api/products/${slug}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.product) {
        return mapMongoToProduct(data.product);
      }
    }
  } catch {
    // Backend unreachable
  }
  return null;
}
