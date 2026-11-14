import type { Product } from "./types";
import { items as items2026 } from "./items/2026";

export const products: Product[] = [...items2026];

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
