"use client";

import { SessionEntrance } from "@/components/web/session/entrance/session-entrance";
import { SessionPageContent } from "@/components/web/session/session-page-content";
import { useParams } from "next/navigation";

export default function SessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();

  return (
    <div className="h-full flex-1 flex flex-col">
      <SessionEntrance sessionId={sessionId}>
        {(sessionDetails) => (
          <SessionPageContent
            sessionId={sessionId}
            sessionDetails={sessionDetails}
          />
        )}
      </SessionEntrance>
    </div>
  );
}
