import { FileShareItem, CodeShareItem, TextShareItem, LinkShareItem, ShareItem } from "../types";

export function isFileShareItem(shareItem: ShareItem): shareItem is FileShareItem {
  return shareItem.item_type === "file" &&
         shareItem.file_type !== null &&
         shareItem.file_path !== null &&
         shareItem.file_name !== null;
}

export function isCodeShareItem(shareItem: ShareItem): shareItem is CodeShareItem {
    return shareItem.item_type === "code" &&
        shareItem.content_text !== null &&
        shareItem.file_name !== null &&
        shareItem.language !== null;
}

export function isTextShareItem(shareItem: ShareItem): shareItem is TextShareItem {
    return shareItem.item_type === "text" &&
        shareItem.content_text !== null &&
        shareItem.file_name !== null;
}

export function isLinkShareItem(shareItem: ShareItem): shareItem is LinkShareItem {
    return shareItem.item_type === "link" &&
        shareItem.content_text !== null;
}