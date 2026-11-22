import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSellersSection from "@/components/home/BestSellersSection";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import WhyZenovaVibe from "@/components/home/WhyZenovaVibe";
import ProductSpotlight from "@/components/home/ProductSpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <main className="relative z-10 flex-1">
      <Hero />
      <TrustStrip />
      <FeaturedCategories />
      <BestSellersSection />
      <PromotionalBanner />
      <NewArrivalsSection />
      <WhyZenovaVibe />
      <ProductSpotlight />
      <TestimonialsSection />
      <HomeFAQ />
      <NewsletterSection />
    </main>
  );
}
