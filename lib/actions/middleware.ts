import { createClient } from "@/lib/supabase/server";
import { actionClient } from "./client";

export const authActionClient = actionClient.use(async ({ next }) => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Session expired. Please log in again.");
  }
  return next({ ctx: { user, supabase } });
});
