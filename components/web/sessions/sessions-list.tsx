import { SessionWithShares } from "@/types/sessions";
import { EmptyNearbySessions } from "./empty-nearby-sessions";
import { SessionCard } from "./session-card";
import { SessionListSkeleton } from "./sessions-list-skeletons";
import { useEffect, useState } from "react";
import { getNearbySessionsAction } from "@/actions/sessions.actions";
import { useGeo } from "@/providers/geo-provider";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { toast } from "sonner";
import { EmptySearchResult } from "./empty-search-result";
import { PaginatedList } from "../reusables/paginated-list";

interface SessionListProps {
  view: "rows" | "grid";
  searchInput: string;
}

export function SessionList({ view, searchInput }: SessionListProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessions, setSessions] = useState<SessionWithShares[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { location } = useGeo();

  useEffect(() => {
    (async () => {
      try {
        // testCreateSession(location.lat, location.lng);
        const result = await getNearbySessionsAction({
          lat: location.lat,
          lng: location.lng,
        });

        const fetchedSessions = unwrapActionResult(result);
        console.log("Sessions: ", fetchedSessions);
        setSessions(fetchedSessions);

      } catch (err) {
        setError((err as Error).message);
        toast.error((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location, setError, setIsLoading, setSessions]);

  if (isLoading) return <SessionListSkeleton />;
  if (sessions.length === 0) return <EmptyNearbySessions />;

  const filteredSessions = sessions.filter((s) => s.title.includes(searchInput));

  if (filteredSessions.length === 0) return (
    <EmptySearchResult
      title="No results found"
      subtitle="Try adjusting your search or filters."
    />
  )

  return (
    <PaginatedList
      items={filteredSessions.map((s) => (
        <SessionCard key={s.id} session={s} />
      ))}
      view={view}
      pageSize={6}
    />

  );
}