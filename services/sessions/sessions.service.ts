import { CreateSessionInput } from "@/schemas/sessions/create-session.schema";
import { Session } from "@/types/sessions";
import { SupabaseClient } from "@supabase/supabase-js";

export interface SessionsService {
  createSession(supabase: SupabaseClient, user: { id: string }, input: CreateSessionInput): Promise<Session>;
//   getNearbySessions(input: NearbyInput): Promise<Session[]>;
//   joinSession(input: JoinInput): Promise<void>;
}
