import type { Product } from "./types";

/**
 * HOW TO ADD A PRODUCT
 *
 * 1. Copy this file to `lib/products/items/<year>/<slug>.ts`.
 *    `<year>` = the year you're adding the product (e.g. `2026`).
 * 2. Add one import + one array item to `lib/products/items/<year>/index.ts`.
 * 3. Upload images to the `product-images` Supabase bucket under `<slug>/`
 *    (hero.webp, 1.webp, 2.webp, ...) and insert rows into `product_images`.
 *    Or run `npm run new:product` (when built) to automate this.
 * 4. Add the product to `lib/products/index.ts`.
 * 5. Push. Vercel deploys. Done.
 *
 * THE VOICE:
 * - Deadpan. Never wink at the reader in the product copy.
 * - Bullets are feature-list style, all caps lead.
 * - Specs are grey and boring. Hide jokes here.
 * - The seed reviews are the essay. Each one is a short paragraph of
 *   someone's real life with the grievance, in review format.
 */
export const product = {
  slug: "",
  name: "",
  brand: "",
  priceCents: 0,
  compareAtCents: undefined,
  category: "home-kitchen", // must be a CategorySlug
  blurb: "",
  bullets: [
    // 'ALL CAPS LEAD — deadpan explanation.*',
  ],
  bulletsFootnotes: [
    // { marker: '*', text: '' },
  ],
  about: ``,
  specs: [
    // { label: 'Brand', value: '' },
  ],
  specsFootnotes: [
    // { marker: '†', text: '' },
  ],
  customersSay: undefined,
  qa: [
    // { question: '', answer: '', askedBy: '' },
  ],
  terms: [
    // at least 5 lines
  ],
  termsRef: undefined,
  warnings: [
    // 'This is a parody store. Do not use this product. We are serious.',
  ],
  heroPath: "", // '<slug>/hero.webp'
  galleryPaths: [], // ['<slug>/1.webp', '<slug>/2.webp']
  stockLabel: "In Stock",
  shipsIn: "Ships within 24 hours",
  soldBy: "Sold by AGWIC",
  badges: [],
  relatedSlugs: [],
  compareWith: [],
  seedReviews: [
    // 1. The person who bought it and has a story. Specific. Dramatized grievance.
    {
      authorName: "",
      rating: 5,
      title: "",
      body: "",
      verifiedPurchase: true,
      helpfulCount: 0,
      createdAt: "",
    },
    // 2. A different narrator, escalating the same grievance.
    {
      authorName: "",
      rating: 5,
      title: "",
      body: "",
      verifiedPurchase: true,
      helpfulCount: 0,
      createdAt: "",
    },
    // 3. A third angle — workplace, family, public transit, neighborhood.
    {
      authorName: "",
      rating: 4,
      title: "",
      body: "",
      verifiedPurchase: true,
      helpfulCount: 0,
      createdAt: "",
    },
    // 4. The dissenter — the whistler, the slow driver, the guy who's "not that bad."
    {
      authorName: "",
      rating: 1,
      title: "",
      body: "",
      verifiedPurchase: true,
      helpfulCount: 0,
      createdAt: "",
    },
    // 5. The deadpan utilitarian — "worked, five stars, no notes."
    {
      authorName: "",
      rating: 5,
      title: "",
      body: "",
      verifiedPurchase: true,
      helpfulCount: 0,
      createdAt: "",
    },
  ],
} satisfies Product;
