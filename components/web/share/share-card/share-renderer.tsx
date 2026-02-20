"use client";

import { ShareWithItems } from "@/types/shares";
import { SingleShareCard } from "./single-share-card";
import { MultipleShareCard } from "./multiple-share-card";

interface Props {
  share: ShareWithItems;
  view: "grid" | "rows";
  onOpen: () => void;
}

export function ShareRenderer({ share, view, onOpen }: Props) {
  if (share.share_type === "single") {
    return <SingleShareCard onOpen={onOpen} share={share} view={view} />;
  }

  return <MultipleShareCard share={share} view={view} />;
}
