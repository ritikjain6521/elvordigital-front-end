"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Send,
  CheckCircle,
  Clock,
  DollarSign,
  Search,
  Sparkles,
  Mail,
  Tag,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { StatCard } from "@/components/admin/ui/StatCard";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { Modal } from "@/components/admin/ui/Modal";
import { AbandonedCart } from "@/types/admin";

export default function AbandonedCartsPage() {
  const { abandonedCarts, addAuditLog } = useAdminData();
  const [carts, setCarts] = useState<AbandonedCart[]>(abandonedCarts);
  const [selectedCart, setSelectedCart] = useState<AbandonedCart | null>(null);
  const [discountCode, setDiscountCode] = useState("SAVE15NOW");
  const [customMessage, setCustomMessage] = useState(
    "Hi there! We noticed you left some awesome digital tools in your cart. Complete your order today and take an extra 15% off with this exclusive code."
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalLostValue = carts.reduce((acc, c) => acc + c.cartValue, 0);
  const unrecoveredCount = carts.filter((c) => c.status === "abandoned").length;

  const filteredCarts = carts.filter(
    (c) =>
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendFollowup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCart) return;

    setCarts((prev) =>
      prev.map((c) => (c.id === selectedCart.id ? { ...c, status: "followup_sent" } : c))
    );

    addAuditLog(
      "Sent Abandoned Cart Recovery",
      "Marketing",
      `Sent recovery email with code ${discountCode} to ${selectedCart.customerEmail} (Cart: ₹${selectedCart.cartValue})`
    );

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedCart(null);
    }, 1300);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Abandoned Cart Recovery
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Re-engage customers who added digital products to cart without checking out. Send automated recovery emails with promo codes.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Potential At-Risk Value"
          value={`₹${totalLostValue.toLocaleString("en-IN")}`}
          change="Needs follow-up"
          isPositive={false}
          icon={DollarSign}
          iconColor="#EF4444"
          subtitle="Total unfinished checkout carts"
        />
        <StatCard
          title="Unrecovered Sessions"
          value={unrecoveredCount.toString()}
          change="Pending email"
          isPositive={false}
          icon={ShoppingBag}
          iconColor="#F59E0B"
          subtitle="Customers eligible for recovery"
        />
        <StatCard
          title="Recovery Benchmark"
          value="24.8%"
          change="+4.2% industry avg"
          isPositive={true}
          icon={Sparkles}
          iconColor="#8B5CF6"
          subtitle="Estimated conversion after reminder"
        />
      </div>

      {/* Cart Recovery Table */}
      <AdminCard
        title="Abandoned Checkout Sessions"
        subtitle={`Showing ${filteredCarts.length} abandoned customer sessions`}
        action={
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
            <input
              type="text"
              placeholder="Search by customer..."
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
                <th className="px-4 py-3 rounded-l-lg">Customer</th>
                <th className="px-4 py-3">Cart Contents</th>
                <th className="px-4 py-3">Cart Value</th>
                <th className="px-4 py-3">Last Activity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCarts.map((cart) => (
                <tr key={cart.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{cart.customerName}</p>
                    <p className="text-xs text-[#A7A3BC]">{cart.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <ul className="text-xs text-white space-y-0.5">
                      {cart.items.map((item, idx) => (
                        <li key={idx} className="truncate max-w-[220px]">
                          • {item.productName} (₹{item.price})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-white font-bold">
                    ₹{cart.cartValue.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-xs flex items-center gap-1.5 text-[#A7A3BC]">
                    <Clock className="w-3.5 h-3.5" />
                    {cart.lastActivity}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        cart.status === "recovered"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : cart.status === "followup_sent"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {cart.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedCart(cart)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-purple-300 border border-[#8B5CF6]/30 rounded-lg text-xs font-semibold transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Send Follow-up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Follow-up Draft Modal */}
      {selectedCart && (
        <Modal
          isOpen={!!selectedCart}
          onClose={() => setSelectedCart(null)}
          title={`Cart Recovery Email: ${selectedCart.customerName}`}
        >
          {isSuccess ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Recovery Email Dispatched!</h3>
              <p className="text-sm text-[#A7A3BC]">
                Simulated follow-up with incentive promo code delivered to {selectedCart.customerEmail}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendFollowup} className="space-y-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A7A3BC]">Recipient:</span>
                  <span className="text-white font-medium">{selectedCart.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A7A3BC]">Cart Amount:</span>
                  <span className="text-purple-300 font-bold">₹{selectedCart.cartValue}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Incentive Promo Code</label>
                <div className="relative mt-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                  <input
                    type="text"
                    required
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-purple-300 focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Recovery Note</label>
                <textarea
                  rows={4}
                  required
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedCart(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/20"
                >
                  <Send className="w-4 h-4" />
                  Dispatch Reminder
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
