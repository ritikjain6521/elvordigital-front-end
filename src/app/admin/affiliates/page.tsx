"use client";

import React, { useState } from "react";
import {
  Share2,
  DollarSign,
  TrendingUp,
  Users,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { StatCard } from "@/components/admin/ui/StatCard";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { Modal } from "@/components/admin/ui/Modal";

export default function AffiliatesPage() {
  const { affiliates, addAuditLog } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<string | null>(null);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const totalSalesFromAffiliates = affiliates.reduce((acc, a) => acc + a.totalSales, 0);
  const totalCommissionEarned = affiliates.reduce((acc, a) => acc + a.commissionEarned, 0);
  const totalPendingPayout = affiliates.reduce((acc, a) => acc + a.pendingPayout, 0);

  const filteredAffiliates = affiliates.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.referralCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyLink = (code: string) => {
    navigator.clipboard.writeText(`https://ElvorDigital.com/?ref=${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApprovePayout = (affiliateId: string) => {
    const aff = affiliates.find((a) => a.id === affiliateId);
    if (!aff) return;
    setPayoutSuccess(true);
    addAuditLog(
      "Processed Affiliate Payout",
      "Affiliates",
      `Approved ₹${aff.pendingPayout.toLocaleString("en-IN")} payout for ${aff.name} (${aff.email})`
    );
    setTimeout(() => {
      setPayoutSuccess(false);
      setSelectedPayout(null);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Affiliate Partner Program
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Track affiliate partner conversions, commissions, referral clicks, and pending payout settlements.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Affiliate Gross Sales"
          value={`₹${totalSalesFromAffiliates.toLocaleString("en-IN")}`}
          change="+28.4%"
          isPositive={true}
          icon={TrendingUp}
          iconColor="#8B5CF6"
          subtitle="Revenue driven by creators"
        />
        <StatCard
          title="Commission Paid"
          value={`₹${totalCommissionEarned.toLocaleString("en-IN")}`}
          change="+22.0%"
          isPositive={true}
          icon={DollarSign}
          iconColor="#22D3EE"
          subtitle="Total historical commissions"
        />
        <StatCard
          title="Pending Payouts"
          value={`₹${totalPendingPayout.toLocaleString("en-IN")}`}
          change="3 pending"
          isPositive={false}
          icon={CreditCard}
          iconColor="#F59E0B"
          subtitle="Ready for UPI / Bank transfer"
        />
        <StatCard
          title="Active Affiliates"
          value={affiliates.length.toString()}
          change="+4 this quarter"
          isPositive={true}
          icon={Users}
          iconColor="#A855F7"
          subtitle="Approved creator partners"
        />
      </div>

      {/* Affiliates Table */}
      <AdminCard
        title="Affiliate Partners Roster"
        subtitle="Manage commission rates, tracking codes, and payout approvals"
        action={
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
            <input
              type="text"
              placeholder="Search affiliates..."
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
                <th className="px-4 py-3 rounded-l-lg">Partner</th>
                <th className="px-4 py-3">Tracking Code</th>
                <th className="px-4 py-3 text-center">Clicks</th>
                <th className="px-4 py-3 text-center">Conversions</th>
                <th className="px-4 py-3">Sales Driven</th>
                <th className="px-4 py-3">Commission %</th>
                <th className="px-4 py-3">Pending Payout</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAffiliates.map((aff) => (
                <tr key={aff.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{aff.name}</p>
                    <p className="text-xs text-[#A7A3BC]">{aff.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCopyLink(aff.referralCode)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-purple-300 transition-colors"
                      title="Copy referral link"
                    >
                      {copiedCode === aff.referralCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{aff.referralCode}</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center text-white">{aff.clicks}</td>
                  <td className="px-4 py-3 text-center text-emerald-400 font-semibold">{aff.conversions}</td>
                  <td className="px-4 py-3 text-white font-medium">₹{aff.totalSales.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-md text-xs font-semibold">
                      {aff.commissionPercentage}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-amber-300 font-semibold">
                    ₹{aff.pendingPayout.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {aff.pendingPayout > 0 ? (
                      <button
                        onClick={() => setSelectedPayout(aff.id)}
                        className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all"
                      >
                        Settle Payout
                      </button>
                    ) : (
                      <span className="text-xs text-[#A7A3BC]">Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Payout Approval Modal */}
      {selectedPayout && (
        <Modal
          isOpen={!!selectedPayout}
          onClose={() => setSelectedPayout(null)}
          title="Approve Affiliate Commission Settlement"
        >
          {payoutSuccess ? (
            <div className="p-6 text-center space-y-2">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Payout Approved & Recorded!</h3>
              <p className="text-sm text-[#A7A3BC]">The transfer has been simulated and logged in the audit ledger.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#A7A3BC]">
                You are about to simulate the disbursement of affiliate earnings:
              </p>
              {(() => {
                const target = affiliates.find((a) => a.id === selectedPayout);
                if (!target) return null;
                return (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#A7A3BC]">Recipient:</span>
                      <span className="text-white font-medium">{target.name} ({target.email})</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#A7A3BC]">Referral Code:</span>
                      <span className="text-purple-300 font-mono">{target.referralCode}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#A7A3BC]">Payout Amount:</span>
                      <span className="text-emerald-400 font-bold text-base">₹{target.pendingPayout.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                );
              })()}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedPayout(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleApprovePayout(selectedPayout)}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20"
                >
                  Confirm Settlement
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
