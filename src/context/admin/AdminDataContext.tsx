"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  AdminRole,
  EmailSmtpConfig,
  EmailTemplateConfig,
  EmailLog,
} from "@/types/admin";
import {
  INITIAL_ADMIN_USERS,
  INITIAL_ADMIN_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_ACCESS_RECORDS,
  INITIAL_PAYMENTS,
  INITIAL_REFUNDS,
  INITIAL_COUPONS,
  INITIAL_DIGITAL_ASSETS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_AFFILIATES,
  INITIAL_ABANDONED_CARTS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_LICENSES,
  INITIAL_REVIEWS,
  INITIAL_AUDIT_LOGS,
  INITIAL_STORE_SETTINGS,
  INITIAL_LANDING_PAGES,
  DEFAULT_EMAIL_SMTP_CONFIG,
  DEFAULT_EMAIL_TEMPLATES,
  INITIAL_EMAIL_LOGS,
} from "@/data/admin/mockData";
import { API_BASE } from "@/lib/api";

interface AdminDataContextType {
  // Current user & role
  currentUser: AdminUser;
  setCurrentUserRole: (role: AdminRole) => void;
  adminUsers: AdminUser[];
  addAdminUser: (user: Omit<AdminUser, "id" | "lastLogin">) => void;
  toggleAdminUserStatus: (id: string) => void;

  // Products
  products: AdminProduct[];
  addProduct: (product: Omit<AdminProduct, "id" | "totalSales" | "totalRevenue" | "createdAt" | "updatedAt">) => void;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => Promise<void>;
  togglePublishProduct: (id: string) => Promise<void>;

  // Landing Pages
  landingPages: LandingPageConfig[];
  updateLandingPage: (id: string, updates: Partial<LandingPageConfig>) => Promise<void>;
  createLandingPage: (lp: Omit<LandingPageConfig, "id"> & { id?: string }) => Promise<LandingPageConfig | null>;
  deleteLandingPage: (id: string) => Promise<void>;

  // Customers
  customers: Customer[];
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  toggleBlockCustomer: (id: string) => void;
  addCustomerNote: (id: string, note: string) => void;
  deleteCustomer: (id: string, email: string) => Promise<void>;

  // Orders
  orders: Order[];
  updateOrderStatus: (id: string, status: Order["paymentStatus"]) => void;
  recordOrderRefund: (orderId: string, amount: number, reason: string) => void;
  deleteOrder: (id: string) => Promise<void>;

  // Access / Entitlements
  accessRecords: AccessRecord[];
  grantAccess: (record: Omit<AccessRecord, "id" | "purchaseDate" | "downloadCount">) => void;
  revokeAccess: (id: string, reason?: string) => void;
  restoreAccess: (id: string) => void;
  extendAccess: (id: string, newDate: string) => void;
  deleteAccessRecord: (id: string) => Promise<void>;

  // Digital Assets
  digitalAssets: DigitalAsset[];
  addDigitalAsset: (asset: Omit<DigitalAsset, "id" | "uploadDate" | "downloadCount">) => void;
  deleteDigitalAsset: (id: string) => void;

  // Payments & Refunds
  payments: PaymentRecord[];
  refunds: RefundRecord[];
  processRefund: (refundId: string, action: "approve" | "reject", note?: string) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, "id" | "usageCount" | "createdAt">) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;

  // Reviews
  reviews: AdminReview[];
  updateReviewStatus: (id: string, status: "approved" | "rejected") => void;
  toggleFeaturedReview: (id: string) => void;
  deleteReview: (id: string) => void;

  // Support Tickets
  tickets: SupportTicket[];
  updateTicketStatus: (id: string, status: SupportTicket["status"]) => void;
  addTicketResponse: (id: string, message: string) => void;
  deleteTicket: (id: string) => void;

  // Marketing & Affiliates
  affiliates: Affiliate[];
  abandonedCarts: AbandonedCart[];
  subscriptions: Subscription[];
  licenses: SoftwareLicense[];

  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (action: string, module: string, details: string) => void;

  // Store Settings
  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;

  // Email Configuration & Automation
  emailSmtpConfig: EmailSmtpConfig;
  updateEmailSmtpConfig: (config: Partial<EmailSmtpConfig>) => void;
  emailTemplates: EmailTemplateConfig[];
  updateEmailTemplate: (id: string, updates: Partial<EmailTemplateConfig>) => void;
  emailLogs: EmailLog[];
  sendTestEmail: (recipient: string) => Promise<{ success: boolean; log: string[] }>;
  resendEmail: (logId: string) => void;

  // Reset to default
  resetDemoData: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AdminUser>(INITIAL_ADMIN_USERS[0]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [landingPages, setLandingPages] = useState<LandingPageConfig[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [accessRecords, setAccessRecords] = useState<AccessRecord[]>([]);
  const [digitalAssets, setDigitalAssets] = useState<DigitalAsset[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [refunds, setRefunds] = useState<RefundRecord[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [licenses, setLicenses] = useState<SoftwareLicense[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_STORE_SETTINGS);
  const [emailSmtpConfig, setEmailSmtpConfig] = useState<EmailSmtpConfig>(DEFAULT_EMAIL_SMTP_CONFIG);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplateConfig[]>(DEFAULT_EMAIL_TEMPLATES);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);

  const [isHydrated, setIsHydrated] = useState(false);

  // No localStorage — all data comes from MongoDB in real-time
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch real-time data from MongoDB Atlas Backend
  useEffect(() => {
    const fetchMongoDatabase = async () => {
      // 1. Fetch real products
      try {
        const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products.map((p: any) => ({
            id: p._id || p.id,
            name: p.name,
            slug: p.slug,
            sku: p.sku || `ELV-${(p.category || "PROD").substring(0, 3).toUpperCase()}-100`,
            category: p.category,
            categoryName: p.categoryName || p.category,
            shortDescription: p.shortDescription || "",
            fullDescription: p.fullDescription || "",
            price: p.price,
            originalPrice: p.originalPrice || p.price,
            isFree: !!p.isFree,
            badge: p.badge || "Featured",
            isFeatured: !!p.isFeatured,
            isBestSeller: !!p.isBestSeller,
            isNewArrival: !!p.isNewArrival,
            rating: p.rating || 5.0,
            reviewsCount: p.reviewsCount || 1,
            productFormat: p.productFormat || "Digital Download",
            compatibility: p.compatibility || "Web & Mobile",
            fileSize: p.fileSize || "Cloud Archive",
            features: p.features || [],
            whatsIncluded: p.whatsIncluded || [],
            bonuses: p.bonuses || [],
            faqs: p.faqs || [],
            googleDriveLink: p.googleDriveLink || "",
            accessFolderLink: p.accessFolderLink || "",
            videoLink: p.videoLink || "",
            downloadFileUrl: p.downloadFileUrl || "",
            superProfileUrl: p.superProfileUrl || "",
            photos: p.photos || [],
            status: p.status || "published",
            totalSales: p.totalSales || 0,
            totalRevenue: p.totalRevenue || 0,
            createdAt: p.createdAt || new Date().toISOString(),
            updatedAt: p.updatedAt || new Date().toISOString(),
          })));
        }
      } catch {
        // Fallback to existing
      }

      // 2. Fetch real orders directly from MongoDB
      try {
        const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
        const res = await fetch(`${API_BASE}/api/orders`, {
          cache: "no-store",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders.map((o: any) => ({
            id: o._id || o.id,
            orderNumber: o.orderNumber,
            customerId: o.customerEmail,
            customerName: o.customerName || "Customer",
            customerEmail: o.customerEmail,
            items: (o.items || []).map((it: any) => ({
              productId: it.productId,
              productName: it.productName,
              price: it.price,
              quantity: it.quantity,
              format: it.format || "Digital Download",
            })),
            subtotal: o.subtotal || o.totalAmount,
            discount: o.discount || 0,
            totalAmount: o.totalAmount,
            paymentStatus: o.paymentStatus || "paid",
            orderDate: o.createdAt || new Date().toISOString(),
            accessStatus: o.accessStatus || "granted",
            paymentMethod: o.paymentMethod || "RAZORPAY",
            couponUsed: o.couponUsed || "",
            timeline: [
              {
                title: "Order Created & Paid",
                time: o.createdAt ? new Date(o.createdAt).toLocaleTimeString() : "Just now",
                description: `Payment recorded via ${o.paymentMethod || "Razorpay"}.`,
              },
            ],
          })));
        }
      } catch {
        // Fallback
      }

      // 3. Fetch real customers aggregated from MongoDB
      try {
        const res = await fetch(`${API_BASE}/api/admin/customers`);
        const data = await res.json();
        if (data.success && Array.isArray(data.customers)) {
          setCustomers(data.customers.map((c: any) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone || "N/A",
            registeredDate: c.lastOrderDate || new Date().toISOString(),
            totalOrders: c.ordersCount || 1,
            totalSpending: c.totalSpent || 0,
            productsOwned: [],
            status: "active" as const,
            isEmailVerified: true,
            avatar: ((c.name || "Customer").trim().split(/\s+/).length === 1
              ? (c.name || "CU").trim().slice(0, 2).toUpperCase()
              : ((c.name || "C").trim().split(/\s+/)[0][0] + (c.name || "U").trim().split(/\s+/).slice(-1)[0][0]).toUpperCase()),
            notes: [],
          })));
        }
      } catch {
        // Fallback
      }

      // 4. Fetch real access records from MongoDB
      try {
        const res = await fetch(`${API_BASE}/api/access`);
        const data = await res.json();
        if (data.success && Array.isArray(data.accessRecords)) {
          setAccessRecords(data.accessRecords.map((a: any) => ({
            id: a._id || a.id,
            customerEmail: a.customerEmail,
            customerName: a.customerName || "Customer",
            productId: a.productId,
            productName: a.productName,
            orderId: a.orderId,
            purchaseDate: a.createdAt || new Date().toISOString(),
            status: a.status || "active",
            expiryDate: a.expiresAt ? new Date(a.expiresAt).toLocaleDateString() : "Lifetime",
            downloadLimit: a.downloadLimit || 999,
            downloadCount: a.downloadCount || 0,
            accessType: "purchase" as const,
            lastAccessed: a.lastAccessedAt || undefined,
          })));
        }
      } catch {
        // Fallback
      }

      // 5. Fetch real digital assets from MongoDB
      try {
        const res = await fetch(`${API_BASE}/api/assets`);
        const data = await res.json();
        if (data.success && Array.isArray(data.assets)) {
          setDigitalAssets(data.assets.map((a: any) => ({
            id: a._id || a.id,
            name: a.name,
            fileName: a.fileName || a.name,
            fileType: a.fileType || "ZIP",
            fileSize: a.fileSize || "25 MB",
            version: a.version || "1.0",
            associatedProductId: a.associatedProductId || "",
            associatedProductName: a.associatedProductName || "",
            fileUrl: a.fileUrl || "",
            googleDriveLink: a.googleDriveLink || "",
            accessFolderLink: a.accessFolderLink || "",
            videoLink: a.videoLink || "",
            uploadDate: a.createdAt ? new Date(a.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            downloadCount: a.downloadCount || 0,
            status: a.status || "active",
          })));
        }
      } catch {
        // Fallback
      }

      // 6. Fetch real landing pages from MongoDB
      try {
        const res = await fetch(`${API_BASE}/api/landing-pages`, { cache: "no-store" });
        const data = await res.json();
        if (data.success && Array.isArray(data.landingPages)) {
          setLandingPages(
            data.landingPages.map((lp: any) => ({
              id: lp._id || lp.id,
              productId: lp.productId,
              productSlug: lp.productSlug,
              productName: lp.productName,
              title: lp.title,
              slug: lp.slug,
              status: lp.status || "published",
              views: lp.views || 0,
              conversions: lp.conversions || 0,
              conversionRate: lp.conversionRate || 0,
              lastUpdated: lp.updatedAt
                ? new Date(lp.updatedAt).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
              sections: Array.isArray(lp.sections) ? lp.sections : [],
            }))
          );
        }
      } catch {
        // Fallback
      }
    };

    fetchMongoDatabase();
  }, []);

  // No localStorage sync — data is fetched live from MongoDB

  const addAuditLog = useCallback((action: string, module: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      adminName: currentUser.name,
      action,
      module,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [currentUser.name]);

  const setCurrentUserRole = (role: AdminRole) => {
    setCurrentUser((prev) => ({ ...prev, role }));
    addAuditLog("Switched Active Role", "Admin Team", `Current role changed to ${role}`);
  };

  const addAdminUser = (userData: Omit<AdminUser, "id" | "lastLogin">) => {
    const newUser: AdminUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      lastLogin: "Never",
    };
    setAdminUsers((prev) => [newUser, ...prev]);
    addAuditLog("Invited Admin User", "Admin Team", `Added ${newUser.name} with role ${newUser.role}`);
  };

  const toggleAdminUserStatus = (id: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u))
    );
    addAuditLog("Changed User Status", "Admin Team", `Updated status for user ID ${id}`);
  };

  // Products CRUD
  const addProduct = (prodData: Omit<AdminProduct, "id" | "totalSales" | "totalRevenue" | "createdAt" | "updatedAt"> & { id?: string }) => {
    // Use the real MongoDB _id passed from the create page; fall back to a temp id only if missing
    const id = (prodData as any).id || `prod-custom-${Date.now()}`;
    const newProduct: AdminProduct = {
      ...prodData,
      id,
      totalSales: 0,
      totalRevenue: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    addAuditLog("Created Product", "Products", `Created "${newProduct.name}" (SKU: ${newProduct.sku})`);
  };

  const updateProduct = (id: string, updates: Partial<AdminProduct>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString().split("T")[0] } : p
      )
    );
    addAuditLog("Updated Product", "Products", `Modified details for product ID ${id}`);
  };

  const deleteProduct = async (id: string) => {
    const target = products.find((p) => p.id === id);
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(`Failed to delete product from database: ${data.message || res.statusText}`);
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addAuditLog("Deleted Product", "Products", `Deleted "${target?.name || id}" from MongoDB`);
    } catch (err) {
      alert(`Error deleting product: ${err instanceof Error ? err.message : "Network error"}`);
    }
  };

  const togglePublishProduct = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const nextStatus = target.status === "published" ? "unpublished" : "published";

    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(`Failed to update product status: ${data.message || res.statusText}`);
        return;
      }
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
      );
      addAuditLog(
        nextStatus === "published" ? "Published Product" : "Unpublished Product",
        "Products",
        `Changed status of "${target.name}" to ${nextStatus}`
      );
    } catch (err) {
      alert(`Error updating status: ${err instanceof Error ? err.message : "Network error"}`);
    }
  };

  // Landing pages
  const updateLandingPage = async (id: string, updates: Partial<LandingPageConfig>) => {
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/landing-pages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.landingPage) {
        setLandingPages((prev) =>
          prev.map((lp) =>
            lp.id === id
              ? {
                ...lp,
                ...updates,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
              : lp
          )
        );
        addAuditLog("Updated Landing Page", "Landing Pages", `Updated section layout for LP ${id}`);
      } else {
        alert(`Failed to save landing page: ${data.message || res.statusText}`);
      }
    } catch (err) {
      alert(`Error updating landing page: ${err instanceof Error ? err.message : "Network error"}`);
    }
  };

  const createLandingPage = async (
    lp: Omit<LandingPageConfig, "id"> & { id?: string }
  ): Promise<LandingPageConfig | null> => {
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/landing-pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(lp),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.landingPage) {
        const saved: LandingPageConfig = {
          id: data.landingPage._id || data.landingPage.id,
          productId: data.landingPage.productId,
          productSlug: data.landingPage.productSlug,
          productName: data.landingPage.productName,
          title: data.landingPage.title,
          slug: data.landingPage.slug,
          status: data.landingPage.status || "published",
          views: data.landingPage.views || 0,
          conversions: data.landingPage.conversions || 0,
          conversionRate: data.landingPage.conversionRate || 0,
          lastUpdated: new Date().toISOString().split("T")[0],
          sections: Array.isArray(data.landingPage.sections) ? data.landingPage.sections : [],
        };
        setLandingPages((prev) => [saved, ...prev]);
        addAuditLog("Created Landing Page", "Landing Pages", `Created new landing page for ${saved.productName}`);
        return saved;
      }
      alert(`Failed to create landing page: ${data.message || res.statusText}`);
      return null;
    } catch (err) {
      alert(`Error creating landing page: ${err instanceof Error ? err.message : "Network error"}`);
      return null;
    }
  };

  const deleteLandingPage = async (id: string) => {
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/landing-pages/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (res.ok) {
        setLandingPages((prev) => prev.filter((lp) => lp.id !== id));
        addAuditLog("Deleted Landing Page", "Landing Pages", `Deleted landing page ${id}`);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(`Failed to delete landing page: ${data.message || res.statusText}`);
      }
    } catch (err) {
      alert(`Error deleting landing page: ${err instanceof Error ? err.message : "Network error"}`);
    }
  };

  // Customers
  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addAuditLog("Updated Customer", "Customers", `Updated details for customer ${id}`);
  };

  const toggleBlockCustomer = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "active" ? "blocked" : "active";
          addAuditLog(
            nextStatus === "blocked" ? "Blocked Customer" : "Unblocked Customer",
            "Customers",
            `${c.name} (${c.email}) status changed to ${nextStatus}`
          );
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const addCustomerNote = (id: string, note: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, notes: [note, ...c.notes] } : c))
    );
    addAuditLog("Added Customer Note", "Customers", `Added internal note to customer ${id}`);
  };

  const deleteCustomer = async (id: string, email: string) => {
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/admin/customers/${encodeURIComponent(email)}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(`Failed to delete customer: ${data.message || res.statusText}`);
        return;
      }
      const normEmail = email.toLowerCase().trim();
      setCustomers((prev) => prev.filter((c) => c.id !== id && c.email.toLowerCase() !== normEmail));
      setOrders((prev) => prev.filter((o) => o.customerEmail.toLowerCase() !== normEmail));
      setAccessRecords((prev) => prev.filter((a) => a.customerEmail.toLowerCase() !== normEmail));
      addAuditLog("Deleted Customer", "Customers", `Deleted customer ${email} and their orders/access`);
    } catch (err) {
      alert(`Error deleting customer: ${err instanceof Error ? err.message : "Network error"}`);
    }
  };

  // Orders
  const updateOrderStatus = async (id: string, status: Order["paymentStatus"]) => {
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ paymentStatus: status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        alert(`Failed to update order status: ${data.message || res.statusText}`);
        return;
      }
    } catch (err) {
      alert(`Error updating order status: ${err instanceof Error ? err.message : "Network error"}`);
      return;
    }
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          addAuditLog("Updated Order Status", "Orders", `Order ${o.orderNumber} changed to ${status}`);
          return {
            ...o,
            paymentStatus: status,
            accessStatus: status === "paid" ? "granted" : status === "refunded" ? "revoked" : o.accessStatus,
          };
        }
        return o;
      })
    );
  };

  const deleteOrder = async (id: string) => {
    const target = orders.find((o) => o.id === id);
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(`Failed to delete order: ${data.message || res.statusText}`);
        return;
      }
      setOrders((prev) => prev.filter((o) => o.id !== id));
      if (target?.orderNumber) {
        setAccessRecords((prev) => prev.filter((a) => a.orderId !== target.orderNumber));
      }
      addAuditLog("Deleted Order", "Orders", `Deleted order "${target?.orderNumber || id}" from MongoDB`);
    } catch (err) {
      alert(`Error deleting order: ${err instanceof Error ? err.message : "Network error"}`);
    }
  };

  const recordOrderRefund = (orderId: string, amount: number, reason: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    // Create refund record
    const newRefund: RefundRecord = {
      id: `ref-${Date.now()}`,
      orderId,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      amount,
      reason,
      requestedDate: new Date().toISOString().split("T")[0],
      processedDate: new Date().toISOString().split("T")[0],
      status: "approved",
      adminNote: "Refund processed by admin console",
    };

    setRefunds((prev) => [newRefund, ...prev]);

    // Update order status
    updateOrderStatus(orderId, "refunded");

    // Automatically revoke associated entitlements
    setAccessRecords((prev) =>
      prev.map((a) => (a.orderId === orderId ? { ...a, status: "revoked" } : a))
    );

    addAuditLog("Processed Order Refund", "Orders & Refunds", `Refunded ₹${amount} for ${order.orderNumber}`);
  };

  // Access / Entitlements
  const grantAccess = (recordData: Omit<AccessRecord, "id" | "purchaseDate" | "downloadCount">) => {
    const newRecord: AccessRecord = {
      ...recordData,
      id: `acc-${Date.now()}`,
      purchaseDate: new Date().toISOString().split("T")[0],
      downloadCount: 0,
    };
    setAccessRecords((prev) => [newRecord, ...prev]);
    addAuditLog("Granted Product Access", "Customer Access", `Granted "${recordData.productName}" to ${recordData.customerEmail}`);
  };

  const revokeAccess = (id: string, reason?: string) => {
    setAccessRecords((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "revoked", adminNote: reason || a.adminNote } : a
      )
    );
    const target = accessRecords.find((a) => a.id === id);
    addAuditLog("Revoked Product Access", "Customer Access", `Revoked access for ${target?.customerEmail} on ${target?.productName}`);
  };

  const restoreAccess = (id: string) => {
    setAccessRecords((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "active" } : a))
    );
    const target = accessRecords.find((a) => a.id === id);
    addAuditLog("Restored Product Access", "Customer Access", `Restored access for ${target?.customerEmail}`);
  };

  const extendAccess = (id: string, newDate: string) => {
    setAccessRecords((prev) =>
      prev.map((a) => (a.id === id ? { ...a, expiryDate: newDate, status: "active" } : a))
    );
    addAuditLog("Extended Access Expiry", "Customer Access", `Extended expiry to ${newDate} for record ${id}`);
  };

  const deleteAccessRecord = async (id: string) => {
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : "";
      const res = await fetch(`${API_BASE}/api/access/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(`Failed to delete access record: ${data.message || res.statusText}`);
        return;
      }
      setAccessRecords((prev) => prev.filter((a) => a.id !== id));
      addAuditLog("Deleted Access Record", "Customer Access", `Deleted access record ${id}`);
    } catch (err) {
      alert(`Error deleting access record: ${err instanceof Error ? err.message : "Network error"}`);
    }
  };

  // Digital Assets (Connected to MongoDB Atlas)
  const addDigitalAsset = async (assetData: Omit<DigitalAsset, "id" | "uploadDate" | "downloadCount">) => {
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : null;
      const res = await fetch(`${API_BASE}/api/assets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(assetData),
      });
      const data = await res.json();
      if (data.success && data.asset) {
        const newAsset: DigitalAsset = {
          ...assetData,
          id: data.asset._id || `ast-${Date.now()}`,
          uploadDate: new Date().toISOString().split("T")[0],
          downloadCount: 0,
        };
        setDigitalAssets((prev) => [newAsset, ...prev]);
        addAuditLog("Uploaded Digital Asset", "Downloads", `Uploaded asset "${newAsset.name}" to MongoDB Atlas`);
        return;
      }
    } catch {
      // Fallback
    }

    const newAsset: DigitalAsset = {
      ...assetData,
      id: `ast-${Date.now()}`,
      uploadDate: new Date().toISOString().split("T")[0],
      downloadCount: 0,
    };
    setDigitalAssets((prev) => [newAsset, ...prev]);
    addAuditLog("Uploaded Digital Asset", "Downloads", `Uploaded asset "${newAsset.name}"`);
  };

  const deleteDigitalAsset = async (id: string) => {
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : null;
      await fetch(`${API_BASE}/api/assets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });
    } catch {
      // Fallback
    }
    setDigitalAssets((prev) => prev.filter((a) => a.id !== id));
    addAuditLog("Deleted Digital Asset", "Downloads", `Removed asset ID ${id}`);
  };

  // Refunds Process
  const processRefund = (refundId: string, action: "approve" | "reject", note?: string) => {
    setRefunds((prev) =>
      prev.map((r) => {
        if (r.id === refundId) {
          const nextStatus = action === "approve" ? "approved" : "rejected";
          return {
            ...r,
            status: nextStatus,
            processedDate: new Date().toISOString().split("T")[0],
            adminNote: note || r.adminNote,
          };
        }
        return r;
      })
    );
    addAuditLog("Reviewed Refund Request", "Refunds", `Refund ${refundId} was ${action}d`);
  };

  // Coupons
  const addCoupon = (couponData: Omit<Coupon, "id" | "usageCount" | "createdAt">) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `cpn-${Date.now()}`,
      usageCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    addAuditLog("Created Coupon", "Coupons", `Added code "${newCoupon.code}"`);
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    addAuditLog("Deleted Coupon", "Coupons", `Deleted coupon ID ${id}`);
  };

  // Reviews
  const updateReviewStatus = (id: string, status: "approved" | "rejected") => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    addAuditLog("Moderated Review", "Reviews", `Marked review ${id} as ${status}`);
  };

  const toggleFeaturedReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    addAuditLog("Deleted Review", "Reviews", `Deleted review ${id}`);
  };

  // Support
  const updateTicketStatus = (id: string, status: SupportTicket["status"]) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    addAuditLog("Updated Support Ticket", "Support", `Ticket ${id} marked as ${status}`);
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    addAuditLog("Deleted Support Ticket", "Support", `Deleted ticket ${id}`);
  };

  const addTicketResponse = (id: string, message: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            responses: [
              ...t.responses,
              {
                sender: currentUser.name,
                role: "admin",
                message,
                timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
              },
            ],
            status: "waiting",
          };
        }
        return t;
      })
    );
    addAuditLog("Replied to Support Ticket", "Support", `Added admin reply to ticket ${id}`);
  };

  // Settings
  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addAuditLog("Updated Store Settings", "Settings", "Modified store configuration");
  };

  // Email Config Handlers
  const updateEmailSmtpConfig = async (updates: Partial<EmailSmtpConfig>) => {
    const merged = { ...emailSmtpConfig, ...updates, provider: "smtp" as const };
    setEmailSmtpConfig(merged);
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : null;
      await fetch(`${API_BASE}/api/email/config`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(merged),
      });
    } catch {
      // Local state updated
    }
    addAuditLog("Updated SMTP Config", "Email", `Updated SMTP email configuration (${merged.host}:${merged.port})`);
  };

  const updateEmailTemplate = (id: string, updates: Partial<EmailTemplateConfig>) => {
    setEmailTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    addAuditLog("Updated Email Template", "Email", `Modified copy/design for template "${id}"`);
  };

  const sendTestEmail = async (recipient: string): Promise<{ success: boolean; log: string[] }> => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : null;
      const res = await fetch(`${API_BASE}/api/email/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({
          toEmail: recipient,
          testConfig: emailSmtpConfig.password ? emailSmtpConfig : undefined,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        const log: string[] = [
          `[${timestamp}] Connecting to ${emailSmtpConfig.host}:${emailSmtpConfig.port} (${emailSmtpConfig.encryption.toUpperCase()})...`,
          `[${timestamp}] ${data.message || "Diagnostic SMTP email dispatched!"}`,
          `[${timestamp}] Response: ${data.response || "250 OK"}`,
        ];

        const newLog: EmailLog = {
          id: `elog-${Date.now()}`,
          recipient,
          recipientName: "Test Recipient",
          templateId: "test_verification",
          templateName: "SMTP Test Verification Dispatch",
          subject: "⚡ ElvorDigital SMTP Email Connection Verified",
          sentAt: timestamp,
          status: "delivered",
        };
        setEmailLogs((prev) => [newLog, ...prev]);
        setEmailSmtpConfig((prev) => ({ ...prev, isVerified: true }));
        addAuditLog("Dispatched SMTP Test Email", "Email", `Delivered diagnostic email to ${recipient}`);
        return { success: true, log };
      }

      const failLog = [
        `[${timestamp}] SMTP Error: ${data.message || "Failed to dispatch SMTP email"}`,
      ];
      return { success: false, log: failLog };
    } catch (err: any) {
      return {
        success: false,
        log: [`[${timestamp}] Network/Server Error: ${err?.message || "Could not reach backend SMTP endpoint"}`],
      };
    }
  };

  const resendEmail = (logId: string) => {
    const target = emailLogs.find((l) => l.id === logId);
    if (!target) return;
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);
    const newLog: EmailLog = {
      ...target,
      id: `elog-${Date.now()}`,
      sentAt: timestamp,
      status: "delivered",
    };
    setEmailLogs((prev) => [newLog, ...prev]);
    addAuditLog("Resent Transactional Email", "Email", `Resent "${target.templateName}" to ${target.recipient}`);
  };

  const resetDemoData = () => {
    setProducts(INITIAL_ADMIN_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setAccessRecords(INITIAL_ACCESS_RECORDS);
    setCustomers(INITIAL_CUSTOMERS);
    setCoupons(INITIAL_COUPONS);
    setLandingPages(INITIAL_LANDING_PAGES);
    setSettings(INITIAL_STORE_SETTINGS);
    setEmailSmtpConfig(DEFAULT_EMAIL_SMTP_CONFIG);
    setEmailTemplates(DEFAULT_EMAIL_TEMPLATES);
    setEmailLogs(INITIAL_EMAIL_LOGS);
    // Clear any residual session data
    if (typeof window !== "undefined") sessionStorage.clear();
    addAuditLog("Reset Demo State", "System", "Reset all data to default master state");
  };

  return (
    <AdminDataContext.Provider
      value={{
        currentUser,
        setCurrentUserRole,
        adminUsers,
        addAdminUser,
        toggleAdminUserStatus,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        togglePublishProduct,
        landingPages,
        updateLandingPage,
        createLandingPage,
        deleteLandingPage,
        customers,
        updateCustomer,
        toggleBlockCustomer,
        addCustomerNote,
        deleteCustomer,
        orders,
        updateOrderStatus,
        recordOrderRefund,
        deleteOrder,
        accessRecords,
        grantAccess,
        revokeAccess,
        restoreAccess,
        extendAccess,
        deleteAccessRecord,
        digitalAssets,
        addDigitalAsset,
        deleteDigitalAsset,
        payments,
        refunds,
        processRefund,
        coupons,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        reviews,
        updateReviewStatus,
        toggleFeaturedReview,
        deleteReview,
        tickets,
        updateTicketStatus,
        addTicketResponse,
        deleteTicket,
        affiliates,
        abandonedCarts,
        subscriptions,
        licenses,
        auditLogs,
        addAuditLog,
        settings,
        updateSettings,
        emailSmtpConfig,
        updateEmailSmtpConfig,
        emailTemplates,
        updateEmailTemplate,
        emailLogs,
        sendTestEmail,
        resendEmail,
        resetDemoData,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
