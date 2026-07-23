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
import type { Locale } from "@/i18n/config";
import { PRODUCTS_EN } from "./products.en";

export type ProductSlug =
  | "qr-menu"
  | "pos"
  | "multi-branch"
  | "integrations"
  | "analytics"
  | "signage"
  | "staff-permissions"
  | "revenue-centers"
  | "branch-overrides"
  | "regional-pricing"
  | "heatmaps"
  | "reports"
  | "campaign-builder"
  | "combo-builder";

export type LayoutVariant = "split" | "stack" | "magazine";

export type VisualProps = { locale: Locale };

export type SubCard = {
  title: string;
  body: string;
  /** Mockups take the locale so the few UI labels inside them can follow it. */
  Visual: (props: VisualProps) => React.ReactElement;
};

export type ProductData = {
  slug: ProductSlug;
  category: string;
  title: string;
  description: string;
  tags: string[];
  variant: LayoutVariant;
  accentTint: string;
  MainVisual: (props: VisualProps) => React.ReactElement;
  subCards: SubCard[];
};

/** Turkish is the source of truth; `products.en.ts` mirrors it key for key. */
export const PRODUCTS: Record<ProductSlug, ProductData> = {
  "qr-menu": {
    slug: "qr-menu",
    category: "Müşteri deneyimi",
    title: "QR Menü",
    description:
      "14 dilde AI çevirisi olan çok dilli dijital menü. Tema, spotlight, kampanya ve masa bazlı sipariş akışı dahil. Misafirler tarar, göz atar ve sipariş verir — menünüz siz düzenledikçe senkronize kalır.",
    tags: ["AI çeviri", "Tema yönetimi", "Masa bazlı"],
    variant: "split",
    accentTint: "#ffffff",
    MainVisual: QrVisual,
    subCards: [
      {
        Visual: LangChips,
        title: "AI çeviri, 14 dil",
        body: "Menünüzün tamamını tek tıkla çevirin. İstediğiniz metni manuel düzenleyin — Dasvio AI geri kalanını senkronize tutmaya devam eder.",
      },
      {
        Visual: ThemeSwatches,
        title: "Tema & marka kontrolü",
        body: "Renk, tipografi, düzen ve spotlight'ları panelden ayarlayın. Değişiklikleri yayınlamadan önce gerçek cihazda önizleyin.",
      },
      {
        Visual: QrTablePreview,
        title: "Masa bazlı QR akışı",
        body: "Her masanın kendine özel QR'ı var. Misafirler göz atar, özelleştirir ve sipariş verir — siparişler gerçek zamanlı POS'a düşer.",
      },
      {
        Visual: SpotlightBanner,
        title: "Spotlight & kampanyalar",
        body: "Haftalık özel veya sezonluk komboyu menünün üst kısmında öne çıkarın. Zamanlayın, şubeye göre hedefleyin, A/B test edin.",
      },
    ],
  },
  pos: {
    slug: "pos",
    category: "Operasyon",
    title: "POS Yönetimi",
    description:
      "Tüm satış noktası operasyonunuzu tek panelden yönetin: tablet ve terminal cihazlar, fiş ve mutfak yazıcıları, gelir merkezleri, çalışma saatleri ve adisyon geçmişi. Tüm büyük donanım marklarıyla uyumlu.",
    tags: ["Çoklu cihaz", "Yazıcı yönetimi", "Gelir merkezleri"],
    variant: "stack",
    accentTint: "#06b6d4",
    MainVisual: PosVisual,
    subCards: [
      {
        Visual: DeviceSync,
        title: "Çoklu cihaz senkronizasyonu",
        body: "Tabletler, terminaller, mobil POS — hepsi gerçek zamanlı senkronize. Bir cihazda sipariş açın, diğerinden kapatın.",
      },
      {
        Visual: ReceiptSlip,
        title: "Mutfak & fiş yazdırma",
        body: "Ürünleri istasyona göre doğru mutfağa yönlendirin. Fiş şablonlarını şube, kanal ve gelir merkezi bazında özelleştirin.",
      },
      {
        Visual: RevenueDonut,
        title: "Gelir merkezleri",
        body: "Masaiçi, gel-al, teslimat ve bar gelirini ayırın. Her birinin kendine ait vergisi, yazıcısı, raporlaması ve kuralları olur.",
      },
      {
        Visual: ClockFace,
        title: "Çalışma saatleri & vardiyalar",
        body: "Şube ve kanal bazında saatleri tanımlayın. POS'u mesai dışında kilitleyin, personel vardiyalarını ve POS PIN'lerini yönetin.",
      },
    ],
  },
  "multi-branch": {
    slug: "multi-branch",
    category: "Çok şubeli",
    title: "Çok Şubeli Yönetim",
    description:
      "Fiyat, varyant ve uygunluk için şube bazlı override'lı merkezi master menü. Şubeleri bölgesel tier'lara gruplandırın, toplu düzenlemeler yapın ve kurulumları lokasyonlar arasında saniyeler içinde klonlayın. 1'den 1.000'e tasarlandı.",
    tags: ["Master menü", "Store gruplar", "Fiyat tier'ları"],
    variant: "split",
    accentTint: "#f43f5e",
    MainVisual: BranchVisual,
    subCards: [
      {
        Visual: NetworkNodes,
        title: "Merkezi master menü",
        body: "Tek kaynak. Master'ı düzenleyin — değişiklikler seçili şubelere belirlediğiniz sıklıkta yayılır.",
      },
      {
        Visual: OverrideMatrix,
        title: "Şube bazlı override",
        body: "Herhangi bir şubede fiyatı, varyantı, uygunluğu veya görseli master menüye dokunmadan override edin.",
      },
      {
        Visual: TierBadges,
        title: "Bölgesel fiyat tier'ları",
        body: "Şubeleri tier'lara gruplandırın. Havalimanında premium, banliyöde indirimli fiyat — otomatik olarak uygulanır.",
      },
      {
        Visual: ScheduleCalendar,
        title: "Menü zamanlama & klonlama",
        body: "Menüleri belirli saatlerde geçiş yapacak şekilde zamanlayın. Tüm bir yapıyı şubeler arasında saniyeler içinde klonlayın.",
      },
    ],
  },
  integrations: {
    slug: "integrations",
    category: "Entegrasyonlar",
    title: "Platform Entegrasyonları",
    description:
      "Getir, Trendyol, Yemeksepeti, Qapera ve daha fazlası — kataloğunuzu bir kez eşleştirin, tüm platformlar senkronize kalır. Toplu fiyatlama, yorum gelen kutusu, claim yönetimi ve canlı durum kontrolü tek panelden.",
    tags: ["Getir", "Trendyol", "Yemeksepeti"],
    variant: "magazine",
    accentTint: "#f59e0b",
    MainVisual: IntegrationsVisual,
    subCards: [
      {
        Visual: CatalogMap,
        title: "Katalog eşleştirme, bir kez",
        body: "Ürünleri, kategorileri ve modifier'ları platform karşılıklarıyla bir kez eşleştirin. Her şey ileri gidiş için senkronize kalır.",
      },
      {
        Visual: PricingSheet,
        title: "Toplu platform fiyatlandırması",
        body: "Getir, Trendyol ve Yemeksepeti'ndeki fiyatları tek tablo görünümünde güncelleyin. Platform bazlı marj desteği.",
      },
      {
        Visual: ReviewBubbles,
        title: "Yorum & claim gelen kutusu",
        body: "Platform yorumlarına tek gelen kutusundan yanıtlayın. Trendyol claim'lerini doğrudan Dasvio'dan onaylayın veya reddedin.",
      },
      {
        Visual: StatusToggles,
        title: "Canlı durum kontrolü",
        body: "Restoran yoğunluğunu, kurye durumunu veya her platformdaki açık/kapalı durumunu tek düğmeden değiştirin.",
      },
    ],
  },
  analytics: {
    slug: "analytics",
    category: "Zeka",
    title: "Gerçek Zamanlı Analitik",
    description:
      "Saat, şube, kanal ve ürün bazında satış dökümü. Heatmap'ler pik yükü, ödeme dağılımı misafir davranışını ortaya koyar. Herhangi bir boyuta göre filtreleyin, herhangi bir metriğe inin, her şeyi dışa aktarın.",
    tags: ["Heatmap", "Ürün analizi", "Canlı dashboard"],
    variant: "stack",
    accentTint: "#ef4444",
    MainVisual: AnalyticsVisual,
    subCards: [
      {
        Visual: HeatmapMini,
        title: "Saatlik satış heatmap'i",
        body: "Gün ve saatler genelindeki pik ve düşükleri görün. Promosyon veya ekstra personel zamanlamasını tespit edin.",
      },
      {
        Visual: ComparisonBars,
        title: "Şube & kanal karşılaştırması",
        body: "Şubeleri yan yana karşılaştırın. Geliri masaiçi, teslimat, online veya işlettiğiniz herhangi bir kanala göre dilimleyin.",
      },
      {
        Visual: PaymentDonut,
        title: "Ödeme & ürün mix'i",
        body: "Kart - nakit - online dağılımı. En çok satanlar, kategori performansı, modifier kullanımı — hepsi detaylandırılabilir.",
      },
      {
        Visual: CompChart,
        title: "İkram/iptal takibi",
        body: "Şube ve vardiya bazında ikram ve iptal oranlarını takip edin. Dikkat gerektiren alışılmadık örüntüleri işaretleyin.",
      },
    ],
  },
  signage: {
    slug: "signage",
    category: "Müşteri deneyimi",
    title: "Digital Signage",
    description:
      "Restoran ekranları, müşteri yüzü ekranlar ve menü panoları — hepsi aynı panelden yönetilir. Medya yükleyin, playlist oluşturun, şube veya etikete göre zamanlayın. Güncellemeler gerçek zamanlı iletilir.",
    tags: ["Playlist", "Cihaz yönetimi", "Müşteri ekranı"],
    variant: "magazine",
    accentTint: "#10b981",
    MainVisual: SignageVisual,
    subCards: [
      {
        Visual: PlaylistStack,
        title: "Playlist & düzenler",
        body: "Görsel, video ve canlı içerikten playlist oluşturun. Ekran başına düzen uygulayın — dikey, yatay veya ikili.",
      },
      {
        Visual: ScheduleClock,
        title: "Şube veya etikete göre zamanlama",
        body: "11'de öğle promosu, 18'de akşam. Belirli şubeleri, şube gruplarını veya içerik etiketlerini hedefleyin.",
      },
      {
        Visual: CustomerScreen,
        title: "Müşteri yüzü ekran",
        body: "Kasayı misafir ekranına yansıtın. Sipariş özeti, bahşiş bildirimi ve marka gösterin.",
      },
      {
        Visual: PushScreens,
        title: "Gerçek zamanlı güncelleme",
        body: "İçeriği saniyeler içinde tüm ekranlarda güncelleyin. Yanlış içerik gösteren ekranı uzaktan çevrimdışı alın.",
      },
    ],
  },
  "staff-permissions": {
    slug: "staff-permissions",
    category: "Operasyon",
    title: "Personel & Yetki",
    description:
      "Tüm ekibinizi tek panelden yönetin — özel roller, vardiyalar, POS PIN'leri, şube ve zaman penceresine göre kapsamlı erişim. Yeni personeli dakikalar içinde işe alın, yetkisiz işlemleri kilitleyin ve denetim için hazır kalın.",
    tags: ["Özel roller", "POS PIN'leri", "Denetim izi"],
    variant: "split",
    accentTint: "#3b82f6",
    MainVisual: PosVisual,
    subCards: [
      {
        Visual: DeviceSync,
        title: "Roller & kapsamlı erişim",
        body: "Her rolün neyi görüp yapabileceğini tam olarak tanımlayın — global, bölgesel, şube veya zaman penceresi kapsamlı.",
      },
      {
        Visual: OverrideMatrix,
        title: "POS PIN & hızlı giriş",
        body: "Personel başına kişisel POS PIN'i. Başarısız denemeler sonrası kilitleme. Panelden yönetici kilidi açma.",
      },
      {
        Visual: ScheduleCalendar,
        title: "Vardiya planlaması",
        body: "Şube bazında vardiyaları planlayın, değiştirin, saatleri takip edin. POS ile senkronize — personel yalnızca kendi vardiyasında giriş yapabilir.",
      },
      {
        Visual: ReviewBubbles,
        title: "Tam denetim izi",
        body: "Her ikram, iptal, indirim ve override, personel adı, şube ve zaman damgasıyla birlikte kaydedilir.",
      },
    ],
  },
  "revenue-centers": {
    slug: "revenue-centers",
    category: "Operasyon",
    title: "Gelir Merkezleri",
    description:
      "Masaiçi, gel-al, teslimat, bar ve diğer kanalları kendi gelir merkezine ayırın — her birinin kendine ait vergi kuralları, yazıcı yönlendirmesi, raporlaması ve çalışma saatleri olur. Temiz rakamlar, temiz operasyon.",
    tags: ["Kanal ayrımı", "Vergi kuralları", "Yönlendirme"],
    variant: "stack",
    accentTint: "#f43f5e",
    MainVisual: AnalyticsVisual,
    subCards: [
      {
        Visual: RevenueDonut,
        title: "Kanal bazlı kurallar",
        body: "Her gelir merkezinin kendi vergi oranı, servis ücreti, bahşiş ve çalışma saati konfigürasyonu olur.",
      },
      {
        Visual: ComparisonBars,
        title: "Bağımsız raporlama",
        body: "Merkez başına gelir, bilet büyüklüğü ve pik saatleri görüntüleyin. Yan yana karşılaştırın veya şube toplamına yuvarlayın.",
      },
      {
        Visual: ReceiptSlip,
        title: "Yönlendirme & yazdırma",
        body: "Siparişin geldiği gelir merkezine göre ürünleri doğru mutfak istasyonuna ve yazıcıya yönlendirin.",
      },
      {
        Visual: ClockFace,
        title: "Çalışma saatleri",
        body: "Masaiçi 11–22, teslimat 11–02. Her kanalın kendi programı, hepsi tek yerde.",
      },
    ],
  },
  "branch-overrides": {
    slug: "branch-overrides",
    category: "Çok şubeli",
    title: "Şube Override",
    description:
      "Herhangi bir şubede fiyatı, varyantı, uygunluğu, görselleri, zamanlamaları override edin — master menüye dokunmadan. Master gözetiminde yerel kontrol, tam olarak böyle çalışmalıdır.",
    tags: ["Override matrisi", "Varyant kontrolü", "Toplu uygulama"],
    variant: "split",
    accentTint: "#ec4899",
    MainVisual: BranchVisual,
    subCards: [
      {
        Visual: OverrideMatrix,
        title: "Görsel override matrisi",
        body: "Hangi ürünlerin hangi şubelerde override'a sahip olduğunu tek tablo görünümünde görün. Sürpriz yok.",
      },
      {
        Visual: TierBadges,
        title: "Şube bazlı fiyat override",
        body: "Bir lokasyonda belirli bir ürünü zam yapın, diğerinde indirin. Kimin ne zaman ne değiştirdiğini takip edin.",
      },
      {
        Visual: PricingSheet,
        title: "Toplu override iş akışı",
        body: "12 şubede 50 fiyatı tek işlemde override edin. Yayınlamadan önce doğrulayın, tek tıkla geri alın.",
      },
      {
        Visual: NetworkNodes,
        title: "İstediğiniz zaman master'a sıfırla",
        body: "Tek bir override'ı temizleyin veya şubedeki tüm override'ları silin. Master menü her zaman bozulmadan kalır.",
      },
    ],
  },
  "regional-pricing": {
    slug: "regional-pricing",
    category: "Çok şubeli",
    title: "Bölgesel Fiyatlandırma",
    description:
      "Şubeleri fiyat tier'larına gruplandırın ve bölge başına kurallar uygulayın. Havalimanı lokasyonlarında premium, şehir merkezlerinde standart, banliyölerde indirimli fiyat — hepsi otomatik, hepsi denetlenebilir.",
    tags: ["Fiyat tier'ları", "Store gruplar", "Toplu fiyatlama"],
    variant: "magazine",
    accentTint: "#f59e0b",
    MainVisual: BranchVisual,
    subCards: [
      {
        Visual: TierBadges,
        title: "Tier bazlı store gruplar",
        body: "Şubelerinizi Premium / Standart / İndirimli tier'lara gruplandırın. Bir şube ekleyin — fiyatlandırma tier'ı takip eder.",
      },
      {
        Visual: PricingSheet,
        title: "Toplu yüzde zam",
        body: "Premium tier'daki tüm tatlılara tek işlemle %15 zam uygulayın. Zamanlanabilir, geri alınabilir.",
      },
      {
        Visual: NetworkNodes,
        title: "Coğrafi store gruplar",
        body: "Şehir, bölge veya ülkeye göre gruplandırın. Grup düzeyinde para birimi, vergi ve fiyat kuralları uygulayın.",
      },
      {
        Visual: ReviewBubbles,
        title: "Kanal bazlı fiyatlandırma",
        body: "Getir'de, Trendyol'da ve masaiçinde farklı fiyat. Hepsi aynı tier çerçevesinde yönetilir.",
      },
    ],
  },
  heatmaps: {
    slug: "heatmaps",
    category: "Zeka",
    title: "Heatmap",
    description:
      "Gün, saat, şube ve kanal genelindeki pik yükü görselleştirin. Örüntüleri tespit edin — yoğun saatler, sakin günler, bölgesel farklılıklar — ve harekete geçin. Heatmap'ler zamanlama kararlarını açık hale getirir.",
    tags: ["Saat × Gün", "Şube üst üste bindirme", "Kanal ayrımı"],
    variant: "stack",
    accentTint: "#06b6d4",
    MainVisual: AnalyticsVisual,
    subCards: [
      {
        Visual: HeatmapMini,
        title: "Saat × Gün heatmap'i",
        body: "Şubenizin tam olarak ne zaman en yoğun olduğunu görün. Öğle kalabalığı - akşam yemeği yoğunluğu, Salı - Cumartesi — hepsi bir bakışta.",
      },
      {
        Visual: ComparisonBars,
        title: "Şube karşılaştırması",
        body: "Birden fazla şube için heatmap'leri üst üste bindirin. En uzun kuyruğu veya en erken piki olanı bulun.",
      },
      {
        Visual: PaymentDonut,
        title: "Kanal ayrımlı heatmap'ler",
        body: "Masaiçi, teslimat ve gel-al için ayrı heatmap'ler. Vardiya değil, kanal başına personeli optimize edin.",
      },
      {
        Visual: CompChart,
        title: "Yıldan yıla karşılaştırma",
        body: "Bu haftayı geçen yılın aynı haftasıyla karşılaştırın. Trend değişimlerini tespit edin, güvenle promosyon planlayın.",
      },
    ],
  },
  reports: {
    slug: "reports",
    category: "Zeka",
    title: "Raporlar",
    description:
      "Sürükle-bırak rapor oluşturucuyla ihtiyacınız olan herhangi bir raporu oluşturun. Tekrar eden dışa aktarmaları e-postaya zamanlayın, PDF veya Excel olarak teslim edin, ekibinizin favori görünümlerini şablon olarak kaydedin. Finans, operasyon ve franchise liderleri için tasarlandı.",
    tags: ["Özel oluşturucu", "Zamanlanmış dışa aktarma", "PDF & Excel"],
    variant: "split",
    accentTint: "#10b981",
    MainVisual: AnalyticsVisual,
    subCards: [
      {
        Visual: ComparisonBars,
        title: "Sürükle-bırak oluşturucu",
        body: "Boyutları, metrikleri, filtreleri ve görselleştirmeleri seçin. Şablon olarak kaydedin, ekibinizle paylaşın.",
      },
      {
        Visual: PricingSheet,
        title: "Zamanlanmış gönderim",
        body: "Her Pazartesi sabah 9'da haftalık kâr-zarar, her ayın 1'inde aylık vergi raporu. E-posta, Slack veya webhook — sizin tercihiniz.",
      },
      {
        Visual: PaymentDonut,
        title: "Çoklu format dışa aktarma",
        body: "Yönetim sunumları için PDF, finans için Excel, veri ambarları için CSV. Tek kaynak, her format.",
      },
      {
        Visual: HeatmapMini,
        title: "Role göre kaydedilmiş önayarlar",
        body: "Sahip yönetici özetini, operasyon şube detayını, muhasebe vergi görünümünü görür. Hepsi aynı veri üzerinde.",
      },
    ],
  },
  "campaign-builder": {
    slug: "campaign-builder",
    category: "Pazarlama",
    title: "Kampanya & İndirim Oluşturucu",
    description:
      "Tetik → koşul → ödül akışında sürüklenebilir node graph. Kod yazmadan karmaşık kampanya kurallarını görsel olarak kurun — canlı mantık paneli her kuralı yayınlamadan önce anında doğrular.",
    tags: ["9 kampanya tipi", "Görsel kural builder", "8 ödül tipi"],
    variant: "magazine",
    accentTint: "#8b5cf6",
    MainVisual: BranchVisual,
    subCards: [
      {
        Visual: SpotlightBanner,
        title: "9 kampanya tipi",
        body: "BOGO, happy hour, kupon, paket ve daha fazlası — 9 hazır şablondan başlayın ya da boş plan ile kendinizinkini kurun. Tip seçimi tetik, koşul ve ödül node'larını otomatik bağlar.",
      },
      {
        Visual: OverrideMatrix,
        title: "Görsel kural oluşturucu",
        body: "Tetik → koşul → ödül node'larını sürükleyip bağlayın. Zaman aralığı, minimum tutar, şube, müşteri segmenti, kanal — 6 koşul tipini birleştirin. Kod yok.",
      },
      {
        Visual: TierBadges,
        title: "8 ödül tipi",
        body: "Yüzde veya tutar indirimi, bedava ürün, paket fiyatı, puan ve daha fazlası. Ödülü münhasırlık ve kullanım limiti kurallarıyla sınırlayın.",
      },
      {
        Visual: ScheduleCalendar,
        title: "Kupon & zamanlama",
        body: "Kampanyaları belirli saat, gün veya sezona zamanlayın. Kupon kodları üretin, şube ve kanala göre hedefleyin, bitiş tarihi belirleyin.",
      },
    ],
  },
  "combo-builder": {
    slug: "combo-builder",
    category: "Menü",
    title: "Kombo & Set Menü Oluşturucu",
    description:
      "Bileşen gruplarından esnek kombolar kurun — üç fiyatlama modu, kombo bedenleri ve tier fiyatlamayla. Fişte nasıl göründüğünü önizleyin, tek tıkla menülere atayın. Her iş modeline uyar.",
    tags: ["3 fiyatlama modu", "Bileşen grupları", "Kombo bedenleri"],
    variant: "split",
    accentTint: "#f59e0b",
    MainVisual: PosVisual,
    subCards: [
      {
        Visual: PricingSheet,
        title: "3 fiyatlama modu",
        body: "Sabit fiyat (₺149 kombo), ek ücret (baz + seçim farkı) veya toplam (seçimlerin toplamı) — her iş modeline uygun. Tek tıkla mod değiştirin.",
      },
      {
        Visual: CatalogMap,
        title: "Bileşen grupları",
        body: "Ana yemek, içecek, ek tercih gibi gruplar oluşturun. Her grup zorunlu/opsiyonel, tek/çoklu seçim; min–max seçim sayısı belirleyin. Sürükle-bırak ile sıralayın.",
      },
      {
        Visual: TierBadges,
        title: "Kombo bedenleri & tier fiyatlama",
        body: "Küçük, Orta, Büyük beden başına ayrı fiyat. Tier bazlı fiyatlamayla farklı şube gruplarına farklı kombo ücretleri uygulayın.",
      },
      {
        Visual: ReceiptSlip,
        title: "Fiş önizleme & menü ataması",
        body: "Kombonun fişte nasıl görüneceğini önizleyin. Bir veya birden çok menüye atayın, uygunluğu şube bazında kontrol edin.",
      },
    ],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS) as ProductSlug[];

export function isProductSlug(slug: string): slug is ProductSlug {
  return slug in PRODUCTS;
}

/**
 * Prefer this over importing PRODUCTS directly — pages are rendered per locale
 * and the Turkish map is only the `tr` half of the pair.
 */
export function getProducts(locale: Locale): Record<ProductSlug, ProductData> {
  return locale === "en" ? PRODUCTS_EN : PRODUCTS;
}
