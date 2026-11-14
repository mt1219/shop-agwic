"use server";

import { redirect } from "next/navigation";

/**
 * Phase 1 buy flow: no form. Record the purchase stat, redirect to /bought.
 * The stat bump is stubbed until Supabase is wired. Replace `recordPurchase`
 * with the actual call when the DB is live.
 */
export async function simpleBuy(slug: string) {
  await recordPurchase(slug);
  redirect(`/bought?item=${slug}`);
}

async function recordPurchase(_slug: string) {
  // TODO: call supabase.rpc('bump_stat', { slug, kind: 'purchase' })
  // No-op until Supabase is connected.
}
