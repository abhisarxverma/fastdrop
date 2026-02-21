import { createClient } from "@/lib/supabase/client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ShareWithItems } from "@/types/shares";
import { getSessionContentByIdRpc } from "@/lib/supabase/rpc/get-session-content-by-id";
import { useAuth } from "@/providers/auth-provider";
import { logLocalError } from "@/lib/logging/logger";
import { RealtimeChannel } from "@supabase/supabase-js";

type UseSharesRealtimeResult = {
  shares: ShareWithItems[];
  loading: boolean;
  error: string | null;
};

const supabase = createClient();

export function useSharesRealtime(
  sessionId: string
): UseSharesRealtimeResult {
  const { user } = useAuth();

  const [shares, setShares] = useState<ShareWithItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const mountedRef = useRef<boolean>(false);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);

    const { data, error } = await getSessionContentByIdRpc(
      supabase,
      sessionId
    );

    if (error) {
      logLocalError(
        "get session content by id in useSharesRealtime",
        { session_id: sessionId },
        error
      );
      setError(error.message);
      setLoading(false);
      return;
    }

    setShares(data?.shares ?? []);
    setLoading(false);
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId || !user) return;

    let isCancelled = false;

    async function setupRealtime() {
      if (mountedRef.current) {
        // prevents double subscription in StrictMode
        return;
      }
      mountedRef.current = true;

      await fetchInitialData();

      if (isCancelled) return;

      // Always remove previous channel before creating new one
      if (channelRef.current) {
        await supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      const channel = supabase
        .channel(`shares-session-${sessionId}`)

        // SHARE INSERT
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

            setShares((prev) => [
              { ...newShare, items: items ?? [] } as ShareWithItems,
              ...prev,
            ]);
          }
        )

        // SHARE DELETE
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "shares",
            filter: `session_id=eq.${sessionId}`,
          },
          (payload) => {
            setShares((prev) =>
              prev.filter((s) => s.id !== payload.old.id)
            );
          }
        )

        // SHARE ITEM UPDATE (add deterministic filter)
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
                    item.id === updatedItem.id
                      ? updatedItem
                      : item
                  ),
                } as ShareWithItems;
              })
            );
          }
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

          if (status === "CHANNEL_ERROR") {
            console.warn("Realtime channel error. Resetting...");
          }
        });

      channelRef.current = channel;
    }

    setupRealtime();

    return () => {
      isCancelled = true;
      mountedRef.current = false;

      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [sessionId, user, fetchInitialData]);

  return { shares, loading, error };
}