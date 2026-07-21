import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";
import { CoverPlaceholder } from "@/features/blog/components/CoverPlaceholder";
import { PostCard } from "@/features/blog/components/PostCard";
import { getPost, getRelatedPosts, posts } from "@/features/blog/data";
import { isLocale } from "@/i18n/config";
import { pageHref } from "@/lib/navigation";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog-stories-tips-and-updates-from-insight-panel/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const post = getPost(slug);
  if (!post) return {};

  return {
    metadataBase: new URL(siteUrl),
    title: `${post.title} | B2B Insight Panel Blog`,
    description: post.dek,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog-stories-tips-and-updates-from-insight-panel/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  return (
    <>
      <section className="px-6 pt-36 sm:pt-40">
        <Container size="sm">
          <Link
            href={pageHref(locale, "blog")}
            className="mb-6 inline-flex items-center gap-2 font-display text-sm font-bold text-primary"
          >
            <ArrowRight width={16} height={16} className="rotate-180 rtl:rotate-0" />
            Back to blog
          </Link>
          <h1 className="mb-4.5 font-display text-[clamp(30px,4.4vw,48px)] leading-[1.1] font-black tracking-tight text-ink">
            {post.title}
          </h1>
          <p className="mb-6.5 text-lg leading-relaxed text-muted-2">{post.dek}</p>
          <div className="mb-8 flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full font-display text-base font-extrabold text-white"
              style={{ background: post.color }}
            >
              {post.authorInitial}
            </span>
            <div>
              <div className="font-display text-[15px] font-bold text-ink">
                {post.author} <span className="font-medium text-muted-3">· {post.authorRole}</span>
              </div>
              <div className="text-[13px] text-muted-3">
                {post.date} · {post.readTime}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="px-6 pb-4">
        <Container size="md">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[26px]">
            <CoverPlaceholder color={post.color} initial={post.authorInitial} />
          </div>
        </Container>
      </section>

      <section className="px-6 py-10">
        <Container size="sm" className="max-w-[720px]!">
          <p className="mb-6.5 text-lg leading-[1.75] text-[#2a3140]">{post.intro}</p>

          <h3 className="mt-9 mb-4 font-display text-[23px] font-extrabold tracking-tight text-ink">
            {post.subhead1}
          </h3>
          <p className="mb-5 text-[16.5px] leading-[1.8] text-muted-2">{post.body1}</p>
          <p className="mb-5 text-[16.5px] leading-[1.8] text-muted-2">{post.body2}</p>

          <blockquote className="my-9 border-l-3 border-primary py-1.5 ps-6.5">
            <p className="font-display text-xl leading-[1.5] font-bold tracking-tight text-ink">
              {post.quote}
            </p>
          </blockquote>

          <h3 className="mt-9 mb-4 font-display text-[23px] font-extrabold tracking-tight text-ink">
            {post.subhead2}
          </h3>
          <p className="mb-5 text-[16.5px] leading-[1.8] text-muted-2">{post.body3}</p>
          <p className="mb-5 text-[16.5px] leading-[1.8] text-muted-2">{post.closing}</p>

          <div className="mt-11 flex items-center gap-4.5 rounded-[22px] border border-line bg-white p-6.5 shadow-[var(--shadow-card-lg)]">
            <span
              className="flex h-14 w-14 flex-none items-center justify-center rounded-full font-display text-xl font-extrabold text-white"
              style={{ background: post.color }}
            >
              {post.authorInitial}
            </span>
            <div>
              <div className="mb-0.5 font-display text-base font-extrabold text-ink">{post.author}</div>
              <div className="text-sm leading-relaxed text-muted">{post.authorBio}</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white px-6 pt-22 pb-24">
        <Container size="lg">
          <div className="mb-6.5 font-display text-[13px] font-extrabold tracking-wide text-muted-3 uppercase">
            More from the blog
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rp) => (
              <PostCard key={rp.slug} locale={locale} post={rp} tone="subtle" />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Ready to get started?"
        subtitle="It's free, it takes a minute, and your first payout could be today."
        buttonLabel="Join Our Community"
        buttonHref={pageHref(locale, "home")}
      />
    </>
  );
}
