"use client";

import { ShareWithItems } from "@/types/shares";
import { mapRowToShareItem } from "@/lib/mappers/map-share-item";
import { ShareItemCard } from "./share-item-card";
import { ShareItem } from "@/types/share-items";
import { useState } from "react";
import { ShareItemViewResolver } from "../share-folder/share-item-view-resolver";
import { ShareViewModal } from "../view-modal/share-view-modal";
import { FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  share: ShareWithItems;
}

export function ShareItemsModal({ open, onOpenChange, share }: Props) {
  const [selectedItem, setSelectedItem] = useState<ShareItem | null>(null);

  const items = share.items.map(mapRowToShareItem);

  return (
    <>
      <ShareViewModal
        open={open}
        onOpenChange={onOpenChange}
        icon={FolderIcon}
        title={share.title}
        createdAt={share.created_at}
        footer={
          <>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </>
        }>
        <div className="space-y-3">
          {items.map((item: ShareItem) => (
            <ShareItemCard
              key={item.id}
              item={item}
              title={item.title}
              createdAt={share.created_at}
              view="rows"
              onClick={() => setSelectedItem(item)}
              canManage={false}
            />
          ))}
        </div>
      </ShareViewModal>

      <ShareItemViewResolver
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        shareTitle={selectedItem?.title ?? share.title}
      />
    </>
  );
}
