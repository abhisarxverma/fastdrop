import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { SessionsService } from "./sessions.service";
import { SessionsRow, SessionWithShares } from "@/types/sessions"
import { ServiceResponse } from "@/lib/types/service-response";
import { logLocalError } from "@/lib/logging/logger";

export const localSessionsService: SessionsService = {
  async createSession(input, user, supabase): Promise<ServiceResponse<SessionsRow>> {
    const { title, lat, lng, requires_code, radius_meters, expires_at } = input;

    const { data, error } = await supabase
      .from("sessions")
      .insert({
        title,
        location: `POINT(${lng} ${lat})`,
        requires_code,
        radius_meters,
        host_id: user.id,
        expires_at
      })
      .select("*")
      .single();

    if (error) {
      logLocalError("create-session", { input }, error);

      return {
        success: false,
        message: mapSupabaseError(error),
        data: null,
      };
    }
    return {
      success: true,
      message: "Session created successfully.",
      data,
    };
  },

  async getNearbySessions(input, supabase): Promise<ServiceResponse<SessionWithShares[]>> {
    const { lat, lng } = input;

    const { data, error } = await supabase
      .rpc('get_nearby_sessions', { lat, lng })

    if (error) {
      logLocalError("get-nearby-sessions", { input, rpc: "get_nearby_sessions" }, error);
      return {
        success: false,
        message: mapSupabaseError(error),
        data: null,
      };
    }

    const sessions: SessionWithShares[] = (data ?? []) as unknown as SessionWithShares[];

    return {
      success: true,
      message: "Fetched nearby sessions successfully.",
      data: sessions,
    };
  }
}
