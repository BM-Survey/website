export type BlogPost = {
  slug: string;
  title: string;
  dek: string;
  author: string;
  authorRole: string;
  authorInitial: string;
  color: string;
  date: string;
  readTime: string;
  authorBio: string;
  intro: string;
  subhead1: string;
  body1: string;
  body2: string;
  quote: string;
  subhead2: string;
  body3: string;
  closing: string;
};

/** English-only editorial content — the blog is not translated across locales. */
export const posts: BlogPost[] = [
  {
    slug: "b2b-research-importance",
    title: "The Growing Importance of B2B Research in Business Decision-Making",
    dek: "How organizations use professional expertise and industry insights to shape products, services, and strategic decisions.",
    author: "Hanzala Shaikh",
    authorRole: "Research Lead",
    authorInitial: "H",
    color: "#2E5BFF",
    date: "April 2026",
    readTime: "5 min read",
    authorBio:
      "Hanzala leads research initiatives at B2B Insight Panel, connecting professionals with studies that shape real business decisions.",
    intro:
      "In today's fast-changing business environment, companies can no longer rely solely on assumptions when making important decisions. Organizations increasingly depend on B2B research to understand market trends, customer needs, and emerging technologies.",
    subhead1: "Making decisions without guesswork",
    body1:
      "Professional insights from decision-makers, managers, and industry experts help businesses answer critical questions: which technologies are gaining adoption, what challenges organizations are currently facing, which products or services need improvement, and where companies should invest next.",
    body2:
      "B2B research enables organizations to make data-driven decisions rather than relying on guesswork. At B2B Insight Panel, professionals from different industries share their expertise through research studies, surveys, and interviews, and their opinions directly contribute to shaping products, services, and future business strategies.",
    quote:
      "B2B research enables organizations to make data-driven decisions rather than relying on guesswork.",
    subhead2: "Where this is headed",
    body3:
      "As industries continue to evolve, the demand for high-quality professional insights will only continue to grow.",
    closing:
      "The more professionals share their expertise, the sharper the decisions those insights go on to shape.",
  },
  {
    slug: "professional-insights-organizations",
    title: "How Professional Insights Help Organizations Make Better Decisions",
    dek: "Explore how businesses use expert opinions and industry knowledge to shape products, services, and long-term strategies.",
    author: "B2B Insight Panel Team",
    authorRole: "Editorial Team",
    authorInitial: "B",
    color: "#22C35E",
    date: "July 2026",
    readTime: "5 min read",
    authorBio:
      "Written by the B2B Insight Panel editorial team, covering how research shapes real business decisions.",
    intro: "Every major business decision starts with understanding the market.",
    subhead1: "Why organizations turn to research participants",
    body1:
      "Whether launching a new software platform, improving cybersecurity solutions, or expanding into new regions, organizations seek insights from professionals who work in these areas every day.",
    body2:
      "Research participants help organizations by sharing industry challenges, technology adoption trends, purchasing behaviours, and future priorities and investments. These insights help companies reduce risks and make smarter strategic decisions.",
    quote:
      "Businesses receive valuable data, while participants are compensated for sharing their expertise and experience.",
    subhead2: "A win-win relationship",
    body3:
      "Professional research participation creates a win-win relationship: businesses receive valuable data, while participants are compensated for sharing their expertise and experience.",
    closing:
      "The growing reliance on expert-driven research has made professional communities and insight panels an important part of modern business strategy.",
  },
  {
    slug: "research-matching-behind-the-scenes",
    title: "How Research Matching Works Behind the Scenes",
    dek: "Learn how professional profiles, industries, and areas of expertise help connect members with relevant research opportunities.",
    author: "Esha Shah",
    authorRole: "Research Matching",
    authorInitial: "E",
    color: "#7A3FF2",
    date: "March 2026",
    readTime: "6 min read",
    authorBio:
      "Esha works on the matching systems that connect professionals with the research studies most relevant to them.",
    intro: "Not every study is relevant to every professional.",
    subhead1: "Matching on more than just interest",
    body1:
      "This is why research platforms use profile information to match participants with studies that fit their background and expertise. Matching typically considers factors such as industry, job function, seniority level, company size, geographic region, and technology responsibilities.",
    body2:
      "This process benefits both participants and research sponsors. Participants receive invitations to studies that are meaningful and relevant to their experience, while organizations gain insights from the right audience.",
    quote: "The goal is simple: connect the right professionals with the right opportunities.",
    subhead2: "Why a complete profile matters",
    body3:
      "Accurate profile information also improves qualification rates and ensures a better research experience for everyone involved.",
    closing: "The goal is simple: connect the right professionals with the right opportunities.",
  },
  {
    slug: "future-of-b2b-research-trends",
    title: "The Future of B2B Research: Trends to Watch",
    dek: "Discover how AI, digital transformation, and changing business priorities are reshaping market research.",
    author: "B2B Insight Panel Team",
    authorRole: "Editorial Team",
    authorInitial: "B",
    color: "#E0781A",
    date: "July 2026",
    readTime: "4 min read",
    authorBio:
      "Written by the B2B Insight Panel editorial team, tracking the trends shaping the future of professional research.",
    intro:
      "B2B research is rapidly evolving. Several trends are changing how organizations collect and use professional insights.",
    subhead1: "AI and the demand for expert opinion",
    body1:
      "Artificial intelligence is helping researchers identify patterns and generate insights more quickly than ever before, while organizations increasingly seek feedback directly from professionals with hands-on experience.",
    body2:
      "Research is also becoming more international, allowing companies to compare perspectives across regions and industries. At the same time, businesses now require real-time insights to keep pace with changing markets.",
    quote:
      "Organizations are investing heavily in verification and fraud prevention to ensure reliable research outcomes.",
    subhead2: "Quality is the throughline",
    body3:
      "Organizations are investing heavily in verification and fraud prevention to ensure reliable research outcomes, even as the pace and scale of research grows.",
    closing:
      "As businesses become increasingly data-driven, professional research communities will play an even greater role in shaping the future of industries worldwide.",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return posts.filter((p) => p.slug !== slug).slice(0, count);
}