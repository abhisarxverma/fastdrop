"use server";

import { actionClient } from "@/lib/actions/action-client";
import { withAuth } from "@/lib/actions/with-auth";
import { withSupabase } from "@/lib/actions/with-supabase";
import { createSessionSchema } from "@/schemas/sessions/create-session.schema";
import { getNearbySessionsSchema } from "@/schemas/sessions/get-nearby-sessions.schema";
import { sessionsService } from "@/services";

// export const createSessionAction = authAction
//   .inputSchema(createSessionSchema)
//   .action(async ({ parsedInput }) => {
//     return withAuth(async ({ supabase, user }) => {
//       return sessionsService.createSession(
//           supabase,
//           user,
//           parsedInput,
//       );
//     });
//   });

export const getNearbySessionsAction = actionClient
  .inputSchema(getNearbySessionsSchema)
  .action(async ({ parsedInput }) => {
    return withSupabase(({ supabase }) => {
      return sessionsService.getNearbySessions(parsedInput, supabase);
    })
  })

export const createSessionAction = actionClient
  .inputSchema(createSessionSchema)
  .action(async ({ parsedInput }) => {
    return withAuth(({ user, supabase }) => {
      return sessionsService.createSession(parsedInput, user, supabase);
    })
  })