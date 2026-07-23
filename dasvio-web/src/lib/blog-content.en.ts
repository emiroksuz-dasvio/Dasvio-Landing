import type { ArticleBody } from "./blog-content";

/**
 * English article bodies. Keys must mirror `BLOG_CONTENT` in `blog-content.ts`
 * — a slug present there but missing here renders a 404 on /en/blog/<slug>,
 * which `getArticle` guards against by falling back to the Turkish body.
 */
export const BLOG_CONTENT_EN: Record<string, ArticleBody> = {
  "ai-translation-qr-menu-turkey-2026": {
    lead: "Two years ago, a multilingual menu was something boutique hotels had. In 2026 it's table stakes for a neighbourhood lokanta in Istanbul's Beyoğlu. Here's why that shifted, and the numbers behind our 14-language rollout.",
    blocks: [
      {
        kind: "p",
        text: "Translating a menu is not swapping words. Render \"kuru fasulye\" as \"dried beans\" and you are technically correct while the guest still has no idea what they would be ordering. Menu translation is a context problem: portion size, cooking method, allergens and cultural reference all have to survive the trip.",
      },
      {
        kind: "p",
        text: "Our first attempt at the AI translation layer was plain machine translation. It did not survive contact with the field. On the second attempt we fed the model the product category, ingredient list and price band alongside the string — and accuracy jumped sharply.",
      },
      {
        kind: "stats",
        items: [
          { value: "14", label: "supported languages" },
          { value: "92%", label: "translations approved first time" },
          { value: "4s", label: "average per menu item" },
          { value: "31%", label: "basket lift in tourist areas" },
        ],
      },
      { kind: "h2", text: "Tourist mix redrew the map" },
      {
        kind: "p",
        text: "The visitor profile arriving in Türkiye has diversified over the past three years. Russian and German still dominate the Antalya coast; but demand for Japanese and Korean in Cappadocia, and for Arabic and Farsi in Istanbul, has climbed fast. A single English menu no longer covers the average.",
      },
      {
        kind: "ul",
        items: [
          "In coastal resorts, 58% of menu views open in a language other than Turkish.",
          "In Istanbul's historic peninsula that figure reaches 64%.",
          "In Anatolian city centres it is 9% — so the feature does not deliver the same value everywhere.",
        ],
      },
      { kind: "h2", text: "Why we kept a human in the loop" },
      {
        kind: "p",
        text: "Every translation sits in an \"awaiting approval\" state in the dashboard before it goes live. That costs speed; it is non-negotiable on accuracy. A mistranslated allergen label isn't a poor user experience — it's a health risk.",
      },
      {
        kind: "quote",
        text: "When we opened the menu up to 11 languages, the first thing we noticed wasn't order volume — it was how many fewer questions guests asked the server. Service got faster on its own.",
        cite: "Operations manager at a four-site resort restaurant group",
      },
      { kind: "h2", text: "Where to start" },
      {
        kind: "ol",
        items: [
          "Look at your last three months of QR menu language stats — measure, don't guess.",
          "Translate your top 20 most-viewed items first; the long tail can wait.",
          "Put allergen and ingredient fields through a separate approval round.",
          "After going live, watch basket average by language for two weeks.",
        ],
      },
      {
        kind: "callout",
        text: "QR menu language statistics ship in the Dasvio dashboard under Analytics → QR Menu → Language distribution. We'd suggest reading that screen once before turning the feature on.",
      },
    ],
  },

  "anatolia-kebap-50-branches-90-days": {
    lead: "A regional chain decided to open franchises across 7 cities in a single quarter. The operations team needed a menu system that wouldn't collapse across 50 branches at once. Here is how they did it, step by step.",
    blocks: [
      {
        kind: "p",
        text: "Anatolia Kebap started the project with 6 branches. The menu lived in a spreadsheet, and every price update meant a table sent to branch managers over WhatsApp. That is a manageable chaos at 6 branches. At 50 it is impossible.",
      },
      { kind: "h2", text: "Days 0–15: extracting the master menu" },
      {
        kind: "p",
        text: "The first two weeks went entirely on inventory. It turned out 112 of the 340 products were the same item spelled differently — \"Adana Kebap\", \"Adana kebabı\", \"ADANA\". That de-duplication had to happen before the master menu, and software cannot make that call for you.",
      },
      {
        kind: "stats",
        items: [
          { value: "340 → 186", label: "products after de-duplication" },
          { value: "3", label: "regional price tiers" },
          { value: "50", label: "branches live in 90 days" },
          { value: "0%", label: "opening-day menu sync errors" },
        ],
      },
      { kind: "h2", text: "Days 15–45: price tiers and override limits" },
      {
        kind: "p",
        text: "Head office initially wanted a single price. The field rejected it — rent and labour in Istanbul's Kadıköy and in Şanlıurfa are not the same structure. The compromise was three regional tiers plus a capped per-branch override: a branch manager can move a price by at most 8%, beyond which it goes to head office for approval.",
      },
      {
        kind: "ul",
        items: [
          "Tier A: central metropolitan locations (12 branches)",
          "Tier B: metropolitan outskirts and large cities (23 branches)",
          "Tier C: Anatolian cities (15 branches)",
          "Override ceiling: ±8%, above which head office approves",
        ],
      },
      { kind: "h2", text: "Days 45–90: launch waves" },
      {
        kind: "p",
        text: "The 50 branches did not open on the same day. They went in waves of 4–6 per week. Despite franchisee impatience, this was the single most defensible decision: whatever broke in one wave was fixed before the next one started.",
      },
      {
        kind: "quote",
        text: "The thing that helped most wasn't the technology. It was the 90-minute retrospective after each wave. The software just gave us something factual to argue about in that meeting.",
        cite: "Operations director, Anatolia Kebap",
      },
      { kind: "h2", text: "What they'd do differently" },
      {
        kind: "ol",
        items: [
          "De-duplication should have taken four weeks, not two — about 20 later collisions were catchable in the first pass.",
          "Override permissions should have opened on day 30, not day one.",
          "Staff training should have happened during a real service shift, not on a POS screen in a quiet room.",
        ],
      },
    ],
  },

  "platform-integrations-engineering": {
    lead: "Getir, Trendyol and Yemeksepeti each behave differently with catalogues. We rewrote our sync engine from scratch; here is what we learned about distributed matching.",
    blocks: [
      {
        kind: "p",
        text: "Everything works in the integration demo. The trouble starts in month three: a product is deleted on the platform but lingers on your side; an old price fails to return when a promotion ends; a branch goes on holiday and still takes orders on three of four platforms.",
      },
      { kind: "h2", text: "Root cause: matching by name instead of identity" },
      {
        kind: "p",
        text: "Our first architecture matched products by name similarity. That worked at 85% accuracy — and a 15% error rate across thousands of daily orders is unacceptable. At the centre of the rewrite was keeping a persistent external-ID map per platform.",
      },
      {
        kind: "callout",
        text: "Name-similarity matching looks correct while the catalogue is small. Past about 200 products it starts breaking silently, and nothing tells you it has.",
      },
      { kind: "h2", text: "Three platforms, three models of reality" },
      {
        kind: "ul",
        items: [
          "One platform accepts partial updates; another wants the full catalogue every time.",
          "Marking something out of stock works at product level in one place and at variant level in another.",
          "A promotional price is a separate field on one platform and overwrites the base price on another.",
          "Error codes are not standardised; the same condition can return three different messages.",
        ],
      },
      { kind: "h2", text: "Queues, retries and idempotency" },
      {
        kind: "p",
        text: "We stopped doing sync as a direct HTTP call. Every change now enters a queue as an event, the handler is idempotent, and failed work retries with exponential backoff. Processing the same event twice does not corrupt anything — non-negotiable in a distributed system.",
      },
      {
        kind: "stats",
        items: [
          { value: "99.4%", label: "syncs succeeding first try" },
          { value: "< 40s", label: "median propagation time" },
          { value: "3", label: "automatic retry attempts" },
          { value: "0", label: "manual catalogue fixes / week" },
        ],
      },
      { kind: "h2", text: "None of it works without observability" },
      {
        kind: "p",
        text: "The biggest win wasn't the engine itself; it was being able to answer \"what state is this product in, on which platform, right now\" from a single screen. Support resolution time halved once that screen shipped.",
      },
      {
        kind: "quote",
        text: "In a distributed system the real feature isn't synchronisation — it's being able to tell when synchronisation has broken.",
      },
    ],
  },

  "revenue-center-engine": {
    lead: "Separating dine-in, takeaway, delivery and bar revenue meant not making the cashier's job harder and not making the manager's report messier. Seven decisions that held that balance.",
    blocks: [
      {
        kind: "p",
        text: "A revenue centre is a simple idea for accounting: separate where the money came from. In the field, every separation risks becoming one more tap on the cashier's screen. All seven decisions come out of that tension.",
      },
      { kind: "h2", text: "1. Derive the revenue centre from how the order opened" },
      {
        kind: "p",
        text: "The cashier never answers \"is this a delivery order?\". The revenue centre is assigned from the channel the order opened on: from a table, it's dine-in; from a QR code, it's QR; from an aggregator, it's that platform.",
      },
      { kind: "h2", text: "2. Treat the bar as a prep point, not a channel" },
      {
        kind: "p",
        text: "A bar item is sold at the table and also goes out for delivery. So we didn't make the bar a separate channel; we modelled it as a prep-point tag at product level. On the reporting side the two dimensions cross-tabulate.",
      },
      {
        kind: "ul",
        items: [
          "3. An order can belong to exactly one revenue centre — multiple assignment made the report unreadable.",
          "4. Revenue-centre changes aren't retroactive; corrections happen as void plus reopen.",
          "5. Each revenue centre can have its own printer and KDS target.",
          "6. Staff permissions can be restricted per revenue centre.",
          "7. Reports open broken down by revenue centre by default — opt-out, not opt-in.",
        ],
      },
      { kind: "h2", text: "What the seventh decision cost" },
      {
        kind: "p",
        text: "Defaulting reports to a breakdown meant a busier first screen, and it met resistance in internal testing. After it shipped, the time managers spent inside reports fell — because getting to the breakdown they wanted required no clicks.",
      },
      {
        kind: "callout",
        text: "Defaults are more powerful than features. Put a breakdown behind a settings menu and most users will never see it.",
      },
    ],
  },

  "12-second-checkout": {
    lead: "We timed 4,200 transactions across 8 Istanbul cafés with a stopwatch. Where each second goes, where guests leave the queue, and which seconds are genuinely winnable.",
    blocks: [
      {
        kind: "p",
        text: "Checkout time in a café between 08:00 and 10:00 is a different problem from the rest of the day. Once the queue crosses a psychological threshold, people simply don't join it — and the customer you lost never shows up in any report.",
      },
      {
        kind: "stats",
        items: [
          { value: "4,200", label: "transactions timed" },
          { value: "12.4s", label: "median checkout time" },
          { value: "5 people", label: "average walk-away threshold" },
          { value: "3.1s", label: "average winnable time" },
        ],
      },
      { kind: "h2", text: "Where the 12 seconds go" },
      {
        kind: "ol",
        items: [
          "Item selection and entry: 4.8s",
          "Modifications / adding a note: 1.9s",
          "Choosing a payment method: 1.2s",
          "Card tap and authorisation wait: 3.4s",
          "Receipt and handover: 1.1s",
        ],
      },
      { kind: "h2", text: "Which seconds are winnable and which aren't" },
      {
        kind: "p",
        text: "Most of the 3.4 seconds spent waiting on card authorisation sits with the bank and cannot be shortened in software. The 4.8 seconds in item selection, by contrast, is entirely an interface question: 71% of what sells in the morning comes from just 9 products.",
      },
      {
        kind: "quote",
        text: "Moving the morning menu onto its own screen layout won us about three seconds per cashier. No hardware changed.",
        cite: "Operator of a three-site coffee chain in Kadıköy",
      },
      { kind: "h2", text: "Practical takeaways" },
      {
        kind: "ul",
        items: [
          "Set up a time-based screen layout — don't use the same ordering in the morning and the afternoon.",
          "Keep the top 9 sellers on one screen, reachable without scrolling.",
          "Put frequently used notes on preset buttons; free-text entry is the most expensive interaction there is.",
          "Define a threshold rule that opens a second terminal once the queue passes 5 people.",
        ],
      },
    ],
  },

  "hourly-heatmaps-primer": {
    lead: "If you've never plotted your busiest hour against your quietest day, you are very likely leaving money on the table. A step-by-step guide to reading hourly heatmaps, with real operator examples.",
    blocks: [
      {
        kind: "p",
        text: "The monthly revenue report tells you what happened. An hourly heatmap tells you when — and operational decisions almost always come out of the second one.",
      },
      { kind: "h2", text: "How to read a heatmap" },
      {
        kind: "p",
        text: "Days of the week run down the vertical axis, hours across the horizontal, and your metric determines the cell colour. The critical point: pick revenue as the metric and you see one picture; pick transaction count and you see a very different one. Don't decide before plotting both.",
      },
      {
        kind: "ul",
        items: [
          "Revenue heatmap: for pricing and menu decisions.",
          "Transaction-count heatmap: for staff planning.",
          "Basket-average heatmap: for spotting upsell opportunities.",
          "Void/refund heatmap: for catching operational problems — the most commonly ignored one.",
        ],
      },
      { kind: "h2", text: "Three patterns operators see most" },
      {
        kind: "ol",
        items: [
          "Twin peaks: lunch and dinner form two separate spikes with a dead band between. Calls for a split shift.",
          "Sliding weekend: Saturday's peak starts 90 minutes later than Friday's. Applying the same shift times to both days is a mistake here.",
          "Silent erosion: transaction count in a time band holds steady while basket average declines for weeks. Usually caused by an item going out of stock.",
        ],
      },
      {
        kind: "callout",
        text: "Silent erosion is nearly impossible to catch in a revenue report — the total can stay flat. You won't see it without tracking basket average by hour.",
      },
      { kind: "h2", text: "What to do in your first week" },
      {
        kind: "p",
        text: "Open the transaction-count heatmap for the last 8 weeks and mark your three busiest and three quietest cells. Then look at your staffing at those hours. In most businesses the two tables disagree substantially, and fixing that is free.",
      },
    ],
  },

  "master-menu-branch-reality": {
    lead: "Head office wants 95% brand consistency while every franchisee swears their market is different. That tension isn't only a software problem — but software can make it tractable or hopeless.",
    blocks: [
      {
        kind: "p",
        text: "The sentence we hear most in large chain rollouts: \"make the system flexible, but don't let anyone break it.\" Those two requests contradict each other directly, and software's job is not to resolve the contradiction but to draw its boundaries explicitly.",
      },
      { kind: "h2", text: "Why banning overrides doesn't work" },
      {
        kind: "p",
        text: "Systems that permit no branch-level change produce the same outcome in the field every time: managers go around the system. Price differences get applied by hand at the till, promotions run over WhatsApp, and your reports stop reflecting reality.",
      },
      {
        kind: "quote",
        text: "Every flexibility you ban comes back outside the system and invisibly. The choice isn't whether flexibility exists — it's whether it's measurable.",
      },
      { kind: "h2", text: "What works: bounded, logged overrides" },
      {
        kind: "ul",
        items: [
          "Item availability: branch's call (local supply reality).",
          "Price: free within the band defined by its tier, approval required outside it.",
          "Product name and imagery: locked by head office — this is the core of brand consistency.",
          "Local promotions: a branch can start one, head office can see and stop it.",
          "Every override is logged with who, when and on what grounds.",
        ],
      },
      { kind: "h2", text: "The scale lesson from 1,000 locations" },
      {
        kind: "p",
        text: "Once branch count reaches three digits, head office cannot review each override individually. At that point the approval flow has to become exception reporting: instead of approving everything, a screen that lists only what fell outside the band.",
      },
      {
        kind: "stats",
        items: [
          { value: "4.2%", label: "overrides falling outside the band" },
          { value: "95%+", label: "product-name consistency preserved" },
          { value: "18 min", label: "head office's daily exception review" },
        ],
      },
      { kind: "h2", text: "The human side" },
      {
        kind: "p",
        text: "Even the best override policy meets resistance when nobody explains to the franchisee why it exists. Adding a half-day \"what we lock and why\" session to the rollout noticeably reduces the support load over the following six months.",
      },
    ],
  },

  "cloud-kitchens-software-problem": {
    lead: "Six brands, one prep line, eight aggregators. Cloud kitchen economics only work when the system can keep up with the chaos — and that is exactly where most platforms stop.",
    blocks: [
      {
        kind: "p",
        text: "Cloud kitchens are usually pitched as a real-estate story: cheap square metres, no dining room, no service staff. The reality on the ground is different — what eats the cost advantage isn't rent, it's coordination overhead.",
      },
      { kind: "h2", text: "Why complexity doesn't grow linearly" },
      {
        kind: "p",
        text: "Running one brand on one platform gives you one connection point. Six brands across eight platforms gives you 48. Each arrives with its own menu format, its own promotion logic and its own cancellation rules.",
      },
      {
        kind: "stats",
        items: [
          { value: "48", label: "brand × platform connections" },
          { value: "6", label: "brands from one kitchen" },
          { value: "~22%", label: "efficiency lost to coordination" },
        ],
      },
      { kind: "h2", text: "The prep-line reality" },
      {
        kind: "p",
        text: "Six brands' orders land on one prep line, and kitchen staff care about which station does what, not which brand it belongs to. A brand-based KDS screen is therefore the wrong abstraction in the field — it needs to be station-based.",
      },
      {
        kind: "ul",
        items: [
          "Orders should be split by station, not by brand.",
          "The packing point should be the only place brand identity is visible.",
          "Prep-time estimates should be computed from line load, not per brand.",
          "Stock should be held at ingredient level, not brand level — six brands use the same chicken.",
        ],
      },
      { kind: "h2", text: "The invisible part of aggregator commission" },
      {
        kind: "p",
        text: "The commission rate is in the contract; the cost of cancellations and claims is not. Across the operations we studied, the monetary value of staff hours spent on claim handling added an average of 1.8 points on top of commission. That rarely appears in the margin calculation at all.",
      },
      {
        kind: "callout",
        text: "When you model cloud kitchen feasibility, put claim-handling time next to the commission rate. Treating them separately makes the margin systematically optimistic.",
      },
      {
        kind: "quote",
        text: "Our job had stopped being cooking and become working out what eight different systems wanted at the same moment. That was exactly the problem the software needed to solve.",
        cite: "Founder of a six-brand cloud kitchen in Ümraniye, Istanbul",
      },
    ],
  },

  "pos-built-for-cashiers": {
    lead: "Most POS systems optimise back-office reporting. Ours optimises for the tired person at the terminal at 9pm on a Friday. Here's how that single decision shaped the whole product.",
    blocks: [
      {
        kind: "p",
        text: "The POS purchase decision is usually made by the owner, but a cashier uses that screen eight hours a day. The gap between purchase criteria and usage criteria explains most of the bad POS experience in this industry.",
      },
      { kind: "h2", text: "Design rules change during the rush" },
      {
        kind: "ul",
        items: [
          "Targets have to be large — a tired, hurried finger does not tap precisely.",
          "Confirmation dialogs belong only on irreversible actions; unnecessary confirmation breeds blindness.",
          "Colour alone must not carry information; low contrast is unreadable under kitchen lighting.",
          "Undoing a mistap has to take one step.",
          "No critical flow should require scrolling.",
        ],
      },
      { kind: "h2", text: "Features we removed" },
      {
        kind: "p",
        text: "Some of the decisions that improved the product were subtractions, not additions. We took the detailed product description, the stock-level indicator and the customer-history panel off the cashier screen. All three were useful information — and all three were noise during the rush. They all still live on the manager screen.",
      },
      {
        kind: "quote",
        text: "The less there is on screen, the faster we work. We complained about missing information in week one; by week two we didn't want it back.",
        cite: "Shift lead at a brasserie in Beşiktaş",
      },
      { kind: "h2", text: "What we measured" },
      {
        kind: "stats",
        items: [
          { value: "-2.7s", label: "average time per transaction" },
          { value: "-41%", label: "voids caused by mis-entry" },
          { value: "1 day", label: "average ramp for new staff" },
        ],
      },
      {
        kind: "callout",
        text: "When evaluating a POS, watch the demo during a real dinner service rather than in a quiet room. The gap between those two experiences is the source of most purchasing mistakes.",
      },
    ],
  },

  "q3-2026-product-update": {
    lead: "Heatmap overlays, multilingual customer displays, Trendyol claim inbox v2 and the long-awaited drag-and-drop report builder. Here are the 14 features shipping this quarter, and the single idea connecting them.",
    blocks: [
      {
        kind: "p",
        text: "The one big idea this quarter: showing the data isn't enough, the data has to be comparable. Most of the 14 features are different faces of that sentence.",
      },
      { kind: "h2", text: "Analytics" },
      {
        kind: "ul",
        items: [
          "Heatmap overlays: compare two periods on the same chart.",
          "Drag-and-drop report builder: custom reports without code or a support ticket.",
          "Revenue-centre breakdown becoming the default across all reports.",
          "Scheduled report emails — daily, weekly or end-of-shift.",
        ],
      },
      { kind: "h2", text: "QR menu and guest experience" },
      {
        kind: "ul",
        items: [
          "Multilingual customer display.",
          "View-to-order conversion rate per menu item.",
          "Allergen filtering.",
          "Table-side call notifications routed to the KDS.",
        ],
      },
      { kind: "h2", text: "Integrations" },
      {
        kind: "ul",
        items: [
          "Trendyol claim inbox v2 — bulk actions and auto-drafted appeals.",
          "Automatic per-platform menu compliance checking.",
          "Branch holiday mode: close across every platform in one click.",
        ],
      },
      { kind: "h2", text: "Operations" },
      {
        kind: "ul",
        items: [
          "Shift-based staff permission templates.",
          "Printer health monitoring with automatic rerouting.",
          "Price override exception report.",
        ],
      },
      {
        kind: "callout",
        text: "The drag-and-drop report builder is rolling out gradually. To request early access, use Settings → Labs in the dashboard.",
      },
      { kind: "h2", text: "What's next" },
      {
        kind: "p",
        text: "Our Q4 focus is forecasting: moving from reports that look backwards to tools that propose next week's staffing and stock requirements. We'll share the roadmap detail in the next update.",
      },
    ],
  },

  "receipt-printers-2026": {
    lead: "The most mundane peripheral in your restaurant is also its most fragmented standard. A field report compiled while working with 14 hardware vendors.",
    blocks: [
      {
        kind: "p",
        text: "The receipt printer is the device that looks easiest to install and takes up the most room in the support queue. The reason is simple: ESC/POS is not a standard, it is a family of standards, and every vendor speaks its own dialect.",
      },
      { kind: "h2", text: "Same command, different behaviour" },
      {
        kind: "ul",
        items: [
          "The cut command does a full cut on some models and a partial cut on others.",
          "Turkish character support depends on the code-page setting, and the defaults are inconsistent.",
          "The image format required for logo printing varies vendor to vendor.",
          "On some models the paper-out signal only fires once paper has fully run out — there is no low-paper warning.",
        ],
      },
      { kind: "h2", text: "Network printers and silent losses" },
      {
        kind: "p",
        text: "The hardest class of failure is a printer accepting the connection and then silently dropping the job. The application sees success; the kitchen sees no ticket. The fix is to queue print jobs and confirm them with a device status query — that is, to model the difference between \"sent\" and \"printed\".",
      },
      {
        kind: "callout",
        text: "A significant share of printer problems are actually network problems. Putting the kitchen printer on the same network as guest Wi-Fi is the most common setup mistake we see.",
      },
      { kind: "h2", text: "What to check before buying" },
      {
        kind: "ol",
        items: [
          "Test Turkish character support on the default code page; don't trust the documentation.",
          "Does it warn on low paper — a paper-out signal alone is not enough.",
          "Does it support status queries.",
          "Are spare parts and paper sourced locally.",
          "What does it cost to buy a second identical unit and keep it as a spare.",
        ],
      },
      {
        kind: "quote",
        text: "A printer that fails on a Friday night costs many times the price of the device. A spare unit is insurance.",
      },
    ],
  },

  "hotel-fb-revenue-math": {
    lead: "The restaurant, bar, room service and pool café are not four departments — they are four different businesses sharing one back office. Here's why the accounting has to reflect that.",
    blocks: [
      {
        kind: "p",
        text: "The mistake we see most often in hotel F&B reporting is collapsing four revenue points into a single \"food and beverage\" line. That line is technically correct and operationally useless.",
      },
      { kind: "h2", text: "Four businesses, four different economics" },
      {
        kind: "ul",
        items: [
          "Restaurant: high labour cost, high basket, predictable volume.",
          "Bar: high margin, low ingredient cost, evening-weighted.",
          "Room service: the highest unit labour cost, the lowest volume.",
          "Pool café: seasonal, hypersensitive to weather, low basket and high frequency.",
        ],
      },
      {
        kind: "p",
        text: "Sum those four into one line and the resulting margin belongs to none of them. Decide on that average and you will usually end up subsidising the most profitable outlet while growing the least profitable one.",
      },
      { kind: "h2", text: "The all-inclusive special case" },
      {
        kind: "p",
        text: "In all-inclusive properties the revenue is already buried in the room rate, so revenue-centre separation looks pointless. It is the opposite: there may be no revenue, but there is still cost, and without splitting consumption by outlet you cannot see which one is inflating cost per room.",
      },
      {
        kind: "stats",
        items: [
          { value: "4", label: "revenue centres to separate" },
          { value: "3.4x", label: "unit labour gap, room service vs. bar" },
          { value: "18%", label: "average margin variance found after splitting" },
        ],
      },
      { kind: "h2", text: "Implementation order" },
      {
        kind: "ol",
        items: [
          "Define every physical outlet as its own revenue centre.",
          "Attach staff to a revenue centre — even when it changes shift to shift.",
          "Set up a distinct movement type for transfers (drinks the bar sends to the restaurant).",
          "Record all-inclusive consumption as a cost movement, not revenue.",
          "Read the monthly report as four separate P&Ls; look at the total last.",
        ],
      },
      {
        kind: "callout",
        text: "If you don't model the transfer movement, the bar's cost inflates and the restaurant's margin looks better than it is. That is the most common distortion in hotel F&B reporting.",
      },
    ],
  },
};
