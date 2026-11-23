import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  withLink?: boolean;
  href?: string;
  className?: string;
  subtitle?: string;
}

export default function BrandLogo({
  size = "md",
  showText = true,
  withLink = true,
  href = "/",
  className = "",
  subtitle,
}: BrandLogoProps) {
  const iconSizes = {
    sm: "h-7 w-7 rounded-lg",
    md: "h-9 w-9 sm:h-10 sm:w-10 rounded-xl",
    lg: "h-12 w-12 rounded-2xl",
    xl: "h-14 w-14 rounded-2xl",
  };

  const svgSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
  };

  const textSizes = {
    sm: "text-base font-bold",
    md: "text-lg sm:text-xl font-bold",
    lg: "text-2xl font-black",
    xl: "text-3xl font-black",
  };

  const content = (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* High-Tech Stylized "E" Logo Icon */}
      <div
        className={`relative flex ${iconSizes[size]} shrink-0 items-center justify-center bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#EC4899] p-[1.5px] shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105`}
      >
        <div className="h-full w-full rounded-[inherit] bg-[#090816] flex items-center justify-center overflow-hidden">
          <svg
            width={svgSizes[size]}
            height={svgSizes[size]}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:rotate-3"
          >
            {/* Outer Spine and Arms of E */}
            <path
              d="M19 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H19"
              stroke="url(#elvoraLogoGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Middle Arm */}
            <path
              d="M5 12H15.5"
              stroke="url(#elvoraLogoGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Future Tech Nodes */}
            <circle cx="19" cy="5" r="1.5" fill="#EC4899" />
            <circle cx="15.5" cy="12" r="1.5" fill="#A855F7" />
            <circle cx="19" cy="19" r="1.5" fill="#22D3EE" />
            <defs>
              <linearGradient
                id="elvoraLogoGrad"
                x1="5"
                y1="5"
                x2="19"
                y2="19"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8B5CF6" />
                <stop offset="0.5" stopColor="#A855F7" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes[size]} tracking-tight text-white group-hover:text-purple-300 transition-colors leading-tight`}
          >
            Elvora<span className="text-[#8B5CF6]">Digital</span>
          </span>
          {subtitle && (
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold -mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link href={href} aria-label="ElvoraDigital Home">
        {content}
      </Link>
    );
  }

  return content;
}
