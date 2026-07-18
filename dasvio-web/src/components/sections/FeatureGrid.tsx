"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  QrCode,
  Cpu,
  Building2,
  Plug,
  BarChart3,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
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

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
};

type FeaturesDict = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FeatureItem[];
};

type ProblemDict = {
  eyebrow: string;
  title: string;
  body: string;
};

const iconMap: Record<string, LucideIcon> = {
  qr: QrCode,
  pos: Cpu,
  branch: Building2,
  plug: Plug,
  chart: BarChart3,
  screen: MonitorPlay,
};

type SubCard = {
  title: string;
  body: string;
  Visual: () => React.ReactElement;
};

const subCardsMap: Record<string, SubCard[]> = {
  qr: [
    {
      Visual: LangChips,
      title: "AI çeviri, 14 dil",
      body: "Menünüzün tamamını tek tıkla çevirin. İstediğiniz metni manuel düzenleyin — Dasvio AI geri kalanını senkronize tutar.",
    },
    {
      Visual: ThemeSwatches,
      title: "Tema & marka kontrolü",
      body: "Renk, tipografi, düzen ve spotlight'ları panelden ayarlayın. Yayınlamadan önce gerçek cihazda önizleyin.",
    },
    {
      Visual: QrTablePreview,
      title: "Masa bazlı QR akışı",
      body: "Her masanın kendine özel QR'ı var. Misafirler göz atar, özelleştirir ve sipariş verir — siparişler anında POS'unuza düşer.",
    },
    {
      Visual: SpotlightBanner,
      title: "Spotlight & kampanyalar",
      body: "Haftalık özel veya sezonluk komboyu menünün üst kısmında öne çıkarın. Zamanlayın, şubeye göre hedefleyin, A/B test edin.",
    },
  ],
  pos: [
    {
      Visual: DeviceSync,
      title: "Çoklu cihaz senkronaizasyonu",
      body: "Tabletler, terminaller, mobil POS — hepsi gerçek zamanlı senkronize. Bir cihazda açtığınız siparişi diğerinden kapatın.",
    },
    {
      Visual: ReceiptSlip,
      title: "Mutfak & fiş yazdırma",
      body: "Ürünleri istasyona göre doğru mutfağa yönlendirin. Fiş şablonlarını şube bazında özelleştirin.",
    },
    {
      Visual: RevenueDonut,
      title: "Gelir merkezleri",
      body: "Masaiçi, gel-al, teslimat ve bar gelirini kendi vergi, yazıcı ve raporlama kurallarıyla ayırın.",
    },
    {
      Visual: ClockFace,
      title: "Çalışma saatleri & vardiyalar",
      body: "Şube ve kanal bazında saatleri tanımlayın. POS'u mesai dışında kilitleyin, vardiyaları ve PIN'leri yönetin.",
    },
  ],
  branch: [
    {
      Visual: NetworkNodes,
      title: "Merkezi master menü",
      body: "Tek kaynak. Master menüyü düzenleyin — değişiklikler seçili şubelere belirlediğiniz sıklıkta yayılır.",
    },
    {
      Visual: OverrideMatrix,
      title: "Şube bazlı override",
      body: "Herhangi bir şubede fiyatı, varyantı, uygunluğu veya görseli master'a dokunmadan override edin.",
    },
    {
      Visual: TierBadges,
      title: "Bölgesel fiyat tier'ları",
      body: "Şubeleri tier'lara gruplandırın. Havalimanında premium, banliyöde indirimli fiyat — otomatik olarak.",
    },
    {
      Visual: ScheduleCalendar,
      title: "Menü zamanlama & klonlama",
      body: "Menüleri belirli saatlerde geçiş yapacak şekilde zamanlayın. Tüm bir yapıyı şubeler arasında saniyeler içinde klonlayın.",
    },
  ],
  plug: [
    {
      Visual: CatalogMap,
      title: "Katalog eşleştirme, bir kez",
      body: "Ürünlerinizi, kategorilerinizi ve modifier'ları platform karşılıklarıyla bir kez eşleştirin. Her şey sonsuza kadar senkronize kalır.",
    },
    {
      Visual: PricingSheet,
      title: "Toplu platform fiyatlandırması",
      body: "Getir, Trendyol ve Yemeksepeti'ndeki fiyatları tek bir tablo görünümünde güncelleyin. Platform bazlı marj desteği.",
    },
    {
      Visual: ReviewBubbles,
      title: "Yorum & claim gelen kutusu",
      body: "Platform yorumlarına tek gelen kutusundan yanıtlayın. Trendyol claim'lerini doğrudan onaylayın, reddedin veya iletin.",
    },
    {
      Visual: StatusToggles,
      title: "Canlı durum kontrolü",
      body: "Restoran yoğunluğunu, kurye durumunu veya her platformdaki açık/kapalı durumunu tek düğmeden değiştirin.",
    },
  ],
  chart: [
    {
      Visual: HeatmapMini,
      title: "Saatlik satış heatmap'i",
      body: "Gün ve saatler genelindeki pik ve düşükleri görün. Promosyon veya ekstra personel zamanlamasını belirleyin.",
    },
    {
      Visual: ComparisonBars,
      title: "Şube & kanal karşılaştırması",
      body: "Şubeleri yan yana karşılaştırın. Geliri masaiçi, teslimat, online veya başka herhangi bir kanala göre dilimleyin.",
    },
    {
      Visual: PaymentDonut,
      title: "Ödeme & ürün mix'i",
      body: "Kart - nakit - online dağılımı. En çok satanlar, kategori performansı, modifier kullanımı — hepsi detaylandırılabilir.",
    },
    {
      Visual: CompChart,
      title: "İkram/iptal takibi",
      body: "Şube ve vardiya bazında ikram ve iptal oranlarını takip edin. Yönetim dikkatine giren örüntüleri işaretleyin.",
    },
  ],
  screen: [
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
      body: "Kasayı misafir ekranına yansıtın. Sipariş özeti, bahşiş bildirimi ve markalama gösterin.",
    },
    {
      Visual: PushScreens,
      title: "Gerçek zamanlı güncelleme",
      body: "İçeriği saniyeler içinde tüm ekranlarda güncelleyin. Yanlış içerik gösteren ekranı uzaktan çevrimdışı alın.",
    },
  ],
};

const visualMap: Record<string, () => React.ReactElement> = {
  qr: QrVisual,
  pos: PosVisual,
  branch: BranchVisual,
  plug: IntegrationsVisual,
  chart: AnalyticsVisual,
  screen: SignageVisual,
};

export function FeatureGrid({
  t,
  problem,
}: {
  t: FeaturesDict;
  problem: ProblemDict;
}) {
  const [active, setActive] = useState(0);
  const current = t.items[active];
  const Visual = visualMap[current.icon];
  const subs = subCardsMap[current.icon] ?? [];

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 5%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(circle at 85% 95%, rgba(255,255,255,0.1), transparent 45%)",
        }}
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {problem.eyebrow}
            </div>
            <h2 className="text-balance mt-5 text-[32px] sm:text-[40px] lg:text-[48px] font-light leading-[1.05] tracking-[-0.02em]">
              {problem.title}
            </h2>
            <p className="mt-5 text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
              {problem.body}
            </p>
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.eyebrow}
            </div>
            <h2 className="text-balance mt-5 text-[32px] sm:text-[40px] lg:text-[48px] font-light leading-[1.05] tracking-[-0.02em]">
              {t.title}
            </h2>
            <p className="mt-5 text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-2 justify-center">
          {t.items.map((item, i) => {
            const isActive = i === active;
            const Icon = iconMap[item.icon] ?? QrCode;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                className={clsx(
                  "inline-flex items-center gap-2 h-11 px-5 rounded-lg border text-[14.5px] font-medium transition",
                  isActive
                    ? "bg-accent text-accent-fg border-accent shadow-[0_2px_12px_rgba(244,63,94,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
                    : "bg-[rgba(244,63,94,0.06)] text-fg-muted border-[rgba(244,63,94,0.18)] hover:text-fg hover:bg-[rgba(244,63,94,0.12)] hover:border-[rgba(244,63,94,0.35)] backdrop-blur-sm",
                )}
              >
                <Icon className="size-4" strokeWidth={2} />
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="mt-12 lg:mt-16 rounded-2xl liquid-glass p-8 lg:p-14 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="rounded-xl mockup-container p-6 lg:p-10 flex items-center justify-center min-h-[440px] lg:min-h-[560px]">
            {Visual && <Visual />}
          </div>
          <div>
            <h3 className="text-[32px] lg:text-[52px] xl:text-[60px] font-light tracking-tight leading-[1.02] text-pretty">
              {current.title}
            </h3>
            <p className="mt-6 text-[16px] lg:text-[19px] leading-[1.6] text-fg-muted text-pretty">
              {current.description}
            </p>
            <div className="mt-9 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
              Özellikler
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {current.tags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-lg liquid-glass-sm px-4 py-2"
                >
                  <span className="size-1.5 rounded-full bg-accent" />
                  <div className="text-[13.5px] font-medium text-fg">{tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {subs.map((sc) => (
            <div
              key={sc.title}
              className="rounded-2xl liquid-glass p-7 lg:p-9 flex flex-col hover:-translate-y-1.5 hover:border-[rgba(244,63,94,0.4)] hover:shadow-[0_28px_60px_rgba(244,63,94,0.2)] transition-all duration-500"
            >
              <div className="rounded-2xl mockup-container p-5 min-h-[220px] flex items-center justify-center">
                <sc.Visual />
              </div>
              <h4 className="mt-7 text-[19px] lg:text-[21px] font-medium tracking-tight text-pretty">
                {sc.title}
              </h4>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-fg-muted text-pretty">
                {sc.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
