import { SharesRow } from "@/types/shares";
import { ShareService } from "./share.service";
import { ServiceResponse } from "@/lib/types/service-response";
import { logLocalError } from "@/lib/logging/logger";
import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { CodeShareItem, FileShareItem, LinkShareItem, TextShareItem } from "@/types/share-items";

export const localShareService: ShareService = {

    async createBaseShare(input, user, supabase): Promise<ServiceResponse<SharesRow>> {
        const { session_id, title, share_type } = input;

        const { data: share, error: shareError } = await supabase
            .from("shares")
            .insert({
                session_id: session_id,
                title,
                created_by: user.id,
                share_type: share_type,
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

    async createTextShare(input, user, supabase): Promise<ServiceResponse<TextShareItem>> {
        const { content, title } = input;

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
                content_text: content,
                item_type: "text",
                title
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
            data: shareItem as TextShareItem
        };
    },

    async createCodeShare(input, user, supabase): Promise<ServiceResponse<CodeShareItem>> {
        const { content, language, title } = input;

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
                content_text: content,
                item_type: "code",
                language,
                title
            })
            .select()
            .single();

        if (itemError) {
            logLocalError("create-code-share", { input }, itemError);
            return {
                success: false,
                message: mapSupabaseError(itemError),
                data: null
            }
        }

        return {
            success: true,
            message: "Code share created successfully",
            data: shareItem as CodeShareItem
        };
    },

    async createFileShare(input, user, supabase): Promise<ServiceResponse<FileShareItem>> {
        const { file_path, file_type, file_name, title } = input;

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
                file_path,
                item_type: "file",
                file_type,
                file_name,
                title
            })
            .select()
            .single();

        if (itemError) {
            logLocalError("create-file-share", { input }, itemError);
            return {
                success: false,
                message: mapSupabaseError(itemError),
                data: null
            }
        }

        return {
            success: true,
            message: "File share created successfully",
            data: shareItem as FileShareItem
        };
    },

    async createLinkShare(input, user, supabase): Promise<ServiceResponse<LinkShareItem>>{
        const { content, title } = input;

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
                content_text: content,
                item_type: "link",
                title
            })
            .select()
            .single();

        if (itemError) {
            logLocalError("create-link-share", { input }, itemError);
            return {
                success: false,
                message: mapSupabaseError(itemError),
                data: null
            }
        }

        return {
            success: true,
            message: "Link share created successfully",
            data: shareItem as LinkShareItem
        };
    }
}