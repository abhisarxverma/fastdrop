import z from "zod";
import { baseShareSchema } from "./base-share"

export const linkShareActionSchema = baseShareSchema.extend({
    content: z.string().min(5, { error: "Please enter a link" })
})

export const linkShareFormSchema = linkShareActionSchema.omit({
    session_id: true,
    share_type: true
})

export type LinkShareInput = z.infer<typeof linkShareActionSchema>;