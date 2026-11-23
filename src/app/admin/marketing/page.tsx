"use client";

import React, { useState } from "react";
import {
  Megaphone,
  Mail,
  Send,
  Sparkles,
  CheckCircle,
  Eye,
  Plus,
  Trash2,
  Users,
  Search,
  ExternalLink,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { Modal } from "@/components/admin/ui/Modal";

interface Subscriber {
  id: string;
  email: string;
  subscribedDate: string;
  source: string;
  status: "active" | "unsubscribed";
}

const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: "sub-1", email: "priya.sharma@gmail.com", subscribedDate: "2026-03-24", source: "Homepage Popup", status: "active" },
  { id: "sub-2", email: "rohit.mehta@techverse.io", subscribedDate: "2026-03-22", source: "Footer Form", status: "active" },
  { id: "sub-3", email: "ananya.patel@designstudio.in", subscribedDate: "2026-03-20", source: "Checkout Opt-in", status: "active" },
  { id: "sub-4", email: "vikram.aditya@growthlabs.co", subscribedDate: "2026-03-18", source: "Free Resource Download", status: "active" },
  { id: "sub-5", email: "sameer.khan@creativeflow.com", subscribedDate: "2026-03-15", source: "Homepage Popup", status: "active" },
  { id: "sub-6", email: "neha.deshmukh@gmail.com", subscribedDate: "2026-03-10", source: "Footer Form", status: "unsubscribed" },
];

export default function MarketingPage() {
  const { products, addAuditLog } = useAdminData();

  // Announcement bar state
  const [announcementActive, setAnnouncementActive] = useState(true);
  const [announcementText, setAnnouncementText] = useState("⚡ FLASH LAUNCH SALE: Use code ELVORA50 for 50% OFF all AI Prompts & Guides!");
  const [announcementLink, setAnnouncementLink] = useState("/store");

  // Hero Promotional Banner state
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerTitle, setBannerTitle] = useState("Meta Ads Mastery 2026 PRO Edition");
  const [bannerDiscount, setBannerDiscount] = useState("54% OFF - Limited Early Access");

  // Featured Product state
  const [featuredProductId, setFeaturedProductId] = useState(products[0]?.id || "");

  // Newsletter Subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);
  const [searchQuery, setSearchQuery] = useState("");

  // Campaign modal
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignSegment, setCampaignSegment] = useState("All Active Subscribers");
  const [campaignBody, setCampaignBody] = useState("");
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    addAuditLog("Updated Announcement Bar", "Marketing", `Announcement: "${announcementText}" (Active: ${announcementActive})`);
    alert("Announcement bar settings saved successfully!");
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignSubject) return;
    setIsSentSuccess(true);
    addAuditLog("Dispatched Email Campaign", "Marketing", `Campaign: "${campaignSubject}" to ${campaignSegment}`);
    setTimeout(() => {
      setIsSentSuccess(false);
      setIsCampaignModalOpen(false);
      setCampaignSubject("");
      setCampaignBody("");
    }, 1500);
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Marketing & Growth Hub
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Manage storefront announcements, banners, featured products, and customer email campaigns.
          </p>
        </div>

        <button
          onClick={() => setIsCampaignModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25"
        >
          <Mail className="w-4 h-4" />
          Create Email Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Announcement Bar */}
        <AdminCard
          title="Global Announcement Bar"
          subtitle="Top banner broadcast visible on all storefront pages"
        >
          <form onSubmit={handleSaveAnnouncement} className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">Enable Announcement Bar</span>
                <p className="text-xs text-[#A7A3BC]">Toggles the announcement bar on the public storefront</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcementActive}
                  onChange={(e) => setAnnouncementActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Announcement Message</label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Target Action Link</label>
              <input
                type="text"
                value={announcementLink}
                onChange={(e) => setAnnouncementLink(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold rounded-xl transition-all"
              >
                Save Announcement
              </button>
            </div>
          </form>
        </AdminCard>

        {/* Featured Hero Product */}
        <AdminCard
          title="Storefront Featured Hero Product"
          subtitle="Select which product is highlighted on the marketplace home page"
        >
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Select Featured Product</label>
              <select
                value={featuredProductId}
                onChange={(e) => {
                  setFeaturedProductId(e.target.value);
                  const p = products.find((prod) => prod.id === e.target.value);
                  addAuditLog("Set Featured Product", "Marketing", `Selected "${p?.name || e.target.value}"`);
                }}
                className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#17152E] text-white">
                    {p.name} — ₹{p.price} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Hero Badge Text</label>
              <input
                type="text"
                value={bannerDiscount}
                onChange={(e) => setBannerDiscount(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">Active Showcase</span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {products.find((p) => p.id === featuredProductId)?.name || "Meta Ads Mastery 2026"}
                </p>
                <p className="text-xs text-[#A7A3BC] mt-0.5">{bannerDiscount}</p>
              </div>
              <a
                href={`/product/${products.find((p) => p.id === featuredProductId)?.slug || "meta-ads-mastery-2026"}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#22D3EE] hover:underline"
              >
                View Page <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Newsletter Subscribers Table */}
      <AdminCard
        title="Email Newsletter Subscribers"
        subtitle={`${subscribers.length} total subscribers collected across opt-ins`}
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
                <th className="px-4 py-3 rounded-l-lg">Subscriber Email</th>
                <th className="px-4 py-3">Source Channel</th>
                <th className="px-4 py-3">Subscribed Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#8B5CF6]" />
                    {sub.email}
                  </td>
                  <td className="px-4 py-3">{sub.source}</td>
                  <td className="px-4 py-3 text-xs">{sub.subscribedDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        sub.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setSubscribers((prev) => prev.filter((s) => s.id !== sub.id));
                        addAuditLog("Removed Subscriber", "Marketing", `Removed ${sub.email}`);
                      }}
                      className="p-1 hover:bg-white/10 text-[#A7A3BC] hover:text-rose-400 rounded-lg transition-colors"
                      title="Remove subscriber"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Campaign Composer Modal */}
      <Modal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        title="Compose Email Broadcast Campaign"
      >
        <form onSubmit={handleSendCampaign} className="space-y-4">
          {isSentSuccess ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Campaign Dispatched!</h3>
              <p className="text-sm text-[#A7A3BC]">
                Simulated broadcast sent to {subscribers.filter((s) => s.status === "active").length} active recipients.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Recipient Segment</label>
                <select
                  value={campaignSegment}
                  onChange={(e) => setCampaignSegment(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                >
                  <option value="All Active Subscribers" className="bg-[#17152E]">All Active Subscribers ({subscribers.length})</option>
                  <option value="Paying Customers Only" className="bg-[#17152E]">Paying Customers Only</option>
                  <option value="Meta Ads Learners" className="bg-[#17152E]">Meta Ads Learners</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Email Subject Line</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 🚀 Introducing the new Creator Productivity Toolkit!"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Email Body (Markdown / Plain Text)</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your email broadcast message..."
                  value={campaignBody}
                  onChange={(e) => setCampaignBody(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-sm font-semibold transition-all"
                >
                  <Send className="w-4 h-4" />
                  Dispatch Broadcast
                </button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}
