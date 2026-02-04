import { z } from "zod";

export const createSessionSchema = z.object({
  title: z.string(),
  lat: z.number(),
  lng: z.number(),
  discoverable: z.boolean(),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
