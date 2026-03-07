import { ShareWithItems } from "@/types/shares";
import { EditShareInput } from "@/schemas/share/edit-share";

export function mapShareToEditFormValues(
  share: ShareWithItems
): EditShareInput {
  return {
    title: share.title,
    items: share.items.map((item) => {
      switch (item.item_type) {
        case "text":
          return {
            id: item.id,
            item_type: "text",
            title: item.title,
            content: item.content_text ?? "",
          };

        case "code":
          return {
            id: item.id,
            item_type: "code",
            title: item.title,
            content: item.content_text ?? "",
            language: item.language ?? "typescript",
          };

        case "link":
          return {
            id: item.id,
            item_type: "link",
            title: item.title,
            content: item.content_text ?? "",
          };

        case "file":
          return {
            id: item.id,
            item_type: "file",
            title: item.title,
            file_name: item.file_name ?? "",
            file_type: item.file_type ?? "",
            file_path: item.file_path ?? undefined,
            file: null,
          };

        default:
          throw new Error("Unknown item type");
      }
    }),
    share_id: share.id
  };
}