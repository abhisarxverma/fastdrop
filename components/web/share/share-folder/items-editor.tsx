"use client";

import { Control, UseFieldArrayRemove, FieldArrayWithId } from "react-hook-form";
import { FolderShareFormValues } from "@/schemas/share/folder-share";
import { ShareItemEditor } from "./share-item-editor";

interface ItemsEditorProps {
  fields: FieldArrayWithId<FolderShareFormValues, "items", "id">[];
  control: Control<FolderShareFormValues>;
  remove: UseFieldArrayRemove;
}

export function ItemsEditor({
  fields,
  control,
  remove,
}: ItemsEditorProps) {
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <ShareItemEditor
          key={field.id}
          index={index}
          control={control}
          remove={remove}
        />
      ))}
    </div>
  );
}