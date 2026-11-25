import { Metadata } from "next";
import StoreView from "@/components/store/StoreView";
import { fetchLiveProducts } from "@/lib/apiProducts";

export const metadata: Metadata = {
  title: "Digital Product Store | ElvorDigital – Explore The Full Catalogue",
  description:
    "Browse our complete catalog of AI prompt bundles, Meta ad masterclasses, Canva creator kits, business ebooks, and automation toolkits.",
};

export default async function StorePage() {
  const products = await fetchLiveProducts();

  return (
    <main className="relative z-10 flex-1">
      <StoreView
        initialProducts={products}
        title="Explore the Digital Universe."
        subtitle="Find the tools, knowledge, and creative resources to bring your next big idea to life."
      />
    </main>
  );
}
