
import { ServiceResponse } from "@/lib/types/service-response";
import { BaseShareInput } from "@/schemas/share/base-share";
import { CodeShareInput } from "@/schemas/share/code-share";
import { FileShareInput } from "@/schemas/share/file-share";
import { LinkShareInput } from "@/schemas/share/link-share";
import { TextShareInput } from "@/schemas/share/text-share";
import { FileShareItem, CodeShareItem, TextShareItem, LinkShareItem } from "@/types/share-items";
import { SharesRow } from "@/types/shares";
import { SupabaseClient, User } from "@supabase/supabase-js";

export interface ShareService {
    createBaseShare(input: BaseShareInput, user: User, supabase: SupabaseClient): Promise<ServiceResponse<SharesRow>>;
    createTextShare(input: TextShareInput, user: User, supabase: SupabaseClient): Promise<ServiceResponse<TextShareItem>>;
    createCodeShare(input: CodeShareInput, user: User, supabase: SupabaseClient): Promise<ServiceResponse<CodeShareItem>>;
    createFileShare(input: FileShareInput, user: User, supabase: SupabaseClient): Promise<ServiceResponse<FileShareItem>>;
    createLinkShare(input: LinkShareInput, user: User, supabase: SupabaseClient): Promise<ServiceResponse<LinkShareItem>>;
    uploadFileToSupabase(input: UploadFileToSupabaseInput, supabase: SupabaseClient): Promise<ServiceResponse<string>>;
}
