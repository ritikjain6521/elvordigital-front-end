import { Metadata } from "next";
import HomeFAQ from "@/components/home/HomeFAQ";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | ElvoraDigital Marketplace",
  description:
    "Everything you need to know about purchasing digital downloads, course portals, template licenses, and support.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "FAQ Support" }]} />
        <HomeFAQ />
      </div>
    </div>
  );
}
