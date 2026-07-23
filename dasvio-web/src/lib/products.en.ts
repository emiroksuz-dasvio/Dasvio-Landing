import {
  QrVisual,
  PosVisual,
  BranchVisual,
  IntegrationsVisual,
  AnalyticsVisual,
  SignageVisual,
} from "@/components/mockups/FeatureVisuals";
import {
  LangChips,
  ThemeSwatches,
  QrTablePreview,
  SpotlightBanner,
  DeviceSync,
  ReceiptSlip,
  RevenueDonut,
  ClockFace,
  NetworkNodes,
  OverrideMatrix,
  TierBadges,
  ScheduleCalendar,
  CatalogMap,
  PricingSheet,
  ReviewBubbles,
  StatusToggles,
  HeatmapMini,
  ComparisonBars,
  PaymentDonut,
  CompChart,
  PlaylistStack,
  ScheduleClock,
  CustomerScreen,
  PushScreens,
} from "@/components/mockups/FeatureSubVisuals";
import type { ProductData, ProductSlug } from "./products";

/**
 * English copy for the product pages. Structure — slug, variant, accentTint and
 * every Visual component — must mirror the Turkish map in `products.ts`; only
 * human-facing strings differ.
 */
export const PRODUCTS_EN: Record<ProductSlug, ProductData> = {
  "qr-menu": {
    slug: "qr-menu",
    category: "Guest experience",
    title: "QR Menu",
    description:
      "A multilingual digital menu with AI translation in 14 languages. Themes, spotlights, campaigns and table-based ordering included. Guests scan, browse and order — and your menu stays in sync as you edit it.",
    tags: ["AI translation", "Theme control", "Table-based"],
    variant: "split",
    accentTint: "#ffffff",
    MainVisual: QrVisual,
    subCards: [
      {
        Visual: LangChips,
        title: "AI translation, 14 languages",
        body: "Translate your entire menu in one click. Hand-edit any string you like — Dasvio AI keeps the rest in sync.",
      },
      {
        Visual: ThemeSwatches,
        title: "Theme & brand control",
        body: "Set colour, typography, layout and spotlights from the dashboard. Preview changes on a real device before publishing.",
      },
      {
        Visual: QrTablePreview,
        title: "Table-based QR flow",
        body: "Every table gets its own QR code. Guests browse, customise and order — and orders land in the POS in real time.",
      },
      {
        Visual: SpotlightBanner,
        title: "Spotlights & campaigns",
        body: "Feature the weekly special or a seasonal combo at the top of the menu. Schedule it, target it by branch, A/B test it.",
      },
    ],
  },
  pos: {
    slug: "pos",
    category: "Operations",
    title: "POS Management",
    description:
      "Run your whole point-of-sale operation from one dashboard: tablets and terminals, receipt and kitchen printers, revenue centres, opening hours and ticket history. Compatible with every major hardware brand.",
    tags: ["Multi-device", "Printer management", "Revenue centres"],
    variant: "stack",
    accentTint: "#06b6d4",
    MainVisual: PosVisual,
    subCards: [
      {
        Visual: DeviceSync,
        title: "Multi-device sync",
        body: "Tablets, terminals, mobile POS — all synced in real time. Open an order on one device, close it on another.",
      },
      {
        Visual: ReceiptSlip,
        title: "Kitchen & receipt printing",
        body: "Route items to the right kitchen by station. Customise receipt templates per branch, channel and revenue centre.",
      },
      {
        Visual: RevenueDonut,
        title: "Revenue centres",
        body: "Separate dine-in, takeaway, delivery and bar revenue. Each gets its own tax treatment, printer, reporting and rules.",
      },
      {
        Visual: ClockFace,
        title: "Opening hours & shifts",
        body: "Define hours per branch and channel. Lock the POS outside working hours, and manage staff shifts and POS PINs.",
      },
    ],
  },
  "multi-branch": {
    slug: "multi-branch",
    category: "Multi-branch",
    title: "Multi-Branch Management",
    description:
      "A central master menu with per-branch overrides for price, variants and availability. Group branches into regional tiers, make bulk edits and clone setups between locations in seconds. Designed for 1 to 1,000.",
    tags: ["Master menu", "Store groups", "Price tiers"],
    variant: "split",
    accentTint: "#f43f5e",
    MainVisual: BranchVisual,
    subCards: [
      {
        Visual: NetworkNodes,
        title: "Central master menu",
        body: "A single source. Edit the master — changes propagate to the branches you choose, as often as you choose.",
      },
      {
        Visual: OverrideMatrix,
        title: "Per-branch overrides",
        body: "Override price, variant, availability or imagery at any branch without touching the master menu.",
      },
      {
        Visual: TierBadges,
        title: "Regional price tiers",
        body: "Group branches into tiers. Premium at the airport, discounted in the suburbs — applied automatically.",
      },
      {
        Visual: ScheduleCalendar,
        title: "Menu scheduling & cloning",
        body: "Schedule menus to switch at set times. Clone an entire structure between branches in seconds.",
      },
    ],
  },
  integrations: {
    slug: "integrations",
    category: "Integrations",
    title: "Platform Integrations",
    description:
      "Getir, Trendyol, Yemeksepeti, Qapera and more — map your catalogue once and every platform stays in sync. Bulk pricing, a review inbox, claim management and live status control from one dashboard.",
    tags: ["Getir", "Trendyol", "Yemeksepeti"],
    variant: "magazine",
    accentTint: "#f59e0b",
    MainVisual: IntegrationsVisual,
    subCards: [
      {
        Visual: CatalogMap,
        title: "Map the catalogue once",
        body: "Map products, categories and modifiers to their platform counterparts once. Everything stays in sync from then on.",
      },
      {
        Visual: PricingSheet,
        title: "Bulk platform pricing",
        body: "Update prices across Getir, Trendyol and Yemeksepeti in one sheet view. Per-platform margin support included.",
      },
      {
        Visual: ReviewBubbles,
        title: "Review & claim inbox",
        body: "Reply to platform reviews from a single inbox. Approve or reject Trendyol claims directly inside Dasvio.",
      },
      {
        Visual: StatusToggles,
        title: "Live status control",
        body: "Switch restaurant busy mode, courier status or open/closed state on every platform from one toggle.",
      },
    ],
  },
  analytics: {
    slug: "analytics",
    category: "Intelligence",
    title: "Real-Time Analytics",
    description:
      "Sales broken down by hour, branch, channel and product. Heatmaps reveal peak load, payment mix reveals guest behaviour. Filter by any dimension, drill into any metric, export all of it.",
    tags: ["Heatmaps", "Product analysis", "Live dashboard"],
    variant: "stack",
    accentTint: "#ef4444",
    MainVisual: AnalyticsVisual,
    subCards: [
      {
        Visual: HeatmapMini,
        title: "Hourly sales heatmap",
        body: "See peaks and troughs across days and hours. Spot exactly when to schedule a promotion or extra staff.",
      },
      {
        Visual: ComparisonBars,
        title: "Branch & channel comparison",
        body: "Compare branches side by side. Slice revenue by dine-in, delivery, online or any channel you run.",
      },
      {
        Visual: PaymentDonut,
        title: "Payment & product mix",
        body: "Card vs. cash vs. online split. Best sellers, category performance, modifier usage — all drillable.",
      },
      {
        Visual: CompChart,
        title: "Comp & void tracking",
        body: "Track comp and void rates by branch and shift. Flag unusual patterns that need attention.",
      },
    ],
  },
  signage: {
    slug: "signage",
    category: "Guest experience",
    title: "Digital Signage",
    description:
      "In-restaurant screens, customer-facing displays and menu boards — all managed from the same dashboard. Upload media, build playlists, schedule by branch or tag. Updates push in real time.",
    tags: ["Playlists", "Device management", "Customer display"],
    variant: "magazine",
    accentTint: "#10b981",
    MainVisual: SignageVisual,
    subCards: [
      {
        Visual: PlaylistStack,
        title: "Playlists & layouts",
        body: "Build playlists from images, video and live content. Apply a layout per screen — portrait, landscape or split.",
      },
      {
        Visual: ScheduleClock,
        title: "Schedule by branch or tag",
        body: "Lunch promo at 11, dinner at 18. Target specific branches, branch groups or content tags.",
      },
      {
        Visual: CustomerScreen,
        title: "Customer-facing display",
        body: "Mirror the till to a guest-facing screen. Show the order summary, a tip prompt and your branding.",
      },
      {
        Visual: PushScreens,
        title: "Real-time updates",
        body: "Update content across every screen in seconds. Take a screen showing the wrong content offline remotely.",
      },
    ],
  },
  "staff-permissions": {
    slug: "staff-permissions",
    category: "Operations",
    title: "Staff & Permissions",
    description:
      "Manage your whole team from one dashboard — custom roles, shifts, POS PINs and access scoped by branch and time window. Onboard new staff in minutes, lock down unauthorised actions and stay audit-ready.",
    tags: ["Custom roles", "POS PINs", "Audit trail"],
    variant: "split",
    accentTint: "#3b82f6",
    MainVisual: PosVisual,
    subCards: [
      {
        Visual: DeviceSync,
        title: "Roles & scoped access",
        body: "Define exactly what each role can see and do — scoped globally, regionally, by branch or by time window.",
      },
      {
        Visual: OverrideMatrix,
        title: "POS PINs & fast login",
        body: "A personal POS PIN per staff member. Lockout after failed attempts. Manager unlock from the dashboard.",
      },
      {
        Visual: ScheduleCalendar,
        title: "Shift planning",
        body: "Plan and swap shifts per branch and track hours. Synced with the POS — staff can only log in during their shift.",
      },
      {
        Visual: ReviewBubbles,
        title: "Full audit trail",
        body: "Every comp, void, discount and override is logged with the staff member's name, branch and timestamp.",
      },
    ],
  },
  "revenue-centers": {
    slug: "revenue-centers",
    category: "Operations",
    title: "Revenue Centres",
    description:
      "Split dine-in, takeaway, delivery, bar and other channels into their own revenue centres — each with its own tax rules, printer routing, reporting and opening hours. Clean numbers, clean operations.",
    tags: ["Channel separation", "Tax rules", "Routing"],
    variant: "stack",
    accentTint: "#f43f5e",
    MainVisual: AnalyticsVisual,
    subCards: [
      {
        Visual: RevenueDonut,
        title: "Rules per channel",
        body: "Each revenue centre gets its own tax rate, service charge, tipping and opening-hours configuration.",
      },
      {
        Visual: ComparisonBars,
        title: "Independent reporting",
        body: "View revenue, ticket size and peak hours per centre. Compare side by side or roll up to the branch total.",
      },
      {
        Visual: ReceiptSlip,
        title: "Routing & printing",
        body: "Route items to the right kitchen station and printer based on the revenue centre the order came from.",
      },
      {
        Visual: ClockFace,
        title: "Opening hours",
        body: "Dine-in 11–22, delivery 11–02. Each channel keeps its own schedule, all in one place.",
      },
    ],
  },
  "branch-overrides": {
    slug: "branch-overrides",
    category: "Multi-branch",
    title: "Branch Overrides",
    description:
      "Override price, variants, availability, imagery and schedules at any branch — without touching the master menu. Local control under master oversight, exactly as it should work.",
    tags: ["Override matrix", "Variant control", "Bulk apply"],
    variant: "split",
    accentTint: "#ec4899",
    MainVisual: BranchVisual,
    subCards: [
      {
        Visual: OverrideMatrix,
        title: "Visual override matrix",
        body: "See which products carry overrides at which branches in one sheet view. No surprises.",
      },
      {
        Visual: TierBadges,
        title: "Per-branch price overrides",
        body: "Raise a specific item at one location and lower it at another. Track who changed what, and when.",
      },
      {
        Visual: PricingSheet,
        title: "Bulk override workflow",
        body: "Override 50 prices across 12 branches in one operation. Validate before publishing, roll back in one click.",
      },
      {
        Visual: NetworkNodes,
        title: "Reset to master any time",
        body: "Clear a single override or wipe every override at a branch. The master menu always stays intact.",
      },
    ],
  },
  "regional-pricing": {
    slug: "regional-pricing",
    category: "Multi-branch",
    title: "Regional Pricing",
    description:
      "Group branches into pricing tiers and apply rules per region. Premium at airport locations, standard in city centres, discounted in the suburbs — all automatic, all auditable.",
    tags: ["Price tiers", "Store groups", "Bulk pricing"],
    variant: "magazine",
    accentTint: "#f59e0b",
    MainVisual: BranchVisual,
    subCards: [
      {
        Visual: TierBadges,
        title: "Tier-based store groups",
        body: "Group your branches into Premium / Standard / Discount tiers. Add a branch — pricing follows the tier.",
      },
      {
        Visual: PricingSheet,
        title: "Bulk percentage increases",
        body: "Apply a 15% increase to every dessert in the Premium tier in one operation. Schedulable, reversible.",
      },
      {
        Visual: NetworkNodes,
        title: "Geographic store groups",
        body: "Group by city, region or country. Apply currency, tax and pricing rules at the group level.",
      },
      {
        Visual: ReviewBubbles,
        title: "Channel-based pricing",
        body: "A different price on Getir, on Trendyol and for dine-in. All managed within the same tier framework.",
      },
    ],
  },
  heatmaps: {
    slug: "heatmaps",
    category: "Intelligence",
    title: "Heatmaps",
    description:
      "Visualise peak load across days, hours, branches and channels. Spot the patterns — busy hours, quiet days, regional differences — and act on them. Heatmaps make scheduling decisions obvious.",
    tags: ["Hour × Day", "Branch overlay", "Channel split"],
    variant: "stack",
    accentTint: "#06b6d4",
    MainVisual: AnalyticsVisual,
    subCards: [
      {
        Visual: HeatmapMini,
        title: "Hour × Day heatmap",
        body: "See exactly when your branch is busiest. Lunch rush vs. dinner peak, Tuesday vs. Saturday — at a glance.",
      },
      {
        Visual: ComparisonBars,
        title: "Branch comparison",
        body: "Overlay heatmaps for multiple branches. Find the one with the longest queue or the earliest peak.",
      },
      {
        Visual: PaymentDonut,
        title: "Channel-split heatmaps",
        body: "Separate heatmaps for dine-in, delivery and takeaway. Staff per channel, not per shift.",
      },
      {
        Visual: CompChart,
        title: "Year-over-year comparison",
        body: "Compare this week against the same week last year. Spot trend shifts and plan promotions with confidence.",
      },
    ],
  },
  reports: {
    slug: "reports",
    category: "Intelligence",
    title: "Reports",
    description:
      "Build any report you need with a drag-and-drop report builder. Schedule recurring exports to email, deliver as PDF or Excel, and save your team's favourite views as templates. Designed for finance, operations and franchise leads.",
    tags: ["Custom builder", "Scheduled exports", "PDF & Excel"],
    variant: "split",
    accentTint: "#10b981",
    MainVisual: AnalyticsVisual,
    subCards: [
      {
        Visual: ComparisonBars,
        title: "Drag-and-drop builder",
        body: "Pick dimensions, metrics, filters and visualisations. Save as a template and share it with your team.",
      },
      {
        Visual: PricingSheet,
        title: "Scheduled delivery",
        body: "Weekly P&L every Monday at 9am, monthly tax report on the 1st. Email, Slack or webhook — your choice.",
      },
      {
        Visual: PaymentDonut,
        title: "Multi-format export",
        body: "PDF for board decks, Excel for finance, CSV for data warehouses. One source, every format.",
      },
      {
        Visual: HeatmapMini,
        title: "Saved presets by role",
        body: "The owner sees the executive summary, operations sees branch detail, accounting sees the tax view. All on the same data.",
      },
    ],
  },
  "campaign-builder": {
    slug: "campaign-builder",
    category: "Marketing",
    title: "Campaign & Discount Builder",
    description:
      "A draggable node graph in a trigger → condition → reward flow. Build complex campaign rules visually without writing code — a live logic panel validates every rule instantly, before you publish.",
    tags: ["9 campaign types", "Visual rule builder", "8 reward types"],
    variant: "magazine",
    accentTint: "#8b5cf6",
    MainVisual: BranchVisual,
    subCards: [
      {
        Visual: SpotlightBanner,
        title: "9 campaign types",
        body: "BOGO, happy hour, coupons, bundles and more — start from 9 ready-made templates or build your own on a blank canvas. Picking a type wires up the trigger, condition and reward nodes for you.",
      },
      {
        Visual: OverrideMatrix,
        title: "Visual rule builder",
        body: "Drag and connect trigger → condition → reward nodes. Combine 6 condition types: time window, minimum spend, branch, customer segment and channel. No code.",
      },
      {
        Visual: TierBadges,
        title: "8 reward types",
        body: "Percentage or fixed discount, free item, bundle price, points and more. Constrain a reward with exclusivity and usage-limit rules.",
      },
      {
        Visual: ScheduleCalendar,
        title: "Coupons & scheduling",
        body: "Schedule campaigns to specific hours, days or seasons. Generate coupon codes, target by branch and channel, set an end date.",
      },
    ],
  },
  "combo-builder": {
    slug: "combo-builder",
    category: "Menu",
    title: "Combo & Set Menu Builder",
    description:
      "Build flexible combos from component groups — with three pricing modes, combo sizes and tier pricing. Preview how it prints on the receipt and assign it to menus in one click. Fits any business model.",
    tags: ["3 pricing modes", "Component groups", "Combo sizes"],
    variant: "split",
    accentTint: "#f59e0b",
    MainVisual: PosVisual,
    subCards: [
      {
        Visual: PricingSheet,
        title: "3 pricing modes",
        body: "Fixed price (a ₺149 combo), surcharge (base + the difference on each choice) or total (the sum of the choices) — one for every business model. Switch mode in one click.",
      },
      {
        Visual: CatalogMap,
        title: "Component groups",
        body: "Create groups such as main, drink and extras. Set each group required or optional, single or multi-select, with a min–max choice count. Reorder by drag and drop.",
      },
      {
        Visual: TierBadges,
        title: "Combo sizes & tier pricing",
        body: "A separate price per Small, Medium and Large. Use tier-based pricing to charge different branch groups differently.",
      },
      {
        Visual: ReceiptSlip,
        title: "Receipt preview & menu assignment",
        body: "Preview how the combo prints on the receipt. Assign it to one menu or many, and control availability per branch.",
      },
    ],
  },
};
