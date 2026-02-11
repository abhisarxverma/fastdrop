"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { NearbySession, SessionsRow } from "@/types/sessions";
import { isSessionVisibleToUserRpc } from "@/lib/supabase/rpc/is-session-visible";
import { getNearbySessionByIdRpc } from "@/lib/supabase/rpc/get-nearby-session-by-id";
import { logError } from "@/lib/logging/logger";
import { useAuth } from "@/providers/auth-provider";

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
    const { user } = useAuth();
    useEffect(() => {
        if (!lat || !lng || !user) return;

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
                    const session = payload.new as SessionsRow;

                    if (session.host_id === user.id) return null;

                    const { data: isVisible, error: visibilityCheckError } = await isSessionVisibleToUserRpc(supabase, session.id, lat, lng)

                    if (visibilityCheckError){
                        logError({
                            source: "local",
                            scope: "Sessions realtime - visibility check by rpc",
                            error: visibilityCheckError
                        })
                        return null;
                    }

                    if (!isVisible) return;

                    const { data, error } = await getNearbySessionByIdRpc(supabase, session.id, lat, lng);

                    if (error) {
                        logError({
                            source: "local",
                            scope: "Sessions realtime - getting nearby session by id",
                            error
                        })
                        return null;
                    }

                    onInsert(data as NearbySession);
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
    }, [lat, lng, user, onInsert, onDelete]);
}
