import { Tables } from "./utils";

export type SessionsRow = Tables<"sessions">;

export type SharesRow = Tables<"shares">;

export type ShareItemsRow = Tables<"share_items">;

export type SessionWithShares = Omit<SessionsRow, "join_code"> & {
  shares: (SharesRow & { share_items: ShareItemsRow[] })[],
  distance_meters: number
};