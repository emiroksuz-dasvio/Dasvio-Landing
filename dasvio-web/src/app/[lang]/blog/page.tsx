import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  BLOG_POSTS,
  getFeaturedPost,
  getOtherPosts,
  formatBlogDate,
} from "@/lib/blog";
import { BlogContent } from "@/components/blog/BlogContent";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  const featured = getFeaturedPost();
  const otherPosts = getOtherPosts();

  return (
    <>
      <section className="pt-36 lg:pt-40 pb-12 lg:pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none animate-gradient-shift"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 0%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(circle at 90% 100%, #f43f5e, transparent 45%), radial-gradient(circle at 50% 50%, #06b6d4, transparent 50%)",
          }}
        />
        <Container className="relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
              <Sparkles className="size-3.5" strokeWidth={2.5} />
              Dasvio Journal
            </div>
            <h1 className="mt-6 text-balance text-[44px] sm:text-[64px] lg:text-[88px] xl:text-[104px] font-light leading-[0.96] tracking-[-0.03em]">
              Restoran teknolojisinden
              <br />
              <span className="text-accent">saha notları.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] lg:text-[19px] leading-[1.6] text-fg-muted text-pretty">
              Dasvio ekibinden ürün güncellemeleri, sektör analizleri, müşteri hikayeleri ve mühendislik derinlemeleri. Modern restoranı çalıştıran operatörler, kurucular ve şefler için yazıldı.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-fg-muted">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                {BLOG_POSTS.length} makale yayınlandı
              </span>
              <span className="size-1 rounded-full bg-fg-muted/40" />
              <span>Haftalık güncelleme</span>
              <span className="size-1 rounded-full bg-fg-muted/40" />
              <span>Bu ay 3 yeni</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <Reveal delay={150}>
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="block rounded-2xl overflow-hidden bg-bg-subtle border border-white/10 hover:border-accent/40 transition-all duration-700 group"
            >
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0 items-stretch">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden order-1 lg:order-2">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-8 lg:p-12 order-2 lg:order-1 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className="inline-flex items-center rounded-lg border px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                      style={{
                        background: `${featured.accentTint}1f`,
                        borderColor: `${featured.accentTint}66`,
                        color: featured.accentTint,
                      }}
                    >
                      ★ Öne Çıkan
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-fg-muted">
                      {featured.category}
                    </div>
                  </div>
                  <h2 className="mt-5 text-balance text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[52px] font-light leading-[1.05] tracking-[-0.02em]">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-[15px] lg:text-[16.5px] leading-[1.65] text-fg-muted text-pretty">
                    {featured.excerpt}
                  </p>
                  <div className="mt-7 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                        style={{ background: featured.author.color }}
                      >
                        {featured.author.initials}
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-fg leading-tight">
                          {featured.author.name}
                        </div>
                        <div className="text-[11.5px] text-fg-muted leading-tight mt-0.5">
                          {featured.author.role}
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-3 text-[12px] text-fg-muted">
                      <span>{formatBlogDate(featured.date)}</span>
                      <span className="hidden sm:inline-flex items-center gap-1">
                        <Clock className="size-3" strokeWidth={2} />
                        {featured.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent group-hover:gap-2.5 transition-all">
                    Makalenin tamamını oku{" "}
                    <ArrowRight className="size-4" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 lg:pb-32">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
              <div className="max-w-xl">
                <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Tüm makaleler
                </div>
                <h2 className="mt-4 text-balance text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.04] tracking-[-0.02em]">
                  Tüm arşive göz atın.
                </h2>
              </div>
            </div>
          </Reveal>
          <BlogContent posts={otherPosts} locale={locale} />
        </Container>
      </section>

      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none animate-gradient-shift"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.12), transparent 60%)",
          }}
        />
        <Container className="relative">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-10 lg:p-14 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 50%), radial-gradient(circle at 70% 80%, #f43f5e, transparent 50%)",
                }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-accent mb-7">
                  <Sparkles className="size-3.5" strokeWidth={2.5} />
                  Haftalık özet
                </div>
                <h2 className="text-balance text-[32px] sm:text-[44px] lg:text-[56px] font-light leading-[1.04] tracking-[-0.025em]">
                  Dasvio Journal&apos;ın en iyisini alın,
                  <br />
                  <span className="text-accent">her Cuma sabahı.</span>
                </h2>
                <p className="mt-5 max-w-xl mx-auto text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
                  Elle seçilmiş makaleler, özel vaka çalışmaları, ürün önizlemeleri. Spam yok, tek tıkla abonelik iptali.
                </p>
                <form
                  className="mt-9 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
                  action={`/${locale}/contact`}
                >
                  <input
                    type="email"
                    placeholder="siz@restoran.com"
                    required
                    className="flex-1 h-12 rounded-lg border border-white/15 bg-white/[0.04] px-5 text-[14.5px] text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                  />
                  <button
                    type="submit"
                    className="h-12 px-6 rounded-lg bg-accent text-accent-fg font-semibold text-[14.5px] hover:bg-accent-hover active:scale-[0.98] transition shadow-[0_8px_24px_rgba(255,255,255,0.15)] whitespace-nowrap"
                  >
                    Abone ol
                  </button>
                </form>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-fg-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                    4.200+ abone
                  </span>
                  <span className="size-1 rounded-full bg-fg-muted/40" />
                  <span>Ort. 7 dk okuma</span>
                  <span className="size-1 rounded-full bg-fg-muted/40" />
                  <span>50+ ülke</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-balance text-[28px] sm:text-[36px] lg:text-[44px] font-light leading-[1.05] tracking-[-0.02em]">
                Dasvio Journal için yazmak ister misiniz?
              </h2>
              <p className="mt-5 text-[15px] lg:text-[16px] leading-[1.6] text-fg-muted text-pretty">
                Restoran operatörleri, şefler, mühendisler — sektörün gerçekte nasıl işlediği hakkında söyleyecek keskin bir şeyiniz varsa, okumak isteriz.
              </p>
              <div className="mt-7">
                <Button
                  variant="secondary"
                  size="lg"
                  href={`/${locale}/contact`}
                  withArrow
                >
                  Hikaye öner
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
