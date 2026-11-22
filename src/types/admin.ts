import { Product, ProductCategory } from "@/types";

export type AdminRole =
  | "OWNER"
  | "SUPER_ADMIN"
  | "PRODUCT_MANAGER"
  | "ORDER_MANAGER"
  | "MARKETING_MANAGER"
  | "SUPPORT_AGENT";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "inactive";
  avatar: string;
  lastLogin: string;
}

export type ProductStatus = "draft" | "published" | "unpublished" | "archived";

export interface AdminProduct extends Product {
  sku: string;
  status: ProductStatus;
  totalSales: number;
  totalRevenue: number;
  createdAt: string;
  updatedAt: string;
  downloadUrl?: string;
  fileType?: string;
  fileSizeStr?: string;
  version?: string;
  licenseType?: string;
}

export interface LandingPageSection {
  id: string;
  type:
    | "hero"
    | "overview"
    | "features"
    | "benefits"
    | "whatsIncluded"
    | "gallery"
    | "videoPreview"
    | "bonuses"
    | "pricing"
    | "testimonials"
    | "faqs"
    | "relatedProducts"
    | "finalCta"
    | "footer";
  title: string;
  subtitle?: string;
  enabled: boolean;
  content: Record<string, unknown>;
}

export interface LandingPageConfig {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  views: number;
  conversions: number;
  conversionRate: number;
  lastUpdated: string;
  sections: LandingPageSection[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  totalOrders: number;
  totalSpending: number;
  productsOwned: string[]; // product IDs
  status: "active" | "blocked";
  isEmailVerified: boolean;
  avatar: string;
  notes: string[];
}

export type AccessStatus = "active" | "pending" | "expired" | "revoked" | "suspended";
export type AccessType = "purchase" | "complimentary" | "promotional" | "subscription";

export interface AccessRecord {
  id: string;
  customerEmail: string;
  customerName: string;
  productId: string;
  productName: string;
  orderId: string;
  purchaseDate: string;
  status: AccessStatus;
  expiryDate: string; // or "Lifetime"
  downloadLimit: number;
  downloadCount: number;
  accessType: AccessType;
  adminNote?: string;
  lastAccessed?: string;
}

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "partially_refunded";

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  format: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderDate: string;
  accessStatus: "granted" | "pending" | "revoked";
  paymentMethod: string;
  couponUsed?: string;
  adminNotes?: string[];
  timeline: { title: string; time: string; description: string }[];
}

export interface PaymentRecord {
  id: string;
  transactionId: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  paymentMethod: "UPI" | "Credit/Debit Card" | "Netbanking" | "Razorpay" | "Stripe";
  paymentDate: string;
  status: "success" | "pending" | "failed" | "refunded";
  gatewayFee?: number;
}

export interface RefundRecord {
  id: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  reason: string;
  requestedDate: string;
  processedDate?: string;
  status: "pending" | "approved" | "rejected";
  adminNote?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  applicableCategory?: ProductCategory | "all";
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usageCount: number;
  status: "active" | "inactive";
  expiryDate: string;
  createdAt: string;
}

export interface DigitalAsset {
  id: string;
  name: string;
  fileName: string;
  fileType: "PDF" | "ZIP" | "DOCX" | "PPTX" | "XLSX" | "MP4" | "PNG" | "JPG";
  fileSize: string;
  version: string;
  associatedProductId: string;
  associatedProductName: string;
  uploadDate: string;
  downloadCount: number;
  status: "active" | "archived";
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerEmail: string;
  customerName: string;
  subject: string;
  productName: string;
  issueType: "Download Issue" | "Course Access" | "Billing / Payment" | "License Key" | "General Question";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "waiting" | "resolved" | "closed";
  createdAt: string;
  assignedTo?: string;
  responses: { sender: string; role: "customer" | "admin"; message: string; timestamp: string }[];
  internalNotes?: string[];
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  clicks: number;
  conversions: number;
  totalSales: number;
  commissionPercentage: number;
  commissionEarned: number;
  pendingPayout: number;
  status: "active" | "pending" | "suspended";
  joinedDate: string;
}

export interface AbandonedCart {
  id: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  cartValue: number;
  lastActivity: string;
  status: "abandoned" | "recovered" | "followup_sent";
  followupDraft?: string;
}

export interface Subscription {
  id: string;
  customerEmail: string;
  customerName: string;
  planName: string;
  billingCycle: "monthly" | "yearly";
  amount: number;
  status: "active" | "cancelled" | "expired";
  startDate: string;
  renewalDate: string;
}

export interface SoftwareLicense {
  id: string;
  licenseKey: string;
  customerEmail: string;
  productName: string;
  activationDate: string;
  expiryDate: string;
  status: "active" | "expired" | "revoked";
  deviceLimit: number;
  devicesUsed: number;
}

export interface AdminReview {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: "approved" | "pending" | "rejected";
  isFeatured: boolean;
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  module: string;
  timestamp: string;
  details: string;
}

export interface StoreSettings {
  general: {
    storeName: string;
    storeDescription: string;
    supportEmail: string;
    currency: string;
    currencySymbol: string;
    timeZone: string;
  };
  branding: {
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
  checkout: {
    enableDemoMode: boolean;
    requirePhone: boolean;
    autoGrantAccessOnPaid: boolean;
    taxPercentage: number;
  };
  emailTemplates: {
    orderConfirmationSubject: string;
    accessInvitationSubject: string;
    refundNoticeSubject: string;
  };
  integrations: {
    razorpayKeyPlaceholder: string;
    stripeKeyPlaceholder: string;
    emailServicePlaceholder: string;
    cloudStoragePlaceholder: string;
    analyticsPlaceholder: string;
  };
}

export type EmailProviderType = "smtp" | "resend" | "sendgrid" | "ses" | "mailgun" | "postmark";

export interface EmailSmtpConfig {
  provider: EmailProviderType;
  host: string;
  port: number;
  encryption: "tls" | "ssl" | "none";
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
  replyToEmail: string;
  isVerified: boolean;
}

export interface EmailTemplateConfig {
  id: string;
  name: string;
  description: string;
  subject: string;
  preheader: string;
  heading: string;
  body: string;
  ctaText: string;
  ctaUrl: string;
  ctaColor: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  recipientName: string;
  templateId: string;
  templateName: string;
  subject: string;
  sentAt: string;
  status: "delivered" | "sent" | "bounced" | "queued";
}
