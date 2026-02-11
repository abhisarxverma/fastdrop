import { SupabaseClient } from "@supabase/supabase-js";
import { NearbySession } from "@/types/sessions";
import { RpcResult } from "../types";

export async function getNearbySessionsRpc(
    supabase: SupabaseClient,
    lat: number,
    lng: number
): Promise<RpcResult<NearbySession[]>> {
    const { data, error } = await supabase.rpc(
        "get_nearby_sessions",
        {
            lat,
            lng,
        }
    ).select("*");

    const sessions: NearbySession[] = (data ?? []) as unknown as NearbySession[];

    return {
        data: sessions,
        error: error ?? null,
    };
}
