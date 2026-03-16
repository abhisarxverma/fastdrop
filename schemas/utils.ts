import { containsProfanity } from "@/lib/utils/profanity";
import z from "zod";

export const MIN_TITLE_LENGTH = 5;
export const MAX_TITLE_LENGTH = 100;

export const LENGTH_MIN_ERROR = (length: number, input_name: string) => `${input_name} must have minimum ${length} characters`
export const LENGTH_MAX_ERROR = (length: number, input_name: string) => `${input_name} must have maximum ${length} characters`

export const MIN_CONTENT_LENGTH = 10;

export function stringValidator(min: number, max: number, input_name: string) {
    return z.string().min(min, { error: LENGTH_MIN_ERROR(min, input_name) }).max(max, { error: LENGTH_MAX_ERROR(max, input_name) }).refine(
    (val) => !containsProfanity(val),
    {
      message: "Profane content detected. Please use professional language.",
    }
  );
}

export const contentValidator =  z.string().min(MIN_CONTENT_LENGTH, { error: LENGTH_MIN_ERROR(MIN_CONTENT_LENGTH, "Content") }).refine(
    (val) => !containsProfanity(val),
    {
      message: "Profane content detected. Please use professional language.",
    }
  );

export const fileNameValidator = z.string().min(4, { error: "Min 4 characters" }).max(50, { error: "Maximum 50 characters" }).refine(
    (val) => !containsProfanity(val),
    {
      message: "Profane content detected. Please use professional language.",
    }
  );