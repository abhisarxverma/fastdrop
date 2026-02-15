"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShareWithItems } from "@/types/shares";
import { ShareItemsModal } from "./share-items-modal";

interface Props {
  share: ShareWithItems;
  view: "grid" | "rows";
}

export function MultipleShareCard({ share, view }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => setOpen(true)}
      >
        <CardContent className="p-6 space-y-2">
          <p className="text-xs text-muted-foreground uppercase">
            Multiple Items
          </p>
          <h3 className="font-semibold">{share.title}</h3>
          <p className="text-sm text-muted-foreground">
            {share.items.length} items
          </p>
        </CardContent>
      </Card>

      <ShareItemsModal
        open={open}
        onOpenChange={setOpen}
        share={share}
        view={view}
      />
    </>
  );
}
