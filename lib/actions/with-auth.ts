import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function withAuth<T>(
  fn: (ctx: {
    supabase: SupabaseClient;
    user: { id: string };
  }) => Promise<T>
) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  let user = data.user;

  if (!user || error) {
    await supabase.auth.signInAnonymously();
    const { data: { user: newUser } } = await supabase.auth.getUser();
    if (!newUser) {
      console.error("With-auth action middleware Error:", error?.message);
      throw new Error("Session expired. Please log in again.");
    }
    user = newUser;
  }

  return fn({ supabase, user });
}
