"use client";

import React, { useState } from "react";
import {
  Key,
  Copy,
  Check,
  Search,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Laptop,
  RefreshCw,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { Modal } from "@/components/admin/ui/Modal";
import { SoftwareLicense } from "@/types/admin";

export default function LicensesPage() {
  const { licenses, products, addAuditLog } = useAdminData();
  const [licenseList, setLicenseList] = useState<SoftwareLicense[]>(licenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Issue new key modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || "Creator Productivity Toolkit");
  const [deviceLimit, setDeviceLimit] = useState(3);

  const filteredLicenses = licenseList.filter(
    (l) =>
      l.licenseKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRevoke = (id: string) => {
    setLicenseList((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const nextStatus = l.status === "active" ? "revoked" : "active";
          addAuditLog(
            nextStatus === "revoked" ? "Revoked License Key" : "Reinstated License Key",
            "Licenses",
            `Key ${l.licenseKey} for ${l.customerEmail} is now ${nextStatus}`
          );
          return { ...l, status: nextStatus };
        }
        return l;
      })
    );
  };

  const handleCreateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const newKey = `ZNVA-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newLicense: SoftwareLicense = {
      id: `lic-${Date.now()}`,
      licenseKey: newKey,
      customerEmail,
      productName: selectedProduct,
      activationDate: new Date().toISOString().split("T")[0],
      expiryDate: "Lifetime",
      status: "active",
      deviceLimit,
      devicesUsed: 0,
    };

    setLicenseList((prev) => [newLicense, ...prev]);
    addAuditLog("Issued License Key", "Licenses", `Generated key ${newKey} for ${customerEmail}`);
    setIsModalOpen(false);
    setCustomerEmail("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Software License Management
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Issue, track, and revoke activation keys for downloadable software, Notion systems, and developer kits.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25"
        >
          <Plus className="w-4 h-4" />
          Issue New License
        </button>
      </div>

      {/* Licenses Table */}
      <AdminCard
        title="Active License Keys"
        subtitle={`Showing ${filteredLicenses.length} software licenses across store assets`}
        action={
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
            <input
              type="text"
              placeholder="Search keys, emails, tools..."
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
                <th className="px-4 py-3 rounded-l-lg">License Key</th>
                <th className="px-4 py-3">Owner Email</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Device Slots</th>
                <th className="px-4 py-3">Activation Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLicenses.map((lic) => (
                <tr key={lic.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCopy(lic.licenseKey)}
                      className="inline-flex items-center gap-2 font-mono text-xs px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-purple-300 transition-colors"
                      title="Copy license key"
                    >
                      <Key className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>{lic.licenseKey}</span>
                      {copiedKey === lic.licenseKey ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#A7A3BC]" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-white">{lic.customerEmail}</td>
                  <td className="px-4 py-3 text-white max-w-[200px] truncate">{lic.productName}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Laptop className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span>
                        {lic.devicesUsed} / {lic.deviceLimit}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">{lic.activationDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        lic.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {lic.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRevoke(lic.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        lic.status === "active"
                          ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                          : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
                      }`}
                    >
                      {lic.status === "active" ? "Revoke" : "Reinstate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Issue License Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue New Software License Key">
        <form onSubmit={handleCreateLicense} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Customer Email</label>
            <input
              type="email"
              required
              placeholder="customer@domain.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Associated Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.name} className="bg-[#17152E]">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Device Activation Limit</label>
            <input
              type="number"
              min={1}
              max={10}
              value={deviceLimit}
              onChange={(e) => setDeviceLimit(Number(e.target.value))}
              className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25"
            >
              Generate & Dispatch Key
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
