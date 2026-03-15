import z from "zod";

export const getSessionCodeActionSchema = z.object({
    sessionId: z.string()
})

export type GetSessionCodeInput = z.infer<typeof getSessionCodeActionSchema>;