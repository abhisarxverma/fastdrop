
import { z } from "zod";

export const MIN_TITLE_LENGTH = 10;
export const MAX_TITLE_LENGTH = 100;

export const LENGTH_MIN_ERROR = (length: number) => `Minimum ${length} characters`
export const LENGTH_MAX_ERROR = (length: number) => `Maximum ${length} characters`

export const MIN_CONTENT_LENGTH = 10;
export const MAX_CONTENT_LENGTH = 5000;

export const BaseShareSchema = z.object({
  title: z.string()
    .min(MIN_TITLE_LENGTH, { error: LENGTH_MIN_ERROR(MIN_TITLE_LENGTH) })
    .max(MAX_TITLE_LENGTH, { error: LENGTH_MAX_ERROR(MAX_TITLE_LENGTH) }),
  expires_at: z.string(),
  room_id: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
});


export const contentValidator =  z.string().min(MIN_CONTENT_LENGTH, { error: LENGTH_MIN_ERROR(MIN_CONTENT_LENGTH) }).max(MAX_CONTENT_LENGTH, { error: LENGTH_MAX_ERROR(MAX_CONTENT_LENGTH) });
export const fileNameValidator = z.string().min(4, { error: "Min 4 characters" }).max(50, { error: "Maximum 50 characters" });