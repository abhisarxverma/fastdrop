import { fetchBackend } from "@/lib/fetcher";
import { SessionsService } from "./sessions.service";

export const backendSessionsService: SessionsService = {
  async createSession(input, user, supabase, token) {
    return fetchBackend("/api/sessions", {
        method: "POST",
        authorization : `Bearer ${token}`,
        body: { ...input, host_id: user.id }
    });
  },

  async getNearbySessions(input) {
    const { lat, lng } = input;
    return fetchBackend(`/api/sessions/nearby?lat=${lat}&lng=${lng}`, {
      method: "GET",
    });
  },

  async getActiveSessionOfUser(user) {;
    return fetchBackend(`/api/sessions/active`, {
      method: "POST",
      body: {
        user_id: user.id
      }
    });
  },

  async getNearbySessionById(input) {
    return fetchBackend("/api/sessions/nearby/"+input.sessionId, {
      method: 'POST',
      body: input
    })
  },

  async validateSessionCode(input) {
    return fetchBackend("/api/sessions/validate-code", {
      method: 'POST',
      body: input
    })
  },

  async getSessionContentById(input) {
    return fetchBackend("/api/sessions/get-content", {
      method: "POST",
      body: input
    })
  },

  async editSession(input, supabase, user, token) {
    return fetchBackend("/api/sessions/edit", {
      method: "PATCH",
      authorization: `Bearer ${token}`,
      body: input
    })
  }
};
