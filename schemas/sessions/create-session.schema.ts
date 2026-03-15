import { z } from "zod";
import { stringValidator } from "../utils";
import { getExpiryLimits } from "@/lib/utils/date-limits";

const {min, max} = getExpiryLimits();

export const createSessionSchema = z.object({
  title: stringValidator(10, 200),
  lat: z.number(),
  lng: z.number(),
  requires_code: z.boolean(),
  sharing_enabled: z.boolean(),
  radius_meters: z.number(),
  expires_at: z.string().refine((val) => { 
    const date = new Date(val); 
    return date >= min && date <= max; 
  }, { 
    message: `Expiry must be between ${min.toLocaleString()} and ${max.toLocaleString()}` 
  }),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

export const createSessionFormSchema = createSessionSchema.omit({
  lat: true,
  lng: true
})