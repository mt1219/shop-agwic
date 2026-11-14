/**
 * Records a stat bump for a product. Currently a no-op until Supabase
 * is connected. When it is, this calls rpc('bump_stat', { slug, kind }).
 *
 * The 'kind' is either 'add' (add-to-cart) or 'purchase' (buy).
 */
export async function recordStat(
  slug: string,
  kind: "add" | "purchase",
): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // No Supabase configured — silent no-op.
    console.log(`[recordStat] (no-op) ${kind}: ${slug}`);
    return;
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.rpc("bump_stat", { slug, kind });
    if (error) {
      console.error(`[recordStat] bump_stat error for ${slug}:`, error.message);
    }
  } catch (e) {
    console.error("[recordStat] unexpected error:", e);
  }
}
