import { ServiceResponse } from "@/lib/types/service-response";
import { SafeServerError } from "./action-client";

export function unwrapActionResult<T>(
  result: {
    data?: ServiceResponse<T>;
    serverError?: SafeServerError;
    validationErrors?: unknown;
  }
): T {
  if (result.validationErrors) {
    throw new Error("Invalid input");
  }

  if (result.serverError) {
    throw new Error(result.serverError.message);
  }

  if (!result.data) {
    throw new Error("No response from server");
  }

  if (!result.data.success) {
    throw new Error(result.data.message);
  }

  return result.data.data as T;
}
