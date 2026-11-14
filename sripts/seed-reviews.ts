/**
 * Idempotent seed script — inserts each product's seedReviews into the
 * reviews table, skipping any that already exist (matched by product_slug +
 * is_seed = true).
 *
 * Run:  npx tsx scripts/seed-reviews.ts
 *
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY.
 */

import { createClient } from "@supabase/supabase-js";
import { products } from "../lib/products";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env",
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let inserted = 0;
  let skipped = 0;

  for (const product of products) {
    const { count, error: countErr } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("product_slug", product.slug)
      .eq("is_seed", true);

    if (countErr) {
      console.error(`[${product.slug}] count error:`, countErr.message);
      continue;
    }

    if ((count ?? 0) > 0) {
      console.log(`[${product.slug}] seeds already present, skipping`);
      skipped++;
      continue;
    }

    const rows = product.seedReviews.map((r) => ({
      product_slug: product.slug,
      author_name: r.authorName,
      rating: r.rating,
      title: r.title,
      body: r.body,
      is_seed: true,
      verified_purchase: r.verifiedPurchase ?? false,
      helpful_count: r.helpfulCount ?? 0,
      published: true,
      created_at: new Date(r.createdAt).toISOString(),
    }));

    const { error: insertErr } = await supabase.from("reviews").insert(rows);
    if (insertErr) {
      console.error(`[${product.slug}] insert error:`, insertErr.message);
      continue;
    }

    // Recompute stats for this slug
    const { error: rpcErr } = await supabase.rpc("recompute_review_stats", {
      slug: product.slug,
    });
    if (rpcErr) {
      console.error(`[${product.slug}] recompute error:`, rpcErr.message);
    }

    console.log(`[${product.slug}] inserted ${rows.length} seed reviews`);
    inserted += rows.length;
  }

  console.log(
    `\nDone. Inserted: ${inserted} reviews. Skipped products: ${skipped}.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
