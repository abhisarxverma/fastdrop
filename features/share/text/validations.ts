import { z } from "zod";
import { BaseShareSchema, LENGTH_MAX_ERROR, LENGTH_MIN_ERROR, MAX_CONTENT_LENGTH, MIN_CONTENT_LENGTH } from "../common/validations";

export const TextShareActionSchema = BaseShareSchema.extend({
    content: z.string().min(MIN_CONTENT_LENGTH, { error: LENGTH_MIN_ERROR(MIN_CONTENT_LENGTH) }).max(MAX_CONTENT_LENGTH, { error: LENGTH_MAX_ERROR(MAX_CONTENT_LENGTH) }),
})

export const TextShareFormSchema = TextShareActionSchema.omit({ room_id : true, lat: true, lng: true })