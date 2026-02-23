import { SupabaseClient } from "@supabase/supabase-js";
import { RpcResult } from "../types";

export async function isUserBanned(
  supabase: SupabaseClient,
  sessionId: string,
  userId: string
): Promise<RpcResult<boolean>> {
  const { data, error } = await supabase.rpc(
    "is_user_banned",
    {
      p_session_id: sessionId,
      p_user_id: userId
    }
  );

  return {
    data: data === true,
    error: error ?? null,
  };
}
