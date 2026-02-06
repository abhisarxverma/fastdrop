import { z } from "zod";

export const createSessionSchema = z.object({
  title: z.string(),
  lat: z.number(),
  lng: z.number(),
  requires_code: z.boolean(),
  radius_meters: z.number(),
  expires_at: z.string()
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
