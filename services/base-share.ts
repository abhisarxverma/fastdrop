import { ShareInput } from "@/features/share/common/types";
import { Share } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function createBaseShare(supabase: SupabaseClient, baseShareInput: ShareInput, share_type: "single" | "multiple"): Promise<Share> {

    const { room_id, created_by, expires_at, lat, lng } = baseShareInput;

    const { data: share, error: shareError } = await supabase
        .from("shares")
        .insert({
            room_id: room_id ?? null,
            created_by,
            share_type: share_type,
            expires_at,
            location: `POINT(${lng} ${lat})`,
        })
        .select()
        .single();

    if (shareError) throw new Error(`Share creation failed: ${shareError.message}`);

    return share
}