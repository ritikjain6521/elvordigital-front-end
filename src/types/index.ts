export type ProductCategory =
  | "ebooks-guides"
  | "ai-prompts"
  | "meta-ads-courses"
  | "templates"
  | "software-tools";

export interface CategoryInfo {
  id: ProductCategory;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  color: string;
  accentColor: string;
}

export interface ProductBonus {
  title: string;
  description: string;
  demoValue: string;
  iconName?: string;
}

export interface ProductDeliverable {
  title: string;
  description: string;
  format: string;
  count?: string;
}

export interface ComparisonRow {
  feature: string;
  elvora: string | boolean;
  standard: string | boolean;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge?: "Bestseller" | "New" | "Featured" | "Popular" | "54% OFF" | "Free";
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isFree?: boolean;
  productFormat: string;
  compatibility: string;
  fileSize?: string;
  features: string[];
  whatsIncluded: ProductDeliverable[];
  bonuses: ProductBonus[];
  learningOutcomes?: string[];
  comparison?: ComparisonRow[];
  faqs: ProductFAQ[];
  accentGradient: string;
  previewUrl?: string;
  tagline?: string;
  photos?: string[];
  thumbnail?: string;
  googleDriveLink?: string;
  accessFolderLink?: string;
  videoLink?: string;
  downloadFileUrl?: string;
  deliverablesText?: string[];
  adCopy?: {
    headline?: string;
    hook?: string;
    primaryText?: string;
    callToAction?: string;
    targetAudience?: string;
    adMediaUrl?: string;
  };
  curriculum?: Array<{
    title: string;
    duration?: string;
    lessons?: string[];
  }>;
  targetAudienceList?: string[];
  requirements?: string[];
  guaranteeText?: string;
  urgencyNotice?: string;
  reviews?: Array<{
    author: string;
    rating: number;
    title?: string;
    comment: string;
    date?: string;
    verified?: boolean;
  }>;
}

export interface DemoTestimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
