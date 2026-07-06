import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { blogPostHref } from "@/lib/navigation";
import type { BlogPost } from "@/features/blog/data";
import { CoverPlaceholder } from "./CoverPlaceholder";

type FeaturedPostProps = {
  locale: Locale;
  post: BlogPost;
};

export function FeaturedPost({ locale, post }: FeaturedPostProps) {
  return (
    <Link
      href={blogPostHref(locale, post.slug)}
      className="grid min-h-[420px] overflow-hidden rounded-[32px] bg-white shadow-[0_24px_60px_rgba(16,32,90,0.14)] lg:grid-cols-2"
    >
      <div className="relative order-2 min-h-[220px]">
        <CoverPlaceholder color={post.color} initial={post.authorInitial} />
      </div>
      <div className="order-1 flex flex-col justify-center p-9 sm:p-11">
        <span className="mb-3.5 font-display text-[12.5px] font-extrabold tracking-wide text-muted-3 uppercase">
          Featured
        </span>
        <h2 className="mb-3.5 font-display text-[clamp(26px,2.6vw,34px)] leading-[1.15] font-black tracking-tight text-ink">
          {post.title}
        </h2>
        <p className="mb-5.5 max-w-[460px] text-base leading-relaxed text-muted-2">{post.dek}</p>
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-extrabold text-white"
            style={{ background: post.color }}
          >
            {post.authorInitial}
          </span>
          <div>
            <div className="font-display text-sm font-bold text-ink">{post.author}</div>
            <div className="text-[12.5px] text-muted-3">
              {post.date} · {post.readTime}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
