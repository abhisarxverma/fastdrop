import { z } from "zod";

export const deleteShareActionSchema = z.object({
    share_id: z.string()
})

export type DeleteShareInput = z.infer<typeof deleteShareActionSchema>;
