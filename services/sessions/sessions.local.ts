import { fetchBackend } from "@/lib/fetcher";
import { SessionsService } from "./sessions.service";
import { Session } from "@/types/sessions"

export const localSessionsService: SessionsService = {
  async createSession(supabase, user, input) : Promise<Session> {
    // TODO: direct supabase insert
    return fetchBackend("/api/sessions", {
        method: "POST",
        body: input
    })
  },
//   async getNearbySessions(input) {
//     // direct RPC call
//   },
//   async joinSession(input) {
//     // direct validation
//   }
};
