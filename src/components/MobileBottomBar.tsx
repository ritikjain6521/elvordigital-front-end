"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { handlePurchase } from "@/lib/utils";

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#080B18]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-area-pb"
        >
          <button
            onClick={handlePurchase}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold shadow-lg shadow-purple-500/25"
          >
            <ShoppingCart size={18} />
            <span>Buy Now – {BRAND.currency}{BRAND.price}</span>
            <span className="text-xs line-through text-white/50">
              {BRAND.currency}{BRAND.originalPrice}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
