import Hero from "@/components/home/Hero";
import KidsWorksheetsShowcase from "@/components/home/KidsWorksheetsShowcase";
import BestSellersSection from "@/components/home/BestSellersSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <main className="relative z-10 flex-1 bg-gradient-to-br from-[#0a0820] via-[#0d0b2a] to-[#120a35]">
      <Hero />
      <KidsWorksheetsShowcase />
      <BestSellersSection />
      <FeaturedCategories />
      <TestimonialsSection />
      <HomeFAQ />
      <NewsletterSection />
    </main>
  );
}
