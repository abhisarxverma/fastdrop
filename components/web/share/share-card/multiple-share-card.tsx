"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShareWithItems } from "@/types/shares";
import { FolderIcon, FoldersIcon } from "lucide-react";
import { relativeTimeFromNow } from "@/lib/utils/formatters";
import { ShareActionsMenu } from "../edit-share/share-actions-menu";

interface Props {
  share: ShareWithItems;
  view: "grid" | "rows";
  canManage: boolean;
  onOpen: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onBan?: () => void;
}

export function MultipleShareCard({
  share,
  view,
  canManage,
  onOpen,
  onEdit,
  onBan,
  onDelete,
}: Props) {
  const createdAgo = relativeTimeFromNow(share.created_at);

  const showActions = canManage && onEdit && onDelete;

  if (view === "grid") {
    return (
      <Card
        onClick={onOpen}
        className="group h-full flex flex-col justify-between rounded-[8px] border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-200 py-1"
      >
        <div className="p-5 flex flex-col gap-5 flex-1">
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-xl flex items-center justify-center bg-gray-50">
              <FoldersIcon className="size-6 text-blue-600" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground font-medium">
                {createdAgo}
              </span>

              {showActions && (
                <div onClick={(e) => e.stopPropagation()}>
                  <ShareActionsMenu
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onBan={onBan}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold leading-snug line-clamp-2">
              {share.title}
            </h3>

            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              {share.items.length} items
            </p>
          </div>
        </div>

        <div className="p-4 pt-0">
          <Button
            variant="secondary"
            className="w-full h-9 text-xs font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            <FolderIcon className="size-4 mr-2" />
            View Items
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      onClick={onOpen}
      className="group border-border/60 hover:border-primary/30 transition-colors py-1"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 rounded-lg flex items-center justify-center shrink-0 bg-blue-100">
            <FolderIcon className="size-5 text-blue-600" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-medium truncate">
              {share.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {share.items.length} items • {createdAgo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showActions && (
            <div onClick={(e) => e.stopPropagation()}>
              <ShareActionsMenu
                onEdit={onEdit}
                onDelete={onDelete}
                onBan={onBan}
              />
            </div>
          )}

          <Button
            size="sm"
            variant="secondary"
            className="h-8 text-xs font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            Open
          </Button>
        </div>
      </div>
    </Card>
  );
}