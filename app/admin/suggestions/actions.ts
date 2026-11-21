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

export async function approveSuggestion(id: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("product_requests")
    .update({ status: "APPROVED" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/suggestions");
  revalidatePath("/suggestions");
}

export async function returnSuggestion(id: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("product_requests")
    .update({ status: "RETURNED" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/suggestions");
}

export async function deleteSuggestion(id: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("product_requests")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/suggestions");
  revalidatePath("/suggestions");
}
