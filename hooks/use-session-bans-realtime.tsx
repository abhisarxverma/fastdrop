"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/providers/auth-provider";
import { RealtimeChannel } from "@supabase/supabase-js";
import { logLocalError } from "@/lib/logging/logger";

type UseUserSessionBanRealtimeResult = {
  isBanned: boolean;
  bannedUsers: Set<string>;
  loading: boolean;
  error: string | null;
};

const supabase = createClient();

export function useUserSessionBanRealtime(
  sessionId: string
): UseUserSessionBanRealtimeResult {

  const { user } = useAuth();

  const [isBanned, setIsBanned] = useState(false);
  const [bannedUsers, setBannedUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);

  const fetchInitialBanState = useCallback(async () => {

    if (!user) return;

    try {

      setLoading(true);

      const { data, error } = await supabase
        .from("session_bans")
        .select("user_id")
        .eq("session_id", sessionId);

      if (error) {

        logLocalError(
          "fetch session ban state",
          { session_id: sessionId, user_id: user.id },
          error
        );

        setError(error.message);
        setLoading(false);
        return;
      }

      const bannedSet = new Set<string>();

      data?.forEach((row) => bannedSet.add(row.user_id));

      setBannedUsers(bannedSet);

      setIsBanned(bannedSet.has(user.id));

      setLoading(false);

    } catch (err) {

      logLocalError(
        "fetch session ban state unexpected",
        { session_id: sessionId, user_id: user.id },
        err
      );

      setError("Failed to check ban status");
      setLoading(false);
    }

  }, [sessionId, user]);

  useEffect(() => {

    if (!sessionId || !user) return;

    let cancelled = false;

    async function setupRealtime() {

      await fetchInitialBanState();

      if (cancelled) return;

      if (channelRef.current) {
        await supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      const channel = supabase
        .channel(`session-bans-${sessionId}`)

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "session_bans",
            filter: `session_id=eq.${sessionId}`,
          },
          (payload) => {

            const row = (payload.new ?? payload.old) as { user_id: string };

            console.log("A new banned user : ", payload);

            if (!row) return;

            setBannedUsers((prev) => {

              const next = new Set(prev);

              if (payload.eventType === "DELETE") {
                next.delete(row.user_id);
              } else {
                next.add(row.user_id);
              }

              return next;
            });

            if (row.user_id === user?.id) {
              setIsBanned(payload.eventType !== "DELETE");
            }

          }
        )

        .subscribe((status) => {
          console.log("Session ban realtime:", status);
        });

      channelRef.current = channel;
    }

    setupRealtime();

    return () => {

      cancelled = true;

      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

    };

  }, [sessionId, user, fetchInitialBanState]);

  return {
    isBanned,
    bannedUsers,
    loading,
    error,
  };
}