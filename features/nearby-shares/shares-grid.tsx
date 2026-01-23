"use client";

import { useEffect, useState } from "react";
import { nearbySharesAction } from "./actions";
import type { NearbyShares } from "@/types";
import { useGeo } from "@/providers/geo-provider";
import { toast } from "sonner";
import SingleShareCard from "./single-share-card";

export default function SharesGrid() {
  const [shares, setShares] = useState<NearbyShares>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { location } = useGeo();

  useEffect(() => {
    let mounted = true;

    async function fetchShares() {
      setLoading(true);
      const response = await nearbySharesAction({
        lat: location.lat,
        lng: location.lng,
        radius: 30,
      });

      console.log("Response : ", response);

      if (!mounted) return;

      if (!response?.data?.success) {
        setError(response?.data?.error ?? "Error occurred");
        toast.error(response?.data?.error);
        return;
      } else {
        setShares(response?.data?.data ?? []);
        console.log("Response : ", response?.data?.data ?? []);
      }
      setLoading(false);
    }

    fetchShares();

    return () => {
      mounted = false;
    };
  }, [location.lat, location.lng]);

  if (loading) return <p>Loading nearby shares…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shares
          .filter((share) => share.share_type === "single")
          .map((share) => (
            <SingleShareCard key={share.id} share={share} />
          ))}
      </div>
    </div>
  );
}
