import { SharesRow } from "@/types/shares";
import { ShareService } from "./share.service";
import { ServiceResponse } from "@/lib/types/service-response";
import { TextShareItem, CodeShareItem, LinkShareItem, FileShareItem } from "@/types/share-items";
import { fetchBackend } from "@/lib/fetcher";

export const backendShareService: ShareService = {

    async createBaseShare(input, user): Promise<ServiceResponse<SharesRow>> {
        return fetchBackend("/api/share/base", {
            method: "POST",
            body: {
                title: input.title,
                share_type: input.share_type,
                created_by: user.id,
                session_id: input.session_id
            }
        })
    },
    
    async createTextShare(input, user, supabase, token): Promise<ServiceResponse<TextShareItem>> {

        return fetchBackend("/api/share/text", {
            method: "POST",
            authorization : `Bearer ${token}`,
            body: {
                session_id: input.session_id,
                share_type: input.share_type,
                created_by: user.id,
                content_text: input.content,
                title: input.title
            }
        })
    },

    async createCodeShare(input, user): Promise<ServiceResponse<CodeShareItem>> {

        return fetchBackend("/api/share/code", {
            method: "POST",
            body: {
                session_id: input.session_id,
                share_type: input.share_type,
                created_by: user.id,
                content_text: input.content,
                language: input.language,
                title: input.title
            }
        })
    },

    async createFileShare(input, user): Promise<ServiceResponse<FileShareItem>> {

        return fetchBackend("/api/share/file", {
            method: "POST",
            body: {
                session_id: input.session_id,
                share_type: input.share_type,
                created_by: user.id,
                file_path: input.file_path,
                file_name: input.file_name,
                file_type: input.file_type,
                title: input.title
            }
        })
    },

    async createLinkShare(input, user): Promise<ServiceResponse<LinkShareItem>> {
        return fetchBackend("/api/share/link", {
            method: "POST",
            body: {
                session_id: input.session_id,
                share_type: input.share_type,
                created_by: user.id,
                content_text: input.content,
                title: input.title
            }
        })
    }

}