import { Database } from "@/lib/supabase/database.types";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type Room = Tables<"rooms">
export type Share = Tables<"shares">
export type ShareItem = Tables<"share_items">

export type SHARE_TYPE = "file" | "text" | "code" | "link" | "folder"

export type ShareRow = Tables<"shares">
export type ShareItemRow = Tables<"share_items">

export type ShareWithItems = ShareRow & { share_items: ShareItemRow[]; };

export type SingleShare = ShareRow & ShareItemRow & {
  share_type: "single";
  share_items?: undefined;
};

export type MultipleShare = ShareRow & {
  share_type: "multiple";
  share_items: ShareItemRow[];
};

export type NearbyShare = SingleShare | MultipleShare;
export type NearbyShares = NearbyShare[];
