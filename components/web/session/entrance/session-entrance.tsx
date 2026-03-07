"use client";

import { ReactNode, useEffect, useState } from "react";
import CheckingSessionLoader from "./checking-session-loader";
import { SessionCodeGate } from "./session-code-gate";
import { NearbySession } from "@/types/sessions";
import { SessionExpiredModal } from "./session-expired-modal";
import { getNearbySessionByIdRpc } from "@/lib/supabase/rpc/get-nearby-session-by-id";
import { useGeo } from "@/providers/geo-provider";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

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
  const [sessionDetails, setSessionDetails] = useState<NearbySession | null>(null);
  const [state, setState] = useState<EntranceState>("checking");

  const { location } = useGeo();
  const { user, loading: authLoading } = useAuth();
  
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
          location.lng,
        );

        if (cancelled) return;

        console.log("session res : ",res);

        if (!res.data || res.error) {
          setState("expired");
          return;
        }

        const fetchedSessionDetails = res.data;
        setSessionDetails(fetchedSessionDetails);

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

  if (authLoading || state === "checking") {
    return <CheckingSessionLoader />;
  }

  if (state === "expired") {
    return <SessionExpiredModal onExit={() => {}} />
  }

  if (state === "requires_code" && sessionDetails) {
    return <SessionCodeGate sessionData={sessionDetails} />;
  }

  if (!sessionDetails) return null;

  return (
    <>
      {children(sessionDetails)}
    </>
  );
}
