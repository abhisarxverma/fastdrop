import { Database } from "@/types/database.types";

export type SupabaseTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type SupabaseEnums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type LinkPreview = {
  image: string | null,
  title: string,
  description: string,
  url: string
}

export type LinkMetadataResponse =
  | { status: "ok"; data: LinkPreview | null, message: string }
  | { status: "unsafe"; message: string }
  | { status: "no-metadata"; message: string }
  | { status: "blocked"; message: string }
  | { status: "error"; message: string }