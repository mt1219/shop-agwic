import { createClient } from "@supabase/supabase-js";

export type PublicReview = {
  id: string;
  product_slug: string;
  author_name: string;
  rating: number | null;
  title: string | null;
  body: string;
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  admin_comment: string | null;
  admin_commented_at: string | null;
};

export async function getApprovedReviews(
  productSlug: string,
): Promise<PublicReview[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return [];

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from("reviews")
    .select(
      "id, product_slug, author_name, rating, title, body, verified_purchase, helpful_count, created_at, admin_comment, admin_commented_at",
    )
    .eq("product_slug", productSlug)
    .eq("status", "APPROVED")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getApprovedReviews] error:", error.message);
    return [];
  }

  return data ?? [];
}
