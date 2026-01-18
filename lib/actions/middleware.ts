import { createClient } from "@/lib/supabase/server";
import { actionClient } from "./client";
import { SupabaseClient, User } from "@supabase/supabase-js";

type AuthContext = { 
  user: User,
  supabase: SupabaseClient
}

export const authActionClient = actionClient.use<AuthContext>(async ({ next }) => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    await supabase.auth.signInAnonymously();
    const { data: { user: newUser } } = await supabase.auth.getUser();
    if (!newUser) {
      console.error("Auth Middleware Error:", error?.message);
      throw new Error("Session expired. Please log in again.");
    }
  }

  return next({ ctx: { user, supabase } });
});
