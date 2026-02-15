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
    
    async createTextShare(input, user): Promise<ServiceResponse<TextShareItem>> {

        return fetchBackend("/api/share/text", {
            method: "POST",
            body: {
                session_id: input.session_id,
                share_type: input.share_type,
                created_by: user.id,
                content_text: input.content,
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
                language: input.language
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
                file: input.file,
                file_name: input.file_name,
                file_type: input.file_type
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
                content_text: input.content
            }
        })
    }

}