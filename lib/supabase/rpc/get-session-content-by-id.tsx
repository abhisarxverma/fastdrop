import { SupabaseClient } from "@supabase/supabase-js";
import { SessionWithShares } from "@/types/sessions";
import { RpcResult } from "../types";

export async function getSessionContentByIdRpc(
    supabase: SupabaseClient,
    sessionId: string,
): Promise<RpcResult<SessionWithShares>> {
    const { data, error } = await supabase.rpc(
        "get_session_content_by_id",
        {
            p_session_id: sessionId,
        }
    );

    return {
        data: (data as SessionWithShares),
        error: error ?? null,
    };
}
