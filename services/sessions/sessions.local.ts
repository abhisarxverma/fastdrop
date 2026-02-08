import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { SessionsService } from "./sessions.service";
import { SessionsRow, NearbySession } from "@/types/sessions"
import { ServiceResponse } from "@/lib/types/service-response";
import { logLocalError } from "@/lib/logging/logger";

export const localSessionsService: SessionsService = {
  async createSession(input, user, supabase): Promise<ServiceResponse<SessionsRow>> {
    const { title, lat, lng, requires_code, radius_meters, expires_at } = input;

    for (let attempt = 1; attempt <= 3; attempt++) {

      const { data, error } = await supabase
        .from("sessions")
        .insert({
          title,
          location: `POINT(${lng} ${lat})`,
          requires_code,
          radius_meters,
          host_id: user.id,
          expires_at,
        })
        .select("*")
        .single();

      if (!error) {
        return {
          success: true,
          data,
          message: "Session created"
        };
      }

      if (error.code !== "23505") {
        return {
          success: false,
          message: mapSupabaseError(error),
          data: null
        };
      }
    }

    return {
      success: false,
      message: "Failed to generate unique join code",
      data: null
    };
  },

  async getNearbySessions(input, supabase): Promise<ServiceResponse<NearbySession[]>> {
    const { lat, lng } = input;

    const { data, error } = await supabase
      .rpc('get_nearby_sessions', { lat, lng })
      .select("*")

    if (error) {
      logLocalError("get-nearby-sessions", { input, rpc: "get_nearby_sessions" }, error);
      return {
        success: false,
        message: mapSupabaseError(error),
        data: null,
      };
    }

    const sessions: NearbySession[] = (data ?? []) as unknown as NearbySession[];

    return {
      success: true,
      message: "Fetched nearby sessions successfully.",
      data: sessions,
    };
  },

  async getActiveSessionOfUser(user, supabase) {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("host_id", user.id)
      .eq("ended_by_host", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();


    if (error) {
      logLocalError("get active session of user", { user }, error);
      return {
        success: false,
        message: mapSupabaseError(error),
        data: null
      }
    }

    return {
      success: true,
      message: "Active session check successful",
      data: data ?? null
    }
  },

}
