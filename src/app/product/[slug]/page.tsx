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

  // Fetch current product and all products in parallel
  const [product, allProducts] = await Promise.all([
    fetchLiveProductBySlug(slug),
    fetchLiveProducts(),
  ]);

  if (!product) {
    notFound();
  }

  // Related = same category, excluding current product, up to 4
  const relatedProducts = allProducts
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 4);

  // If not enough in same category, fill with other products
  const related =
    relatedProducts.length >= 2
      ? relatedProducts
      : allProducts.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <main className="relative z-10 flex-1">
      <ProductDetailsPage product={product} relatedProducts={related} />
    </main>
  );
}
