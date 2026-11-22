"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-[#A7A3BC] py-3 overflow-x-auto" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={13} className="text-gray-600 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-white transition-colors truncate max-w-[200px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-purple-300 font-medium truncate max-w-[260px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
