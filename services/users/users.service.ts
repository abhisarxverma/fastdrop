import { ServiceResponse } from "@/lib/types/service-response";
import { BanUserInput } from "@/schemas/user/ban-user";
import { SupabaseClient, User } from "@supabase/supabase-js";

export interface UsersService {
    banUserFromSharing(input: BanUserInput, user: User, supabase: SupabaseClient, token: string): Promise<ServiceResponse<{ user_id: string }>>;
}
