import z from "zod";
import { BaseShareSchema } from "../common/validations";
import { codeLanguageInfo } from "../common/constants/code-language-info";

export const CodeShareActionSchema = BaseShareSchema.extend({ 
    language: z.string() 
    .refine( (val) => Object.keys(codeLanguageInfo).includes(val), { 
        message: "Please select a valid language" 
    } ), 
    content: z.string().min(10, { message: "Minimum 10 characters" }), });

export const CodeShareFormSchema = CodeShareActionSchema.omit({
  room_id: true,
  lat: true,
  lng: true,
});
