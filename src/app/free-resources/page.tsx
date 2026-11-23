import { Metadata } from "next";
import StoreView from "@/components/store/StoreView";
import { fetchLiveProducts } from "@/lib/apiProducts";

export const metadata: Metadata = {
  title: "Free Digital Resources & Downloads | ElvoraDigital",
  description:
    "Download complimentary digital checklists, frameworks, and marketing cheat sheets courtesy of ElvoraDigital.",
};

export default async function FreeResourcesPage() {
  const products = await fetchLiveProducts();
  const freeResources = products.filter((p) => p.isFree);

  return (
    <main className="relative z-10 flex-1">
      <StoreView
        initialProducts={freeResources}
        title="Free Resources & Downloads"
        subtitle="100% complimentary checklists, guides, and cheat-sheets to kickstart your creative journey."
      />
    </main>
  );
}
