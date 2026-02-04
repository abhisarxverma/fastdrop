export function unwrapActionResult<T>(
  result: {
    data?: T;
    serverError?: string;
    validationErrors?: unknown;
  }
): T {
  if (result.validationErrors) {
    throw new Error("Invalid input");
  }

  if (result.serverError) {
    throw new Error(result.serverError);
  }

  if (!result.data) {
    throw new Error("No data returned");
  }

  return result.data;
}
