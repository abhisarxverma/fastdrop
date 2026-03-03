import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../types";
import { logError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { DeleteShareInput } from "@/schemas/share/delete-share";

export async function deleteShareRpc(
    supabase: SupabaseClient,
    user: User,
    input: DeleteShareInput
): Promise<ShareCreationRpcResult<{ share_id: string }>> {

    const { share_id } = input;

    const { data, error } = await supabase.rpc(
        "delete_share",
        {
            p_share_id: share_id
        }
    );

    if (error) {
        logError({
            source: "local",
            scope: "delete share rpc",
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