import { fileTypes } from "@/constants/file-type-info";
import { SupabaseTables } from "./utils";

export type ShareItemsRow = SupabaseTables<"share_items">;

export type ShareItemType = "text" | "code" | "file" | "link";

export type BaseItem = {
  id: string;
  title: string;
  share_id: string;
  created_at: string;
};

export type FileShareItem = BaseItem & {
  item_type: "file";
  file_type: keyof typeof fileTypes;
  file_name: string;
  file_path: string;
};

export type CodeShareItem = BaseItem & {
  item_type: "code";
  content_text: string;
  language: string;
};

export type TextShareItem = BaseItem & {
  item_type: "text";
  content_text: string;
};

export type LinkShareItem = BaseItem & {
  item_type: "link";
  content_text: string;
};

export type ShareItem = FileShareItem | CodeShareItem | TextShareItem | LinkShareItem;
