import { SupabaseClient } from "@supabase/supabase-js";
import { GetShareByIdServiceInput } from "./types";
import { NearbyShare } from "../nearby-shares/types";
import { ShareItemRow, ShareRow } from "@/types";

export async function getShareById(
  supabase: SupabaseClient,
  input: GetShareByIdServiceInput
): Promise<NearbyShare | null> {

  const { shareId } = input;
    
  const { data: shareData, error: shareError } = await supabase
    .from("shares")
    .select(`
      id,
      room_id,
      title,
      share_type,
      created_at,
      expires_at,
      created_by,
      location
    `)
    .eq("id", shareId)
    .single();

  if (shareError) {
    throw new Error(`Failed to fetch share: ${shareError.message}`);
  }
  if (!shareData) return null;

  const share = shareData as ShareRow;

  const { data: itemsData, error: itemsError } = await supabase
    .from("share_items")
    .select(`
      id,
      share_id,
      item_type,
      content_text,
      file_path,
      language,
      file_type,
      created_at,
      file_name
    `)
    .eq("share_id", shareId);

  if (itemsError) {
    throw new Error(`Failed to fetch share items: ${itemsError.message}`);
  }

  const shareItems = (itemsData ?? []) as ShareItemRow[];

  return {
    ...share,
    share_items: shareItems
  }
}
