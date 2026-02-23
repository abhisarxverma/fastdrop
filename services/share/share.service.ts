
import { ServiceResponse } from "@/lib/types/service-response";
import { CodeShareInput } from "@/schemas/share/code-share";
import { FileShareInput } from "@/schemas/share/file-share";
import { FolderShareInput } from "@/schemas/share/folder-share";
import { LinkShareInput } from "@/schemas/share/link-share";
import { TextShareInput } from "@/schemas/share/text-share";
import { FileShareItem, CodeShareItem, TextShareItem, LinkShareItem } from "@/types/share-items";
import { SupabaseClient, User } from "@supabase/supabase-js";

export interface ShareService {
    createTextShare(input: TextShareInput, user: User, supabase: SupabaseClient, token: string): Promise<ServiceResponse<TextShareItem>>;
    createCodeShare(input: CodeShareInput, user: User, supabase: SupabaseClient, token: string): Promise<ServiceResponse<CodeShareItem>>;
    createFileShare(input: FileShareInput, user: User, supabase: SupabaseClient, token: string): Promise<ServiceResponse<FileShareItem>>;
    createLinkShare(input: LinkShareInput, user: User, supabase: SupabaseClient, token: string): Promise<ServiceResponse<LinkShareItem>>;
    createFolderShare(input: FolderShareInput, user: User, supabase: SupabaseClient, token: string): Promise<ServiceResponse<string>>;
}
