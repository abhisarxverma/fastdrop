import z from "zod";
import { stringValidator } from "../utils";

export const baseShareSchema = z.object({
  title: stringValidator(5, 100),
  session_id: z.string(),
  share_type: z.string(),
});

export type BaseShareInput = z.infer<typeof baseShareSchema>;