"use client";

import { useFormContext } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { Card } from "@/components/ui/card";

interface Props {
  onOpenItem: (index: number) => void;
}

export function FolderItemsErrorSummary({ onOpenItem }: Props) {
  const {
    formState: { errors },
    watch,
  } = useFormContext<FolderShareFormValues>();

  const items = watch("items");

  if (!Array.isArray(errors.items)) return null;

  const list = errors.items
    .map((err, index) => {
      if (!err || typeof err !== "object") return null;

      const item = items?.[index];

      const title =
        item?.title ||
        (item?.item_type === "file" ? item?.file_name : "") ||
        "Untitled item";

      const message =
        err.title?.message ||
        err.content?.message ||
        err.file?.message ||
        "Invalid item";

      return {
        index,
        title,
        message,
      };
    })
    .filter((v): v is { index: number; title: string; message: string } => Boolean(v));

  if (!list.length) return null;

  return (
    <Card className="border-destructive/50 bg-destructive/5 p-4 space-y-2">
      <p className="text-sm font-semibold text-destructive">
        Please fix the following items before sharing
      </p>

      <ul className="space-y-1">
        {list.map((e) => (
          <li
            key={e.index}
            onClick={() => onOpenItem(e.index)}
            className="text-sm text-destructive cursor-pointer hover:underline"
          >
            Item {e.index + 1} — {e.title}: {e.message}
          </li>
        ))}
      </ul>
    </Card>
  );
}