"use server";

import { authAction } from "@/lib/actions/action-client";
import { withAuth } from "@/lib/actions/with-auth";
import { createSessionSchema } from "@/schemas/sessions/create-session.schema";
import { sessionsService } from "@/services";

export const createSessionAction = authAction
  .inputSchema(createSessionSchema)
  .action(async ({ parsedInput }) => {
    return withAuth(async ({ supabase, user }) => {
      return sessionsService.createSession(
          supabase,
          user,
          parsedInput,
      );
    });
  });
