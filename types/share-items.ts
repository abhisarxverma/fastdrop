import { SupabaseTables } from "./utils";

export type ShareItemsRow = SupabaseTables<"share_items">;

export type ShareItemType = "all" | "text" | "code" | "file" | "folder" | "link";