import z from "zod";
import { BaseShareSchema } from "../common/validations";

export const LinkShareActionSchema = BaseShareSchema.extend({
    content: z.string().min(5, { error: "Please enter a link" })
})

export const LinkShareFormSchema = LinkShareActionSchema.omit({
    room_id: true,
    lat: true,
    lng: true
})