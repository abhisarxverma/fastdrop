"use client";

import { useState, useTransition } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editShareFormSchema,
  EditShareFormValues,
} from "@/schemas/share/edit-share";

import { ShareWithItems } from "@/types/shares";
import { editShareAction } from "@/actions/share.actions";
import { ShareDialog } from "../share-dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { AddItemDropdown } from "../share-folder/add-item-dropdown";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";
import { EditItemModal } from "./edit-item-modal";
import { MAX_FILE_SIZE_BYTES } from "@/lib/env";
import { createClient } from "@/lib/supabase/client";
import { mapShareToEditFormValues } from "@/lib/utils/map-share-to-edit-form-values";
import { Button } from "@/components/ui/button";
import { LuDelete } from "react-icons/lu";
import { getStoragePathFromPublicUrl } from "@/lib/supabase/utils";

interface Props {
  share: ShareWithItems;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session_id: string;
}

export function FolderShareEditModal({
  share,
  open,
  onOpenChange,
  session_id,
}: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const form = useForm<EditShareFormValues>({
    resolver: zodResolver(editShareFormSchema),
    defaultValues: mapShareToEditFormValues(share),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function handleAdd(
    type: EditShareFormValues["items"][number]["item_type"]
  ) {
    switch (type) {
      case "code":
        append({
          id: undefined,
          title: "",
          item_type: "code",
          content: "",
          language: "typescript",
        });
        break;

      case "text":
        append({
          id: undefined,
          title: "",
          item_type: "text",
          content: "",
        });
        break;

      case "link":
        append({
          id: undefined,
          title: "",
          item_type: "link",
          content: "",
        });
        break;

      case "file":
        append({
          id: undefined,
          title: "",
          item_type: "file",
          file: null,
          file_name: "",
          file_type: "pdf",
          file_path: "",
        });
        break;
    }

    setEditingIndex(fields.length);
  }

  function handleSubmit(data: EditShareFormValues) {
    startTransition(async () => {
      const uploadedPaths: string[] = [];
      const oldFilesToDelete: string[] = [];

      try {
        const transformedItems: EditShareFormValues["items"] = [];

        for (const item of data.items) {

          if (item.item_type === "file") {
            if (item.file instanceof File) {
              if (item.file.size > MAX_FILE_SIZE_BYTES) {
                throw new Error("File exceeds maximum size");
              }

              const storagePath = `${session_id}/${crypto.randomUUID()}_${item.file_name}`;

              const { error } = await supabase.storage
                .from("fastdrop")
                .upload(storagePath, item.file);

              if (error) throw new Error("File upload failed");

              uploadedPaths.push(storagePath);

              const { data: publicUrlData } = supabase.storage
                .from("fastdrop")
                .getPublicUrl(storagePath);

              if (item.file_path) {
                oldFilesToDelete.push(getStoragePathFromPublicUrl(item.file_path));
              }

              transformedItems.push({
                ...item,
                file: null,
                file_path: publicUrlData.publicUrl,
              });

              continue;
            }

            if (item.file_path) {
              transformedItems.push(item);
              continue;
            }

            throw new Error("Missing file");
          }


          transformedItems.push(item);
        }

        await editShareAction({
          share_id: share.id,
          title: data.title,
          items: transformedItems,
        });

        if (oldFilesToDelete.length > 0) {
          await supabase.storage
            .from("fastdrop")
            .remove(oldFilesToDelete);
        }

        toast.success("Folder updated successfully");
        onOpenChange(false);
      } catch (error) {
        if (uploadedPaths.length > 0) {
          await supabase.storage
            .from("fastdrop")
            .remove(uploadedPaths);
        }

        toast.error((error as Error).message);
      }
    });
  }

  const onError = (errors: FieldErrors<EditShareFormValues>) => {
    console.log("Validation failed:", errors);
  };

  return (
    <FormProvider {...form}>
      <ShareDialog
        icon={<FaEdit className="size-5" />}
        open={open}
        onOpenChange={onOpenChange}
        title="Edit Folder"
        submitLabel="Save Changes"
        onSubmit={form.handleSubmit(handleSubmit, onError)}
        isSubmitting={isPending}
      >
        <div className="space-y-6">
          <Field>
            <FieldLabel>Folder Title</FieldLabel>
            <Input {...form.register("title")} />
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

          <AddItemDropdown onAdd={handleAdd} />

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <span className="text-sm font-medium truncate">
                  {form.watch(`items.${index}.title`) || "Untitled"}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setEditingIndex(index)}
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => remove(index)}
                  >
                    <LuDelete />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShareDialog>

      {editingIndex !== null && (
        <EditItemModal
          index={editingIndex}
          open
          onOpenChange={(open) => {
            if (!open) setEditingIndex(null);
          }}
        />
      )}
    </FormProvider>
  );
}