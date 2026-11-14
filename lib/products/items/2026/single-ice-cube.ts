import type { Product } from "@/lib/products/types";

export const product = {
  slug: "single-ice-cube",
  name: "A Single Ice Cube, Hand-Delivered",
  brand: "AGWIC Fresh",
  priceCents: 4000,
  category: "home-kitchen",
  blurb: "Ships in 4–6 weeks. Arrives as water. No refunds.",
  bullets: [
    "ONE (1) ICE CUBE*",
    "HAND-DELIVERED BY A COURIER**",
    "FROZEN AT THE MOMENT OF DEPARTURE†",
    "SHIPS IN 4–6 WEEKS‡",
    "NO REFUNDS§",
    "ARRIVES AS WATER¶",
  ],
  bulletsFootnotes: [
    {
      marker: "*",
      text: 'One (1) ice cube. Approximately 1" × 1" × 1". Ice cube may vary in size.',
    },
    {
      marker: "**",
      text: "Hand-delivered by a courier. Courier may vary in size.",
    },
    {
      marker: "†",
      text: "Frozen at the moment of departure. This is the last time it will be frozen.",
    },
    {
      marker: "‡",
      text: "Ships in 4–6 weeks. May arrive as water. Will arrive as water.",
    },
    { marker: "§", text: "No refunds. No exceptions. No ice cube." },
    {
      marker: "¶",
      text: "Arrives as water. This is not a defect. This is physics.",
    },
  ],
  about: `Some things are worth waiting for.

A Single Ice Cube, Hand-Delivered is exactly what it sounds like: one (1) ice cube, frozen at the moment of departure, hand-delivered to your door by a courier. The courier will travel across the country with your ice cube. The courier will not use a cooler. The courier has been instructed not to use a cooler.

When your ice cube arrives, it will be water. This is not a defect. This is physics.`,
  specs: [
    { label: "Brand", value: "AGWIC Fresh" },
    { label: "Quantity", value: "1 (one)" },
    { label: "Dimensions", value: 'Approx. 1" × 1" × 1"' },
    { label: "Weight", value: "0.5 oz (at departure)" },
    { label: "Color", value: "Clear" },
    { label: "State at Arrival", value: "Liquid" },
    { label: "Refunds", value: "None" },
    { label: "Shipping Time", value: "4–6 weeks" },
  ],
  customersSay: `Customers say the ice cube "arrived," "was water," and "was worth it anyway." Some customers were surprised. Some were not. AI-generated from the text of customer reviews.`,
  qa: [
    {
      question: "Is the ice cube still frozen when it arrives?",
      answer: "No.",
      askedBy: "A Customer",
    },
    {
      question: "Can I get a refund?",
      answer: "No.",
      askedBy: "Another Customer",
    },
    {
      question: "Why?",
      answer: "That is the question, isn't it.",
      askedBy: "A Third Customer",
    },
  ],
  terms: [
    "You are purchasing one (1) ice cube.",
    "The ice cube will be hand-delivered by a courier.",
    "The courier will not use a cooler.",
    "The ice cube will arrive as water.",
    "This is not a defect. This is physics.",
    "No refunds.",
    "No exceptions.",
    "No ice cube.",
    "The courier will not answer questions about the ice cube.",
    "All sales final. All ice cubes final.",
  ],
  warnings: [
    "WARNING: The ice cube will arrive as water. This is expected. Do not contact customer support. Customer support will not respond.",
  ],
  heroPath: "single-ice-cube/hero.webp",
  galleryPaths: ["single-ice-cube/1.webp"],
  stockLabel: "In Stock (Subject to Melting)",
  shipsIn: "Usually ships in 4–6 weeks",
  soldBy: "Sold by AGWIC Fresh · Fulfilled by AGWIC",
  relatedSlugs: ["emotional-support-brick"],
  seedReviews: [
    {
      authorName: "Confused Customer",
      rating: 3,
      title: "Arrived as water",
      body: "I ordered an ice cube. It arrived as water. I am not sure what I expected. Three stars.",
      verifiedPurchase: true,
      helpfulCount: 623,
      createdAt: "2025-09-08",
    },
    {
      authorName: "Collector",
      rating: 5,
      title: "A piece of art",
      body: "I have ordered this ice cube eleven times. Each one arrives as water. Each one is different. I am building a collection. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 445,
      createdAt: "2025-11-02",
    },
    {
      authorName: "The Courier",
      rating: 5,
      title: "I delivered the ice cube",
      body: "I am the courier. I carried the ice cube across three states. It was water by Nebraska. I handed the customer a bag of water. The customer said thank you. I said you're welcome. We both went home. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 1204,
      createdAt: "2025-12-19",
    },
    {
      authorName: "Practical Buyer",
      rating: 1,
      title: "It is water",
      body: "It is water. One star.",
      verifiedPurchase: true,
      helpfulCount: 234,
      createdAt: "2026-01-11",
    },
    {
      authorName: "T. Jones",
      rating: 5,
      title: "Arrived",
      body: "Arrived. Five stars. No notes.",
      verifiedPurchase: true,
      helpfulCount: 89,
      createdAt: "2025-07-30",
    },
  ],
} satisfies Product;
