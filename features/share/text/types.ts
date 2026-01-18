import { User } from "@supabase/supabase-js"

export type CreateTextShareInput = {
    room_id?: string | undefined,
    created_by: User["id"],
    lat: number,
    lng: number,
    content: string,
    expires_at: string
}