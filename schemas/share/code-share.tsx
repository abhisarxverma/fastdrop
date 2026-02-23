import z from "zod";
import { contentValidator } from "../utils"
import { baseShareSchema } from "./base-share"

export const codeShareActionSchema = baseShareSchema.extend({
    content: contentValidator,
    language: z.string()
})

export const codeShareFormSchema = codeShareActionSchema.omit({ session_id: true, share_type: true });

export type CodeShareInput = z.infer<typeof codeShareActionSchema>;

export const codeItemSchema = codeShareActionSchema
  .omit({ session_id: true, share_type: true })
  .extend({ item_type: z.literal("code") })