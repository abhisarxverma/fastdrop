import z from "zod";

export const GetShareByIdActionSchema = z.object({
    shareId: z.string()
})