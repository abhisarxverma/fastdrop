"use client";

import { NearbySession } from "@/types/sessions";
import { useState } from "react";
import { SessionHeader } from "./session-header";
import { ListSkeleton } from "../reusables/list-skeletons";
import Container from "@/components/layouts/container";
import { SessionFilters } from "./session-filters";
import { ShareItemType } from "@/types/share-items";
import { ShareWithItems } from "@/types/shares";
import { EmptyState } from "../reusables/empty-state";
import { PackageOpen } from "lucide-react";
import ShareFab from "./share-fab";
import { ShareTextModal } from "@/components/web/share/share-text-modal";
import { ShareCodeModal } from "@/components/web/share/share-code-modal";
import { ShareLinkModal } from "@/components/web/share/share-link-modal";
import { ShareFileModal } from "@/components/web/share/share-file-modal";
import { PaginatedList } from "../reusables/paginated-list";
import { ShareRenderer } from "../share/share-card/share-renderer";
import { useSharesRealtime } from "@/hooks/use-shares-realtime";
import { ShareModalResolver } from "@/components/web/share/view-modal/share-modal-resolver"

interface SessionPageContentProps {
  sessionId: string;
  sessionDetails: NearbySession;
}

export function SessionPageContent({
  sessionId,
  sessionDetails,
}: SessionPageContentProps) {
  const { shares, loading } = useSharesRealtime(sessionId);

  const [view, setView] = useState<"rows" | "grid">("rows");
  const [searchInput, setSearchInput] = useState("");
  const [typeFilter, setTypeFilter] = useState<ShareItemType | "all">("all");
  const [newShareType, setNewShareType] = useState<ShareItemType | null>(null);
  const [activeShare, setActiveShare] = useState<ShareWithItems | null>(
    null,
  );

  console.log("active share : ", activeShare);

  return (
    <div className="flex flex-col">
      <SessionHeader
        sessionDetails={sessionDetails}
        onLeave={() => {}}
        isHost={false}
      />

      <Container className="flex flex-col flex-1 pt-6 pb-16 space-y-6">
        <SessionFilters
          view={view}
          onViewChange={setView}
          onTypeFilterChange={(val) =>
            setTypeFilter(val as ShareItemType | "all")
          }
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
        />

        <div className="flex-1 flex flex-col">
          {loading && <ListSkeleton />}

          {!loading && shares.length === 0 && (
            <div className="flex-1 flex items-center justify-center py-5">
              <EmptyState
                title="Nothing shared yet"
                subtitle="Anything shared will appear here in realtime."
                Icon={PackageOpen}
              />
            </div>
          )}

          {!loading && shares.length > 0 && (
            <PaginatedList
              items={
                typeFilter !== "all"
                  ? shares.filter(
                      (share) => share.items[0].item_type === typeFilter,
                    )
                  : shares
              }
              view={view}
              pageSize={6}
              renderItem={(share) => (
                <ShareRenderer
                  key={share.id}
                  share={share}
                  view={view}
                  onOpen={() => {
                    setActiveShare(share);
                  }}
                />
              )}
            />
          )}
        </div>
      </Container>

      <ShareFab onSelect={(type) => setNewShareType(type)} />

      <ShareTextModal
        open={newShareType === "text"}
        onOpenChange={(open) => !open && setNewShareType(null)}
        session_id={sessionId}
      />
      <ShareCodeModal
        open={newShareType === "code"}
        onOpenChange={(open) => !open && setNewShareType(null)}
        session_id={sessionId}
      />
      <ShareFileModal
        open={newShareType === "file"}
        onOpenChange={(open) => !open && setNewShareType(null)}
        session_id={sessionId}
      />
      <ShareLinkModal
        open={newShareType === "link"}
        onOpenChange={(open) => !open && setNewShareType(null)}
        session_id={sessionId}
      />

      {activeShare && (
        <ShareModalResolver
          share={activeShare}
          onClose={() => setActiveShare(null)}
        />
      )}
    </div>
  );
}
