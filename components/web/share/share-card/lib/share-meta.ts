import {
  FileText,
  Link as LinkIcon,
  Code,
  StickyNote,
  Download,
  ExternalLink,
  Copy,
} from "lucide-react";
import { ShareItem } from "@/types/share-items";
import { fileTypes } from "@/constants/file-type-info"
import { codeLanguageInfo } from "@/constants/monaco-languages";

export function getShareMeta(item: ShareItem) {
  switch (item.item_type) {
    case "file":
      const fileInfo = fileTypes[item.file_type];
      return {
        label: fileInfo.name.toUpperCase(),
        labelColor: "text-red-600",
        title: item.file_name,
        iconBg: "bg-red-50 text-red-500",
        Icon: fileInfo.icon,
        ActionIcon: Download,
        actionLabel: "Download",
        actionShortLabel: "Download",
        buttonVariant: "default" as const,
      };

    case "link":
      return {
        label: "Link",
        labelColor: "text-blue-600",
        title: item.content_text,
        iconBg: "bg-blue-50 text-blue-500",
        Icon: LinkIcon,
        ActionIcon: ExternalLink,
        actionLabel: "Open Link",
        actionShortLabel: "Open",
        buttonVariant: "outline" as const,
      };

    case "code":
      const languageInfo = codeLanguageInfo[item.language];
      return {
        label: `${languageInfo.name} code`,
        labelColor: "text-gray-600",
        title: `${languageInfo.name} Snippet`,
        iconBg: "bg-gray-50 text-gray-600",
        Icon: languageInfo.icon,
        ActionIcon: Copy,
        actionLabel: "Copy Code",
        actionShortLabel: "Copy",
        buttonVariant: "secondary" as const,
      };

    case "text":
      return {
        label: "Text",
        labelColor: "text-amber-600",
        title: item.content_text.slice(0, 60),
        iconBg: "bg-amber-50 text-amber-600",
        Icon: StickyNote,
        ActionIcon: Copy,
        actionLabel: "Copy Text",
        actionShortLabel: "Copy",
        buttonVariant: "secondary" as const,
      };
  }
}
