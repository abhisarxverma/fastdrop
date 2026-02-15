"use client";

import { ShareWithItems } from "@/types/shares";
import { relativeTimeFromNow } from "@/lib/utils/formatters";
import { ShareCardGridLayout } from "./share-card-grid-layout";
import { ShareCardRowLayout } from "./share-card-row-layout";
import { mapRowToShareItem } from "@/lib/mappers/map-share-item";

interface ShareCardProps {
  share: ShareWithItems;
  view: "grid" | "rows";
}

export function ShareCard({ share, view }: ShareCardProps) {
  const createdAgo = relativeTimeFromNow(share.created_at);
  const item = mapRowToShareItem(share.items[0]);

  if (view === "grid") {
    return (
      <ShareCardGridLayout
        item={item}
        createdAgo={createdAgo}
      />
    );
  }

  return (
    <ShareCardRowLayout
      item={item}
      createdAgo={createdAgo}
    />
  );
}
