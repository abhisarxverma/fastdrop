"use client";

import { FolderItemCard } from "./folder-item-card";
import { UseFieldArrayRemove, FieldArrayWithId } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";

interface Props {
  fields: FieldArrayWithId<FolderShareFormValues, "items", "id">[];
  remove: UseFieldArrayRemove;
  onEdit: (index: number) => void;
}

export function FolderItemsRow({ fields, remove, onEdit }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <FolderItemCard
          key={field.id}
          index={index}
          onEdit={onEdit}
          onRemove={() => remove(index)}
        />
      ))}
    </div>
  );
}