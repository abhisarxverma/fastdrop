import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../types";
import { logError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { EditShareInput } from "@/schemas/share/edit-share";

export async function editShareRpc(
    supabase: SupabaseClient,
    user: User,
    input: EditShareInput
): Promise<ShareCreationRpcResult<{ share_id: string }>> {

    const { title, share_id, items } = input;

    const { data, error } = await supabase.rpc(
        "edit_share",
        {
            p_share_id: share_id,
            p_share_title: title,
            p_items: items
        }
    );

    if (error) {
        logError({
            source: "local",
            scope: "edit share rpc",
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