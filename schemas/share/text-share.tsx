import z from "zod";
import { contentValidator } from "../utils"
import { baseShareSchema } from "./base-share"

export const textShareActionSchema = baseShareSchema.extend({
    content: contentValidator,
})

export const textShareFormSchema = textShareActionSchema.omit({ session_id: true, share_type: true });

export type TextShareInput = z.infer<typeof textShareActionSchema>;

export const textItemSchema = textShareActionSchema
  .omit({ session_id: true, share_type: true })
  .extend({ item_type: z.literal("text") })