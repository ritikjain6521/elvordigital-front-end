"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  Clock,
  User,
  Activity,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { AdminCard } from "@/components/admin/ui/AdminCard";

export default function AuditLogsPage() {
  const { auditLogs } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");

  const modules = Array.from(new Set(auditLogs.map((l) => l.module)));

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  const handleExportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `elvoradigital-audit-trail-${Date.now()}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            System & Security Audit Trail
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Immutable administrative event logging tracking all mutations, entitlement changes, price updates, and role switches.
          </p>
        </div>

        <button
          onClick={handleExportLogs}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-medium transition-all"
        >
          <Download className="w-4 h-4 text-[#8B5CF6]" />
          Export JSON Audit Log
        </button>
      </div>

      {/* Filters */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
            <input
              type="text"
              placeholder="Search actions, admins, details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-[#A7A3BC] focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#A7A3BC]" />
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="all" className="bg-[#17152E]">All Modules</option>
              {modules.map((m) => (
                <option key={m} value={m} className="bg-[#17152E]">
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </AdminCard>

      {/* Audit Log Table */}
      <AdminCard
        title="Audit Events"
        subtitle={`Showing ${filteredLogs.length} logged administrative events`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A7A3BC]">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-[#A7A3BC]">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Timestamp</th>
                <th className="px-4 py-3">Actor / Admin</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Module</th>
                <th className="px-4 py-3 rounded-r-lg">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#A7A3BC] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-3 text-white font-medium flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    {log.adminName}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    {log.action}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-[#22D3EE]">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#A7A3BC] max-w-md">
                    {log.details}
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
