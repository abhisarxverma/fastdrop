import z from "zod";

export const NearbySharesActionSchema = z.object({
    lat: z.number(),
    lng: z.number(),
    radius: z.number()
})

export type NearbySharesServiceInput = {
    lat: number,
    lng: number,
    radius: number
}