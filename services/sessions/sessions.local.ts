import { SessionsService } from "./sessions.service";
import { SessionsRow, SessionWithShares } from "@/types/sessions"

export const localSessionsService: SessionsService = {
  async createSession(input, user, supabase): Promise<SessionsRow> {
    const { title, lat, lng, requires_code, radius_meters, expires_at } = input;

    const { data, error } = await supabase
      .from("sessions")
      .insert({
        title,
        location: `POINT(${lng} ${lat})`,
        requires_code,
        radius_meters,
        host_id: user.id,
        expires_at
      })
      .select("*")
      .single();

    console.log("Created session in service : ", data);

    if (error) {
      console.log("Error occured in create session service : ", error);
      throw new Error(`Session creation failed : ${error.message}`);
    }
    return data as SessionsRow;
  },

  async getNearbySessions(input, supabase): Promise<SessionWithShares[]> {
    const { lat, lng } = input;

    const { data, error } = await supabase
      .rpc('get_nearby_sessions', { lat, lng })
      .select(`
    id,
    created_at,
    radius_meters,
    expires_at,
    host_id,
    location,
    title,
    is_active,
    requires_code,
    shares:shares (
      id,
      session_id,
      share_type,
      created_at,
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
    )
  `)
      .order("created_at", { ascending: false });

    console.log("Nearby sessions in service : ", data);

    if (error) throw new Error(`Nearby sessions query failed: ${error.message}`);

    const sessions: SessionWithShares[] = (data ?? []) as unknown as SessionWithShares[];

    return sessions;
  },
  //   async joinSession(input) {
  //     // direct validation
  //   }
};
