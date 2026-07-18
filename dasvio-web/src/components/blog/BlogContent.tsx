"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import clsx from "clsx";
import { CATEGORIES, formatBlogDate, type BlogPost } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";

export function BlogContent({
  posts,
  locale,
}: {
  posts: BlogPost[];
  locale: string;
}) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("Tümü");

  const filtered = useMemo(() => {
    if (active === "Tümü") return posts;
    return posts.filter((p) => p.category === active);
  }, [posts, active]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = cat === active;
          const count = cat === "Tümü"
            ? posts.length
            : posts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={clsx(
                "inline-flex items-center gap-2 h-9 pl-4 pr-3 rounded-full text-[13px] font-medium transition-all duration-300",
                isActive
                  ? "bg-[linear-gradient(160deg,rgba(244,63,94,0.95),rgba(225,29,72,0.98))] text-white border border-[rgba(255,255,255,0.28)] shadow-[0_4px_20px_rgba(244,63,94,0.55),inset_0_1.5px_0_rgba(255,255,255,0.45)]"
                  : "liquid-glass-sm text-fg-muted hover:text-white hover:border-[rgba(255,255,255,0.28)]",
              )}
            >
              {cat}
              <span
                className={clsx(
                  "text-[10px] font-bold rounded-full size-5 flex items-center justify-center flex-none",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[rgba(244,63,94,0.15)] text-accent",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {filtered.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 100}>
            <PostCard post={post} locale={locale} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center py-20 text-fg-muted">
          Bu kategoride henüz makale yok.
        </div>
      )}
    </>
  );
}

function PostCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="block rounded-2xl overflow-hidden liquid-glass hover:border-[rgba(244,63,94,0.42)] hover:shadow-[0_20px_60px_rgba(244,63,94,0.2)] transition-all duration-500 hover:-translate-y-1.5 group h-full flex flex-col"
      style={{
        ["--post-tint" as string]: post.accentTint,
      }}
    >
      <div className="relative aspect-[5/3.5] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute top-4 left-4 inline-flex items-center rounded-md border backdrop-blur px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white"
          style={{
            background: `${post.accentTint}33`,
            borderColor: `${post.accentTint}88`,
          }}
        >
          {post.category}
        </div>
      </div>
      <div className="p-6 lg:p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-[12px] text-fg-muted">
          <span>{formatBlogDate(post.date)}</span>
          <span className="size-1 rounded-full bg-fg-muted/40" />
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" strokeWidth={2} />
            {post.readTime}
          </span>
        </div>
        <h3 className="mt-3 text-[19px] lg:text-[21px] font-medium tracking-tight text-fg leading-[1.25] line-clamp-2 text-pretty">
          {post.title}
        </h3>
        <p className="mt-2.5 text-[13.5px] leading-[1.6] text-fg-muted text-pretty line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-5 pt-5 border-t border-[rgba(244,63,94,0.12)] flex items-center gap-3">
          <div
            className="size-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-none"
            style={{ background: post.author.color }}
          >
            {post.author.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-medium text-fg leading-tight truncate">
              {post.author.name}
            </div>
            <div className="text-[11px] text-fg-muted leading-tight mt-0.5 truncate">
              {post.author.role}
            </div>
          </div>
          <ArrowUpRight
            className="size-4 text-fg-muted group-hover:text-accent transition-colors"
            strokeWidth={2.25}
          />
        </div>
      </div>
    </Link>
  );
}
