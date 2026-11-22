import { Metadata } from "next";
import { notFound } from "next/navigation";
import StoreView from "@/components/store/StoreView";
import { CATEGORIES } from "@/data/categories";
import { ProductCategory } from "@/types";
import { fetchLiveProducts } from "@/lib/apiProducts";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return { title: "Category Not Found | ZenovaVibe" };
  }

  return {
    title: `${category.name} | ZenovaVibe Marketplace`,
    description: category.description,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const allProducts = await fetchLiveProducts();
  const categoryProducts = allProducts.filter((p) => p.category === category.id);

  return (
    <main className="relative z-10 flex-1">
      <StoreView
        initialProducts={categoryProducts}
        lockedCategory={category.id as ProductCategory}
        title={category.name}
        subtitle={category.description}
      />
    </main>
  );
}
