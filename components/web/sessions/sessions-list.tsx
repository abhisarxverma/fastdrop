import { NearbySession } from "@/types/sessions";
import { SessionListSkeleton } from "./sessions-list-skeletons";
import { EmptyNearbySessions } from "./empty-nearby-sessions";
import { EmptySearchResult } from "./empty-search-result";
import { PaginatedList } from "../reusables/paginated-list";
import { SessionCard } from "./session-card";

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
  if (loading) return <SessionListSkeleton />;
  if (sessions.length === 0) return <EmptyNearbySessions />;

  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (filtered.length === 0) return <EmptySearchResult title="No result" subtitle="Try changing the search query." />;

  return (
    <PaginatedList
      items={filtered.map(s => (
        <SessionCard key={s.id} session={s} view={view} />
      ))}
      pageSize={6}
      view={view}
    />
  );
}
