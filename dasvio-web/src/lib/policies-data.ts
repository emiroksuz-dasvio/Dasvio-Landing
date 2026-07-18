export type PolicyBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "kv"; items: [string, string][] }
  | { kind: "callout"; text: string; tone?: "info" | "warn" }
  | { kind: "table"; headers: [string, string]; rows: [string, string][] };

export type PolicySection = {
  n: number;
  title: string;
  blocks: PolicyBlock[];
};

export type Policy = {
  slug: string;
  title: string;
  short: string;
  description: string;
  lastUpdated: string;
  sections: PolicySection[];
};

const COMPANY_KV: [string, string][] = [
  ["Unvan", "DAS BİLGİSAYAR YAZILIM VE İNTERNET SATIŞ A.Ş."],
  ["VKN", "2701341846"],
  ["Vergi Dairesi", "Küçükköy V.D."],
  [
    "Adres",
    "Barbaros Hayrettin Paşa Mah. Şehit Mustafa Yeşil Cad. Poligon İş Hanı No:1, D:10, Gaziosmanpaşa / İstanbul, 34275",
  ],
  ["E-posta", "legal@dasvio.com"],
  ["Web", "www.dasvio.com"],
];

const GIZLILIK: Policy = {
  slug: "gizlilik-sozlesmesi",
  title: "Gizlilik Sözleşmesi",
  short: "Gizlilik",
  description:
    "Kişisel verilerinizin nasıl toplandığı, işlendiği, saklandığı ve korunduğu.",
  lastUpdated: "02 Aralık 2024",
  sections: [
    {
      n: 1,
      title: "Giriş",
      blocks: [
        {
          kind: "p",
          text: 'DAS BİLGİSAYAR YAZILIM VE İNTERNET SATIŞ A.Ş. ("Dasvio", "Şirket", "biz") olarak, gizliliğinize saygı duyuyor ve kişisel verilerinizin korunmasını en üst düzeyde önemsiyoruz.',
        },
        {
          kind: "p",
          text: "Bu Gizlilik Sözleşmesi, Dasvio platformunu (web sitesi, mobil uygulamalar ve ilgili hizmetler) kullandığınızda kişisel verilerinizin nasıl toplandığını, işlendiğini, saklandığını ve korunduğunu açıklamaktadır.",
        },
        {
          kind: "p",
          text: "Hizmetlerimizi kullanarak bu Gizlilik Sözleşmesi'ni kabul etmiş sayılırsınız.",
        },
      ],
    },
    {
      n: 2,
      title: "Veri Sorumlusu",
      blocks: [
        {
          kind: "p",
          text: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu:",
        },
        { kind: "kv", items: COMPANY_KV },
      ],
    },
    {
      n: 3,
      title: "Toplanan Kişisel Veriler",
      blocks: [
        {
          kind: "p",
          text: "Hizmetlerimizi kullanırken aşağıdaki kategorilerde kişisel verileriniz toplanabilir:",
        },
        { kind: "h3", text: "A. Kimlik Bilgileri" },
        {
          kind: "ul",
          items: [
            "Ad, soyad",
            "T.C. Kimlik Numarası (yalnızca fatura işlemleri için)",
            "Unvan (işletme sahipleri için)",
          ],
        },
        { kind: "h3", text: "B. İletişim Bilgileri" },
        {
          kind: "ul",
          items: ["E-posta adresi", "Telefon numarası", "İşletme adresi"],
        },
        { kind: "h3", text: "C. İşletme Bilgileri" },
        {
          kind: "ul",
          items: [
            "İşletme adı ve türü",
            "Vergi kimlik numarası",
            "Ticari unvan",
          ],
        },
        { kind: "h3", text: "D. Teknik Veriler" },
        {
          kind: "ul",
          items: [
            "IP adresi",
            "Tarayıcı türü ve sürümü",
            "Cihaz bilgileri",
            "Oturum bilgileri ve loglar",
          ],
        },
        { kind: "h3", text: "E. İşlem Verileri" },
        {
          kind: "ul",
          items: [
            "Sipariş ve rezervasyon geçmişi",
            "Ödeme işlem kayıtları (kart numarası saklanmaz)",
            "Platform kullanım verileri",
          ],
        },
      ],
    },
    {
      n: 4,
      title: "Verilerin Toplanma Yöntemleri",
      blocks: [
        {
          kind: "p",
          text: "Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:",
        },
        {
          kind: "ul",
          items: [
            "Doğrudan sizden: Kayıt formları, iletişim formları, telefon görüşmeleri",
            "Otomatik olarak: Web sitesi ve uygulama kullanımı sırasında (çerezler, log kayıtları)",
            "Üçüncü taraflardan: Ödeme sağlayıcıları, iş ortakları",
          ],
        },
      ],
    },
    {
      n: 5,
      title: "Verilerin İşlenme Amaçları",
      blocks: [
        {
          kind: "p",
          text: "Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:",
        },
        {
          kind: "ul",
          items: [
            "Hizmetlerin sunulması ve yönetimi",
            "Kullanıcı hesabı oluşturma ve kimlik doğrulama",
            "Sipariş, rezervasyon ve ödeme işlemlerinin gerçekleştirilmesi",
            "Müşteri desteği sağlanması",
            "Faturalama ve muhasebe işlemleri",
            "Yasal yükümlülüklerin yerine getirilmesi",
            "Sistem güvenliğinin sağlanması",
            "Hizmet kalitesinin iyileştirilmesi",
            "İstatistiksel analizler (anonimleştirilmiş)",
          ],
        },
        {
          kind: "callout",
          text: "Önemli: Pazarlama amaçlı iletişim yalnızca açık rızanız ile yapılır.",
        },
      ],
    },
    {
      n: 6,
      title: "Verilerin Hukuki Sebepleri",
      blocks: [
        {
          kind: "p",
          text: "KVKK'nın 5. maddesi uyarınca kişisel verileriniz aşağıdaki hukuki sebeplere dayanarak işlenmektedir:",
        },
        {
          kind: "ul",
          items: [
            "Sözleşmenin ifası: Hizmet sunumu, ödeme işlemleri",
            "Kanuni yükümlülük: Vergi mevzuatı, ticari defter tutma",
            "Meşru menfaat: Güvenlik, hizmet iyileştirme, dolandırıcılık önleme",
            "Açık rıza: Pazarlama iletişimi, özel kampanyalar",
          ],
        },
      ],
    },
    {
      n: 7,
      title: "Verilerin Aktarılması",
      blocks: [
        {
          kind: "p",
          text: "Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerine uygun olarak aşağıdaki taraflara aktarılabilir:",
        },
        { kind: "h3", text: "Yurt İçi Aktarımlar:" },
        {
          kind: "ul",
          items: [
            "Ödeme kuruluşları (PCI DSS uyumlu)",
            "Yasal merciler (mahkeme kararı ile)",
            "İş ortakları ve tedarikçiler (gizlilik sözleşmesi kapsamında)",
          ],
        },
        { kind: "h3", text: "Yurt Dışı Aktarımlar:" },
        {
          kind: "ul",
          items: [
            "Bulut altyapı sağlayıcıları (AWS, Google Cloud)",
            "WhatsApp Business API (Meta)",
            "Analitik hizmetleri",
          ],
        },
        {
          kind: "callout",
          text: "Not: Yurt dışı aktarımlar, KVKK'ya uygun veri aktarım sözleşmeleri çerçevesinde gerçekleştirilmektedir.",
        },
      ],
    },
    {
      n: 8,
      title: "Veri Güvenliği",
      blocks: [
        {
          kind: "p",
          text: "Kişisel verilerinizin güvenliği için aşağıdaki önlemler alınmaktadır:",
        },
        { kind: "h3", text: "Teknik Önlemler:" },
        {
          kind: "ul",
          items: [
            "256-bit SSL/TLS şifreleme",
            "Güvenlik duvarı (WAF) koruması",
            "Düzenli güvenlik testleri",
            "Şifrelerin tek yönlü hash ile saklanması",
            "İki faktörlü kimlik doğrulama seçeneği",
          ],
        },
        { kind: "h3", text: "İdari Önlemler:" },
        {
          kind: "ul",
          items: [
            "Çalışan gizlilik sözleşmeleri",
            "Erişim yetkilendirme sistemi",
            "Düzenli güvenlik eğitimleri",
            "Veri ihlali müdahale planı",
          ],
        },
      ],
    },
    {
      n: 9,
      title: "Verilerin Saklanma Süreleri",
      blocks: [
        {
          kind: "table",
          headers: ["Veri Türü", "Saklama Süresi"],
          rows: [
            ["Hesap bilgileri", "Hesap aktif olduğu sürece + 2 yıl"],
            ["Finansal kayıtlar", "10 yıl (Vergi Usul Kanunu)"],
            ["Log kayıtları", "2 yıl (5651 sayılı Kanun)"],
            ["Pazarlama izinleri", "İzin geri alınana kadar"],
          ],
        },
      ],
    },
    {
      n: 10,
      title: "Haklarınız",
      blocks: [
        {
          kind: "p",
          text: "KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:",
        },
        {
          kind: "ul",
          items: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
            "İşlenmişse buna ilişkin bilgi talep etme",
            "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
            "Aktarıldığı üçüncü kişileri bilme",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
            "Silinmesini veya yok edilmesini isteme",
            "Otomatik analiz sonucu aleyhinize çıkan sonuca itiraz etme",
            "Kanuna aykırı işleme sebebiyle zararınızın giderilmesini talep etme",
          ],
        },
        {
          kind: "callout",
          text: "Başvuru: Haklarınızı kullanmak için legal@dasvio.com adresine e-posta gönderebilir veya yukarıdaki adrese yazılı başvuruda bulunabilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.",
        },
      ],
    },
    {
      n: 11,
      title: "Çocukların Gizliliği",
      blocks: [
        {
          kind: "p",
          text: "Dasvio hizmetleri 18 yaş üstü kullanıcılara yöneliktir. 18 yaşından küçük kişilerden bilerek kişisel veri toplamıyoruz. Eğer 18 yaşından küçük bir kişinin verilerinin toplandığını fark ederseniz, lütfen bizimle iletişime geçin.",
        },
      ],
    },
    {
      n: 12,
      title: "Değişiklikler",
      blocks: [
        {
          kind: "p",
          text: "Bu Gizlilik Sözleşmesi'ni zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda sizi e-posta veya platform üzerinden bilgilendireceğiz.",
        },
        {
          kind: "p",
          text: "Son güncelleme tarihini bu sayfanın başında görebilirsiniz.",
        },
      ],
    },
    {
      n: 13,
      title: "İletişim",
      blocks: [
        {
          kind: "p",
          text: "Gizlilik ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:",
        },
        {
          kind: "kv",
          items: [
            ["E-posta", "legal@dasvio.com"],
            [
              "Adres",
              "Barbaros Hayrettin Paşa Mah. Şehit Mustafa Yeşil Cad. Poligon İş Hanı No:1, D:10, Gaziosmanpaşa / İstanbul, 34275",
            ],
          ],
        },
      ],
    },
  ],
};

const MESAFELI_SATIS: Policy = {
  slug: "mesafeli-satis-sozlesmesi",
  title: "Mesafeli Satış ve Kullanım Sözleşmesi",
  short: "Mesafeli Satış",
  description:
    "Abonelik, ödeme, fesih, cayma hakkı ve uyuşmazlık çözüm esasları.",
  lastUpdated: "22 Ağustos 2025",
  sections: [
    {
      n: 1,
      title: "Taraflar",
      blocks: [
        {
          kind: "p",
          text: 'Bu Mesafeli Satış ve Kullanım Sözleşmesi ("Sözleşme"),',
        },
        { kind: "h3", text: "Hizmet Sağlayıcı:" },
        {
          kind: "kv",
          items: [
            ["Unvan", "DAS BİLGİSAYAR YAZILIM VE İNTERNET SATIŞ A.Ş."],
            ["Vergi No (VKN)", "2701341846"],
            ["Vergi Dairesi", "Küçükköy V.D."],
            [
              "Adres",
              "Barbaros Hayrettin Paşa Mah. Şehit Mustafa Yeşil Cad. Poligon İş Hanı No:1, D:10, Gaziosmanpaşa / İstanbul, 34275",
            ],
            ["E-posta", "legal@dasvio.com"],
          ],
        },
        {
          kind: "p",
          text: 'ile, Dasvio paneline üye olan ve hizmetlerden faydalanan gerçek veya tüzel kişi ("Kullanıcı") arasında elektronik ortamda akdedilmiştir.',
        },
        { kind: "p", text: "Taraflar, işbu Sözleşme'nin şartlarını kabul eder." },
      ],
    },
    {
      n: 2,
      title: "Sözleşmenin Konusu",
      blocks: [
        {
          kind: "p",
          text: 'Bu Sözleşme, Hizmet Sağlayıcı\'nın Kullanıcı\'ya QR menü oluşturma, online rezervasyon yönetimi, CRM, WhatsApp entegrasyonu, sadakat programı ve diğer dijital hizmetleri (topluca "Hizmetler") sunmasına ilişkin şartları düzenler.',
        },
        {
          kind: "p",
          text: "Hizmetlerin kapsamı, özellikleri ve fiyatları Dasvio panelinde ve https://dasvio.com adresinde ilan edildiği gibidir.",
        },
      ],
    },
    {
      n: 3,
      title: "Abonelik Modeli ve Otomatik Yenileme",
      blocks: [
        { kind: "h3", text: "Abonelik Sistemi:" },
        {
          kind: "p",
          text: "Kullanıcı, satın aldığı paketin abonelik bazlı olduğunu, iptal edilmediği sürece belirtilen periyotlarla (aylık veya yıllık) otomatik yenileneceğini ve her yenilemede ödeme alınacağını kabul eder.",
        },
        { kind: "h3", text: "3D Secure Muafiyeti:" },
        {
          kind: "p",
          text: "İlk ödemede 3D Secure zorunludur. Yenileme ödemeleri, Visa/Mastercard MIT kuralları uyarınca 3D Secure olmadan işlenebilir. Kullanıcı, bu muafiyeti açıkça kabul eder.",
        },
        { kind: "h3", text: "Bilgilendirme:" },
        {
          kind: "p",
          text: "Yenileme öncesinde Kullanıcı, e-posta, SMS ve/veya WhatsApp yoluyla 7 ve 3 gün önce bilgilendirilecektir. Kullanıcı iptal talebini, kullanıcı panelinden veya legal@dasvio.com adresinden iletebilir.",
        },
        { kind: "h3", text: "Loglama:" },
        {
          kind: "p",
          text: "Kullanıcı'nın abonelik şartlarını ve sözleşmeyi kabul ettiği tarih, saat, kullanıcı ID'si ve IP adresi sistemde kaydedilir.",
        },
        {
          kind: "callout",
          text: 'Örn: "Kullanıcı X, 25.06.2025 18:21:34\'te abonelik şartlarını onayladı. IP: 192.168.1.1."',
        },
      ],
    },
    {
      n: 4,
      title: "Kullanım Şartları",
      blocks: [
        {
          kind: "ul",
          items: [
            "Kullanıcı, Dasvio hesabını yalnızca kendi işletmesi için kullanabilir. Hesap, üçüncü şahıslara devredilemez veya kiralanamaz.",
            "Kullanıcı, spam, yanıltıcı rezervasyon veya hukuka aykırı içerik oluşturamaz. Bu durumlarda Hizmet Sağlayıcı, hesabı askıya alma veya feshetme hakkını saklı tutar.",
            "Kullanıcı, panel şifrelerini güvenle saklamakla yükümlüdür. Paylaşım nedeniyle doğacak zararlardan Kullanıcı sorumludur.",
            "Hizmet Sağlayıcı, sistem güvenliği ve performansı için gerekli teknik güncellemeleri yapma hakkını saklı tutar.",
          ],
        },
      ],
    },
    {
      n: 5,
      title: "Ödeme ve Faturalandırma",
      blocks: [
        { kind: "h3", text: "Ödeme Şekli:" },
        {
          kind: "p",
          text: "Hizmet bedelleri, Dasvio panelinde belirtilen paketlere göre aylık veya yıllık olarak tahsil edilir. Ödemeler, kredi kartı veya banka havalesi ile PCI DSS uyumlu ödeme altyapısı üzerinden yapılır.",
        },
        { kind: "h3", text: "Otomatik Ödeme:" },
        {
          kind: "p",
          text: "Kullanıcı, aboneliğin otomatik yenileneceğini ve kartından otomatik tahsilat yapılacağını kabul eder.",
        },
        { kind: "h3", text: "Faturalar:" },
        {
          kind: "p",
          text: "Faturalar, Kullanıcı'nın panelde belirttiği e-posta adresine PDF formatında gönderilir.",
        },
        { kind: "h3", text: "Loglama:" },
        {
          kind: "p",
          text: "Her ödeme işlemi (başarılı/başarısız), tarih, saat, işlem ID'si, tutar, kullanıcı ID'si ve IP adresiyle kaydedilir.",
        },
        { kind: "h3", text: "Ödeme İtirazı (Chargeback):" },
        {
          kind: "p",
          text: "Kullanıcı'nın kötü niyetli veya haksız chargeback taleplerinde, Hizmet Sağlayıcı elektronik kayıtları (loglar, onaylar, kullanım verileri) savunma olarak kullanabilir. Haksız chargeback, hukuki işlem sebebidir.",
        },
      ],
    },
    {
      n: 6,
      title: "Cayma Hakkı, İptal ve Fesih",
      blocks: [
        { kind: "h3", text: "Aylık Abonelikler:" },
        {
          kind: "p",
          text: "Aylık paketlerde cayma hakkı bulunmaz. Kullanıcı, dilediği zaman aboneliğini iptal edebilir. İptal, bir sonraki fatura döneminden itibaren geçerlidir.",
        },
        { kind: "h3", text: "Yıllık Abonelikler:" },
        {
          kind: "p",
          text: "6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, Kullanıcı sözleşme tarihinden itibaren 14 gün içinde cayma hakkına sahiptir. Cayma talebi yazılı olarak legal@dasvio.com adresine yapılır. Cayma halinde ücret 14 iş günü içinde iade edilir.",
        },
        { kind: "h3", text: "İptal Süreci:" },
        {
          kind: 'p',
          text: 'Kullanıcı panelinde "Aboneliği İptal Et" butonu ile veya e-posta yoluyla yapılır. İptal onayı, e-posta/SMS ile bildirilir ve timestamp, kullanıcı ID\'si ve IP adresiyle loglanır.',
        },
        { kind: "h3", text: "Fesih:" },
        {
          kind: "p",
          text: "Kullanıcı'nın sözleşmeye aykırı davranması, kötüye kullanım (ör. sahte rezervasyon, haksız chargeback) halinde Hizmet Sağlayıcı hesabı feshedebilir.",
        },
        { kind: "h3", text: "Para İadesi Kısıtlaması:" },
        {
          kind: "p",
          text: "Kullanıcı, hizmetleri aktif olarak kullandıysa (örn. QR kod tarama, rezervasyon, CRM kullanımı), ilgili dönem için iade talep edemez.",
        },
      ],
    },
    {
      n: 7,
      title: "Sorumluluk Sınırlaması",
      blocks: [
        {
          kind: "ul",
          items: [
            "Hizmet Sağlayıcı, sistemin kesintisiz veya hatasız çalışacağını garanti etmez; ancak kesintilerin çözümü için makul çaba gösterir.",
            "Kullanıcı, platformda oluşturduğu içeriklerden (menü, görseller, rezervasyon verileri) bizzat sorumludur.",
          ],
        },
      ],
    },
    {
      n: 8,
      title: "Uyuşmazlık Çözümü",
      blocks: [
        {
          kind: "ul",
          items: [
            "Sözleşmeden doğacak uyuşmazlıklarda İstanbul (Merkez) Mahkemeleri ve İcra Daireleri yetkilidir.",
            "Taraflar, uyuşmazlıkları öncelikle dostane yollarla çözmeyi taahhüt eder.",
          ],
        },
      ],
    },
    {
      n: 9,
      title: "Delil Sözleşmesi",
      blocks: [
        {
          kind: "p",
          text: "Dasvio panelinde tutulan log kayıtları, e-postalar, işlem geçmişleri, IP adresleri ve onay timestamp'leri taraflar arasında kesin delil teşkil eder.",
        },
      ],
    },
    {
      n: 10,
      title: "Sözleşme Güncellemeleri",
      blocks: [
        {
          kind: "p",
          text: "Hizmet Sağlayıcı, Sözleşme'yi değiştirme hakkını saklı tutar. Değişiklikler Kullanıcı'ya e-posta, SMS veya panel bildirimi ile duyurulur. 7 gün içinde itiraz edilmezse kabul edilmiş sayılır.",
        },
      ],
    },
  ],
};

const KVKK: Policy = {
  slug: "kvkk-aydinlatma-metni",
  title: "KVKK Aydınlatma Metni",
  short: "KVKK",
  description:
    "6698 sayılı KVKK kapsamında kişisel verilerinizin işlenmesi hakkında aydınlatma.",
  lastUpdated: "22 Ağustos 2025",
  sections: [
    {
      n: 1,
      title: "Veri Sorumlusunun Kimliği",
      blocks: [
        {
          kind: "p",
          text: '6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla DAS BİLGİSAYAR YAZILIM VE İNTERNET SATIŞ A.Ş. ("Dasvio" veya "Şirket") tarafından aşağıda açıklanan kapsamda işlenebilecektir.',
        },
        { kind: "h3", text: "İletişim Bilgileri:" },
        {
          kind: "kv",
          items: [
            ["Web", "www.dasvio.com"],
            ["E-posta", "legal@dasvio.com"],
          ],
        },
      ],
    },
    {
      n: 2,
      title: "İşlenen Kişisel Veriler",
      blocks: [
        {
          kind: "p",
          text: "Dasvio Restoran Yönetim Sistemi kapsamında aşağıdaki kişisel verileriniz işlenmektedir:",
        },
        { kind: "h3", text: "A. İşletme Sahipleri/Yetkilileri İçin:" },
        {
          kind: "ul",
          items: [
            "Kimlik Verileri (Ad-soyad, unvan)",
            "İletişim Verileri (Telefon, e-posta, adres)",
            "Kurumsal Veriler (Vergi no, işletme adı)",
            "Güvenlik Verileri (Kullanıcı adı, şifre)",
            "İşlem Güvenliği (IP, loglar)",
          ],
        },
        { kind: "h3", text: "B. Restoran Müşterileri İçin:" },
        {
          kind: "ul",
          items: [
            "Kimlik Verileri (Ad-soyad)",
            "İletişim Verileri (Telefon, e-posta)",
            "Müşteri İşlem Verileri (Sipariş geçmişi, notlar)",
            "Finansal Veriler (Ödeme bilgileri)",
          ],
        },
      ],
    },
    {
      n: 3,
      title: "Kişisel Verilerin İşlenme Amaçları",
      blocks: [
        {
          kind: "p",
          text: "Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:",
        },
        {
          kind: "ul",
          items: [
            "Dasvio restoran yönetim sistemi hizmetlerinin sunulması ve yönetimi",
            "Kullanıcı hesabı oluşturulması, yetkilendirme ve kimlik doğrulama işlemleri",
            "Müşteri ilişkileri yönetimi ve müşteri memnuniyetinin sağlanması",
            "Sipariş, rezervasyon ve ödeme süreçlerinin yönetimi",
            "Faturalama ve muhasebe işlemlerinin gerçekleştirilmesi",
            "Yasal yükümlülüklerin yerine getirilmesi (vergi mevzuatı, ticari defter tutma vb.)",
            "Sistem güvenliğinin sağlanması ve yetkisiz erişimlerin engellenmesi",
            "İstatistiksel analizler ve raporlama",
            "Ürün ve hizmetlerin geliştirilmesi, iyileştirilmesi",
            "Müşteri segmentasyonu ve kişiselleştirilmiş hizmet sunumu",
            "Teknik destek hizmetlerinin sağlanması",
            "İletişim faaliyetlerinin yürütülmesi",
          ],
        },
      ],
    },
    {
      n: 4,
      title: "Kişisel Verilerin İşlenmesinin Hukuki Sebepleri",
      blocks: [
        {
          kind: "p",
          text: "Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanarak işlenmektedir:",
        },
        {
          kind: "ul",
          items: [
            "KVKK Madde 5/2-c - Sözleşmenin kurulması ve ifası: Dasvio hizmetlerinin sunulması, ödeme işlemlerinin gerçekleştirilmesi",
            "KVKK Madde 5/2-ç - Kanuni yükümlülük: Vergi mevzuatı, muhasebe kayıtları",
            "KVKK Madde 5/2-f - Meşru menfaat: Sistem güvenliği, IP loglama, hizmet kalitesinin artırılması",
            "KVKK Madde 5/1 - Açık rıza: Pazarlama faaliyetleri, özel kampanya duyuruları",
          ],
        },
        {
          kind: "callout",
          text: "Not: Açık rızanızı geri almak istediğinizde, legal@dasvio.com adresine e-posta göndererek talebinizi iletebilirsiniz.",
        },
      ],
    },
    {
      n: 5,
      title: "Kişisel Verilerin Toplanma Yöntemleri",
      blocks: [
        {
          kind: "p",
          text: "Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:",
        },
        {
          kind: "ul",
          items: [
            "Dasvio web platformu ve mobil uygulamalar üzerinden",
            "Kayıt formları ve kullanıcı panelleri aracılığıyla",
            "E-posta, telefon ve diğer iletişim kanalları ile",
            "Otomatik sistemler (log kayıtları, çerezler) vasıtasıyla",
            "İş ortaklarımız ve entegre sistemler üzerinden",
          ],
        },
      ],
    },
    {
      n: 6,
      title: "Kişisel Verilerin Aktarılması",
      blocks: [
        {
          kind: "p",
          text: "Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerine uygun olarak aşağıdaki taraflara aktarılabilir:",
        },
        { kind: "h3", text: "Yurt İçi Veri Aktarımları:" },
        {
          kind: "ul",
          items: [
            "Restoran İşletmecileri: Hizmet sunumu kapsamında",
            "Yazılım Geliştirme Firmaları: Teknik destek",
            "Sunucu Sağlayıcıları: Veri barındırma",
            "Ödeme Altyapı Sağlayıcıları: PayTR, İyzico vb.",
            "Hukuk Büroları ve Kamu Kurumları: Yasal süreçler",
          ],
        },
        { kind: "h3", text: "Yurt Dışı Veri Aktarımları:" },
        {
          kind: "ul",
          items: [
            "Meta (WhatsApp Business API)",
            "Google (Analytics, Cloud)",
            "Twilio (SMS)",
            "Amazon Web Services (AWS)",
            "Cloudflare (CDN)",
          ],
        },
        {
          kind: "callout",
          text: "Önemli Not: Yurt dışı veri aktarımları, KVKK'ya uygun veri aktarım sözleşmeleri çerçevesinde gerçekleştirilmektedir.",
        },
      ],
    },
    {
      n: 7,
      title: "Veri Güvenliği",
      blocks: [
        {
          kind: "p",
          text: "Şirketimiz, kişisel verilerinizin güvenliğini sağlamak için en yüksek güvenlik standartlarını uygulamaktadır:",
        },
        { kind: "h3", text: "Teknik Güvenlik Önlemleri:" },
        {
          kind: "ul",
          items: [
            "256-bit SSL/TLS şifreleme",
            "PCI DSS uyumlu ödeme altyapısı",
            "WAF koruması ve DDoS önleme",
            "Düzenli güvenlik testleri",
            "IP bazlı erişim kontrolü",
          ],
        },
        { kind: "h3", text: "İdari Güvenlik Önlemleri:" },
        {
          kind: "ul",
          items: [
            "Çalışan eğitimleri",
            "Gizlilik sözleşmeleri (NDA)",
            "Erişim yetkilendirme",
            "İki faktörlü kimlik doğrulama (2FA)",
          ],
        },
      ],
    },
    {
      n: 8,
      title: "Kişisel Verilerin Saklanma Süreleri",
      blocks: [
        {
          kind: "table",
          headers: ["Veri Kategorisi", "Saklama Süresi"],
          rows: [
            ["İşletme Kayıt Verileri", "Sözleşme süresince + 10 yıl"],
            ["Müşteri Verileri", "İlişki süresince + 2 yıl"],
            ["Finansal Veriler", "10 yıl"],
            ["Pazarlama Verileri", "Açık rıza süresince + 1 yıl"],
            ["Log Kayıtları", "2 yıl"],
          ],
        },
      ],
    },
    {
      n: 9,
      title: "Kişisel Veri Sahibinin Hakları",
      blocks: [
        {
          kind: "p",
          text: "KVKK'nın 11. maddesi uyarınca sahip olduğunuz haklar:",
        },
        {
          kind: "ul",
          items: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
            "İşlenmişse buna ilişkin bilgi talep etme",
            "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
            "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
            "KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
            "Düzeltme/silme/yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme",
            "Otomatik sistemlerle analiz edilmesi sonucu aleyhinize çıkan sonuca itiraz etme",
            "Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme",
          ],
        },
      ],
    },
    {
      n: 10,
      title: "Haklarınızı Nasıl Kullanabilirsiniz?",
      blocks: [
        { kind: "p", text: "Yukarıda belirtilen haklarınızı kullanmak için:" },
        {
          kind: "ul",
          items: [
            "E-posta: legal@dasvio.com adresine kayıtlı e-posta adresinizden",
            "Web Sitesi: www.dasvio.com üzerindeki başvuru formu ile",
            "Posta: Noter kanalıyla veya iadeli taahhütlü mektupla",
          ],
        },
        {
          kind: "p",
          text: "Başvurularınız, talebinizin niteliğine göre en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılacaktır.",
        },
      ],
    },
    {
      n: 11,
      title: "Veri Sorumlusu ve Veri İşleyen İlişkisi",
      blocks: [
        { kind: "p", text: "Dasvio sisteminde:" },
        {
          kind: "ul",
          items: [
            "DAS BİLGİSAYAR YAZILIM VE İNTERNET SATIŞ A.Ş. hem veri sorumlusu hem de veri işleyen",
            "Restoran İşletmecileri kendi müşterilerinin verileri için veri sorumlusu",
          ],
        },
        {
          kind: "p",
          text: "konumundadır. Her iki taraf da KVKK kapsamındaki yükümlülüklerini bağımsız olarak yerine getirmekle sorumludur.",
        },
      ],
    },
    {
      n: 12,
      title: "Çerezler ve Benzeri Teknolojiler",
      blocks: [
        {
          kind: "p",
          text: "Web sitemizde ve uygulamalarımızda çerezler kullanılmaktadır. Detaylı bilgi için www.dasvio.com adresindeki Çerez Politikamızı inceleyebilirsiniz.",
        },
      ],
    },
    {
      n: 13,
      title: "Yürürlük",
      blocks: [
        {
          kind: "p",
          text: "Bu aydınlatma metni 22 Ağustos 2025 tarihinde yürürlüğe girmiştir. Şirketimiz, KVKK ve ilgili mevzuatta yapılacak değişiklikler doğrultusunda bu metni güncelleme hakkını saklı tutar.",
        },
        { kind: "p", text: "DAS BİLGİSAYAR YAZILIM VE İNTERNET SATIŞ A.Ş." },
      ],
    },
  ],
};

const KULLANIM_KOSULLARI: Policy = {
  slug: "kullanim-kosullari",
  title: "Kullanım Koşulları",
  short: "Kullanım",
  description:
    "Platforma erişim, abonelik, fikri mülkiyet, sorumluluk ve fesih esasları.",
  lastUpdated: "22 Ağustos 2025",
  sections: [
    {
      n: 1,
      title: "Tanımlar",
      blocks: [
        {
          kind: "ul",
          items: [
            "Platform / Dasvio: Şirket tarafından sunulan çok kiracılı (multi-tenant) restoran yönetim sistemi.",
            "Kullanıcı: Platforma üye olan veya Platformu kullanan gerçek/tüzel kişi.",
            "Üyelik / Hesap: Kullanıcının Platforma erişimi için oluşturduğu kayıt.",
            "Abonelik: Aylık/yıllık ücret karşılığı sağlanan paket bazlı kullanım modeli.",
            "İçerik: Kullanıcı tarafından oluşturulan menü, görsel, metin, müşteri verileri vb.",
          ],
        },
      ],
    },
    {
      n: 2,
      title: "Sözleşmenin Konusu ve Kapsamı",
      blocks: [
        {
          kind: "p",
          text: "Bu Sözleşme; Platforma erişim, kullanım koşulları, abonelik ve ödeme şartları, veri koruma ve gizlilik, fikri mülkiyet, sorumluluk, fesih ve uyuşmazlık çözüm esaslarını düzenler.",
        },
      ],
    },
    {
      n: 3,
      title: "Hesap Oluşturma, Yetkilendirme ve Uygunluk",
      blocks: [
        {
          kind: "ul",
          items: [
            "Kullanıcı, kayıt sırasında verdiği bilgilerin doğru, güncel ve eksiksiz olduğunu beyan eder.",
            "Kurumsal üyeliklerde, hesabı oluşturan kişi, şirket adına hareket etmeye yetkili olduğunu taahhüt eder.",
            "Hesap kimlik bilgileri ve şifrelerin gizliliği Kullanıcı sorumluluğundadır.",
          ],
        },
      ],
    },
    {
      n: 4,
      title: "Hizmetler ve Değişiklik Hakkı",
      blocks: [
        {
          kind: "ul",
          items: [
            "Hizmetlerin kapsamı panelde ve dasvio.com'da sunulduğu gibidir.",
            "Ücretli paketlerde esaslı değişiklik veya fiyat artışı söz konusu olduğunda, değişiklikler yürürlükten en az 7 gün önce bildirilir.",
          ],
        },
      ],
    },
    {
      n: 5,
      title: "Abonelik, Planlar, Deneme ve Otomatik Yenileme",
      blocks: [
        {
          kind: "ul",
          items: [
            "Abonelik paketleri aylık veya yıllık olabilir. Aksi belirtilmedikçe abonelik otomatik yenilenir.",
            "İlk ödemede 3D Secure doğrulaması aranır; yenileme tahsilatları 3D Secure olmadan gerçekleştirilebilir.",
            "İptal, panelden veya legal@dasvio.com'a yazılı bildirimle gerçekleştirilebilir.",
          ],
        },
      ],
    },
    {
      n: 6,
      title: "Ödeme, Fiyatlandırma, Vergiler ve Faturalandırma",
      blocks: [
        {
          kind: "ul",
          items: [
            "Ücretler panelde ilan edilir; vergiler ayrıca yansıtılır.",
            "Ödemeler kredi kartı veya banka transferi ile PCI DSS uyumlu altyapı üzerinden tahsil edilir.",
            "Faturalar PDF olarak gönderilir.",
          ],
        },
      ],
    },
    {
      n: 7,
      title: "Kullanım Kuralları (Acceptable Use)",
      blocks: [
        {
          kind: "ul",
          items: [
            "Hesap, yalnızca Kullanıcı'nın kendi işletmesi için kullanılabilir.",
            "Platformda hukuka aykırı içerik, spam, yanıltıcı rezervasyon üretilemez.",
            "Sistem bütünlüğünü zayıflatacak test, sızma, scraping yapılamaz.",
          ],
        },
      ],
    },
    {
      n: 8,
      title: "Fikri Mülkiyet Hakları",
      blocks: [
        {
          kind: "ul",
          items: [
            "Platform, yazılım ve tasarımların tüm hakları Şirket'e aittir.",
            "Kullanıcı, Platformu yalnızca sözleşme kapsamında kullanabilir.",
            "Kullanıcı İçeriklerinin mülkiyeti Kullanıcı'ya aittir.",
          ],
        },
      ],
    },
    {
      n: 9,
      title: "Gizlilik ve KVKK",
      blocks: [
        {
          kind: "p",
          text: "Şirket, KVKK ve ilgili mevzuata uygun hareket eder. Detaylar KVKK Aydınlatma Metni'nde yer alır.",
        },
      ],
    },
    {
      n: 10,
      title: "Sorumluluk Reddi",
      blocks: [
        {
          kind: "ul",
          items: [
            'Platform "olduğu gibi" sunulur; kesintisizlik garantisi verilmez.',
            "Şirket; dolaylı, arızi veya sonuçsal zararlardan sorumlu değildir.",
          ],
        },
      ],
    },
    {
      n: 11,
      title: "Tazminat",
      blocks: [
        {
          kind: "p",
          text: "Kullanıcı; bu Sözleşme'ye aykırı kullanımından kaynaklanan zararlar için Şirket'i tazmin etmeyi kabul eder.",
        },
      ],
    },
    {
      n: 12,
      title: "Mücbir Sebep",
      blocks: [
        {
          kind: "p",
          text: "Doğal afet, savaş, altyapı kesintileri gibi mücbir sebeplerden Şirket sorumlu tutulamaz.",
        },
      ],
    },
    {
      n: 13,
      title: "Devir, Bölünebilirlik ve Feragat",
      blocks: [
        {
          kind: "ul",
          items: [
            "Şirket, Sözleşme'yi devredebilir. Kullanıcı izinsiz devredemez.",
            "Herhangi bir hükmün geçersizliği diğer hükümleri etkilemez.",
          ],
        },
      ],
    },
    {
      n: 14,
      title: "Uyuşmazlık Çözümü",
      blocks: [
        {
          kind: "p",
          text: "Uyuşmazlıklarda İstanbul (Merkez) Mahkemeleri yetkilidir.",
        },
      ],
    },
    {
      n: 15,
      title: "Şirket Bilgileri",
      blocks: [
        {
          kind: "kv",
          items: [
            ["Unvan", "DAS BİLGİSAYAR YAZILIM VE İNTERNET SATIŞ A.Ş."],
            ["VKN", "2701341846"],
            ["Adres", "Gaziosmanpaşa / İstanbul"],
            ["E-posta", "legal@dasvio.com"],
          ],
        },
      ],
    },
  ],
};

export const POLICIES: Policy[] = [
  GIZLILIK,
  MESAFELI_SATIS,
  KVKK,
  KULLANIM_KOSULLARI,
];

export function getPolicyBySlug(slug: string): Policy | undefined {
  return POLICIES.find((p) => p.slug === slug);
}
