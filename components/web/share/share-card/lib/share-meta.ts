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

export function getShareMeta(item: ShareItem) {
  switch (item.item_type) {
    case "file":
      return {
        label: item.file_type.toUpperCase(),
        labelColor: "text-red-600",
        title: item.file_name,
        iconBg: "bg-red-50 text-red-500",
        Icon: FileText,
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
      return {
        label: "Code",
        labelColor: "text-gray-600",
        title: `${item.language} Snippet`,
        iconBg: "bg-gray-50 text-gray-600",
        Icon: Code,
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
