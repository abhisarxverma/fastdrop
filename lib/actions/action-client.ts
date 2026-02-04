import { createSafeActionClient } from "next-safe-action";

export const publicAction = createSafeActionClient();
export const authAction = createSafeActionClient();