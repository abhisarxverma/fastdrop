import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action"
import { z } from "zod"
import { headers } from "next/headers"
import { actionLimiter } from "@/lib/rate-limit"

export type SafeServerError = {
  message: string
}

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      rateLimitKey: z.string().optional(),
    });
  },
  handleServerError(e) {
    console.error("Action Error:", e.message)
    return {
      message: e instanceof Error ? e.message : DEFAULT_SERVER_ERROR_MESSAGE,
    }
  },
})
.use( async ({ next, metadata }) => {
  if (!metadata?.rateLimitKey) {
    return next()
  }

  const h = await headers()

  const raw = h.get("x-forwarded-for") ?? ""
  const ip = raw.split(",")[0] || "anonymous"

  const key = `${ip}:${metadata.rateLimitKey}`

  const { success } = await actionLimiter.limit(key)

  if (!success) {
    throw new Error("Too many requests. Please slow down.")
  }

  return next()
})
