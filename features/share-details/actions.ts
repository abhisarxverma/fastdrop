'use server';

import { authActionClient } from "@/lib/actions/middleware";
import { GetShareByIdActionSchema } from "./validation";
import { getShareById } from "./services";

export const getShareByIdAction = authActionClient
  .inputSchema(GetShareByIdActionSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    try {
      const result = await getShareById(supabase, {
        ...parsedInput,
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Action Error:", error);
      return {
        success: false,
        error: "Failed to fetch nearby shares. Please try again.",
      };
    }
  });