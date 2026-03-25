import { headers } from "next/headers"
import { actionLimiter } from "@/lib/rate-limit"

export async function checkRateLimit(keySuffix: string) {
  const h = await headers()

  const ip =
    h.get("x-forwarded-for") ??
    h.get("x-real-ip") ??
    "anonymous"

  const key = `${ip}:${keySuffix}`

  const { success } = await actionLimiter.limit(key)

  if (!success) {
    throw new Error("Too many requests. Please slow down.")
  }
}