import { ServiceResponse } from "@/lib/types/service-response";
import { CreateSessionInput } from "@/schemas/sessions/create-session.schema";
import { EditSessionInput } from "@/schemas/sessions/edit-session";
import { EndSessionInput } from "@/schemas/sessions/end-session";
import { GetNearbySessionsInput } from "@/schemas/sessions/get-nearby-sessions.schema";
import { GetSessionCodeInput } from "@/schemas/sessions/get-session-code";
import { GetSessionContentByIdInput } from "@/schemas/sessions/get-session-content-by-id";
import { GetSessionDetailsByIdInput } from "@/schemas/sessions/get-session-details-by-id";
import { ValidateSessionCodeInput } from "@/schemas/sessions/validate-session-code";
import { SessionsRow, NearbySession, SessionWithShares } from "@/types/sessions";
import { SupabaseClient, User } from "@supabase/supabase-js";

export interface SessionsService {
  createSession(input: CreateSessionInput, user: User, supabase: SupabaseClient, token: string ): Promise<ServiceResponse<SessionsRow>>;
  getNearbySessions(input: GetNearbySessionsInput, supabase: SupabaseClient ): Promise<ServiceResponse<NearbySession[]>>;
  getActiveSessionOfUser(user: User, supabase: SupabaseClient) : Promise<ServiceResponse<SessionsRow>>;
  getSessionDetailsById(input: GetSessionDetailsByIdInput, supabase: SupabaseClient ) : Promise<ServiceResponse<NearbySession | null>>;
  validateSessionCode(input: ValidateSessionCodeInput, supabase: SupabaseClient) : Promise<ServiceResponse<boolean>>;
  getSessionContentById(input: GetSessionContentByIdInput, supabase: SupabaseClient) : Promise<ServiceResponse<SessionWithShares>>;
  editSession(input: EditSessionInput, supabase: SupabaseClient, user: User, token: string): Promise<ServiceResponse<SessionsRow>>;
  endSession(input: EndSessionInput, supabase: SupabaseClient, user: User, token: string): Promise<ServiceResponse<{session_id: string}>>;
  getSessionCode(input: GetSessionCodeInput, supabase: SupabaseClient, user: User, token: string): Promise<ServiceResponse<{ join_code: string }>>;
}