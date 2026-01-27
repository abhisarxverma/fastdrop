import { NearbyShares } from "@/features/nearby-shares/types";
import { ShareWithItems } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { NearbySharesServiceInput } from "./validation";

export async function getNearbyShares(
    supabase: SupabaseClient,
    input: NearbySharesServiceInput
): Promise<NearbyShares> {
    const { lat, lng, radius } = input;

    const { data, error } = await supabase
        .rpc('nearby_shares', { lat, lng, radius_meters: radius })
        .select(`
      id,
      room_id,
      share_type,
      created_at,
      expires_at,
      created_by,
      location,
      title,
      share_items:share_items (
        id,
        share_id,
        item_type,
        content_text,
        file_path,
        language,
        file_type,
        created_at,
        file_name
      )
    `)
        .order("created_at", { ascending: false });

    if (error) throw new Error(`Nearby share service query failed: ${error.message}`);

    const rows = (data ?? []) as ShareWithItems[];

    return rows;
}
