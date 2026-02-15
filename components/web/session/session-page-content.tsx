"use client";

import { NearbySession } from "@/types/sessions";
import { useEffect, useState, useTransition } from "react";
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
import { ShareTextModal } from "@/components/web/share/share-text-modal";
import { ShareCodeModal } from "@/components/web/share/share-code-modal";
import { ShareFileModal } from "@/components/web/share/share-file-modal";
import { PaginatedList } from "../reusables/paginated-list";
import { ShareRenderer } from "../share/share-card/share-renderer";

interface SessionPageContentProps {
  sessionId: string;
  sessionDetails: NearbySession;
}

export function SessionPageContent({
  sessionId,
  sessionDetails,
}: SessionPageContentProps) {
  const [sessionContent, setSessionContent] = useState<ShareWithItems[]>([]);
  const [view, setView] = useState<"rows" | "grid">("rows");
  const [searchInput, setSearchInput] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<ShareItemType | "all">("all");
  const [isPending, startTransition] = useTransition();
  const [newShareType, setNewShareType] = useState<ShareItemType | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getSessionContentByIdAction({
          sessionId,
        });
        const data = unwrapActionResult(res);
        console.log("Data : ", data);
        setSessionContent(data.shares);
      } catch (error) {
        console.log("Error in getting session content: ", error);
        toast.error((error as Error).message);
      }
    });
  }, [sessionId]);

  return (
    <div className="flex-1 space-y-4">
      <SessionHeader
        sessionDetails={sessionDetails}
        onLeave={() => {}}
        isHost={false}
      />
      <Container className="flex flex-col gap-3">
        <SessionFilters
          view={view}
          onViewChange={setView}
          onTypeFilterChange={(val) =>
            setTypeFilter(val as ShareItemType | "all")
          }
          searchInput={searchInput}
          onSearchInputChange={(val) => setSearchInput(val)}
        />
        {isPending && <ListSkeleton />}

        {!isPending && sessionContent.length === 0 && (
          <EmptyState
            title="Nothing shared yet"
            subtitle="Anything shared will appear in realtime"
            Icon={PackageOpen}
          />
        )}

        {!isPending && sessionContent.length > 0 && (
          <PaginatedList
            items={sessionContent}
            view={view}
            pageSize={6}
            renderItem={(share) => (
              <ShareRenderer key={share.id} share={share} view={view} />
            )}
          />
        )}
        <ShareFab
          onSelect={(type) => {
            setNewShareType(type);
          }}
        />
      </Container>
      <ShareTextModal
        open={newShareType === "text"}
        onOpenChange={(open) => {
          if (!open) setNewShareType(null);
        }}
        session_id={sessionId}
      />
      <ShareCodeModal
        open={newShareType === "code"}
        onOpenChange={(open) => {
          if (!open) setNewShareType(null);
        }}
        session_id={sessionId}
      />
      <ShareFileModal
        open={newShareType === "file"}
        onOpenChange={(open) => {
          if (!open) setNewShareType(null);
        }}
        session_id={sessionId}
      />
    </div>
  );
}
