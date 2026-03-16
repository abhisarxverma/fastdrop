import { z } from "zod";
import { stringValidator } from "../utils";
import { getExpiryLimits } from "@/lib/utils/date-limits";

const { min, max } = getExpiryLimits();

export const editSessionActionSchema = z.object({
  session_id: z.string(),
  title: stringValidator(5, 200, "title"),
  requires_code: z.boolean(),
  sharing_enabled: z.boolean(),
  expires_at: z.string().refine(
    (val) => {
      const date = new Date(val);
      return date >= min && date <= max;
    },
    {
      message: `Expiry must be between ${min.toLocaleString()} and ${max.toLocaleString()}`,
    },
  ),
  radius_meters: z.number()
});

export type EditSessionInput = z.infer<typeof editSessionActionSchema>;

export const editSessionFormSchema = editSessionActionSchema.omit({
    session_id: true
});
