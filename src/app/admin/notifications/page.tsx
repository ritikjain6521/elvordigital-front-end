"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  DollarSign,
  UserPlus,
  ShieldAlert,
  Trash2,
  CheckCheck,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { useAdminData } from "@/context/admin/AdminDataContext";

interface AdminNotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "order" | "customer" | "system" | "security";
  isRead: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: AdminNotificationItem[] = [
  {
    id: "notif-1",
    title: "New High-Value Order Received",
    message: "Order #ZNV-9041 by Aarav Malhotra for ₹2,499 was successfully settled via UPI.",
    timestamp: "12 minutes ago",
    type: "order",
    isRead: false,
    link: "/admin/orders",
  },
  {
    id: "notif-2",
    title: "Digital Access Auto-Provisioned",
    message: "Entitlement granted for 'Meta Ads Mastery 2026' to priya.sharma@gmail.com.",
    timestamp: "45 minutes ago",
    type: "customer",
    isRead: false,
    link: "/admin/access",
  },
  {
    id: "notif-3",
    title: "New Refund Request Submitted",
    message: "Customer Arjun Kapoor requested refund for Order #ZNV-8921. Reason: Accidental duplicate purchase.",
    timestamp: "2 hours ago",
    type: "order",
    isRead: false,
    link: "/admin/refunds",
  },
  {
    id: "notif-4",
    title: "Software License Threshold Reached",
    message: "License ZNVA-4819-B2K9 reached 3 of 3 devices.",
    timestamp: "5 hours ago",
    type: "system",
    isRead: true,
    link: "/admin/licenses",
  },
  {
    id: "notif-5",
    title: "Admin Role Switched to SUPER_ADMIN",
    message: "Session role switch was recorded in the immutable audit log.",
    timestamp: "1 day ago",
    type: "security",
    isRead: true,
    link: "/admin/audit-logs",
  },
];

export default function NotificationsPage() {
  const { addAuditLog } = useAdminData();
  const [notifications, setNotifications] = useState<AdminNotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filterType, setFilterType] = useState<string>("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filtered = notifications.filter((n) => filterType === "all" || n.type === filterType);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addAuditLog("Marked Notifications Read", "Notifications", "Marked all admin alerts as read");
  };

  const handleClearAll = () => {
    setNotifications([]);
    addAuditLog("Cleared Notifications", "Notifications", "Cleared notification inbox");
  };

  const getTypeIcon = (type: AdminNotificationItem["type"]) => {
    switch (type) {
      case "order":
        return <DollarSign className="w-5 h-5 text-emerald-400" />;
      case "customer":
        return <UserPlus className="w-5 h-5 text-purple-400" />;
      case "security":
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Notification Center
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Real-time administrative alerts for new purchases, entitlement grants, refund requests, and security logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-semibold transition-all"
            >
              <CheckCheck className="w-4 h-4 text-purple-400" />
              Mark all as read
            </button>
          )}
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 rounded-xl text-xs font-semibold transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(["all", "order", "customer", "system", "security"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              filterType === type
                ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20"
                : "bg-[#17152E] text-[#A7A3BC] hover:text-white border border-white/5"
            }`}
          >
            {type} {type === "all" ? `(${notifications.length})` : ""}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <AdminCard>
        {filtered.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Bell className="w-10 h-10 text-[#A7A3BC] mx-auto opacity-40" />
            <p className="text-sm font-medium text-white">All caught up!</p>
            <p className="text-xs text-[#A7A3BC]">No notifications matching the selected category.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`py-4 px-3 flex items-start justify-between gap-4 transition-colors rounded-xl ${
                  !item.isRead ? "bg-purple-950/20 border-l-2 border-[#8B5CF6]" : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl mt-0.5">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
                      )}
                    </div>
                    <p className="text-xs text-[#A7A3BC] mt-1">{item.message}</p>
                    <span className="text-[10px] text-gray-500 mt-2 block">{item.timestamp}</span>
                  </div>
                </div>

                {item.link && (
                  <Link
                    href={item.link}
                    className="flex items-center gap-1 text-xs text-[#22D3EE] hover:underline whitespace-nowrap self-center"
                  >
                    View <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}
