import { SupabaseClient, User } from "@supabase/supabase-js";
import { ShareCreationRpcResult } from "../../types";
import { LinkShareInput } from "@/schemas/share/link-share";
import { LinkShareItem } from "@/types/share-items";
import { logError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";

export async function createLinkShareRpc(
    supabase: SupabaseClient,
    user: User,
    input: LinkShareInput
): Promise<ShareCreationRpcResult<LinkShareItem | null>> {

    const { title, session_id, content } = input;

    const { data, error } = await supabase.rpc(
        "create_link_share",
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
            scope: "createLinkShareRpc",
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