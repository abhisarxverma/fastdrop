import { fetchBackend } from "@/lib/fetcher";
import { SessionsService } from "./sessions.service";

export const backendSessionsService: SessionsService = {
  async createSession(supabase, user, input) {
    return fetchBackend("/api/sessions", {
        method: "POST",
        body: input
    });
  },
//   async getNearbySessions(input) {
//     return fetchBackend("/api/sessions/nearby", input);
//   },
//   async joinSession(input) {
//     return fetchBackend(`/api/sessions/${input.id}/join`, input);
//   }
};
