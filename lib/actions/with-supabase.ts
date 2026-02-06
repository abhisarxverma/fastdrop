import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function withSupabase<T>(
  fn: (ctx: { supabase: SupabaseClient }) => Promise<T>
): Promise<T> {
  const supabase = await createClient();
  return fn({ supabase });
}
