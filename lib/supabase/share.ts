import { createClient } from "./client";

type CreateTextShareInput = {
  roomId: string | null;
  profileId: string;
  content: string;
  lat: number;
  lng: number;
  expiresAt: string;
};

export async function createTextShare({
  roomId,
  profileId,
  content,
  lat,
  lng,
  expiresAt,
}: CreateTextShareInput) {
  const supabase = createClient();

  if (!roomId) {
    roomId = process.env.NEXT_PUBLIC_GLOBAL_ROOM_ID!
  }

  const { data: share, error } = await supabase
    .from("shares")
    .insert({
      room_id: roomId,
      created_by: profileId,
      share_type: "single",
      expires_at: expiresAt,
      location: `POINT(${lng} ${lat})`,
    })
    .select()
    .single();

  if (error) {
    console.log("Error in share creation supabase query : ", error);
    throw error;
  }

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      share_id: share.id,
      content_text: content,
      item_type: "text"
    });

  if (itemError) throw itemError;

  return share;
}
