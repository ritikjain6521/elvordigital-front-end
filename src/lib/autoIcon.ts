const KEYWORD_ICON_MAP: Array<{ keywords: string[]; icon: string }> = [
  { keywords: ["chatgpt", "gpt", "claude", "llm", "chatbot", "bot"], icon: "🤖" },
  { keywords: ["openai", "agent", "brain", "neural", "intelligence", "thinking", "puzzle"], icon: "🧠" },
  { keywords: ["n8n", "automation", "automate", "workflow", "instant", "fast", "speed", "zap"], icon: "⚡" },
  { keywords: ["meta", "facebook", "fb", "ad", "ads", "marketing", "campaign", "roas", "megaphone"], icon: "📣" },
  { keywords: ["instagram", "reel", "story", "photo", "camera"], icon: "📸" },
  { keywords: ["youtube", "video", "vimeo", "film", "stream"], icon: "🎬" },
  { keywords: ["whatsapp", "chat", "message", "dm", "sms"], icon: "💬" },
  { keywords: ["telegram", "send", "launch", "rocket"], icon: "✈️" },
  { keywords: ["email", "gmail", "outlook", "mail", "newsletter", "inbox"], icon: "📧" },
  { keywords: ["lead", "target", "goal", "conversion", "ctr", "funnel"], icon: "🎯" },
  { keywords: ["crm", "folder", "organize", "directory", "drive"], icon: "🗂️" },
  { keywords: ["shopify", "woocommerce", "ecommerce", "e-commerce", "store", "shop", "sales", "cart"], icon: "🛒" },
  { keywords: ["support", "helpdesk", "ticket", "customer service", "headset"], icon: "🎧" },
  { keywords: ["sheet", "excel", "analytics", "report", "chart", "kpi", "dashboard", "data"], icon: "📊" },
  { keywords: ["scraping", "scrape", "extract", "crawler", "spider"], icon: "🕷️" },
  { keywords: ["api", "webhook", "integration", "connect", "plugin"], icon: "🔌" },
  { keywords: ["wordpress", "website", "web", "seo", "domain", "internet", "globe"], icon: "🌐" },
  { keywords: ["search", "keyword", "audit", "find"], icon: "🔍" },
  { keywords: ["blog", "writing", "copy", "content", "script", "prompt", "handwriting", "vocabulary"], icon: "✍️" },
  { keywords: ["finance", "invoice", "money", "payment", "profit", "price", "revenue", "budget"], icon: "💰" },
  { keywords: ["hr", "recruit", "team", "community", "people", "parent", "teacher"], icon: "👥" },
  { keywords: ["project", "notion", "trello", "asana", "task", "checklist", "plan"], icon: "📋" },
  { keywords: ["growth", "scale", "trending", "boost"], icon: "📈" },
  { keywords: ["database", "sql", "mongodb", "airtable", "supabase", "storage", "cloud"], icon: "🗄️" },
  { keywords: ["design", "canva", "figma", "color", "coloring", "art", "creative", "ui"], icon: "🎨" },
  { keywords: ["alphabet", "abc", "letter", "phonics"], icon: "🔤" },
  { keywords: ["number", "count", "math", "addition", "subtraction"], icon: "🔢" },
  { keywords: ["ebook", "book", "guide", "reading", "course", "learn", "education", "worksheet"], icon: "📚" },
  { keywords: ["bonus", "gift", "free", "reward"], icon: "🎁" },
  { keywords: ["security", "safe", "lock", "privacy", "verified", "guarantee"], icon: "🔒" },
  { keywords: ["time", "hour", "clock", "schedule"], icon: "⏱️" },
  { keywords: ["download", "import", "file", "zip", "pdf"], icon: "📥" },
  { keywords: ["game", "play", "memory", "matching"], icon: "🎮" },
  { keywords: ["animal", "bird", "nature", "wildlife"], icon: "🐾" },
  { keywords: ["science", "lab", "experiment"], icon: "🔬" },
  { keywords: ["school", "classroom", "preschool", "kindergarten"], icon: "🏫" },
];

export function autoGenerateIcon(title: string, description = ""): string {
  const haystack = `${title} ${description}`.toLowerCase();
  for (const entry of KEYWORD_ICON_MAP) {
    if (entry.keywords.some((kw) => haystack.includes(kw))) {
      return entry.icon;
    }
  }
  return "✨";
}
