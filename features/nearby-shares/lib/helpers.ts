import { ShareItemRow, ShareWithItems } from "@/types";
import { BaseItem, CodeShareItem, FileShareItem, LinkShareItem, ShareItem, TextShareItem } from "../types";
import { fileTypes } from "@/features/new-share/common/constants/file-type-info";

export function getSingleItem(share: ShareWithItems) {
    return share.share_items[0];
}

export function toDomainItem(row: ShareItemRow): ShareItem | null {
    const base: BaseItem = { id: row.id, share_id: row.share_id, created_at: row.created_at, };
    switch (row.item_type) {
        case "file":
            if (row.file_type && row.file_name && row.file_path) {
                return {
                    ...base,
                    item_type: "file",
                    file_type: row.file_type as keyof typeof fileTypes,
                    file_name: row.file_name,
                    file_path: row.file_path,
                } satisfies FileShareItem;
            }
            return null;

        case "code":
            if (row.content_text && row.file_name && row.language) {
                return {
                    ...base,
                    item_type: "code",
                    content_text: row.content_text,
                    file_name: row.file_name,
                    language: row.language,
                } satisfies CodeShareItem;
            }
            return null;

        case "text":
            if (row.content_text && row.file_name) {
                return {
                    ...base,
                    item_type: "text",
                    content_text: row.content_text,
                    file_name: row.file_name,
                } satisfies TextShareItem;
            }
            return null;

        case "link":
            if (row.content_text) {
                return {
                    ...base,
                    item_type: "link",
                    content_text: row.content_text,
                } satisfies LinkShareItem;
            }
            return null;

        default:
            return null;
    }
}
