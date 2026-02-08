import { Tables } from "./utils";

export type SessionsRow = Tables<"sessions">;

export type SharesRow = Tables<"shares">;

export type ShareItemsRow = Tables<"share_items">;

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
};
