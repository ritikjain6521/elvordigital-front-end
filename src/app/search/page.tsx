import { Metadata } from "next";
import StoreView from "@/components/store/StoreView";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Search Digital Products | ElvorDigital",
  description: "Search across our entire digital catalogue of tools, prompts, templates, and courses.",
};

export default function SearchPage() {
  return (
    <main className="relative z-10 flex-1">
      <StoreView
        initialProducts={PRODUCTS}
        title="Search the Catalogue"
        subtitle="Quickly discover prompts, templates, blueprints, or courses by keyword, topic, or format."
      />
    </main>
  );
}
