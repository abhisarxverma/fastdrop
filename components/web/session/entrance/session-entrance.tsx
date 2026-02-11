"use client";

import { ReactNode, useEffect, useState } from "react";
import CheckingSessionLoader from "./checking-session-loader";
import { SessionCodeGate } from "./session-code-gate";
import { NearbySession } from "@/types/sessions";
import { SessionExpiredModal } from "./session-expired-modal";
import { getNearbySessionByIdAction } from "@/actions/sessions.actions";
import { useGeo } from "@/providers/geo-provider";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";

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

    async function runEntranceFlow() {
      try {
        const res = await getNearbySessionByIdAction({
          sessionId,
          lat: location.lat,
          lng: location.lng,
        });

        if (cancelled) return;

        const fetchedSessionDetails = unwrapActionResult(res);
        console.log("session res : ",fetchedSessionDetails);

        if (!fetchedSessionDetails) {
          setState("expired");
          return;
        }

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
    return <SessionExpiredModal onExit={() => {}} />;
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
