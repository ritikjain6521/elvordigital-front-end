import { Metadata } from "next";
import StoreView from "@/components/store/StoreView";
import { fetchLiveProducts } from "@/lib/apiProducts";

export const metadata: Metadata = {
  title: "New Digital Product Releases | ElvorDigital",
  description:
    "Discover the latest additions to the ElvorDigital marketplace — fresh AI prompt vaults, UI kits, and marketing playbooks.",
};

export default async function NewArrivalsPage() {
  const products = await fetchLiveProducts();
  const newArrivals = products.filter((p) => p.isNewArrival);

  return (
    <main className="relative z-10 flex-1">
      <StoreView
        initialProducts={newArrivals}
        title="New Arrivals"
        subtitle="The latest releases engineered for modern digital creators and entrepreneurs."
      />
    </main>
  );
}
