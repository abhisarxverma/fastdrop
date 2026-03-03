"use server"

import { actionClient } from "@/lib/actions/action-client"
import { banUserActionSchema } from "@/schemas/user/ban-user"
import { withAuth } from "@/lib/actions/with-auth";
import { usersService } from "@/services";

export const banUserFromSharingAction = actionClient
    .inputSchema(banUserActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user, token }) => {
            return usersService.banUserFromSharing(parsedInput, user, supabase, token);
        })
    })