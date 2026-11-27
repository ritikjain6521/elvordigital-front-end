import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailsPage from "@/components/product/ProductDetailsPage";
import {
  fetchLiveLandingPageBySlug,
  fetchLiveProductBySlug,
  fetchLiveProducts,
} from "@/lib/apiProducts";

interface LandingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lp = await fetchLiveLandingPageBySlug(slug);
  if (lp) {
    return {
      title: `${lp.title} | ElvorDigital`,
      description: `${lp.productName} – Official Landing Page`,
    };
  }
  const prod = await fetchLiveProductBySlug(slug);
  if (prod) {
    return {
      title: `${prod.name} | ElvorDigital`,
      description: prod.shortDescription,
    };
  }
  return { title: "Landing Page Not Found | ElvorDigital" };
}

export default async function LandingPageRoute({ params }: LandingPageProps) {
  const { slug } = await params;

  const [lp, allProducts] = await Promise.all([
    fetchLiveLandingPageBySlug(slug),
    fetchLiveProducts(),
  ]);

  let product = null;

  if (lp) {
    product =
      (lp.productSlug ? await fetchLiveProductBySlug(lp.productSlug) : null) ||
      allProducts.find((p) => p.id === lp.productId || p.slug === lp.productSlug) ||
      null;

    // Apply hero overrides from landing page builder if present
    if (product && Array.isArray(lp.sections)) {
      const heroSec = lp.sections.find((s: any) => s.type === "hero" && s.enabled !== false);
      if (heroSec?.content?.headline) {
        product = { ...product, name: heroSec.content.headline };
      }
      if (heroSec?.subtitle) {
        product = { ...product, tagline: heroSec.subtitle };
      }
    }
  } else {
    product = await fetchLiveProductBySlug(slug);
  }

  if (!product) {
    notFound();
  }

  const related = allProducts.filter((p) => p.slug !== product!.slug).slice(0, 4);

  return (
    <main className="relative z-10 flex-1">
      <ProductDetailsPage product={product} relatedProducts={related} />
    </main>
  );
}
