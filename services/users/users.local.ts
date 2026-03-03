import { banUserFromSharingRpc } from "@/lib/supabase/rpc/ban-user-from-sharing";
import { UsersService } from "./users.service";

export const localUsersService: UsersService = {
    async banUserFromSharing(input, user, supabase) {
        const data = banUserFromSharingRpc(supabase, user, input);
        return data;
    }
}
