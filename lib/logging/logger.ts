import { normalizeErrorMessage } from "./utils";
import { FetchOptions } from "../fetcher";

export function logError(params: {
  source: "backend" | "local";
  scope: string; // e.g. "get-nearby-sessions"
  error: unknown;
  meta?: Record<string, unknown>;
}) {
  console.error({
    level: "error",
    source: params.source,
    scope: params.scope,
    error: normalizeErrorMessage(params.error),
    meta: params.meta,
    timestamp: new Date().toISOString(),
  });
}


export function logBackendError(scope: string, path: string, options: FetchOptions, error: unknown){
    logError({
        source: "backend",
        scope,
        error,
        meta: { path, options }
    })
}

export function logLocalError(scope: string, meta: Record<string, unknown>, error: unknown){
    logError({
        source: "local",
        scope,
        error,
        meta
    })
}