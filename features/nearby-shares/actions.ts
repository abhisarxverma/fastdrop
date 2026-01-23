'use server';

import { authActionClient } from "@/lib/actions/middleware";
import { NearbySharesActionSchema } from "./validation";
import { nearbySharesService } from "@/services/nearby-shares-service";

export const nearbySharesAction = authActionClient
  .inputSchema(NearbySharesActionSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    try {
      const result = await nearbySharesService(supabase, {
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
