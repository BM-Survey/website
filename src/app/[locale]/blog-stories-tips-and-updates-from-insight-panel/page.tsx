import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/marketing/CtaBanner";
import { PageHero } from "@/components/marketing/PageHero";
import { Container } from "@/components/ui/Container";
import { posts } from "@/features/blog/data";
import { FeaturedPost } from "@/features/blog/components/FeaturedPost";
import { PostCard } from "@/features/blog/components/PostCard";
import { isLocale } from "@/i18n/config";
import { authUrls, pageHref } from "@/lib/navigation";
import { siteUrl } from "@/lib/site";

const meta = {
  title: "Blog — Insights, Research & Updates | B2B Insight Panel",
  description:
    "Explore research trends, industry perspectives, participation best practices, and updates from the B2B Insight Panel community.",
};

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog-stories-tips-and-updates-from-insight-panel">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
  };
}

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog-stories-tips-and-updates-from-insight-panel">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="The Blog"
        titleLead="Stories, tips &"
        titleHighlight="updates"
        subtitle="Straight talk on earning more from your opinions, getting paid faster, and what's new on the platform."
      />

      <section className="px-6 pb-10">
        <Container size="lg">
          <FeaturedPost locale={locale} post={featured} />
        </Container>
      </section>

      <section className="px-6 pb-24">
        <Container
          size="lg"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((post) => (
            <PostCard key={post.slug} locale={locale} post={post} />
          ))}
        </Container>
      </section>

      <CtaBanner
        title="Ready to get started?"
        subtitle="It's free, it takes a minute, and your first payout could be today."
        buttonLabel="Sign Up Free"
        buttonHref={authUrls.register}
      />
    </>
  );
}
