"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { NearbySession, SessionsRow } from "@/types/sessions";

interface UseSessionsRealtimeProps {
    lat: number;
    lng: number;
    onInsert: (session: NearbySession) => void;
    onDelete: (sessionId: SessionsRow["id"]) => void;
}

export function useSessionsRealtime({
    lat,
    lng,
    onInsert,
    onDelete
}: UseSessionsRealtimeProps) {
    useEffect(() => {
        if (!lat || !lng) return;

        const supabase = createClient();

        const channel = supabase
            .channel("sessions-insert")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "sessions",
                },
                async (payload) => {
                    const session = payload.new as NearbySession;

                    const { data: isVisible, error: visibilityCheckError } = await supabase.rpc(
                        "is_session_visible_to_user",
                        {
                            p_session_id: session.id,
                            p_user_lat: lat,
                            p_user_lng: lng,
                        }
                    );

                    if (visibilityCheckError || !isVisible) return;

                    const { data, error } = await supabase.rpc(
                        "get_nearby_session_by_id",
                        {
                            p_session_id: session.id,
                            p_lat: lat,
                            p_lng: lng,
                        }
                    );

                    if (error || !data || data.length === 0) {
                        return null;
                    }

                    onInsert(session);
                }
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "sessions",
                },
                (payload) => {
                    const deletedId = payload.old.id;
                    onDelete(deletedId);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [lat, lng, onInsert, onDelete]);
}
