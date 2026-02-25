"use client";

import { NearbySession } from "@/types/sessions";
import { useState, useMemo } from "react";
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
import { NormalList } from "../reusables/normal-list";
import { ShareRenderer } from "../share/share-card/share-renderer";
import { useSharesRealtime } from "@/hooks/use-shares-realtime";
import { ShareModalResolver } from "@/components/web/share/view-modal/share-modal-resolver";
import { fileTypes } from "@/constants/file-type-info";
import { ShareFolderModal } from "../share/share-folder/share-folder-modal";

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
  const [typeFilter, setTypeFilter] = useState<
    ShareItemType | "all" | "folder"
  >("all");
  const [sortFilter, setSortFilter] = useState<string>("newest");
  const [newShareType, setNewShareType] = useState<ShareItemType | "folder" | null>(null);
  const [activeShare, setActiveShare] = useState<ShareWithItems | null>(null);

  const filteredShares = useMemo(() => {
    let result = shares.map((share) => {
      const isFolder = share.share_type === "folder";

      return {
        ...share,
        kind: isFolder ? "folder" : share.items[0]?.item_type,
      };
    });

    if (typeFilter !== "all") {
      result = result.filter((share) => share.kind === typeFilter);
    }

    if (searchInput.trim() !== "") {
      const query = searchInput.toLowerCase();
      result = result.filter((share) =>
        share.items.some(
          (item) =>
            item.content_text?.toLowerCase().includes(query) ||
            item.title?.toLowerCase().includes(query) ||
            item.language?.toLowerCase().includes(query) ||
            (item.file_type &&
              fileTypes[item.file_type as keyof typeof fileTypes].name
                .toLowerCase()
                .includes(query)),
        ),
      );
    }

    if (sortFilter === "oldest") {
      result = [...result].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    } else {
      result = [...result].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }

    return result;
  }, [shares, typeFilter, searchInput, sortFilter]);

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
          onSortChange={setSortFilter}
        />

        <div className="flex-1 flex flex-col">
          {loading && <ListSkeleton />}

          {!loading && filteredShares.length === 0 && (
            <div className="flex-1 flex items-center justify-center py-5">
              <EmptyState
                title="Nothing shared yet"
                subtitle="Anything shared will appear here in realtime."
                Icon={PackageOpen}
              />
            </div>
          )}

          {!loading && filteredShares.length > 0 && (
            <NormalList
              items={filteredShares}
              view={view}
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
      <ShareFolderModal
        open={newShareType === "folder"}
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
