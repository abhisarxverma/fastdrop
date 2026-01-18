import { Database } from "@/lib/supabase/database.types";

// 1. Shorthand for your entire public schema
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type Room = Tables<"rooms">
export type Share = Tables<"shares">
export type ShareItem = Tables<"share_items">

export type SHARE_TYPE = "file" | "text" | "code" | "link" | "folder"