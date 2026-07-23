import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  BLOG_SLUGS,
  formatBlogDate,
  getPostBySlug,
  getRelatedPosts,
  CATEGORY_LABELS,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blog";
import { getArticle, type ArticleBlock } from "@/lib/blog-content";
import { Trust } from "@/components/sections/Trust";
import { getDictionary } from "@/i18n/dictionaries";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  const post = getPostBySlug(slug, locale);
  const article = getArticle(slug, locale);
  if (!post || !article) notFound();

  const t = await getDictionary(locale);
  const related = getRelatedPosts(slug, locale);
  const labels = CATEGORY_LABELS[locale];

  return (
    <>
      <article>
        <header className="pt-32 lg:pt-36 pb-10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              background: `radial-gradient(circle at 12% 0%, ${post.accentTint}, transparent 55%)`,
            }}
          />
          <Container className="relative">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-fg-muted hover:text-fg transition"
            >
              <ArrowLeft className="size-4" strokeWidth={2.25} />
              {t.blogPage.allArticles}
            </Link>

            <div className="mt-8 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center rounded-lg border px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    background: `${post.accentTint}1f`,
                    borderColor: `${post.accentTint}66`,
                    color: post.accentTint,
                  }}
                >
                  {labels[post.category]}
                </span>
                <span className="text-[12.5px] text-fg-muted">
                  {formatBlogDate(post.date, locale)}
                </span>
                <span className="size-1 rounded-full bg-fg-muted/40" />
                <span className="inline-flex items-center gap-1 text-[12.5px] text-fg-muted">
                  <Clock className="size-3.5" strokeWidth={2} />
                  {post.readTime}
                </span>
              </div>

              <h1 className="mt-6 text-balance text-[34px] sm:text-[48px] lg:text-[62px] font-light leading-[1.03] tracking-[-0.03em]">
                {post.title}
              </h1>

              <p className="mt-6 text-[17px] lg:text-[20px] leading-[1.6] text-fg-muted text-pretty">
                {article.lead}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div
                  className="size-11 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-none"
                  style={{ background: post.author.color }}
                >
                  {post.author.initials}
                </div>
                <div>
                  <div className="text-[14px] font-medium text-fg leading-tight">
                    {post.author.name}
                  </div>
                  <div className="text-[12px] text-fg-muted leading-tight mt-0.5">
                    {post.author.role}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </header>

        <Container>
          <Reveal>
            <div className="relative aspect-[16/9] lg:aspect-[2.2/1] rounded-2xl overflow-hidden border border-border-default">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </Container>

        <div className="py-14 lg:py-20">
          <Container>
            <div className="max-w-[720px] mx-auto">
              {article.blocks.map((block, i) => (
                <Block key={i} block={block} tint={post.accentTint} />
              ))}

              <div className="mt-14 pt-8 border-t border-border-default flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full liquid-glass-sm px-3 py-1.5 text-[12px] font-medium text-fg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </article>

      <section className="pb-8">
        <Container>
          <div className="max-w-[720px] mx-auto rounded-2xl liquid-glass p-8 lg:p-10 text-center">
            <h2 className="text-balance text-[24px] lg:text-[30px] font-light leading-[1.1] tracking-[-0.02em]">
              {t.blogPage.ctaTitle}
            </h2>
            <p className="mt-4 text-[14.5px] lg:text-[15.5px] leading-[1.6] text-fg-muted text-pretty">
              {t.blogPage.ctaBody}
            </p>
            <div className="mt-7">
              <Button
                variant="primary"
                size="lg"
                href={`/${locale}/contact`}
                withArrow
              >
                {t.blogPage.ctaButton}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t.blogPage.readNext}
            </div>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} locale={locale} labels={labels} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <Trust t={t.trust} />
    </>
  );
}

// ─── BLOCK RENDERER ─────────────────────────────────────────────────────────
function Block({ block, tint }: { block: ArticleBlock; tint: string }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2 className="mt-12 first:mt-0 text-balance text-[26px] lg:text-[32px] font-light leading-[1.15] tracking-[-0.02em]">
          {block.text}
        </h2>
      );

    case "p":
      return (
        <p className="mt-6 first:mt-0 text-[16px] lg:text-[17.5px] leading-[1.75] text-fg-muted text-pretty">
          {block.text}
        </p>
      );

    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-6 text-[16px] lg:text-[17px] leading-[1.7] text-fg-muted text-pretty"
            >
              <span
                className="absolute left-0 top-[0.7em] size-1.5 rounded-full"
                style={{ background: tint }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="mt-6 space-y-3.5">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-3.5 text-[16px] lg:text-[17px] leading-[1.7] text-fg-muted text-pretty"
            >
              <span
                className="flex-none mt-0.5 size-6 rounded-full flex items-center justify-center text-[11.5px] font-bold text-white"
                style={{ background: tint }}
              >
                {i + 1}
              </span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <figure
          className="mt-10 pl-6 border-l-2"
          style={{ borderColor: tint }}
        >
          <blockquote className="text-[18px] lg:text-[21px] font-light leading-[1.5] tracking-[-0.01em] text-fg text-pretty">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-[13px] text-fg-subtle">
              {block.cite}
            </figcaption>
          )}
        </figure>
      );

    case "stats":
      return (
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {block.items.map((s) => (
            <div
              key={s.label}
              className="rounded-xl liquid-glass-sm px-4 py-5 text-center"
            >
              <div
                className="text-[22px] lg:text-[26px] font-light tracking-[-0.02em]"
                style={{ color: tint }}
              >
                {s.value}
              </div>
              <div className="mt-1.5 text-[11.5px] leading-snug text-fg-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <aside
          className="mt-10 rounded-xl border p-5 lg:p-6 text-[15px] lg:text-[16px] leading-[1.65] text-fg text-pretty"
          style={{
            background: `${tint}12`,
            borderColor: `${tint}44`,
          }}
        >
          {block.text}
        </aside>
      );
  }
}

// ─── RELATED CARD ───────────────────────────────────────────────────────────
function RelatedCard({
  post,
  locale,
  labels,
}: {
  post: BlogPost;
  locale: Locale;
  labels: Record<BlogCategory, string>;
}) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl liquid-glass liquid-card"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-fg-muted">
          {labels[post.category]}
        </div>
        <h3 className="mt-2.5 flex-1 text-[17px] font-medium leading-[1.3] tracking-tight text-fg text-pretty line-clamp-3">
          {post.title}
        </h3>
        <div className="mt-5 flex items-center gap-2 text-[12px] text-fg-muted">
          <span>{formatBlogDate(post.date, locale)}</span>
          <ArrowUpRight
            className="ml-auto size-4 transition-colors group-hover:text-accent"
            strokeWidth={2.25}
          />
        </div>
      </div>
    </Link>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug, hasLocale(lang) ? lang : "tr");
  if (!post) return {};
  return {
    title: `${post.title} — Dasvio Journal`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [post.coverImage],
    },
  };
}

export function generateStaticParams() {
  return locales.flatMap((lang) => BLOG_SLUGS.map((slug) => ({ lang, slug })));
}
