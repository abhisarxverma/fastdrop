import { PostgrestError } from "@supabase/supabase-js";

export type RpcResult<T> = {
  data: T;
  error: PostgrestError | null;
};
 