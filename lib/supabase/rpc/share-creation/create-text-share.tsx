import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../../types";
import { TextShareInput } from "@/schemas/share/text-share";
import { TextShareItem } from "@/types/share-items";
import { logError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";

export async function createTextShareRpc(
    supabase: SupabaseClient,
    user: User,
    input: TextShareInput
): Promise<ShareCreationRpcResult<TextShareItem | null>> {

    const { title, session_id, content } = input;

    const { data, error } = await supabase.rpc(
        "create_text_share",
        {
            p_session_id: session_id,
            p_user_id: user.id,
            p_share_title: title,
            p_item_title: title,
            p_content_text: content
        }
    );

    if (error) {
        logError({
            source: "local",
            scope: "createTextShareRpc",
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