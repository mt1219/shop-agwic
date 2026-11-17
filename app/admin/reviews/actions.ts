"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function approveReview(reviewId: string, productSlug: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("reviews")
    .update({ status: "APPROVED" })
    .eq("id", reviewId);
  if (error) throw new Error(error.message);

  await supabase.rpc("recompute_review_stats", { slug: productSlug });
  revalidatePath("/admin/reviews");
  revalidatePath(`/product/${productSlug}`);
}

export async function returnReview(reviewId: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("reviews")
    .update({ status: "RETURNED" })
    .eq("id", reviewId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
}

export async function escalateReview(reviewId: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("reviews")
    .update({ status: "ESCALATED" })
    .eq("id", reviewId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
}

export async function addAdminComment(reviewId: string, comment: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("reviews")
    .update({
      admin_comment: comment.trim() || null,
      admin_commented_at: comment.trim() ? new Date().toISOString() : null,
    })
    .eq("id", reviewId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
}

export async function deleteReview(reviewId: string, productSlug: string) {
  const supabase = getSupabase();
  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
  if (error) throw new Error(error.message);

  await supabase.rpc("recompute_review_stats", { slug: productSlug });
  revalidatePath("/admin/reviews");
  revalidatePath(`/product/${productSlug}`);
}
