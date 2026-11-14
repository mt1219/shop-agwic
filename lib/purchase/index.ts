"use server";

import { PURCHASE_MODE } from "./mode";
import { simpleBuy } from "./simple";
import { fullBuy } from "./full";

/**
 * The single entry point for buying. Swap implementations via PURCHASE_MODE.
 * Server actions call this; components never import simple/full directly.
 */
export async function buy(slug: string) {
  if (PURCHASE_MODE === "simple") return simpleBuy(slug);
  return fullBuy(slug);
}
