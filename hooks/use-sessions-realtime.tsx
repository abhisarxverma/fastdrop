"use client";

import { useEffect, useRef, useCallback } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
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

const supabase = createClient();

export function useSessionsRealtime({
  lat,
  lng,
  onInsert,
  onDelete,
}: UseSessionsRealtimeProps): void {
  const { user } = useAuth();

  const channelRef = useRef<RealtimeChannel | null>(null);
  const mountedRef = useRef<boolean>(false);

  const handleInsert = useCallback(
    async (session: SessionsRow) => {
      if (!user) return;
      if (session.host_id === user.id) return;

      const { data: isVisible, error: visibilityError } =
        await isSessionVisibleToUserRpc(
          supabase,
          session.id,
          lat,
          lng
        );

      if (visibilityError) {
        logError({
          source: "local",
          scope: "Sessions realtime - visibility check RPC",
          error: visibilityError,
        });
        return;
      }

      if (!isVisible) return;

      const { data, error } = await getNearbySessionByIdRpc(
        supabase,
        session.id,
        lat,
        lng
      );

      if (error) {
        logError({
          source: "local",
          scope: "Sessions realtime - get nearby session RPC",
          error,
        });
        return;
      }

      if (data) onInsert(data as NearbySession);
    },
    [lat, lng, user, onInsert]
  );

  useEffect(() => {
    if (!lat || !lng || !user) return;

    let isCancelled = false;

    async function setupRealtime() {
      if (mountedRef.current) return; 
      mountedRef.current = true;

      if (channelRef.current) {
        await supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      const channel = supabase
        .channel("sessions-realtime-global")

        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "sessions",
          },
          async (payload) => {
            if (isCancelled) return;
            await handleInsert(payload.new as SessionsRow);
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
            if (isCancelled) return;
            onDelete(payload.old.id);
          }
        )

        .subscribe((status, err) => {
          console.log("Sessions realtime:", status, err);

          if (status === "CHANNEL_ERROR") {
            console.warn("Sessions realtime channel error");
          }
        });

      channelRef.current = channel;
    }

    setupRealtime();

    return () => {
      isCancelled = true;
      mountedRef.current = false;

      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [lat, lng, user, handleInsert, onDelete]);
}