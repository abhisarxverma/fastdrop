import { NearbySharesServiceInput } from "@/features/nearby-shares/types";
import { NearbyShares, ShareWithItems } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function nearbySharesService(
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
      share_items:share_items (
        id,
        share_id,
        item_type,
        title,
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

    const transformed: NearbyShares = rows.map((share) => {
        if (share.share_type === "single" && share.share_items.length === 1) {
            return {
                ...share,
                ...share.share_items[0],
                share_type: "single" as const, 
                share_items: undefined,
            };
        }
        return {
            ...share,
            share_type: "multiple" as const,  
        };
    });

    return transformed;
}
