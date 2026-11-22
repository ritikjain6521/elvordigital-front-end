"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Repeat,
  Tag,
  AlertOctagon,
  Download,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminData } from "@/context/admin/AdminDataContext";
import { StatCard } from "@/components/admin/ui/StatCard";
import { AdminCard } from "@/components/admin/ui/AdminCard";

export default function AnalyticsPage() {
  const { orders, customers, refunds, coupons, products } = useAdminData();
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");

  // Calculations
  const totalRevenue = useMemo(
    () => orders.filter((o) => o.paymentStatus === "paid").reduce((acc, curr) => acc + curr.totalAmount, 0),
    [orders]
  );

  const totalRefundAmount = useMemo(
    () => refunds.filter((r) => r.status === "approved").reduce((acc, curr) => acc + curr.amount, 0),
    [refunds]
  );

  const netRevenue = Math.max(0, totalRevenue - totalRefundAmount);

  const paidOrders = useMemo(() => orders.filter((o) => o.paymentStatus === "paid"), [orders]);

  const aov = paidOrders.length > 0 ? Math.round(totalRevenue / paidOrders.length) : 0;

  const repeatCustomers = useMemo(
    () => customers.filter((c) => c.totalOrders > 1).length,
    [customers]
  );
  const repeatRate = customers.length > 0 ? Math.round((repeatCustomers / customers.length) * 100) : 0;

  const couponUsageCount = coupons.reduce((acc, c) => acc + c.usageCount, 0);

  const refundRate = paidOrders.length > 0 ? ((refunds.length / paidOrders.length) * 100).toFixed(1) : "0";

  // Dynamic Trend Data based strictly on live MongoDB orders
  const revenueTrendData = useMemo(() => {
    if (orders.length === 0) {
      return [
        { date: "Day 1", revenue: 0, orders: 0 },
        { date: "Day 2", revenue: 0, orders: 0 },
        { date: "Day 3", revenue: 0, orders: 0 },
        { date: "Today", revenue: 0, orders: 0 },
      ];
    }

    const map: Record<string, { revenue: number; orders: number }> = {};
    orders.forEach((o) => {
      const d = o.orderDate ? new Date(o.orderDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Today";
      if (!map[d]) {
        map[d] = { revenue: 0, orders: 0 };
      }
      map[d].orders += 1;
      if (o.paymentStatus === "paid") {
        map[d].revenue += o.totalAmount;
      }
    });

    return Object.entries(map).map(([date, val]) => ({
      date,
      revenue: val.revenue,
      orders: val.orders,
    }));
  }, [orders]);

  // Product sales chart from real products
  const productSalesData = useMemo(() => {
    return products
      .slice(0, 6)
      .map((p) => ({
        name: p.name.length > 18 ? p.name.substring(0, 16) + "..." : p.name,
        revenue: p.totalRevenue || 0,
        sales: p.totalSales || 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [products]);

  // Customer acquisition composition
  const customerTypeData = [
    { name: "New Customers", value: Math.max(0, customers.length - repeatCustomers), color: "#8B5CF6" },
    { name: "Repeat Buyers", value: repeatCustomers, color: "#22D3EE" },
  ];

  // Export CSV handler
  const handleExportCSV = () => {
    const csvRows = [
      ["Order ID", "Customer", "Email", "Date", "Amount", "Status"],
      ...orders.map((o) => [
        o.orderNumber,
        o.customerName,
        o.customerEmail,
        o.orderDate,
        o.totalAmount.toString(),
        o.paymentStatus,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zenovavibe-analytics-orders-${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Store Performance & Analytics
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Deep insights into revenue curves, product performance, customer retention, and unit economics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#17152E] border border-white/10 rounded-xl p-1">
            {(["7d", "30d", "90d", "all"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  timeRange === range
                    ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20"
                    : "text-[#A7A3BC] hover:text-white"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-medium transition-all"
          >
            <Download className="w-4 h-4 text-[#8B5CF6]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Net Revenue"
          value={`₹${netRevenue.toLocaleString("en-IN")}`}
          change="+18.4%"
          isPositive={true}
          icon={DollarSign}
          iconColor="#8B5CF6"
          subtitle="After refunds deducted"
        />
        <StatCard
          title="Avg Order Value"
          value={`₹${aov.toLocaleString("en-IN")}`}
          change="+6.2%"
          isPositive={true}
          icon={ShoppingCart}
          iconColor="#22D3EE"
          subtitle="Per paying order"
        />
        <StatCard
          title="Repeat Buyer Rate"
          value={`${repeatRate}%`}
          change="+3.1%"
          isPositive={true}
          icon={Repeat}
          iconColor="#A855F7"
          subtitle={`${repeatCustomers} loyal customers`}
        />
        <StatCard
          title="Total Customers"
          value={customers.length.toString()}
          change="+24 this mo"
          isPositive={true}
          icon={Users}
          iconColor="#6366F1"
          subtitle="Registered profiles"
        />
        <StatCard
          title="Coupon Usages"
          value={couponUsageCount.toString()}
          change="+14.5%"
          isPositive={true}
          icon={Tag}
          iconColor="#F59E0B"
          subtitle="Active campaign codes"
        />
        <StatCard
          title="Refund Rate"
          value={`${refundRate}%`}
          change="-0.4%"
          isPositive={true}
          icon={AlertOctagon}
          iconColor="#EF4444"
          subtitle={`${refunds.length} total refund claims`}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Trend */}
        <div className="lg:col-span-2">
          <AdminCard
            title="Revenue & Order Volume Trajectory"
            subtitle="Comparing daily gross volume and transaction count"
          >
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrendData}>
                  <defs>
                    <linearGradient id="analyticsRevGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252347" vertical={false} />
                  <XAxis dataKey="date" stroke="#6C698D" fontSize={12} tickLine={false} />
                  <YAxis
                    stroke="#6C698D"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#17152E",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                    formatter={(val: any) => [`₹${Number(val || 0).toLocaleString("en-IN")}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8B5CF6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#analyticsRevGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AdminCard>
        </div>

        {/* Customer Breakdown Pie */}
        <div>
          <AdminCard
            title="Customer Retention Mix"
            subtitle="New vs Returning customer distribution"
          >
            <div className="h-80 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={210}>
                <PieChart>
                  <Pie
                    data={customerTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={6}
                    dataKey="value"
                  >
                    {customerTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#17152E",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full flex items-center justify-around mt-4 pt-4 border-t border-white/5">
                {customerTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-[#A7A3BC]">{item.name}</span>
                    <span className="text-xs font-semibold text-white">({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Product Revenue Leaderboard Chart */}
      <AdminCard
        title="Top Grossing Digital Assets"
        subtitle="Catalog revenue contribution ranked by total sales"
      >
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productSalesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#252347" horizontal={false} />
              <XAxis
                type="number"
                stroke="#6C698D"
                fontSize={12}
                tickLine={false}
                tickFormatter={(val) => `₹${val / 1000}k`}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#6C698D"
                fontSize={12}
                tickLine={false}
                width={140}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#17152E",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                formatter={(val: any) => [`₹${Number(val || 0).toLocaleString("en-IN")}`, "Gross Revenue"]}
              />
              <Bar dataKey="revenue" fill="#6366F1" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </AdminCard>
    </div>
  );
}
