import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../types";
import { logError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { BanUserInput } from "@/schemas/user/ban-user";

export async function banUserFromSharingRpc(
    supabase: SupabaseClient,
    user: User,
    input: BanUserInput
): Promise<ShareCreationRpcResult<{ user_id: string }>> {

    const { session_id } = input;

    const { data, error } = await supabase.rpc(
        "ban_user_from_sharing",
        {
            p_session_id: session_id,
            p_user_id: user.id
        }
    );

    if (error) {
        logError({
            source: "local",
            scope: "ban user from sharing rpc",
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