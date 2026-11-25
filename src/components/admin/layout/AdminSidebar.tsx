"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  Layers,
  FolderTree,
  ShoppingBag,
  Users,
  KeyRound,
  Download,
  CreditCard,
  RotateCcw,
  Tag,
  MessageSquare,
  Megaphone,
  Share2,
  ShoppingCart,
  CalendarCheck,
  ShieldCheck,
  HeadphonesIcon,
  Bell,
  Users2,
  ShieldAlert,
  ClipboardList,
  Settings,
  Mail,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen
} from "lucide-react";

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Products & Pages",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Landing Pages", href: "/admin/landing-pages", icon: Layers, badge: "Builder" },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Digital Assets", href: "/admin/downloads", icon: Download },
    ],
  },
  {
    group: "Orders & Customers",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Email Access", href: "/admin/access", icon: KeyRound, badge: "Critical" },
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Refunds", href: "/admin/refunds", icon: RotateCcw },
    ],
  },
  {
    group: "Growth & Marketing",
    items: [
      { label: "Coupons", href: "/admin/coupons", icon: Tag },
      { label: "Marketing", href: "/admin/marketing", icon: Megaphone },
      { label: "Affiliates", href: "/admin/affiliates", icon: Share2 },
      { label: "Abandoned Carts", href: "/admin/abandoned-carts", icon: ShoppingCart },
      { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Subscriptions", href: "/admin/subscriptions", icon: CalendarCheck },
      { label: "Licenses", href: "/admin/licenses", icon: ShieldCheck },
      { label: "Support Tickets", href: "/admin/support", icon: HeadphonesIcon },
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
    ],
  },
  {
    group: "Management",
    items: [
      { label: "Team Users", href: "/admin/team", icon: Users2 },
      { label: "Email Setup", href: "/admin/email", icon: Mail, badge: "SMTP" },
      { label: "Role Matrix", href: "/admin/roles", icon: ShieldAlert },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: ClipboardList },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0d0b1f] border-r border-white/10 text-white select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
        <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#EC4899] p-[1.5px] shadow-lg shadow-purple-500/30">
            <div className="h-full w-full rounded-[10px] bg-[#090816] flex items-center justify-center overflow-hidden">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H19"
                  stroke="url(#admElvGrad)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12H15.5"
                  stroke="url(#admElvGrad)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <circle cx="19" cy="5" r="1.5" fill="#EC4899" />
                <circle cx="15.5" cy="12" r="1.5" fill="#A855F7" />
                <circle cx="19" cy="19" r="1.5" fill="#22D3EE" />
                <defs>
                  <linearGradient id="admElvGrad" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.5" stopColor="#A855F7" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-bold text-sm tracking-tight text-white leading-none">
                Elvor<span>Digital</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-purple-300/80 mt-1">
                Admin Console
              </span>
            </div>
          )}
        </Link>

        {/* Desktop collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#A7A3BC]/70 mb-2">
                {group.group}
              </h4>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30"
                        : "text-[#A7A3BC] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon
                      size={17}
                      className={isActive ? "text-white" : "text-gray-400 group-hover:text-purple-300"}
                    />
                    {!collapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Quick Links to Storefront & Library */}
      <div className="p-3 border-t border-white/10 shrink-0 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#A7A3BC] hover:text-white hover:bg-white/5 transition-colors"
          title="Open Public Storefront"
        >
          <ExternalLink size={15} />
          {!collapsed && <span>View Storefront</span>}
        </Link>
        <Link
          href="/my-library"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#A7A3BC] hover:text-white hover:bg-white/5 transition-colors"
          title="Customer My Library Portal"
        >
          <BookOpen size={15} />
          {!collapsed && <span>Customer Library</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/70 backdrop-blur-sm">
          <div className="w-64 h-full animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
