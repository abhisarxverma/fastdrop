import { z } from "zod";
import { BaseShareSchema } from "../common/validations";

export const FileShareActionSchema = BaseShareSchema.extend({
  file: z.instanceof(File, { error: "Please upload a file to share" }), 
  file_type: z.string(),
  file_name: z.string()
});

export const FileShareFormSchema = FileShareActionSchema.omit({ room_id: true, lat: true, lng: true })