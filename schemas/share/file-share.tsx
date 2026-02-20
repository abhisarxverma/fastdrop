
import z from "zod";
import { fileNameValidator } from "../utils"
import { baseShareSchema } from "./base-share"

export const fileShareActionSchema = baseShareSchema.extend({
  file_type: z.string(),
  file_name: fileNameValidator,
  file_path: z.string(),
});

export const fileShareFormSchema = fileShareActionSchema.omit({ session_id: true, share_type: true, file_path: true }).extend({
  file: z
    .instanceof(File, { error: "Please upload a file to share" }),
})

export type UploadFileToSupabaseInput = {
  file: File,
  file_name: string
}

export type FileShareInput = z.infer<typeof fileShareActionSchema>;