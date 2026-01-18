import { SupabaseClient } from "@supabase/supabase-js";
import { CreateTextShareInput } from "@/features/share/text/types";

export async function createTextShareService(
  supabase: SupabaseClient,
  input: CreateTextShareInput
) {
  const { room_id, created_by, content, lat, lng, expires_at } = input;

  const { data: share, error: shareError } = await supabase
    .from("shares")
    .insert({
      room_id: room_id ?? null,
      created_by,
      share_type: "single",
      expires_at,
      location: `POINT(${lng} ${lat})`,
    })
    .select("id")
    .single();

  if (shareError) throw new Error(`Share creation failed: ${shareError.message}`);

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      share_id: share.id,
      content_text: content,
      item_type: "text"
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return share;
}
