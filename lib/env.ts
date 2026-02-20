export const USE_BACKEND_API =
  process.env.NEXT_PUBLIC_USE_BACKEND === "true";

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET_NAME!;

export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;