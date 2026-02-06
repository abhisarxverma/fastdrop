import { USE_BACKEND_API } from "@/lib/env";
import { backendSessionsService } from "./sessions/sessions.backend";
import { localSessionsService } from "./sessions/sessions.local";
import { SessionsService } from "./sessions/sessions.service";

export const sessionsService: SessionsService = USE_BACKEND_API
  ? backendSessionsService
  : localSessionsService;
