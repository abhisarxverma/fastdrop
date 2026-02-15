"use client";

import { ShareWithItems } from "@/types/shares";
import { SingleShareCard } from "./single-share-card";
import { MultipleShareCard } from "./multiple-share-card";

interface Props {
  share: ShareWithItems;
  view: "grid" | "rows";
}

export function ShareRenderer({ share, view }: Props) {
  if (share.share_type === "single") {
    return <SingleShareCard share={share} view={view} />;
  }

  return <MultipleShareCard share={share} view={view} />;
}
