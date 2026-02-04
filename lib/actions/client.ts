import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action Error:", e.message);
    return { message:  e instanceof Error ? e.message : DEFAULT_SERVER_ERROR_MESSAGE };
  },
});
