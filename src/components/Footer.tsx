"use client";

import { NAV_LINKS, BRAND } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";

const footerLinks = [
  ...NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#060912]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400">
                <span className="text-lg font-black text-white">V</span>
              </div>
              <span className="text-lg font-bold text-white">
                Zenova<span className="text-purple-400">Vibe</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {BRAND.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.slice(0, 5).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.slice(5).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Course */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Course
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-gray-400">{BRAND.shortProduct}</li>
              <li className="text-sm text-gray-400">
                {BRAND.currency}{BRAND.price}{" "}
                <span className="line-through text-gray-600">
                  {BRAND.currency}{BRAND.originalPrice}
                </span>
              </li>
              <li className="text-sm text-gray-400">50+ HD Video Lessons</li>
              <li className="text-sm text-gray-400">
                7 Premium Bonus Resources
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">
            © {BRAND.year} {BRAND.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
