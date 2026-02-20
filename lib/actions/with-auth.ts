import { SupabaseClient, User } from "@supabase/supabase-js";
import { withSupabase } from "./with-supabase";

export async function withAuth<T>(
  fn: (ctx: {
    supabase: SupabaseClient;
    user: User;
    token: string; 
  }) => Promise<T>
): Promise<T> {
  return withSupabase(async ({ supabase }) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    let user = userData?.user;

    if (!user || userError) {
      const anon = await supabase.auth.signInAnonymously();
      if (anon.error || !anon.data.user) {
        throw new Error("Unable to establish session");
      }
      user = anon.data.user;
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
      throw new Error("Unable to retrieve session token");
    }

    const token = sessionData.session.access_token;

    return fn({
      user,
      supabase,
      token,
    });
  });
}
