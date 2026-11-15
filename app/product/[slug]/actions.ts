"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const ReviewSchema = z.object({
  productSlug: z.string().min(1),
  rating: z.number().int().min(1).max(5).optional(),
  title: z.string().trim().max(120).optional(),
  body: z.string().trim().min(2, "Please write something.").max(2000),
});

export type SubmitReviewResult = { ok: true } | { ok: false; error: string };

export async function submitReview(
  formData: FormData,
): Promise<SubmitReviewResult> {
  const productSlug = String(formData.get("productSlug") ?? "");
  const ratingRaw = formData.get("rating");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  const parsed = ReviewSchema.safeParse({
    productSlug,
    rating: ratingRaw ? Number(ratingRaw) : undefined,
    title: title || undefined,
    body,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid review.",
    };
  }

  const { data } = parsed;

  // Supabase not configured? Simulate success so the UX is testable.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.log(
      "[submitReview] (no-op) accepted:",
      data.productSlug,
      data.rating,
    );
    revalidatePath(`/product/${data.productSlug}`);
    return { ok: true };
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from("reviews").insert({
      product_slug: data.productSlug,
      author_name: "Anonymous",
      rating: data.rating ?? null,
      title: data.title ?? null,
      body: data.body,
      status: "PENDING_REVIEW",
      is_seed: false,
      verified_purchase: false,
      helpful_count: 0,
    });

    if (error) {
      console.error("[submitReview] insert error:", error.message);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  } catch (e) {
    console.error("[submitReview] unexpected error:", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  revalidatePath(`/product/${data.productSlug}`);
  return { ok: true };
}
