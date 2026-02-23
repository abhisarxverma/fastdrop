import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../../types";
import { FileShareInput } from "@/schemas/share/file-share";
import { FileShareItem } from "@/types/share-items";
import { logError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";

export async function createFileShareRpc(
    supabase: SupabaseClient,
    user: User,
    input: FileShareInput
): Promise<ShareCreationRpcResult<FileShareItem | null>> {

    const { title, session_id, file_name, file_type, file_path } = input;

    const { data, error } = await supabase.rpc(
        "create_file_share",
        {
            p_session_id: session_id,
            p_user_id: user.id,
            p_share_title: title,
            p_item_title: title,
            p_file_name: file_name,
            p_file_path: file_path,
            p_file_type: file_type
        }
    );

    if (error) {
        logError({
            source: "local",
            scope: "createFileShareRpc",
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