export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "whistlers",
    name: "Whistlers",
    description: "For the whistler in your life. And the one in your office.",
  },
  {
    slug: "animals",
    name: "Animals",
    description: "Solutions for the creatures that have overstepped.",
  },
  {
    slug: "noise",
    name: "Noise",
    description: "The leaf blower. The drone. The Sunday.",
  },
  {
    slug: "slow-drivers",
    name: "Slow Drivers",
    description: "The left lane is a philosophy. We have thoughts.",
  },
  {
    slug: "politics-religion",
    name: "Politics & Religion",
    description: "Two aisles we are not allowed to separate. See §7.",
  },
  {
    slug: "kids-on-planes",
    name: "Kids on Planes",
    description: "Travel solutions for the modern parent. The child is fine.",
  },
  {
    slug: "know-it-alls",
    name: "Know-It-Alls",
    description: "For the person who has already told you this.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
