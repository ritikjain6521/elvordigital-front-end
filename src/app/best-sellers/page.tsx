import { Metadata } from "next";
import StoreView from "@/components/store/StoreView";
import { fetchLiveProducts } from "@/lib/apiProducts";

export const metadata: Metadata = {
  title: "Best Selling Digital Products | ZenovaVibe",
  description:
    "Explore the most downloaded and highest-rated digital products, prompt libraries, and design assets on ZenovaVibe.",
};

export default async function BestSellersPage() {
  const products = await fetchLiveProducts();
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <main className="relative z-10 flex-1">
      <StoreView
        initialProducts={bestSellers}
        title="Best Selling Products"
        subtitle="Our most loved, community-validated digital tools, courses, and frameworks."
      />
    </main>
  );
}
