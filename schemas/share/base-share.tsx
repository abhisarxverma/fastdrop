import z from "zod";
import { LENGTH_MAX_ERROR, LENGTH_MIN_ERROR, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from "../utils";

export const baseShareSchema = z.object({
  title: z.string()
    .min(MIN_TITLE_LENGTH, { error: LENGTH_MIN_ERROR(MIN_TITLE_LENGTH) })
    .max(MAX_TITLE_LENGTH, { error: LENGTH_MAX_ERROR(MAX_TITLE_LENGTH) }),
  session_id: z.string(),
  share_type: z.string(),
});

export type BaseShareInput = z.infer<typeof baseShareSchema>;