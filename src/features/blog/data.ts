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
    slug: "five-minute-surveys",
    title: "Why the best surveys take five minutes or less",
    dek: "The data behind bite-sized surveys — and why we screen out anything longer.",
    author: "Maya Chen",
    authorRole: "Research Lead",
    authorInitial: "M",
    color: "#2E5BFF",
    date: "Jun 18, 2026",
    readTime: "4 min read",
    authorBio:
      "Maya leads survey design and works directly with partner brands to keep studies short and relevant.",
    intro:
      "Ask most people why they abandon a survey halfway through, and the answer is almost never the topic — it's the length. We've spent two years tuning our platform around a simple rule: if a survey can't make its point in five minutes, it probably shouldn't exist.",
    subhead1: "Short surveys aren't a compromise",
    body1:
      "Brands often assume more questions means more insight. In practice, response quality drops sharply after the eight-minute mark — people start rushing, picking the first answer, or dropping out entirely. A tightly scoped five-minute survey with sharp questions gives cleaner data than a rambling twenty-minute one.",
    body2:
      "That's why every survey on the platform is capped and time-estimated before you ever open it. If a brand wants to ask more, we split it into a shorter series instead of one long form.",
    quote: "The best signal we get from a survey is a member who finishes it in the time we promised.",
    subhead2: "What this means for your earnings",
    body3:
      "Shorter surveys mean you can fit more into a coffee break, and the per-minute reward stays honest because we're not padding studies with filler questions to justify a bigger prize. On average, members complete 40% more surveys per week since we introduced the five-minute cap.",
    closing:
      "If you ever open a survey and it runs long, that's a bug, not a feature — let us know and we'll flag it to the brand.",
  },
  {
    slug: "cash-out-guide",
    title: "PayPal, gift cards, or bank transfer: which cash-out is right for you",
    dek: "A side-by-side look at speed, bonus value, and fees for every payout method.",
    author: "Devin Ruiz",
    authorRole: "Payments Lead",
    authorInitial: "D",
    color: "#22C35E",
    date: "Jun 10, 2026",
    readTime: "5 min read",
    authorBio: "Devin runs the payments team and obsesses over getting money into members' hands faster.",
    intro:
      "Every member eventually hits the same question: what should I actually cash out to? The honest answer is it depends on how fast you want the money and whether you're fine spending it at one particular store.",
    subhead1: "Speed: PayPal wins, almost every time",
    body1:
      "PayPal cash-outs are processed instantly on our end and typically land in your account within minutes. There's no minimum hold, no verification delay — it's the closest thing to a straight cash withdrawal we offer.",
    body2:
      "Bank transfers, by comparison, take one to two business days because they route through the standard ACH network. Still fee-free, just slower — a reasonable choice if you don't use PayPal.",
    quote: "Gift cards are the only option where cashing out can actually net you more than your balance.",
    subhead2: "Value: gift cards can beat face value",
    body3:
      "Select partners — Amazon chief among them — add a 5% bonus when you redeem in gift card form instead of cash. If you were going to spend that money there anyway, it's free money on top of free money.",
    closing:
      "Our advice: default to PayPal for flexibility, but keep an eye on the gift card bonus rotation if you shop somewhere on the list regularly.",
  },
  {
    slug: "profile-matching",
    title: "How survey matching actually works behind the scenes",
    dek: "A peek at the matching engine that keeps you from wasting time on surveys you won't qualify for.",
    author: "Priya Shah",
    authorRole: "Engineering",
    authorInitial: "P",
    color: "#7A3FF2",
    date: "May 29, 2026",
    readTime: "6 min read",
    authorBio: "Priya builds the matching systems that decide which surveys show up in your feed.",
    intro:
      "Nothing kills trust faster than opening a survey, answering five screening questions, and getting bounced with no reward. So matching is the single feature we invest in more than any other.",
    subhead1: "It starts with your profile, not the survey",
    body1:
      "When you first sign up, the profile survey isn't busywork — it builds the baseline the matching engine uses for every study after. The more complete it is, the fewer screen-outs you'll hit later.",
    body2:
      "From there, each incoming study gets scored against your profile for a rough qualification likelihood before it's ever shown to you. Anything under our confidence threshold doesn't make it into your feed at all.",
    quote: "A good match isn't a survey you might qualify for — it's one you almost certainly will.",
    subhead2: "Why you'll still see the occasional miss",
    body3:
      "Some studies target a narrow slice of a broader group we've matched you to, so screen-outs aren't fully eliminated. But since rolling out the current engine, screen-out rates have dropped by more than half.",
    closing:
      "Keep your profile answers current, especially around big life changes — job, location, household — since those quietly drive most of your matches.",
  },
  {
    slug: "member-earnings",
    title: "What members really earn: a look at the numbers",
    dek: "We pulled anonymized payout data to show what typical earnings actually look like.",
    author: "Tom Blake",
    authorRole: "Data & Insights",
    authorInitial: "T",
    color: "#E0781A",
    date: "May 14, 2026",
    readTime: "4 min read",
    authorBio: "Tom analyzes platform-wide trends and publishes the occasional deep dive like this one.",
    intro:
      "Earnings claims online range from wildly optimistic to outright fake, so we pulled our own anonymized numbers to give a straight answer: what does a typical member actually make?",
    subhead1: "The median vs. the headline number",
    body1:
      "Our most-quoted stat — an average of over $60 a month — is real, but averages get pulled up by a smaller group of highly active members. The median member, doing a handful of surveys a week, earns closer to $28 a month.",
    body2:
      "Activity is the biggest lever by far. Members who check in most days of the week earn roughly three times what occasional users do, simply from catching more relevant matches before they expire.",
    quote:
      "Consistency beats any single high-paying survey — small and often adds up faster than most people expect.",
    subhead2: "What actually moves the needle",
    body3:
      "Beyond frequency, a complete profile and quick response times to new matches both correlate strongly with higher earnings, since better-matched members qualify for more of what they're shown.",
    closing:
      "None of this replaces a paycheck, and we don't pretend otherwise — but as a way to turn spare minutes into real cash, the numbers hold up.",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return posts.filter((p) => p.slug !== slug).slice(0, count);
}
