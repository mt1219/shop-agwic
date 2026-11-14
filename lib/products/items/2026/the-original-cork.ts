import type { Product } from "@/lib/products/types";

export const product = {
  slug: "the-original-cork",
  name: "The Original Cork™",
  brand: "CorkCo",
  priceCents: 2999,
  compareAtCents: 4999,
  category: "home-kitchen",
  blurb:
    'Stop whistlers instantly. You\'ve heard "put a cork in it." Well. Now you can.',
  bullets: [
    "STOP WHISTLERS INSTANTLY*",
    "GENUINE NATURAL CORK**",
    "REUSABLE — Unfortunately.***",
    "UNIVERSAL FIT†",
    "LEGAL IN 47 STATES‡",
    "NOT FOR WINE§",
  ],
  bulletsFootnotes: [
    { marker: "*", text: '"Instantly" means at a moment of our choosing.' },
    { marker: "**", text: '"Genuine" is a marketing term. The cork is real.' },
    {
      marker: "***",
      text: "Reusability not guaranteed. Rinse. Do not discuss.",
    },
    {
      marker: "†",
      text: '"Universal" means it fits most mouths. Sizing guide not included.',
    },
    {
      marker: "‡",
      text: "Legal status varies by state, county, municipality, and the mood of the officer.",
    },
    {
      marker: "§",
      text: "Please. We're begging you. Do not put this in wine.",
    },
  ],
  about: `For centuries, the cork has served one purpose: sealing wine. We looked at it and asked a simple question — why stop there?

The Original Cork™ is a premium, food-grade, artisanal cork, engineered for the modern grievance. Whether the whistler is in the office, on the subway, or in your own home, the solution is the same: present the cork. No instructions needed. They will understand.

Backed by our 30-day whistle-free guarantee. Terms apply. Whistlers may apply.`,
  specs: [
    { label: "Brand", value: "CorkCo" },
    { label: "Material", value: "Natural cork (certified††)" },
    { label: "Dimensions", value: '1.75" × 0.75"' },
    { label: "Weight", value: "0.1 oz" },
    { label: "Color", value: "Cork" },
    { label: "Care Instructions", value: "Rinse. Do not discuss." },
    { label: "Warranty", value: "30 days against whistle" },
    { label: "Legal Status", value: "Varies by jurisdiction‡‡" },
    { label: "Country of Origin", value: "Portugal (probably§)" },
  ],
  specsFootnotes: [
    { marker: "††", text: "Certification pending." },
    { marker: "‡‡", text: "See §4 of the full Terms & Conditions." },
  ],
  customersSay: `Customers say the cork is "effective," "exactly what I needed," and "legal in most states." They particularly praise its ability to stop whistlers. Some customers report not knowing where the whistler went. AI-generated from the text of customer reviews.`,
  qa: [
    {
      question: "Will this work on my neighbor?",
      answer: "Yes. Results may vary by neighbor.",
      askedBy: "A. Customer",
    },
    {
      question: "Is this food safe?",
      answer: "It is. That is not the point.",
      askedBy: "Concerned Parent",
    },
    {
      question: "Does it come in black?",
      answer: "No.",
      askedBy: "A Customer",
    },
  ],
  terms: [
    "By purchasing The Original Cork™ you agree that the whistler will be silenced by means we are not obligated to disclose.",
    "Silence is not the same as absence. Absence is not the same as silence.",
    "No refunds after use. No refunds before use. No refunds.",
    "We are not responsible for what happens next. See §4(b) for what happened next.",
    "This cork is not a weapon. It is a cork.",
    "Results may vary by whistler. Some whistlers may continue whistling. Some may not. We cannot predict which.",
    "If you are a whistler, please do not purchase this product. If you are a whistler and have already purchased this product, please see §8.",
    "See §7.",
    "All sales final. All whistlers final.",
  ],
  termsRef: "section-4b",
  warnings: [
    "WARNING: This is a parody store. The cork is not a weapon. Do not put it in anyone's mouth. If you are currently being whistled at, please contact a licensed professional. We are not licensed professionals.",
  ],
  heroPath: "the-original-cork/hero.webp",
  galleryPaths: ["the-original-cork/1.webp", "the-original-cork/2.webp"],
  stockLabel: "In Stock",
  shipsIn: "Ships within 24 hours",
  soldBy: "Sold by CorkCo · Fulfilled by AGWIC",
  badges: ["Best Seller", "AGWIC's Choice"],
  relatedSlugs: ["emotional-support-brick", "permission-to-leave-the-party"],
  compareWith: [
    {
      name: "The Original Cork™",
      attributes: {
        Price: "$29.99",
        "Stops Whistlers": true,
        Reusable: true,
        "Legal Status": "Varies",
        "Ships From": "Portugal",
      },
      highlight: true,
    },
    {
      name: "Generic Cork (3-pack)",
      attributes: {
        Price: "$4.99",
        "Stops Whistlers": false,
        Reusable: true,
        "Legal Status": "Wine only",
        "Ships From": "Domestic",
      },
    },
    {
      name: "Cork, Refurbished",
      attributes: {
        Price: "$19.99",
        "Stops Whistlers": true,
        Reusable: "Formerly",
        "Legal Status": "Questionable",
        "Ships From": "Unknown",
      },
    },
    {
      name: "Cork — Signed Edition",
      attributes: {
        Price: "$89.99",
        "Stops Whistlers": true,
        Reusable: "No",
        "Legal Status": "Signed",
        "Ships From": "Portugal",
      },
    },
  ],
  seedReviews: [
    {
      authorName: "Greg M.",
      rating: 5,
      title: "I bought this for my coworker",
      body: "Dave whistles. Not songs. Just... tones. Little improvisational tones, all day, off-key, with no apparent source or destination. I put the cork on his desk. He looked at it. He looked at me. He has not whistled since. I don't know what happened and I don't want to. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 214,
      createdAt: "2025-11-04",
    },
    {
      authorName: "Subway Rider",
      rating: 5,
      title: "The man on the F train",
      body: "There is a man on the F train who whistles the same four notes. Every morning. Same four notes. I have heard them every weekday for six years. I bought the cork. I have not seen him since Tuesday. I am not going to elaborate. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 189,
      createdAt: "2026-01-12",
    },
    {
      authorName: "Mom of Three",
      rating: 4,
      title: "Works on the school run",
      body: "My son whistles when he is happy. He is happy a lot. The cork arrived Friday. Saturday was the quietest day of my life. I cried. Not because I was sad. Because it was quiet. One star off because it does not work on the dog.",
      verifiedPurchase: true,
      helpfulCount: 96,
      createdAt: "2025-08-19",
    },
    {
      authorName: "A. Whistler",
      rating: 1,
      title: "Did not work",
      body: "I am a whistler. I bought this to see what the fuss was about. The cork is smaller than I expected. I did not use it. I will continue whistling. One star.",
      verifiedPurchase: true,
      helpfulCount: 312,
      createdAt: "2026-02-02",
    },
    {
      authorName: "HOA President",
      rating: 5,
      title: "FINALLY",
      body: "We have a neighborhood whistler. We have tried bylaws. We have tried letters. We have tried a community meeting. The cork worked in one afternoon. I am not asking follow-up questions. I am sleeping through the night for the first time since 2019. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 441,
      createdAt: "2025-06-30",
    },
  ],
} satisfies Product;
