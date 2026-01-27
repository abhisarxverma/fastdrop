import { User } from "@supabase/supabase-js"

export type BaseShareInput = {
    room_id?: string,
    title: string,
    lat: number,
    lng: number,
    expires_at: string
    created_by: User["id"]
}
