import type { CategorySlug } from "@/lib/categories";

export type Spec = { label: string; value: string };
export type Bullet = string;
export type Footnote = { marker: string; text: string };
export type QA = { question: string; answer: string; askedBy: string };

export type SeedReview = {
  authorName: string;
  rating: number; // 1–5
  title: string;
  body: string;
  verifiedPurchase?: boolean;
  helpfulCount?: number;
  createdAt: string; // ISO date 'YYYY-MM-DD'
};

export type CompareRow = {
  name: string;
  attributes: Record<string, string | boolean>;
  highlight?: boolean;
};

export type Product = {
  /** URL slug; matches image folder in storage: `slug/hero.webp` */
  slug: string;
  name: string;
  brand: string;
  priceCents: number;
  compareAtCents?: number;
  category: CategorySlug;
  /** One-line teaser. Card + share cards + meta description. */
  blurb: string;
  /** Amazon-style feature bullets. Use * † ‡ § ¶ markers to attach footnotes. */
  bullets: Bullet[];
  /** Resolve markers used in bullets. */
  bulletsFootnotes?: Footnote[];
  /** Amazon-style "About this item" — short paragraph block. */
  about: string;
  /** Plain key/value spec table. Use markers to attach footnotes. */
  specs: Spec[];
  /** Resolve markers used in specs. */
  specsFootnotes?: Footnote[];
  /** The Amazon "Customers say" AI-summary block, hand-written. */
  customersSay?: string;
  /** Q&A section, seeded. */
  qa?: QA[];
  /** Per-product Terms & Conditions. At least 5 lines. */
  terms: string[];
  /** Optional deep-link anchor in /legal/terms, e.g. 'section-4b'. */
  termsRef?: string;
  /** Red small-caps warning block under the buy box. One or two lines. */
  warnings?: string[];
  /** Hero image path in the product-images bucket. */
  heroPath: string;
  /** Additional gallery image paths. */
  galleryPaths: string[];
  /** Stock label — 'In Stock', 'Only 2 left in stock', etc. */
  stockLabel?: string;
  /** Shipping line — 'Ships within 24 hours', 'Usually ships in 4–6 weeks', etc. */
  shipsIn?: string;
  /** Sold-by line — 'Sold by CorkCo · Fulfilled by AGWIC'. */
  soldBy?: string;
  /** Badges — 'Best Seller', "AGWIC's Choice". */
  badges?: string[];
  /** "Frequently bought together" + "Customers also viewed" source. */
  relatedSlugs?: string[];
  /** "Compare with similar items" table rows. */
  compareWith?: CompareRow[];
  /** Seeded reviews — the essay, in review costume. 4–6 per product. */
  seedReviews: SeedReview[];
};
