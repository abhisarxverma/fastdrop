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
import { getExtension, removeExtension } from "@/lib/utils/file-share";
import { FileDropzone } from "./file-dropzone";
import { UploadedFileCard } from "./uploaded-file-card";
import { Upload } from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import { MAX_FILE_SIZE_BYTES } from "@/lib/env"

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

        if (data.file.size > MAX_FILE_SIZE_BYTES) {
            toast.error("File exceeds maximum allowed size");
            return;
        }

        startTransition(async () => {
            try {
                const file = data.file;

                const fileName = `${session_id}/${crypto.randomUUID()}_${data.file_name}.${data.file_type}`;

               const { error: uploadError } = await supabase.storage
                  .from("fastdrop")
                  .upload(fileName, file);

                if (uploadError) {
                    console.error("Upload error:", uploadError);
                    toast.error("File upload failed. Please try again.");
                    return;
                }
                  
                const { data: publicUrlData } = supabase.storage
                  .from("fastdrop")
                  .getPublicUrl(fileName);

                const fileUrl = publicUrlData.publicUrl;

                const payload = {
                    file_type: data.file_type,
                    file_name: data.file_name,
                    file_path: fileUrl,
                    title: data.title,
                    session_id,
                    share_type: "single",
                };

                const res = await fileShareAction(payload);
                console.log("res : ", res);

                if (!res.success && !res?.data) {
                    await supabase.storage
                    .from("fastdrop")
                    .remove([filePath]);

                    toast.error("Failed to create file share");
                    throw new Error(res.message);
                    return;
                }

                toast.success("File shared successfully");
                form.reset(); 
                onOpenChange(false);
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
                placeholder="Add a title for this share"
                className=""
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
