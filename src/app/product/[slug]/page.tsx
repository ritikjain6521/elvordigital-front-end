import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailsPage from "@/components/product/ProductDetailsPage";
import { fetchLiveProductBySlug, fetchLiveProducts } from "@/lib/apiProducts";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchLiveProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found | ElvorDigital" };
  }

  return {
    title: `${product.name} | ElvorDigital – ₹${product.price.toLocaleString("en-IN")}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | ElvorDigital`,
      description: product.shortDescription,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchLiveProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="relative z-10 flex-1">
      <ProductDetailsPage product={product} />
    </main>
  );
}
