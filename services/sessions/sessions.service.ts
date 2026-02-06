import { CreateSessionInput } from "@/schemas/sessions/create-session.schema";
import { GetNearbySessionsInput } from "@/schemas/sessions/get-nearby-sessions.schema";
import { SessionsRow, SessionWithShares } from "@/types/sessions";
import { SupabaseClient, User } from "@supabase/supabase-js";

export interface SessionsService {
  createSession(input: CreateSessionInput, user: User, supabase: SupabaseClient, ): Promise<SessionsRow>;
  getNearbySessions(input: GetNearbySessionsInput, supabase: SupabaseClient, ): Promise<SessionWithShares[]>;
//   joinSession(input: JoinInput): Promise<void>;
}
