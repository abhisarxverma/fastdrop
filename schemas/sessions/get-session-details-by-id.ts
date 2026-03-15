import z from "zod";

export const getSessionDetailsByIdSchema = z.object({
    sessionId: z.string(),
    lat: z.number(),
    lng: z.number()
})

export type GetSessionDetailsByIdInput = z.infer<typeof getSessionDetailsByIdSchema>;