"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { recordStat } from "./record";

/**
 * Add to cart: records the stat, returns (client shows toast).
 * The cart itself is imaginary, so there's nothing to store.
 */
export async function addToCartAction(slug: string): Promise<void> {
  await recordStat(slug, "add");
  revalidatePath(`/product/${slug}`);
}

/**
 * Buy now: records the purchase, redirects to /bought.
 */
export async function buyNowAction(slug: string): Promise<void> {
  await recordStat(slug, "purchase");
  redirect(`/bought?item=${slug}`);
}
