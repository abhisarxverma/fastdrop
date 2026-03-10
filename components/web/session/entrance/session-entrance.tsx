"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import CheckingSessionLoader from "./checking-session-loader";
import { SessionCodeGate } from "./session-code-gate";
import { NearbySession, SessionsRow } from "@/types/sessions";
import { SessionExpiredModal } from "./session-expired-modal";
import { getNearbySessionByIdRpc } from "@/lib/supabase/rpc/get-nearby-session-by-id";
import { useGeo } from "@/providers/geo-provider";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type EntranceState =
  | "checking"
  | "requires_code"
  | "expired"
  | "ready";

interface SessionEntranceProps {
  sessionId: string;
  children: (session: NearbySession) => ReactNode;
}

export function SessionEntrance({
  sessionId,
  children,
}: SessionEntranceProps) {
  const [sessionDetails, setSessionDetails] =
    useState<NearbySession | null>(null);

  const [state, setState] =
    useState<EntranceState>("checking");

  const { location } = useGeo();
  const { user, loading: authLoading } = useAuth();

  const channelRef = useRef<RealtimeChannel | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
    if (!location) return;

    let cancelled = false;

    const supabase = createClient();

    async function runEntranceFlow() {
      try {
        const res = await getNearbySessionByIdRpc(
          supabase,
          sessionId,
          location.lat,
          location.lng
        );

        if (cancelled) return;

        if (!res.data || res.error) {
          setState("expired");
          return;
        }

        const fetchedSessionDetails = res.data;

        setSessionDetails({
          ...fetchedSessionDetails,
          distance_meters: Math.round(fetchedSessionDetails.distance_meters)
        });

        const isHost = fetchedSessionDetails.host_id === user?.id;

        const isExpired =
          fetchedSessionDetails.ended_by_host ||
          new Date(fetchedSessionDetails.expires_at) < new Date();

        if (isExpired) {
          setState("expired");
          return;
        }

        if (fetchedSessionDetails.requires_code && !isHost) {
          setState("requires_code");
          return;
        }

        setState("ready");

      } catch (err) {
        console.error("Session entrance error:", err);
        toast.error("Unable to enter session");
      }
    }

    runEntranceFlow();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, location, sessionId]);

  useEffect(() => {
    if (!sessionDetails) return;

    const supabase = createClient();

    async function setupRealtime() {

      if (channelRef.current) {
        await supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      const channel = supabase
        .channel(`session-${sessionId}`)

        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "sessions",
            filter: `id=eq.${sessionId}`,
          },
          (payload) => {

            console.log("Session upated in realtime : ", payload.new);
            const updated = payload.new as SessionsRow;

            setSessionDetails((prev) => {
              if (!prev) return prev;

              return {
                ...prev,
                title: updated.title,
                requires_code: updated.requires_code,
                sharing_enabled: updated.sharing_enabled,
                expires_at: updated.expires_at,
                radius_meters: updated.radius_meters,
                ended_by_host: updated.ended_by_host
              };
            });

            const isExpired =
              updated.ended_by_host ||
              new Date(updated.expires_at) < new Date();

            if (isExpired) {
              setState("expired");
            }
          }
        )

        .subscribe((status, err) => {
          console.log("Single session realtime:", status, err);

          if (status === "CHANNEL_ERROR") {
            console.warn("Single session channel error");
          }
        });

      channelRef.current = channel;
    }

    setupRealtime();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };

  }, [sessionDetails, sessionId]);

  if (authLoading || state === "checking") {
    return <CheckingSessionLoader />;
  }

  if (state === "expired") {
    return <SessionExpiredModal onExit={() => {
      router.push("/web");
    }} />;
  }

  if (state === "requires_code" && sessionDetails) {
    return <SessionCodeGate sessionData={sessionDetails} />;
  }

  if (!sessionDetails) return null;

  return <>{children(sessionDetails)}</>;
}