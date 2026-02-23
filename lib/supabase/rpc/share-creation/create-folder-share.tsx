import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../../types";
import { logError } from "@/lib/logging/logger";
import { FolderShareInput } from "@/schemas/share/folder-share";
import { mapSupabaseError } from "@/lib/errors/supabase-error";

export async function createFolderShareRpc(
    supabase: SupabaseClient,
    user: User,
    input: FolderShareInput
): Promise<ShareCreationRpcResult<string | null>> {

    const { title, session_id, items } = input;

    const { data, error } = await supabase.rpc(
        "create_folder_share",
        {
            p_session_id: session_id,
            p_user_id: user.id,
            p_share_title: title,
            p_items: items
        }
    );

    if (error) {
        logError({
            source: "local",
            scope: "createFolderShareRpc",
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