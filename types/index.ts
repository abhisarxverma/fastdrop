import { Database } from "@/lib/supabase/database.types";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type RoomRow = Tables<"rooms">
export type ShareRow = Tables<"shares">
export type ShareItemRow = Tables<"share_items">

export type SHARE_ITEM_TYPE = "file" | "text" | "code" | "link" | "folder"
export type SHARE_TYPE = "single" | "folder"

export type ShareWithItems = ShareRow & { share_items: ShareItemRow[]; };
