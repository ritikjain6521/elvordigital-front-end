"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { AdminDataProvider } from "@/context/admin/AdminDataContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminDataProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AdminDataProvider>
  );
}
