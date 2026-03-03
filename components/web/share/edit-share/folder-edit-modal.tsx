"use client";

import { useState, useTransition } from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editShareActionSchema,
  EditShareInput,
} from "@/schemas/share/edit-share";
import { ShareWithItems } from "@/types/shares";
import { mapShareToEditFormValues } from "@/lib/utils/map-share-to-edit-form-values";
import { editShareAction } from "@/actions/share.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { ShareDialog } from "../share-dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { EditItemModal } from "./edit-item-modal";
import { FaEdit } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

interface Props {
  share: ShareWithItems;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FolderShareEditModal({ share, open, onOpenChange }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<EditShareInput>({
    resolver: zodResolver(editShareActionSchema),
    defaultValues: mapShareToEditFormValues(share),
  });

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const items = useWatch({
    control: form.control,
    name: "items",
  });

  function onSubmit(values: EditShareInput) {
    startTransition(async () => {
      try {
        const res = await editShareAction(values);
        unwrapActionResult(res);
        toast.success("Folder updated successfully");
        onOpenChange(false);
      } catch {
        toast.error("Failed to update folder");
      }
    });
  }

  return (
    <FormProvider {...form}>
      <ShareDialog
        icon={<FaEdit className="size-5" />}
        open={open}
        onOpenChange={onOpenChange}
        title="Edit Folder"
        submitLabel="Save Changes"
        isSubmitting={isPending}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-6">
          <Field>
            <FieldLabel>Folder Title</FieldLabel>
            <Input {...form.register("title")} />
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {items?.[index]?.title}
                  </span>
                  <Badge>{items?.[index]?.item_type.toUpperCase()}</Badge>
                </div>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setEditingIndex(index)}>
                    <Pencil className="size-4" />
                  </button>

                  <button type="button" onClick={() => remove(index)}>
                    <Trash2 className="size-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShareDialog>

      {editingIndex !== null && (
        <EditItemModal
          index={editingIndex}
          open={editingIndex !== null}
          onOpenChange={(open: boolean) => {
            if (!open) setEditingIndex(null);
          }}
        />
      )}
    </FormProvider>
  );
}
