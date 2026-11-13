export const categories = [
  {
    slug: "home-kitchen",
    name: "Home & Kitchen",
    description: "Things for the home. Mostly.",
  },
  {
    slug: "garden-outdoor",
    name: "Garden & Outdoor",
    description: "For the yard. And what's in it.",
  },
  {
    slug: "automotive",
    name: "Automotive",
    description: "The road is a shared experience. We're working on it.",
  },
  {
    slug: "electronics",
    name: "Electronics",
    description: "Devices. Some of which function.",
  },
  {
    slug: "health-household",
    name: "Health & Household",
    description: "For you. Or someone like you.",
  },
  {
    slug: "office",
    name: "Office Products",
    description: "For the people you work with. And the ones you don't.",
  },
  {
    slug: "toys-games",
    name: "Toys & Games",
    description:
      "For the young. And the young at heart. And the young at everyone.",
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
