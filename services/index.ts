import { USE_BACKEND_API } from "@/lib/env";
import { backendSessionsService } from "./sessions/sessions.backend";
import { localSessionsService } from "./sessions/sessions.local";

export const sessionsService = USE_BACKEND_API
  ? backendSessionsService
  : localSessionsService;
