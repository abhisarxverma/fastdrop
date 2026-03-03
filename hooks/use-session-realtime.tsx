import { createClient } from "@/lib/supabase/client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/providers/auth-provider";
import { RealtimeChannel } from "@supabase/supabase-js";

type UseSessionRealtimeResult = {
  sharingEnabled: boolean;
  ended: boolean;
  isBanned: boolean;
  loading: boolean;
};

const supabase = createClient();

export function useSessionRealtime(
  sessionId: string
): UseSessionRealtimeResult {
  const { user } = useAuth();

  const [sharingEnabled, setSharingEnabled] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const channelRef = useRef<RealtimeChannel | null>(null);

  const fetchSessionState = useCallback(async () => {
    if (!user) return;

    const { data: session } = await supabase
      .from("sessions")
      .select("sharing_enabled, ended_by_host")
      .eq("id", sessionId)
      .single();

    const { data: ban } = await supabase
      .from("session_bans")
      .select("id")
      .eq("session_id", sessionId)
      .eq("user_id", user.id)
      .maybeSingle();

    setSharingEnabled(session?.sharing_enabled ?? false);
    setEnded(session?.ended_by_host ?? false);
    setIsBanned(!!ban);
  }, [sessionId, user]);

  useEffect(() => {
    if (!sessionId || !user) return;

    let isMounted = true;

    async function setup() {
      setLoading(true);
      await fetchSessionState();
      setLoading(false);

      if (!isMounted) return;

      if (channelRef.current) {
        await supabase.removeChannel(channelRef.current);
      }

      const channel = supabase
        .channel(`session-${sessionId}`)

        // Session changes
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "sessions",
            filter: `id=eq.${sessionId}`,
          },
          async () => {
            await fetchSessionState();
          }
        )

        // Ban changes
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "session_bans",
            filter: `session_id=eq.${sessionId}`,
          },
          async () => {
            await fetchSessionState();
          }
        )

        .subscribe();

      channelRef.current = channel;
    }

    setup();

    return () => {
      isMounted = false;

      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [sessionId, user, fetchSessionState]);

  return { sharingEnabled, ended, isBanned, loading };
}