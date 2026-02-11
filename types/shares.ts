import { ShareItemsRow } from "./share-items";
import { SupabaseTables } from "./utils";

export type SharesRow = SupabaseTables<"shares">;

export type ShareWithItems = SharesRow & {
    items: ShareItemsRow[]
}