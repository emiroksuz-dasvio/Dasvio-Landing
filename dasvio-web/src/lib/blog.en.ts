import type { BlogAuthor, BlogPost } from "./blog";

/**
 * English blog index. Slugs, dates, cover images, accent tints and the featured
 * flag must mirror `blog.ts` entry for entry and stay in the same order; only
 * the human-facing strings differ. Article bodies live in `blog-content.en.ts`.
 */
const AUTHORS: Record<string, BlogAuthor> = {
  ayse: { name: "Ayşe Demir", role: "Director of Product", initials: "AD", color: "#f43f5e" },
  mehmet: { name: "Mehmet Kaya", role: "Founding Engineer", initials: "MK", color: "#e11d48" },
  selin: { name: "Selin Aktaş", role: "Customer Success Lead", initials: "SA", color: "#fb7185" },
  can: { name: "Can Yıldız", role: "Head of Operations", initials: "CY", color: "#fda4af" },
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1600&auto=format&fit=crop&q=80`;

export const BLOG_POSTS_EN: BlogPost[] = [
  {
    slug: "ai-translation-qr-menu-turkey-2026",
    title: "How AI translation is reshaping QR menus across Türkiye",
    excerpt:
      "From Istanbul's tourist districts to Antalya's coastal resorts, multilingual menus are no longer a luxury — they're table stakes. Inside the numbers behind Dasvio's 14-language rollout.",
    category: "industry",
    date: "2026-05-18",
    readTime: "8 min read",
    author: AUTHORS.ayse,
    coverImage: u("1559329007-40df8a9345d8"),
    tags: ["AI", "QR Menu", "Multilingual"],
    featured: true,
    accentTint: "#f43f5e",
  },
  {
    slug: "anatolia-kebap-50-branches-90-days",
    title: "From 1 to 50 branches: scaling Anatolia Kebap's menu in 90 days",
    excerpt:
      "When a regional chain decided to open franchises in 7 cities in a single quarter, the operations team needed a system that wouldn't buckle. Here's how they did it.",
    category: "customer-story",
    date: "2026-05-10",
    readTime: "12 min read",
    author: AUTHORS.selin,
    coverImage: u("1568901346375-23c9450c58cd"),
    tags: ["Multi-branch", "Franchise", "Case study"],
    accentTint: "#fb7185",
  },
  {
    slug: "platform-integrations-engineering",
    title: "Why platform integrations fall apart in the field (and how we fixed ours)",
    excerpt:
      "Getir, Trendyol and Yemeksepeti each have their own catalogue quirks. We rebuilt our sync engine from scratch — here's what we learned about distributed matching.",
    category: "engineering",
    date: "2026-05-02",
    readTime: "15 min read",
    author: AUTHORS.mehmet,
    coverImage: u("1556742044-3c52d6e88c62"),
    tags: ["Engineering", "Integrations", "Infrastructure"],
    accentTint: "#e11d48",
  },
  {
    slug: "revenue-center-engine",
    title: "Inside Dasvio's revenue centre engine: 7 design decisions",
    excerpt:
      "How we built a system that splits dine-in, takeaway, delivery and bar revenue without making the cashier's job harder or the manager's report messier.",
    category: "product",
    date: "2026-04-28",
    readTime: "10 min read",
    author: AUTHORS.mehmet,
    coverImage: u("1555396273-367ea4eb4db5"),
    tags: ["Product", "Revenue centres", "Architecture"],
    accentTint: "#f43f5e",
  },
  {
    slug: "12-second-checkout",
    title: "The 12-second checkout: anatomy of a café morning rush",
    excerpt:
      "We timed 4,200 transactions across 8 Istanbul cafés. Where every second goes, where guests walk away, and which seconds Dasvio actually wins back.",
    category: "operations",
    date: "2026-04-22",
    readTime: "9 min read",
    author: AUTHORS.can,
    coverImage: u("1554118811-1e0d58224f24"),
    tags: ["Cafés", "Performance", "POS"],
    accentTint: "#fb7185",
  },
  {
    slug: "hourly-heatmaps-primer",
    title: "Hourly heatmaps for restaurant operations: a primer that works",
    excerpt:
      "If you've never plotted your busiest hour against your quietest day, you're leaving money on the table. A step-by-step walkthrough with examples from real operators.",
    category: "operations",
    date: "2026-04-15",
    readTime: "7 min read",
    author: AUTHORS.ayse,
    coverImage: u("1414235077428-338989a2e8c0"),
    tags: ["Analytics", "Heatmaps", "Operations"],
    accentTint: "#f43f5e",
  },
  {
    slug: "master-menu-branch-reality",
    title: "Master menu, branch reality: lessons from 1,000-location rollouts",
    excerpt:
      "What happens when head office wants 95% brand consistency and every franchisee swears their market is different. Hint: it isn't only a software problem.",
    category: "industry",
    date: "2026-04-08",
    readTime: "11 min read",
    author: AUTHORS.can,
    coverImage: u("1559339352-11d035aa65de"),
    tags: ["Chains", "Franchise", "Multi-branch"],
    accentTint: "#fda4af",
  },
  {
    slug: "cloud-kitchens-software-problem",
    title: "Cloud kitchens are a software problem dressed up as real estate",
    excerpt:
      "Six brands, one prep line, eight aggregators. The economics only work when the system can keep up with the chaos — which is what most platforms miss.",
    category: "industry",
    date: "2026-03-30",
    readTime: "13 min read",
    author: AUTHORS.mehmet,
    coverImage: u("1556909114-f6e7ad7d3136"),
    tags: ["Cloud kitchens", "Aggregators", "Strategy"],
    accentTint: "#f43f5e",
  },
  {
    slug: "pos-built-for-cashiers",
    title: "Why we built our POS for cashiers, not engineers",
    excerpt:
      "Most POS systems optimise for back-office reporting. Ours optimises for the tired person at the terminal at 9pm on a Friday. How that decision shaped everything.",
    category: "product",
    date: "2026-03-22",
    readTime: "6 min read",
    author: AUTHORS.ayse,
    coverImage: u("1556742111-a301076d9d18"),
    tags: ["POS", "UX", "Design"],
    accentTint: "#fb7185",
  },
  {
    slug: "q3-2026-product-update",
    title: "Q3 2026 product update: 14 new features, one big idea",
    excerpt:
      "Heatmap overlays, multilingual customer displays, Trendyol claim inbox v2 and the long-awaited drag-and-drop report builder. All shipping this quarter.",
    category: "product",
    date: "2026-03-15",
    readTime: "5 min read",
    author: AUTHORS.ayse,
    coverImage: u("1556910103-1c02745aae4d"),
    tags: ["Updates", "Release notes", "Roadmap"],
    accentTint: "#f43f5e",
  },
  {
    slug: "receipt-printers-2026",
    title: "Receipt printers in 2026: somehow still the wild west",
    excerpt:
      "The most mundane peripheral in your restaurant is also the most fragmented standard. A field report from 14 hardware vendors, with charts.",
    category: "engineering",
    date: "2026-03-08",
    readTime: "8 min read",
    author: AUTHORS.mehmet,
    coverImage: u("1551024506-0bccd828d307"),
    tags: ["Hardware", "Printers", "Infrastructure"],
    accentTint: "#e11d48",
  },
  {
    slug: "hotel-fb-revenue-math",
    title: "The peculiar maths of hotel F&B revenue centres",
    excerpt:
      "Restaurant + bar + room service + pool café isn't 4 departments — it's 4 different businesses sharing one back office. Why the accounting has to reflect that.",
    category: "industry",
    date: "2026-03-01",
    readTime: "10 min read",
    author: AUTHORS.can,
    coverImage: u("1455587734955-081b22074882"),
    tags: ["Hotels", "Revenue centres", "Finance"],
    accentTint: "#e11d48",
  },
];
