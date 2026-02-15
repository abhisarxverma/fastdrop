
import z from "zod";
import { fileNameValidator } from "../utils"
import { baseShareSchema } from "./base-share"
import { MAX_FILE_SIZE_LIMIT } from "@/lib/env"

export const fileShareActionSchema = baseShareSchema.extend({
  file_type: z.string(),
  file_name: fileNameValidator,
  file_path: z.string(),
  file_size: z
    .number()
    .max(MAX_FILE_SIZE_LIMIT, "File size must not exceed maximum limit."), 
});

export const fileShareFormSchema = fileShareActionSchema.omit({ session_id: true, share_type: true });

export type UploadFileToSupabaseInput = {
  file: File,
  file_name: string
}

export type FileShareInput = z.infer<typeof fileShareActionSchema>;