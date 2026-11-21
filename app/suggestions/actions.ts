"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function submitSuggestion(formData: FormData) {
  const productIdea = String(formData.get("product_idea") ?? "").trim();
  const grievance = String(formData.get("grievance") ?? "").trim();
  const authorName = String(formData.get("author_name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (productIdea.length < 2 || productIdea.length > 500) return;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  await supabase.from("product_requests").insert({
    product_idea: productIdea,
    grievance: grievance || null,
    author_name: authorName || "Anonymous",
    email: email || null,
    status: "PENDING_REVIEW",
  });

  revalidatePath("/suggestions");
}
