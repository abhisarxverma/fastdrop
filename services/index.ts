import { USE_BACKEND_API } from "@/lib/env";
import { backendSessionsService } from "./sessions/sessions.backend";
import { localSessionsService } from "./sessions/sessions.local";
import { SessionsService } from "./sessions/sessions.service";
import { localShareService } from "./share/share.local";
import { backendShareService } from "./share/share.backend";
import { ShareService } from "./share/share.service";
import { UsersService } from "./users/users.service";
import { backendUsersService } from "./users/users.backend";
import { localUsersService } from "./users/users.local";

export const sessionsService: SessionsService = USE_BACKEND_API
  ? backendSessionsService
  : localSessionsService;

export const shareService: ShareService = USE_BACKEND_API
  ? backendShareService
  : localShareService

export const usersService: UsersService = USE_BACKEND_API
  ? backendUsersService
  : localUsersService