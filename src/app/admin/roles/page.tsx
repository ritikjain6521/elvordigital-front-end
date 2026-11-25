"use client";

import React from "react";
import {
  Shield,
  Check,
  X,
  Info,
  Lock,
  Unlock,
  KeyRound,
  UserCheck,
} from "lucide-react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminRole } from "@/types/admin";
import { useAdminData } from "@/context/admin/AdminDataContext";

interface PermissionRow {
  module: string;
  description: string;
  roles: Record<AdminRole, boolean>;
}

const PERMISSION_MATRIX: PermissionRow[] = [
  {
    module: "Products & Digital Assets",
    description: "Create, edit, duplicate, upload asset packages, publish and archive products",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: true,
      ORDER_MANAGER: false,
      MARKETING_MANAGER: false,
      SUPPORT_AGENT: false,
    },
  },
  {
    module: "Landing Page Builder",
    description: "Reorder 14 sections, edit hero copy, bonuses, FAQs, and toggle responsive device views",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: true,
      ORDER_MANAGER: false,
      MARKETING_MANAGER: true,
      SUPPORT_AGENT: false,
    },
  },
  {
    module: "Customer Management & Dossiers",
    description: "View CRM records, purchase histories, add internal customer notes, block/unblock accounts",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: false,
      ORDER_MANAGER: true,
      MARKETING_MANAGER: false,
      SUPPORT_AGENT: true,
    },
  },
  {
    module: "Orders & Transaction Settlements",
    description: "Inspect customer orders, update payment statuses, print invoices, filter gateway logs",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: false,
      ORDER_MANAGER: true,
      MARKETING_MANAGER: false,
      SUPPORT_AGENT: false,
    },
  },
  {
    module: "Email Entitlements (Digital Access)",
    description: "Manually grant product access, revoke, restore, extend expiry dates, and resend magic links",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: false,
      ORDER_MANAGER: true,
      MARKETING_MANAGER: false,
      SUPPORT_AGENT: false,
    },
  },
  {
    module: "Refund Claims & Approval",
    description: "Review customer refund disputes, approve or reject refunds, auto-revoke entitlements",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: false,
      ORDER_MANAGER: true,
      MARKETING_MANAGER: false,
      SUPPORT_AGENT: false,
    },
  },
  {
    module: "Marketing, Banners & Coupons",
    description: "Manage promo discount codes, top announcement bars, hero product showcase, email broadcasts",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: false,
      ORDER_MANAGER: false,
      MARKETING_MANAGER: true,
      SUPPORT_AGENT: false,
    },
  },
  {
    module: "Customer Support & Reviews Desk",
    description: "Reply to tickets, change ticket status, moderate product feedback, toggle featured testimonials",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: false,
      ORDER_MANAGER: false,
      MARKETING_MANAGER: false,
      SUPPORT_AGENT: true,
    },
  },
  {
    module: "Staff & Role Assignment",
    description: "Invite new staff, assign RBAC privileges, and deactivate dashboard credentials",
    roles: {
      OWNER: true,
      SUPER_ADMIN: true,
      PRODUCT_MANAGER: false,
      ORDER_MANAGER: false,
      MARKETING_MANAGER: false,
      SUPPORT_AGENT: false,
    },
  },
  {
    module: "Store Settings & API Keys",
    description: "Modify payment gateway keys, SMTP credentials, S3 storage, and legal policies",
    roles: {
      OWNER: true,
      SUPER_ADMIN: false,
      PRODUCT_MANAGER: false,
      ORDER_MANAGER: false,
      MARKETING_MANAGER: false,
      SUPPORT_AGENT: false,
    },
  },
];

const ROLES_LIST: { id: AdminRole; label: string; badgeColor: string }[] = [
  { id: "OWNER", label: "Owner", badgeColor: "text-amber-300" },
  { id: "SUPER_ADMIN", label: "Super Admin", badgeColor: "text-purple-300" },
  { id: "PRODUCT_MANAGER", label: "Product Mgr", badgeColor: "text-blue-300" },
  { id: "ORDER_MANAGER", label: "Order Mgr", badgeColor: "text-emerald-300" },
  { id: "MARKETING_MANAGER", label: "Marketing Mgr", badgeColor: "text-pink-300" },
  { id: "SUPPORT_AGENT", label: "Support Agent", badgeColor: "text-cyan-300" },
];

export default function RolesPage() {
  const { currentUser, setCurrentUserRole } = useAdminData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Role-Based Access Control (RBAC) Matrix
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Enterprise permission levels governing operations across the ElvorDigital marketplace dashboard.
          </p>
        </div>

        <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl flex items-center gap-2 text-xs text-purple-300">
          <Info className="w-4 h-4 text-purple-400 shrink-0" />
          <span>
            You are currently browsing as <strong>{currentUser.role}</strong>. You can switch roles using the top navbar.
          </span>
        </div>
      </div>

      {/* Permissions Matrix */}
      <AdminCard
        title="Module Access Hierarchy"
        subtitle="Granular permissions enabled per administrative responsibility"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A7A3BC]">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-[#A7A3BC]">
              <tr>
                <th className="px-4 py-3 rounded-l-lg min-w-[220px]">Store Module</th>
                {ROLES_LIST.map((r) => (
                  <th key={r.id} className={`px-3 py-3 text-center ${r.badgeColor}`}>
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PERMISSION_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-white">{row.module}</p>
                    <p className="text-xs text-[#A7A3BC] mt-0.5">{row.description}</p>
                  </td>
                  {ROLES_LIST.map((r) => {
                    const hasAccess = row.roles[r.id];
                    return (
                      <td key={r.id} className="px-3 py-3 text-center">
                        {hasAccess ? (
                          <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-[#A7A3BC]/40">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
