import type { Locale } from "@/i18n/config";
import { BLOG_POSTS_EN } from "./blog.en";

/** Stable keys, not display strings — labels live in CATEGORY_LABELS. */
export type BlogCategory =
  | "product"
  | "industry"
  | "customer-story"
  | "engineering"
  | "operations";

export type CategoryFilter = "all" | BlogCategory;

export type BlogAuthor = {
  name: string;
  role: string;
  initials: string;
  color: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  author: BlogAuthor;
  coverImage: string;
  tags: string[];
  featured?: boolean;
  accentTint: string;
};

export const CATEGORIES: CategoryFilter[] = [
  "all",
  "product",
  "industry",
  "customer-story",
  "engineering",
  "operations",
];

export const CATEGORY_LABELS: Record<Locale, Record<CategoryFilter, string>> = {
  tr: {
    all: "Tümü",
    product: "Ürün",
    industry: "Sektör",
    "customer-story": "Müşteri Hikayesi",
    engineering: "Mühendislik",
    operations: "Operasyon",
  },
  en: {
    all: "All",
    product: "Product",
    industry: "Industry",
    "customer-story": "Customer Story",
    engineering: "Engineering",
    operations: "Operations",
  },
};

const AUTHORS: Record<string, BlogAuthor> = {
  ayse: {
    name: "Ayşe Demir",
    role: "Ürün Direktörü",
    initials: "AD",
    color: "#f43f5e",
  },
  mehmet: {
    name: "Mehmet Kaya",
    role: "Kurucu Mühendis",
    initials: "MK",
    color: "#e11d48",
  },
  selin: {
    name: "Selin Aktaş",
    role: "Müşteri Başarı Lideri",
    initials: "SA",
    color: "#fb7185",
  },
  can: {
    name: "Can Yıldız",
    role: "Operasyon Lideri",
    initials: "CY",
    color: "#fda4af",
  },
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1600&auto=format&fit=crop&q=80`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-translation-qr-menu-turkey-2026",
    title: "AI çevirisi Türkiye genelindeki QR menüleri nasıl dönüştürüyor",
    excerpt:
      "İstanbul'un turist merkezlerinden Antalya'nın sahil resortlarına kadar çok dilli menüler artık bir lüks değil — temel gereksinim. Dasvio'nun 14 dil açılımının ardındaki rakamların içinde.",
    category: "industry",
    date: "2026-05-18",
    readTime: "8 dk okuma",
    author: AUTHORS.ayse,
    coverImage: u("1559329007-40df8a9345d8"),
    tags: ["AI", "QR Menü", "Çok Dilli"],
    featured: true,
    accentTint: "#f43f5e",
  },
  {
    slug: "anatolia-kebap-50-branches-90-days",
    title: "1'den 50 şubeye: Anatolia Kebap'ın menüsünü 90 günde ölçeklendirme",
    excerpt:
      "Bölgesel bir zincir tek bir çeyrekte 7 şehirde franchise açmaya karar verdiğinde, operasyon ekibinin çökmeyecek bir sisteme ihtiyacı vardı. İşte bunu nasıl başardılar.",
    category: "customer-story",
    date: "2026-05-10",
    readTime: "12 dk okuma",
    author: AUTHORS.selin,
    coverImage: u("1568901346375-23c9450c58cd"),
    tags: ["Çok Şubeli", "Franchise", "Vaka Çalışması"],
    accentTint: "#fb7185",
  },
  {
    slug: "platform-integrations-engineering",
    title: "Platform entegrasyonu neden yerlerinde parçalanır (ve biz bunu nasıl düzelttik)",
    excerpt:
      "Getir, Trendyol ve Yemeksepeti'nin kendine özgü katalog tuhaflıkları var. Senkronizasyon motorumuzu sıfırdan yeniden inşa ettik — dağıtık eşleştirme konusunda öğrendiklerimiz.",
    category: "engineering",
    date: "2026-05-02",
    readTime: "15 dk okuma",
    author: AUTHORS.mehmet,
    coverImage: u("1556742044-3c52d6e88c62"),
    tags: ["Mühendislik", "Entegrasyonlar", "Altyapı"],
    accentTint: "#e11d48",
  },
  {
    slug: "revenue-center-engine",
    title: "Dasvio'nun gelir merkezi motorunun içinde: 7 tasarım kararı",
    excerpt:
      "Kasiyerin işini zorlaştırmadan veya yöneticinin raporunu karmaşıklaştırmadan masaiçi, gel-al, teslimat ve bar gelirini bölen bir sistem nasıl inşa ettik.",
    category: "product",
    date: "2026-04-28",
    readTime: "10 dk okuma",
    author: AUTHORS.mehmet,
    coverImage: u("1555396273-367ea4eb4db5"),
    tags: ["Ürün", "Gelir Merkezleri", "Mimari"],
    accentTint: "#f43f5e",
  },
  {
    slug: "12-second-checkout",
    title: "12 saniyelik ödeme: bir kafe sabah yoğunluğunun anatomisi",
    excerpt:
      "8 İstanbul kafesinde 4.200 işlemi takip ettik. Her saniyenin nereye gittiği, misafirlerin nerede döndüğü ve Dasvio'nun önemli saniyeler nerede kazandırdığı.",
    category: "operations",
    date: "2026-04-22",
    readTime: "9 dk okuma",
    author: AUTHORS.can,
    coverImage: u("1554118811-1e0d58224f24"),
    tags: ["Kafeler", "Performans", "POS"],
    accentTint: "#fb7185",
  },
  {
    slug: "hourly-heatmaps-primer",
    title: "Restoran operasyonları için saatlik heatmap'ler: çalışan bir başlangıç kılavuzu",
    excerpt:
      "En yoğun saatinizi en sakin güne karşı hiç çizmediyseniz, masada para bırakıyorsunuz demektir. Gerçek operatörlerden örneklerle adım adım açıklama.",
    category: "operations",
    date: "2026-04-15",
    readTime: "7 dk okuma",
    author: AUTHORS.ayse,
    coverImage: u("1414235077428-338989a2e8c0"),
    tags: ["Analitik", "Heatmap", "Operasyon"],
    accentTint: "#f43f5e",
  },
  {
    slug: "master-menu-branch-reality",
    title: "Master menü, şube gerçeği: 1000 lokasyonlu açılışlardan dersler",
    excerpt:
      "Merkez %95 marka tutarlılığı isterken her franchise sahibi kendi pazarının özel olduğuna yemin ettiğinde ne olur. İpucu: yalnızca yazılım sorunu değil.",
    category: "industry",
    date: "2026-04-08",
    readTime: "11 dk okuma",
    author: AUTHORS.can,
    coverImage: u("1559339352-11d035aa65de"),
    tags: ["Zincirler", "Franchise", "Çok Şubeli"],
    accentTint: "#fda4af",
  },
  {
    slug: "cloud-kitchens-software-problem",
    title: "Cloud kitchen'lar gayrimenkul kılığına bürünmüş bir yazılım sorunudur",
    excerpt:
      "Altı marka, bir hazırlık hattı, sekiz aggregator. Ekonomi ancak sistem kaosa yetişebildiğinde işe yarar — çoğu platformun kaçırdıkları.",
    category: "industry",
    date: "2026-03-30",
    readTime: "13 dk okuma",
    author: AUTHORS.mehmet,
    coverImage: u("1556909114-f6e7ad7d3136"),
    tags: ["Cloud Kitchen", "Aggregator'lar", "Strateji"],
    accentTint: "#f43f5e",
  },
  {
    slug: "pos-built-for-cashiers",
    title: "POS'umuzu neden mühendisler için değil kasiyerler için inşa ettik",
    excerpt:
      "Çoğu POS sistemi arka ofis raporlamasını optimize eder. Bizimki Cuma akşamı 21:00'de terminaldeki yorgun kişiyi optimize eder. Bu kararın her şeyi nasıl şekillendirdiği.",
    category: "product",
    date: "2026-03-22",
    readTime: "6 dk okuma",
    author: AUTHORS.ayse,
    coverImage: u("1556742111-a301076d9d18"),
    tags: ["POS", "UX", "Tasarım"],
    accentTint: "#fb7185",
  },
  {
    slug: "q3-2026-product-update",
    title: "Q3 2026 ürün güncellemesi: 14 yeni özellik, bir büyük fikir",
    excerpt:
      "Heatmap üst üste bindirmeleri, çok dilli müşteri ekranları, Trendyol claim gelen kutusu v2 ve uzun beklenen sürükle-bırak rapor oluşturucu. Hepsi bu çeyrekte geliyor.",
    category: "product",
    date: "2026-03-15",
    readTime: "5 dk okuma",
    author: AUTHORS.ayse,
    coverImage: u("1556910103-1c02745aae4d"),
    tags: ["Güncellemeler", "Sürüm Notları", "Yol Haritası"],
    accentTint: "#f43f5e",
  },
  {
    slug: "receipt-printers-2026",
    title: "2026'da fiş yazıcıları: bir şekilde hâlâ vahşi batı",
    excerpt:
      "Restoranınızdaki en sıradan çevre birimi aynı zamanda en parçalı standarttır. 14 donanım üreticisinden, grafiklerle saha raporu.",
    category: "engineering",
    date: "2026-03-08",
    readTime: "8 dk okuma",
    author: AUTHORS.mehmet,
    coverImage: u("1551024506-0bccd828d307"),
    tags: ["Donanım", "Yazıcılar", "Altyapı"],
    accentTint: "#e11d48",
  },
  {
    slug: "hotel-fb-revenue-math",
    title: "Otel F&B gelir merkezlerinin kendine özgü matematiği",
    excerpt:
      "Restoran + bar + oda servisi + havuz kafe 4 işletme değil — tek arka ofisi paylaşan 4 farklı işletmedir. Muhasebenin bunu neden yansıtması gerektiği.",
    category: "industry",
    date: "2026-03-01",
    readTime: "10 dk okuma",
    author: AUTHORS.can,
    coverImage: u("1455587734955-081b22074882"),
    tags: ["Oteller", "Gelir Merkezleri", "Finans"],
    accentTint: "#e11d48",
  },
];

export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);

/**
 * Prefer this over importing BLOG_POSTS directly — the Turkish array is only
 * the `tr` half of the pair. Both arrays hold the same slugs in the same order.
 */
export function getPosts(locale: Locale): BlogPost[] {
  return locale === "en" ? BLOG_POSTS_EN : BLOG_POSTS;
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

/**
 * Same category first, then most recent, excluding the post itself. Falls back
 * to filling from the rest of the archive so the "read next" row is never short.
 */
export function getRelatedPosts(slug: string, locale: Locale, limit = 3): BlogPost[] {
  const posts = getPosts(locale);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return posts.slice(0, limit);
  const rest = posts.filter((p) => p.slug !== slug);
  const sameCategory = rest.filter((p) => p.category === post.category);
  const others = rest.filter((p) => p.category !== post.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getFeaturedPost(locale: Locale): BlogPost {
  const posts = getPosts(locale);
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getOtherPosts(locale: Locale): BlogPost[] {
  return getPosts(locale).filter((p) => !p.featured);
}

export function formatBlogDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : "tr-TR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
