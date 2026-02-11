import z from "zod";

export const getSessionContentByIdSchema = z.object({
    sessionId: z.string()
})

export type GetSessionContentByIdInput = z.infer<typeof getSessionContentByIdSchema>;