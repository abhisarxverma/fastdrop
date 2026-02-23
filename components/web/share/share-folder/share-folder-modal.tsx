"use client";

import { useTransition } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShareDialog } from "../share-dialog";
import {
  folderShareFormSchema,
  FolderShareFormValues,
  FolderShareInput,
} from "@/schemas/share/folder-share";
import { folderShareAction } from "@/actions/share.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { createClient } from "@/lib/supabase/client";
import { MAX_FILE_SIZE_BYTES } from "@/lib/env";
import { MainShareHeader } from "./main-share-header";
import { FolderUploadBar } from "./folder-upload-bar";
import { ItemsEditor } from "./items-editor";
import { FaFolder } from "react-icons/fa6";

interface ShareMultiModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  session_id: string;
}

export function ShareMultiModal({
  open,
  onOpenChange,
  session_id,
}: ShareMultiModalProps) {
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const form = useForm<FolderShareFormValues>({
    resolver: zodResolver(folderShareFormSchema),
    defaultValues: {
      title: "",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray<
    FolderShareFormValues,
    "items"
  >({
    control: form.control,
    name: "items",
  });

  async function handleSubmit(data: FolderShareFormValues) {
    startTransition(async () => {
      const uploadedPaths: string[] = [];

      try {
        const transformedItems: FolderShareInput["items"] = [];

        for (const item of data.items) {
          if (item.item_type === "file") {
            if (!item.file) throw new Error("Missing file");

            if (item.file.size > MAX_FILE_SIZE_BYTES) {
              throw new Error("File exceeds maximum size");
            }

            const ext = item.file_type;
            const storagePath = `${session_id}/${crypto.randomUUID()}_${item.file_name}.${ext}`;

            const { error } = await supabase.storage
              .from("fastdrop")
              .upload(storagePath, item.file);

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
          title: data.title,
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

  return (
    <ShareDialog
      icon={<FaFolder className="size-5 text-primary" />}
      open={open}
      onOpenChange={onOpenChange}
      title="Share Folder"
      description="Share multiple resources in a single folder"
      submitLabel="Share folder"
      isSubmitting={isPending}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
    <FormProvider {...form}>
      <form className="space-y-8">
        <MainShareHeader control={form.control} />
        <FolderUploadBar append={append} />
        <ItemsEditor
          fields={fields}
          control={form.control}
          remove={remove}
        />
      </form>
    </ FormProvider>
    </ShareDialog>
  );
}