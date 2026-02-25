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
  FolderShareFormValues,
  FolderShareInput,
  folderShareFormSchema,
} from "@/schemas/share/folder-share";

import { ShareDialog } from "../share-dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { AddItemDropdown } from "./add-item-dropdown";
import { FolderItemsRow } from "./folder-items-row";
import { FileDropzone } from "../file-dropzone";
import { getExtension } from "@/lib/utils/file-share";
import { resolveItemTypeFromExtension } from "@/lib/utils/share-item-resolver";
import { toast } from "sonner";
import { FaFolder } from "react-icons/fa";
import { ItemEditModal } from "./item-edit-modal";
import { folderShareAction } from "@/actions/share.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { MAX_FILE_SIZE_BYTES } from "@/lib/env";
import { createClient } from "@/lib/supabase/client";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session_id: string;
}

export function ShareFolderModal({ open, onOpenChange, session_id }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const form = useForm<FolderShareFormValues>({
    resolver: zodResolver(folderShareFormSchema),
    defaultValues: {
      title: "",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function handleAdd(
    type: FolderShareFormValues["items"][number]["item_type"],
  ) {
    switch (type) {
      case "code":
        append({
          title: "",
          item_type: "code",
          content: "",
          language: "typescript",
        });
        break;

      case "text":
        append({
          title: "",
          item_type: "text",
          content: "",
        });
        break;

      case "link":
        append({
          title: "",
          item_type: "link",
          content: "",
        });
        break;

      case "file":
        append({
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

  function handleSubmit(data: FolderShareFormValues) {
    startTransition(async () => {
      const uploadedPaths: string[] = [];

      try {
        const currentValues = form.getValues(); 
        const transformedItems: FolderShareInput["items"] = [];

        for (const item of currentValues.items) {
          if (item.item_type === "file") {
            if (!(item.file instanceof File)) {
              throw new Error("Missing file");
            }

            const file = item.file as File;

            if (file.size > MAX_FILE_SIZE_BYTES) {
              throw new Error("File exceeds maximum size");
            }

            const ext = item.file_type;
            const storagePath = `${session_id}/${crypto.randomUUID()}_${item.file_name}.${ext}`;

            const { error } = await supabase.storage
              .from("fastdrop")
              .upload(storagePath, file);

            if (error) throw new Error("File upload failed");

            uploadedPaths.push(storagePath);

            const { data: publicUrlData } = supabase.storage
              .from("fastdrop")
              .getPublicUrl(storagePath);

            transformedItems.push({
              item_type: "file",
              title: item.title,
              file_name: item.file_name,
              file_type: item.file_type,
              file_path: publicUrlData.publicUrl,
            });
          } else {
            transformedItems.push(item);
          }
        }

        const payload: FolderShareInput = {
          title: currentValues.title,
          session_id,
          share_type: "folder",
          items: transformedItems,
        };

        const res = await folderShareAction(payload);
        unwrapActionResult(res);

        toast.success("Folder shared successfully");
        form.reset();
        onOpenChange(false);
      } catch (error) {
        if (uploadedPaths.length > 0) {
          await supabase.storage.from("fastdrop").remove(uploadedPaths);
        }

        toast.error((error as Error).message);
      }
    });
  }

  const onError = (errors: FieldErrors<FolderShareFormValues>) => {
    console.log("Validation failed:", errors);
  };

  return (
    <ShareDialog
      icon={<FaFolder className="size-5" />}
      open={open}
      onOpenChange={onOpenChange}
      title="Share Folder"
      description="Add and manage items before sharing"
      submitLabel="Share folder"
      onSubmit={form.handleSubmit(handleSubmit, onError)}
      isSubmitting={isPending}
    >
      <FormProvider {...form}>
        <>
          <form className="space-y-8">
            <Field>
              <FieldLabel>Share Title</FieldLabel>
              <Input {...form.register("title")} />
              <FieldError errors={[form.formState.errors.title]} />
            </Field>

            <AddItemDropdown onAdd={handleAdd} />

            {fields.length === 0 ? (
              <FileDropzone
                multiple
                directory
                onChange={async (files) => {
                  for (const file of files) {
                    const ext = getExtension(file.name);
                    const resolved = resolveItemTypeFromExtension(ext);

                    if (!resolved.type) {
                      toast.error(`Unsupported file type: .${ext}`);
                      continue;
                    }

                    if (resolved.type === "code") {
                      const content = await file.text();

                      append({
                        title: file.name,
                        item_type: "code",
                        content,
                        language: resolved.language!,
                      });

                      continue;
                    }

                    if (resolved.type === "text") {
                      const content = await file.text();

                      append({
                        title: file.name,
                        item_type: "text",
                        content,
                      });

                      continue;
                    }

                    if (resolved.type === "file") {
                      append({
                        title: file.name,
                        item_type: "file",
                        file,
                        file_name: file.name,
                        file_type: ext,
                        file_path: "",
                      });
                    }
                  }
                }}
              />
            ) : (
              <FolderItemsRow
                fields={fields}
                remove={remove}
                onEdit={(index) => setEditingIndex(index)}
              />
            )}
          </form>

          {editingIndex !== null && (
            <ItemEditModal
              index={editingIndex}
              open={editingIndex !== null}
              onOpenChange={(open) => {
                if (!open) setEditingIndex(null);
              }}
            />
          )}
        </>
      </FormProvider>
    </ShareDialog>
  );
}
