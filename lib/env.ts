export const USE_BACKEND_API =
  process.env.NEXT_PUBLIC_USE_BACKEND === "true";

export const OPEN_SHARES_BUCKET_NAME = process.env.OPEN_SHARES_BUCKET_NAME!;

export const MAX_FILE_SIZE_LIMIT = 200 * 1024 * 1024;