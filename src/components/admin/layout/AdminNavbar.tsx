"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  ShieldAlert,
  ChevronDown,
  User,
  ExternalLink,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  X,
  LogOut
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { AdminRole } from "@/types/admin";

interface AdminNavbarProps {
  collapsed: boolean;
  setMobileOpen: (open: boolean) => void;
}

const ROLES: AdminRole[] = [
  "OWNER",
  "SUPER_ADMIN",
  "PRODUCT_MANAGER",
  "ORDER_MANAGER",
  "MARKETING_MANAGER",
  "SUPPORT_AGENT",
];

export default function AdminNavbar({
  collapsed,
  setMobileOpen,
}: AdminNavbarProps) {
  const { currentUser, setCurrentUserRole, tickets, refunds, resetDemoData } = useAdminData();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setRoleMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openTicketsCount = tickets.filter((t) => t.status === "open").length;
  const pendingRefundsCount = refunds.filter((r) => r.status === "pending").length;
  const totalNotifications = openTicketsCount + pendingRefundsCount;

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-[#090816]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
        collapsed ? "left-0 lg:left-20" : "left-0 lg:left-64"
      }`}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Hamburger & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
            aria-label="Open sidebar drawer"
          >
            <Menu size={20} />
          </button>

          {/* Quick search input */}
          <div className="relative w-full hidden sm:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Quick search products, orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#14122c] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Right utility items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Reset Demo State Button */}
          <button
            onClick={() => {
              if (window.confirm("Reset all admin mock data back to factory default?")) {
                resetDemoData();
              }
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
            title="Reset demo data to initial state"
          >
            <RotateCcw size={13} />
            <span className="text-[11px]">Reset Demo</span>
          </button>

          {/* Role switcher dropdown */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/25 transition-colors"
            >
              <ShieldAlert size={14} className="text-pink-400" />
              <span className="hidden sm:inline">Role:</span>
              <span className="font-bold text-white">{currentUser.role}</span>
              <ChevronDown size={13} />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#17152E] border border-white/15 p-2 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                  Switch Active Role (Demo)
                </div>
                <div className="space-y-1">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setCurrentUserRole(r);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        currentUser.role === r
                          ? "bg-purple-600 text-white font-bold"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{r.replace("_", " ")}</span>
                      {currentUser.role === r && <CheckCircle2 size={13} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notification dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifMenuOpen(!notifMenuOpen)}
              className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {totalNotifications > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-md animate-pulse">
                  {totalNotifications}
                </span>
              )}
            </button>

            {notifMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#17152E] border border-white/15 p-3 shadow-2xl z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white">Notifications</span>
                  <span className="text-[10px] text-purple-300 font-semibold">
                    {totalNotifications} alerts pending
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {openTicketsCount > 0 && (
                    <Link
                      href="/admin/support"
                      onClick={() => setNotifMenuOpen(false)}
                      className="block p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                    >
                      <span className="text-xs font-bold text-white block">
                        {openTicketsCount} Support Ticket(s) Open
                      </span>
                      <span className="text-[11px] text-[#A7A3BC]">
                        Requires admin review &amp; reply
                      </span>
                    </Link>
                  )}
                  {pendingRefundsCount > 0 && (
                    <Link
                      href="/admin/refunds"
                      onClick={() => setNotifMenuOpen(false)}
                      className="block p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                    >
                      <span className="text-xs font-bold text-pink-300 block">
                        {pendingRefundsCount} Refund Request(s) Pending
                      </span>
                      <span className="text-[11px] text-[#A7A3BC]">
                        Awaiting approval in refunds queue
                      </span>
                    </Link>
                  )}
                  <Link
                    href="/admin/notifications"
                    onClick={() => setNotifMenuOpen(false)}
                    className="block text-center text-xs text-purple-400 hover:text-purple-300 pt-2"
                  >
                    View All Notifications →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Log Out Button */}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("znv_admin_token");
                localStorage.removeItem("znv_admin_user");
              }
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-semibold transition-colors"
            title="Log Out of Admin"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
