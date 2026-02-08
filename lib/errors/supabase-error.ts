
import type { PostgrestError } from "@supabase/supabase-js";

export function mapSupabaseError(error: PostgrestError | null): string {
  if (!error) return "Something went wrong.";

  switch (error.code) {
    case "23P01": 
      return "You already have an active session. End it before creating a new one.";
    case "42501":
      return "You don’t have permission to do this.";
    case "23505":
      return "This already exists.";
    case "PGRST116":
      return "Nothing was found.";
    case "23503":
      return "This item is linked to something else.";
    default:
      return "Something went wrong. Please try again.";
  }
}
