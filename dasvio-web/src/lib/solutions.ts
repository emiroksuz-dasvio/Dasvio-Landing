import type { ProductSlug } from "@/lib/products";

export type SolutionSlug =
  | "restaurants"
  | "cafes"
  | "fast-food"
  | "bars"
  | "hotels"
  | "cloud-kitchens"
  | "single-location"
  | "chains";

export type SolutionVariant = "split-photo" | "centered-stat" | "panel";

export type SolutionStat = { value: string; label: string };
export type SolutionChallenge = { title: string; body: string };

export type SolutionData = {
  slug: SolutionSlug;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  variant: SolutionVariant;
  accentTint: string;
  photo: string;
  challenges: SolutionChallenge[];
  recommended: ProductSlug[];
  stats: SolutionStat[];
};

export const SOLUTIONS: Record<SolutionSlug, SolutionData> = {
  restaurants: {
    slug: "restaurants",
    eyebrow: "Fine dining",
    title: "Şef odaklı mutfaklar, akıcı servis.",
    tagline:
      "Tadım menüleri, à la carte, şarap programları ve rezervasyon ağırlıklı salonlar için.",
    description:
      "Fine dining zamanlamaya göre yaşar ya da ölür. Dasvio, ön salonu, mutfağı ve şarap programını koordine eder; böylece her kurs zamanında çıkar, her misafir doğru tadım notlarını alır ve her masanın akışı ritmi korur — personelin her şeyi kafasında taşımasına gerek kalmaz.",
    variant: "panel",
    accentTint: "#f43f5e",
    photo:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Tadım menüsü koreografisi",
        body: "Çok kurslu menüler istasyonlar arasında anlık koordinasyon gerektirir. Dasvio hat ve pas arasındaki zamanlamayı otomatik senkronize eder.",
      },
      {
        title: "Yaşayan katalog olarak şarap listesi",
        body: "Yemeklerle şarapları eşleştirin, mahzen envanterini takip edin, 86'lanan şişeleri gerçek zamanlı olarak her garsonyerin tabletine gönderin.",
      },
      {
        title: "Rezervasyona duyarlı oturma düzeni",
        body: "Gelen rezervasyonları masa akışıyla eşleştirin. Diyet kısıtlamalarını ve VIP notlarını misafir oturur oturmaz gösterin.",
      },
      {
        title: "Masada çok dilli upsell",
        body: "Turist yoğun öğle ve akşam yemeklerinde — AI çevirili 14 dilde menü ve tadım menüleri için şef notu bağlamı.",
      },
    ],
    recommended: ["qr-menu", "pos", "revenue-centers", "analytics"],
    stats: [
      { value: "₺850+", label: "Ort. bilet büyüklüğü" },
      { value: "2.4×", label: "Günlük masa dönüşü" },
      { value: "14", label: "Misafir dili" },
      { value: "12 dk", label: "Ort. oturma-sipariş" },
    ],
  },
  cafes: {
    slug: "cafes",
    eyebrow: "Kafeler & Pastane",
    title: "Her vardiyada hız ve tutarlılık.",
    tagline: "Özel kahve, artisan pastane, brunch ve gel-al tezgahları için.",
    description:
      "Kafeler saniyelerle çalışır. Dasvio, sıradan kasaya teslim sürenizi kısaltır, saatlik dönen pastane tezgahınızı doğru tutar ve sadık müşterileri tezgah, masa ve mobil sipariş kanallarında bağlar — baristandaki personelin üç sistem öğrenmesine gerek kalmadan.",
    variant: "split-photo",
    accentTint: "#f59e0b",
    photo:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Sabah yoğunluğu verimi",
        body: "07–09 dalgası için 15 saniyenin altında ödeme. Önceden ayarlanmış modifier grupları, tek dokunuşla kombolar, temassız ödeme dahil.",
      },
      {
        title: "Saatlik değişen pastane tezgahı",
        body: "Saat 11'de 86'lanan ürünler QR menüden anında kaybolmalı. Dasvio uygunluğu gerçek zamanlı tüm kanallarda senkronize eder.",
      },
      {
        title: "Her kanalda sabit müşteriler",
        body: "Sabah müşterileriniz tezgah, mobil sipariş veya marketplace üzerinden gelir. Aynı sadakat hesabı, aynı sipariş geçmişi, aynı tanınma.",
      },
      {
        title: "Eşleştirme & kombo önerileri",
        body: "Pik saatlerinde simit-kahve kombosunu öne çıkarın, 11'de brunch panosuna geçin. Zamanlama odaklı menü geçişleri, otomatik.",
      },
    ],
    recommended: ["pos", "qr-menu", "multi-branch", "heatmaps"],
    stats: [
      { value: "60+", label: "Pik saatte sipariş/saat" },
      { value: "₺85", label: "Ort. bilet" },
      { value: "4sn", label: "Ort. ödeme" },
      { value: "%82", label: "Tekrar müşteri oranı" },
    ],
  },
  "fast-food": {
    slug: "fast-food",
    eyebrow: "Fast food & QSR",
    title: "Verime göre tasarlanmış operasyon.",
    tagline: "Burger, pizza, tavuk, kebap, drive-thru ve teslimat öncelikli QSR için.",
    description:
      "QSR bir sistem, mutfak değil. Dasvio, kombo mantığınızı, mutfak ekranınızı, aggregator gelen kutunuzu ve drive-thru akışınızı tek bağlı bir makine olarak çalıştırır — her saniyenin gelire mal olduğu pik saate göre inşa edildi.",
    variant: "centered-stat",
    accentTint: "#ef4444",
    photo:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Dakika altı sipariş-hazırlık",
        body: "Dokunuştan tava'ya 45 saniyede. Mutfak ekranı siparişleri onaylanır onaylanmaz doğru istasyona yönlendirir.",
      },
      {
        title: "Bozulmayan kombo mantığı",
        body: "İkame seçenekli XL menüler, upsell bildirimleri, varsayılan yan ürünlerle XL menü oluşturun. Kombo hesabı indirimler ve platform marjlarında doğru kalır.",
      },
      {
        title: "Öğlen saatinde aggregator kaosu",
        body: "Getir, Trendyol, Yemeksepeti, Migros aynı saatte geliyor. Tek gelen kutusu, tek mutfak ekranı, çift giriş yok.",
      },
      {
        title: "Özel ekran olmadan drive-thru",
        body: "Hoparlör-pano siparişleri aynı POS akışına girer. Müşteri yüzü ekranı sipariş özetini saniyeler içinde gösterir.",
      },
    ],
    recommended: ["pos", "integrations", "multi-branch", "heatmaps"],
    stats: [
      { value: "45sn", label: "Sipariş-hazırlık süresi" },
      { value: "120+", label: "Pik sipariş/saat" },
      { value: "8+", label: "Aggregator platformu" },
      { value: "%98", label: "Zamanında hazırlık oranı" },
    ],
  },
  bars: {
    slug: "bars",
    eyebrow: "Bar & Pub",
    title: "Açık sekmeler, hesap bölme, akıcı geceler.",
    tagline: "Kokteyl barları, publar, bira bahçeleri, otel loungeları ve gece mekanları için.",
    description:
      "Barlar sekmeler, bahşişler ve zamanlama üzerine döner. Dasvio, birden fazla barmen arasındaki açık sekmeleri yönetir, hesapları saniyeler içinde böler, mutlu saat fiyatlarını otomatik uygular ve denetçinize canlı zemin görünümü sunar — kapanış raporu kendiliğinden oluşur.",
    variant: "panel",
    accentTint: "#06b6d4",
    photo:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Çok personelde açık sekmeler",
        body: "Herhangi bir barmen herhangi bir sekmeye ekleyebilir. Garsonlar sekmeleri tek dokunuşla bardan masaya aktarır. Toplam her zaman doğru.",
      },
      {
        title: "Yönetici override'ı olmadan mutlu saat",
        body: "Fiyat düşüşlerini saat ve gün bazında zamanlayın. 17–19 otomatik indirimli, manuel giriş yok, hata yok.",
      },
      {
        title: "Eşit veya ürün bazında hesap bölme",
        body: "Altı misafir, bir hesap — eşit bölün veya her kişi sipariş ettiğini ödesin. Kart bölme, nakit bölme, bölmede bahşiş hepsi karşılanır.",
      },
      {
        title: "Bahşiş havuzu & kimlik doğrulama",
        body: "Vardiya bazında otomatik bahşiş havuzu hesaplaması. Alkollü ürünlerde yaş doğrulama bildirimi. Geç gece override'lar için denetim izi.",
      },
    ],
    recommended: ["pos", "revenue-centers", "regional-pricing", "staff-permissions"],
    stats: [
      { value: "₺585", label: "Ort. sekme büyüklüğü" },
      { value: "3.5 sa", label: "Ort. oturum süresi" },
      { value: "12+", label: "Pik içecek/saat" },
      { value: "%15", label: "Ort. bahşiş oranı" },
    ],
  },
  hotels: {
    slug: "hotels",
    eyebrow: "Otel & Resort",
    title: "Restoran, bar, oda servisi — tek sistem.",
    tagline: "Şehir otelleri, sahil resortları, butik tesisler ve her şey dahil işletmeler için.",
    description:
      "Otel F&B, tek arka ofisi paylaşan birden fazla işletmedir. Dasvio, ana restoranınızı, havuz barını, kahvaltı büfenizi ve 24 saatlik oda servisinizi ayrı gelir merkezleri olarak çalıştırır — tek menü omurgası, tek personel listesi ve GM'e tesiste neler olduğunu tam anlatan tek rapor.",
    variant: "split-photo",
    accentTint: "#10b981",
    photo:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "PMS entegreli oda hesabı",
        body: "Ödemeler herhangi bir noktadan doğrudan misafir faturasına aktarır. Çıkışta kapatın, F&B ile ön büro arasında kağıt karmaşası yok.",
      },
      {
        title: "Birden fazla nokta, tek ekip",
        body: "Restoran, bar, lobi kafe, havuz servisi — her biri kendi menüsü, vergisi ve yazıcı kurulumuna sahip gelir merkezi.",
      },
      {
        title: "Vardiya devriyle 7/24",
        body: "Restoranda kapanış vardiyası, oda servisi için açılış vardiyasına dönüşür. Aynı sistem, denetim temiz devir.",
      },
      {
        title: "14 dilde misafirler",
        body: "Turist ağırlıklı yemek servisi. Çok dilli QR menüler, çok dilli müşteri ekranı, çok dilli fişler — otomatik.",
      },
    ],
    recommended: ["multi-branch", "revenue-centers", "qr-menu", "integrations"],
    stats: [
      { value: "5+", label: "Tesis başına F&B noktası" },
      { value: "₺1.250", label: "Ort. oda hesabı" },
      { value: "7/24", label: "Çalışma saatleri" },
      { value: "14", label: "Misafir dili" },
    ],
  },
  "cloud-kitchens": {
    slug: "cloud-kitchens",
    eyebrow: "Cloud kitchen",
    title: "Tek mutfak, çok marka, her platform.",
    tagline: "Dark kitchen, sanal marka ve sadece teslimat operatörleri için.",
    description:
      "Cloud kitchen'lar aggregator öncelikli işletmelerdir. Dasvio, tek mutfaktan altı sanal markayı çalıştırmanıza izin verir, her markayı platformlarıyla eşleştirir ve her siparişi doğru istasyona doğru ambalaj etiketiyle yönlendirir — mutfağın hangi markanın hangisi olduğunu hatırlamasına gerek kalmaz.",
    variant: "centered-stat",
    accentTint: "#3b82f6",
    photo:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Çok marka, tek hazırlık hattı",
        body: "Aynı şef ve istasyonu paylaşan altı sanal marka. Dasvio siparişleri marka ve istasyona göre yönlendirir, markaya uygun fişler basar.",
      },
      {
        title: "Her sipariş platform kaynaklı",
        body: "Hacmin %100'ü Getir, Trendyol, Yemeksepeti, Migros'tan gelir. Tek gelen kutusu, tek menü senkronizasyonu, tek toplu fiyat aracı.",
      },
      {
        title: "Müşteri yüzü fiziksel alan yok",
        body: "Tezgah yok, yemek salonu yok. Çalışma saatleri, yoğunluk toggleları, kurye durumu — hepsi operatörün telefonundan.",
      },
      {
        title: "Ambalajda marka kimliği",
        body: "Marka başına fiş şablonu, marka başına ambalaj etiketi, marka başına müşteri takip linki. Hepsi aynı adresten gönderilir.",
      },
    ],
    recommended: ["integrations", "multi-branch", "revenue-centers", "branch-overrides"],
    stats: [
      { value: "6+", label: "Mutfak başına marka" },
      { value: "180+", label: "Günlük sipariş" },
      { value: "%98", label: "Zamanında hazırlık oranı" },
      { value: "0", label: "Yüz yüze müşteri" },
    ],
  },
  "single-location": {
    slug: "single-location",
    eyebrow: "Tek şube",
    title: "Kurumsal araçlar, bağımsız bütçe.",
    tagline: "Mahalle bistrolar, aile işletmeleri, tek mekanlı kafeler ve solo şefler için.",
    description:
      "Çoğu restoran yazılımı bağımsız işletmelere zincirin düşürülmüş versiyonunu sunar. Dasvio, 200 şubeli büyük zincirleri çalıştıran aynı platformun tek odalı bistronuzu da çalıştırması için inşa edildi — kurulum sihirbazıyla, IT ekibi gerekmeden ve tek P&L'e uygun fiyatlandırmayla.",
    variant: "split-photo",
    accentTint: "#ec4899",
    photo:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Tek başına, bir öğleden sonrada kurulum",
        body: "Sihirbaz destekli işe alım. Menünüzü içe aktarın, POS donanımınızı bağlayın, 4 saatten kısa sürede canlıya geçin.",
      },
      {
        title: "IT yok, sorun değil",
        body: "Sadece bulut, sıfır kurulum. Güncellemeler otomatik gelir. Bir şey bozulursa Türkçe destek dakikalar içinde yanıt verir.",
      },
      {
        title: "Premium özellikler, adil fiyat",
        body: "AI menü çevirisi, gerçek zamanlı analitik, çok kanallı entegrasyonlar — zincirlerin ödediği özellik seti, lokasyon başına fiyatlandırma.",
      },
      {
        title: "Hazır olunca büyüyün",
        body: "İkinci lokasyonu açtığınızda tüm ayarlar klonlanır. Çok şubeli araçlar zaten orada, bekliyor.",
      },
    ],
    recommended: ["qr-menu", "pos", "analytics", "integrations"],
    stats: [
      { value: "4 sa", label: "Ort. kurulum süresi" },
      { value: "₺0", label: "IT kurulum maliyeti" },
      { value: "1 → ∞", label: "Lokasyon ölçeği" },
      { value: "%30", label: "Ort. gelir artışı" },
    ],
  },
  chains: {
    slug: "chains",
    eyebrow: "Zincir & Franchise",
    title: "Her markayı, her franchisee'yi, her bölgeyi ölçeklendirin.",
    tagline: "Çok markalı gruplar, bölgesel franchise sahipleri, uluslararası zincirler için.",
    description:
      "Zincir operasyonları yazılım sorunu kılığına bürünmüş bir hizalama sorunudur. Dasvio, merkeze menü, fiyatlandırma ve marka tutarlılığı üzerinde merkezi kontrol verir — her franchise sahibinin kendi P&L'ini çalıştırmasına, yerel vergiyle uyum sağlamasına ve yerel pazarın gerçekten ihtiyaç duyduğunu override etmesine izin verirken.",
    variant: "panel",
    accentTint: "#ffffff",
    photo:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80",
    challenges: [
      {
        title: "Master menü, şube gerçeği",
        body: "Merkez master'ı yayınlar. Her şube, yerel pazarın ihtiyaç duyduğunu tam olarak override eder — marka tutarlılığını bozmadan.",
      },
      {
        title: "Tablolar olmadan bölgesel fiyatlandırma",
        body: "Premium havalimanı tier'ı, standart şehir tier'ı, indirimli banliyö tier'ı. Şubeleri gruplandırın, tier kurallarını ayarlayın, fiyatları yerli yerine oturtun.",
      },
      {
        title: "Doğru detay düzeyinde franchise raporlaması",
        body: "Sahip portföyü görür, franchise sahibi kendi P&L'ini görür, operasyon ağı görür. Aynı veri, kapsamlı görünümler.",
      },
      {
        title: "Bölgelerde 14 günlük açılış",
        body: "Yeni bir şehirde 2 haftada açılış. Klonlanmış kurulum, yerel vergi kuralları, yerel dil, yerel platformlar — hepsi önceden yapılandırılmış.",
      },
    ],
    recommended: ["multi-branch", "branch-overrides", "regional-pricing", "analytics"],
    stats: [
      { value: "1000+", label: "Desteklenen şube" },
      { value: "%99.9", label: "Platform uptime" },
      { value: "14 gün", label: "Ort. bölgesel açılış" },
      { value: "5+", label: "Fiyat tier'ı" },
    ],
  },
};

export const SOLUTION_SLUGS = Object.keys(SOLUTIONS) as SolutionSlug[];

export function isSolutionSlug(slug: string): slug is SolutionSlug {
  return slug in SOLUTIONS;
}
