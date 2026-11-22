"use client";

import React from "react";

interface AdminCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function AdminCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}: AdminCardProps) {
  return (
    <div
      className={`rounded-2xl bg-[#17152E]/90 border border-white/10 p-5 sm:p-6 shadow-xl ${className}`}
    >
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/5 gap-2">
          <div>
            {title && <h3 className="text-base font-bold text-white">{title}</h3>}
            {subtitle && <p className="text-xs text-[#A7A3BC] mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export { AdminCard };
