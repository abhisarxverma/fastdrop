import { z } from "zod";


export const endSessionActionSchema = z.object({
  session_id: z.string()
});

export type EndSessionInput = z.infer<typeof endSessionActionSchema>;