import { z } from "zod";

export const banUserActionSchema = z.object({
    session_id: z.string()
})

export type BanUserInput = z.infer<typeof banUserActionSchema>