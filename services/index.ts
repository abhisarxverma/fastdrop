import { USE_BACKEND_API } from "@/lib/env";
import { backendSessionsService } from "./sessions/sessions.backend";
import { localSessionsService } from "./sessions/sessions.local";
import { SessionsService } from "./sessions/sessions.service";
import { localShareService } from "./share/share.local";
import { backendShareService } from "./share/share.backend";
import { ShareService } from "./share/share.service";

export const sessionsService: SessionsService = USE_BACKEND_API
  ? backendSessionsService
  : localSessionsService;

export const shareService: ShareService = USE_BACKEND_API
  ? backendShareService
  : localShareService