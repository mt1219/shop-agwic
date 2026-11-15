import { cookies } from "next/headers";

export type CartItem = { slug: string; qty: number };

const COOKIE_NAME = "agwic_cart";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function readCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item &&
        typeof item.slug === "string" &&
        typeof item.qty === "number" &&
        item.qty > 0,
    );
  } catch {
    return [];
  }
}

export async function writeCart(items: CartItem[]): Promise<void> {
  const cookieStore = await cookies();
  const filtered = items.filter((i) => i.qty > 0);
  cookieStore.set(COOKIE_NAME, JSON.stringify(filtered), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export function cartTotalItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}
