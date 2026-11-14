import type { Product } from "@/lib/products/types";

export const product = {
  slug: "emotional-support-brick",
  name: "Emotional Support Brick",
  brand: "AGWIC Home",
  priceCents: 999,
  category: "home-kitchen",
  blurb: "For when you need to hold something heavy and feel seen.",
  bullets: [
    "HOLD SOMETHING HEAVY*",
    "100% AUTHENTIC BRICK**",
    "HAND-SELECTED BY A TEAM OF BRICK PROFESSIONALS†",
    "NO ASSEMBLY REQUIRED‡",
    "NOT A METAPHOR§",
  ],
  bulletsFootnotes: [
    {
      marker: "*",
      text: "Brick is not a substitute for professional mental health care. It is a brick.",
    },
    {
      marker: "**",
      text: "Every brick is unique. Bricks may vary in color, texture, and existential weight.",
    },
    {
      marker: "†",
      text: "Our team has selected every brick by hand. They are very tired.",
    },
    {
      marker: "‡",
      text: "If assembly is required, you have purchased the wrong item.",
    },
    { marker: "§", text: "It is also a metaphor." },
  ],
  about: `Some days you just need to hold a brick.

The Emotional Support Brick is a genuine, certified brick, selected by hand for its weight, its solidity, and its total willingness to sit with you while you figure things out. It does not offer advice. It does not ask how you are doing. It is just there.

Backed by our lifetime "it will not go anywhere" guarantee. Terms apply. Bricks may apply.`,
  specs: [
    { label: "Brand", value: "AGWIC Home" },
    { label: "Material", value: "Clay. Brick-grade." },
    { label: "Dimensions", value: '8" × 3.5" × 2.25"' },
    { label: "Weight", value: "4.5 lbs" },
    { label: "Color", value: "Brick" },
    { label: "Care Instructions", value: "Do not hold forever." },
    { label: "Warranty", value: "Lifetime" },
    { label: "Country of Origin", value: "A brickyard" },
  ],
  customersSay: `Customers say the Emotional Support Brick is "heavy," "solid," and "exactly what I needed." They particularly praise its ability to sit with them. AI-generated from the text of customer reviews.`,
  qa: [
    {
      question: "Is this a real brick?",
      answer: "Yes.",
      askedBy: "A Customer",
    },
    {
      question: "Can I return it?",
      answer: "You can. But the brick will still be with you.",
      askedBy: "Another Customer",
    },
  ],
  terms: [
    "The Emotional Support Brick is a real brick.",
    "It is not a substitute for professional mental health care.",
    "It is not a weapon.",
    "It is not a paperweight, though it will hold papers down.",
    "It is not a metaphor, though it is also a metaphor.",
    "Do not throw the brick. The brick is not for throwing.",
    "Do not paint the brick. The brick is fine as it is.",
    "The brick will outlive you. Please plan accordingly.",
    "All sales final. All bricks final.",
  ],
  warnings: [
    "WARNING: The Emotional Support Brick is a real brick. It is not a substitute for professional mental health care. If you are struggling, please contact a licensed professional. We are not licensed professionals.",
  ],
  heroPath: "emotional-support-brick/hero.webp",
  galleryPaths: ["emotional-support-brick/1.webp"],
  stockLabel: "In Stock",
  shipsIn: "Ships within 3–5 business days",
  soldBy: "Sold by AGWIC Home · Fulfilled by AGWIC",
  badges: ["AGWIC's Choice"],
  relatedSlugs: ["the-original-cork", "permission-to-leave-the-party"],
  seedReviews: [
    {
      authorName: "Recently Divorced",
      rating: 5,
      title: "I hold it",
      body: "I bought this after the divorce. I hold it. I do not cry. I hold the brick. The brick is warm. The brick is mine. The brick does not leave. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 892,
      createdAt: "2025-10-08",
    },
    {
      authorName: "Middle Manager",
      rating: 5,
      title: "Meeting survival",
      body: "I bring the brick to meetings. I put it on the table. I do not use it. I do not need to use it. The brick is there. The meeting is shorter. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 445,
      createdAt: "2025-11-30",
    },
    {
      authorName: "A. Customer",
      rating: 4,
      title: "Heavier than expected",
      body: "The brick is heavier than expected. This is not a complaint. I just wanted to mention it. Four stars.",
      verifiedPurchase: true,
      helpfulCount: 156,
      createdAt: "2026-01-22",
    },
    {
      authorName: "Not A Brick Person",
      rating: 1,
      title: "It's a brick",
      body: "I bought this thinking it would be a metaphor. It is a brick. One star.",
      verifiedPurchase: true,
      helpfulCount: 678,
      createdAt: "2025-09-14",
    },
    {
      authorName: "T. Jones",
      rating: 5,
      title: "Good brick",
      body: "Good brick. Five stars. No notes.",
      verifiedPurchase: true,
      helpfulCount: 56,
      createdAt: "2025-08-02",
    },
  ],
} satisfies Product;
