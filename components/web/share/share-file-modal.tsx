"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ShareDialog } from "./share-dialog";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fileShareFormSchema } from "@/schemas/share/file-share";
import { fileShareAction } from "@/actions/share.actions";
import { unwrapActionResult } from "@/lib/actions/unwrap-result";
import { getExtension, removeExtension } from "@/lib/utils/file-share";
import { FileDropzone } from "./file-dropzone";
import { UploadedFileCard } from "./uploaded-file-card";
import { Upload } from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import { randomUUID } from "crypto"

interface ShareFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session_id: string;
}

export function ShareFileModal({
  open,
  onOpenChange,
  session_id,
}: ShareFileModalProps) {
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const form = useForm({
    resolver: zodResolver(fileShareFormSchema),
    defaultValues: {
      title: "",
      file: null,
      file_name: "",
      file_type: "",
    },
  });

    async function handleSubmit(data: z.infer<typeof fileShareFormSchema>) {
        if (!data.file) {
            toast.error("Please select a file first");
            return;
        }

        if (data.file.size > MAX_FILE_SIZE_LIMIT) {
            toast.error("File exceeds maximum allowed size");
            return;
        }

        startTransition(async () => {
            try {
                const file = data.file;

                const filePath = `${session_id}/${randomUUID()}_${data.file_name}.${data.file_type}`;

                const { error: uploadError } = await supabase.storage
                .from(OPEN_SHARES_BUCKET_NAME)
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

                if (uploadError) {
                    console.error("Upload error:", uploadError);
                    toast.error("File upload failed. Please try again.");
                    return;
                }

                const payload = {
                    file_type: data.file_type,
                    file_name: data.file_name,
                    file_path: filePath,
                    file_size: file.size,
                    session_id,
                    share_type: "single",
                };

                const res = await fileShareAction(payload);
                const data = unwrapActionResult(res);

                if (!data.success && !data?.data) {
                    await supabase.storage
                    .from(OPEN_SHARES_BUCKET_NAME)
                    .remove([filePath]);

                    toast.error("Failed to create file share");
                    return;
                }

                toast.success("File shared successfully");
            } catch (err) {
                console.error("Unexpected error:", err);
                toast.error("Unexpected error occurred");
            }
        });

    }


  return (
    <ShareDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={<Upload className="size-5" />}
      title="Share File"
      description="Review your file before sharing"
      submitLabel="Share file"
      isSubmitting={isPending}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <form className="space-y-6">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="uppercase text-xs tracking-wider text-muted-foreground font-semibold">
                Share Title
              </FieldLabel>

              <Input
                {...field}
                placeholder="Add a title for this share (optional)"
                className="h-11 rounded-xl"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="file"
          control={form.control}
          render={({ field, fieldState }) => {
            if (form.getValues("file")) return <></>;

            return (
              <Field>
                <FieldLabel>File</FieldLabel>
                <FileDropzone
                  value={field.value}
                  onChange={(file) => {
                    field.onChange(file);
                    if (file) {
                      form.setValue("file_name", file.name, {
                        shouldValidate: true,
                      });
                      const ext = getExtension(file.name);
                      form.setValue("file_type", ext, { shouldValidate: true });
                    } else {
                      form.setValue("file_type", "", { shouldValidate: true });
                    }
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          control={form.control}
          name="file_name"
          render={({ field }) => {
            if (!form.getValues("file")) return <></>;
            return (
              <Field>
                <FieldLabel>Uploaded file</FieldLabel>
                <UploadedFileCard
                  file={form.getValues("file")}
                  fileName={removeExtension(field.value)}
                  fileType={form.getValues("file_type")}
                  onPreview={() => {}}
                  onRemove={() => {
                    form.setValue("file", null as unknown as File);
                    form.setValue("file_type", "");
                    form.setValue("file_name", "");
                  }}
                  onRename={(newName) => field.onChange(newName)}
                />
              </Field>
            );
          }}
        />
      </form>
    </ShareDialog>
  );
}
