import { fileTypes } from "@/constants/file-type-info";
import { codeLanguageInfo } from "@/constants/monaco-languages";

export type AllowedItemType = "code" | "text" | "file";

interface ResolveResult {
  type: AllowedItemType | null;
  language?: string;
}

export function resolveItemTypeFromExtension(
  extension: string
): ResolveResult {

  if (extension in codeLanguageInfo) {
    return {
      type: "code",
      language: extension,
    };
  }

  if (extension === "txt") {
    return {
      type: "text",
    };
  }

  if (extension in fileTypes) {
    return {
      type: "file",
    };
  }

  return { type: null };
}