"use client";

import { ShareWithItems } from "@/types/shares";
import { SingleShareCard } from "./single-share-card";
import { MultipleShareCard } from "./multiple-share-card";

interface Props {
  share: ShareWithItems;
  view: "grid" | "rows";
  onOpen: () => void;
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onBan: () => void;
}

export function ShareRenderer({ share, view, onOpen, canManage = false, onEdit, onDelete, onBan }: Props) {
  if (share.share_type === "single") {
    return <SingleShareCard onBan={onBan} canManage={canManage} onOpen={onOpen} share={share} view={view} onEdit={onEdit} onDelete={onDelete} />;
  }
  return <MultipleShareCard onBan={onBan} share={share} onOpen={onOpen} view={view} canManage={canManage} onEdit={onEdit} onDelete={onDelete} />;
}
