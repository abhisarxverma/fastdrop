import z from "zod";

export const validateSessionCodeSchema = z.object({
    sessionId: z.string(),
    code: z.string().min(6, { error: "Session code must be 6 digit" })
})

export type ValidateSessionCodeInput = z.infer<typeof validateSessionCodeSchema>;