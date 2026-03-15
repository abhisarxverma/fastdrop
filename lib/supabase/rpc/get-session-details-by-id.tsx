import { SupabaseClient } from "@supabase/supabase-js";
import { NearbySession } from "@/types/sessions";
import { RpcResult } from "../types";

export async function getSessionDetailsByIdRpc(
    supabase: SupabaseClient,
    sessionId: string,
    lat: number,
    lng: number
): Promise<RpcResult<NearbySession | null>> {
    const { data, error } = await supabase.rpc(
        "get_session_by_id",
        {
            p_session_id: sessionId,
            p_lat: lat,
            p_lng: lng,
        }
    );

    if (!data || data.length === 0) {
        return {
            data: null,
            error: error ?? null
        }
    }

    return {
        data: (data[0] as NearbySession),
        error: error ?? null,
    };
}
