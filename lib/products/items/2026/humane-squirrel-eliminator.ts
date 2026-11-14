import type { Product } from "@/lib/products/types";

export const product = {
  slug: "humane-squirrel-eliminator",
  name: "The Humane Squirrel Eliminator™",
  brand: "SquirrelPeace Industries",
  priceCents: 4999,
  category: "garden-outdoor",
  blurb:
    "Humanely get rid of squirrels. They won't feel a thing. That's the point.",
  bullets: [
    "HUMANELY GET RID OF SQUIRRELS*",
    "PRECISION-ENGINEERED**",
    "WHISPER-QUIET†",
    "GENUINE HARDWOOD‡",
    "EASY ASSEMBLY — 4 minutes. Conscience sold separately.§",
    "NOT INTENDED FOR ANIMALS¶",
  ],
  bulletsFootnotes: [
    { marker: "*", text: "They won't feel a thing. That's the point." },
    {
      marker: "**",
      text: "Single-squirrel capacity. Bait goes on one side, squirrel on the other.",
    },
    { marker: "†", text: "Your neighbors will never know." },
    { marker: "‡", text: "Maple frame. Stainless blade. Hand-honed." },
    { marker: "§", text: "See §6 of the full Terms & Conditions." },
    {
      marker: "¶",
      text: "We're serious about that part. Please do not guillotine anything.",
    },
  ],
  about: `We tried everything. Traps. Repellents. A stern conversation. Nothing worked.

Then we asked: what's the most humane way to solve a squirrel problem? And the answer, as it turns out, has been around since 1793.

The Humane Squirrel Eliminator™ is a precision-engineered, single-squirrel guillotine. Bait goes on one side. The squirrel goes on the other. What happens next is instantaneous, painless, and above all — humane. We can't stress that enough.`,
  specs: [
    { label: "Brand", value: "SquirrelPeace Industries" },
    { label: "Material", value: "Maple, stainless steel" },
    { label: "Dimensions", value: '14" × 8" × 22"' },
    { label: "Weight", value: "9 lbs" },
    { label: "Bait Capacity", value: "1 acorn" },
    { label: "Assembly", value: "4 minutes" },
    { label: "Conscience", value: "See instructions" },
    { label: "Warranty", value: "Lifetime (of the squirrel)" },
  ],
  customersSay: `Customers say this product "works," "is humane," and "raises questions I am not prepared to answer." They praise its precision and quiet operation. One customer, a squirrel, disagreed. AI-generated from the text of customer reviews.`,
  qa: [
    {
      question: "Is this legal?",
      answer:
        "In some jurisdictions. We are not lawyers. Please check local laws.",
      askedBy: "A Customer",
    },
    {
      question: "Does it work on other animals?",
      answer: "It is not intended for animals. Please see the warning.",
      askedBy: "Concerned Neighbor",
    },
  ],
  terms: [
    "The Humane Squirrel Eliminator™ is intended for squirrels and squirrels only.",
    "It is not intended for any other animal. We are serious about that part.",
    "It is not intended for use on humans, including whistlers. (See The Original Cork™ for that.)",
    "Bait not included. You'll know what to use.",
    "Assembly: 4 minutes. Conscience: see instructions.",
    "Results may vary by squirrel. Some squirrels may be faster than others. We cannot predict which.",
    "If you have named the squirrel, this product is not for you.",
    "If you have not named the squirrel, please consider naming the squirrel.",
    "All sales final. All squirrels final.",
  ],
  termsRef: "section-6",
  warnings: [
    "WARNING: This is a parody store. Do not guillotine anything. Not a squirrel. Not a whistler. Not a person. Not a sandwich. Nothing. We are serious about that part.",
  ],
  heroPath: "humane-squirrel-eliminator/hero.webp",
  galleryPaths: [
    "humane-squirrel-eliminator/1.webp",
    "humane-squirrel-eliminator/2.webp",
  ],
  stockLabel: "Only 2 left in stock",
  shipsIn: "Usually ships in 4–6 weeks",
  soldBy: "Sold by SquirrelPeace Industries · Fulfilled by AGWIC",
  badges: ["Best Seller"],
  relatedSlugs: ["noisewhacker-3000", "emotional-support-brick"],
  seedReviews: [
    {
      authorName: "Gardener, 62",
      rating: 5,
      title: "Six years of war. Over.",
      body: "I have tried everything. Cayenne. Netting. A scarecrow I made myself, which the squirrels seemed to enjoy. The Humane Squirrel Eliminator™ arrived on a Tuesday. By Thursday, the garden was quiet. I have not seen a squirrel since. I have not asked where they went. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 892,
      createdAt: "2025-09-14",
    },
    {
      authorName: "A. Homeowner",
      rating: 5,
      title: "I can finally sleep",
      body: "The squirrels were in the attic. Not the walls. The attic. All night. Scratching. My wife stopped sleeping. We tried everything. Then we tried this. I am not going to describe what happened next. But we both sleep now. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 445,
      createdAt: "2025-10-22",
    },
    {
      authorName: "Birdwatcher",
      rating: 4,
      title: "Effective. A little much.",
      body: "It works. It absolutely works. The birds are back at the feeder, which is what I wanted. One star off because my neighbor asked what the noise was and I didn't know what to say. I still don't.",
      verifiedPurchase: true,
      helpfulCount: 201,
      createdAt: "2025-12-03",
    },
    {
      authorName: "Nutty (a squirrel)",
      rating: 1,
      title: "Do not recommend",
      body: "I found this in a yard. It looked interesting. I went in. I am writing this from a different plane of existence. One star. Would not buy again.",
      verifiedPurchase: true,
      helpfulCount: 1204,
      createdAt: "2026-01-08",
    },
    {
      authorName: "E. Smith",
      rating: 5,
      title: "Worked. Five stars. No notes.",
      body: "Worked. Five stars. No notes.",
      verifiedPurchase: true,
      helpfulCount: 67,
      createdAt: "2025-07-19",
    },
  ],
} satisfies Product;
