
import { ServiceResponse } from "@/lib/types/service-response";
import { BaseShareInput } from "@/schemas/share/base-share";
import { TextShareInput } from "@/schemas/share/text-share";
import { ShareItemsRow } from "@/types/share-items";
import { SharesRow } from "@/types/shares";
import { SupabaseClient, User } from "@supabase/supabase-js";

export interface ShareService {
    createBaseShare(input: BaseShareInput, user: User, supabase: SupabaseClient): Promise<ServiceResponse<SharesRow>>;
    createTextShare(input: TextShareInput, user: User, supabase: SupabaseClient): Promise<ServiceResponse<ShareItemsRow>>;
}
