import type { Product } from "@/lib/products/types";

export const product = {
  slug: "the-whistler-enhancer",
  name: "The Whistler Enhancer™",
  createdAt: "2026-11-19",
  brand: "WhistleWorks Inc.",
  priceCents: 3999,
  compareAtCents: 5999,
  category: "home-kitchen",
  blurb:
    "Worried no one can hear your whistling? Now they can. They have no choice.",
  bullets: [
    "AMPLIFIES WHISTLING BY 40 DECIBELS*",
    "OMNIDIRECTIONAL — EVERYONE HEARS YOU**",
    "BATTERY OPERATED — 9V, not included†",
    "ERGONOMIC HEAD STRAP‡",
    "NOT ENDORSED BY ANYONE§",
    "NOT A MEDICAL DEVICE¶",
  ],
  bulletsFootnotes: [
    {
      marker: "*",
      text: "Decibel amplification measured at the source. Your neighbors may experience different results.",
    },
    {
      marker: "**",
      text: "Everyone in a 50-foot radius. Everyone in the building. Everyone in the parking lot.",
    },
    {
      marker: "†",
      text: "9V battery sold separately. Battery life: 4–6 hours. Battery life: 4–6 hours.",
    },
    {
      marker: "‡",
      text: "Fits most heads. Sizing guide not included. Head not included.",
    },
    {
      marker: "§",
      text: "Not endorsed by anyone. Not endorsed by the Content Review Team. The Content Review Team is in a huddle.",
    },
    {
      marker: "¶",
      text: "This is not a medical device. This is not a device. This is a whistle amplifier.",
    },
  ],
  about: `You whistle. You know you whistle. You have been told, repeatedly, to stop. You have not stopped.

The Whistler Enhancer™ is for the whistler who has chosen not to stop, and who would like others to hear the choice. It is a head-mounted amplification system designed to broadcast your whistling to a wider audience. The audience is not optional. The audience is everyone.

Whether you're performing "Row Row Row Your Boat" on the subway, "On Top of Old Smokey" in the office, or an original composition in a quiet restaurant, the Whistler Enhancer™ ensures that no one within earshot will miss a single note. They will hear every note. They will hear nothing else.

Backed by our 30-day "they heard you" guarantee. Terms apply. Everyone applies.`,
  specs: [
    { label: "Brand", value: "WhistleWorks Inc." },
    { label: "Material", value: "ABS plastic, matte aluminum" },
    { label: "Dimensions", value: '8" × 4" × 3" (amplifier unit)' },
    { label: "Weight", value: "1.2 lbs" },
    { label: "Battery", value: "9V (not included)" },
    { label: "Battery Life", value: "4–6 hours" },
    { label: "Range", value: "Entire store" },
    { label: "Warranty", value: "30 days against silence" },
    { label: "Country of Origin", value: "Unknown" },
  ],
  specsFootnotes: [
    { marker: "††", text: "Battery not included. Battery not included." },
    {
      marker: "‡‡",
      text: "Range measured in an open field. Your results may vary. Your neighbors may vary.",
    },
  ],
  customersSay: `Customers say the Whistler Enhancer™ is "loud," "very loud," and "the loudest thing I have ever heard." They particularly praise its ability to make whistling audible to everyone in a three-block radius. Some customers report being asked to leave. AI-generated from the text of customer reviews.`,
  qa: [
    {
      question: "Will this work on my coworker?",
      answer: "It will work on everyone. It will not stop working on everyone.",
      askedBy: "A. Customer",
    },
    {
      question: "Is it legal?",
      answer:
        "Legal in all jusisdictions leaf blowers are legal. In some jurisdictions, it is encouraged. In one jurisdiction, it is mandatory.",
      askedBy: "Concerned Neighbor",
    },
    {
      question: "Does it come in black?",
      answer: "It comes in black. It also comes in louder black.",
      askedBy: "A Customer",
    },
  ],
  terms: [
    "By purchasing The Whistler Enhancer™ you agree that the whistler will be amplified by means we are not obligated to disclose.",
    "Amplification is not the same as appreciation. Appreciation is not the same as amplification.",
    "No refunds after use. No refunds before use. No refunds.",
    "We are not responsible for what happens next. See §7 for what happened next.",
    "This device is not a weapon. It is a whistle amplifier. It is also a weapon.",
    "Results may vary by whistler. Some whistlers may whistle louder. Some may whistle much louder. We cannot predict which.",
    "If you are a whistler, please purchase this product. If you are a whistler and have already purchased this product, please see §8.",
    "See §7.",
    "All sales final. All whistlers final.",
  ],
  termsRef: "section-4b",
  warnings: [
    "WARNING: Do not amplify any whistler. Do not wear this device. Do not whistle. We are serious about that part.",
  ],
  heroPath: "the-whistler-enhancer/hero.webp",
  galleryPaths: [
    "the-whistler-enhancer/1.webp",
    "the-whistler-enhancer/2.webp",
  ],
  stockLabel: "In Stock",
  shipsIn: "Ships within 24 hours",
  soldBy: "Sold by WhistleWorks Inc. · Fulfilled by AGWIC",
  badges: ["AGWIC's Choice"],
  relatedSlugs: ["the-original-cork", "emotional-support-brick"],
  compareWith: [
    {
      name: "The Whistler Enhancer™",
      attributes: {
        Price: "$39.99",
        "Stops Whistlers": false,
        "Amplifies Whistlers": true,
        "Legal Status": "Varies",
        "Ships From": "Unknown",
      },
      highlight: true,
    },
    {
      name: "The Original Cork™",
      attributes: {
        Price: "$29.99",
        "Stops Whistlers": true,
        "Amplifies Whistlers": false,
        "Legal Status": "Varies",
        "Ships From": "Portugal",
      },
    },
    {
      name: "Generic Cork (3-pack)",
      attributes: {
        Price: "$4.99",
        "Stops Whistlers": false,
        "Amplifies Whistlers": false,
        "Legal Status": "Wine only",
        "Ships From": "Domestic",
      },
    },
    {
      name: "The Whistler Enhancer™ (Signed Edition)",
      attributes: {
        Price: "$199.99",
        "Stops Whistlers": false,
        "Amplifies Whistlers": true,
        "Legal Status": "Signed",
        "Ships From": "Unknown",
      },
    },
  ],
  seedReviews: [
    {
      authorName: "Coworker, 34",
      rating: 5,
      title: "He heard me",
      body: "I bought this for my coworker Dave. Dave whistles. He whistles the same four notes all day. I gave him the Enhancer. He put it on. He whistled. He whistled louder. The whole floor heard him. He has not stopped. I have not asked him to stop. I am not going to ask him to stop. Five stars.",
      verifiedPurchase: true,
      helpfulCount: 423,
      createdAt: "2025-10-14",
    },
    {
      authorName: "Subway Rider",
      rating: 5,
      title: "The F train heard it",
      body: 'I bought this for myself. I whistled "Row Row Row Your Boat" on the F train. The car went quiet. Then the car went loud. Then the conductor asked me to stop. I did not stop. The conductor heard me. Everyone heard me. Five stars.',
      verifiedPurchase: true,
      helpfulCount: 312,
      createdAt: "2025-11-02",
    },
    {
      authorName: "A Whistler",
      rating: 4,
      title: "It works",
      body: "I am a whistler. I have always been a whistler. This product lets me whistle louder. It lets me whistle to more people. It lets me whistle at more people. One star off because the battery only lasts 4–6 hours. I need it to last longer. I need it to last forever.",
      verifiedPurchase: true,
      helpfulCount: 256,
      createdAt: "2025-09-28",
    },
    {
      authorName: "Concerned Neighbor",
      rating: 1,
      title: "I heard it",
      body: "I heard it. I heard it all night. I heard it through the wall. I heard it through the floor. I heard it in my sleep. I have not spoken to the neighbor. I do not know what to say. I do not want to know. One star.",
      verifiedPurchase: true,
      helpfulCount: 891,
      createdAt: "2025-12-11",
    },
    {
      authorName: "T. Jones",
      rating: 5,
      title: "Works",
      body: "It works. Five stars. No notes.",
      verifiedPurchase: true,
      helpfulCount: 41,
      createdAt: "2025-07-22",
    },
  ],
} satisfies Product;
