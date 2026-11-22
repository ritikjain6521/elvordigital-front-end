"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor?: string;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  accentColor = "from-purple-500/20 to-indigo-500/10",
  iconColor,
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#17152E]/90 border border-white/10 p-5 hover:border-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-950/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#A7A3BC] uppercase tracking-wider">
          {title}
        </span>
        <div
          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${accentColor} border border-white/10 flex items-center justify-center text-purple-300`}
          style={iconColor ? { color: iconColor } : undefined}
        >
          <Icon size={19} />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {value}
        </span>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-bold ${
              isPositive ? "text-emerald-400" : "text-pink-400"
            }`}
          >
            {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-[#A7A3BC] mt-1.5">{subtitle}</p>
      )}
    </div>
  );
}

export { StatCard };
