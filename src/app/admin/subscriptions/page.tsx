"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Calendar,
  Repeat,
  DollarSign,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { StatCard } from "@/components/admin/ui/StatCard";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { Subscription } from "@/types/admin";

export default function SubscriptionsPage() {
  const { subscriptions, addAuditLog } = useAdminData();
  const [subsList, setSubsList] = useState<Subscription[]>(subscriptions);
  const [searchQuery, setSearchQuery] = useState("");

  const activeSubs = subsList.filter((s) => s.status === "active");
  const mrr = activeSubs.reduce((acc, s) => {
    return acc + (s.billingCycle === "yearly" ? Math.round(s.amount / 12) : s.amount);
  }, 0);

  const filteredSubs = subsList.filter(
    (s) =>
      s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.planName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setSubsList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === "active" ? "cancelled" : "active";
          addAuditLog(
            nextStatus === "cancelled" ? "Cancelled Subscription" : "Reactivated Subscription",
            "Subscriptions",
            `Subscription ${s.id} for ${s.customerEmail} is now ${nextStatus}`
          );
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Membership & Subscriptions
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Manage recurring VIP community passes, all-access memberships, and monthly billing cycles.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Estimated MRR"
          value={`₹${mrr.toLocaleString("en-IN")}`}
          change="+15.8%"
          isPositive={true}
          icon={DollarSign}
          iconColor="#8B5CF6"
          subtitle="Monthly Recurring Revenue"
        />
        <StatCard
          title="Active Members"
          value={activeSubs.length.toString()}
          change="+8 this month"
          isPositive={true}
          icon={Users}
          iconColor="#22D3EE"
          subtitle="Subscribed VIP creators"
        />
        <StatCard
          title="Renewal Rate"
          value="94.2%"
          change="+2.1%"
          isPositive={true}
          icon={Repeat}
          iconColor="#A855F7"
          subtitle="Annual cohort retention"
        />
        <StatCard
          title="Churn Rate"
          value="5.8%"
          change="-0.9%"
          isPositive={true}
          icon={AlertCircle}
          iconColor="#F59E0B"
          subtitle="Cancelled this period"
        />
      </div>

      {/* Subscriptions Table */}
      <AdminCard
        title="Member Subscriptions Roster"
        subtitle={`Showing ${filteredSubs.length} active and past subscribers`}
        action={
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
            <input
              type="text"
              placeholder="Search subscribers..."
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
                <th className="px-4 py-3 rounded-l-lg">Subscriber</th>
                <th className="px-4 py-3">Plan Name</th>
                <th className="px-4 py-3">Billing Cycle</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">Next Renewal</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSubs.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{sub.customerName}</p>
                    <p className="text-xs text-[#A7A3BC]">{sub.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-white font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    {sub.planName}
                  </td>
                  <td className="px-4 py-3 capitalize">{sub.billingCycle}</td>
                  <td className="px-4 py-3 text-white font-semibold">
                    ₹{sub.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-xs">{sub.startDate}</td>
                  <td className="px-4 py-3 text-xs text-purple-300 font-medium">{sub.renewalDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        sub.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : sub.status === "cancelled"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleToggleStatus(sub.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        sub.status === "active"
                          ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                          : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
                      }`}
                    >
                      {sub.status === "active" ? "Cancel Plan" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
