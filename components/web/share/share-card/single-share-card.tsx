"use client";

import { ShareWithItems } from "@/types/shares";
import { mapRowToShareItem } from "@/lib/mappers/map-share-item";
import { ShareItemCard } from "./share-item-card";

interface Props {
  share: ShareWithItems;
  view: "grid" | "rows";
  onOpen: () => void;
}

export function SingleShareCard({ share, view, onOpen }: Props) {
  const item = mapRowToShareItem(share.items[0]);

  return (
    <ShareItemCard
      onClick={onOpen}
      item={item}
      title={share.title}
      createdAt={share.created_at}
      view={view}
    />
  );
}
