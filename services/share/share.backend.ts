import { ShareService } from "./share.service";
import { ServiceResponse } from "@/lib/types/service-response";
import { TextShareItem, CodeShareItem, LinkShareItem, FileShareItem } from "@/types/share-items";
import { fetchBackend } from "@/lib/fetcher";

export const backendShareService: ShareService = {
    
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

    async createCodeShare(input, user, supabase, token): Promise<ServiceResponse<CodeShareItem>> {

        return fetchBackend("/api/share/code", {
            method: "POST",
            authorization : `Bearer ${token}`,
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

    async createFileShare(input, user, supabase, token): Promise<ServiceResponse<FileShareItem>> {

        return fetchBackend("/api/share/file", {
            method: "POST",
            authorization : `Bearer ${token}`,
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

    async createLinkShare(input, user, supabase, token): Promise<ServiceResponse<LinkShareItem>> {
        return fetchBackend("/api/share/link", {
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

    async createFolderShare(input, user, supabase, token): Promise<ServiceResponse<string>> {
        return fetchBackend("/api/share/folder", {
            method: 'POST',
            authorization : `Bearer ${token}`,
            body: {
                session_id: input.session_id,
                share_type: input.share_type,
                created_by: user.id,
                title: input.title,
                items: input.items
            }
        })
    }

}