import { BiSolidFileBlank } from "react-icons/bi";
import { FileTypeInfo, fileTypes } from "@/constants/file-type-info";
import { codeLanguageInfo, LanguageInfoType, languageToExtension } from "@/constants/monaco-languages";
import { VscVscode } from "react-icons/vsc";

export const getFileInfo = (extension: string): FileTypeInfo => {
  const ext = extension.toLowerCase().replace('.', '') as keyof typeof fileTypes;
  return fileTypes[ext] || { name: 'File', icon: BiSolidFileBlank };
};

export const getLanguageInfo = (language: string): LanguageInfoType => {
  return codeLanguageInfo[language] || { name: 'Code', icon: VscVscode };
};

export function getExtensionFromLanguage(language: string){
    return languageToExtension[language];
}

export function getLanguageIcon(language: string){
    return getLanguageInfo(language).icon;
}


export function getExtension(fileName: string) {
    return fileName.split(".").pop()?.toLowerCase() || ""
}

export function removeExtension(rawFileName: string) {
    const parts = rawFileName.split(".");
    if (parts.length <= 1) return rawFileName;
    return parts[0];
}