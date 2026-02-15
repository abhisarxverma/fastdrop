"use client";

import { ShareWithItems } from "@/types/shares";
import { mapRowToShareItem } from "@/lib/mappers/map-share-item";
import { ShareItemCard } from "./share-item-card";

interface Props {
  share: ShareWithItems;
  view: "grid" | "rows";
}

export function SingleShareCard({ share, view }: Props) {
  const item = mapRowToShareItem(share.items[0]);

  return (
    <ShareItemCard
      item={item}
      title={share.title}
      createdAt={share.created_at}
      view={view}
    />
  );
}
