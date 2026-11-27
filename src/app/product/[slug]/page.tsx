import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailsPage from "@/components/product/ProductDetailsPage";
import {
  fetchLiveLandingPageBySlug,
  fetchLiveProductBySlug,
  fetchLiveProducts,
} from "@/lib/apiProducts";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function resolveProductOrLandingPage(slug: string) {
  const direct = await fetchLiveProductBySlug(slug);
  if (direct) return direct;

  const lp = await fetchLiveLandingPageBySlug(slug);
  if (lp) {
    const linked =
      (lp.productSlug ? await fetchLiveProductBySlug(lp.productSlug) : null) ||
      (lp.productId ? await fetchLiveProductBySlug(lp.productId) : null);
    if (linked) {
      return linked;
    }
  }
  return null;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProductOrLandingPage(slug);
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

  const [product, allProducts] = await Promise.all([
    resolveProductOrLandingPage(slug),
    fetchLiveProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  const related =
    relatedProducts.length >= 2
      ? relatedProducts
      : allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <main className="relative z-10 flex-1">
      <ProductDetailsPage product={product} relatedProducts={related} />
    </main>
  );
}
