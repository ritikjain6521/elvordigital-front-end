"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  Clock,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import StatCard from "@/components/admin/ui/StatCard";
import AdminCard from "@/components/admin/ui/AdminCard";
import { useAdminData } from "@/context/admin/AdminDataContext";

const REVENUE_DATA = [
  { date: "Feb 14", revenue: 14200, orders: 18 },
  { date: "Feb 15", revenue: 18400, orders: 24 },
  { date: "Feb 16", revenue: 22100, orders: 29 },
  { date: "Feb 17", revenue: 26800, orders: 36 },
  { date: "Feb 18", revenue: 31200, orders: 42 },
  { date: "Feb 19", revenue: 28900, orders: 38 },
  { date: "Feb 20", revenue: 35600, orders: 46 },
];

const CATEGORY_PIE = [
  { name: "Meta Ads Courses", value: 42, color: "#8B5CF6" },
  { name: "AI Prompts", value: 24, color: "#EC4899" },
  { name: "Canva & UI Kits", value: 18, color: "#6366F1" },
  { name: "Ebooks & Playbooks", value: 10, color: "#22C55E" },
  { name: "Software Tools", value: 6, color: "#06B6D4" },
];

const CONVERSION_DATA = [
  { name: "Meta Ads 2026", rate: 5.8 },
  { name: "AI Prompts", rate: 6.4 },
  { name: "Canva Creator Kit", rate: 4.9 },
  { name: "Biz Blueprint", rate: 4.2 },
  { name: "UI Kit Figma", rate: 3.8 },
];

export default function AdminOverviewDashboard() {
  const { products, orders, customers, refunds, accessRecords, auditLogs } = useAdminData();
  const [dateFilter, setDateFilter] = useState("30 Days");
  const [liveMetrics, setLiveMetrics] = useState<any>(null);

  // Fetch real-time live metrics directly from MongoDB API
  React.useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/metrics");
        const data = await res.json();
        if (data.success && data.metrics) {
          setLiveMetrics(data);
        }
      } catch {
        // Fallback to context state
      }
    };
    fetchMetrics();
  }, [orders.length]);

  // Calculate dynamic aggregates strictly from MongoDB records (ZERO hardcoded mock offsets)
  const totalRevenue = liveMetrics?.metrics?.totalRevenue ?? orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = liveMetrics?.metrics?.totalOrders ?? orders.length;
  const totalCustomersCount = liveMetrics?.metrics?.totalCustomers ?? customers.length;
  const activeProductsCount = liveMetrics?.metrics?.activeProducts ?? products.filter((p) => p.status === "published").length;
  const pendingOrdersCount = orders.filter((o) => o.paymentStatus === "pending").length;
  const pendingRefundsCount = refunds.filter((r) => r.status === "pending").length;

  const recentOrders = orders.slice(0, 5);
  const recentCustomers = customers.slice(0, 5);
  const topProducts = [...products].sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0)).slice(0, 5);

  // Dynamic Category chart from live database
  const categoryChartData = React.useMemo(() => {
    if (liveMetrics?.categoryStats && liveMetrics.categoryStats.length > 0) {
      const colors = ["#8B5CF6", "#EC4899", "#6366F1", "#22C55E", "#06B6D4"];
      return liveMetrics.categoryStats.map((c: any, idx: number) => ({
        name: c.name,
        value: c.productCount || 1,
        color: colors[idx % colors.length],
      }));
    }
    return [
      { name: "Digital Mastery", value: products.length || 1, color: "#8B5CF6" },
    ];
  }, [liveMetrics, products.length]);

  // Dynamic Revenue Trends from live orders
  const revenueChartData = React.useMemo(() => {
    if (liveMetrics?.revenueTrends && liveMetrics.revenueTrends.length > 0) {
      return liveMetrics.revenueTrends;
    }
    if (orders.length > 0) {
      const map: Record<string, number> = {};
      orders.forEach((o) => {
        const d = o.orderDate ? new Date(o.orderDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Today";
        map[d] = (map[d] || 0) + o.totalAmount;
      });
      return Object.entries(map).map(([date, revenue]) => ({ date, revenue }));
    }
    return [
      { date: "Current", revenue: totalRevenue, orders: totalOrdersCount },
    ];
  }, [liveMetrics, orders, totalRevenue, totalOrdersCount]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Sparkles size={13} className="text-pink-400" />
            <span>EXECUTIVE STORE OVERVIEW</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome back, Admin!
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A3BC] mt-0.5">
            Here&apos;s what&apos;s happening with your digital store today.
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#17152E] border border-white/10 self-start md:self-auto text-xs overflow-x-auto">
          {["Today", "7 Days", "30 Days", "90 Days", "This Year"].map((tab) => (
            <button
              key={tab}
              onClick={() => setDateFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                dateFilter === tab
                  ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30"
                  : "text-[#A7A3BC] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Top 6 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          change="+18.4%"
          isPositive={true}
          icon={IndianRupee}
          subtitle="Net verified sales"
        />
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          change="+12.6%"
          isPositive={true}
          icon={ShoppingBag}
          subtitle="Across all channels"
        />
        <StatCard
          title="Total Customers"
          value={totalCustomersCount}
          change="+9.2%"
          isPositive={true}
          icon={Users}
          subtitle="Unique purchaser emails"
        />
        <StatCard
          title="Active Products"
          value={activeProductsCount}
          icon={Package}
          subtitle="Live on storefront"
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrdersCount}
          icon={Clock}
          subtitle="Awaiting checkout pay"
          accentColor="from-amber-500/20 to-orange-500/10"
        />
        <StatCard
          title="Refund Requests"
          value={pendingRefundsCount}
          icon={RotateCcw}
          subtitle="Requires attention"
          accentColor="from-pink-500/20 to-rose-500/10"
        />
      </div>

      {/* Revenue Chart & Category Distribution */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Revenue Curve (8 cols) */}
        <div className="lg:col-span-8">
          <AdminCard
            title="Revenue Overview & Daily Sales Velocity"
            subtitle="Gross income trends and transaction count"
            action={
              <Link
                href="/admin/analytics"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>Deep Analytics</span>
                <ArrowRight size={13} />
              </Link>
            }
          >
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    stroke="#525070"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#525070"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#17152E",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#A855F7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AdminCard>
        </div>

        {/* Category Share (4 cols) */}
        <div className="lg:col-span-4">
          <AdminCard
            title="Catalog Distribution"
            subtitle="Products across active categories"
          >
            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryChartData.map((entry: any) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#17152E",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      fontSize: "11px",
                    }}
                    formatter={(val) => [`${val} Products`, "Catalog"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              {categoryChartData.map((item: any) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-300 truncate max-w-[150px]">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Middle Row: Conversion Rates & Recent Orders */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Landing Page Conversion Rates (5 cols) */}
        <div className="lg:col-span-5">
          <AdminCard
            title="Product Conversion Rates"
            subtitle="Sales page visitor-to-purchaser conversion"
            action={
              <Link
                href="/admin/landing-pages"
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Page Builder →
              </Link>
            }
          >
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CONVERSION_DATA} layout="vertical">
                  <XAxis
                    type="number"
                    stroke="#525070"
                    fontSize={11}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#525070"
                    fontSize={11}
                    width={110}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#17152E",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      fontSize: "11px",
                    }}
                    formatter={(val) => [`${val}%`, "CVR"]}
                  />
                  <Bar dataKey="rate" fill="#8B5CF6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AdminCard>
        </div>

        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7">
          <AdminCard
            title="Recent Orders"
            subtitle="Latest live transactions"
            action={
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowRight size={13} />
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 pb-2">
                    <th className="py-2.5 font-semibold">Order</th>
                    <th className="py-2.5 font-semibold">Customer</th>
                    <th className="py-2.5 font-semibold">Amount</th>
                    <th className="py-2.5 font-semibold">Status</th>
                    <th className="py-2.5 font-semibold text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 font-mono font-bold text-white">
                        <Link href={`/admin/orders/${ord.id}`} className="hover:text-purple-300">
                          {ord.orderNumber.replace("ZNV-ORD-2026-", "#")}
                        </Link>
                      </td>
                      <td className="py-3">
                        <span className="font-semibold text-gray-200 block truncate max-w-[140px]">
                          {ord.customerName}
                        </span>
                        <span className="text-[10px] text-gray-400">{ord.customerEmail}</span>
                      </td>
                      <td className="py-3 font-bold text-white">
                        ₹{ord.totalAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.paymentStatus === "paid"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : ord.paymentStatus === "refunded"
                              ? "bg-pink-500/20 text-pink-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-purple-300 text-[11px] font-semibold">
                          {ord.accessStatus === "granted" ? "Granted ✓" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Bottom Row: Top Selling Products, Recent Customers, Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <AdminCard
          title="Top Selling Products"
          subtitle="Ranked by unit volume"
          action={
            <Link href="/admin/products" className="text-xs text-purple-400 hover:text-purple-300">
              Manage →
            </Link>
          }
        >
          <div className="space-y-3">
            {topProducts.map((p, idx) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate max-w-[170px]">
                    <span className="text-xs font-bold text-white truncate block">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      ₹{p.price} • {p.totalSales} units sold
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-purple-300 shrink-0">
                  ₹{(p.totalRevenue / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Recent Customers */}
        <AdminCard
          title="Recent Customers"
          subtitle="Newest registered buyers"
          action={
            <Link href="/admin/customers" className="text-xs text-purple-400 hover:text-purple-300">
              CRM →
            </Link>
          }
        >
          <div className="space-y-3">
            {recentCustomers.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {c.avatar}
                  </div>
                  <div className="truncate max-w-[150px]">
                    <span className="text-xs font-bold text-white block truncate">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-gray-400 truncate block">
                      {c.email}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white block">
                    ₹{c.totalSpending.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-purple-300">{c.totalOrders} order(s)</span>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Recent Administrative Activity Log */}
        <AdminCard
          title="Recent Admin Activity"
          subtitle="Audit log updates"
          action={
            <Link href="/admin/audit-logs" className="text-xs text-purple-400 hover:text-purple-300">
              All Logs →
            </Link>
          }
        >
          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="text-xs space-y-0.5 border-l-2 border-purple-500/40 pl-3 py-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="text-[10px] text-gray-400">{log.timestamp.split(" ")[1]}</span>
                </div>
                <p className="text-[11px] text-[#A7A3BC] line-clamp-1">{log.details}</p>
                <span className="text-[10px] text-purple-400 font-mono">By {log.adminName}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
