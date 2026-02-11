import { mapSupabaseError } from "@/lib/errors/supabase-error";
import { SessionsService } from "./sessions.service";
import { SessionsRow, NearbySession } from "@/types/sessions"
import { ServiceResponse } from "@/lib/types/service-response";
import { logLocalError } from "@/lib/logging/logger";
import { getNearbySessionByIdRpc } from "@/lib/supabase/rpc/get-nearby-session-by-id";
import { validateSessionCodeRpc } from "@/lib/supabase/rpc/validate-session-code";
import { getNearbySessionsRpc } from "@/lib/supabase/rpc/get-nearby-sessions";
import { getSessionContentByIdRpc } from "@/lib/supabase/rpc/get-session-content-by-id";

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

    logLocalError("create-session", { input }, new Error("Session creation failed after 3 attempts."));

    return {
      success: false,
      message: "Failed to generate unique join code",
      data: null
    };
  },

  async getNearbySessions(input, supabase): Promise<ServiceResponse<NearbySession[]>> {
    const { lat, lng } = input;

    const { data, error } = await getNearbySessionsRpc(supabase, lat, lng);

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

  async getActiveSessionOfUser(user, supabase): Promise<ServiceResponse<SessionsRow>> {
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

  async getNearbySessionById(input, supabase): Promise<ServiceResponse<NearbySession | null>> {

    const { sessionId, lat, lng } = input;

    const { data, error } = await getNearbySessionByIdRpc(supabase, sessionId, lat, lng);

    if (error) {
      logLocalError("get nearby session by id", { input }, error);
      return {
        success: false,
        message: mapSupabaseError(error),
        data: null
      }
    }

    return {
      success: true,
      message: "Get nearby session by id successfull.",
      data: data ?? null
    }

  },

  async validateSessionCode(input, supabase): Promise<ServiceResponse<boolean>> {

    const { sessionId, code } = input;
    const { data, error } =  await validateSessionCodeRpc(supabase, sessionId, code);

    if (error) {
      logLocalError("validate session code", { input }, error);
      return {
        success: false,
        message: mapSupabaseError(error),
        data: false
      }
    }

    return {
      success: true,
      message: "Session code validation successfull.",
      data: data === true
    }
  },

  async getSessionContentById(input, supabase) {

    const { sessionId } = input;

    const { data, error } = await getSessionContentByIdRpc(supabase, sessionId);

    if (error) {
      logLocalError("get session content by id", { input }, error);
      return {
        success: false,
        message: mapSupabaseError(error),
        data: null
      }
    }

    return {
      success: true,
      message: "Session content successfully fetched.",
      data: data ?? null
    }

  },

}