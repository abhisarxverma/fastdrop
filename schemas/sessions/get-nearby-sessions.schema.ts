import z from "zod";

export const getNearbySessionsSchema = z.object({
    lat: z.number(),
    lng: z.number(),
})

export type GetNearbySessionsInput = z.infer<typeof getNearbySessionsSchema>;