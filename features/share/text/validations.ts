import { BaseShareSchema, contentValidator, fileNameValidator } from "../common/validations";

export const TextShareActionSchema = BaseShareSchema.extend({
    content: contentValidator,
    file_name: fileNameValidator
})

export const TextShareFormSchema = TextShareActionSchema.omit({ room_id : true, lat: true, lng: true })