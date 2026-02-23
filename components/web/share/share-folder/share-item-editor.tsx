"use client";

import { Control, UseFieldArrayRemove, useWatch } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { TextItemFields } from "./text-item-fields";
import { LinkItemFields } from "./link-item-fields";
import { CodeItemFields } from "./code-item-fields";
import { FileItemFields } from "./file-item-fields";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ShareItemEditorProps {
  index: number;
  control: Control<FolderShareFormValues>;
  remove: UseFieldArrayRemove;
}

export function ShareItemEditor({
  index,
  control,
  remove,
}: ShareItemEditorProps) {
  const itemType = useWatch({
    control,
    name: `items.${index}.item_type`,
  });

  return (
    <div className="rounded-2xl border bg-background shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold uppercase text-muted-foreground">
          {itemType} item
        </p>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => remove(index)}
        >
          <X className="size-4" />
        </Button>
      </div>

      {itemType === "text" && (
        <TextItemFields index={index} control={control} />
      )}
      {itemType === "link" && (
        <LinkItemFields index={index} control={control} />
      )}
      {itemType === "code" && (
        <CodeItemFields index={index} control={control} />
      )}
      {itemType === "file" && (
        <FileItemFields index={index} control={control} />
      )}
    </div>
  );
}