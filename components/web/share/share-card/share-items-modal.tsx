"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShareWithItems } from "@/types/shares";
import { mapRowToShareItem } from "@/lib/mappers/map-share-item";
import { ShareItemCard } from "./share-item-card";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  share: ShareWithItems;
  view: "grid" | "rows";
}

export function ShareItemsModal({ open, onOpenChange, share, view }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{share.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {share.items.map((row) => {
            const item = mapRowToShareItem(row);
            return (
              <ShareItemCard
                key={item.id}
                item={item}
                title={share.title}
                createdAt={share.created_at}
                view={view}
              />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
