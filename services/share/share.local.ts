import { ShareService } from "./share.service";
import { ServiceResponse } from "@/lib/types/service-response";
import { CodeShareItem, FileShareItem, LinkShareItem, TextShareItem } from "@/types/share-items";
import { createTextShareRpc } from "@/lib/supabase/rpc/share-creation/create-text-share";
import { createCodeShareRpc } from "@/lib/supabase/rpc/share-creation/create-code-share";
import { createFileShareRpc } from "@/lib/supabase/rpc/share-creation/create-file-share";
import { createLinkShareRpc } from "@/lib/supabase/rpc/share-creation/create-link-share";
import { createFolderShareRpc } from "@/lib/supabase/rpc/share-creation/create-folder-share";
import { editShareRpc } from "@/lib/supabase/rpc/edit-share";
import { deleteShareRpc } from "@/lib/supabase/rpc/delete-share";

export const localShareService: ShareService = {

    async createTextShare(input, user, supabase): Promise<ServiceResponse<TextShareItem>> {
        const data = await createTextShareRpc(supabase, user, input);
        return data;
    },

    async createCodeShare(input, user, supabase): Promise<ServiceResponse<CodeShareItem>> {
        const data = await createCodeShareRpc(supabase, user, input);
        return data;
    },

    async createFileShare(input, user, supabase): Promise<ServiceResponse<FileShareItem>> {
        const data = await createFileShareRpc(supabase, user, input);
        return data;
    },

    async createLinkShare(input, user, supabase): Promise<ServiceResponse<LinkShareItem>>{
        const data = await createLinkShareRpc(supabase, user, input);
        return data;
    },

    async createFolderShare(input, user, supabase): Promise<ServiceResponse<string>> {
        const data = await createFolderShareRpc(supabase, user, input);
        return data;
    },

    async editShare(input, user, supabase): Promise<ServiceResponse<{ share_id : string }>> {
        const data = await editShareRpc(supabase, user, input);
        return data;
    },

    async deleteShare(input, user, supabase): Promise<ServiceResponse<{ share_id : string }>> {
        const data = await deleteShareRpc(supabase, user, input);
        return data;
    }
}