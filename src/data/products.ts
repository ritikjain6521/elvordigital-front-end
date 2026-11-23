import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  // CATEGORY 1: EBOOKS & GUIDES
  {
    id: "prod-dbb",
    slug: "digital-business-blueprint",
    name: "Digital Business Blueprint",
    category: "ebooks-guides",
    categoryName: "Ebooks & Guides",
    shortDescription: "The definitive guide to ideating, validating, building, and monetizing scalable digital products in 2026.",
    fullDescription: "Digital Business Blueprint is an exhaustive, 240-page strategic master guide crafted for modern founders and digital entrepreneurs. Learn how to identify untapped market gaps, design sticky value propositions, engineer zero-cost acquisition channels, and construct recurring revenue engines without outside venture capital.",
    price: 499,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 384,
    badge: "Bestseller",
    isBestSeller: true,
    isFeatured: true,
    productFormat: "Interactive PDF + Notion Playbook + Audio Summary",
    compatibility: "Desktop, Tablet, Kindle & Mobile devices",
    fileSize: "48 MB digital download",
    accentGradient: "from-purple-500 to-indigo-600",
    tagline: "Build a high-margin digital enterprise from scratch.",
    features: [
      "240 pages of battle-tested frameworks & real case studies",
      "Financial projection spreadsheet & margin calculator",
      "Customer acquisition roadmap with 12 organic growth vectors",
      "Product launch sprint checklist with day-by-day deliverables",
      "Legal & operational templates for digital asset businesses"
    ],
    whatsIncluded: [
      { title: "Digital Master Book (PDF & ePub)", description: "High-resolution illustrated guide with annotated diagrams", format: "PDF / ePub", count: "240 Pages" },
      { title: "Notion Enterprise Workspace", description: "Interactive validation board and operational task matrix", format: "Notion Template", count: "1 Full OS" },
      { title: "Financial Model Spreadsheet", description: "P&L projections, CAC/LTV forecasting and pricing calculator", format: "Excel / Sheets", count: "8 Tabs" },
      { title: "Launch Sprint Playbook", description: "Day 1 to Day 30 step-by-step product launch calendar", format: "Printable PDF", count: "30-Day Matrix" }
    ],
    bonuses: [
      { title: "100 Digital Product Ideas Database", description: "Niche-specific product concepts with validated search demand", demoValue: "₹499" },
      { title: "Email Pitch Swipe File", description: "15 cold outreach & partnership email templates with 40%+ open rates", demoValue: "₹299" }
    ],
    learningOutcomes: [
      "Discover high-demand niches with low competitive saturation",
      "Validate product demand before investing time or capital",
      "Design pricing tiers that optimize customer lifetime value",
      "Automate order fulfillment and post-purchase customer retention"
    ],
    comparison: [
      { feature: "Actionable step-by-step systems", elvora: true, standard: false },
      { feature: "Ready-to-use Notion workspace", elvora: true, standard: false },
      { feature: "Financial & Unit Economics models", elvora: true, standard: false },
      { feature: "Up-to-date 2026 digital landscape", elvora: true, standard: false }
    ],
    faqs: [
      { question: "Is this book suitable for beginners with no business experience?", answer: "Yes! It starts with foundational customer discovery and walks all the way through advanced multi-tier pricing and automation." },
      { question: "How do I access the Notion workspace?", answer: "Inside the welcome PDF, you will find a 1-click duplication link that imports the complete system directly into your personal Notion account." }
    ]
  },
  {
    id: "prod-uch",
    slug: "the-ultimate-creator-handbook",
    name: "The Ultimate Creator Handbook",
    category: "ebooks-guides",
    categoryName: "Ebooks & Guides",
    shortDescription: "A comprehensive playbook for growing an engaged online audience and unlocking 6-figure creator revenue streams.",
    fullDescription: "Turn your content into an enduring creator business. This practical handbook details audience psychology, high-retention storytelling, algorithmic distribution across YouTube, X, and Instagram, and multi-channel monetization strategies.",
    price: 299,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 219,
    badge: "Popular",
    isFeatured: false,
    productFormat: "Digital PDF & Audio Book Notes",
    compatibility: "All digital reading apps and devices",
    fileSize: "32 MB",
    accentGradient: "from-violet-500 to-purple-600",
    tagline: "Turn attention into an unstoppable personal brand.",
    features: [
      "180+ pages covering the complete creator journey",
      "Hook writing formulas with 50+ viral examples analyzed",
      "Sponsorship rate calculator & contract negotiations guide",
      "Repurposing system to turn 1 idea into 10 pieces of content"
    ],
    whatsIncluded: [
      { title: "Illustrated Handbook", description: "The full 180-page master guide", format: "PDF", count: "180 Pages" },
      { title: "Sponsor Media Kit Template", description: "Editable Figma & Canva media kit to pitch brands", format: "Canva/Figma", count: "4 Slides" },
      { title: "Content Engine Board", description: "Trello & Notion content ideation board", format: "Notion/Trello", count: "1 Board" }
    ],
    bonuses: [
      { title: "25 Brand Negotiation Scripts", description: "Word-for-word email replies to counter lowball brand sponsor offers", demoValue: "₹299" }
    ],
    learningOutcomes: [
      "Build a distinct content moat that separates you from AI noise",
      "Attract loyal followers who eagerly purchase your recommendations",
      "Negotiate 4x higher sponsorship fees with data-driven media kits"
    ],
    faqs: [
      { question: "Does this work if I have under 1,000 followers?", answer: "Yes! In fact, chapter 2 focuses specifically on zero-to-one traction and micro-audience monetization." }
    ]
  },
  {
    id: "prod-fsg",
    slug: "freelancing-success-guide",
    name: "Freelancing Success Guide",
    category: "ebooks-guides",
    categoryName: "Ebooks & Guides",
    shortDescription: "Escape the hourly trap. Master premium client acquisition, high-ticket proposals, and retainer contracts.",
    fullDescription: "Learn how elite freelancers command ₹1,00,000+ monthly retainers. This guide covers positioning yourself as an indispensable growth partner, structuring value-based proposals, and building an inbound pipeline of high-budget clients.",
    price: 399,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 167,
    badge: "54% OFF",
    isNewArrival: true,
    productFormat: "PDF Guide + Contract & Proposal Templates",
    compatibility: "Universal PDF, Word & Google Docs",
    fileSize: "28 MB",
    accentGradient: "from-purple-600 to-pink-500",
    tagline: "Close high-ticket clients without bidding on freelancer mills.",
    features: [
      "160 pages of client acquisition and retention methodologies",
      "Editable legal service agreement and payment milestones contract",
      "Cold DM scripts for LinkedIn and Twitter that secure discovery calls",
      "Discovery call questionnaire to uncover 6-figure client budgets"
    ],
    whatsIncluded: [
      { title: "Freelance Mastery Guide", description: "160-page tactical handbook", format: "PDF", count: "160 Pages" },
      { title: "Legal Retainer Contract Template", description: "Drafted by business lawyers to protect freelancer IP & cashflow", format: "Word / Docs", count: "1 Template" },
      { title: "High-Ticket Proposal Slide Deck", description: "Proven pitch deck format that wins competitive deals", format: "Figma / PPT", count: "12 Slides" }
    ],
    bonuses: [
      { title: "Portfolio Audit Checklist", description: "15-point review to ensure your case studies convert visitors", demoValue: "₹199" }
    ],
    learningOutcomes: [
      "Transition from low-paying gig platforms to direct corporate clients",
      "Charge based on client revenue upside rather than billable hours",
      "Implement scope-creep safeguards in all client agreements"
    ],
    faqs: [
      { question: "Are the contract templates legally binding in India?", answer: "Yes, they include standard commercial indemnity, IP assignment, and milestone payment terms adaptable globally." }
    ]
  },

  // CATEGORY 2: AI PROMPT BUNDLES
  {
    id: "prod-uapb",
    slug: "ultimate-ai-prompt-bundle",
    name: "Ultimate AI Prompt Bundle",
    category: "ai-prompts",
    categoryName: "AI Prompt Bundles",
    shortDescription: "Over 2,500+ engineered prompts across marketing, copy, SEO, coding, and business operations for ChatGPT & Claude.",
    fullDescription: "Stop getting generic AI answers. The Ultimate AI Prompt Bundle gives you a structured command center of 2,500+ rigorously tested, few-shot prompt frameworks. Designed to transform Large Language Models into expert copywriters, senior developers, digital strategists, and research assistants in seconds.",
    price: 399,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 512,
    badge: "Bestseller",
    isBestSeller: true,
    isFeatured: true,
    productFormat: "Airtable Directory + Notion OS + Searchable PDF",
    compatibility: "ChatGPT (Free & Plus), Claude 3.5, Gemini, DeepSeek",
    fileSize: "Instant Cloud Access + 18 MB archive",
    accentGradient: "from-pink-500 to-purple-600",
    tagline: "Unleash supercharged AI intelligence with engineered precision.",
    features: [
      "2,500+ hyper-specific prompts with variable placeholders [Like This]",
      "Covering Marketing, SEO, Copywriting, Coding, Business, & Product Design",
      "Interactive Airtable workspace with filtering by model and outcome",
      "One-click copy button interface for effortless workflow speed",
      "Includes multi-step agent reasoning chains for complex outputs"
    ],
    whatsIncluded: [
      { title: "Searchable Airtable Database", description: "Filterable directory of all 2,500+ engineered prompt workflows", format: "Airtable Web", count: "2,500+ Items" },
      { title: "Notion AI Command Center", description: "Full workspace with categorized prompt drawers and output notebooks", format: "Notion System", count: "1 Complete OS" },
      { title: "Executive Quick-Ref PDF", description: "Top 200 daily productivity prompts printable desk cheat-sheet", format: "Digital PDF", count: "48 Pages" },
      { title: "Prompt Engineering Playbook", description: "Deep-dive guide to role-prompting and few-shot formatting", format: "PDF", count: "35 Pages" }
    ],
    bonuses: [
      { title: "Midjourney v6 Photorealism Cheat Sheet", description: "Keywords, aspect ratios, lighting parameters for ultra-realistic renders", demoValue: "₹349" },
      { title: "Claude 3.5 Artifact Coding Prompts", description: "Prompts that generate full React web applications and widgets in one shot", demoValue: "₹449" }
    ],
    learningOutcomes: [
      "Generate high-converting landing page copy in under 3 minutes",
      "Draft long-form SEO articles with natural cadence and deep expertise",
      "Debug complex code errors and architect full stack components",
      "Automate tedious operational analysis with structured JSON formatting"
    ],
    comparison: [
      { feature: "Few-shot & Chain-of-Thought architecture", elvora: true, standard: false },
      { feature: "Categorized Airtable & Notion database", elvora: true, standard: false },
      { feature: "Updated for latest 2026 AI models", elvora: true, standard: false },
      { feature: "Includes variables and real business examples", elvora: true, standard: false }
    ],
    faqs: [
      { question: "Do these prompts work on the free version of ChatGPT?", answer: "Yes! Every single prompt is engineered to produce clean, high-grade output on free GPT-4o mini, as well as premium models like Claude 3.5 Sonnet." },
      { question: "How are the prompts organized?", answer: "You get access to a Notion workspace and an Airtable table with instant search, category filters, difficulty tags, and copy-paste buttons." }
    ]
  },
  {
    id: "prod-cbgp",
    slug: "chatgpt-business-growth-prompts",
    name: "ChatGPT Business Growth Prompts",
    category: "ai-prompts",
    categoryName: "AI Prompt Bundles",
    shortDescription: "Supercharge sales funnels, executive decision making, competitive intelligence, and customer retention with AI.",
    fullDescription: "A specialized prompt collection built specifically for business owners, agency directors, and startup leaders. Use AI to perform comprehensive SWOT audits, model cashflow forecasts, write persuasive sales emails, and automate customer care playbooks.",
    price: 249,
    originalPrice: 499,
    rating: 4.8,
    reviewsCount: 183,
    badge: "54% OFF",
    isFeatured: false,
    productFormat: "Notion System + PDF Reference Guide",
    compatibility: "ChatGPT, Claude, Gemini",
    fileSize: "14 MB",
    accentGradient: "from-pink-600 to-rose-500",
    tagline: "Turn your AI into a 24/7 Chief Operating Officer.",
    features: [
      "750+ business-oriented prompt scripts",
      "Executive decision simulation matrices",
      "Competitor price & marketing reverse-engineering prompts",
      "Customer retention & churn reduction message flows"
    ],
    whatsIncluded: [
      { title: "Business Growth Notion Board", description: "Structured prompts for every department of your company", format: "Notion", count: "750 Prompts" },
      { title: "Sales Objection Destroyer", description: "Prompts to neutralize 50 common customer objections", format: "PDF", count: "25 Pages" }
    ],
    bonuses: [
      { title: "B2B Outreach Matrix", description: "Cold email prompts tailored for corporate stakeholders", demoValue: "₹249" }
    ],
    learningOutcomes: [
      "Accelerate executive decision making with simulated scenario models",
      "Generate customer-facing business collateral in minutes instead of days"
    ],
    faqs: [
      { question: "Can I use these with team members?", answer: "Yes, you can duplicate the Notion board and share it across your organization." }
    ]
  },
  {
    id: "prod-aicct",
    slug: "ai-content-creator-toolkit",
    name: "AI Content Creator Toolkit",
    category: "ai-prompts",
    categoryName: "AI Prompt Bundles",
    shortDescription: "Viral video scripts, YouTube outlines, carousel hooks, and Twitter/X threads generated with surgical precision.",
    fullDescription: "Never stare at a blank page again. The AI Content Creator Toolkit combines algorithmic audience research with proven psychological hook templates. Generate 30 days of multi-format content in an afternoon.",
    price: 599,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 294,
    badge: "New",
    isNewArrival: true,
    productFormat: "Notion Dashboard + Prompt Swipe Files",
    compatibility: "All LLMs + Midjourney / DALL-E",
    fileSize: "22 MB",
    accentGradient: "from-purple-500 to-cyan-500",
    tagline: "Produce 30 days of viral content in a single afternoon.",
    features: [
      "1,200+ content creator prompt architectures",
      "YouTube long-form retention script generator",
      "Shorts, Reels & TikTok 60-second narrative scripts",
      "Visual Midjourney prompts for custom blog & social thumbnails"
    ],
    whatsIncluded: [
      { title: "Content Engine Notion Hub", description: "Full prompt database and scheduled content pipeline", format: "Notion", count: "1,200 Prompts" },
      { title: "Viral Hook Formula Cards", description: "100 psychological hooks categorized by emotion", format: "Interactive PDF", count: "100 Cards" }
    ],
    bonuses: [
      { title: "Thumbnail Concept Generator Prompts", description: "AI prompts that suggest high-CTR visual thumbnail concepts", demoValue: "₹399" }
    ],
    learningOutcomes: [
      "Consistently generate high-retention video intros",
      "Repurpose 1 long-form podcast or video into 15 short-form assets"
    ],
    faqs: [
      { question: "Does the output sound robotic?", answer: "No, each prompt includes stylistic guardrails (burstiness, tone constraints, banned clichés) to ensure authentic voice." }
    ]
  },

  // CATEGORY 3: META ADS COURSES
  {
    id: "prod-mam2026",
    slug: "meta-ads-mastery-2026",
    name: "Meta Ads Mastery 2026 – Pro Edition",
    category: "meta-ads-courses",
    categoryName: "Meta Ads Courses",
    shortDescription: "The complete 8-module masterclass to launch, optimize, and scale profitable Facebook & Instagram ad campaigns.",
    fullDescription: "Master Meta advertising from first principles to multi-crore scale. This 2026 edition covers the new Advantage+ shopping ecosystem, Conversion API, First-Party tracking resilience, high-ROAS creative testing frameworks, and horizontal budget scaling.",
    price: 1499,
    originalPrice: 2999,
    rating: 5.0,
    reviewsCount: 642,
    badge: "Bestseller",
    isBestSeller: true,
    isFeatured: true,
    productFormat: "50+ HD Video Lessons + 7 Exclusive Marketing Bonuses",
    compatibility: "Web browser, Mobile, Tablet (Self-Paced Stream & Downloads)",
    fileSize: "Streamable HD Videos + 1.2 GB Resource Vault",
    accentGradient: "from-blue-600 via-indigo-600 to-purple-600",
    tagline: "Learn. Launch. Optimize. Scale.",
    features: [
      "50+ in-depth HD video modules spanning 14+ hours of training",
      "Complete 8-module progressive curriculum from fundamentals to AI ads",
      "Real Ads Manager screen recordings with step-by-step setup walkthroughs",
      "High-converting ad copy templates and creative testing matrix",
      "Self-paced learning with lifetime portal access and updates"
    ],
    whatsIncluded: [
      { title: "8-Module Video Masterclass", description: "50+ comprehensive HD training lessons with zero fluff", format: "HD Video Portal", count: "50+ Videos" },
      { title: "500+ Ad Creative Templates", description: "Photoshop, Canva & Figma ad layouts ready to customize", format: "Canva/PSD", count: "500+ Files" },
      { title: "100+ Ad Copy Swipe Vault", description: "Field-tested hooks, body copy, and CTAs across 10 industries", format: "PDF / Notion", count: "100+ Swipes" },
      { title: "ROI & Campaign Tracking Sheet", description: "Automated ROAS, CAC, CPM, and budget pacing calculation model", format: "Google Sheets", count: "1 Master Sheet" }
    ],
    bonuses: [
      { title: "AI Advertising Prompt Library", description: "Custom ChatGPT prompts to create winning ad angles and customer avatars", demoValue: "₹499" },
      { title: "Advanced Audience Targeting Toolkit", description: "Interest stacking strategies and Advantage+ audience optimization guide", demoValue: "₹399" },
      { title: "Campaign Scaling Blueprint", description: "Horizontal vs vertical budget scaling SOPs to protect campaign stability", demoValue: "₹599" }
    ],
    learningOutcomes: [
      "Build leak-proof campaign structures with CBO and Advantage+ setups",
      "Diagnose dying ad sets before wasting budget with leading KPI metrics",
      "Craft high-converting short-form video hooks that arrest scrolling thumbs",
      "Implement server-side Conversions API (CAPI) for 100% signal accuracy"
    ],
    comparison: [
      { feature: "Updated for 2026 Advantage+ algorithms", elvora: true, standard: false },
      { feature: "Includes 500+ creative templates & 100+ copy swipes", elvora: true, standard: false },
      { feature: "First-Party Data & CAPI tracking setup", elvora: true, standard: false },
      { feature: "AI ad generation workflows included", elvora: true, standard: false }
    ],
    faqs: [
      { question: "Is this suitable for someone who has never run an ad before?", answer: "Yes! Module 01 starts with basic account setup and nomenclature, while Module 07 dives into multi-lakh daily scaling." },
      { question: "Do I get immediate access to all bonuses?", answer: "Yes, all 7 bonus packs are downloadable inside your member dashboard the moment you complete checkout." }
    ]
  },
  {
    id: "prod-fiast",
    slug: "facebook-instagram-ads-starter-course",
    name: "Facebook & Instagram Ads Starter Course",
    category: "meta-ads-courses",
    categoryName: "Meta Ads Courses",
    shortDescription: "A beginner-friendly crash course to launch your first profitable Meta ad campaign in under 48 hours.",
    fullDescription: "Designed for small business owners and beginners. Avoid common rookie mistakes, understand Meta's Ads Manager layout, set up your billing and pixel correctly, and launch your first lead or sales campaign with minimal budget.",
    price: 799,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 147,
    badge: "Popular",
    isFeatured: false,
    productFormat: "20 HD Video Lessons + Checklist",
    compatibility: "All devices",
    fileSize: "Streamable Video + 250 MB Resources",
    accentGradient: "from-blue-500 to-purple-500",
    tagline: "Launch your first profitable campaign with total confidence.",
    features: [
      "20 streamlined video walkthroughs (4 hours total)",
      "Zero technical jargon — easy-to-follow beginner language",
      "Pre-launch 25-point sanity checklist to avoid account bans",
      "Budgeting guidelines for campaigns starting at ₹200/day"
    ],
    whatsIncluded: [
      { title: "Starter Video Course", description: "20 step-by-step videos", format: "HD Video", count: "20 Lessons" },
      { title: "Meta Setup Checklist", description: "Pre-launch safety & verification list", format: "PDF", count: "1 Checklist" }
    ],
    bonuses: [
      { title: "First 100 Leads Playbook", description: "Cost-effective lead generation blueprint for local businesses", demoValue: "₹299" }
    ],
    learningOutcomes: [
      "Navigate Meta Business Suite without getting confused",
      "Configure your payment methods and daily spend limits safely"
    ],
    faqs: [
      { question: "How much ad budget do I need to begin?", answer: "You can start practicing with as little as ₹100 to ₹300 per day while learning." }
    ]
  },
  {
    id: "prod-apmb",
    slug: "advanced-performance-marketing-blueprint",
    name: "Advanced Performance Marketing Blueprint",
    category: "meta-ads-courses",
    categoryName: "Meta Ads Courses",
    shortDescription: "High-scale media buying strategies, omni-channel attribution, and creative iteration loops for 8-figure brands.",
    fullDescription: "For experienced media buyers and performance marketers. Learn algorithmic bid shading, cohort lifetime value analysis, third-party attribution integration, and automated creative testing matrices.",
    price: 1999,
    originalPrice: 3999,
    rating: 4.9,
    reviewsCount: 114,
    badge: "54% OFF",
    isNewArrival: true,
    productFormat: "Master Video Series + SOP Vault + Python Optimization Scripts",
    compatibility: "Desktop & Mobile",
    fileSize: "Streamable Video + 500 MB Archive",
    accentGradient: "from-indigo-600 to-purple-800",
    tagline: "Elite media buying tactics for high-growth DTC brands.",
    features: [
      "35 advanced strategic masterclass sessions",
      "Creative fatigue alert formulas and rapid refresh loops",
      "First-party attribution modeling and blended MER tracking",
      "Horizontal scale rules that maintain ROAS above 3.5x"
    ],
    whatsIncluded: [
      { title: "Advanced Video Masterclass", description: "High-level media buying curriculum", format: "HD Video", count: "35 Modules" },
      { title: "Agency SOP Vault", description: "22 Standard Operating Procedures for agency teams", format: "Notion", count: "22 SOPs" }
    ],
    bonuses: [
      { title: "Blended MER Attribution Sheet", description: "Multi-channel media efficiency dashboard", demoValue: "₹799" }
    ],
    learningOutcomes: [
      "Scale budgets past ₹5,00,000/month without margin compression",
      "Build a creative engine that generates 15 new hooks every week"
    ],
    faqs: [
      { question: "Is this suitable for complete beginners?", answer: "No, this course is tailored for individuals with prior Ads Manager experience." }
    ]
  },

  // CATEGORY 4: WEBSITE & CANVA TEMPLATES
  {
    id: "prod-ucck",
    slug: "ultimate-canva-creator-kit",
    name: "Ultimate Canva Creator Kit",
    category: "templates",
    categoryName: "Website & Canva Templates",
    shortDescription: "Over 1,200+ luxury Canva templates for Instagram, LinkedIn carousels, eBooks, client proposals, and marketing banners.",
    fullDescription: "Elevate your visual brand overnight without hiring an expensive design agency. The Ultimate Canva Creator Kit contains 1,200+ editable templates featuring clean typography, editorial aesthetics, and high-converting layouts. 100% editable in both free and Pro Canva accounts.",
    price: 499,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 421,
    badge: "Bestseller",
    isBestSeller: true,
    isFeatured: true,
    productFormat: "One-Click Canva Direct Import Links",
    compatibility: "Canva Free & Canva Pro (Mobile & Web App)",
    fileSize: "Instant Cloud Access",
    accentGradient: "from-amber-500 to-pink-500",
    tagline: "Agency-grade brand design at your fingertips in seconds.",
    features: [
      "1,200+ fully customizable, cohesive design templates",
      "Instagram feed posts, carousels, stories, and Reels title overlays",
      "eBook, workbook, and lead magnet layout systems (A4 & US Letter)",
      "Client onboarding decks, services menus, and invoice templates",
      "Cohesive luxury color palettes and curated free font pairings"
    ],
    whatsIncluded: [
      { title: "Instagram Carousel Master Pack", description: "High-engagement swipeable carousel decks", format: "Canva Link", count: "250+ Slides" },
      { title: "Lead Magnet & eBook Studio", description: "Complete book formatting with cover, contents, and chapter pages", format: "Canva Link", count: "80+ Pages" },
      { title: "Client Pitch & Proposal Decks", description: "Professional presentations that win clients over", format: "Canva Link", count: "60+ Slides" },
      { title: "Social Media Banner Suite", description: "YouTube, LinkedIn, Twitter & Facebook header designs", format: "Canva Link", count: "120+ Assets" }
    ],
    bonuses: [
      { title: "Curated Free Font Guide", description: "30 luxury font pairings available directly inside free Canva", demoValue: "₹249" },
      { title: "Stock Photography Secret Codes", description: "Search queries to unlock hidden aesthetic photos on Canva", demoValue: "₹199" }
    ],
    learningOutcomes: [
      "Publish stunning, agency-grade graphics in under 5 minutes",
      "Maintain a uniform visual identity across all social platforms",
      "Package your knowledge into sellable digital workbooks and PDFs"
    ],
    comparison: [
      { feature: "Luxury, non-generic aesthetic", elvora: true, standard: false },
      { feature: "100% functional on free Canva accounts", elvora: true, standard: false },
      { feature: "Includes full client proposals and eBooks", elvora: true, standard: false },
      { feature: "Curated color palettes and typography codes", elvora: true, standard: false }
    ],
    faqs: [
      { question: "Do I need Canva Pro to use these templates?", answer: "Not at all! Every single element, font, and photo placeholder in this bundle is accessible on a completely free Canva account." },
      { question: "How do I import them into my Canva?", answer: "You will receive an organized access dashboard with one-click links that immediately duplicate the editable designs into your Canva account." }
    ]
  },
  {
    id: "prod-mwuk",
    slug: "modern-website-ui-kit",
    name: "Modern Website UI Kit",
    category: "templates",
    categoryName: "Website & Canva Templates",
    shortDescription: "A cutting-edge Figma & Tailwind UI component kit featuring 120+ dark-mode blocks and 6 full landing page templates.",
    fullDescription: "Speed up your web development workflow by 5x. Modern Website UI Kit is built using auto-layout 5.0, complete component properties, color & typography variable tokens, and production-clean Tailwind CSS code snippets.",
    price: 799,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 308,
    badge: "Popular",
    isFeatured: true,
    productFormat: "Figma File (.fig) + React & Tailwind Snippets",
    compatibility: "Figma (Web & Desktop) + Next.js / Tailwind CSS",
    fileSize: "65 MB Figma asset file",
    accentGradient: "from-cyan-500 to-blue-600",
    tagline: "Design and ship luxury digital interfaces in record time.",
    features: [
      "120+ modular UI components (Hero, Features, Pricing, Testimonials, FAQ)",
      "6 complete high-converting landing page templates",
      "Comprehensive design token system (Dark mode optimized)",
      "Full Figma auto-layout with responsive constraints",
      "Clean semantic HTML / Tailwind CSS copy-paste snippets"
    ],
    whatsIncluded: [
      { title: "Master Figma UI Library", description: "All components with variants, tokens, and properties", format: "Figma (.fig)", count: "120+ Components" },
      { title: "6 Full Page Templates", description: "SaaS, Marketplace, Agency, Portfolio, Course & Mobile App", format: "Figma (.fig)", count: "6 Pages" },
      { title: "Tailwind Code Snippets", description: "JSX code ready to paste directly into your Next.js project", format: "Code Repository", count: "1 Code Pack" }
    ],
    bonuses: [
      { title: "3D Abstract Glassmorphism Shapes Pack", description: "30 high-resolution transparent 3D render graphics", demoValue: "₹499" }
    ],
    learningOutcomes: [
      "Assemble world-class landing pages in hours instead of weeks",
      "Leverage scalable typography and spacing tokens in your design process"
    ],
    faqs: [
      { question: "Can I use this for client commercial projects?", answer: "Yes! You can use this kit on unlimited personal and commercial client websites." }
    ]
  },
  {
    id: "prod-smdb",
    slug: "social-media-design-bundle",
    name: "Social Media Design Bundle",
    category: "templates",
    categoryName: "Website & Canva Templates",
    shortDescription: "Engaging, modern post and story graphics for brands looking to stand out on crowded social feeds.",
    fullDescription: "A versatile suite of 400+ social graphics optimized for Instagram, Facebook, and LinkedIn. Includes quote layouts, stat infographics, product announcement spotlights, and customer review cards.",
    price: 299,
    originalPrice: 699,
    rating: 4.7,
    reviewsCount: 165,
    badge: "54% OFF",
    isNewArrival: false,
    productFormat: "Canva & Figma editable files",
    compatibility: "Canva, Figma, Photoshop",
    fileSize: "Cloud Links",
    accentGradient: "from-purple-500 to-rose-500",
    tagline: "Stop the scroll with vibrant, polished social assets.",
    features: [
      "400+ cohesive square and portrait post templates",
      "Viral infographic layouts and comparison tables",
      "Animated story overlays ready for text placement"
    ],
    whatsIncluded: [
      { title: "Square Feed Graphics", description: "1080x1080 Instagram feed layouts", format: "Canva/Figma", count: "200 Posts" },
      { title: "Story & Reel Covers", description: "1080x1920 portrait layouts", format: "Canva/Figma", count: "200 Stories" }
    ],
    bonuses: [
      { title: "Social Media Content Calendar", description: "365 days of content prompts and themes", demoValue: "₹199" }
    ],
    learningOutcomes: [
      "Increase engagement and saves on Instagram and LinkedIn",
      "Maintain a uniform visual identity with minimal design effort"
    ],
    faqs: [
      { question: "Can I edit these on my smartphone?", answer: "Yes, you can edit them directly inside the Canva mobile app." }
    ]
  },

  // CATEGORY 5: SOFTWARE & TOOLS
  {
    id: "prod-cpt",
    slug: "creator-productivity-toolkit",
    name: "Creator Productivity Toolkit",
    category: "software-tools",
    categoryName: "Software & Tools",
    shortDescription: "An all-in-one Notion operating system to manage content pipelines, sponsorships, revenue, and daily task sprints.",
    fullDescription: "Eliminate operational chaos with the Creator Productivity Toolkit. Built inside Notion, this dynamic workspace connects your content calendar, sponsor deals, asset library, and financial metrics in one frictionless interface.",
    price: 699,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 278,
    badge: "Bestseller",
    isBestSeller: true,
    isFeatured: true,
    productFormat: "Notion Operating System + Google Sheets Tracker",
    compatibility: "Notion (Free & Plus), Google Sheets",
    fileSize: "Instant 1-Click Duplication",
    accentGradient: "from-cyan-500 via-teal-500 to-emerald-600",
    tagline: "Run your entire creative enterprise from a single cockpit.",
    features: [
      "Connected relational databases for Content, Sponsors, and Revenue",
      "Visual Kanban boards for YouTube, Newsletter, and Podcast stages",
      "Automated sponsor deliverables and invoice status tracker",
      "Daily Pomodoro sprint tracker with weekly review dashboards",
      "Full setup video walkthrough explaining every database relation"
    ],
    whatsIncluded: [
      { title: "Creator OS Notion Master", description: "Relational database ecosystem with personalized views", format: "Notion Template", count: "1 Master Hub" },
      { title: "Revenue & Tax Forecast Sheet", description: "Multi-currency income tracker with tax deduction estimates", format: "Google Sheets", count: "1 Sheet" },
      { title: "Video Setup Guide", description: "30-minute walkthrough showing how to tailor the OS to your needs", format: "HD Video", count: "1 Video" }
    ],
    bonuses: [
      { title: "Sponsor Rate Calculator", description: "Algorithm to price your posts based on engagement and niche CPM", demoValue: "₹299" },
      { title: "5-Minute Daily Standup Ritual", description: "Focus template to align creative priorities every morning", demoValue: "₹149" }
    ],
    learningOutcomes: [
      "Eliminate missed sponsor deadlines and unbilled invoices",
      "Maintain a predictable 30-day content pipeline ahead of time",
      "Track net profit across diverse creator income streams"
    ],
    comparison: [
      { feature: "Connected relational databases", elvora: true, standard: false },
      { feature: "Automated invoice and revenue tracking", elvora: true, standard: false },
      { feature: "Designed specifically for multi-platform creators", elvora: true, standard: false },
      { feature: "Includes 30-minute implementation video", elvora: true, standard: false }
    ],
    faqs: [
      { question: "Is Notion free to use with this template?", answer: "Yes! This template works 100% seamlessly on Notion's free tier." },
      { question: "Can I customize the databases?", answer: "Absolutely. Notion is infinitely modular, and you can add properties, views, or pages as you grow." }
    ]
  },
  {
    id: "prod-bask",
    slug: "business-automation-starter-kit",
    name: "Business Automation Starter Kit",
    category: "software-tools",
    categoryName: "Software & Tools",
    shortDescription: "Plug-and-play Make.com & Zapier blueprints to automate onboarding, invoicing, email triggers, and CRM updates.",
    fullDescription: "Save 15+ hours every week by automating repetitive administrative tasks. This kit includes 25 pre-built automation blueprints with one-click JSON import for Make.com and Zapier.",
    price: 999,
    originalPrice: 1999,
    rating: 4.8,
    reviewsCount: 153,
    badge: "New",
    isNewArrival: true,
    productFormat: "Make.com & Zapier JSON Blueprints + Setup Guide",
    compatibility: "Make.com, Zapier, Airtable, Stripe, Gmail",
    fileSize: "15 MB Archive",
    accentGradient: "from-blue-600 to-cyan-500",
    tagline: "Put your business operations on intelligent autopilot.",
    features: [
      "25 pre-tested automation workflow blueprints",
      "Automated client onboarding pipeline (Contract -> Invoice -> Welcome Email)",
      "Stripe failed-payment recovery email sequence automation",
      "Social media post auto-scheduler from Airtable records"
    ],
    whatsIncluded: [
      { title: "25 JSON Automation Blueprints", description: "Direct import files for Make.com and Zapier", format: "JSON Files", count: "25 Blueprints" },
      { title: "Step-by-Step Video Setup Guides", description: "Video tutorials for configuring API keys and webhooks", format: "HD Video", count: "12 Videos" }
    ],
    bonuses: [
      { title: "API Webhook Debugger Guide", description: "Troubleshooting guide for status code errors and payload formatting", demoValue: "₹399" }
    ],
    learningOutcomes: [
      "Connect disparate apps without writing custom server code",
      "Eliminate manual data entry across customer transactions"
    ],
    faqs: [
      { question: "Do I need coding skills to use these blueprints?", answer: "No coding required! Simply upload the JSON files and connect your accounts." }
    ]
  },
  {
    id: "prod-wltk",
    slug: "website-launch-toolkit",
    name: "Website Launch Toolkit",
    category: "software-tools",
    categoryName: "Software & Tools",
    shortDescription: "A bulletproof 100-point pre-launch checklist, SEO validator, performance testing sheets, and legal policy generator.",
    fullDescription: "Never launch a broken website again. The Website Launch Toolkit is an indispensable QA companion that audits your site across 10 critical domains: responsiveness, SEO metadata, page speed, accessibility, legal compliance, analytics, forms, SSL security, broken links, and backup automation.",
    price: 599,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 198,
    badge: "54% OFF",
    isFeatured: false,
    productFormat: "Interactive Notion QA Matrix + Audit Spreadsheet",
    compatibility: "Notion & Google Sheets",
    fileSize: "Instant Cloud Access",
    accentGradient: "from-purple-600 to-indigo-600",
    tagline: "Guarantee a flawless, high-converting website launch every time.",
    features: [
      "100-point pre-flight launch verification matrix",
      "Automated score tracker to calculate launch readiness percentage",
      "Privacy Policy and Terms & Conditions legal generator templates",
      "Open Graph image validator and SEO snippet preview tool"
    ],
    whatsIncluded: [
      { title: "Launch QA Master Matrix", description: "Categorized 100-point interactive inspection board", format: "Notion / Sheets", count: "100 Checks" },
      { title: "Legal Policy Template Suite", description: "Compliant Privacy, Terms & Cookie disclosure copy", format: "Word / Docs", count: "4 Documents" }
    ],
    bonuses: [
      { title: "Core Web Vitals Speed Checklist", description: "Specific optimizations to pass Google PageSpeed with 90+ scores", demoValue: "₹299" }
    ],
    learningOutcomes: [
      "Catch critical tracking and form bugs before sending paid traffic",
      "Ensure compliance with international privacy and accessibility standards"
    ],
    faqs: [
      { question: "Is this useful for agency client delivery?", answer: "Yes! Many agencies share this exact checklist with clients to formalize sign-off before site handoff." }
    ]
  },

  // BONUS FREE RESOURCE FOR FREE-RESOURCES PAGE
  {
    id: "prod-free-ads-checklist",
    slug: "free-meta-ads-checklist",
    name: "The 25-Point Meta Ads Pre-Launch Checklist",
    category: "meta-ads-courses",
    categoryName: "Meta Ads Courses",
    shortDescription: "Avoid costly mistakes. Inspect your pixel, audience overlap, creative specs, and tracking tags before spending ₹1.",
    fullDescription: "A complimentary 25-point actionable checklist used by high-performing media buyers. Verify your campaign setup, tracking parameters, conversion events, and copywriting hooks before hitting the publish button.",
    price: 0,
    originalPrice: 299,
    rating: 5.0,
    reviewsCount: 890,
    badge: "Free",
    isFree: true,
    productFormat: "Interactive PDF & Printable Checklist",
    compatibility: "All devices",
    fileSize: "4 MB",
    accentGradient: "from-emerald-500 to-teal-600",
    tagline: "Your pre-flight checklist for profitable ad launches.",
    features: [
      "25 critical inspection points across Tracking, Audiences & Creatives",
      "Pixel & CAPI verification steps to avoid blind spending",
      "Ad copy compliance rules to prevent account bans",
      "Instant 100% free digital download"
    ],
    whatsIncluded: [
      { title: "Printable Checklist", description: "Color-coded 25-point inspection rubric", format: "PDF", count: "4 Pages" }
    ],
    bonuses: [
      { title: "Budget Pacing Guide", description: "How to scale your budget without triggering the learning phase", demoValue: "₹149" }
    ],
    learningOutcomes: [
      "Prevent costly tracking errors and rejected advertisements",
      "Verify audience sizes and bid caps for maximum efficiency"
    ],
    faqs: [
      { question: "Is this really 100% free?", answer: "Yes! Simply add to cart or click download for immediate access with zero payment required." }
    ]
  }
];
