import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, FileText, HelpCircle, Code2, Newspaper, GraduationCap, ArrowRight } from "lucide-react";
import { hasLocale, type Locale } from "@/i18n/config";
import { Container } from "@/components/ui/Container";

const resourceCards = [
  {
    Icon: Newspaper,
    label: "Blog",
    title: "Ürün güncellemeleri & sektör trendleri",
    body: "Dasvio ekibinden son sürümler, restoran-teknoloji analizleri ve mühendislik yazıları.",
    cta: "Blogu oku",
    href: "/blog",
  },
  {
    Icon: BookOpen,
    label: "Müşteri hikayeleri",
    title: "Gerçek restoranlar Dasvio ile nasıl çalışıyor",
    body: "Zincirlerden, fine dining mekanlardan ve cloud kitchen'lardan vaka çalışmaları — rakamlar, ekran görüntüleri ve çıkarılan dersler.",
    cta: "Hikayelere göz at",
    href: "/stories",
  },
  {
    Icon: HelpCircle,
    label: "Yardım merkezi",
    title: "Adım adım ürün kılavuzları",
    body: "Her Dasvio özelliği için hızlı yanıtlar, video anlatımlar ve ayrıntılı nasıl yapılır kılavuzları — saniyeler içinde aranabilir.",
    cta: "Yardımda ara",
    href: "/help",
  },
  {
    Icon: Code2,
    label: "API & geliştiriciler",
    title: "Dasvio platformu üzerinde geliştirin",
    body: "REST API, webhook'lar ve entegrasyon tarifleri. Stack'inizi bağlayın, özel dashboard'lar oluşturun, iş akışlarını otomatikleştirin.",
    cta: "API dokümanını oku",
    href: "/docs",
  },
  {
    Icon: FileText,
    label: "Şablonlar",
    title: "Menü, signage ve raporlama şablonları",
    body: "QR menüler, müşteri ekranları ve haftalık raporlar için ücretsiz başlangıç şablonları — doğrudan panelinize aktarın.",
    cta: "Şablonlara göz at",
    href: "/templates",
  },
  {
    Icon: GraduationCap,
    label: "Akademi",
    title: "Ekibinizi Dasvio'da eğitin",
    body: "Yöneticiler, mutfak personeli ve kasiyerler için kendi hızınızda eğitim programları. Sertifikasyon dahil.",
    cta: "Öğrenmeye başla",
    href: "/academy",
  },
];

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  return (
    <section className="pt-36 lg:pt-40 pb-24 lg:pb-32">
      <Container>
        <div className="max-w-3xl">
          <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            KAYNAKLAR
          </div>
          <h1 className="text-balance mt-5 text-[44px] sm:text-[60px] lg:text-[80px] font-light leading-[1.0] tracking-[-0.025em]">
            Dasvio&apos;dan daha fazlasını almak için ihtiyacınız olan her şey.
          </h1>
          <p className="mt-6 text-[16px] lg:text-[18px] leading-[1.6] text-fg-muted text-pretty">
            Kılavuzlar, vaka çalışmaları, API dokümanları ve ekip eğitimi — restoranınızın daha hızlı ilerlemesine yardımcı olacak tüm materyaller.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourceCards.map((r) => (
            <Link
              key={r.title}
              href={`/${locale}${r.href}`}
              className="rounded-2xl border border-white/10 bg-bg-subtle p-7 hover:border-white/25 hover:bg-white/[0.03] transition group flex flex-col"
            >
              <div className="size-11 rounded-2xl bg-accent-soft text-accent flex items-center justify-center">
                <r.Icon className="size-5" strokeWidth={2} />
              </div>
              <div className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-fg-muted">
                {r.label}
              </div>
              <h3 className="mt-2 text-[19px] font-medium tracking-tight text-fg text-pretty">
                {r.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.6] text-fg-muted text-pretty flex-1">
                {r.body}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent group-hover:gap-2.5 transition-all">
                {r.cta}
                <ArrowRight className="size-3.5" strokeWidth={2.5} />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
