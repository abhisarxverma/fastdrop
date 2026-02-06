import { SupabaseClient, User } from "@supabase/supabase-js";
import { withSupabase } from "./with-supabase";

export async function withAuth<T>(
  fn: (ctx: {
    supabase: SupabaseClient;
    user: User;
  }) => Promise<T>
): Promise<T> {
  return withSupabase(async ({ supabase }) => {
    const { data, error } = await supabase.auth.getUser();
    let user = data?.user;

    if (!user || error) {
      // IMPORTANT: auth bootstrap happens once, intentionally
      const anon = await supabase.auth.signInAnonymously();
      if (anon.error || !anon.data.user) {
        throw new Error("Unable to establish session");
      }
      user = anon.data.user;
    }

    return fn({
      user,
      supabase,
    });
  });
}
