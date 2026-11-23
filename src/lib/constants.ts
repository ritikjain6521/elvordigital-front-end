// ============================================================
// ElvoraDigital – META ADS MASTERY 2026 PRO EDITION
// Central constants file
// ============================================================

/** Set this to your payment gateway URL. When empty, Buy Now shows a notice. */
export const PURCHASE_URL = "";

export const BRAND = {
  name: "ElvoraDigital",
  tagline: "Learn Smarter. Market Better. Grow Further.",
  product: "META ADS MASTERY 2026 – PRO EDITION",
  shortProduct: "Meta Ads Mastery 2026",
  price: 499,
  originalPrice: 1099,
  discount: 600,
  discountPercent: 54,
  currency: "₹",
  year: 2026,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Course Curriculum", href: "#curriculum" },
  { label: "Bonuses", href: "#bonuses" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
] as const;

export const TRUST_ITEMS = [
  { value: "50+", label: "HD Training Lessons", icon: "PlayCircle" },
  { value: "8", label: "Comprehensive Modules", icon: "BookOpen" },
  { value: "7", label: "Exclusive Bonuses", icon: "Gift" },
  { value: "500+", label: "Creative Templates", icon: "Palette" },
  { value: "AI", label: "Powered Resources", icon: "Sparkles" },
] as const;

export const PROBLEMS = [
  {
    title: "Wasting Budget on Wrong Audiences",
    description:
      "Your ad spend disappears because campaigns target people who will never convert.",
    icon: "DollarSign",
  },
  {
    title: "Low Engagement and Conversions",
    description:
      "Ads get impressions but no clicks, no leads, and no sales to show for it.",
    icon: "TrendingDown",
  },
  {
    title: "Confusing Ads Manager Interface",
    description:
      "Meta's advertising tools feel overwhelming with countless options and settings.",
    icon: "Puzzle",
  },
  {
    title: "No Clear Campaign Optimization Strategy",
    description:
      "You launch ads but have no framework to analyze, test, and improve results.",
    icon: "Target",
  },
] as const;

export const MODULES = [
  {
    id: 1,
    title: "Meta Ads Fundamentals",
    topics: [
      "Facebook and Instagram advertising",
      "Meta Business Suite and Ads Manager",
      "Campaign objectives",
      "Campaign, Ad Set and Ad structure",
      "Customer buying journey",
    ],
  },
  {
    id: 2,
    title: "Professional Advertising Setup",
    topics: [
      "Meta Business Portfolio",
      "Facebook Business Page",
      "Instagram business account",
      "Advertising account configuration",
      "Meta Pixel fundamentals",
      "Conversion API fundamentals",
    ],
  },
  {
    id: 3,
    title: "Advanced Audience Targeting",
    topics: [
      "Customer research",
      "Demographic and interest targeting",
      "Custom Audiences",
      "Lookalike Audiences",
      "Advantage+ Audience",
      "Retargeting strategies",
    ],
  },
  {
    id: 4,
    title: "High-Converting Ad Creatives",
    topics: [
      "Professional ad creative strategies",
      "Video advertisements",
      "AI-powered creative development",
      "Headlines and hooks",
      "Advertising copywriting",
      "CTA strategies",
      "Creative testing",
    ],
  },
  {
    id: 5,
    title: "Campaign Creation & Management",
    topics: [
      "Campaign creation",
      "Lead generation campaigns",
      "Sales and conversion campaigns",
      "Website traffic campaigns",
      "Engagement campaigns",
      "Budget and bidding strategies",
      "Placements and scheduling",
    ],
  },
  {
    id: 6,
    title: "Campaign Analytics & Optimization",
    topics: [
      "CTR, CPC, CPM, CPA and ROAS",
      "Campaign performance analysis",
      "A/B testing",
      "Budget optimization",
      "Conversion tracking",
      "Reporting",
    ],
  },
  {
    id: 7,
    title: "Advanced Scaling Strategies",
    topics: [
      "Horizontal and vertical scaling",
      "Advantage+ campaign strategies",
      "Winning creative identification",
      "Advertising fatigue",
      "Customer acquisition",
      "Marketing funnels",
      "Profitability planning",
    ],
  },
  {
    id: 8,
    title: "AI-Powered Digital Marketing",
    topics: [
      "ChatGPT advertising prompts",
      "AI ad copy generation",
      "AI creative and video concepts",
      "Customer personas",
      "Content planning",
      "Competitor research",
      "Marketing automation fundamentals",
    ],
  },
] as const;

export const BONUSES = [
  {
    id: 1,
    title: "500+ Ad Creative Templates",
    description:
      "Ready-to-customize ad templates for every campaign type, platform and objective.",
    icon: "Palette",
  },
  {
    id: 2,
    title: "100+ Ad Copy Examples",
    description:
      "Proven ad copy frameworks and swipe files for headlines, descriptions and CTAs.",
    icon: "FileText",
  },
  {
    id: 3,
    title: "AI Advertising Prompt Library",
    description:
      "Curated AI prompts for ad copy, creative ideas, audience research and campaign planning.",
    icon: "Sparkles",
  },
  {
    id: 4,
    title: "ROI & Campaign Tracking Sheets",
    description:
      "Spreadsheet templates to track ad spend, conversions, ROAS and campaign performance.",
    icon: "BarChart3",
  },
  {
    id: 5,
    title: "Advanced Audience Targeting Toolkit",
    description:
      "Audience research worksheets, persona builders and targeting strategy guides.",
    icon: "Users",
  },
  {
    id: 6,
    title: "Campaign Scaling Blueprint",
    description:
      "Step-by-step scaling playbook for growing campaigns from testing to full-scale profitability.",
    icon: "Rocket",
  },
  {
    id: 7,
    title: "Facebook Ads Checklist & Marketing eBook",
    description:
      "Pre-launch checklists and a comprehensive marketing guide for campaign success.",
    icon: "BookCheck",
  },
] as const;

export const AUDIENCE = [
  { label: "Digital Marketing Beginners", icon: "GraduationCap" },
  { label: "Small Business Owners", icon: "Store" },
  { label: "Entrepreneurs", icon: "Briefcase" },
  { label: "Freelancers", icon: "Laptop" },
  { label: "Marketing Agencies", icon: "Building2" },
  { label: "E-commerce Sellers", icon: "ShoppingCart" },
  { label: "Dropshipping Sellers", icon: "Package" },
  { label: "Affiliate Marketers", icon: "Link" },
  { label: "Content Creators", icon: "Video" },
  { label: "Students", icon: "BookOpen" },
  { label: "Aspiring Marketing Professionals", icon: "Award" },
] as const;

export const WHY_FEATURES = [
  {
    title: "Beginner-Friendly Learning",
    description: "No prior experience needed. Start from zero and build real skills step by step.",
    icon: "Heart",
  },
  {
    title: "Practical Training",
    description: "Learn by doing with hands-on campaign creation, optimization and analysis.",
    icon: "Wrench",
  },
  {
    title: "Structured Curriculum",
    description: "8 organized modules that take you from fundamentals to advanced strategies.",
    icon: "LayoutGrid",
  },
  {
    title: "Ready-to-Use Resources",
    description: "Templates, checklists, swipe files and toolkits you can use immediately.",
    icon: "FolderOpen",
  },
  {
    title: "AI-Powered Learning Tools",
    description: "Leverage AI for ad copy, creative development, audience research and more.",
    icon: "Cpu",
  },
  {
    title: "Self-Paced Education",
    description: "Learn on your own schedule. Access training content whenever it suits you.",
    icon: "Clock",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Is this course suitable for beginners?",
    answer:
      "Yes. The course is designed to take you from the fundamentals of Meta advertising all the way through advanced strategies. No prior advertising experience is required.",
  },
  {
    question: "What will I learn in this masterclass?",
    answer:
      "You will learn how to set up and manage Meta ad campaigns, target the right audiences, create high-converting ad creatives, analyze campaign performance, optimize your ad spend, and scale profitable campaigns using both manual and AI-powered techniques.",
  },
  {
    question: "Do I need previous advertising experience?",
    answer:
      "No. Module 1 starts with the foundations of Facebook and Instagram advertising, and each subsequent module builds on the previous one. The course is structured for learners at all levels.",
  },
  {
    question: "Does this course include practical training?",
    answer:
      "Yes. The course includes hands-on campaign creation walkthroughs, real-world examples, optimization exercises, and ready-to-use templates so you can apply what you learn directly to your campaigns.",
  },
  {
    question: "What are the 7 premium bonuses?",
    answer:
      "The bonuses include 500+ Ad Creative Templates, 100+ Ad Copy Examples, an AI Advertising Prompt Library, ROI & Campaign Tracking Sheets, an Advanced Audience Targeting Toolkit, a Campaign Scaling Blueprint, and a Facebook Ads Checklist & Marketing eBook.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Yes. This is a self-paced digital video course. You can watch the lessons and complete the modules on your own schedule.",
  },
  {
    question: "How much does the course cost?",
    answer:
      "The course is available at a special launch price of ₹499 (regular price ₹1,099). This includes all 50+ video lessons, 8 modules, and 7 premium bonus resources.",
  },
  {
    question: "How can I purchase the course?",
    answer:
      "Click any 'Buy Now' or 'Get Instant Access' button on this page. You will be directed to a secure checkout page to complete your purchase.",
  },
  {
    question: "Is this a physical product or digital product?",
    answer:
      "This is a 100% digital product. It includes online video training lessons and downloadable digital marketing resources. Nothing is shipped physically.",
  },
] as const;

export const PRICING_FEATURES = [
  "50+ HD Video Training Lessons",
  "Complete 8-Module Curriculum",
  "500+ Ad Creative Templates",
  "100+ Ad Copy Examples",
  "AI Advertising Prompt Library",
  "ROI & Campaign Tracking Sheets",
  "Advanced Audience Targeting Toolkit",
  "Campaign Scaling Blueprint",
  "Facebook Ads Checklist & eBook",
  "Self-Paced Learning",
] as const;
