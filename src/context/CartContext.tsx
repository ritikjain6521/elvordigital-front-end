"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  couponCode: string;
  discountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from sessionStorage (tab session only — no persistence)
  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem("elvoradigital_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = sessionStorage.getItem("elvoradigital_coupon");
      if (savedCoupon === "ELVORA10") {
        setCouponCode("ELVORA10");
        setDiscountPercent(10);
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      sessionStorage.setItem("elvoradigital_cart", JSON.stringify(cart));
      if (couponCode) {
        sessionStorage.setItem("elvoradigital_coupon", couponCode);
      } else {
        sessionStorage.removeItem("elvoradigital_coupon");
      }
    } catch {
      // Ignore
    }
  }, [cart, couponCode, isHydrated]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 5) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, 5) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem("elvoradigital_cart");
    sessionStorage.removeItem("elvoradigital_coupon");
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "ELVORA10") {
      setCouponCode("ELVORA10");
      setDiscountPercent(10);
      return { success: true, message: "Coupon ELVORA10 applied! 10% discount added." };
    }
    return { success: false, message: "Invalid coupon code. Try ELVORA10" };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        couponCode,
        discountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
