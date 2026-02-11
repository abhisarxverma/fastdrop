import { SharesRow } from "@/types/shares";
import { ShareService } from "./share.service";
import { ServiceResponse } from "@/lib/types/service-response";
import { logLocalError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { ShareItemsRow } from "@/types/share-items";

export const localShareService: ShareService = {

    async createBaseShare(input, user, supabase): Promise<ServiceResponse<SharesRow>> {
        const { sessionId, title, shareType } = input;

        const { data: share, error: shareError } = await supabase
            .from("shares")
            .insert({
                session_id: sessionId,
                title,
                created_by: user.id,
                share_type: shareType,
            })
            .select()
            .single();

        if (shareError) {
            logLocalError("create-base-share", { input }, shareError);
            return {
                success: false,
                message: mapSupabaseError(shareError),
                data: null
            }
        }

        return {
            success: true,
            message: "Base share created successfully",
            data: share
        }
    },
    
    async createTextShare(input, user, supabase): Promise<ServiceResponse<ShareItemsRow>> {
        const { fileName, content } = input;

        const baseShareResponse = await this.createBaseShare(input, user, supabase);

        if (!baseShareResponse.success || !baseShareResponse.data) {
            return {
                success: false,
                message: baseShareResponse.message,
                data: null
            }
        }

        const baseShare = baseShareResponse.data;

        const { data: shareItem, error: itemError } = await supabase
            .from("share_items")
            .insert({
                share_id: baseShare.id,
                file_name: fileName,
                content_text: content,
                item_type: "text"
            })
            .select()
            .single();

        if (itemError) {
            logLocalError("create-text-share", { input }, itemError);
            return {
                success: false,
                message: mapSupabaseError(itemError),
                data: null
            }
        }

        return {
            success: true,
            message: "Text share created successfully",
            data: shareItem as ShareItemsRow
        };
    }

}