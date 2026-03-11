"use client";

import { ShareItem } from "@/types/share-items";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { relativeTimeFromNow } from "@/lib/utils/formatters";
import { getShareMeta } from "./lib/share-meta";
import { ShareActionsMenu } from "../edit-share/share-actions-menu";
import { useState } from "react";
import { copy, downloadFile, htmlToText, openInNewTab } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  item: ShareItem;
  title: string;
  createdAt: string;
  view: "grid" | "rows";
  onClick: () => void;
  canManage: boolean;

  onEdit?: () => void;
  onDelete?: () => void;
  onBan?: () => void;
}

export function ShareItemCard({
  item,
  title,
  createdAt,
  view,
  onClick,
  canManage,
  onEdit,
  onDelete,
  onBan,
}: Props) {
  const [ quickActionRunning, setQuickActionRunning ] = useState<boolean>(false);
  const meta = getShareMeta(item);
  const createdAgo = relativeTimeFromNow(createdAt);

  const showActions = canManage && onEdit && onDelete;

  async function handleQuickAction() {
    setQuickActionRunning(true);

    try {
      if (item.item_type === "file") {
        downloadFile(item.file_path, item.file_name);
        toast.success("File downloaded successfully")
      }
      else if (item.item_type === "text") {
        await copy(htmlToText(item.content_text))
        toast.success("Text copied successfully")
      }
      else if (item.item_type === "code") {
        await copy(item.content_text)
        toast.success("Code copied successfully");
      }
      else openInNewTab(item.content_text);
    } catch (error) {
      console.log("Error in quick action: ", error);
      toast.error((error as Error).message)
    } finally {
      setQuickActionRunning(false);
    }
  }

  if (view === "grid") {
    return (
      <Card
        onClick={onClick}
        className="group h-full flex flex-col justify-between rounded-[8px] border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-200 py-1"
      >
        <div className="p-5 flex flex-col gap-5 flex-1">
          <div className="flex items-start justify-between">
            <div
              className={`size-12 rounded-xl flex items-center justify-center ${meta.iconBg}`}
            >
              <meta.Icon className="size-6" />
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
              {title}
            </h3>

            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              {meta.label}
            </p>
          </div>
        </div>

        <div className="p-4 pt-0">
          <Button
            variant={meta.buttonVariant}
            className="w-full h-9 text-xs font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              handleQuickAction();
            }}
          >
            {quickActionRunning ? (
              <Loader2 className="animate-spin size-2 mr-1.5" />
            ) : (
              <>
                <meta.ActionIcon className="size-4 mr-1.5" />
              </>
            )}
            {meta.actionLabel}
          </Button>
        </div>
      </Card>
    );
  }

  // ================= ROW VIEW =================

  return (
    <Card
      onClick={onClick}
      className="group border-border/60 hover:border-primary/30 transition-colors py-1"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${meta.iconBg}`}
          >
            <meta.Icon className="size-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-medium truncate">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {meta.label} • {createdAgo}
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
            variant={meta.buttonVariant}
            className="h-8 text-xs font-medium"
            onClick={(e) => {
              e.stopPropagation();
              handleQuickAction();
            }}
          >
            {quickActionRunning ? (
              <Loader2 className="animate-spin size-2 mr-1.5" />
            ) : (
              <>
                <meta.ActionIcon className="size-4 mr-1.5" />
              </>
            )}
            {meta.actionShortLabel}
          </Button>
        </div>
      </div>
    </Card >
  );
}