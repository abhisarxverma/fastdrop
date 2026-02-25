"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShareWithItems } from "@/types/shares";
import { mapRowToShareItem } from "@/lib/mappers/map-share-item";
import { ShareItemCard } from "./share-item-card";
import { ShareItem } from "@/types/share-items";
import { useState } from "react";
import { ShareItemViewResolver } from "../share-folder/share-item-view-resolver";

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
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{share.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {items.map((item : ShareItem) => (
              <ShareItemCard
                key={item.id}
                item={item}
                title={item.title}
                createdAt={share.created_at}
                view="rows"
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <ShareItemViewResolver
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        shareTitle={selectedItem?.title ?? share.title}
      />
    </>
  );
}
