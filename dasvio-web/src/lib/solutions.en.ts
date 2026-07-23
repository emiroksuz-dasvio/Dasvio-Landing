import type { SolutionData, SolutionSlug } from "./solutions";

/**
 * English copy for the solution pages. Structure — slug, variant, accentTint,
 * photo, recommended products — must stay identical to the Turkish map in
 * `solutions.ts`; only human-facing strings differ. Adding a slug there without
 * adding it here is a type error, which is the point.
 */
export const SOLUTIONS_EN: Record<SolutionSlug, SolutionData> = {
  restaurants: {
    slug: "restaurants",
    eyebrow: "Fine dining",
    title: "Chef-led kitchens, service that flows.",
    tagline:
      "For tasting menus, à la carte, wine programmes and reservation-heavy dining rooms.",
    description:
      "Fine dining lives or dies by timing. Dasvio keeps the front of house, the kitchen and the wine programme in step, so every course lands on time, every guest gets the right tasting notes and every table holds its rhythm — without the staff having to carry it all in their heads.",
    variant: "panel",
    accentTint: "#f43f5e",
    photo:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Tasting-menu choreography",
        body: "Multi-course menus need live coordination between stations. Dasvio syncs the timing between the line and the pass automatically.",
      },
      {
        title: "The wine list as a living catalogue",
        body: "Pair wines with dishes, track cellar stock and push 86'd bottles to every server's tablet in real time.",
      },
      {
        title: "Reservation-aware seating",
        body: "Match incoming reservations to table flow. Surface dietary restrictions and VIP notes the moment a guest is seated.",
      },
      {
        title: "Multilingual upsell at the table",
        body: "For tourist-heavy lunches and dinners — menus in 14 AI-translated languages, with chef's-note context on tasting menus.",
      },
    ],
    recommended: ["qr-menu", "pos", "revenue-centers", "analytics"],
    stats: [
      { value: "₺850+", label: "Avg. ticket size" },
      { value: "2.4×", label: "Daily table turns" },
      { value: "14", label: "Guest languages" },
      { value: "12 min", label: "Avg. seat-to-order" },
    ],
  },
  cafes: {
    slug: "cafes",
    eyebrow: "Cafés & bakeries",
    title: "Speed and consistency, every shift.",
    tagline: "For specialty coffee, artisan bakeries, brunch spots and takeaway counters.",
    description:
      "Cafés run on seconds. Dasvio shortens your queue-to-counter time, keeps an hourly-rotating pastry case accurate and connects loyal customers across counter, table and mobile ordering — without the barista having to learn three systems.",
    variant: "split-photo",
    accentTint: "#f59e0b",
    photo:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Morning-rush throughput",
        body: "Sub-15-second checkout for the 7–9am wave. Preset modifier groups, one-tap combos and contactless payment included.",
      },
      {
        title: "A pastry case that changes hourly",
        body: "An item 86'd at 11am has to disappear from the QR menu instantly. Dasvio syncs availability across every channel in real time.",
      },
      {
        title: "Regulars on every channel",
        body: "Your morning customers arrive via the counter, mobile ordering or a marketplace. Same loyalty account, same order history, same recognition.",
      },
      {
        title: "Pairing & combo prompts",
        body: "Push the bagel-and-coffee combo at peak, switch to the brunch board at 11. Time-driven menu transitions, automatic.",
      },
    ],
    recommended: ["pos", "qr-menu", "multi-branch", "heatmaps"],
    stats: [
      { value: "60+", label: "Peak orders/hour" },
      { value: "₺85", label: "Avg. ticket" },
      { value: "4s", label: "Avg. checkout" },
      { value: "82%", label: "Repeat-customer rate" },
    ],
  },
  "fast-food": {
    slug: "fast-food",
    eyebrow: "Fast food & QSR",
    title: "An operation engineered for throughput.",
    tagline: "For burger, pizza, chicken and kebab concepts, drive-thru and delivery-first QSR.",
    description:
      "QSR is a system, not a kitchen. Dasvio runs your combo logic, kitchen display, aggregator inbox and drive-thru flow as one connected machine — built around the peak hour, where every second costs revenue.",
    variant: "centered-stat",
    accentTint: "#ef4444",
    photo:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Sub-minute order-to-ready",
        body: "Tap to pan in 45 seconds. The kitchen display routes orders to the right station the moment they're confirmed.",
      },
      {
        title: "Combo logic that doesn't break",
        body: "Build XL meals with substitution options, upsell prompts and default sides. The combo maths stays correct across discounts and platform margins.",
      },
      {
        title: "Aggregator chaos at lunch",
        body: "Getir, Trendyol, Yemeksepeti and Migros all landing in the same hour. One inbox, one kitchen display, no double entry.",
      },
      {
        title: "Drive-thru without dedicated hardware",
        body: "Speaker-board orders enter the same POS flow. The customer-facing display shows the order summary in seconds.",
      },
    ],
    recommended: ["pos", "integrations", "multi-branch", "heatmaps"],
    stats: [
      { value: "45s", label: "Order-to-ready time" },
      { value: "120+", label: "Peak orders/hour" },
      { value: "8+", label: "Aggregator platforms" },
      { value: "98%", label: "On-time ready rate" },
    ],
  },
  bars: {
    slug: "bars",
    eyebrow: "Bars & pubs",
    title: "Open tabs, split bills, nights that flow.",
    tagline: "For cocktail bars, pubs, beer gardens, hotel lounges and late-night venues.",
    description:
      "Bars run on tabs, tips and timing. Dasvio manages open tabs across multiple bartenders, splits bills in seconds, applies happy-hour pricing automatically and gives your supervisor a live floor view — so the closing report writes itself.",
    variant: "panel",
    accentTint: "#06b6d4",
    photo:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Open tabs across a full team",
        body: "Any bartender can add to any tab. Servers move tabs from bar to table with one tap. The total is always right.",
      },
      {
        title: "Happy hour without a manager override",
        body: "Schedule price drops by hour and day. 17:00–19:00 discounts apply automatically — no manual entry, no mistakes.",
      },
      {
        title: "Split evenly or by item",
        body: "Six guests, one bill — split evenly, or let each person pay for what they ordered. Card splits, cash splits and tipping on a split are all covered.",
      },
      {
        title: "Tip pooling & age verification",
        body: "Automatic tip-pool calculation per shift. Age-verification prompts on alcoholic items. An audit trail for late-night overrides.",
      },
    ],
    recommended: ["pos", "revenue-centers", "regional-pricing", "staff-permissions"],
    stats: [
      { value: "₺585", label: "Avg. tab size" },
      { value: "3.5 hrs", label: "Avg. session length" },
      { value: "12+", label: "Peak drinks/hour" },
      { value: "15%", label: "Avg. tip rate" },
    ],
  },
  hotels: {
    slug: "hotels",
    eyebrow: "Hotels & resorts",
    title: "Restaurant, bar, room service — one system.",
    tagline: "For city hotels, coastal resorts, boutique properties and all-inclusive operations.",
    description:
      "Hotel F&B is several businesses sharing one back office. Dasvio runs your main restaurant, pool bar, breakfast buffet and 24-hour room service as separate revenue centres — with one menu backbone, one staff roster and one report that tells the GM exactly what happened on the property.",
    variant: "split-photo",
    accentTint: "#10b981",
    photo:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Room charges with PMS integration",
        body: "Charges from any outlet post straight to the guest folio. Close it at checkout — no paper shuffling between F&B and the front desk.",
      },
      {
        title: "Multiple outlets, one team",
        body: "Restaurant, bar, lobby café, pool service — each a revenue centre with its own menu, tax treatment and printer setup.",
      },
      {
        title: "24/7 with shift handover",
        body: "The restaurant's closing shift becomes room service's opening shift. Same system, clean auditable handover.",
      },
      {
        title: "Guests in 14 languages",
        body: "Tourism-heavy dining. Multilingual QR menus, multilingual customer display, multilingual receipts — automatically.",
      },
    ],
    recommended: ["multi-branch", "revenue-centers", "qr-menu", "integrations"],
    stats: [
      { value: "5+", label: "F&B outlets per property" },
      { value: "₺1,250", label: "Avg. room charge" },
      { value: "24/7", label: "Operating hours" },
      { value: "14", label: "Guest languages" },
    ],
  },
  "cloud-kitchens": {
    slug: "cloud-kitchens",
    eyebrow: "Cloud kitchens",
    title: "One kitchen, many brands, every platform.",
    tagline: "For dark kitchens, virtual brands and delivery-only operators.",
    description:
      "Cloud kitchens are aggregator-first businesses. Dasvio lets you run six virtual brands from one kitchen, maps each brand to its platforms and routes every order to the right station with the right packaging label — so the kitchen never has to remember which brand is which.",
    variant: "centered-stat",
    accentTint: "#3b82f6",
    photo:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Many brands, one prep line",
        body: "Six virtual brands sharing the same chef and stations. Dasvio routes orders by brand and station, and prints brand-correct tickets.",
      },
      {
        title: "Every order is platform-sourced",
        body: "100% of volume arrives via Getir, Trendyol, Yemeksepeti and Migros. One inbox, one menu sync, one bulk pricing tool.",
      },
      {
        title: "No customer-facing space",
        body: "No counter, no dining room. Operating hours, busy-mode toggles and courier status — all from the operator's phone.",
      },
      {
        title: "Brand identity on the packaging",
        body: "A receipt template per brand, a packaging label per brand, a customer tracking link per brand. All shipped from the same address.",
      },
    ],
    recommended: ["integrations", "multi-branch", "revenue-centers", "branch-overrides"],
    stats: [
      { value: "6+", label: "Brands per kitchen" },
      { value: "180+", label: "Daily orders" },
      { value: "98%", label: "On-time ready rate" },
      { value: "0", label: "Walk-in customers" },
    ],
  },
  "single-location": {
    slug: "single-location",
    eyebrow: "Single location",
    title: "Enterprise tooling on an independent budget.",
    tagline: "For neighbourhood bistros, family businesses, single-site cafés and solo chefs.",
    description:
      "Most restaurant software hands independents a stripped-down version of the chain product. Dasvio was built so the same platform that runs 200-branch groups also runs your one-room bistro — with a setup wizard, no IT team required and pricing that fits a single P&L.",
    variant: "split-photo",
    accentTint: "#ec4899",
    photo:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Set up alone, in one afternoon",
        body: "Wizard-guided onboarding. Import your menu, connect your POS hardware, go live in under four hours.",
      },
      {
        title: "No IT, no problem",
        body: "Cloud-only, zero installation. Updates arrive automatically. If something breaks, Turkish-language support answers within minutes.",
      },
      {
        title: "Premium features at a fair price",
        body: "AI menu translation, real-time analytics, multi-channel integrations — the feature set chains pay for, priced per location.",
      },
      {
        title: "Grow when you're ready",
        body: "Open a second location and every setting clones across. The multi-branch tooling is already there, waiting.",
      },
    ],
    recommended: ["qr-menu", "pos", "analytics", "integrations"],
    stats: [
      { value: "4 hrs", label: "Avg. setup time" },
      { value: "₺0", label: "IT setup cost" },
      { value: "1 → ∞", label: "Location scale" },
      { value: "30%", label: "Avg. revenue lift" },
    ],
  },
  chains: {
    slug: "chains",
    eyebrow: "Chains & franchises",
    title: "Scale every brand, every franchisee, every region.",
    tagline: "For multi-brand groups, regional franchise owners and international chains.",
    description:
      "Chain operations are an alignment problem disguised as a software problem. Dasvio gives head office central control over menu, pricing and brand consistency — while letting each franchisee run their own P&L, comply with local tax rules and override exactly what the local market genuinely needs.",
    variant: "panel",
    accentTint: "#ffffff",
    photo:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Master menu, branch reality",
        body: "Head office publishes the master. Each branch overrides exactly what the local market needs — without breaking brand consistency.",
      },
      {
        title: "Regional pricing without spreadsheets",
        body: "A premium airport tier, a standard city tier, a discounted suburban tier. Group your branches, set the tier rules, let prices fall into place.",
      },
      {
        title: "Franchise reporting at the right grain",
        body: "The owner sees the portfolio, the franchisee sees their own P&L, operations sees the network. Same data, scoped views.",
      },
      {
        title: "14-day launches across regions",
        body: "Open in a new city in two weeks. Cloned setup, local tax rules, local language, local platforms — all preconfigured.",
      },
    ],
    recommended: ["multi-branch", "branch-overrides", "regional-pricing", "analytics"],
    stats: [
      { value: "1000+", label: "Supported branches" },
      { value: "99.9%", label: "Platform uptime" },
      { value: "14 days", label: "Avg. regional launch" },
      { value: "5+", label: "Pricing tiers" },
    ],
  },
};
