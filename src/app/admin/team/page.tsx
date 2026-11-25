"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  Search,
  CheckCircle,
  Clock,
  MoreVertical,
  Mail,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { Modal } from "@/components/admin/ui/Modal";
import { AdminRole, AdminUser } from "@/types/admin";

export default function TeamPage() {
  const { adminUsers, addAdminUser, toggleAdminUserStatus, currentUser } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("SUPPORT_AGENT");

  const filteredUsers = adminUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    addAdminUser({
      name,
      email,
      role,
      status: "active",
      avatar: initials,
    });

    setIsInviteModalOpen(false);
    setName("");
    setEmail("");
  };

  const getRoleBadge = (r: AdminRole) => {
    switch (r) {
      case "OWNER":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "SUPER_ADMIN":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "PRODUCT_MANAGER":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "MARKETING_MANAGER":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      default:
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Team & Staff Management
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Manage administrative team members, grant departmental permissions, and monitor active sessions.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25"
        >
          <UserPlus className="w-4 h-4" />
          Invite Team Member
        </button>
      </div>

      {/* Team Table */}
      <AdminCard
        title="Admin User Roster"
        subtitle={`Showing ${filteredUsers.length} staff members with dashboard credentials`}
        action={
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
            <input
              type="text"
              placeholder="Search by name, role or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-[#A7A3BC] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A7A3BC]">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-[#A7A3BC]">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">User</th>
                <th className="px-4 py-3">Assigned Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Active</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white flex items-center gap-2">
                        {user.name}
                        {user.id === currentUser.id && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[#A7A3BC]">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs flex items-center gap-1.5 text-[#A7A3BC]">
                    <Clock className="w-3.5 h-3.5" />
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {user.id !== currentUser.id && (
                      <button
                        onClick={() => toggleAdminUserStatus(user.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          user.status === "active"
                            ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                            : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
                        }`}
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Invite Member Modal */}
      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Administrative User">
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Sanya Kapoor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Work Email</label>
            <input
              type="email"
              required
              placeholder="sanya@ElvorDigital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Role & Access Level</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="SUPER_ADMIN" className="bg-[#17152E]">SUPER_ADMIN — Full Store Operations</option>
              <option value="PRODUCT_MANAGER" className="bg-[#17152E]">PRODUCT_MANAGER — Products & Landing Pages</option>
              <option value="ORDER_MANAGER" className="bg-[#17152E]">ORDER_MANAGER — Orders, Entitlements & Refunds</option>
              <option value="MARKETING_MANAGER" className="bg-[#17152E]">MARKETING_MANAGER — Coupons, Banners & Affiliates</option>
              <option value="SUPPORT_AGENT" className="bg-[#17152E]">SUPPORT_AGENT — Customer Tickets & Reviews</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25"
            >
              Send Staff Invitation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
