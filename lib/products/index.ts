import type { Product } from "./types";

// Products are added here in Message 2. Empty for now.
export const products: Product[] = [];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getRelatedProducts(product: Product): Product[] {
  if (!product.relatedSlugs?.length) return [];
  return product.relatedSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}
