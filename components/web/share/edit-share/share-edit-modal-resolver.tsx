"use client";

import { ShareWithItems } from "@/types/shares";
import { SingleShareEditModal } from "./single-share-edit-modal";
import { FolderShareEditModal } from "./folder-edit-modal";

interface Props {
  share: ShareWithItems | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareEditModalResolver({
  share,
  open,
  onOpenChange,
}: Props) {
  if (!share) return null;

  if (share.share_type === "single") {
    return (
      <SingleShareEditModal
        share={share}
        open={open}
        onOpenChange={onOpenChange}
      />
    );
  }

  return (
    <FolderShareEditModal
      session_id={share.session_id}
      share={share}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}