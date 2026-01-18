import { z } from "zod";

const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 100;

const LENGTH_MIN_ERROR = (length: number) => `Minimum ${length} characters`
const LENGTH_MAX_ERROR = (length: number) => `Maximum ${length} characters`

const MIN_CONTENT_LENGTH = 10;
const MAX_CONTENT_LENGTH = 5000;

export const createTextShareActionSchema = z.object({
    title: z.string().min(MIN_TITLE_LENGTH, { error: LENGTH_MIN_ERROR(MIN_TITLE_LENGTH) }).max(MAX_TITLE_LENGTH, { error: LENGTH_MAX_ERROR(MAX_TITLE_LENGTH) }),
    content: z.string().min(MIN_CONTENT_LENGTH, { error: LENGTH_MIN_ERROR(MIN_CONTENT_LENGTH) }).max(MAX_CONTENT_LENGTH, { error: LENGTH_MAX_ERROR(MAX_CONTENT_LENGTH) }),
    expires_at: z.string(),
    room_id: z.string().optional(),
    lat: z.number(),
    lng: z.number(),
})

export const createTextShareFormSchema = createTextShareActionSchema.omit({ room_id : true, lat: true, lng: true })