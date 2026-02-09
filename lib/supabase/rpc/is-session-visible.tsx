import { SupabaseClient } from "@supabase/supabase-js";

export async function isSessionVisibleToUser (
  supabase: SupabaseClient,
  params: {
    sessionId: string;
    lat: number;
    lng: number;
  }
) : Promise<boolean> {
  const { data, error } = await supabase.rpc(
    "is_session_visible_to_user",
    {
      p_session_id: params.sessionId,
      p_user_lat: params.lat,
      p_user_lng: params.lng,
    }
  );

  if (error) throw error;
  return data === true;
}
