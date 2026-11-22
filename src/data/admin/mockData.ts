import {
  AdminProduct,
  Customer,
  Order,
  AccessRecord,
  PaymentRecord,
  RefundRecord,
  Coupon,
  DigitalAsset,
  SupportTicket,
  Affiliate,
  AbandonedCart,
  Subscription,
  SoftwareLicense,
  AdminReview,
  AuditLog,
  AdminUser,
  LandingPageConfig,
  StoreSettings,
  EmailSmtpConfig,
  EmailTemplateConfig,
  EmailLog,
} from "@/types/admin";
import { PRODUCTS } from "@/data/products";

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-admin",
    name: "ZenovaVibe Chief Admin",
    email: "admin@zenovavibe.com",
    role: "OWNER",
    status: "active",
    avatar: "ZA",
    lastLogin: "Just now",
  },
];

// Product catalog preserved as requested
export const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = PRODUCTS.map((p, index) => ({
  ...p,
  sku: `ZNV-${p.category.substring(0, 3).toUpperCase()}-${100 + index}`,
  status: "published" as AdminProduct["status"],
  totalSales: 0,
  totalRevenue: 0,
  createdAt: "2026-01-10",
  updatedAt: new Date().toISOString().split("T")[0],
  downloadUrl: `/api/download/${p.slug}`,
  fileType: p.productFormat.includes("Video") ? "MP4" : p.productFormat.includes("Notion") ? "ZIP" : "PDF",
  fileSizeStr: p.fileSize || "Cloud Vault",
  version: "2026.1",
  licenseType: "Commercial Creator License",
}));

// All mock data wiped clean – only real-time database records will be populated
export const INITIAL_CUSTOMERS: Customer[] = [];
export const INITIAL_ORDERS: Order[] = [];
export const INITIAL_ACCESS_RECORDS: AccessRecord[] = [];
export const INITIAL_PAYMENTS: PaymentRecord[] = [];
export const INITIAL_REFUNDS: RefundRecord[] = [];
export const INITIAL_COUPONS: Coupon[] = [];
export const INITIAL_DIGITAL_ASSETS: DigitalAsset[] = [];
export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [];
export const INITIAL_AFFILIATES: Affiliate[] = [];
export const INITIAL_ABANDONED_CARTS: AbandonedCart[] = [];
export const INITIAL_SUBSCRIPTIONS: Subscription[] = [];
export const INITIAL_LICENSES: SoftwareLicense[] = [];
export const INITIAL_REVIEWS: AdminReview[] = [];
export const INITIAL_AUDIT_LOGS: AuditLog[] = [];
export const INITIAL_EMAIL_LOGS: EmailLog[] = [];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  general: {
    storeName: "ZenovaVibe Marketplace",
    storeDescription: "Discover. Download. Create. Grow.",
    supportEmail: "support@zenovavibe.com",
    currency: "INR",
    currencySymbol: "₹",
    timeZone: "Asia/Kolkata",
  },
  branding: {
    primaryColor: "#8B5CF6",
    accentColor: "#EC4899",
    fontFamily: "Inter, sans-serif",
  },
  checkout: {
    enableDemoMode: false,
    requirePhone: true,
    autoGrantAccessOnPaid: true,
    taxPercentage: 0,
  },
  emailTemplates: {
    orderConfirmationSubject: "⚡ Order Confirmed - ZenovaVibe",
    accessInvitationSubject: "⚡ Your Digital Access Is Ready",
    refundNoticeSubject: "Refund Processed - ZenovaVibe",
  },
  integrations: {
    razorpayKeyPlaceholder: "rzp_test_U3IdhaFcjzNry8",
    stripeKeyPlaceholder: "",
    emailServicePlaceholder: "smtp.gmail.com",
    cloudStoragePlaceholder: "Google Drive Master Vault",
    analyticsPlaceholder: "MongoDB Live Analytics Engine",
  },
};

export const INITIAL_LANDING_PAGES: LandingPageConfig[] = [
  {
    id: "lp-meta-ads",
    productId: "meta-ads-mastery-2026",
    productSlug: "meta-ads-mastery-2026",
    productName: "META ADS MASTERY 2026 – PRO EDITION",
    title: "META ADS MASTERY 2026 – PRO EDITION",
    slug: "meta-ads-mastery-2026",
    status: "published",
    views: 0,
    conversions: 0,
    conversionRate: 0,
    lastUpdated: new Date().toISOString().split("T")[0],
    sections: [],
  },
];

export const DEFAULT_EMAIL_SMTP_CONFIG: EmailSmtpConfig = {
  provider: "smtp",
  host: "smtp.gmail.com",
  port: 465,
  encryption: "ssl",
  username: "ritikjain6224@gmail.com",
  password: "ylvbepioygkccqta",
  fromName: "ZenovaVibe Access",
  fromEmail: "ritikjain6224@gmail.com",
  replyToEmail: "ritikjain6224@gmail.com",
  isVerified: true,
};

export const DEFAULT_EMAIL_TEMPLATES: EmailTemplateConfig[] = [
  {
    id: "access_grant",
    name: "Digital Product Access & Library Invite",
    description: "Dispatched instantly upon confirmed payment. Delivers Google Drive folder, vault portal, and master download credentials.",
    subject: "⚡ Your Digital Access Is Ready: {{product_name}} [Order #{{order_number}}]",
    preheader: "Access your files, video lessons, and bonuses inside.",
    heading: "Your Digital Product Is Ready!",
    body: "Hi {{customer_name}},\n\nThank you for choosing ZenovaVibe! Your order {{order_number}} has been verified.\n\nClick the links below to access your Google Drive folder and download your files.",
    ctaText: "Open Google Drive Access",
    ctaUrl: "http://localhost:3000/vault/{{product_slug}}",
    ctaColor: "#8B5CF6",
  },
  {
    id: "order_confirmation",
    name: "Order Confirmation & Tax Invoice",
    description: "Official purchase receipt including itemized billing and transaction hash.",
    subject: "Receipt for Order {{order_number}} [ZenovaVibe]",
    preheader: "Your payment of ₹{{amount}} has been confirmed.",
    heading: "Thank you for your purchase!",
    body: "Hi {{customer_name}},\n\nWe have received your payment of ₹{{amount}} for order {{order_number}}.\n\nA digital invoice is attached and your product files have been provisioned.",
    ctaText: "View Order",
    ctaUrl: "http://localhost:3000/order-success/{{order_number}}",
    ctaColor: "#6366F1",
  },
];
