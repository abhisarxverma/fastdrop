import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../types";
import { logError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { EndSessionInput } from "@/schemas/sessions/end-session";

export async function endSessionRpc(
    supabase: SupabaseClient,
    user: User,
    input: EndSessionInput
): Promise<ShareCreationRpcResult<{ session_id: string }>> {

    const { session_id } = input;

    const { data, error } = await supabase.rpc(
        "end_session",
        {
            p_session_id: session_id
        }
    );

    if (error) {
        logError({
            source: "local",
            scope: "end session rpc",
            error,
            meta: input
        });

        return {
            success: false,
            message: mapSupabaseError(error),
            data: null
        };
    }

    return data;
}