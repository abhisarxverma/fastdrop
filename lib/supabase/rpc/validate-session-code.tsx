import { SupabaseClient } from "@supabase/supabase-js";
import { RpcResult } from "../types";

export async function validateSessionCodeRpc(
  supabase: SupabaseClient,
  sessionId: string,
  code: string
): Promise<RpcResult<boolean>> {
  const { data, error } = await supabase.rpc(
    "validate_session_code",
    {
      p_session_id: sessionId,
      p_code: code
    }
  );

  return {
    data: data === true,
    error: error ?? null,
  };
}
