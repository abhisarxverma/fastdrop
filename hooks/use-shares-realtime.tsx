import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { ShareWithItems } from "@/types/shares";
import { getSessionContentByIdRpc } from "@/lib/supabase/rpc/get-session-content-by-id";
import { useAuth } from "@/providers/auth-provider";

type UseSharesRealtimeResult = {
  shares: ShareWithItems[];
  loading: boolean;
  error: string | null;
};

export function useSharesRealtime(sessionId: string): UseSharesRealtimeResult {
  const [shares, setShares] = useState<ShareWithItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!sessionId || !user) return;
    
    const supabase = createClient();
    let channel: RealtimeChannel;

    async function init() {
      setLoading(true);
      const { data, error } = await getSessionContentByIdRpc(
        supabase,
        sessionId,
      );

      if (error) {
        logLocalError(
          "get session content by id in use shares realtime hook",
          { session_id: sessionId },
          error,
        );
        setError(error.message);
        setLoading(false);
        return;
      }

      console.log("data : ", data);
      const shares = data?.shares ?? [];
      if (data) setShares(shares);

      setLoading(false);

      channel = supabase
        .channel(`shares-session-${sessionId}`)

        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "shares",
            filter: `session_id=eq.${sessionId}`,
          },
          async (payload) => {
            const newShare = payload.new;

            const { data: items } = await supabase
              .from("share_items")
              .select("*")
              .eq("share_id", newShare.id);

            console.log("new share in realtime : ", newShare);

            setShares((prev) => [{ ...newShare, items: items ?? [] }, ...prev]);
          },
        )

        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "shares",
            filter: `session_id=eq.${sessionId}`,
          },
          (payload) => {
            setShares((prev) => prev.filter((s) => s.id !== payload.old.id));
          },
        )

        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "share_items",
          },
          (payload) => {
            const updatedItem = payload.new;

            setShares((prev) =>
              prev.map((share) => {
                if (share.id !== updatedItem.share_id) return share;

                return {
                  ...share,
                  items: share.items.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item,
                  ),
                };
              }),
            );
          },
        )

        // .on(
        //   "postgres_changes",
        //   {
        //     event: "DELETE",
        //     schema: "public",
        //     table: "share_items",
        //   },
        //   (payload) => {
        //     const deletedItem = payload.old;

        //     setShares((prev) =>
        //       prev.map((share) => {
        //         if (share.id !== deletedItem.share_id) return share;

        //         return {
        //           ...share,
        //           items: share.items.filter(
        //             (item) => item.id !== deletedItem.id,
        //           ),
        //         };
        //       }),
        //     );
        //   },
        // )

        // .on(
        //   "postgres_changes",
        //   {
        //     event: "INSERT",
        //     schema: "public",
        //     table: "share_items",
        //   },
        //   (payload) => {
        //     const newItem = payload.new;

        //     setShares((prev) =>
        //       prev.map((share) => {
        //         if (share.id !== newItem.share_id) return share;

        //         return {
        //           ...share,
        //           items: [newItem, ...share.items],
        //         };
        //       }),
        //     );
        //   },
        // )

        .subscribe((status, err) => {
          console.log("Realtime status:", status, err);
        });
    }

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [sessionId, user]);

  return { shares, loading, error };
}
