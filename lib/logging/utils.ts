export function normalizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }

    try {
      return JSON.stringify(error);
    } catch {
      return "Unknown error object";
    }
  }

  return "Unknown error";
}
