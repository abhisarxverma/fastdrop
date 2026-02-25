"use client";

import { useFormContext } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getShareMeta } from "../share-card/lib/share-meta";

interface Props {
  index: number;
  onEdit: (index: number) => void;
  onRemove: () => void;
}

export function FolderItemCard({ index, onEdit, onRemove }: Props) {
  const { watch } = useFormContext<FolderShareFormValues>();
  const item = watch(`items.${index}`);

  if (!item) return null;

  const metaInput =
    item.item_type === "file"
      ? {
          item_type: "file" as const,
          file_name: item.file_name,
          file_type: item.file_type,
          title: item.title
        }
      : item.item_type === "code"
      ? {
          item_type: "code" as const,
          language: item.language,
          content_text: item.content,
          title: item.title
        }
      : item.item_type === "text"
      ? {
          item_type: "text" as const,
          content_text: item.content,
          title: item.title
        }
      : {
          item_type: "link" as const,
          content_text: item.content,
          title: item.title
        };

  const meta = getShareMeta(metaInput);

  const displayTitle =
    item.title ||
    (item.item_type === "file"
      ? item.file_name
      : item.item_type === "code"
      ? `${item.language} Snippet`
      : item.item_type === "text"
      ? item.content?.slice(0, 40)
      : item.content) ||
    "Untitled";

  return (
    <Card
      onClick={() => onEdit(index)}
      className="group cursor-pointer border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${meta.iconBg}`}
          >
            <meta.Icon className="size-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-medium truncate">
              {displayTitle}
            </h3>

            <p
              className={`text-xs uppercase tracking-wide font-medium ${meta.labelColor}`}
            >
              {meta.label}
            </p>
          </div>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </Card>
  );
}