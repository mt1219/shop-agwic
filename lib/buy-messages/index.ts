import type { BuyMessage } from "./types";
import { buyMessages2026 } from "./products/2026";
import { getCartBuyMessage } from "./cart";

export type { BuyMessage };
export { getCartBuyMessage };

const buyMessages: Record<string, BuyMessage> = {
  ...buyMessages2026,
  // ...buyMessages2027,  ← add next year
};

export const fallbackBuyMessage: BuyMessage = (name) =>
  `Thank you for your purchase of ${name}. It will arrive eventually. See terms.`;

export function getBuyMessage(slug: string, name: string): string {
  return (buyMessages[slug] ?? fallbackBuyMessage)(name);
}
