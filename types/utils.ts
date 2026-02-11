import { Database } from "@/types/database.types";

export type SupabaseTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type SupabaseEnums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];