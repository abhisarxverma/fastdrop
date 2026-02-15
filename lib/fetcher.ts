import type { ServiceResponse } from "@/lib/types/service-response";
import { logBackendError } from "./logging/logger";
import { TransportError } from "@/lib/errors/transport-error";

export type FetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  authorization?: string; 
};

export async function fetchBackend<T>(
  path: string,
  options: FetchOptions = {}
): Promise<ServiceResponse<T>> {
  const url = `${process.env.BACKEND_URL}${path}`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    if (options.authorization) {
      headers["Authorization"] = options.authorization;
    }

    const res = await fetch(url, {
      method: options.method ?? "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const json = await res.json();
      return json as ServiceResponse<T>;
    }

    // ❗ transport-level violation
    const err = new TransportError(
      "invalid-response",
      "Backend returned non-JSON response"
    );

    logBackendError("backend-fetch", path, options, err);

    return {
      success: false,
      message: "Backend returned an unexpected response.",
      data: null,
    };

  } catch (error) {
    const err = new TransportError(
      "network",
      "Failed to reach backend",
      error
    );

    console.log("error: ", error);

    logBackendError("backend-fetch", path, options, err);

    return {
      success: false,
      message: "Unable to reach server. Please try again.",
      data: null,
    };
  }
}
