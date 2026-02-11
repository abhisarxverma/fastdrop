"use client";

import { NearbySession, SessionWithShares } from "@/types/sessions";
import { useActionState, useEffect, useState, useTransition } from "react";
import { SessionHeader } from "./session-header";
import { ListSkeleton } from "../reusables/list-skeletons";
import Container from "@/components/layouts/container";
import { SessionFilters } from "./session-filters";
import { ShareItemType } from "@/types/share-items";
import { getSessionContentByIdAction } from "@/actions/sessions.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { toast } from "sonner";
import { ShareWithItems } from "@/types/shares";
import { EmptyState } from "../reusables/empty-state";
import { PackageOpen } from "lucide-react";
import ShareFab from "./share-fab";

interface SessionPageContentProps {
  sessionId: string;
  sessionDetails: NearbySession
}

export function SessionPageContent({ sessionId, sessionDetails }: SessionPageContentProps) {
  const [sessionContent, setSessionContent] = useState<ShareWithItems[]>([]);
  const [view, setView] = useState<"rows" | "grid">("rows");
  const [searchInput, setSearchInput] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<ShareItemType | "all">("all");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getSessionContentByIdAction({
          sessionId
        });
        const data = unwrapActionResult(res);
        console.log("Data : ", data);
        setSessionContent(data.shares);
      } catch (error) {
        console.log("Error in getting session content: ", error);
        toast.error((error as Error).message);
      }
    })
  }, [sessionId]);


  return (
    <div className="flex-1 space-y-4">
      <SessionHeader sessionDetails={sessionDetails} onLeave={() => { }} isHost={false} />
      <Container className="flex flex-col gap-3">
        <SessionFilters
          view={view}
          onViewChange={setView}
          onTypeFilterChange={(val) => setTypeFilter(val as ShareItemType | "all")}
          searchInput={searchInput}
          onSearchInputChange={(val) => setSearchInput(val)} />
        {isPending && <ListSkeleton />}
        {!isPending && sessionContent.length == 0 && <EmptyState title="Nothing shared yet" subtitle="Anything shared will appear in realitime" Icon={PackageOpen} />}
        <ShareFab
          onSelect={(type) => {
            console.log("Selected:", type);
          }}
        />
      </Container>
    </div>
  );
}
