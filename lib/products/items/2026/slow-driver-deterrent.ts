import type { Product } from "@/lib/products/types";

export const product = {
  slug: "slow-driver-deterrent",
  name: "Slow Driver Deterrent",
  brand: "AGWIC Automotive",
  priceCents: 1999,
  category: "automotive",
  blurb: "Magnetic. Adhesive. Stays on until they understand.",
  bullets: [
    "THE LEFT LANE IS FOR PASSING*",
    "MAGNETIC BACKING**",
    "UV-RESISTANT†",
    "REMOVABLE WITHOUT RESIDUE‡",
    "LEGAL IN ALL 50 STATES§",
    "RESULTS MAY VARY¶",
  ],
  bulletsFootnotes: [
    {
      marker: "*",
      text: "We did not make this rule. We are simply enforcing it.",
    },
    {
      marker: "**",
      text: "Attaches to any metal surface. Do not attach to non-metal surfaces. It will not stay.",
    },
    { marker: "†", text: "The adhesive is UV-resistant. The message is not." },
    {
      marker: "‡",
      text: "Removal may leave residue. Residue removal kit sold separately.",
    },
    {
      marker: "§",
      text: "Legal status in your state may vary. Consult a lawyer.",
    },
    {
      marker: "¶",
      text: "Results may vary by driver. Some drivers will not understand. Some will. We cannot predict which.",
    },
  ],
  about: `The left lane is for passing. Everyone knows this. Not everyone complies.

The Slow Driver Deterrent is a magnetic bumper sticker designed to communicate this basic fact to drivers who have chosen not to know it. Apply it to the rear of any slow-moving vehicle. Watch as the driver discovers, over the course of several miles, that the left lane is not, in fact, a personal driving lane.

Backed by our 30-day "they'll figure it out" guarantee. Terms apply. Slow drivers may apply.`,
  specs: [
    { label: "Brand", value: "AGWIC Automotive" },
    { label: "Material", value: "Magnetic vinyl" },
    { label: "Dimensions", value: '12" × 3"' },
    { label: "Weight", value: "0.4 oz" },
    { label: "Color", value: "Reflective yellow" },
    { label: "Adhesive", value: "Magnetic. Also adhesive." },
    { label: "Removal", value: "Peel. See §4." },
    { label: "Warranty", value: "30 days against understanding" },
  ],
  customersSay: `Customers say the Slow Driver Deterrent is "effective," "therapeutic," and "raises questions I am not prepared to answer." Some customers report being followed. AI-generated from the text of customer reviews.`,
  qa: [
    {
      question: "Will this work on my spouse?",
      answer:
        "Results may vary. Please do not apply this to your spouse's car without permission.",
      askedBy: "A Customer",
    },
    {
      question: "Is this legal?",
      answer: "In most states. Consult a lawyer. We are not lawyers.",
      askedBy: "Another Customer",
    },
  ],
  terms: [
    "The Slow Driver Deterrent is a magnetic bumper sticker.",
    "It is not a weapon, a threat, or a promise.",
    "It is a request. Please drive faster. Or move over.",
    "Do not apply to a vehicle you do not own.",
    "Do not apply to a vehicle that is currently moving.",
    "Do not apply this to a police vehicle. This is not a joke. Please do not apply this to a police vehicle.",
    "Results may vary by driver. Some drivers will not understand. Some will. We cannot predict which.",
    "All sales final. All drivers final.",
  ],
  termsRef: "section-4",
  warnings: [
    "WARNING: This is a parody store. Do not apply this to any vehicle. Especially not a police vehicle. We are serious about that part.",
  ],
  heroPath: "slow-driver-deterrent/hero.webp",
  galleryPaths: ["slow-driver-deterrent/1.webp"],
  stockLabel: "In Stock",
  shipsIn: "Ships within 24 hours",
  soldBy: "Sold by AGWIC Automotive · Fulfilled by AGWIC",
  badges: ["Best Seller"],
  relatedSlugs: ["noisewhacker-3000"],
  seedReviews: [
    {
      authorName: "Commuter, 47",
      rating: 5,
      title: "The left lane is for passing",
      body: "I bought this for my commute. I applied it to the back of a Prius going 41 in a 55 in the left lane. Three miles later, the Prius moved over. I don't know if it was the sticker or the flashing lights behind it. But something worked. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 523,
      createdAt: "2025-09-02",
    },
    {
      authorName: "A. Driver",
      rating: 5,
      title: "Therapeutic",
      body: "I bought this for my husband. He drives 41 in a 55 in the left lane. He does not know I bought it. He does not know it is on his car. He will find out. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 892,
      createdAt: "2025-11-19",
    },
    {
      authorName: "School Run Parent",
      rating: 4,
      title: "Works on everyone except",
      body: "Works on most cars. Does not work on the Mercedes. I think the Mercedes driver can read. I think they just do not care. Four stars.",
      verifiedPurchase: true,
      helpfulCount: 156,
      createdAt: "2026-01-04",
    },
    {
      authorName: "Slow Driver",
      rating: 1,
      title: "Rude",
      body: "I drive the speed limit. The speed limit is the speed limit. I do not know why everyone is in a hurry. I bought this to see what the fuss was about. It is rude. One star.",
      verifiedPurchase: true,
      helpfulCount: 1004,
      createdAt: "2025-12-15",
    },
    {
      authorName: "T. Jones",
      rating: 5,
      title: "Works",
      body: "It works. Five stars. No notes.",
      verifiedPurchase: true,
      helpfulCount: 38,
      createdAt: "2025-07-22",
    },
  ],
} satisfies Product;
