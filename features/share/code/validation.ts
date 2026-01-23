import z from "zod";
import { BaseShareSchema, contentValidator, fileNameValidator } from "../common/validations";
import { codeLanguageInfo } from "../common/constants/monaco-languages";

export const CodeShareActionSchema = BaseShareSchema.extend({ 
    language: z.string() 
    .refine( (val) => Object.keys(codeLanguageInfo).includes(val), { 
        message: "Please select a valid language" 
    } ), 
    content: contentValidator,
    file_name: fileNameValidator
})

export const CodeShareFormSchema = CodeShareActionSchema.omit({
  room_id: true,
  lat: true,
  lng: true,
});
