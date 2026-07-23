/**
 * Article bodies, keyed by the `slug` in BLOG_POSTS. Kept out of `blog.ts` so
 * that file stays a compact metadata index — the blog listing page only ever
 * needs the metadata, and the per-post route is the only thing that pulls the
 * bodies in. Same shape philosophy as `policies-data.ts`: a typed block union
 * rendered by a switch, no markdown parser and no `dangerouslySetInnerHTML`.
 */

import type { Locale } from "@/i18n/config";
import { BLOG_CONTENT_EN } from "./blog-content.en";

export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "stats"; items: { value: string; label: string }[] }
  | { kind: "callout"; text: string };

export type ArticleBody = {
  /** Standfirst under the title — one paragraph, larger type. */
  lead: string;
  blocks: ArticleBlock[];
};

export const BLOG_CONTENT: Record<string, ArticleBody> = {
  "ai-translation-qr-menu-turkey-2026": {
    lead: "Çok dilli menü, iki yıl önce butik otellerin lüksüydü. 2026'da İstanbul Beyoğlu'ndaki bir esnaf lokantası için de temel gereksinim. Bu değişimin neden yaşandığına ve 14 dil açılımımızın ardındaki rakamlara bakalım.",
    blocks: [
      {
        kind: "p",
        text: "Bir menüyü çevirmek, kelimeleri değiştirmek değildir. \"Kuru fasulye\" ifadesini \"dried beans\" diye çevirdiğinizde teknik olarak haklısınızdır ve misafir yine de ne sipariş edeceğini bilemez. Menü çevirisi bir bağlam problemidir: porsiyon büyüklüğü, pişirme yöntemi, alerjen ve kültürel referans aynı anda taşınmak zorundadır.",
      },
      {
        kind: "p",
        text: "Dasvio'da AI çeviri katmanını kurarken ilk denememiz saf makine çevirisiydi. Sonuç, sahada işe yaramadı. İkinci denemede modeli ürün kategorisi, malzeme listesi ve fiyat aralığıyla birlikte besledik — doğruluk oranı dramatik biçimde yükseldi.",
      },
      {
        kind: "stats",
        items: [
          { value: "14", label: "desteklenen dil" },
          { value: "%92", label: "ilk denemede onaylanan çeviri" },
          { value: "4 sn", label: "ortalama menü öğesi çeviri süresi" },
          { value: "%31", label: "turist yoğun bölgelerde artan sepet" },
        ],
      },
      { kind: "h2", text: "Turist yoğunluğu haritayı yeniden çizdi" },
      {
        kind: "p",
        text: "Türkiye'ye gelen ziyaretçi profili son üç yılda çeşitlendi. Antalya sahil hattında Rusça ve Almanca hâlâ baskın; ancak Kapadokya'da Japonca ve Korece talebi, İstanbul'da ise Arapça ve Farsça talebi hızla arttı. Tek bir İngilizce menü artık ortalamayı yakalamıyor.",
      },
      {
        kind: "ul",
        items: [
          "Sahil resortlarında menü görüntülemelerinin %58'i Türkçe dışı bir dilde açılıyor.",
          "İstanbul tarihi yarımadada bu oran %64'e çıkıyor.",
          "Anadolu şehir merkezlerinde ise %9 — yani özellik her yerde aynı değeri üretmiyor.",
        ],
      },
      { kind: "h2", text: "İnsan onayını neden akıştan çıkarmadık" },
      {
        kind: "p",
        text: "Her çeviri, yayına girmeden önce panelde \"onay bekliyor\" durumunda duruyor. Bu, hız açısından bir maliyet; doğruluk açısından ise pazarlık edilemez. Bir alerjen etiketinin yanlış çevrilmesi, kötü bir kullanıcı deneyimi değil — sağlık riskidir.",
      },
      {
        kind: "quote",
        text: "Menüyü 11 dile açtığımızda ilk fark ettiğimiz şey sipariş hacmi değil, garsona sorulan soru sayısının düşmesiydi. Servis hızı kendiliğinden arttı.",
        cite: "Sahil bölgesinde 4 şubeli bir resort restoranının operasyon müdürü",
      },
      { kind: "h2", text: "Nereden başlamalı" },
      {
        kind: "ol",
        items: [
          "Son üç ayın QR menü dil istatistiğine bakın — tahmin etmeyin, ölçün.",
          "En çok görüntülenen ilk 20 ürünü önce çevirin; uzun kuyruk bekleyebilir.",
          "Alerjen ve içerik alanlarını ayrı bir onay turundan geçirin.",
          "Çeviriyi yayına aldıktan sonra 2 hafta boyunca sepet ortalamasını dil kırılımında izleyin.",
        ],
      },
      {
        kind: "callout",
        text: "QR menü dil istatistikleri Dasvio panelinde Analitik → QR Menü → Dil dağılımı altında hazır geliyor. Özelliği açmadan önce bu ekranı bir kez okumanızı öneriyoruz.",
      },
    ],
  },

  "anatolia-kebap-50-branches-90-days": {
    lead: "Bölgesel bir zincir, tek çeyrekte 7 şehirde franchise açma kararı aldı. Operasyon ekibinin, 50 şubede aynı anda çökmeyecek bir menü sistemine ihtiyacı vardı. Nasıl yaptıklarını adım adım anlatıyoruz.",
    blocks: [
      {
        kind: "p",
        text: "Anatolia Kebap, projeye 6 şubeyle başladı. Menü Excel'de tutuluyordu ve her fiyat güncellemesi, şube müdürlerine WhatsApp'tan gönderilen bir tablo demekti. Bu, 6 şubede idare edilebilir bir kaostu. 50 şubede imkânsız.",
      },
      { kind: "h2", text: "Gün 0–15: Master menüyü çıkarmak" },
      {
        kind: "p",
        text: "İlk iki hafta tamamen envanterle geçti. 340 ürünün 112'sinin aslında aynı ürünün farklı yazımları olduğu ortaya çıktı — \"Adana Kebap\", \"Adana kebabı\", \"ADANA\" gibi. Master menüye geçmeden önce bu tekilleştirme yapılmak zorundaydı ve yazılım bunu sizin yerinize karar veremez.",
      },
      {
        kind: "stats",
        items: [
          { value: "340 → 186", label: "tekilleştirme sonrası ürün sayısı" },
          { value: "3", label: "bölgesel fiyat tier'ı" },
          { value: "50", label: "90 günde canlıya alınan şube" },
          { value: "%0", label: "açılış günü menü senkron hatası" },
        ],
      },
      { kind: "h2", text: "Gün 15–45: Fiyat tier'ları ve override sınırları" },
      {
        kind: "p",
        text: "Merkez ekip başta tek fiyat istedi. Saha bunu reddetti — İstanbul Kadıköy ile Şanlıurfa'nın kira ve işçilik yapısı aynı değil. Uzlaşma, üç bölgesel tier ve şube başına sınırlı override yetkisi oldu: bir şube müdürü fiyatı en fazla %8 oynatabiliyor, ötesi merkez onayına düşüyor.",
      },
      {
        kind: "ul",
        items: [
          "Tier A: metropol merkez lokasyonlar (12 şube)",
          "Tier B: metropol çeper ve büyük şehirler (23 şube)",
          "Tier C: Anadolu şehirleri (15 şube)",
          "Override tavanı: ±%8, üzeri merkez onayı",
        ],
      },
      { kind: "h2", text: "Gün 45–90: Açılış dalgaları" },
      {
        kind: "p",
        text: "50 şube aynı gün açılmadı. Haftada 4–6 şubelik dalgalar hâlinde gidildi. Bu, franchise sahiplerinin sabırsızlığına rağmen savunulan en önemli karardı: her dalgada çıkan sorun, bir sonrakine girmeden düzeltildi.",
      },
      {
        kind: "quote",
        text: "En çok işe yarayan şey teknoloji değildi. Her dalga sonrası yaptığımız 90 dakikalık retrospektifti. Yazılım sadece o retrospektifte konuşacak veriyi bize verdi.",
        cite: "Anatolia Kebap operasyon direktörü",
      },
      { kind: "h2", text: "Geriye dönüp bakınca ne farklı yapılırdı" },
      {
        kind: "ol",
        items: [
          "Tekilleştirme iki hafta değil, dört hafta sürmeliydi — sonradan çıkan 20 kadar çakışma ilk turda yakalanabilirdi.",
          "Franchise sahiplerine override yetkisi ilk günden değil, 30. günden sonra açılmalıydı.",
          "Personel eğitimi POS ekranı üzerinden değil, gerçek bir servis vardiyasında yapılmalıydı.",
        ],
      },
    ],
  },

  "platform-integrations-engineering": {
    lead: "Getir, Trendyol ve Yemeksepeti'nin her birinin kendine özgü katalog davranışı var. Senkronizasyon motorumuzu sıfırdan yeniden yazdık; dağıtık eşleştirme konusunda öğrendiklerimizi paylaşıyoruz.",
    blocks: [
      {
        kind: "p",
        text: "Entegrasyon demosunda her şey çalışır. Sorun, üçüncü ayda başlar: platformdaki bir ürün silinir, sizin tarafınızda durur; bir fiyat kampanyası bittiğinde eski fiyat geri gelmez; bir şube tatile girer ve dört platformdan üçünde hâlâ sipariş alır.",
      },
      { kind: "h2", text: "Kök neden: eşleştirmeyi kimlikle değil, isimle yapmak" },
      {
        kind: "p",
        text: "İlk mimarimiz ürünleri isim benzerliğiyle eşleştiriyordu. Bu, %85 doğrulukla çalıştı — ve %15'lik hata payı, günde binlerce siparişte kabul edilemez bir rakam. Yeniden yazımın merkezinde, her platform için kalıcı bir dış kimlik (external ID) haritası tutmak vardı.",
      },
      {
        kind: "callout",
        text: "İsim benzerliğine dayalı eşleştirme, katalog küçükken doğru görünür. Ürün sayısı 200'ü geçtiğinde sessizce bozulmaya başlar ve bozulduğunu size kimse söylemez.",
      },
      { kind: "h2", text: "Üç platform, üç farklı gerçeklik modeli" },
      {
        kind: "ul",
        items: [
          "Bir platform kısmi güncelleme kabul ediyor; diğeri her seferinde tam katalog istiyor.",
          "Stok kapatma bir yerde ürün seviyesinde, başka yerde varyant seviyesinde çalışıyor.",
          "Kampanya fiyatı bir platformda ayrı bir alan, diğerinde ana fiyatın üzerine yazılıyor.",
          "Hata kodları standart değil; aynı durum üç farklı mesajla dönebiliyor.",
        ],
      },
      { kind: "h2", text: "Kuyruk, retry ve idempotency" },
      {
        kind: "p",
        text: "Senkronizasyonu doğrudan HTTP çağrısı olarak yapmayı bıraktık. Her değişiklik artık bir olay olarak kuyruğa giriyor, işleyici idempotent çalışıyor ve başarısız iş üstel geri çekilmeyle yeniden deneniyor. Aynı olayın iki kez işlenmesi, sistemi bozmuyor — bu, dağıtık sistemde pazarlık edilemez bir özellik.",
      },
      {
        kind: "stats",
        items: [
          { value: "%99,4", label: "ilk denemede başarılı senkron" },
          { value: "< 40 sn", label: "medyan yayılma süresi" },
          { value: "3", label: "otomatik retry denemesi" },
          { value: "0", label: "manuel katalog düzeltmesi / hafta" },
        ],
      },
      { kind: "h2", text: "Gözlemlenebilirlik olmadan hiçbiri işe yaramaz" },
      {
        kind: "p",
        text: "En büyük kazanç, motorun kendisi değil; her ürün için \"şu an hangi platformda hangi durumdayım\" sorusunu tek ekranda cevaplayabilmek oldu. Destek ekibinin çözüm süresi, bu ekran yayına girdikten sonra yarıya indi.",
      },
      {
        kind: "quote",
        text: "Dağıtık sistemde asıl özellik senkronizasyon değil, senkronizasyonun bozulduğunu fark edebilmektir.",
      },
    ],
  },

  "revenue-center-engine": {
    lead: "Masaiçi, gel-al, teslimat ve bar gelirini birbirinden ayırırken kasiyerin işini zorlaştırmamak ve yöneticinin raporunu karmaşıklaştırmamak gerekiyordu. Bu dengeyi kuran yedi tasarım kararı.",
    blocks: [
      {
        kind: "p",
        text: "Gelir merkezi, muhasebe için basit bir kavram: geliri nereden kazandığınızı ayırmak. Sahada ise her ayrım, kasiyerin ekranında fazladan bir tıklamaya dönüşme riski taşır. Yedi karar da bu gerilimi çözmek üzerine kuruldu.",
      },
      { kind: "h2", text: "1. Gelir merkezini siparişten değil, açılıştan türetmek" },
      {
        kind: "p",
        text: "Kasiyer \"bu bir teslimat siparişi mi?\" sorusuna cevap vermiyor. Sipariş hangi kanaldan açıldıysa gelir merkezi otomatik atanıyor: masadan açıldıysa masaiçi, QR'dan geldiyse QR, aggregator'dan düştüyse ilgili platform.",
      },
      { kind: "h2", text: "2. Bar'ı kanal değil, hazırlık noktası saymak" },
      {
        kind: "p",
        text: "Bar ürünü masaiçi de satılır, teslimata da çıkar. Bu yüzden barı ayrı bir kanal yapmadık; ürün seviyesinde bir hazırlık noktası etiketi olarak modelledik. Rapor tarafında iki boyut çaprazlanabiliyor.",
      },
      {
        kind: "ul",
        items: [
          "3. Bir sipariş yalnızca bir gelir merkezine ait olabilir — çoklu atama, raporu okunamaz hale getiriyordu.",
          "4. Gelir merkezi değişikliği geriye dönük değil; düzeltme, iptal + yeniden açma ile yapılıyor.",
          "5. Her gelir merkezinin kendi yazıcı ve KDS hedefi olabiliyor.",
          "6. Personel yetkisi gelir merkezi bazında kısıtlanabiliyor.",
          "7. Raporlar varsayılan olarak gelir merkezi kırılımında açılıyor — opt-in değil, opt-out.",
        ],
      },
      { kind: "h2", text: "Yedinci kararın maliyeti" },
      {
        kind: "p",
        text: "Raporları varsayılan olarak kırılımlı açmak, ilk bakışta daha karmaşık bir ekran demekti ve iç testlerde direnç gördü. Yayına aldıktan sonra ise yöneticilerin rapor içinde geçirdiği süre düştü — çünkü aradıkları kırılıma ulaşmak için tıklama yapmaları gerekmiyordu.",
      },
      {
        kind: "callout",
        text: "Varsayılanlar, özelliklerden daha güçlüdür. Bir kırılımı ayarlar menüsüne koyduğunuzda kullanıcıların çoğu onu hiç görmez.",
      },
    ],
  },

  "12-second-checkout": {
    lead: "8 İstanbul kafesinde 4.200 işlemi kronometreyle takip ettik. Her saniyenin nereye gittiğini, misafirlerin nerede sıradan çıktığını ve hangi saniyelerin gerçekten kazanılabilir olduğunu ölçtük.",
    blocks: [
      {
        kind: "p",
        text: "Sabah 08:00–10:00 arası bir kafede ödeme süresi, günün geri kalanından farklı bir problemdir. Kuyruk uzunluğu psikolojik bir eşiği geçtiğinde insanlar sıraya girmiyor — ve kaybettiğiniz o müşteri hiçbir rapora düşmüyor.",
      },
      {
        kind: "stats",
        items: [
          { value: "4.200", label: "ölçülen işlem" },
          { value: "12,4 sn", label: "medyan ödeme süresi" },
          { value: "5 kişi", label: "terk etme eşiği (ortalama kuyruk)" },
          { value: "3,1 sn", label: "kazanılabilir ortalama süre" },
        ],
      },
      { kind: "h2", text: "12 saniye nereye gidiyor" },
      {
        kind: "ol",
        items: [
          "Ürün seçimi ve ekrana giriş: 4,8 sn",
          "Değişiklik / not ekleme: 1,9 sn",
          "Ödeme yöntemi seçimi: 1,2 sn",
          "Kart okutma ve onay bekleme: 3,4 sn",
          "Fiş ve teslim: 1,1 sn",
        ],
      },
      { kind: "h2", text: "Kazanılabilir olan ve olmayan saniyeler" },
      {
        kind: "p",
        text: "Kart onayı için beklenen 3,4 saniyenin büyük kısmı banka tarafında ve yazılımla kısaltılamıyor. Buna karşılık ürün seçimindeki 4,8 saniye tamamen arayüz meselesi: sabah saatlerinde satılan ürünlerin %71'i yalnızca 9 farklı üründen oluşuyor.",
      },
      {
        kind: "quote",
        text: "Sabah menüsünü ayrı bir ekran düzenine aldığımızda kasiyer başına ortalama üç saniye kazandık. Hiçbir donanım değişmedi.",
        cite: "Kadıköy'de 3 şubeli bir kahve zincirinin işletmecisi",
      },
      { kind: "h2", text: "Pratik çıkarımlar" },
      {
        kind: "ul",
        items: [
          "Saat bazlı ekran düzeni kurun — sabah ve öğleden sonra aynı ürün sıralamasını kullanmayın.",
          "En çok satan 9 ürünü tek ekranda, kaydırmasız erişilebilir tutun.",
          "Sık kullanılan notları hazır düğmeye alın; serbest metin girişi en pahalı etkileşimdir.",
          "Kuyruk 5 kişiyi geçtiğinde ikinci terminali açacak bir eşik kuralı tanımlayın.",
        ],
      },
    ],
  },

  "hourly-heatmaps-primer": {
    lead: "En yoğun saatinizi en sakin gününüze karşı hiç çizmediyseniz, büyük ihtimalle masada para bırakıyorsunuz. Saatlik heatmap okumayı gerçek operatör örnekleriyle adım adım anlatıyoruz.",
    blocks: [
      {
        kind: "p",
        text: "Aylık ciro raporu size ne olduğunu söyler. Saatlik heatmap ise ne zaman olduğunu söyler — ve operasyonel karar, neredeyse her zaman ikincisinden çıkar.",
      },
      { kind: "h2", text: "Heatmap nasıl okunur" },
      {
        kind: "p",
        text: "Dikey eksende haftanın günleri, yatay eksende saatler, hücre renginde ise metriğiniz vardır. Kritik nokta şudur: metriği ciro seçerseniz farklı, işlem sayısı seçerseniz çok farklı bir tablo görürsünüz. İkisini de çizmeden karar vermeyin.",
      },
      {
        kind: "ul",
        items: [
          "Ciro heatmap'i: fiyatlandırma ve menü kararları için.",
          "İşlem sayısı heatmap'i: personel planlaması için.",
          "Ortalama sepet heatmap'i: upsell fırsatlarını görmek için.",
          "İptal/iade heatmap'i: operasyonel sorunları yakalamak için — en çok göz ardı edileni.",
        ],
      },
      { kind: "h2", text: "Operatörlerin en sık gördüğü üç desen" },
      {
        kind: "ol",
        items: [
          "Çift tepe: öğle ve akşam iki ayrı zirve yapıyor, arada ölü bant var. Vardiya bölmesi gerektirir.",
          "Kayan hafta sonu: Cumartesi zirvesi Cuma'ya göre 90 dakika geç başlıyor. Aynı vardiya saatini iki güne uygulamak burada hata.",
          "Sessiz erozyon: bir saat diliminde işlem sayısı sabit ama sepet ortalaması haftalarca düşüyor. Genelde bir ürünün stok dışı kalmasından kaynaklanıyor.",
        ],
      },
      {
        kind: "callout",
        text: "Sessiz erozyonu ciro raporunda yakalamak neredeyse imkânsızdır — toplam rakam aynı kalabilir. Sepet ortalamasını saat kırılımında izlemeden göremezsiniz.",
      },
      { kind: "h2", text: "İlk haftanızda yapılacaklar" },
      {
        kind: "p",
        text: "Son 8 haftanın işlem sayısı heatmap'ini açın, en yoğun üç hücrenizi ve en sakin üç hücrenizi işaretleyin. Ardından o saatlerdeki personel sayınıza bakın. Çoğu işletmede bu iki tablo arasında ciddi bir uyumsuzluk çıkar ve düzeltmesi ücretsizdir.",
      },
    ],
  },

  "master-menu-branch-reality": {
    lead: "Merkez ekip %95 marka tutarlılığı isterken her franchise sahibi kendi pazarının özel olduğuna yemin ediyor. Bu gerilim yalnızca bir yazılım sorunu değil — ama yazılım, çözümü kolaylaştırabilir ya da imkânsızlaştırabilir.",
    blocks: [
      {
        kind: "p",
        text: "Büyük zincir açılışlarında en sık duyduğumuz cümle şu: \"Sistem esnek olsun ama kimse bozmasın.\" Bu iki istek doğrudan çelişir ve yazılımın işi, çelişkiyi çözmek değil, sınırlarını açıkça çizmektir.",
      },
      { kind: "h2", text: "Override'ı yasaklamak neden işe yaramıyor" },
      {
        kind: "p",
        text: "Şube düzeyinde hiçbir değişikliğe izin vermeyen sistemler, sahada aynı sonucu doğuruyor: müdürler sistemin dışına çıkıyor. Fiyat farkı kasada elle uygulanıyor, kampanya WhatsApp'tan yürütülüyor ve raporunuz gerçeği yansıtmayı bırakıyor.",
      },
      {
        kind: "quote",
        text: "Yasakladığınız her esneklik, sistemin dışında ve görünmez biçimde geri gelir. Tercih, esnekliğin olup olmaması değil; ölçülebilir olup olmaması.",
      },
      { kind: "h2", text: "Çalışan model: sınırlı ve kayıtlı override" },
      {
        kind: "ul",
        items: [
          "Ürünün var/yok durumu: şube serbest (yerel tedarik gerçeği).",
          "Fiyat: tier içinde tanımlı bant aralığında serbest, dışı onaya tabi.",
          "Ürün adı ve görseli: merkez kilitli — marka tutarlılığının çekirdeği burası.",
          "Yerel kampanya: şube başlatabilir, merkez görür ve durdurabilir.",
          "Her override kim, ne zaman, hangi gerekçeyle bilgisiyle loglanır.",
        ],
      },
      { kind: "h2", text: "1000 lokasyonda öğrenilen ölçek dersi" },
      {
        kind: "p",
        text: "Şube sayısı üç haneye çıktığında merkez ekibin her override'ı tek tek incelemesi mümkün değil. Bu noktada onay akışı, istisna raporlamasına dönüşmek zorunda: her şeyi onaylamak yerine, banttan sapanları listeleyen bir ekran.",
      },
      {
        kind: "stats",
        items: [
          { value: "%4,2", label: "banttan sapan override oranı" },
          { value: "%95+", label: "korunan ürün adı tutarlılığı" },
          { value: "18 dk", label: "merkez ekibin günlük istisna incelemesi" },
        ],
      },
      { kind: "h2", text: "İnsan tarafı" },
      {
        kind: "p",
        text: "En iyi override politikası bile, franchise sahibine neden var olduğu anlatılmadığında dirençle karşılanıyor. Açılış sürecine yarım günlük bir \"neyi neden kilitliyoruz\" oturumu eklemek, sonraki altı ayın destek yükünü belirgin biçimde azaltıyor.",
      },
    ],
  },

  "cloud-kitchens-software-problem": {
    lead: "Altı marka, bir hazırlık hattı, sekiz aggregator. Cloud kitchen ekonomisi ancak sistem kaosa yetişebildiğinde çalışıyor — ve çoğu platform tam burada kalıyor.",
    blocks: [
      {
        kind: "p",
        text: "Cloud kitchen genellikle bir gayrimenkul hikâyesi olarak anlatılır: ucuz metrekare, salon yok, servis personeli yok. Sahadaki gerçek ise şu — maliyet avantajını yiyip bitiren şey kira değil, koordinasyon karmaşasıdır.",
      },
      { kind: "h2", text: "Karmaşıklık neden doğrusal büyümüyor" },
      {
        kind: "p",
        text: "Tek markayla tek platformda çalışırken bir bağlantı noktanız var. Altı marka ve sekiz platformda bu sayı 48'e çıkıyor. Her biri kendi menü formatı, kendi kampanya mantığı ve kendi iptal kuralıyla geliyor.",
      },
      {
        kind: "stats",
        items: [
          { value: "48", label: "marka × platform bağlantı noktası" },
          { value: "6", label: "aynı mutfaktan çıkan marka" },
          { value: "~%22", label: "koordinasyon kaynaklı verim kaybı" },
        ],
      },
      { kind: "h2", text: "Hazırlık hattı gerçeği" },
      {
        kind: "p",
        text: "Altı markanın siparişi tek hazırlık hattına düşüyor ve mutfak personeli hangi markanın hangi siparişi olduğuyla değil, hangi istasyonun ne yapacağıyla ilgileniyor. Marka bazlı KDS ekranı bu yüzden sahada yanlış bir soyutlama — istasyon bazlı olması gerekiyor.",
      },
      {
        kind: "ul",
        items: [
          "Sipariş, markaya göre değil istasyona göre parçalanmalı.",
          "Paketleme noktası, marka kimliğinin tek görünür olduğu yer olmalı.",
          "Hazırlık süresi tahmini marka bazlı değil, hat doluluğu bazlı hesaplanmalı.",
          "Stok, marka değil malzeme seviyesinde tutulmalı — altı marka aynı tavuğu kullanıyor.",
        ],
      },
      { kind: "h2", text: "Aggregator komisyonunun görünmeyen kısmı" },
      {
        kind: "p",
        text: "Komisyon oranı sözleşmede yazar; iptal ve claim maliyeti yazmaz. İncelediğimiz operasyonlarda, claim yönetimine harcanan personel saatinin parasal karşılığı komisyonun üzerine ortalama 1,8 puan ekliyordu. Bu, marj hesabında çoğunlukla hiç görünmüyor.",
      },
      {
        kind: "callout",
        text: "Cloud kitchen fizibilitesi yaparken komisyon oranının yanına claim işleme süresini de koyun. İkisini ayrı düşünmek, marjı sistematik biçimde iyimser gösterir.",
      },
      {
        kind: "quote",
        text: "Bizim işimiz yemek yapmak değil, sekiz farklı sistemin aynı anda ne istediğini anlamak haline gelmişti. Yazılımın çözmesi gereken sorun tam olarak buydu.",
        cite: "İstanbul Ümraniye'de 6 markalı bir cloud kitchen kurucusu",
      },
    ],
  },

  "pos-built-for-cashiers": {
    lead: "Çoğu POS sistemi arka ofis raporlamasını optimize eder. Bizimki, Cuma akşamı 21:00'de terminalin başındaki yorgun insanı optimize ediyor. Bu tek kararın ürünün tamamını nasıl şekillendirdiğini anlatalım.",
    blocks: [
      {
        kind: "p",
        text: "POS satın alma kararını genelde işletme sahibi verir, ama günde sekiz saat o ekranı kasiyer kullanır. Satın alma kriterleri ile kullanım kriterleri arasındaki bu boşluk, sektördeki kötü POS deneyiminin büyük kısmını açıklıyor.",
      },
      { kind: "h2", text: "Yoğun saatte tasarım kuralları değişir" },
      {
        kind: "ul",
        items: [
          "Hedef alanlar büyük olmalı — yorgun ve aceleci parmak, hassas dokunuş yapmaz.",
          "Onay diyaloğu yalnızca geri alınamaz işlemlerde çıkmalı; gereksiz onay, körlük yaratır.",
          "Renk tek başına bilgi taşımamalı; mutfak ışığı altında düşük kontrast okunmuyor.",
          "Yanlış tıklamanın geri dönüşü tek adımda olmalı.",
          "Hiçbir kritik akış, kaydırma gerektirmemeli.",
        ],
      },
      { kind: "h2", text: "Kaldırdığımız özellikler" },
      {
        kind: "p",
        text: "Ürünü iyileştiren kararların bir kısmı ekleme değil, çıkarma oldu. Kasiyer ekranından detaylı ürün açıklamasını, stok seviyesi göstergesini ve müşteri geçmişi panelini kaldırdık. Üçü de yararlı bilgilerdi — ve üçü de yoğun saatte gürültüydü. Hepsi yönetici ekranında duruyor.",
      },
      {
        kind: "quote",
        text: "Ekranda ne kadar az şey varsa o kadar hızlı çalışıyoruz. İlk hafta \"bilgi eksik\" diye şikâyet ettik, ikinci hafta geri istemedik.",
        cite: "Beşiktaş'ta bir brasserie'nin vardiya sorumlusu",
      },
      { kind: "h2", text: "Ölçtüğümüz sonuç" },
      {
        kind: "stats",
        items: [
          { value: "-2,7 sn", label: "işlem başına ortalama süre" },
          { value: "-%41", label: "yanlış giriş kaynaklı iptal" },
          { value: "1 gün", label: "yeni personel için ortalama öğrenme süresi" },
        ],
      },
      {
        kind: "callout",
        text: "POS değerlendirirken demoyu sakin bir odada değil, gerçek bir akşam servisinde izleyin. İki deneyim arasındaki fark, çoğu satın alma hatasının kaynağı.",
      },
    ],
  },

  "q3-2026-product-update": {
    lead: "Heatmap üst üste bindirmeleri, çok dilli müşteri ekranları, Trendyol claim gelen kutusu v2 ve uzun süredir beklenen sürükle-bırak rapor oluşturucu. Bu çeyrekte gelen 14 özelliği ve hepsini birbirine bağlayan tek fikri özetliyoruz.",
    blocks: [
      {
        kind: "p",
        text: "Bu çeyreğin tek büyük fikri şu: veriyi göstermek yetmiyor, veriyi karşılaştırılabilir hâle getirmek gerekiyor. 14 özelliğin çoğu bu cümlenin farklı yüzleri.",
      },
      { kind: "h2", text: "Analitik" },
      {
        kind: "ul",
        items: [
          "Heatmap üst üste bindirme: iki dönemi aynı grafikte karşılaştırma.",
          "Sürükle-bırak rapor oluşturucu: kod veya destek talebi olmadan özel rapor.",
          "Gelir merkezi kırılımının tüm raporlarda varsayılan hâle gelmesi.",
          "Zamanlanmış rapor e-postaları — günlük, haftalık veya vardiya sonu.",
        ],
      },
      { kind: "h2", text: "QR menü ve müşteri deneyimi" },
      {
        kind: "ul",
        items: [
          "Çok dilli müşteri ekranı (customer display).",
          "Menü öğesi bazında görüntülenme/sipariş dönüşüm oranı.",
          "Alerjen filtreleme.",
          "Masa bazlı çağrı bildiriminin KDS'ye düşmesi.",
        ],
      },
      { kind: "h2", text: "Entegrasyonlar" },
      {
        kind: "ul",
        items: [
          "Trendyol claim gelen kutusu v2 — toplu işlem ve otomatik itiraz taslağı.",
          "Platform bazlı otomatik menü uyum kontrolü.",
          "Şube tatil modu: tek tıkla tüm platformlarda kapanma.",
        ],
      },
      { kind: "h2", text: "Operasyon" },
      {
        kind: "ul",
        items: [
          "Vardiya bazlı personel yetki şablonları.",
          "Yazıcı sağlık durumu izleme ve otomatik yönlendirme.",
          "Fiyat override istisna raporu.",
        ],
      },
      {
        kind: "callout",
        text: "Sürükle-bırak rapor oluşturucu kademeli olarak açılıyor. Erken erişim için panelde Ayarlar → Laboratuvar bölümünden talep bırakabilirsiniz.",
      },
      { kind: "h2", text: "Sırada ne var" },
      {
        kind: "p",
        text: "Q4'te odağımız tahminleme: geçmiş veriye bakan raporlardan, önümüzdeki haftanın personel ve stok ihtiyacını öneren araçlara geçiş. Yol haritasının detayını bir sonraki güncellemede paylaşacağız.",
      },
    ],
  },

  "receipt-printers-2026": {
    lead: "Restoranınızdaki en sıradan çevre birimi, aynı zamanda en parçalı standart. 14 donanım üreticisiyle çalışırken derlediğimiz saha raporu.",
    blocks: [
      {
        kind: "p",
        text: "Fiş yazıcısı, kurulumu en kolay görünen ve destek biletlerinde en çok yer kaplayan cihazdır. Sebebi basit: ESC/POS bir standart değil, bir standart ailesidir ve her üretici kendi lehçesini konuşur.",
      },
      { kind: "h2", text: "Aynı komut, farklı davranış" },
      {
        kind: "ul",
        items: [
          "Kesme komutu bazı modellerde tam, bazılarında kısmi kesim yapıyor.",
          "Türkçe karakter desteği kod sayfası ayarına bağlı ve varsayılanlar tutarsız.",
          "Logo yazdırma için gereken görsel formatı üreticiden üreticiye değişiyor.",
          "Kâğıt bitti sinyali bazı modellerde yalnızca tamamen bittiğinde geliyor — uyarı eşiği yok.",
        ],
      },
      { kind: "h2", text: "Ağ yazıcıları ve sessiz kayıplar" },
      {
        kind: "p",
        text: "En zor hata sınıfı, yazıcının bağlantıyı kabul edip işi sessizce düşürmesi. Uygulama başarı görüyor, mutfak fiş görmüyor. Çözüm, yazdırma işini kuyruğa almak ve cihazdan gelen durum sorgusuyla doğrulamak — yani \"gönderdim\" ile \"bastı\" arasındaki farkı modellemek.",
      },
      {
        kind: "callout",
        text: "Yazıcı sorunlarının önemli bir kısmı aslında ağ sorunudur. Mutfak yazıcısını misafir Wi-Fi'ı ile aynı ağa koymak, yaşadığımız en yaygın kurulum hatası.",
      },
      { kind: "h2", text: "Satın alırken bakılacaklar" },
      {
        kind: "ol",
        items: [
          "Türkçe karakter desteğini varsayılan kod sayfasında test edin, dokümana güvenmeyin.",
          "Kâğıt az uyarısı veriyor mu — yalnızca bitti sinyali yeterli değil.",
          "Durum sorgusu (status query) destekliyor mu.",
          "Yedek parça ve kâğıt tedariki yerel mi.",
          "Aynı modelden ikinci bir cihaz alıp yedek tutmanın maliyeti nedir.",
        ],
      },
      {
        kind: "quote",
        text: "Cuma akşamı bozulan bir yazıcının maliyeti, cihazın kendi fiyatının kat kat üstünde. Yedek cihaz, sigortadır.",
      },
    ],
  },

  "hotel-fb-revenue-math": {
    lead: "Restoran, bar, oda servisi ve havuz kafe dört ayrı departman değil — tek arka ofisi paylaşan dört farklı işletmedir. Muhasebenin bunu neden yansıtması gerektiğini anlatıyoruz.",
    blocks: [
      {
        kind: "p",
        text: "Otel F&B raporlarında en sık gördüğümüz hata, dört gelir noktasını tek bir \"yiyecek-içecek\" satırında toplamak. Bu satır teknik olarak doğrudur ve operasyonel olarak hiçbir işe yaramaz.",
      },
      { kind: "h2", text: "Dört farklı işletme, dört farklı ekonomi" },
      {
        kind: "ul",
        items: [
          "Restoran: yüksek personel maliyeti, yüksek sepet, öngörülebilir yoğunluk.",
          "Bar: yüksek marj, düşük malzeme maliyeti, akşam yoğun.",
          "Oda servisi: en yüksek birim işçilik maliyeti, en düşük hacim.",
          "Havuz kafe: sezonluk, hava durumuna aşırı duyarlı, düşük sepet yüksek frekans.",
        ],
      },
      {
        kind: "p",
        text: "Bu dördünü tek satırda topladığınızda ortaya çıkan marj, hiçbirinin gerçek marjı değildir. Kararı bu ortalamaya göre verdiğinizde, genellikle en kârlı noktayı sübvanse edip en zararlıyı büyütürsünüz.",
      },
      { kind: "h2", text: "Her şey dahil sistemin özel durumu" },
      {
        kind: "p",
        text: "Her şey dahil işletmelerde gelir zaten oda fiyatına gömülüdür ve gelir merkezi ayrımı anlamsız görünür. Aslında tam tersi: gelir yoksa da maliyet vardır ve tüketimi noktaya göre ayırmadan hangi noktanın oda başına maliyeti şişirdiğini göremezsiniz.",
      },
      {
        kind: "stats",
        items: [
          { value: "4", label: "ayrılması gereken gelir merkezi" },
          { value: "3,4x", label: "oda servisi ile bar arasındaki birim işçilik farkı" },
          { value: "%18", label: "ayrım sonrası tespit edilen ortalama marj sapması" },
        ],
      },
      { kind: "h2", text: "Uygulama sırası" },
      {
        kind: "ol",
        items: [
          "Her fiziksel noktayı ayrı gelir merkezi olarak tanımlayın.",
          "Personeli gelir merkezine bağlayın — vardiya bazında değişse bile.",
          "Transfer (barın restorana gönderdiği içecek) için ayrı bir hareket tipi kurun.",
          "Her şey dahil tüketimini gelir değil, maliyet hareketi olarak kaydedin.",
          "Aylık raporu dört ayrı P&L olarak okuyun; toplamı en son bakın.",
        ],
      },
      {
        kind: "callout",
        text: "Transfer hareketini modellemezseniz barın maliyeti şişer, restoranın marjı olduğundan iyi görünür. Otel F&B raporlarındaki en yaygın çarpıtma budur.",
      },
    ],
  },
};

/**
 * Falls back to the Turkish body when an English one is missing, so adding a
 * post to `blog.ts` can never 404 the /en route — it just reads untranslated
 * until `blog-content.en.ts` catches up.
 */
export function getArticle(slug: string, locale: Locale): ArticleBody | undefined {
  if (locale === "en") return BLOG_CONTENT_EN[slug] ?? BLOG_CONTENT[slug];
  return BLOG_CONTENT[slug];
}
