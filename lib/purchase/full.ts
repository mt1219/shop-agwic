"use server";

import { redirect } from "next/navigation";

/**
 * Phase 2 buy flow: redirect to /purchase?item=<slug>, collect name + email,
 * submit, redirect to /confirmation, send email via Resend.
 *
 * Stub for now — the pages and actions land in Message 3.
 */
export async function fullBuy(slug: string) {
  redirect(`/purchase?item=${slug}`);
}
