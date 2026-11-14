import type { Product } from "@/lib/products/types";

// Placeholder product for the health-household department.
// Replace with a real product when one is ready.
export const product = {
  slug: "placeholder-health",
  name: "Placeholder Product (Health & Household)",
  brand: "AGWIC",
  priceCents: 1999,
  category: "health-household",
  blurb: "This product is a placeholder. It does nothing. It will be replaced.",
  bullets: [
    "PLACEHOLDER PRODUCT*",
    "THIS IS NOT A REAL PRODUCT**",
    "IT DOES NOTHING†",
    "IT WILL BE REPLACED‡",
    "PLEASE DO NOT BUY THIS§",
  ],
  bulletsFootnotes: [
    {
      marker: "*",
      text: "Placeholder product. Replaced when a real product is added to this department.",
    },
    {
      marker: "**",
      text: "This is not a real product. We are serious about that part.",
    },
    { marker: "†", text: "It does nothing. It will continue to do nothing." },
    { marker: "‡", text: "It will be replaced. Do not grow attached." },
    { marker: "§", text: "Please do not buy this. But the buy button works." },
  ],
  about: `This is a placeholder product for the Health & Household department.

It exists so the department has something in it while we write real products. It does nothing. It will be replaced.

If you are reading this, you should not be reading this. Please see the other products.`,
  specs: [
    { label: "Brand", value: "AGWIC" },
    { label: "Purpose", value: "Placeholder" },
    { label: "Function", value: "None" },
    { label: "Future", value: "Replaced" },
    { label: "Do Not", value: "Buy this" },
  ],
  terms: [
    "This is a placeholder product.",
    "It will be replaced.",
    "It does nothing.",
    "Please do not buy this.",
  ],
  warnings: [
    "WARNING: This is a placeholder product. It will be replaced. Please do not buy this.",
  ],
  heroPath: "placeholder-health/hero.webp",
  galleryPaths: [],
  stockLabel: "In Stock (Placeholder)",
  shipsIn: "Ships eventually",
  soldBy: "Sold by AGWIC · Fulfilled by AGWIC",
  seedReviews: [
    {
      authorName: "Test Reviewer",
      rating: 5,
      title: "It works",
      body: "It works. It is a placeholder. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 1,
      createdAt: "2025-01-01",
    },
  ],
} satisfies Product;
