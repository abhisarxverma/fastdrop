import z from "zod";

export const getNearbySessionByIdSchema = z.object({
    sessionId: z.string(),
    lat: z.number(),
    lng: z.number()
})

export type GetNearbySessionByIdInput = z.infer<typeof getNearbySessionByIdSchema>;