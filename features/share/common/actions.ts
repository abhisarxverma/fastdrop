
import { authActionClient } from "@/lib/actions/middleware";
import { Share } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import z from "zod";

export function shareAction<TSchema extends z.ZodObject>(
  schema: TSchema,
  service: (
    supabase: SupabaseClient,
    input: z.infer<TSchema> & { created_by: string }
  ) => Promise<Share>
) {
  return authActionClient
    .inputSchema(schema)
    .action(async ({ parsedInput, ctx: { user, supabase } }) => {
      try {
        const input = parsedInput as z.infer<TSchema>;
        const result = await service(supabase, {
          ...input,
          created_by: user.id,
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
}
