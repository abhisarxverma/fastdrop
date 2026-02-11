import { NearbySession } from "@/types/sessions";
import { ListSkeleton } from "../reusables/list-skeletons";
import { EmptyState } from "../reusables/empty-state";
import { EmptySearchResult } from "./empty-search-result";
import { PaginatedList } from "../reusables/paginated-list";
import { SessionCard } from "./session-card";
import { SearchX } from "lucide-react";

export function SessionList({
  sessions,
  loading,
  view,
  searchInput,
}: {
  sessions: NearbySession[];
  loading: boolean;
  view: "rows" | "grid";
  searchInput: string;
}) {
  console.log("Sessions: ", sessions);
  if (loading) return <ListSkeleton />;
  if (sessions.length === 0) return <EmptyState title="No Nearby Sessions" subtitle="There are no active sessions within your current proximity." Icon={SearchX} />;

  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (filtered.length === 0) return <EmptySearchResult title="No result" subtitle="Try changing the search query." />;

  return (
    <PaginatedList
      items={filtered}
      view={view}
      pageSize={6}
      renderItem={(session) => (
        <SessionCard session={session} view={view} />
      )}
    />
  );
}
