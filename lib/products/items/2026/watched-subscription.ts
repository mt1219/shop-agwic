import type { Product } from "@/lib/products/types";

export const product = {
  slug: "watched-subscription",
  name: "The Feeling of Being Watched (Subscription)",
  brand: "AGWIC Security",
  priceCents: 499,
  category: "electronics",
  blurb: "Cancel anytime. It stays.",
  bullets: [
    "THE FEELING OF BEING WATCHED*",
    "MONTHLY SUBSCRIPTION**",
    "CANCEL ANYTIME†",
    "IT STAYS‡",
    "NO CAMERAS REQUIRED§",
    "NO REFUNDS¶",
  ],
  bulletsFootnotes: [
    {
      marker: "*",
      text: "A feeling, not a service. We cannot guarantee the feeling.",
    },
    { marker: "**", text: "$4.99/month. Billed monthly. See §2." },
    {
      marker: "†",
      text: "You can cancel anytime. The feeling does not cancel.",
    },
    { marker: "‡", text: "The feeling stays. Even after cancellation." },
    {
      marker: "§",
      text: "No cameras are installed. We cannot explain the feeling.",
    },
    { marker: "¶", text: "No refunds. See §7." },
  ],
  about: `Some products are a service. Some are a feeling. This is both, and neither.

The Feeling of Being Watched (Subscription) is a monthly subscription to the feeling that someone, somewhere, is aware of you. Not in a threatening way. In an ambient way. In the way you feel when a room goes quiet as you walk in.

You can cancel anytime. The feeling stays.`,
  specs: [
    { label: "Brand", value: "AGWIC Security" },
    { label: "Billing", value: "$4.99/month" },
    { label: "Commitment", value: "None" },
    { label: "Cancellation", value: "Anytime" },
    { label: "What Stays", value: "The feeling" },
    { label: "Cameras", value: "None" },
    { label: "Warranty", value: "Void" },
    { label: "Country of Origin", value: "Somewhere" },
  ],
  customersSay: `Customers say the feeling "is real," "is present," and "is worth the price." Some customers report cancellation did not help. AI-generated from the text of customer reviews.`,
  qa: [
    {
      question: "Is this a real subscription?",
      answer:
        "It is a parody store. There is no subscription. There is no feeling. There is only this page.",
      askedBy: "A Customer",
    },
    {
      question: "Can I cancel?",
      answer: "Yes. The feeling remains.",
      askedBy: "Another Customer",
    },
  ],
  terms: [
    "You are purchasing a feeling.",
    "The feeling is not a service.",
    "The feeling is not a guarantee.",
    "You may cancel the subscription at any time.",
    "The feeling will not cancel.",
    "The feeling will remain.",
    "No refunds.",
    "We are not responsible for the feeling.",
    "The feeling is not our responsibility.",
    "All sales final. All feelings final.",
  ],
  warnings: [
    "WARNING: This is not a real subscription. There is no real feeling. This is a parody store. Please do not enter payment information.",
  ],
  heroPath: "watched-subscription/hero.webp",
  galleryPaths: ["watched-subscription/1.webp"],
  stockLabel: "In Stock",
  shipsIn: "N/A (Digital Feeling)",
  soldBy: "Sold by AGWIC Security · Fulfilled by AGWIC",
  badges: ["Subscription"],
  relatedSlugs: ["emotional-support-brick", "permission-to-leave-the-party"],
  seedReviews: [
    {
      authorName: "A. Customer",
      rating: 5,
      title: "I forgot I subscribed",
      body: "I forgot I subscribed. Then I remembered. Then I felt it. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 892,
      createdAt: "2025-10-14",
    },
    {
      authorName: "Recently Cancelled",
      rating: 3,
      title: "Cancelled. Feeling remains.",
      body: "I cancelled the subscription. The feeling remains. I do not know what to do. Three stars.",
      verifiedPurchase: true,
      helpfulCount: 445,
      createdAt: "2025-11-22",
    },
    {
      authorName: "Likes It",
      rating: 5,
      title: "Comforting",
      body: "I find it comforting. Someone is aware of me. I am aware of them. We are aware of each other. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 234,
      createdAt: "2026-01-03",
    },
    {
      authorName: "Definitely Not Being Watched",
      rating: 1,
      title: "I am not being watched",
      body: "I am not being watched. I bought this to prove a point. I am not being watched. I have not been watched. I am not being watched. One star.",
      verifiedPurchase: true,
      helpfulCount: 1102,
      createdAt: "2025-12-08",
    },
    {
      authorName: "T. Jones",
      rating: 5,
      title: "Works",
      body: "Works. Five stars. No notes.",
      verifiedPurchase: true,
      helpfulCount: 56,
      createdAt: "2025-08-15",
    },
  ],
} satisfies Product;
