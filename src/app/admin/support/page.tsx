"use client";

import React, { useState } from "react";
import {
  LifeBuoy,
  MessageSquare,
  Search,
  Filter,
  Send,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Shield,
  Trash2,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { StatCard } from "@/components/admin/ui/StatCard";
import { Modal } from "@/components/admin/ui/Modal";
import { SupportTicket } from "@/types/admin";

export default function SupportPage() {
  const { tickets, updateTicketStatus, addTicketResponse, deleteTicket, currentUser } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState("");

  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter((t) => t.status === "in_progress" || t.status === "waiting").length;
  const resolvedTickets = tickets.filter((t) => t.status === "resolved" || t.status === "closed").length;

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;
    addTicketResponse(activeTicket.id, replyText.trim());
    // Update local modal state to show response immediately
    setActiveTicket((prev) =>
      prev
        ? {
            ...prev,
            responses: [
              ...prev.responses,
              {
                sender: currentUser.name,
                role: "admin",
                message: replyText.trim(),
                timestamp: "Just now",
              },
            ],
            status: "waiting",
          }
        : null
    );
    setReplyText("");
  };

  const handleStatusChange = (status: SupportTicket["status"]) => {
    if (!activeTicket) return;
    updateTicketStatus(activeTicket.id, status);
    setActiveTicket((prev) => (prev ? { ...prev, status } : null));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Customer Support & Ticket Desk
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Resolve customer queries regarding course access, downloads, invoice billing, and software licenses.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Open Urgent Inquiries"
          value={openTickets.toString()}
          change="Requires triage"
          isPositive={false}
          icon={AlertCircle}
          iconColor="#EF4444"
          subtitle="Awaiting first response"
        />
        <StatCard
          title="In Progress"
          value={inProgressTickets.toString()}
          change="Active dialogues"
          isPositive={true}
          icon={LifeBuoy}
          iconColor="#F59E0B"
          subtitle="Under agent investigation"
        />
        <StatCard
          title="Resolved"
          value={resolvedTickets.toString()}
          change="98% satisfaction"
          isPositive={true}
          icon={CheckCircle2}
          iconColor="#22C55E"
          subtitle="Closed successfully"
        />
      </div>

      {/* Tickets Table */}
      <AdminCard
        title="Support Tickets"
        subtitle={`Showing ${filteredTickets.length} of ${tickets.length} total tickets`}
        action={
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
              <input
                type="text"
                placeholder="Search ticket # or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-[#A7A3BC] focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="all" className="bg-[#17152E]">All Statuses</option>
              <option value="open" className="bg-[#17152E]">Open</option>
              <option value="in_progress" className="bg-[#17152E]">In Progress</option>
              <option value="waiting" className="bg-[#17152E]">Waiting on Customer</option>
              <option value="resolved" className="bg-[#17152E]">Resolved</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A7A3BC]">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-[#A7A3BC]">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Ticket</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Subject & Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-purple-300 font-semibold">
                    {t.ticketNumber}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{t.customerName}</p>
                    <p className="text-xs text-[#A7A3BC]">{t.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 max-w-[240px]">
                    <p className="text-white font-medium truncate">{t.subject}</p>
                    <span className="text-xs text-[#22D3EE]">{t.issueType}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        t.priority === "urgent"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : t.priority === "high"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        t.status === "open"
                          ? "bg-rose-500/10 text-rose-400"
                          : t.status === "resolved"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      {t.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{t.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setActiveTicket(t)}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-semibold transition-all"
                      >
                        Open Desk
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete support ticket ${t.ticketNumber}?`)) {
                            deleteTicket(t.id);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                        title="Delete Ticket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Ticket Conversation Desk Modal */}
      {activeTicket && (
        <Modal
          isOpen={!!activeTicket}
          onClose={() => setActiveTicket(null)}
          title={`Ticket ${activeTicket.ticketNumber}: ${activeTicket.subject}`}
        >
          <div className="space-y-4">
            {/* Status change selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#A7A3BC]">Customer:</span>
                <span className="text-xs font-semibold text-white">{activeTicket.customerName} ({activeTicket.customerEmail})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#A7A3BC]">Mark Status:</span>
                <select
                  value={activeTicket.status}
                  onChange={(e) => handleStatusChange(e.target.value as SupportTicket["status"])}
                  className="px-2.5 py-1 bg-[#17152E] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="waiting">Waiting on Customer</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Conversation Log */}
            <div className="max-h-72 overflow-y-auto space-y-3 p-3 bg-black/20 rounded-xl border border-white/5">
              {activeTicket.responses.map((res, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-sm ${
                    res.role === "admin"
                      ? "bg-purple-900/30 border border-purple-500/20 ml-6"
                      : "bg-white/5 border border-white/10 mr-6"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-[#A7A3BC] mb-1">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      {res.role === "admin" ? <Shield className="w-3.5 h-3.5 text-purple-400" /> : <User className="w-3.5 h-3.5 text-blue-400" />}
                      {res.sender} ({res.role === "admin" ? "Support Specialist" : "Customer"})
                    </span>
                    <span>{res.timestamp}</span>
                  </div>
                  <p className="text-white/90 text-xs leading-relaxed">{res.message}</p>
                </div>
              ))}
            </div>

            {/* Response Box */}
            <form onSubmit={handleSendReply} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder="Type your response to the customer..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              ></textarea>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTicket(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all"
                >
                  Close Desk
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/20"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
