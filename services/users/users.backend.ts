import { UsersService } from "./users.service";
import { fetchBackend } from "@/lib/fetcher";

export const backendUsersService: UsersService = {
    async banUserFromSharing(input, user, supabase, token) {
        return fetchBackend("/api/users/ban", {
            method: "POST",
            authorization: `Bearer ${token}`,
            body: {
                session_id: input.session_id,
                user_id: user.id
            }
        })
    }
}

