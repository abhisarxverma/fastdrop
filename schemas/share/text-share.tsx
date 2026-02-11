import z from "zod";
import { contentValidator, fileNameValidator } from "../utils"
import { baseShareSchema } from "./base-share"

export const textShareActionSchema = baseShareSchema.extend({
    content: contentValidator,
    fileName: fileNameValidator
})

export const TextShareFormSchema = textShareActionSchema.omit({ sessionId: true });

export type TextShareInput = z.infer<typeof textShareActionSchema>;