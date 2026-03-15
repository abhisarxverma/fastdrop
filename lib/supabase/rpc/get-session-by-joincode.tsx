import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { RpcResult } from "../types";

export async function getSessionByJoincodeRpc(
    supabase: SupabaseClient,
    join_code: string
): Promise<RpcResult<{ session_id: string } | null>> {
    const { data, error } = await supabase.rpc(
        "get_session_by_join_code",
        {
            p_join_code: join_code
        }
    );

    return {
        data: data.success ? data.data.session_id : null,
        error: error ?? (!data.success ? Error(data.message) as PostgrestError : null),
    };
}
