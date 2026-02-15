import {
  ShareItem,
  FileShareItem,
  CodeShareItem,
  TextShareItem,
  LinkShareItem,
} from "@/types/share-items";
import { ShareItemsRow } from "@/types/share-items";
import { fileTypes } from "@/constants/file-type-info";

export function mapRowToShareItem(row: ShareItemsRow): ShareItem {
  switch (row.item_type) {
    case "file":
      return {
        id: row.id,
        share_id: row.share_id,
        created_at: row.created_at,
        item_type: "file",
        file_type: row.file_type! as keyof typeof fileTypes,
        file_name: row.file_name!,
        file_path: row.file_path!,
      } satisfies FileShareItem;

    case "code":
      return {
        id: row.id,
        share_id: row.share_id,
        created_at: row.created_at,
        item_type: "code",
        content_text: row.content_text!,
        language: row.language!,
      } satisfies CodeShareItem;

    case "text":
      return {
        id: row.id,
        share_id: row.share_id,
        created_at: row.created_at,
        item_type: "text",
        content_text: row.content_text!,
      } satisfies TextShareItem;

    case "link":
      return {
        id: row.id,
        share_id: row.share_id,
        created_at: row.created_at,
        item_type: "link",
        content_text: row.content_text!,
      } satisfies LinkShareItem;

    default:
      throw new Error("Unknown share item type");
  }
}
