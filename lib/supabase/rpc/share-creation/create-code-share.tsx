import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../../types";
import { CodeShareInput } from "@/schemas/share/code-share";
import { CodeShareItem } from "@/types/share-items";
import { logError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";

export async function createCodeShareRpc(
    supabase: SupabaseClient,
    user: User,
    input: CodeShareInput
): Promise<ShareCreationRpcResult<CodeShareItem | null>> {

    const { title, session_id, content, language } = input;

    const { data, error } = await supabase.rpc(
        "create_code_share",
        {
            p_session_id: session_id,
            p_user_id: user.id,
            p_share_title: title,
            p_item_title: title,
            p_content_text: content,
            p_language: language
        }
    );

    if (error) {
        logError({
            source: "local",
            scope: "createCodeShareRpc",
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

