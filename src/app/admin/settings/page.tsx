"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Store,
  Palette,
  CreditCard,
  Mail,
  Key,
  ShieldCheck,
  RotateCcw,
  Save,
  CheckCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { StoreSettings } from "@/types/admin";

export default function SettingsPage() {
  const { settings, updateSettings, resetDemoData, addAuditLog } = useAdminData();
  const [activeTab, setActiveTab] = useState<
    "general" | "branding" | "checkout" | "emails" | "integrations" | "legal"
  >("general");

  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all demo store data to initial factory defaults?")) {
      resetDemoData();
      alert("Demo data successfully reset!");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Store Configuration & Settings
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Global store preferences, branding palettes, automated email templates, and backend API integration endpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 rounded-xl text-xs font-semibold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Demo State
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5">
        {[
          { id: "general", label: "General", icon: Store },
          { id: "branding", label: "Branding & Theme", icon: Palette },
          { id: "checkout", label: "Checkout & Entitlements", icon: CreditCard },
          { id: "emails", label: "Email Notifications", icon: Mail },
          { id: "integrations", label: "API Integrations", icon: Key },
          { id: "legal", label: "Legal & Policies", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20"
                  : "bg-[#17152E] text-[#A7A3BC] hover:text-white border border-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave}>
        <AdminCard>
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">General Marketplace Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Store Name</label>
                  <input
                    type="text"
                    value={formData.general.storeName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        general: { ...formData.general, storeName: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Support Email</label>
                  <input
                    type="email"
                    value={formData.general.supportEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        general: { ...formData.general, supportEmail: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Currency Symbol</label>
                  <input
                    type="text"
                    value={formData.general.currencySymbol}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        general: { ...formData.general, currencySymbol: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Timezone</label>
                  <input
                    type="text"
                    value={formData.general.timeZone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        general: { ...formData.general, timeZone: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Store Tagline / Description</label>
                  <textarea
                    rows={2}
                    value={formData.general.storeDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        general: { ...formData.general, storeDescription: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Branding Tab */}
          {activeTab === "branding" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">Visual Branding Palette</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Primary Brand Color</label>
                  <div className="flex items-center gap-3 mt-1.5">
                    <input
                      type="color"
                      value={formData.branding.primaryColor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          branding: { ...formData.branding, primaryColor: e.target.value },
                        })
                      }
                      className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.branding.primaryColor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          branding: { ...formData.branding, primaryColor: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Secondary Accent Color</label>
                  <div className="flex items-center gap-3 mt-1.5">
                    <input
                      type="color"
                      value={formData.branding.accentColor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          branding: { ...formData.branding, accentColor: e.target.value },
                        })
                      }
                      className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.branding.accentColor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          branding: { ...formData.branding, accentColor: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Font Family Stack</label>
                  <input
                    type="text"
                    value={formData.branding.fontFamily}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        branding: { ...formData.branding, fontFamily: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Checkout & Entitlements Tab */}
          {activeTab === "checkout" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">Checkout Rules & Access Automation</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                    <span className="text-sm font-medium text-white">Auto-Grant Access Upon Payment</span>
                    <p className="text-xs text-[#A7A3BC]">Automatically issues digital library entitlement as soon as payment is confirmed</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.checkout.autoGrantAccessOnPaid}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkout: { ...formData.checkout, autoGrantAccessOnPaid: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-[#8B5CF6] rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                    <span className="text-sm font-medium text-white">Require Phone Number</span>
                    <p className="text-xs text-[#A7A3BC]">Mandatory mobile phone field during cart checkout for WhatsApp updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.checkout.requirePhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkout: { ...formData.checkout, requirePhone: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-[#8B5CF6] rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                    <span className="text-sm font-medium text-white">Demo Simulation Mode</span>
                    <p className="text-xs text-[#A7A3BC]">Simulates orders without invoking live UPI or Stripe gateway webhooks</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.checkout.enableDemoMode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkout: { ...formData.checkout, enableDemoMode: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-[#8B5CF6] rounded"
                  />
                </div>

                <div className="pt-2">
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Default GST / Tax Rate (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={28}
                    value={formData.checkout.taxPercentage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkout: { ...formData.checkout, taxPercentage: Number(e.target.value) },
                      })
                    }
                    className="w-40 mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Templates Tab */}
          {activeTab === "emails" && (
            <div className="space-y-5">
              <div className="p-4 bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-900/20 border border-purple-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                    Advanced Email Delivery Center & Template Studio
                  </h4>
                  <p className="text-xs text-[#A7A3BC] mt-0.5">
                    Configure live SMTP credentials, test RFC 5321 handshakes, customize rich templates with live visual preview, and inspect delivery logs.
                  </p>
                </div>
                <Link
                  href="/admin/email"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold rounded-xl whitespace-nowrap shadow-md transition-all"
                >
                  Open Email Setup Suite
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <h3 className="text-base font-semibold text-white">Automated Transactional Emails</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Order Confirmation Subject</label>
                  <input
                    type="text"
                    value={formData.emailTemplates.orderConfirmationSubject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emailTemplates: {
                          ...formData.emailTemplates,
                          orderConfirmationSubject: e.target.value,
                        },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Access Invitation Subject</label>
                  <input
                    type="text"
                    value={formData.emailTemplates.accessInvitationSubject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emailTemplates: {
                          ...formData.emailTemplates,
                          accessInvitationSubject: e.target.value,
                        },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Refund Notice Subject</label>
                  <input
                    type="text"
                    value={formData.emailTemplates.refundNoticeSubject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emailTemplates: {
                          ...formData.emailTemplates,
                          refundNoticeSubject: e.target.value,
                        },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === "integrations" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">Backend Integration Placeholders</h3>
              <p className="text-xs text-[#A7A3BC]">
                Store your API keys safely here when connecting a real production backend.
              </p>
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Razorpay Key ID / Secret</label>
                  <input
                    type="password"
                    placeholder="rzp_live_xxxxxxxxxxxx"
                    value={formData.integrations.razorpayKeyPlaceholder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        integrations: {
                          ...formData.integrations,
                          razorpayKeyPlaceholder: e.target.value,
                        },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Stripe Secret Key</label>
                  <input
                    type="password"
                    placeholder="sk_live_xxxxxxxxxxxx"
                    value={formData.integrations.stripeKeyPlaceholder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        integrations: {
                          ...formData.integrations,
                          stripeKeyPlaceholder: e.target.value,
                        },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Email Service (SendGrid / Postmark)</label>
                  <input
                    type="password"
                    placeholder="SG.xxxxxxxxxxxx"
                    value={formData.integrations.emailServicePlaceholder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        integrations: {
                          ...formData.integrations,
                          emailServicePlaceholder: e.target.value,
                        },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">AWS S3 / Cloudflare R2 Asset Bucket</label>
                  <input
                    type="text"
                    placeholder="s3://ElvorDigital-secure-vault"
                    value={formData.integrations.cloudStoragePlaceholder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        integrations: {
                          ...formData.integrations,
                          cloudStoragePlaceholder: e.target.value,
                        },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Legal Tab */}
          {activeTab === "legal" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">Digital Product Legal Terms & Delivery SLA</h3>
              <div className="space-y-3 text-xs text-[#A7A3BC]">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <h4 className="font-semibold text-white text-sm">Instant Digital Delivery Guarantee</h4>
                  <p>
                    All digital items (video courses, templates, prompt packs, code kits) are dispatched via instant email invite link to the customer’s specified email address immediately following payment confirmation.
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <h4 className="font-semibold text-white text-sm">7-Day Satisfaction & Refund Policy</h4>
                  <p>
                    Customers may request an administrative refund within 7 days of purchase if they experience unresolvable technical difficulties or duplicate transactions. Approved refunds immediately revoke the corresponding access entitlement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
            {isSaved ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle className="w-4 h-4" />
                Settings saved successfully!
              </span>
            ) : (
              <span className="text-xs text-[#A7A3BC]">Changes will be applied across your storefront.</span>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </AdminCard>
      </form>
    </div>
  );
}
