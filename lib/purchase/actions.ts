"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { recordStat } from "./record";
import { readCart, writeCart, type CartItem } from "@/lib/cart";

export async function addToCartAction(slug: string): Promise<void> {
  await recordStat(slug, "add");

  const cart = await readCart();
  const existing = cart.find((item) => item.slug === slug);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ slug, qty: 1 });
  }
  await writeCart(cart);

  revalidatePath("/cart");
  revalidatePath(`/product/${slug}`);
  revalidatePath("/", "layout"); // header badge count
}

export async function removeFromCartAction(slug: string): Promise<void> {
  const cart = await readCart();
  await writeCart(cart.filter((item) => item.slug !== slug));
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function updateQtyAction(
  slug: string,
  qty: number,
): Promise<void> {
  const cart = await readCart();
  const next: CartItem[] = cart.map((item) =>
    item.slug === slug ? { ...item, qty: Math.max(0, qty) } : item,
  );
  await writeCart(next);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function clearCartAction(): Promise<void> {
  await writeCart([]);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

/**
 * Buy everything in the cart. Loops products, records each purchase.
 * For now: navigates to /bought?from=cart, which shows a combined message.
 * When Phase 2 lands, this becomes /purchase (email form) instead.
 */
export async function buyCartAction(): Promise<void> {
  const cart = await readCart();
  for (const item of cart) {
    await recordStat(item.slug, "purchase");
  }
  await writeCart([]);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
  redirect("/bought?from=cart");
}

/**
 * Buy Now: single-item immediate purchase. Unchanged.
 */
export async function buyNowAction(slug: string): Promise<void> {
  await recordStat(slug, "purchase");
  redirect(`/bought?item=${slug}`);
}
