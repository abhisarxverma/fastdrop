import { containsProfanity } from "@/lib/utils/profanity";
import z from "zod";

export const MIN_TITLE_LENGTH = 5;
export const MAX_TITLE_LENGTH = 100;

export const LENGTH_MIN_ERROR = (length: number) => `Minimum ${length} characters`
export const LENGTH_MAX_ERROR = (length: number) => `Maximum ${length} characters`

export const MIN_CONTENT_LENGTH = 10;

export function stringValidator(min: number, max: number) {
    return z.string().min(min, { error: LENGTH_MIN_ERROR(min) }).max(max, { error: LENGTH_MAX_ERROR(max) }).refine(
    (val) => !containsProfanity(val),
    {
      message: "Profane content detected. Please use professional language.",
    }
  );
}

export const contentValidator =  z.string().min(MIN_CONTENT_LENGTH, { error: LENGTH_MIN_ERROR(MIN_CONTENT_LENGTH) }).refine(
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