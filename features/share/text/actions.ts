"use server";

import { authActionClient } from "@/lib/actions/middleware";
import { createTextShareService } from "@/services/share-service";
import { createTextShareActionSchema } from "./validations";

export const createTextShareAction = authActionClient
  .inputSchema(createTextShareActionSchema)
  .action(async ({ parsedInput, ctx: { user, supabase } }) => {

    try {
      const result = await createTextShareService(supabase, {
        ...parsedInput,
        created_by: user.id
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Action Error:", error);
      return {
        success: false,
        error: "Failed to create share. Please try again.",
      };
    }
  });
