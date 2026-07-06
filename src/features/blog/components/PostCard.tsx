import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/features/blog/data";
import { blogPostHref } from "@/lib/navigation";
import { CoverPlaceholder } from "./CoverPlaceholder";

type PostCardProps = {
  locale: Locale;
  post: BlogPost;
  tone?: "default" | "subtle";
};

export function PostCard({ locale, post, tone = "default" }: PostCardProps) {
  return (
    <Link
      href={blogPostHref(locale, post.slug)}
      className={
        "flex flex-col overflow-hidden rounded-3xl border " +
        (tone === "subtle"
          ? "border-line bg-bg"
          : "border-[#eef1fa] bg-white shadow-[var(--shadow-card-lg)]")
      }
    >
      <div className="relative aspect-[16/10]">
        <CoverPlaceholder color={post.color} initial={post.authorInitial} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2.5 font-display text-[18.5px] leading-tight font-extrabold tracking-tight text-ink">
          {post.title}
        </h3>
        <p className="mb-4.5 text-sm leading-relaxed text-muted">{post.dek}</p>
        <div className="mt-auto flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full font-display text-[11.5px] font-extrabold text-white"
            style={{ background: post.color }}
          >
            {post.authorInitial}
          </span>
          <div className="text-[12.5px] text-muted-3">
            {post.author} · {post.readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
