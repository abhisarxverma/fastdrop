"use server";

import { actionClient } from "@/lib/actions/action-client";
import { withAuth } from "@/lib/actions/with-auth";
import { withSupabase } from "@/lib/actions/with-supabase";
import { createSessionSchema } from "@/schemas/sessions/create-session.schema";
import { editSessionActionSchema } from "@/schemas/sessions/edit-session";
import { endSessionActionSchema } from "@/schemas/sessions/end-session";
import { getNearbySessionByIdSchema } from "@/schemas/sessions/get-nearby-session-by-id";
import { getNearbySessionsSchema } from "@/schemas/sessions/get-nearby-sessions.schema";
import { getSessionCodeActionSchema } from "@/schemas/sessions/get-session-code";
import { getSessionContentByIdSchema } from "@/schemas/sessions/get-session-content-by-id";
import { validateSessionCodeSchema } from "@/schemas/sessions/validate-session-code";
import { sessionsService } from "@/services";

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
    return withAuth(({ user, supabase, token }) => {
      return sessionsService.createSession(parsedInput, user, supabase, token);
    })
  })

export const getActiveSessionOfUserAction = actionClient
  .action(async () => {
    return withAuth(({ user, supabase }) => {
      return sessionsService.getActiveSessionOfUser(user, supabase);
    });
  });

export const getNearbySessionByIdAction = actionClient
  .inputSchema(getNearbySessionByIdSchema)
  .action(async ({ parsedInput }) => {
    return withSupabase(({ supabase }) => {
      return sessionsService.getNearbySessionById(parsedInput, supabase);
    })
  })

export const validateSessionCodeAction = actionClient
  .inputSchema(validateSessionCodeSchema)
  .action(async ({ parsedInput }) => {
    return withSupabase(({ supabase }) => {
      return sessionsService.validateSessionCode(parsedInput, supabase);
    })
  })

export const getSessionContentByIdAction = actionClient
  .inputSchema(getSessionContentByIdSchema)
  .action(async ({ parsedInput }) => {
    return withSupabase(({ supabase }) => {
      return sessionsService.getSessionContentById(parsedInput, supabase);
    })
  })

export const editSessionAction = actionClient
  .inputSchema(editSessionActionSchema)
  .action(async ({ parsedInput }) => {
    return withAuth(({ user, supabase, token }) => {
      return sessionsService.editSession(parsedInput, supabase, user, token);
    })
  })

export const endSessionAction = actionClient
  .inputSchema(endSessionActionSchema)
  .action(async ({ parsedInput }) => {
    return withAuth(({ user, supabase, token }) => {
      return sessionsService.endSession(parsedInput, supabase, user, token);
    })
  })

export const getSessionCodeAction = actionClient
  .inputSchema(getSessionCodeActionSchema)
  .action(async ({ parsedInput }) => {
    return withAuth(({ user, supabase, token }) => {
      return sessionsService.getSessionCode(parsedInput, supabase, user, token);
    })
  })