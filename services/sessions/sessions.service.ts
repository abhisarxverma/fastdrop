import { ServiceResponse } from "@/lib/types/service-response";
import { CreateSessionInput } from "@/schemas/sessions/create-session.schema";
import { GetNearbySessionByIdInput } from "@/schemas/sessions/get-nearby-session-by-id";
import { GetNearbySessionsInput } from "@/schemas/sessions/get-nearby-sessions.schema";
import { GetSessionContentByIdInput } from "@/schemas/sessions/get-session-content-by-id";
import { ValidateSessionCodeInput } from "@/schemas/sessions/validate-session-code";
import { SessionsRow, NearbySession, SessionWithShares } from "@/types/sessions";
import { SupabaseClient, User } from "@supabase/supabase-js";

export interface SessionsService {
  createSession(input: CreateSessionInput, user: User, supabase: SupabaseClient, ): Promise<ServiceResponse<SessionsRow>>;
  getNearbySessions(input: GetNearbySessionsInput, supabase: SupabaseClient, ): Promise<ServiceResponse<NearbySession[]>>;
  getActiveSessionOfUser(user: User, supabase: SupabaseClient) : Promise<ServiceResponse<SessionsRow>>;
  getNearbySessionById(input: GetNearbySessionByIdInput, supabase: SupabaseClient ) : Promise<ServiceResponse<NearbySession | null>>;
  validateSessionCode(input: ValidateSessionCodeInput, supabase: SupabaseClient) : Promise<ServiceResponse<boolean>>;
  getSessionContentById(input: GetSessionContentByIdInput, supabase: SupabaseClient) : Promise<ServiceResponse<SessionWithShares>>;
}
