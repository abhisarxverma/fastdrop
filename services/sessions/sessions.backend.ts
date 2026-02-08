import { fetchBackend } from "@/lib/fetcher";
import { SessionsService } from "./sessions.service";

export const backendSessionsService: SessionsService = {
  async createSession(input, user) {
    console.log("I am talking to backend");
    return fetchBackend("/api/sessions", {
        method: "POST",
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
    return fetchBackend(`/api/sessions/get-active-session`, {
      method: "POST",
      body: {
        id: user.id
      }
    });
  },
};
