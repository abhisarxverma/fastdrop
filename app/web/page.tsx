"use client";

import { getActiveSessionOfUserAction, getNearbySessionsAction } from "@/actions/sessions.actions";
import { ActiveSessionOfUserBanner } from "@/components/web/sessions/active-session-of-user-banner";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { useGeo } from "@/providers/geo-provider";
import { NearbySession, Session } from "@/types/sessions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DashboardToolbar from "@/components/web/sessions/dashboard-toolbar";
import { SessionList } from "@/components/web/sessions/sessions-list";
import { AppFooter } from "@/components/web/layout/app-footer";
import Container from "@/components/layouts/container";
import { StartSessionDialog } from "@/components/web/sessions/start-session-dialog";
import { useSessionsRealtime } from "@/hooks/use-sessions-realtime";

export default function NearbySessionsPage() {
  const [view, setView] = useState<"rows" | "grid">("grid");
  const [searchInput, setSearchInput] = useState("");
  const [runningSession, setRunningSession] = useState<Session | null>(null);
  const [sessions, setSessions] = useState<NearbySession[]>([]);
  const [startDialogOpen, setStartDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  const { location } = useGeo();

  useEffect(() => {
    (async () => {
      try {
        const [nearbyRes, activeRes] = await Promise.all([
          getNearbySessionsAction({ lat: location.lat, lng: location.lng }),
          getActiveSessionOfUserAction(),
        ]);

        console.log("Active : ", activeRes);

        setSessions(unwrapActionResult(nearbyRes));
        setRunningSession(unwrapActionResult(activeRes));
      } catch (err) {
        toast.error((err as Error).message);
        console.log("Error in web: ", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [location]);

  useSessionsRealtime({
    lat: location.lat,
    lng: location.lng,
    onInsert: (session) => {
      setSessions((prev) => {
        if (prev.some((s) => s.id === session.id)) return prev;
        return [session, ...prev];
      });
    },
    onDelete: (sessionId) => {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    },
    onUpdate: (session) => {
      setSessions((prev) => {
        return prev.map((s) => {
          if (s.id === session.id) return session;
          return s;
        })
      })
    }
  });

  return (
    <div className="h-full flex-1 flex flex-col gap-3">

      {startDialogOpen && <StartSessionDialog
        open={startDialogOpen}
        onOpenChange={setStartDialogOpen}
        onCreated={(createdSession) => {
          setRunningSession(createdSession);
        }} />}

      {runningSession && (
        <ActiveSessionOfUserBanner
          session={runningSession}
          onEnter={() => router.push(`/web/sessions/${runningSession.id}`)}
        />
      )}

      <Container className="flex-1 h-full flex flex-col">

        <main className="flex-1 flex flex-col py-6 sm:py-8 md:py-10">
          <div className="flex-1 min-h-150 flex flex-col gap-8">
            <section className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Sessions near you
              </h1>
              <p className="text-sm sm:text-base md:text-md text-muted-foreground">
                Join a session or start one.
              </p>
            </section>

            <DashboardToolbar
              searchInput={searchInput}
              onSearchInputChange={setSearchInput}
              view={view}
              onViewChange={setView}
              disableStart={loading || !!runningSession}
              onStartClick={setStartDialogOpen}
            />

            <SessionList
              loading={loading}
              sessions={sessions}
              searchInput={searchInput}
              view={view}
            />
          </div>

          <AppFooter />
        </main>
      </Container>
    </div>
  );
}