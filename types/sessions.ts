import { ShareWithItems } from "./shares";
import { SupabaseTables } from "./utils";

export type SessionsRow = SupabaseTables<"sessions">;

export type Session = Omit<SessionsRow, "join_code">;

export type NearbySession = {
  id: string;
  title: string;
  host_id: string;
  requires_code: boolean;
  radius_meters: number;
  expires_at: string;
  distance_meters: number;
  shares_count: number;
  ended_by_host: boolean;
  created_at: string;
  sharing_enabled: boolean;
};

export type SessionWithShares = Session & {
  shares: ShareWithItems[]
}