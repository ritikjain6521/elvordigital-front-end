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
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/20">
                <div className="h-full w-full rounded-[10px] bg-[#090816] flex items-center justify-center overflow-hidden">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H19"
                      stroke="url(#footElvGrad2)"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12H15.5"
                      stroke="url(#footElvGrad2)"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <circle cx="19" cy="5" r="1.5" fill="#EC4899" />
                    <circle cx="15.5" cy="12" r="1.5" fill="#A855F7" />
                    <circle cx="19" cy="19" r="1.5" fill="#22D3EE" />
                    <defs>
                      <linearGradient id="footElvGrad2" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6" />
                        <stop offset="0.5" stopColor="#A855F7" />
                        <stop offset="1" stopColor="#22D3EE" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <span className="text-lg font-bold text-white">
                Elvora<span className="text-[#8B5CF6]">Digital</span>
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
