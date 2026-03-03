
import z from "zod";
import { fileNameValidator } from "../utils"
import { baseShareSchema } from "./base-share";
import { fileTypes } from "@/constants/file-type-info";
import { getExtension } from "@/lib/utils/file-share";

const supportedExtensions = Object.keys(fileTypes);

export const fileShareActionSchema = baseShareSchema.extend({
  file_type: z.enum(supportedExtensions as [string, ...string[]]),
  file_name: fileNameValidator,
  file_path: z.string(),
});

export const fileShareFormSchema = fileShareActionSchema
  .omit({ session_id: true, share_type: true, file_path: true })
  .extend({
    file: z
      .instanceof(File, { message: "Please upload a file to share" })
      .refine(
        (file) => {
          const ext = getExtension(file.name);
          return supportedExtensions.includes(ext);
        },
        {
          message: "Unsupported file type. Please upload a supported file.",
        }
      ),
  });

export type UploadFileToSupabaseInput = {
  file: File,
  file_name: string
}

export type FileShareInput = z.infer<typeof fileShareActionSchema>;

export const fileItemSchema = fileShareActionSchema
  .omit({ session_id: true, share_type: true })
  .extend({ item_type: z.literal("file"), 
    // file: z
    // .instanceof(File, { error: "Please upload a file to share" }).nullable(),
   })